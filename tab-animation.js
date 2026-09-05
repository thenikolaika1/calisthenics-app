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
  const views=()=>[...document.querySelectorAll('.view')];
  let switching=false;

  function posterImg(view){return view?.querySelector('.poster-card > img')||null}
  function setActiveView(target){views().forEach(v=>v.classList.remove('active'));target.classList.add('active')}

  tabs.forEach(tab=>{
    tab.addEventListener('click',e=>{
      e.preventDefault();
      e.stopImmediatePropagation();
      if(switching||tab.classList.contains('active'))return;

      const oldView=document.querySelector('.view.active');
      const target=document.getElementById(map[tab.dataset.skill]);
      if(!oldView||!target)return;

      const oldImg=posterImg(oldView);
      switching=true;
      tabs.forEach(t=>t.classList.toggle('active',t===tab));
      setActiveView(target);

      const newImg=posterImg(target);
      const poster=target.querySelector('.poster-card');
      if(!newImg||!poster||!oldImg){switching=false;return;}

      const ghost=oldImg.cloneNode(true);
      ghost.className='pose-layer-old';
      ghost.removeAttribute('id');
      poster.appendChild(ghost);

      newImg.classList.add('pose-layer-new');
      newImg.style.opacity='0.14';
      newImg.style.transform='scale(.992)';

      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        ghost.classList.add('pose-layer-fade');
        newImg.style.opacity='1';
        newImg.style.transform='scale(1)';
      }));

      setTimeout(()=>{
        ghost.remove();
        newImg.classList.remove('pose-layer-new');
        newImg.style.opacity='';
        newImg.style.transform='';
        switching=false;
      },340);
    },true);
  });

  ['muscle-up.png','one-arm-pull-up.png','front-lever.png','planche.png'].forEach(src=>{
    const img=new Image();img.src='./'+src;if(img.decode)img.decode().catch(()=>{});
  });
})();