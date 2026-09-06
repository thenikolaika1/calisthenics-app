(()=>{
  function sameLocalDay(a,b){return a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate()}
  function applyDayStatus(){
    const strip=document.getElementById('dayStrip');
    if(!strip||typeof DAYS==='undefined'||typeof dayDate!=='function'||typeof getWeekData!=='function')return;
    const buttons=[...strip.querySelectorAll('.day-btn')];
    const data=getWeekData();
    const today=new Date();
    buttons.forEach((button,i)=>{
      const key=DAYS[i]?.[0];
      const date=dayDate(i);
      const isToday=sameLocalDay(date,today);
      const isDone=key&&typeof dayIsDone==='function'?dayIsDone(data,key):false;
      button.classList.toggle('is-today',isToday);
      button.classList.toggle('is-complete',isDone);
      if(isToday)button.setAttribute('aria-current','date');else button.removeAttribute('aria-current');
    });
  }
  if(typeof renderWeek==='function'){
    const baseRenderWeek=renderWeek;
    renderWeek=function(...args){const result=baseRenderWeek.apply(this,args);applyDayStatus();return result};
  }
  applyDayStatus();
})();