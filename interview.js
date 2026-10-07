(() => {
  "use strict";

  const DATA_URL = "./data/interview_database.json";

  const state = {
    interviews: [],
    questionsByInterview: new Map(),
    filters: { date: "", board: "", daf: "", search: "" }
  };

  const $ = (id) => document.getElementById(id);

  function normalize(value) {
    return String(value ?? "").normalize("NFKC").toLowerCase().trim();
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function highlightText(value, query) {
    const text = String(value ?? "");
    const q = String(query ?? "").trim();
    if (!q) return escapeHtml(text);

    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(escaped, "gi");
    let output = "", last = 0, match;

    while ((match = re.exec(text)) !== null) {
      output += escapeHtml(text.slice(last, match.index));
      output += '<mark class="search-highlight">' + escapeHtml(match[0]) + "</mark>";
      last = match.index + match[0].length;
      if (match[0].length === 0) re.lastIndex++;
    }
    output += escapeHtml(text.slice(last));
    return output;
  }

  function countMatches(text, query) {
    const q = String(query ?? "").trim();
    if (!q) return 0;
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const matches = String(text ?? "").match(new RegExp(escaped, "gi"));
    return matches ? matches.length : 0;
  }

  function populateSelect(select, values, emptyLabel) {
    const current = select.value;
    select.innerHTML = `<option value="">${emptyLabel}</option>`;
    values.forEach(value => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
    if ([...select.options].some(o => o.value === current)) select.value = current;
  }

  function buildIndexes(data) {
    state.interviews = Array.isArray(data.interviews) ? data.interviews : [];
    state.questionsByInterview = new Map();

    for (const q of (data.questions || [])) {
      const id = q["Interview ID"];
      if (!state.questionsByInterview.has(id)) state.questionsByInterview.set(id, []);
      state.questionsByInterview.get(id).push(q);
    }

    const dates = [...new Set(state.interviews.map(x => x["Interview Date"]).filter(Boolean))]
      .sort((a, b) => b.localeCompare(a));

    const boards = [...new Set(state.interviews.map(x => x["Board"]).filter(Boolean))]
      .sort((a, b) => a.localeCompare(b));

    populateSelect($("interviewDate"), dates, "All dates");
    populateSelect($("interviewBoard"), boards, "All boards");
  }

  function interviewSearchText(interview, questions) {
    return [
      interview["Candidate"], interview["Interview Date"], interview["Board"],
      interview["DAF Details"], interview["DAF Keywords"],
      ...questions.map(q => [q["Member"], q["Question"], q["DAF Details"]].join(" "))
    ].join(" ");
  }

  function matchesFilters(interview) {
    const date = state.filters.date;
    const board = state.filters.board;
    const daf = normalize(state.filters.daf);
    const search = normalize(state.filters.search);

    if (date && interview["Interview Date"] !== date) return false;
    if (board && interview["Board"] !== board) return false;

    const questions = state.questionsByInterview.get(interview["Interview ID"]) || [];

    if (daf) {
      const dafText = normalize([interview["DAF Details"], interview["DAF Keywords"]].join(" "));
      if (!dafText.includes(daf)) return false;
    }

    if (search) {
      if (!normalize(interviewSearchText(interview, questions)).includes(search)) return false;
    }

    return true;
  }

  function renderInterview(interview) {
    const id = interview["Interview ID"];
    const questions = state.questionsByInterview.get(id) || [];
    const query = state.filters.search.trim();
    const fullText = interviewSearchText(interview, questions);
    const matches = countMatches(fullText, query);

    const daf = interview["DAF Details"] || interview["DAF Keywords"] || "Not available";
    const sourceLinks = String(interview["Telegram Links"] || "")
      .split(/[;,]+/).map(x => x.trim()).filter(Boolean);

    const questionsHtml = questions.length
      ? questions.map(q => `
          <article class="transcript-item">
            <div class="transcript-speaker">${escapeHtml(q["Member"] || "Transcript")}</div>
            <div class="transcript-text">${highlightText(q["Question"] || "", query)}</div>
          </article>
        `).join("")
      : `<div class="empty-state">No extracted transcript entries available for this interview.</div>`;

    const sourceHtml = sourceLinks.length
      ? `<div class="source-row">${sourceLinks.map(url => {
          const safe = escapeHtml(url);
          return `<a href="${safe}" target="_blank" rel="noopener noreferrer">Open source transcript</a>`;
        }).join("")}</div>`
      : "";

    return `
      <details class="interview-card">
        <summary>
          <div class="interview-head">
            <div>
              <div class="interview-title">${escapeHtml(interview["Candidate"] || "Candidate")}</div>
              <div class="interview-meta">
                ${escapeHtml(interview["Interview Date"] || "Date unavailable")}
                &nbsp;•&nbsp; Board: ${escapeHtml(interview["Board"] || "Unknown")}
                &nbsp;•&nbsp; ${questions.length} transcript entries
              </div>
            </div>
            ${query ? `<span class="match-badge">${matches} match${matches === 1 ? "" : "es"}</span>` : ""}
          </div>
        </summary>

        <div class="interview-body">
          <div class="daf-box">
            <strong>DAF / Background</strong>
            <div>${highlightText(daf, query)}</div>
          </div>
          <div class="transcript">${questionsHtml}</div>
          ${sourceHtml}
        </div>
      </details>
    `;
  }

  function render() {
    const results = state.interviews.filter(matchesFilters);
    const searchText = state.filters.search.trim();

    let status = `${results.length} interview${results.length === 1 ? "" : "s"} found`;
    if (searchText) status += ` for “${searchText}”`;

    $("interviewResults").innerHTML = results.length
      ? results.map(renderInterview).join("")
      : `<div class="empty-state"><strong>No interviews found.</strong><br>Try a broader search or clear one of the filters.</div>`;

    $("interviewStatus").textContent = status;
  }

  function bindEvents() {
    $("interviewDate").addEventListener("change", e => { state.filters.date = e.target.value; render(); });
    $("interviewBoard").addEventListener("change", e => { state.filters.board = e.target.value; render(); });
    $("dafSearch").addEventListener("input", e => { state.filters.daf = e.target.value; render(); });
    $("transcriptSearch").addEventListener("input", e => { state.filters.search = e.target.value; render(); });

    $("clearInterviewFilters").addEventListener("click", () => {
      state.filters = { date: "", board: "", daf: "", search: "" };
      $("interviewDate").value = "";
      $("interviewBoard").value = "";
      $("dafSearch").value = "";
      $("transcriptSearch").value = "";
      render();
    });
  }

  async function init() {
    try {
      const response = await fetch(DATA_URL, { cache: "no-store" });
      if (!response.ok) throw new Error(`Database request failed (${response.status})`);
      const data = await response.json();
      buildIndexes(data);
      bindEvents();
      render();
    } catch (error) {
      console.error(error);
      $("interviewStatus").textContent = "Could not load the interview database.";
      $("interviewResults").innerHTML = `
        <div class="load-error">
          <strong>Database could not be loaded.</strong><br>
          Check that <code>data/interview_database.json</code> exists in the repository and that the page is being opened through GitHub Pages.
        </div>`;
    }
  }

  init();
})();
