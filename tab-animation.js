document.addEventListener('DOMContentLoaded',()=>{
  const animateActiveView=()=>{
    requestAnimationFrame(()=>{
      const view=document.querySelector('.view.active');
      if(!view)return;
      view.classList.remove('tab-enter');
      void view.offsetWidth;
      view.classList.add('tab-enter');
      window.setTimeout(()=>view.classList.remove('tab-enter'),380);
    });
  };
  document.querySelectorAll('.skill-tab').forEach(tab=>{
    tab.addEventListener('click',()=>window.setTimeout(animateActiveView,0));
  });
});