(()=>{
  const plans={
    mon:{subtitle:'Передний вис · основной день',load:'ОСНОВНОЙ ДЕНЬ',exercises:[
      ['Tuck Front Lever','3 × 5–10 сек','Элемент','2–3 мин'],
      ['Подъёмы в Tuck Front Lever','3 × 3–5','Сила','2–3 мин'],
      ['Front Lever с резинкой','3 × 5–10 сек','Элемент','2–3 мин'],
      ['Подтягивания в Tuck Front Lever','3 × 3–5','Сила','2–3 мин'],
      ['Уголок','2 подхода','Кор','45–60 сек'],
      ['Финиш: выход силой','2 × 2','Финиш','2–3 мин']
    ]},
    tue:{subtitle:'Передний вис · база',load:'БАЗА',exercises:[
      ['Чистые подтягивания','3 × 6','Сила','60–90 сек'],
      ['Отжимания на брусьях','3 × 3–4','Сила','60–90 сек'],
      ['Tuck Front Lever','2 × 5–10 сек','Элемент','2–3 мин'],
      ['Высокие подтягивания','2 × 2–3','Мощность','2–3 мин'],
      ['Уголок','2 подхода','Кор','45–60 сек'],
      ['Финиш: выход силой','2 × 2','Финиш','2–3 мин']
    ]},
    wed:{subtitle:'Передний вис · основной день',load:'ОСНОВНОЙ ДЕНЬ',exercises:[
      ['Tuck Front Lever','3 × 5–10 сек','Элемент','2–3 мин'],
      ['Подъёмы в Tuck Front Lever','3 × 3–5','Сила','2–3 мин'],
      ['Front Lever с резинкой','3 × 5–10 сек','Элемент','2–3 мин'],
      ['Подтягивания в Tuck Front Lever','3 × 3–5','Сила','2–3 мин'],
      ['Уголок','2 подхода','Кор','45–60 сек'],
      ['Финиш: выход силой','2 × 2','Финиш','2–3 мин']
    ]},
    thu:{subtitle:'Передний вис · лёгкий день',load:'ЛЁГКИЙ ДЕНЬ',exercises:[
      ['Tuck Front Lever','2 × 5–8 сек легко','Элемент','2–3 мин'],
      ['Front Lever с сильной резинкой','2 × 5–8 сек легко','Элемент','2–3 мин'],
      ['Лёгкие подтягивания','2 × 5','Техника','60–90 сек'],
      ['Высокие подтягивания','2 × 2 легко','Мощность','2–3 мин'],
      ['Уголок','2 подхода','Кор','45–60 сек'],
      ['Финиш: выход силой','2 × 2','Финиш','2–3 мин']
    ]},
    fri:{subtitle:'Передний вис · основной день',load:'ОСНОВНОЙ ДЕНЬ',exercises:[
      ['Tuck Front Lever','3 × 5–10 сек','Элемент','2–3 мин'],
      ['Подъёмы в Tuck Front Lever','3 × 3–5','Сила','2–3 мин'],
      ['Front Lever с резинкой','3 × 5–10 сек','Элемент','2–3 мин'],
      ['Подтягивания в Tuck Front Lever','3 × 3–5','Сила','2–3 мин'],
      ['Уголок','2 подхода','Кор','45–60 сек'],
      ['Финиш: выход силой','2 × 2','Финиш','2–3 мин']
    ]},
    sat:{subtitle:'Передний вис · база',load:'БАЗА',exercises:[
      ['Чистые подтягивания','3 × 6','Сила','60–90 сек'],
      ['Отжимания на брусьях','3 × 3–4','Сила','60–90 сек'],
      ['Tuck Front Lever','2 × 5–10 сек','Элемент','2–3 мин'],
      ['Высокие подтягивания','2 × 2–3','Мощность','2–3 мин'],
      ['Уголок','2 подхода','Кор','45–60 сек'],
      ['Финиш: выход силой','2 × 2','Финиш','2–3 мин']
    ]},
    sun:{subtitle:'Передний вис · умеренно',load:'УМЕРЕННО',exercises:[
      ['Tuck Front Lever','2 × 5–10 сек','Элемент','2–3 мин'],
      ['Front Lever с резинкой','2 × 5–10 сек','Элемент','2–3 мин'],
      ['Чистые подтягивания','2 × 5','Сила','60–90 сек'],
      ['Высокие подтягивания','2 × 2–3','Мощность','2–3 мин'],
      ['Уголок','2 подхода','Кор','45–60 сек'],
      ['Финиш: выход силой','2 × 2','Финиш','2–3 мин']
    ]}
  };

  Object.entries(PROGRAM).forEach(([day,p])=>{p.subtitle=plans[day].subtitle;p.load=plans[day].load;p.exercises=plans[day].exercises.map(x=>[...x])});

  // Front Lever starts on 10 Sep 2026. Old muscle-up checkmarks from Mon-Wed
  // used the same IDs, so hide/remove them once while keeping a backup copy.
  try{
    const resetFlag='frontlever:v72:week-reset';
    if(!localStorage.getItem(resetFlag)){
      const wk=typeof weekKey==='function'?weekKey(new Date(2026,8,10)):'week:2026-09-07';
      const raw=localStorage.getItem(wk);
      if(raw){
        localStorage.setItem('archive:muscleup:'+wk,raw);
        const data=JSON.parse(raw)||{};
        ['mon','tue','wed'].forEach(day=>{
          Object.keys(data).forEach(k=>{if(k===day||k.startsWith(day+':')) delete data[k]});
        });
        localStorage.setItem(wk,JSON.stringify(data));
      }
      localStorage.setItem(resetFlag,'1');
    }
  }catch(e){}

  if(typeof renderWeek==='function') renderWeek();
})();