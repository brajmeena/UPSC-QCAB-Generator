/**
 * UPSC QCAB Generator — app.js
 * Data lives in que_database.js (loaded before this script in index.html)
 */

'use strict';

/* ============================================================
   SECTION 1: STATE
   ============================================================ */
const State = {
  allQuestions:      [],
  filteredQuestions: [],
  selectedIds:       new Set(),
  currentMode:       'pyq',
  customParsed:      [],
  sort: { field: null, dir: 'asc' },  // active sort column & direction

  get selectedQuestions() {
    return this.allQuestions.filter(q => this.selectedIds.has(q.id));
  },
  get selectedCount()  { return this.selectedIds.size; },
  get selectedMarks()  {
    return this.selectedQuestions.reduce((s, q) => s + q.marks, 0);
  }
};

/* ============================================================
   SECTION 2: DATA LAYER  (reads QUESTIONS_DATA from que_database.js)
   ============================================================ */
const DataLayer = (() => {

  function loadQuestions() {
  //   if (typeof QUESTIONS_DATA === 'undefined') {
  //     console.error('QUESTIONS_DATA not found. Make sure que_database.js is loaded before app.js.');
  //     State.allQuestions = [];
  //   } else {
  //     State.allQuestions = QUESTIONS_DATA;
  //   }
  //   State.filteredQuestions = [...State.allQuestions];
  // }
     let combinedQuestions = [];

       // 1. Load regular questions as they are
       // if (typeof QUESTIONS_DATA !== 'undefined') {
       //   combinedQuestions.push(...QUESTIONS_DATA);
       // } else {
       //   console.warn('QUESTIONS_DATA not found.');
       // }
     //  _____ Load GS1_______
       if (typeof GS1_QUE !== 'undefined') {
         combinedQuestions.push(...GS1_QUE);
       } else {
         console.warn('GS1_QUE not found.');
       }
      //  _____ Load GS2_______
       if (typeof GS2_QUE !== 'undefined') {
         combinedQuestions.push(...GS2_QUE);
       } else {
         console.warn('GS2_QUE not found.');
       }
     //  _____ Load GS3_______
      if (typeof GS3_QUE !== 'undefined') {
         combinedQuestions.push(...GS3_QUE);
       } else {
         console.warn('GS3_QUE not found.');
       }
     //  _____ Load GS4_______
      if (typeof GS4_QUE !== 'undefined') {
         combinedQuestions.push(...GS4_QUE);
       } else {
         console.warn('GS4_QUE not found.');
       }
     //  _____ Load ESSAYs_______
      if (typeof ESSAY_QUE !== 'undefined') {
         combinedQuestions.push(...ESSAY_QUE);
       } else {
         console.warn('ESSAY_QUE not found.');
       }
   
       // 2. Load geo questions and change their ID format
       if (typeof QUESTIONS_DATA_GEO_OPT !== 'undefined') {
         const modifiedGeoQuestions = QUESTIONS_DATA_GEO_OPT.map(q => ({
           ...q,                 // Copy all existing properties (year, subject, marks, etc.)
           id: `GEO_${q.id}`     // Overwrite the id property (e.g., 1 becomes "GEO_1")
         }));
         combinedQuestions.push(...modifiedGeoQuestions);
       } else {console.warn('QUESTIONS_DATA_GEO_OPT not found.');}
   
       // 3. Update application state
       State.allQuestions = combinedQuestions;
       State.filteredQuestions = [...State.allQuestions];
   }

  // Get unique values of a field, filtered by current constraints
  function getUniqueValues(field, constraints) {
    let pool = State.allQuestions;
    if (constraints) {
      Object.entries(constraints).forEach(([k, v]) => {
        if (v) pool = pool.filter(q => String(q[k]) === String(v));
      });
    }
    return [...new Set(pool.map(q => q[field]).filter(v => v !== undefined && v !== null && v !== ''))]
      .sort((a, b) => typeof a === 'number' ? b - a : String(a).localeCompare(String(b)));
  }

  return { loadQuestions, getUniqueValues };
})();

/* ============================================================
   SECTION 3: DOM REFERENCES
   ============================================================ */
