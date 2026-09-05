document.addEventListener('DOMContentLoaded',()=>{
  let timer=null;
  document.querySelectorAll('.skill-tab').forEach(tab=>{
    tab.addEventListener('click',()=>{
      if(timer)clearTimeout(timer);
      requestAnimationFrame(()=>{
        const view=document.querySelector('.view.active');
        if(!view)return;
        view.classList.remove('tab-soft-enter');
        view.classList.add('tab-soft-enter');
        timer=setTimeout(()=>view.classList.remove('tab-soft-enter'),220);
      });
    });
  });
});
