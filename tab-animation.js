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
  const views=[...document.querySelectorAll('.view')];

  function showView(name){
    const target=document.getElementById(map[name]);
    if(!target)return;
    views.forEach(v=>v.classList.remove('active','tab-fast-enter'));
    target.classList.add('active');
    requestAnimationFrame(()=>target.classList.add('tab-fast-enter'));
    setTimeout(()=>target.classList.remove('tab-fast-enter'),170);
  }

  tabs.forEach(tab=>{
    tab.addEventListener('click',e=>{
      e.preventDefault();
      e.stopImmediatePropagation();
      if(tab.classList.contains('active'))return;
      tabs.forEach(t=>t.classList.toggle('active',t===tab));
      showView(tab.dataset.skill);
    },true);
  });

  ['muscle-up.png','one-arm-pull-up.png','front-lever.png','planche.png'].forEach(src=>{
    const img=new Image();
    img.src='./'+src;
  });
})();