const DOM = {
  tabPyq:            () => document.getElementById('tab-pyq'),
  tabCustom:         () => document.getElementById('tab-custom'),
  panelPyq:          () => document.getElementById('panel-pyq'),
  panelCustom:       () => document.getElementById('panel-custom'),

  filterYear:        () => document.getElementById('filter-year'),
  filterPaper:       () => document.getElementById('filter-paper'),
  filterSubject:     () => document.getElementById('filter-subject'),
  filterSubtopic:    () => document.getElementById('filter-subtopic'),
  filterSearch:      () => document.getElementById('filter-search'),
  btnApply:          () => document.getElementById('btn-apply-filter'),
  btnReset:          () => document.getElementById('btn-reset-filter'),
  filterCount:       () => document.getElementById('filter-count'),

  selectedBar:       () => document.getElementById('selected-bar'),
  selectedCount:     () => document.getElementById('selected-count'),
  selectedMarks:     () => document.getElementById('selected-marks'),
  btnClearSel:       () => document.getElementById('btn-clear-selection'),
  btnGeneratePyq:    () => document.getElementById('btn-generate-pyq'),

  tbody:             () => document.getElementById('question-tbody'),
  selectAll:         () => document.getElementById('select-all'),

  customInput:       () => document.getElementById('custom-input'),
  textareaCounter:   () => document.getElementById('textarea-counter'),
  btnParsePreview:   () => document.getElementById('btn-parse-preview'),
  btnGenerateCustom: () => document.getElementById('btn-generate-custom'),
  customPreview:     () => document.getElementById('custom-preview'),
  previewList:       () => document.getElementById('preview-list'),
  customError:       () => document.getElementById('custom-error'),

  pdfModal:          () => document.getElementById('pdf-modal'),
  modalClose:        () => document.getElementById('modal-close'),
  modalCancel:       () => document.getElementById('modal-cancel'),
  modalConfirm:      () => document.getElementById('modal-confirm'),
  pdfFooterCode:     () => document.getElementById('pdf-footer-code'),
  pdfTitleInput:     () => document.getElementById('pdf-title'),
  modalSummary:      () => document.getElementById('modal-summary'),

  toast:             () => document.getElementById('toast')
};

/* ============================================================
   SECTION 4: UTILITIES
   ============================================================ */
const Utils = (() => {
  let toastTimer = null;

  function showToast(message, type = 'default') {
    const el = DOM.toast();
    el.textContent = message;
    el.className = `toast toast--${type}`;
    el.classList.remove('hidden');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.add('hidden'), 3200);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  return { showToast, escapeHtml };
})();

/* ============================================================
   SECTION 5: FILTERS  (auto-apply + cascading dropdowns)
   ============================================================ */
