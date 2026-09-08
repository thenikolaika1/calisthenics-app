(()=>{
function todayReport(){
  if(typeof PROGRAM==='undefined'||typeof getWeekData!=='function'||typeof getTodayKey!=='function')return'';
  const day=getTodayKey(),p=PROGRAM[day],data=getWeekData(new Date()),date=new Date();
  const lines=[`ОТЧЁТ ЗА СЕГОДНЯ — ${date.toLocaleDateString('ru-RU',{day:'numeric',month:'long',year:'numeric'})}`,`${p.title} · ${p.subtitle}`,''];
  p.exercises.forEach((ex,i)=>{
    const id=`${day}:${i}`,done=data[id]===true?'✓':'○',cfg=typeof setConfig==='function'?setConfig(ex):{count:1,unit:'повт.'},unit=data[`${id}:unit`]||cfg.unit||'повт.';
    const vals=[];for(let s=0;s<cfg.count;s++){const v=data[`${id}:set:${s}`];if(v!==undefined&&v!=='')vals.push(v)}
    lines.push(`${done} ${ex[0]} — ${ex[1]}${vals.length?` | Результат: ${vals.join(' / ')} ${unit}`:''}`);
  });
  const note=(data[`v33:note:${day}`]||'').trim();
  lines.push('',`Выполнено: ${typeof completedForDay==='function'?completedForDay(data,day):0} из ${p.exercises.length}`);
  lines.push(`Заметка: ${note||'нет'}`);
  return lines.join('\n');
}
function install(){
  const btn=document.getElementById('shareWeekBtn');if(!btn||btn.dataset.daily62)return;btn.dataset.daily62='1';
  const fresh=btn.cloneNode(true);fresh.id='shareWeekBtn';fresh.textContent='Скопировать отчёт за сегодня';btn.replaceWith(fresh);
  const card=fresh.closest('.share-card');if(card){const kicker=card.querySelector('.mini'),h=card.querySelector('h3'),p=card.querySelector('p');if(kicker)kicker.textContent='ОТЧЁТ ЗА СЕГОДНЯ';if(h)h.textContent='Отправить сегодняшний отчёт';if(p)p.textContent='Копируются только сегодняшняя тренировка, результаты подходов и заметка за сегодня.'}
  fresh.addEventListener('click',async()=>{const text=todayReport();try{await navigator.clipboard.writeText(text);if(typeof showToast==='function')showToast('Отчёт за сегодня скопирован')}catch{const ta=document.createElement('textarea');ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();if(typeof showToast==='function')showToast('Отчёт за сегодня скопирован')}});
}
setTimeout(install,0);
})();