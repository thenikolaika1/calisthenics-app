(()=>{
  const BANDS34=['Не указана','Очень слабая','Слабая','Средняя','Сильная','Без резинки'];
  function key(k,s=''){return`v33:${k}:${s}`}
  function week(){return typeof viewedWeek!=='undefined'?viewedWeek:new Date()}
  function refreshBandPicker(){
    const tools=document.querySelector('.workout-tools');
    if(!tools||typeof selectedDay==='undefined')return;
    const old=tools.querySelector('.band-picker');
    if(!old)return;
    const d=getWeekData(week()),k=selectedDay;
    let wrap=tools.querySelector('.band-picker-v34');
    if(!wrap){
      wrap=document.createElement('div');wrap.className='band-picker-v34';
      wrap.innerHTML=`<div class="band34-title"><span>Резинки для выходов</span><small>Можно выбрать одну или две</small></div><div class="band34-grid"><select class="band-select band34-one">${BANDS34.map(x=>`<option>${x}</option>`).join('')}</select><select class="band-select band34-two"><option>Вторая не используется</option>${BANDS34.filter(x=>!['Не указана','Без резинки'].includes(x)).map(x=>`<option>${x}</option>`).join('')}</select></div>`;
      old.replaceWith(wrap);
    }
    const one=wrap.querySelector('.band34-one'),two=wrap.querySelector('.band34-two');
    let saved=d[key('band',k)]||'Не указана',saved2=d[key('band2',k)]||'Вторая не используется';
    if(!BANDS34.includes(saved))saved=saved==='Сильная'?'Сильная':saved==='Средняя'?'Средняя':saved==='Слабая'?'Слабая':saved==='Без резинки'?'Без резинки':'Не указана';
    one.value=saved;two.value=saved2;
    function store(){const x=getWeekData(week());x[key('band',k)]=one.value;x[key('band2',k)]=two.value;saveWeekData(x,week());}
    one.onchange=()=>{if(one.value==='Без резинки')two.value='Вторая не используется';store()};
    two.onchange=store;
  }
  function combinedBandLabel(d,k){const a=d[key('band',k)]||'Не указана',b=d[key('band2',k)]||'Вторая не используется';return b&&b!=='Вторая не используется'?`${a} + ${b}`:a}
  window.bandLabelV34=combinedBandLabel;
  if(typeof renderWeek==='function'){const base=renderWeek;renderWeek=function(...a){const r=base.apply(this,a);setTimeout(refreshBandPicker,0);return r}}
  setTimeout(refreshBandPicker,0);
})();