const Filters = (() => {

  function populateSelect(selectEl, values, placeholder, keepValue) {
    const prev = keepValue !== undefined ? keepValue : selectEl.value;
    selectEl.innerHTML = `<option value="">${placeholder}</option>`;
    values.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v;
      opt.textContent = v;
      selectEl.appendChild(opt);
    });
    // Restore previous selection if still valid
    if (prev && values.map(String).includes(String(prev))) {
      selectEl.value = prev;
    }
  }

  function initFilterDropdowns() {
    populateSelect(DOM.filterYear(),  DataLayer.getUniqueValues('year'),  'All Years');
    populateSelect(DOM.filterPaper(), DataLayer.getUniqueValues('paper'), 'All Papers');
    refreshSubjectDropdown();
    refreshSubtopicDropdown();
  }

  // Rebuild Subject dropdown based on selected year + paper
  function refreshSubjectDropdown() {
    const constraints = {};
    const y = DOM.filterYear().value;
    const p = DOM.filterPaper().value;
    if (y) constraints.year  = y;
    if (p) constraints.paper = p;
    const subjects = DataLayer.getUniqueValues('subject', Object.keys(constraints).length ? constraints : null);
    populateSelect(DOM.filterSubject(), subjects, 'All Subjects');
  }

  // Rebuild Subtopic dropdown based on selected year + paper + subject
  function refreshSubtopicDropdown() {
    const constraints = {};
    const y = DOM.filterYear().value;
    const p = DOM.filterPaper().value;
    const s = DOM.filterSubject().value;
    if (y) constraints.year    = y;
    if (p) constraints.paper   = p;
    if (s) constraints.subject = s;
    const subtopics = DataLayer.getUniqueValues('subtopic', Object.keys(constraints).length ? constraints : null);
    populateSelect(DOM.filterSubtopic(), subtopics, 'All Subtopics');
  }

  function getFilterValues() {
    return {
      year:     DOM.filterYear().value,
      paper:    DOM.filterPaper().value,
      subject:  DOM.filterSubject().value,
      subtopic: DOM.filterSubtopic().value,
      search:   DOM.filterSearch().value.trim().toLowerCase()
    };
  }

  function applyFilters() {
    const f = getFilterValues();
    State.filteredQuestions = State.allQuestions.filter(q => {
      if (f.year     && String(q.year) !== f.year)     return false;
      if (f.paper    && q.paper        !== f.paper)    return false;
      if (f.subject  && q.subject      !== f.subject)  return false;
      if (f.subtopic && q.subtopic     !== f.subtopic) return false;
      if (f.search) {
        const haystack = [
          q.question, q.paper, q.subject, q.subtopic,
          String(q.year), ...(q.keywords || [])
        ].join(' ').toLowerCase();
        if (!haystack.includes(f.search)) return false;
      }
      return true;
    });
    Table.render();
    updateFilterCount();
  }

  // Called when Year or Paper changes — cascade then apply
  function onYearOrPaperChange() {
    refreshSubjectDropdown();
    refreshSubtopicDropdown();
    applyFilters();
  }

  // Called when Subject changes — cascade subtopic then apply
  function onSubjectChange() {
    refreshSubtopicDropdown();
    applyFilters();
  }

  function resetFilters() {
    DOM.filterYear().value     = '';
    DOM.filterPaper().value    = '';
    DOM.filterSearch().value   = '';
    initFilterDropdowns();       // repopulate all with full data
    State.filteredQuestions    = [...State.allQuestions];
    Table.render();
    updateFilterCount();
  }

  function updateFilterCount() {
    DOM.filterCount().textContent =
      `${State.filteredQuestions.length} of ${State.allQuestions.length} questions`;
  }

  return {
    initFilterDropdowns,
    applyFilters,
    onYearOrPaperChange,
    onSubjectChange,
    resetFilters,
    updateFilterCount
  };
})();

/* ============================================================
   SECTION 6: TABLE — Render, Selection & Column Sorting
   ============================================================ */
