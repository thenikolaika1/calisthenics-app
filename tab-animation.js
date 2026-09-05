document.addEventListener('DOMContentLoaded',()=>{
  let running=null;
  document.querySelectorAll('.skill-tab').forEach(tab=>{
    tab.addEventListener('click',()=>{
      requestAnimationFrame(()=>{
        const view=document.querySelector('.view.active');
        if(!view||!view.animate)return;
        if(running)running.cancel();
        running=view.animate([
          {opacity:.72,transform:'translateX(6px)'},
          {opacity:1,transform:'translateX(0)'}
        ],{duration:145,easing:'cubic-bezier(.2,.75,.2,1)',fill:'none'});
        running.onfinish=()=>{running=null};
      });
    });
  });
});