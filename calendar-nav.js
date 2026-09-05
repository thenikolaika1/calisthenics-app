(()=>{
  const originalGetWeekData=getWeekData;
  const originalSaveWeekData=saveWeekData;
  const originalDayDate=dayDate;
  let viewedWeek=mondayOf(new Date());

  getWeekData=function(date){return originalGetWeekData(date===undefined?viewedWeek:date)};
  saveWeekData=function(data,date){return originalSaveWeekData(data,date===undefined?viewedWeek:date)};
  dayDate=function(i,date){return originalDayDate(i,date===undefined?viewedWeek:date)};

  const weekSection=document.querySelector('.week-section');
  if(!weekSection)return;

  const nav=document.createElement('div');
  nav.className='calendar-nav';
  nav.innerHTML=`
    <div class="calendar-row month-row">
      <button id="prevMonthBtn" class="calendar-arrow" type="button" aria-label="Предыдущий месяц">‹</button>
      <div class="calendar-center">
        <span>МЕСЯЦ</span>
        <strong id="monthNavLabel"></strong>
      </div>
      <button id="nextMonthBtn" class="calendar-arrow" type="button" aria-label="Следующий месяц">›</button>
    </div>
    <div class="calendar-row week-row">
      <button id="prevWeekBtn" class="calendar-step" type="button">‹ Пред.</button>
      <div class="calendar-center">
        <span>НЕДЕЛЯ</span>
        <strong id="weekNavLabel"></strong>
      </div>
      <button id="nextWeekBtn" class="calendar-step" type="button">След. ›</button>
    </div>`;
  weekSection.insertBefore(nav,weekSection.firstChild);

  const currentWeek=()=>mondayOf(new Date());
  const weekMonthDate=(week=viewedWeek)=>{const d=mondayOf(week);d.setDate(d.getDate()+3);return d};
  const monthIndex=d=>d.getFullYear()*12+d.getMonth();
  const sameWeek=(a,b)=>mondayOf(a).getTime()===mondayOf(b).getTime();
  const monthName=d=>{
    const text=new Intl.DateTimeFormat('ru-RU',{month:'long',year:'numeric'}).format(d).replace(' г.','');
    return text.charAt(0).toUpperCase()+text.slice(1);
  };
  const shortRange=(mon,sun)=>`${mon.toLocaleDateString('ru-RU',{day:'numeric',month:'short'})} — ${sun.toLocaleDateString('ru-RU',{day:'numeric',month:'short'})}`;

  function updateNav(){
    const mon=mondayOf(viewedWeek),sun=new Date(mon);sun.setDate(sun.getDate()+6);
    const monthDate=weekMonthDate(mon),now=new Date();
    const atCurrentWeek=sameWeek(mon,currentWeek());
    const atCurrentMonth=monthIndex(monthDate)>=monthIndex(now);
    const monthLabel=document.getElementById('monthNavLabel');
    const weekLabel=document.getElementById('weekNavLabel');
    const nextWeek=document.getElementById('nextWeekBtn');
    const nextMonth=document.getElementById('nextMonthBtn');
    if(monthLabel)monthLabel.textContent=monthName(monthDate);
    if(weekLabel)weekLabel.textContent=shortRange(mon,sun);
    if(nextWeek){nextWeek.disabled=atCurrentWeek;nextWeek.textContent=atCurrentWeek?'След. 🔒':'След. ›';nextWeek.setAttribute('aria-label',atCurrentWeek?'Следующая неделя пока заблокирована':'Следующая неделя')}
    if(nextMonth){nextMonth.disabled=atCurrentMonth;nextMonth.textContent=atCurrentMonth?'🔒':'›';nextMonth.setAttribute('aria-label',atCurrentMonth?'Следующий месяц пока заблокирован':'Следующий месяц')}
    const caption=document.querySelector('.week-section .section-head .mini');
    if(caption)caption.textContent=atCurrentWeek?'ЭТА НЕДЕЛЯ':'ВЫБРАННАЯ НЕДЕЛЯ';
  }

  function moveWeek(offset){
    const candidate=mondayOf(viewedWeek);candidate.setDate(candidate.getDate()+offset*7);
    if(candidate>currentWeek())return;
    viewedWeek=candidate;openExercise=null;renderWeek();
  }

  function moveMonth(offset){
    const base=weekMonthDate(viewedWeek);
    const target=new Date(base.getFullYear(),base.getMonth()+offset,15);
    const now=new Date();
    if(monthIndex(target)>monthIndex(now))return;
    viewedWeek=monthIndex(target)===monthIndex(now)?currentWeek():mondayOf(target);
    openExercise=null;renderWeek();
  }

  const originalRenderWeek=renderWeek;
  renderWeek=function(){
    const mon=mondayOf(viewedWeek),sun=dayDate(6),data=getWeekData(),done=countCompleted(data),total=totalExercises(),pct=total?Math.round(done/total*100):0;
    $('#weekLabel').textContent=`${mon.toLocaleDateString('ru-RU',{day:'numeric',month:'short'})} — ${sun.toLocaleDateString('ru-RU',{day:'numeric',month:'short'})}`;
    $('#weekPercent').textContent=`${pct}%`;
    $('#weekProgressBar').style.width=`${pct}%`;
    const strip=$('#dayStrip');strip.innerHTML='';
    DAYS.forEach(([key,label],i)=>{
      const b=document.createElement('button');b.type='button';
      b.className='day-btn'+(key===selectedDay?' active':'')+(dayIsDone(data,key)?' done':'');
      b.setAttribute('aria-label',`${PROGRAM[key].title}, ${dayDate(i).getDate()}`);
      b.innerHTML=`<span class="dname">${label}</span><span class="dnum">${dayDate(i).getDate()}</span>`;
      b.onclick=()=>{selectedDay=key;openExercise=null;renderWeek()};
      strip.appendChild(b);
    });
    renderDay(data);
    updateMenuSummary(originalGetWeekData(new Date()));
    updateNav();
  };

  makeReport=function(){
    const data=getWeekData(),mon=mondayOf(viewedWeek),sun=dayDate(6),done=countCompleted(data),total=totalExercises(),lines=['КАЛИСТЕНИКА — ОТЧЁТ ЗА НЕДЕЛЮ',`${mon.toLocaleDateString('ru-RU')} — ${sun.toLocaleDateString('ru-RU')}`,`Выполнено: ${done}/${total} (${total?Math.round(done/total*100):0}%)`,''];
    DAYS.forEach(([k])=>{const c=completedForDay(data,k),t=PROGRAM[k].exercises.length;lines.push(`${PROGRAM[k].title}: ${c}/${t}${c===t?' ✓':''}`);PROGRAM[k].exercises.forEach((ex,i)=>{const r=exerciseResults(data,k,i,ex);if(r)lines.push(`  • ${ex[0]}: ${r}`)})});
    lines.push('','Комментарий: ');return lines.join('\n');
  };

  document.getElementById('prevWeekBtn').addEventListener('click',()=>moveWeek(-1));
  document.getElementById('nextWeekBtn').addEventListener('click',()=>moveWeek(1));
  document.getElementById('prevMonthBtn').addEventListener('click',()=>moveMonth(-1));
  document.getElementById('nextMonthBtn').addEventListener('click',()=>moveMonth(1));

  const todayButton=document.getElementById('menuToday');
  if(todayButton)todayButton.addEventListener('click',()=>{viewedWeek=currentWeek();selectedDay=getTodayKey();openExercise=null;renderWeek()},true);

  renderWeek();
})();