(()=>{
  const plans={mon:'6 × 2–3',tue:'4 × 2 легко',wed:'6 × 2–3',thu:'4 × 2 легко',fri:'6 × 2–3',sat:'4 × 2 легко',sun:'5 × 2'};
  Object.entries(PROGRAM).forEach(([day,p])=>{
    p.exercises.forEach(ex=>{
      if(ex[0]==='Уголок с согнутыми ногами') ex[0]='Уголок';
      if(ex[0].includes('Выход силой')&&ex[0].includes('резинк')&&plans[day]) ex[1]=plans[day];
    });
  });
  if(typeof renderWeek==='function') renderWeek();
})();
