(()=>{
  function week(){return typeof viewedWeek!=='undefined'?viewedWeek:new Date()}
  function key(k,s=''){return`v33:${k}:${s}`}
  function notesBlock(){
    if(typeof getWeekData!=='function'||typeof DAYS==='undefined')return'';
    const d=getWeekData(week()),lines=[];
    DAYS.forEach(([k,name])=>{
      const note=(d[key('note',k)]||'').trim();
      if(note)lines.push(`${name}: ${note}`);
    });
    return lines.length?`\n\nСАМОЧУВСТВИЕ И ЗАМЕТКИ\n${lines.join('\n')}`:'\n\nСАМОЧУВСТВИЕ И ЗАМЕТКИ\nЗаметок за неделю нет.';
  }
  function enhance(){
    if(typeof makeReport!=='function'||makeReport.__notesV40)return;
    const base=makeReport;
    const wrapped=function(...args){const text=base.apply(this,args);return typeof text==='string'?text+notesBlock():text};
    wrapped.__notesV40=true;makeReport=wrapped;
  }
  enhance();setTimeout(enhance,0);
  const card=document.querySelector('.share-card');
  if(card){const p=card.querySelector('p');if(p)p.textContent='Отчёт за выбранную неделю включает результаты, выполнение тренировок и твои заметки о самочувствии и технике.'}
})();