(()=>{
  if(typeof PROGRAM==='undefined')return;
  Object.values(PROGRAM).forEach(day=>{
    day.exercises.forEach(ex=>{
      if(ex[0]==='Уголок с согнутыми ногами')ex[0]='Уголок';
    });
  });
  if(typeof renderWeek==='function')renderWeek();
})();
