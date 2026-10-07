(() => {
  'use strict';
  const DATA_URL='./data/interview_database.json';
  const state={data:[],dates:[],boards:[],allTags:[],selectedTags:[],date:'',board:'',search:''};
  const $=id=>document.getElementById(id);
  const norm=s=>String(s??'').normalize('NFKC').toLowerCase().trim();
  const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');

  function levenshtein(a,b){
    a=norm(a);b=norm(b); if(a===b)return 0;if(!a.length)return b.length;if(!b.length)return a.length;
    let prev=Array.from({length:b.length+1},(_,i)=>i),cur=new Array(b.length+1);
    for(let i=1;i<=a.length;i++){cur[0]=i;for(let j=1;j<=b.length;j++)cur[j]=Math.min(cur[j-1]+1,prev[j]+1,prev[j-1]+(a[i-1]===b[j-1]?0:1));[prev,cur]=[cur,prev];} return prev[b.length];
  }
  function threshold(q){const n=q.length;return n<=3?0:n<=7?1:2;}
  function fuzzyTokenMatch(q,w){q=norm(q);w=norm(w);if(!q)return false;if(w===q)return true;if(q.length<=3)return false;if(Math.abs(q.length-w.length)>threshold(q))return false;return levenshtein(q,w)<=threshold(q);}
  function words(text){const out=[];const re=/[\p{L}\p{N}]+/gu;let m;while((m=re.exec(String(text??'')))!==null)out.push({word:m[0],start:m.index,end:m.index+m[0].length});return out;}
  function tokensForQuery(q){return norm(q).split(/\s+/).filter(Boolean);}
  function hasFuzzyToken(text,q){const ws=words(text);return tokensForQuery(q).every(qt=>ws.some(x=>fuzzyTokenMatch(qt,x.word)));}
  function queryMatchesTranscript(text,q){q=String(q??'').trim();if(!q)return true;return hasFuzzyToken(text,q);}
  function highlight(text,q){
    text=String(text??'');q=String(q??'').trim();if(!q)return esc(text);
    const qs=tokensForQuery(q), ws=words(text), spans=[];
    for(const w of ws){if(qs.some(qt=>fuzzyTokenMatch(qt,w.word)))spans.push([w.start,w.end]);}
    if(!spans.length)return esc(text);
    spans.sort((a,b)=>a[0]-b[0]); const merged=[];
    for(const s of spans){if(!merged.length||s[0]>merged[merged.length-1][1])merged.push(s);else merged[merged.length-1][1]=Math.max(merged[merged.length-1][1],s[1]);}
    let out='',last=0;for(const [a,b] of merged){out+=esc(text.slice(last,a));out+='<mark class="iv-hit">'+esc(text.slice(a,b))+'</mark>';last=b;}out+=esc(text.slice(last));return out;
  }
  function populate(select,vals,label){select.innerHTML='<option value="">'+label+'</option>';vals.forEach(v=>{const o=document.createElement('option');o.value=v;o.textContent=v;select.appendChild(o);});}
  function tagHtml(tags){return tags.length?tags.map(t=>'<span class="iv-daf-hash">#'+esc(t)+'</span>').join(' '):'—';}

  function renderTags(){
    const box=$('iv-tagbox'),input=$('iv-tag-input');box.querySelectorAll('.iv-tag').forEach(x=>x.remove());
    state.selectedTags.forEach((tag,i)=>{const el=document.createElement('span');el.className='iv-tag';el.innerHTML=esc(tag)+' <span class="iv-tag-x" data-i="'+i+'">×</span>';box.insertBefore(el,input);});
  }
  function addTag(value){value=value.trim().replace(/^#/,'');if(!value)return;if(!state.selectedTags.some(x=>norm(x)===norm(value)))state.selectedTags.push(value);$('iv-tag-input').value='';hideSuggestions();renderTags();render();}
  function removeTag(i){state.selectedTags.splice(i,1);renderTags();render();}
  function showSuggestions(){
    const q=norm($('iv-tag-input').value),box=$('iv-suggestions');if(!q){hideSuggestions();return;}
    const vals=state.allTags.filter(t=>!state.selectedTags.some(s=>norm(s)===norm(t))).filter(t=>hasFuzzyToken(t,q)).slice(0,15);
    box.innerHTML=vals.map(t=>'<div class="iv-suggestion" data-tag="'+esc(t)+'">#'+esc(t)+'</div>').join('');box.style.display=vals.length?'block':'none';
  }
  function hideSuggestions(){$('iv-suggestions').style.display='none';}

  function transcriptMatches(r){
    if(state.date&&r.date!==state.date)return false;if(state.board&&r.board!==state.board)return false;
    if(state.selectedTags.length){const pool=[...(r.daf_keywords||[]),r.daf_text||''];if(!state.selectedTags.every(tag=>pool.some(x=>hasFuzzyToken(String(x),tag))))return false;}
    if(state.search&&!queryMatchesTranscript(r.transcript,state.search))return false;
    return true;
  }
  function matchCount(text,q){if(!q)return 0;const qs=tokensForQuery(q),ws=words(text);return ws.filter(w=>qs.some(qt=>fuzzyTokenMatch(qt,w.word))).length;}

  function render(){
    const results=state.data.filter(transcriptMatches);const q=state.search.trim();
    $('iv-count').textContent=results.length+' transcript'+(results.length===1?'':'s')+' found';
    $('iv-query-note').textContent=q?'for “'+q+'”':'';
    if(!results.length){$('iv-results').innerHTML='<div class="iv-empty"><b>No matching transcripts.</b><br>Try a broader keyword, remove a filter, or correct the spelling.</div>';return;}
    $('iv-results').innerHTML=results.map(r=>{
      const matches=matchCount(r.transcript,q);
      const daf=tagHtml(r.daf_keywords||[]);
      return `<details class="iv-result"><summary><div class="iv-result-head"><span class="iv-date">${esc(r.date)}</span><span class="iv-board">Board: ${esc(r.board)}</span><span class="iv-daf">DAF: ${daf}</span>${q?`<span class="iv-match">${matches} match${matches===1?'':'es'}</span>`:''}</div></summary><div class="iv-transcript-wrap"><pre class="iv-transcript">${highlight(r.transcript,q)}</pre></div></details>`;
    }).join('');
  }
  function clear(){state.date='';state.board='';state.search='';state.selectedTags=[];$('iv-date').value='';$('iv-board').value='';$('iv-search').value='';$('iv-tag-input').value='';renderTags();hideSuggestions();render();}

  async function init(){
    try{
      const res=await fetch(DATA_URL,{cache:'no-store'});if(!res.ok)throw new Error('HTTP '+res.status);const db=await res.json();state.data=db.transcripts||[];
      state.dates=[...new Set(state.data.map(x=>x.date).filter(Boolean))].sort().reverse();state.boards=[...new Set(state.data.map(x=>x.board).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
      state.allTags=[...new Map(state.data.flatMap(x=>x.daf_keywords||[]).map(t=>[norm(t),t])).values()].sort((a,b)=>a.localeCompare(b));
      populate($('iv-date'),state.dates,'All dates');populate($('iv-board'),state.boards,'All boards');bind();render();
    }catch(e){console.error(e);$('iv-count').textContent='Database error';$('iv-results').innerHTML='<div class="iv-error"><b>Could not load the database.</b><br>Make sure <code>data/interview_database.json</code> is present in the repository.</div>';}
  }
  function bind(){
    $('iv-date').addEventListener('change',e=>{state.date=e.target.value;render();});
    $('iv-board').addEventListener('change',e=>{state.board=e.target.value;render();});
    $('iv-search').addEventListener('input',e=>{state.search=e.target.value;render();});
    $('iv-clear').addEventListener('click',clear);
    $('iv-tag-input').addEventListener('input',showSuggestions);
    $('iv-tag-input').addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===',')&&e.target.value.trim()){e.preventDefault();addTag(e.target.value.replace(',',''));}else if(e.key==='Backspace'&&!e.target.value&&state.selectedTags.length)removeTag(state.selectedTags.length-1);else if(e.key==='Escape')hideSuggestions();});
    $('iv-tagbox').addEventListener('click',e=>{const x=e.target.closest('.iv-tag-x');if(x)removeTag(Number(x.dataset.i));else $('iv-tag-input').focus();});
    $('iv-suggestions').addEventListener('click',e=>{const x=e.target.closest('.iv-suggestion');if(x)addTag(x.dataset.tag);});
    document.addEventListener('click',e=>{if(!e.target.closest('#iv-tagbox'))hideSuggestions();});
  }
  init();
})();