const Table = (() => {

  // ── Sortable column definitions ─────────────────────────────
  // Maps th data-sort attribute → comparator field & type
  const SORT_COLS = {
    year:    { field: 'year',    type: 'num' },
    paper:   { field: 'paper',   type: 'str' },
    subject: { field: 'subject', type: 'str' },
    marks:   { field: 'marks',   type: 'num' },
  };

  // ── Sort the current filteredQuestions in-place ──────────────
  function getSorted(questions) {
    const { field, dir } = State.sort;
    if (!field || !SORT_COLS[field]) return questions;

    const { type } = SORT_COLS[field];
    const mul = dir === 'asc' ? 1 : -1;

    return [...questions].sort((a, b) => {
      const av = a[SORT_COLS[field].field];
      const bv = b[SORT_COLS[field].field];
      if (type === 'num') return (av - bv) * mul;
      return String(av).localeCompare(String(bv)) * mul;
    });
  }

  // ── Update th elements to show sort indicators ───────────────
  function updateHeaders() {
    const { field, dir } = State.sort;
    document.querySelectorAll('.question-table thead th[data-sort]').forEach(th => {
      const col = th.dataset.sort;
      th.classList.remove('sort--asc', 'sort--desc', 'sort--active');
      if (col === field) {
        th.classList.add('sort--active', dir === 'asc' ? 'sort--asc' : 'sort--desc');
      }
    });
  }

  // ── Handle a header click ────────────────────────────────────
  function handleHeaderClick(col) {
    if (!SORT_COLS[col]) return;
    if (State.sort.field === col) {
      // Same column → flip direction
      State.sort.dir = State.sort.dir === 'asc' ? 'desc' : 'asc';
    } else {
      // New column → default asc (desc for year so newest first)
      State.sort.field = col;
      State.sort.dir   = col === 'year' ? 'desc' : 'asc';
    }
    render();
  }

  // ── Bind click handlers on sortable headers ──────────────────
  function bindHeaderClicks() {
    document.querySelectorAll('.question-table thead th[data-sort]').forEach(th => {
      th.addEventListener('click', () => handleHeaderClick(th.dataset.sort));
    });
  }

  // ── Main render ──────────────────────────────────────────────
  function render() {
    const tbody = DOM.tbody();
    tbody.innerHTML = '';

    if (State.filteredQuestions.length === 0) {
      tbody.innerHTML = '<tr class="empty-row"><td colspan="6">No questions match your filters. Try adjusting or resetting.</td></tr>';
      syncSelectAll();
      updateHeaders();
      return;
    }

    const sorted   = getSorted(State.filteredQuestions);
    const fragment = document.createDocumentFragment();
    sorted.forEach(q => fragment.appendChild(buildRow(q)));
    tbody.appendChild(fragment);
    syncSelectAll();
    updateHeaders();
  }

  function buildRow(q) {
    const tr = document.createElement('tr');
    tr.dataset.id = q.id;
    if (State.selectedIds.has(q.id)) tr.classList.add('row--selected');

    tr.innerHTML = `
      <td class="col-check">
        <label class="checkbox-wrapper">
          <input type="checkbox" class="row-checkbox" data-id="${q.id}" ${State.selectedIds.has(q.id) ? 'checked' : ''} />
          <span class="checkmark"></span>
        </label>
      </td>
      <td class="col-year"><span class="tag tag--year">${q.year}</span></td>
      <td class="col-paper"><span class="tag tag--paper">${Utils.escapeHtml(q.paper)}</span></td>
      <td class="col-subject" style="font-size:0.8rem;color:var(--ink-muted);">${Utils.escapeHtml(q.subject || '')}</td>
      <td class="col-question"><span class="question-text">${Utils.escapeHtml(q.question)}</span></td>
      <td class="col-marks"><span class="tag tag--marks">${q.marks}</span></td>
    `;

    tr.querySelector('.row-checkbox').addEventListener('change', e => {
      toggleRow(q.id, e.target.checked);
    });

    tr.addEventListener('click', e => {
      if (e.target.classList.contains('row-checkbox') ||
          e.target.classList.contains('checkmark') ||
          e.target.closest('label')) return;
      const cb = tr.querySelector('.row-checkbox');
      cb.checked = !cb.checked;
      toggleRow(q.id, cb.checked);
    });

    return tr;
  }

  function toggleRow(id, checked) {
    if (checked) State.selectedIds.add(id);
    else          State.selectedIds.delete(id);
    const tr = DOM.tbody().querySelector(`tr[data-id="${id}"]`);
    if (tr) tr.classList.toggle('row--selected', checked);
    syncSelectAll();
    updateSelectedBar();
  }

  function syncSelectAll() {
    const cb = DOM.selectAll();
    const visibleIds      = State.filteredQuestions.map(q => q.id);
    const selectedVisible = visibleIds.filter(id => State.selectedIds.has(id));
    if (selectedVisible.length === 0) {
      cb.checked = false; cb.indeterminate = false;
    } else if (selectedVisible.length === visibleIds.length) {
      cb.checked = true;  cb.indeterminate = false;
    } else {
      cb.checked = false; cb.indeterminate = true;
    }
  }

  function handleSelectAll(checked) {
    State.filteredQuestions.forEach(q => {
      if (checked) State.selectedIds.add(q.id);
      else          State.selectedIds.delete(q.id);
    });
    render();
    updateSelectedBar();
  }

  function updateSelectedBar() {
    const count = State.selectedCount;
    DOM.selectedCount().textContent = `${count} question${count !== 1 ? 's' : ''} selected`;
    DOM.selectedMarks().textContent = count > 0 ? `${State.selectedMarks} total marks` : '';
    DOM.selectedBar().style.opacity = count > 0 ? '1' : '0.7';
  }

  function clearSelection() {
    State.selectedIds.clear();
    render();
    updateSelectedBar();
  }

  return { render, updateSelectedBar, clearSelection, handleSelectAll, bindHeaderClicks };
})();

