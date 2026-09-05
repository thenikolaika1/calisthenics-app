document.addEventListener('DOMContentLoaded',()=>{
  const tabs=[...document.querySelectorAll('.skill-tab')];
  let busy=false;
  tabs.forEach(tab=>{
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
});
