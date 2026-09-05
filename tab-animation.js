(()=>{
  const original=document.getElementById('futureView');
  if(original){
    const configs=[
      {id:'onearmView',title:'Подтягивание на одной руке',text:'Максимальный уровень тяговой силы и контроля. Отдельную прогрессию добавим позже.',image:'./one-arm-pull-up.png'},
      {id:'frontleverView',title:'Передний вис',text:'Сложный элемент на силу спины, плеч и корпуса. Программа появится после текущего этапа.',image:'./front-lever.png'},
      {id:'plancheView',title:'Горизонт',text:'Сильная жимовая цель на контроль всего тела. Будем добавлять её постепенно.',image:'./planche.png'}
    ];
    configs.forEach((cfg,i)=>{
      const view=i===0?original:original.cloneNode(true);
      view.id=cfg.id;
      view.classList.remove('active');
      const img=view.querySelector('img');
      const title=view.querySelector('h2');
      const text=view.querySelector('.future-overlay p');
      if(img){img.removeAttribute('id');img.src=cfg.image;img.alt=cfg.title;img.loading='eager';img.decoding='async'}
      if(title){title.removeAttribute('id');title.textContent=cfg.title}
      if(text){text.removeAttribute('id');text.textContent=cfg.text}
      if(i>0)original.parentNode.insertBefore(view,original.nextSibling);
    });
  }

  const map={muscleup:'muscleupView',onearm:'onearmView',frontlever:'frontleverView',planche:'plancheView'};
  const tabs=[...document.querySelectorAll('.skill-tab')];
  let locked=false;

  const showView=name=>{
    document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
    const id=map[name];
    if(id)document.getElementById(id)?.classList.add('active');
  };

  tabs.forEach(tab=>{
    tab.addEventListener('click',e=>{
      e.preventDefault();
      e.stopImmediatePropagation();
      if(locked||tab.classList.contains('active'))return;
      const oldView=document.querySelector('.view.active');
      const name=tab.dataset.skill;
      if(!oldView||!map[name])return;
      locked=true;
      tabs.forEach(t=>t.classList.toggle('active',t===tab));

      oldView.style.willChange='opacity';
      oldView.style.transition='opacity 180ms ease';
      oldView.style.opacity='0';

      setTimeout(()=>{
        oldView.style.transition='';
        oldView.style.opacity='';
        oldView.style.willChange='';
        showView(name);
        const newView=document.getElementById(map[name]);
        if(!newView){locked=false;return;}
        newView.style.opacity='0';
        newView.style.willChange='opacity';
        requestAnimationFrame(()=>requestAnimationFrame(()=>{
          newView.style.transition='opacity 260ms cubic-bezier(.22,.61,.36,1)';
          newView.style.opacity='1';
          setTimeout(()=>{
            newView.style.transition='';
            newView.style.opacity='';
            newView.style.willChange='';
            locked=false;
          },280);
        }));
      },180);
    },true);
  });

  ['muscle-up.png','one-arm-pull-up.png','front-lever.png','planche.png'].forEach(src=>{
    const img=new Image();
    img.src='./'+src;
    if(img.decode)img.decode().catch(()=>{});
  });
})();