/* ============================================================
   SECTION 7: CUSTOM QUESTION PARSER
   Supported formats:
     Q1. text [15]          Q1. text (15)        Q1. text 15 marks
     1. text [15]           1. text (15)          1. text 15
     6(a). text — 20        6(b). text — 15       Q7(a). text — 20
     6 (a). text — 20       Q7 (b). text [15]
   The exact label as written (e.g. "6(a)", "Q7(b)", "6") is preserved
   and printed on the PDF margin — no auto-renumbering.
   ============================================================ */
const CustomParser = (() => {

  // Captures:
  //  Group 1 = full label before the dot/paren  e.g. "Q6(a)", "6(b)", "7", "Q7 (a)"
  //  Group 2 = question text
  //  Group 3 = marks  (from [n], (n), — n, - n, or trailing n)
  //
  // Strategy: two passes
  //   Pass A — dash/em-dash marks at end:   LABEL. text — 20
  //   Pass B — bracket/paren marks at end:  LABEL. text [15]  or  LABEL. text (15)
  //   Pass C — bare number at end:          LABEL. text 15 marks  /  LABEL. text 15

  // Normalise em-dash, en-dash, hyphen variants to plain "-"
  function normaliseLine(line) {
    return line
      .replace(/\u2014/g, ' - ')   // em dash
      .replace(/\u2013/g, ' - ')   // en dash
      .replace(/\u2012/g, ' - ')   // figure dash
      .trim();
  }

  // Build the label string exactly as the user wrote it (without trailing dot)
  // e.g.  "Q6(a)"  "6(b)"  "Q7 (a)"  "7"
  const LABEL_RE = /^(Q\s*\d+\s*\([a-z]\)|Q\s*\d+|\d+\s*\([a-z]\)|\d+)/i;

  // After extracting label, consume the separator: "." or ")" or space
  // Then the rest is  "text — marks"  or  "text [marks]"  or  "text (marks)"  or  "text marks"

  const MARKS_DASH    = /^(.*?)\s*[-–]\s*(\d{1,3})\s*(?:marks?)?\s*$/i;
  const MARKS_BRACKET = /^(.*?)\s*[\[(](\d{1,3})[\])]\s*$/i;
  const MARKS_BARE    = /^(.*?)\s+(\d{1,3})\s*(?:marks?)?\s*$/i;

  function parseLine(line) {
    line = normaliseLine(line);

    const labelMatch = line.match(LABEL_RE);
    if (!labelMatch) return null;

    const rawLabel = labelMatch[1].replace(/\s+/g, ''); // compact spaces: "Q7 (a)" → "Q7(a)"
    let rest = line.slice(labelMatch[0].length).replace(/^[\s.)]+/, '').trim();

    if (!rest) return null;

    let text = null, marks = null;

    // Try dash marks first (most specific for the new format)
    let m = rest.match(MARKS_DASH);
    if (m) { text = m[1].trim(); marks = parseInt(m[2], 10); }

    // Try bracket / paren marks
    if (!marks) {
      m = rest.match(MARKS_BRACKET);
      if (m) { text = m[1].trim(); marks = parseInt(m[2], 10); }
    }

    // Try bare number at end
    if (!marks) {
      m = rest.match(MARKS_BARE);
      if (m && parseInt(m[2], 10) <= 250) { text = m[1].trim(); marks = parseInt(m[2], 10); }
    }

    if (!text || !marks || marks <= 0 || marks > 250) return null;

    // Clean stray trailing punctuation from question text
    text = text.replace(/\s*[-–.]+$/, '').trim();

    return { rawLabel, text, marks };
  }

  function parse(rawText) {
    if (!rawText) return [];
    const lines     = rawText.split('\n').map(l => l.trim()).filter(Boolean);
    const questions = [];

    lines.forEach((line, idx) => {
      const result = parseLine(line);
      if (!result) return;
      const { rawLabel, text, marks } = result;

      questions.push({
        id:       `custom_${idx}`,
        qno:      rawLabel,          // exact label: "6(a)", "Q7(b)", "6", etc.
        question: text,
        marks,
        paper:    'Custom',
        year:     new Date().getFullYear(),
        subject:  'Custom',
        subtopic: ''
      });
    });

    return questions;
  }

  function countDetected(rawText) { return parse(rawText).length; }

  return { parse, countDetected };
})();

