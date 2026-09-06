(()=>{
  const BANDS34=['Не указана','Очень слабая','Слабая','Средняя','Сильная','Без резинки'];
  function key(k,s=''){return`v33:${k}:${s}`}
  function week(){return typeof viewedWeek!=='undefined'?viewedWeek:new Date()}
  function options(selected,second=false){const list=second?['Не использовать','Очень слабая','Слабая','Средняя','Сильная']:BANDS34;return list.map(x=>`<option${x===selected?' selected':''}>${x}</option>`).join('')}
  function refreshBandPicker(){
    const tools=document.querySelector('.workout-tools');if(!tools||typeof selectedDay==='undefined')return;
    const d=getWeekData(week()),k=selectedDay;let saved=d[key('band',k)]||'Не указана',saved2=d[key('band2',k)]||'Не использовать';if(saved2==='Вторая не используется')saved2='Не использовать';
    let wrap=tools.querySelector('.band-picker-v34');const old=tools.querySelector('.band-picker');
    if(!wrap){wrap=document.createElement('div');wrap.className='band-picker-v34 band-picker-v36';wrap.innerHTML='<div class="band34-title"><div><span>Резинки для выходов</span><small>Укажи помощь в этой тренировке</small></div></div><div class="band36-field"><label>Основная резинка</label><select class="band-select band34-one"></select></div><div class="band36-second-head"><span>Вторая резинка</span><button type="button" class="band36-toggle">+ Добавить</button></div><div class="band36-field band36-second"><label>Дополнительная резинка</label><select class="band-select band34-two"></select></div>';if(old)old.replaceWith(wrap);else tools.prepend(wrap)}
    const one=wrap.querySelector('.band34-one'),two=wrap.querySelector('.band34-two'),second=wrap.querySelector('.band36-second'),toggle=wrap.querySelector('.band36-toggle');one.innerHTML=options(saved);two.innerHTML=options(saved2,true);one.value=saved;two.value=saved2;
    const showSecond=()=>{const on=two.value!=='Не использовать';second.classList.toggle('show',on);toggle.textContent=on?'− Убрать':'+ Добавить';wrap.classList.toggle('has-second',on)};showSecond();
    function store(){const x=getWeekData(week());x[key('band',k)]=one.value;x[key('band2',k)]=two.value;saveWeekData(x,week())}
    one.onchange=()=>{if(one.value==='Без резинки'){two.value='Не использовать'}showSecond();store()};two.onchange=()=>{showSecond();store()};toggle.onclick=()=>{if(two.value==='Не использовать'){two.value='Очень слабая'}else two.value='Не использовать';showSecond();store()};
  }
  function combinedBandLabel(d,k){const a=d[key('band',k)]||'Не указана',raw=d[key('band2',k)]||'Не использовать',b=raw==='Вторая не используется'?'Не использовать':raw;return b&&b!=='Не использовать'?`${a} + ${b}`:a}
  window.bandLabelV34=combinedBandLabel;
  if(typeof renderWeek==='function'){const base=renderWeek;renderWeek=function(...a){const r=base.apply(this,a);setTimeout(refreshBandPicker,0);return r}}
  setTimeout(refreshBandPicker,0);
})();