(()=>{
  const workout=document.getElementById('muscleupView');
  if(workout){
    const img=workout.querySelector('.poster-card > img');if(img){img.src='./front-lever.png?v=27';img.alt='Передний вис'}
    const h=workout.querySelector('.poster-row h2');if(h)h.textContent='Передний вис';
    const p=workout.querySelector('.poster-row p');if(p)p.textContent='Выполнение тренировочного плана за выбранную неделю';
    const pill=workout.querySelector('.poster-card .pill');if(pill)pill.textContent='ПРОГРЕСС ЗА НЕДЕЛЮ';
    const technique=workout.querySelector('.info-grid .card:first-child');if(technique)technique.innerHTML='<div class="card-title">Техника выполнения</div><div class="steps"><div class="step"><b>1</b><span><strong>Прямые руки</strong><small>Локти полностью выпрямлены</small></span></div><div class="step"><b>2</b><span><strong>Плечи вниз</strong><small>Корпус держи собранным</small></span></div><div class="step"><b>3</b><span><strong>Таз вверх</strong><small>Спина стремится к горизонтали</small></span></div><div class="step"><b>4</b><span><strong>Контроль</strong><small>Без раскачки и рывков</small></span></div></div>';
    const tips=workout.querySelector('.info-grid .tips');if(tips)tips.innerHTML='<div class="card-title">Полезные советы</div><div class="tip">✓ Держи руки прямыми</div><div class="tip">✓ Не проваливай таз</div><div class="tip">✓ Сохраняй корпус собранным</div><div class="tip">✓ Не работай через боль</div>';
  }

  const original=document.getElementById('futureView');
  const configs=[
    {skill:'muscleup',id:'muscleupAchievedView',title:'Выход силой',text:'Элемент освоен. Навык можно поддерживать в тренировках.',image:'./muscle-up.png',pill:'ДОСТИГНУТО',plan:'Выход силой уже освоен и остаётся в программе как поддерживающий элемент.'},
    {skill:'onearm',id:'onearmView',title:'Подтягивание на одной руке',text:'Максимальный уровень тяговой силы и контроля. Отдельную прогрессию добавим позже.',image:'./one-arm-pull-up.png',pill:'СЛЕДУЮЩАЯ ЦЕЛЬ',plan:'Эта вкладка уже оформлена. Тренировочную программу добавим позже.'},
    {skill:'planche',id:'plancheView',title:'Горизонт',text:'Сильная жимовая цель на контроль всего тела. Будем добавлять её постепенно.',image:'./planche.png',pill:'БУДУЩАЯ ЦЕЛЬ',plan:'Эта вкладка уже оформлена. Тренировочную программу добавим позже.'}
  ];
  if(original){configs.forEach((cfg,i)=>{const view=i===0?original:original.cloneNode(true);view.id=cfg.id;view.classList.remove('active');const img=view.querySelector('img'),title=view.querySelector('h2'),text=view.querySelector('.future-overlay p'),pill=view.querySelector('.pill'),plan=view.querySelector('.future-info p');if(img){img.removeAttribute('id');img.src=cfg.image;img.alt=cfg.title;img.loading='eager';img.decoding='sync';img.fetchPriority='high'}if(title){title.removeAttribute('id');title.textContent=cfg.title}if(text){text.removeAttribute('id');text.textContent=cfg.text}if(pill)pill.textContent=cfg.pill;if(plan)plan.textContent=cfg.plan;if(i>0)original.parentNode.insertBefore(view,original.nextSibling)})}

  const map={muscleup:'muscleupAchievedView',frontlever:'muscleupView',onearm:'onearmView',planche:'plancheView'};
  const tabs=[...document.querySelectorAll('.skill-tab')],views=()=>[...document.querySelectorAll('.view')];let switching=false;
  const posterImg=view=>view?.querySelector('.poster-card > img')||null;
  function activate(target){views().forEach(v=>v.classList.remove('active'));target.classList.add('active')}
  function ready(img){if(!img)return Promise.resolve();if(img.complete&&img.naturalWidth>0)return img.decode?img.decode().catch(()=>{}):Promise.resolve();return new Promise(resolve=>{const end=()=>resolve();img.addEventListener('load',end,{once:true});img.addEventListener('error',end,{once:true})})}
  tabs.forEach(tab=>tab.addEventListener('click',async e=>{e.preventDefault();e.stopImmediatePropagation();if(switching)return;const target=document.getElementById(map[tab.dataset.skill]);if(!target)return;const oldView=document.querySelector('.view.active');if(oldView===target){tabs.forEach(t=>t.classList.toggle('active',t===tab));return}switching=true;tabs.forEach(t=>t.classList.toggle('active',t===tab));const oldImg=posterImg(oldView),newImg=posterImg(target);await ready(newImg);activate(target);window.scrollTo(0,0);const poster=target.querySelector('.poster-card');if(!newImg||!poster||!oldImg){switching=false;return}const ghost=oldImg.cloneNode(true);ghost.className='pose-layer-old';ghost.removeAttribute('id');poster.appendChild(ghost);newImg.classList.add('pose-layer-new');newImg.style.opacity='0.14';newImg.style.transform='scale(.992)';requestAnimationFrame(()=>requestAnimationFrame(()=>{ghost.classList.add('pose-layer-fade');newImg.style.opacity='1';newImg.style.transform='scale(1)'}));setTimeout(()=>{ghost.remove();newImg.classList.remove('pose-layer-new');newImg.style.opacity='';newImg.style.transform='';switching=false},340)},true));

  const nav=document.querySelector('.skill-tabs'),flTab=nav?.querySelector('[data-skill="frontlever"]'),oaTab=nav?.querySelector('[data-skill="onearm"]');if(nav&&flTab&&oaTab)nav.insertBefore(flTab,oaTab);
  const grid=document.querySelector('.goal-grid'),flCard=grid?.querySelector('[data-open-skill="frontlever"]'),oaCard=grid?.querySelector('[data-open-skill="onearm"]'),muCard=grid?.querySelector('[data-open-skill="muscleup"]');if(grid&&flCard&&oaCard)grid.insertBefore(flCard,oaCard);if(muCard){const s=muCard.querySelector('small');if(s)s.textContent='ДОСТИГНУТО'}if(flCard){const s=flCard.querySelector('small');if(s)s.textContent='ТЕКУЩАЯ ЦЕЛЬ'}
  tabs.forEach(t=>t.classList.toggle('active',t.dataset.skill==='frontlever'));

  setTimeout(()=>{const todayBtn=document.getElementById('menuToday'),elementsBtn=document.getElementById('menuElements');todayBtn?.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();if(typeof chooseSkill==='function')chooseSkill('frontlever');setTimeout(()=>document.querySelector('#muscleupView .week-section')?.scrollIntoView({behavior:'smooth',block:'start'}),100)},true);elementsBtn?.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();if(typeof chooseSkill==='function')chooseSkill('frontlever')},true)},0);

  ['./muscle-up.png','./one-arm-pull-up.png','./front-lever.png?v=27','./planche.png'].forEach(src=>{const img=new Image();img.loading='eager';img.fetchPriority='high';img.src=src;if(img.decode)img.decode().catch(()=>{})});
})();