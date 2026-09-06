(()=>{
  const volume={
    mon:'6 × 2–3',
    tue:'4 × 2 легко',
    wed:'6 × 2–3',
    thu:'4 × 2 легко',
    fri:'6 × 2–3',
    sat:'4 × 2 легко',
    sun:'5 × 2'
  };
  Object.entries(volume).forEach(([day,plan])=>{
    const exercises=PROGRAM[day]?.exercises;
    if(!exercises)return;
    const ex=exercises.find(item=>item[0].includes('Выход силой')&&item[0].includes('резинк'));
    if(ex)ex[1]=plan;
  });
  if(typeof renderWeek==='function')renderWeek();
})();