/* ============================================================
   SECTION 8: PDF GENERATOR
   ============================================================ */
const PDFGenerator = (() => {

  const PAGE_W            = 210;
  const PAGE_H            = 297;
  // Remove dedicated right-margin column — use full usable width
  const MARGIN_LEFT_OUTER = 10;   // Q number sits here
  const MARGIN_LEFT_LINE  = 24;   // left vertical rule
  const MARGIN_LEFT_TEXT  = 28;   // text starts here
  const MARGIN_RIGHT_LINE = 188;  // right vertical rule (no wide right margin)
  const MARGIN_RIGHT_TEXT = 184;  // text wraps before here
  const MARGIN_TOP        = 18;
  const MARGIN_BOTTOM     = 18;
  const RIGHT_NOTE_X      = 194;  // "Candidates…" just outside right rule

  function pagesForMarks(marks) {
    if (marks === 10) return 1;
    if (marks === 15) return 1;
    if (marks === 20) return 1;
    if (marks === 125) return 15;
    return Math.ceil(marks / 5);
  }

  function drawPageFrame(doc) {
    doc.setDrawColor(110, 110, 110);
    doc.setLineWidth(0.3);
    doc.line(MARGIN_LEFT_LINE,  MARGIN_TOP - 4, MARGIN_LEFT_LINE,  PAGE_H - MARGIN_BOTTOM);
    doc.line(MARGIN_RIGHT_LINE, MARGIN_TOP - 4, MARGIN_RIGHT_LINE, PAGE_H - MARGIN_BOTTOM);
  }

  function drawRightMarginNote(doc) {
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    const noteLines = ['Candidates', 'must not', 'write on', 'this margin'];
    let y = MARGIN_TOP + 1;
    noteLines.forEach(line => { doc.text(line, RIGHT_NOTE_X, y); y += 3.8; });
    doc.setTextColor(0, 0, 0);
  }

  // Footer: booklet code (left, italic) + page number (centre, italic)
  function drawFooter(doc, footerCode, pageNum) {
    const footerY = PAGE_H - 15;
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'italic');   // ← italic footer
    doc.setTextColor(0, 0, 0);
    doc.text(footerCode, 12, footerY);
    doc.text(String(pageNum), (MARGIN_LEFT_LINE + MARGIN_RIGHT_LINE) / 2, footerY, { align: 'center' });
  }

  function drawQuestionPage(doc, questionText, qLabel, marksText, footerCode, pageNum) {
    drawPageFrame(doc);
    drawRightMarginNote(doc);

    const textAreaWidth = MARGIN_RIGHT_TEXT - MARGIN_LEFT_TEXT;

    // Question label — bold, outside left rule — exactly as provided
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(String(qLabel), MARGIN_LEFT_OUTER, MARGIN_TOP + 5);

    // Question text + marks inline at end — font size 11
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    const fullText = `${questionText} (${marksText} marks)`;
    const lines    = doc.splitTextToSize(fullText, textAreaWidth);
    let y = MARGIN_TOP + 5;
    lines.forEach(line => { doc.text(line, MARGIN_LEFT_TEXT, y); y += 6.5; });

    drawFooter(doc, footerCode, pageNum);
  }

  function drawAnswerPage(doc, footerCode, pageNum) {
    drawPageFrame(doc);
    drawRightMarginNote(doc);
    drawFooter(doc, footerCode, pageNum);
  }

  function generate(questions, footerCode, titleNote) {
    if (!questions || questions.length === 0) {
      Utils.showToast('No questions to generate.', 'error');
      return;
    }
    try {
      const { jsPDF } = window.jspdf;
      const doc  = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const code = footerCode || 'XXX-X-GS/0000';
      let pdfPageNumber = 1;
      let firstPage     = true;

      questions.forEach((q, index) => {
        const totalPgs = pagesForMarks(q.marks);
        // Use the stored qno label (e.g. "6(a)", "Q7(b)") if present,
        // otherwise fall back to sequential Q1, Q2… for PYQ mode
        const qLabel = q.qno || `Q${index + 1}`;
        if (!firstPage) doc.addPage();
        firstPage = false;
        drawQuestionPage(doc, q.question, qLabel, String(q.marks), code, pdfPageNumber);
        pdfPageNumber++;
        for (let i = 1; i < totalPgs; i++) {
          doc.addPage();
          drawAnswerPage(doc, code, pdfPageNumber);
          pdfPageNumber++;
        }
      });

      const filename = titleNote
        ? `QCAB_${titleNote.replace(/[^a-z0-9]/gi, '_')}.pdf`
        : `QCAB_${Date.now()}.pdf`;
      doc.save(filename);
      Utils.showToast('PDF generated successfully!', 'success');
    } catch (err) {
      console.error('PDF generation error:', err);
      Utils.showToast('PDF generation failed. Check console for details.', 'error');
    }
  }

  return { generate };
})();

