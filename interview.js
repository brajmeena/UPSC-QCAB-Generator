(() => {
  'use strict';
  const DATA_URL='./data/interview_database.json';
  const state={data:[], tags:[], date:'', board:'', search:''};
  const $=id=>document.getElementById(id);
  const STOP=new Set(['the','and','for','from','with','that','this','what','where','when','have','has','are','was','were','you','your','into','about','will','would','could','should','tell','asked','said','sir','mam','maam','chairman','chairperson','member']);

  function norm(s){return String(s??'').normalize('NFKC').toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim()}
  function esc(s){return String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;')}
  function lev(a,b){a=norm(a);b=norm(b);if(a===b)return 0;if(!a)return b.length;if(!b)return a.length;let prev=Array(b.length+1);for(let j=0;j<=b.length;j++)prev[j]=j;for(let i=1;i<=a.length;i++){let cur=[i];for(let j=1;j<=b.length;j++){cur[j]=Math.min(cur[j-1]+1,prev[j]+1,prev[j-1]+(a[i-1]===b[j-1]?0:1))}prev=cur}return prev[b.length]}
  function sim(a,b){a=norm(a);b=norm(b);if(!a||!b)return 0;if(a===b)return 1;if(a.length>=4&&b.includes(a))return .98;if(b.length>=4&&a.includes(b))return .98;const d=lev(a,b);return 1-d/Math.max(a.length,b.length)}
  function tokens(s){return norm(s).split(' ').filter(x=>x&&!STOP.has(x))}
  function fuzzyContains(text,query){const q=tokens(query);if(!q.length)return true;const hay=tokens(text);for(const qt of q){if(hay.some(ht=>sim(qt,ht)>=.78))continue;return false}return true}
  function highlight(text,query){const raw=String(text??'');const q=tokens(query);if(!q.length)return esc(raw);let parts=[];let re=/([A-Za-z0-9][A-Za-z0-9’'_-]*)/g,last=0,m;while((m=re.exec(raw))){const w=m[0];const hit=q.some(x=>sim(x,w)>=.78);parts.push(esc(raw.slice(last,m.index)));parts.push(hit?`<mark>${esc(w)}</mark>`:esc(w));last=m.index+w.length}parts.push(esc(raw.slice(last)));return parts.join('')}
  function dateDisplay(d){const [y,m,day]=d.split('-');return `${day}-${m}-${y}`}
  function sourceLink(url){const safe=esc(url);return `<a href="${safe}" target="_blank" rel="noopener noreferrer">${safe}</a>`}
  function searchable(r){return [r.name,r.board,r.date,r.daf_keywords.join(' '),r.transcript].join(' ')}
  function dafMatch(r){return state.tags.every(tag=>r.daf_keywords.some(k=>sim(tag,k)>=.76||norm(k).includes(norm(tag))||norm(tag).includes(norm(k))))}
  function filtered(){return state.data.filter(r=>{if(state.date&&r.date!==state.date)return false;if(state.board&&r.board!==state.board)return false;if(!dafMatch(r))return false;if(state.search&&!fuzzyContains(searchable(r),state.search))return false;return true})}
  function renderTags(){const box=$('tagBox');box.querySelectorAll('.tag-chip').forEach(x=>x.remove());const input=$('tagInput');state.tags.forEach((t,i)=>{const c=document.createElement('span');c.className='tag-chip';c.innerHTML=`#${esc(t)} <button type="button" aria-label="Remove ${esc(t)}" data-i="${i}">×</button>`;box.insertBefore(c,input)})}
  function addTag(v){v=norm(v);if(!v)return;if(!state.tags.includes(v))state.tags.push(v);renderTags();$('tagInput').value='';showSuggestions('') ;render()}
  function showSuggestions(q){const s=$('suggestions');const nq=norm(q);if(!nq){s.hidden=true;return}const vals=new Map();for(const r of state.data)for(const k of r.daf_keywords){if(sim(nq,k)>=.55)vals.set(k,k)}const arr=[...vals.keys()].sort((a,b)=>sim(nq,b)-sim(nq,a)).slice(0,10);if(!arr.length){s.hidden=true;return}s.innerHTML=arr.map(k=>`<div class="suggestion" data-value="${esc(k)}">#${esc(k)}</div>`).join('');s.hidden=false}
  function populate(){const dates=[...new Set(state.data.map(r=>r.date))].sort().reverse();$('dateFilter').innerHTML='<option value="">All dates</option>'+dates.map(d=>`<option value="${d}">${dateDisplay(d)}</option>`).join('');const boards=[...new Set(state.data.map(r=>r.board))].sort((a,b)=>a.localeCompare(b));$('boardFilter').innerHTML='<option value="">All boards</option>'+boards.map(b=>`<option value="${esc(b)}">${esc(b)}</option>`).join('');}
  function render(){const rows=filtered();$('resultLabel').textContent=`Results · ${rows.length} interview${rows.length===1?'':'s'}`;
    if(!rows.length){$('results').innerHTML='<div class="empty"><strong>No matching transcripts</strong><span>Try a broader spelling or remove a filter.</span></div>';return}
    $('results').innerHTML=rows.map(r=>{const tags=r.daf_keywords.slice(0,8).map(k=>`<span class="mini-tag">#${esc(k)}</span>`).join('');const more=r.daf_keywords.length>8?`<span class="more-tags">+${r.daf_keywords.length-8} more</span>`:'';const text=highlight(r.transcript,state.search);return `<details class="result-card"><summary class="result-summary"><span class="date">${dateDisplay(r.date)}</span><span class="board">Board: ${esc(r.board)}</span><span class="daf-line">${tags}${more}</span><span class="chevron">⌄</span></summary><div class="transcript-wrap"><div class="transcript-meta"><span>${esc(r.name||'candidate')} · ${esc(r.id)}</span><a class="open-source" href="${esc(r.telegram_url)}" target="_blank" rel="noopener noreferrer">Open Telegram source ↗</a></div><div class="transcript">${text}</div></div></details>`}).join('')}
  function clear(){state.tags=[];state.date='';state.board='';state.search='';$('dateFilter').value='';$('boardFilter').value='';$('searchInput').value='';$('tagInput').value='';renderTags();$('suggestions').hidden=true;render()}
  function bind(){ $('dateFilter').addEventListener('change',e=>{state.date=e.target.value;render()});$('boardFilter').addEventListener('change',e=>{state.board=e.target.value;render()});$('searchInput').addEventListener('input',e=>{state.search=e.target.value;render()});$('tagInput').addEventListener('input',e=>showSuggestions(e.target.value));$('tagInput').addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===',')&&e.target.value.trim()){e.preventDefault();addTag(e.target.value.replace(',',''))}if(e.key==='Backspace'&&!e.target.value&&state.tags.length){state.tags.pop();renderTags();render()}});$('tagBox').addEventListener('click',e=>{const b=e.target.closest('button[data-i]');if(b){state.tags.splice(Number(b.dataset.i),1);renderTags();render();return}$('tagInput').focus()});$('suggestions').addEventListener('click',e=>{const x=e.target.closest('.suggestion');if(x)addTag(x.dataset.value)});$('clearBtn').addEventListener('click',clear);document.addEventListener('click',e=>{if(!e.target.closest('.tag-wrap'))$('suggestions').hidden=true})}
  async function init(){try{const res=await fetch(DATA_URL,{cache:'no-store'});if(!res.ok)throw new Error(res.status);const payload=await res.json();state.data=payload.interviews||[];populate();bind();render()}}catch(err){
    console.error('Interview database error:', err);
    $('results').innerHTML =
      `<div class="empty">
        <strong>Database could not be loaded</strong>
        <span>${esc(err.message || err)}</span>
      </div>`;
    }
  init();
})();
