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

  function posterImg(view){return view?.querySelector('.poster-card > img')||null}
  function showView(name){
    document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
    const id=map[name];
    if(id)document.getElementById(id)?.classList.add('active');
  }

  tabs.forEach(tab=>{
    tab.addEventListener('click',e=>{
      e.preventDefault();
      e.stopImmediatePropagation();
      if(locked||tab.classList.contains('active'))return;
      const oldView=document.querySelector('.view.active');
      const name=tab.dataset.skill;
      const newView=document.getElementById(map[name]);
      if(!oldView||!newView)return;
      locked=true;
      tabs.forEach(t=>t.classList.toggle('active',t===tab));

      const oldImg=posterImg(oldView);
      const oldRect=oldImg?.getBoundingClientRect();
      let ghost=null;
      if(oldImg&&oldRect&&oldRect.width>0&&oldRect.height>0){
        ghost=oldImg.cloneNode(true);
        ghost.className='pose-ghost';
        Object.assign(ghost.style,{position:'fixed',left:`${oldRect.left}px`,top:`${oldRect.top}px`,width:`${oldRect.width}px`,height:`${oldRect.height}px`,objectFit:getComputedStyle(oldImg).objectFit||'contain',objectPosition:getComputedStyle(oldImg).objectPosition||'center',margin:'0',zIndex:'120',pointerEvents:'none',borderRadius:getComputedStyle(oldImg).borderRadius});
        document.body.appendChild(ghost);
      }

      showView(name);
      const newImg=posterImg(newView);
      if(newImg){newImg.style.opacity='.18';newImg.style.transform='scale(.992)';newImg.style.transition='none';}

      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        if(ghost){ghost.style.transition='opacity 520ms cubic-bezier(.22,.61,.36,1),transform 520ms cubic-bezier(.22,.61,.36,1)';ghost.style.opacity='0';ghost.style.transform='scale(1.012)'}
        if(newImg){newImg.style.transition='opacity 520ms cubic-bezier(.22,.61,.36,1),transform 520ms cubic-bezier(.22,.61,.36,1)';newImg.style.opacity='1';newImg.style.transform='scale(1)'}
      }));

      setTimeout(()=>{
        ghost?.remove();
        if(newImg){newImg.style.transition='';newImg.style.opacity='';newImg.style.transform=''}
        locked=false;
      },560);
    },true);
  });

  ['muscle-up.png','one-arm-pull-up.png','front-lever.png','planche.png'].forEach(src=>{
    const img=new Image();img.src='./'+src;if(img.decode)img.decode().catch(()=>{});
  });
})();