/* ============================================================
   SECTION 9: MODAL CONTROLLER
   ============================================================ */
const Modal = (() => {
  let _pendingQuestions = null;

  function open(questions) {
    _pendingQuestions = questions;
    const totalMarks = questions.reduce((s, q) => s + q.marks, 0);
    const totalPages = questions.reduce((s, q) => {
      if (q.marks <= 10) return s + 2;
      if (q.marks <= 15) return s + 3;
      if (q.marks <= 20) return s + 4;
      return s + Math.ceil(q.marks / 5) + 1;
    }, 0);
    DOM.modalSummary().innerHTML =
      `<strong>${questions.length}</strong> question${questions.length !== 1 ? 's' : ''} &nbsp;&middot;&nbsp; ` +
      `<strong>${totalMarks}</strong> total marks &nbsp;&middot;&nbsp; ` +
      `<strong>${totalPages}</strong> pages in PDF`;
    DOM.pdfModal().classList.remove('hidden');
  }

  function close() {
    DOM.pdfModal().classList.add('hidden');
  }

  function confirm() {
    const questionsToGenerate = _pendingQuestions;
    if (!questionsToGenerate || questionsToGenerate.length === 0) {
      Utils.showToast('No questions to generate.', 'error');
      return;
    }
    const code  = DOM.pdfFooterCode().value.trim() || 'XXX-X-GS/0000';
    const title = DOM.pdfTitleInput().value.trim();
    close();
    _pendingQuestions = null;
    PDFGenerator.generate(questionsToGenerate, code, title);
  }

  return { open, close, confirm };
})();

/* ============================================================
   SECTION 10: CUSTOM PANEL CONTROLLER
   ============================================================ */
const CustomPanel = (() => {

  function showError(msg) {
    const el = DOM.customError();
    el.textContent = msg;
    el.classList.remove('hidden');
  }

  function hideError() { DOM.customError().classList.add('hidden'); }

  function updateCounter() {
    const count = CustomParser.countDetected(DOM.customInput().value);
    DOM.textareaCounter().textContent =
      count === 0 ? '0 questions detected'
                  : `${count} question${count !== 1 ? 's' : ''} detected`;
  }

  function renderPreview(questions) {
    const list = DOM.previewList();
    list.innerHTML = '';
    questions.forEach((q, i) => {
      const li = document.createElement('li');
      li.className = 'preview-item';
      li.innerHTML =
        `<span class="q-num">Q${i + 1}</span>` +
        `<span>${Utils.escapeHtml(q.question)}</span>` +
        `<span class="q-marks">${q.marks}M</span>`;
      list.appendChild(li);
    });
    DOM.customPreview().style.display = 'block';
  }

  function handlePreview() {
    hideError();
    const raw = DOM.customInput().value.trim();
    if (!raw) { showError('Please enter some questions first.'); return; }
    const parsed = CustomParser.parse(raw);
    if (parsed.length === 0) {
      showError('No valid questions found. Check the format — e.g. "Q1. Your question text. [15]"');
      return;
    }
    State.customParsed = parsed;
    renderPreview(parsed);
  }

  function handleGenerate() {
    hideError();
    const raw = DOM.customInput().value.trim();
    if (!raw) { showError('Please enter some questions first.'); return; }
    const parsed = CustomParser.parse(raw);
    if (parsed.length === 0) {
      showError('No valid questions found. Check the format — e.g. "Q1. Your question text. [15]"');
      return;
    }
    State.customParsed = parsed;
    Modal.open(parsed);
  }

  return { updateCounter, handlePreview, handleGenerate };
})();

