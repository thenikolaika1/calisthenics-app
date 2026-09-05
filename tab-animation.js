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
      if(img){img.src=cfg.image;img.alt=cfg.title;img.loading='eager';img.decoding='sync'}
      if(title)title.textContent=cfg.title;
      if(text)text.textContent=cfg.text;
      if(i>0)original.parentNode.insertBefore(view,original.nextSibling);
    });
  }

  const oldSwitch=window.switchView;
  window.switchView=function(name){
    document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
    if(name==='muscleup')document.getElementById('muscleupView')?.classList.add('active');
    else if(name==='onearm')document.getElementById('onearmView')?.classList.add('active');
    else if(name==='frontlever')document.getElementById('frontleverView')?.classList.add('active');
    else if(name==='planche')document.getElementById('plancheView')?.classList.add('active');
    else if(name==='history'){
      document.getElementById('historyView')?.classList.add('active');
      if(typeof renderHistory==='function')renderHistory();
    }else if(typeof oldSwitch==='function')oldSwitch(name);
  };

  let busy=false;
  document.querySelectorAll('.skill-tab').forEach(tab=>{
    tab.addEventListener('pointerdown',()=>{
      if(busy||tab.classList.contains('active'))return;
      const oldView=document.querySelector('.view.active');
      if(!oldView)return;
      const rect=oldView.getBoundingClientRect();
      const ghost=oldView.cloneNode(true);
      ghost.removeAttribute('id');
      ghost.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));
      ghost.className='tab-crossfade-ghost';
      Object.assign(ghost.style,{position:'fixed',left:`${rect.left}px`,top:`${rect.top}px`,width:`${rect.width}px`,height:`${rect.height}px`,margin:'0',zIndex:'90',pointerEvents:'none',overflow:'hidden'});
      document.body.appendChild(ghost);
      busy=true;
      requestAnimationFrame(()=>ghost.classList.add('fade-out'));
      setTimeout(()=>{ghost.remove();busy=false},430);
    },{passive:true});
  });
})();
