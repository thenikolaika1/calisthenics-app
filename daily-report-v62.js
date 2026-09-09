(()=>{
function todayData(){
  const now=new Date(),mon=typeof mondayOf==='function'?mondayOf(now):now;
  const key=typeof weekKey==='function'?weekKey(now):`week:${mon.getFullYear()}-${String(mon.getMonth()+1).padStart(2,'0')}-${String(mon.getDate()).padStart(2,'0')}`;
  try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return{}}
}
function todayReport(){
  if(typeof PROGRAM==='undefined'||typeof getTodayKey!=='function')return'';
  const day=getTodayKey(),p=PROGRAM[day],data=todayData(),date=new Date(),lines=[`ОТЧЁТ ЗА СЕГОДНЯ — ${date.toLocaleDateString('ru-RU',{day:'numeric',month:'long',year:'numeric'})}`,`${p.title} · ${p.subtitle}`,''];
  let doneCount=0;
  p.exercises.forEach((ex,i)=>{
    const id=typeof exerciseId==='function'?exerciseId(day,i):`${day}:${i}`,checked=data[id]===true;
    if(checked)doneCount++;
    const cfg=typeof setConfig==='function'?setConfig(ex):{count:1,unit:'повт.'};
    const ukey=typeof unitId==='function'?unitId(day,i):`${id}:unit`,unit=data[ukey]||cfg.unit||'повт.',vals=[];
    for(let s=0;s<cfg.count;s++){
      const skey=typeof setValueId==='function'?setValueId(day,i,s):`${id}:set:${s}`,v=data[skey];
      vals.push(v!==undefined&&v!==''?String(v):'—');
    }
    lines.push(`${checked?'✓':'○'} ${ex[0]} — ${ex[1]}`);
    lines.push(`  Подходы: ${vals.join(' / ')} ${unit}`);
  });
  const noteKey=`v33:note:${day}`,note=String(data[noteKey]||'').trim();
  const band=String(data[`v33:band:${day}`]||'').trim();
  lines.push('',`Выполнено: ${doneCount} из ${p.exercises.length} упражнений`);
  if(band&&band!=='Не указана')lines.push(`Резинка: ${band}`);
  lines.push('',`КОММЕНТАРИЙ К ТРЕНИРОВКЕ:\n${note||'Нет комментария'}`);
  return lines.join('\n');
}
function install(){
  const btn=document.getElementById('shareWeekBtn');if(!btn||btn.dataset.daily64)return;btn.dataset.daily64='1';
  const fresh=btn.cloneNode(true);fresh.id='shareWeekBtn';fresh.textContent='Скопировать отчёт за сегодня';btn.replaceWith(fresh);
  const card=fresh.closest('.share-card');if(card){const kicker=card.querySelector('.mini'),h=card.querySelector('h3'),p=card.querySelector('p');if(kicker)kicker.textContent='ОТЧЁТ ЗА СЕГОДНЯ';if(h)h.textContent='Отправить сегодняшний отчёт';if(p)p.textContent='Копируются сегодняшние упражнения, повторы по каждому подходу и комментарий к тренировке.'}
  fresh.addEventListener('click',async()=>{const text=todayReport();try{await navigator.clipboard.writeText(text);if(typeof showToast==='function')showToast('Отчёт за сегодня скопирован')}catch{const ta=document.createElement('textarea');ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();if(typeof showToast==='function')showToast('Отчёт за сегодня скопирован')}});
}
setTimeout(install,0);
})();