/* ============================================================
   SECTION 11: MODE SWITCHER
   ============================================================ */
const ModeSwitcher = (() => {
  function switchTo(mode) {
    State.currentMode = mode;
    DOM.tabPyq().classList.toggle('active',      mode === 'pyq');
    DOM.tabCustom().classList.toggle('active',   mode === 'custom');
    DOM.panelPyq().classList.toggle('hidden',    mode !== 'pyq');
    DOM.panelCustom().classList.toggle('hidden', mode !== 'custom');
  }
  return { switchTo };
})();

/* ============================================================
   SECTION 12: EVENT BINDING
   ============================================================ */
const EventBinder = (() => {

  function bindAll() {
    // Mode tabs
    DOM.tabPyq().addEventListener('click',    () => ModeSwitcher.switchTo('pyq'));
    DOM.tabCustom().addEventListener('click', () => ModeSwitcher.switchTo('custom'));

    // Filters — auto-apply + cascade on change
    DOM.filterYear().addEventListener('change',     Filters.onYearOrPaperChange);
    DOM.filterPaper().addEventListener('change',    Filters.onYearOrPaperChange);
    DOM.filterSubject().addEventListener('change',  Filters.onSubjectChange);
    DOM.filterSubtopic().addEventListener('change', Filters.applyFilters);
    DOM.filterSearch().addEventListener('input',    Filters.applyFilters);
    DOM.filterSearch().addEventListener('keydown', e => {
      if (e.key === 'Enter') Filters.applyFilters();
    });

    // Apply/Reset buttons still available for manual use
    DOM.btnApply().addEventListener('click', Filters.applyFilters);
    DOM.btnReset().addEventListener('click', Filters.resetFilters);

    // Table selection
    DOM.selectAll().addEventListener('change', e => Table.handleSelectAll(e.target.checked));
    DOM.btnClearSel().addEventListener('click', Table.clearSelection);
    DOM.btnGeneratePyq().addEventListener('click', handleGeneratePyq);

    // Custom panel
    DOM.customInput().addEventListener('input',        CustomPanel.updateCounter);
    DOM.btnParsePreview().addEventListener('click',    CustomPanel.handlePreview);
    DOM.btnGenerateCustom().addEventListener('click',  CustomPanel.handleGenerate);

    // Modal
    DOM.modalClose().addEventListener('click',   Modal.close);
    DOM.modalCancel().addEventListener('click',  Modal.close);
    DOM.modalConfirm().addEventListener('click', Modal.confirm);
    DOM.pdfModal().addEventListener('click', e => {
      if (e.target === DOM.pdfModal()) Modal.close();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') Modal.close();
    });
  }

  function handleGeneratePyq() {
    const selected = State.selectedQuestions;
    if (selected.length === 0) {
      Utils.showToast('Please select at least one question.', 'error');
      return;
    }
    Modal.open(selected);
  }

  return { bindAll };
})();

/* ============================================================
   SECTION 13: INIT
   ============================================================ */
function init() {
  DataLayer.loadQuestions();
  Filters.initFilterDropdowns();
  Filters.updateFilterCount();
  Table.render();
  Table.updateSelectedBar();
  Table.bindHeaderClicks();   // wire sortable column headers
  EventBinder.bindAll();
}

document.addEventListener('DOMContentLoaded', init);
