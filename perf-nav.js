(()=>{
  const imageSources=['./muscle-up.png','./one-arm-pull-up.png','./front-lever.png','./planche.png'];
  let warmed=false;

  async function warmImages(){
    if(warmed)return;
    warmed=true;
    const jobs=imageSources.map(src=>new Promise(resolve=>{
      const img=new Image();
      img.decoding='async';
      img.src=src;
      const done=()=>resolve();
      if(img.complete){
        if(img.decode)img.decode().then(done).catch(done);else done();
      }else{
        img.onload=()=>{if(img.decode)img.decode().then(done).catch(done);else done()};
        img.onerror=done;
      }
    }));
    document.querySelectorAll('img').forEach(img=>{
      try{if(img.decode)jobs.push(img.decode().catch(()=>{}))}catch{}
    });
    await Promise.allSettled(jobs);
  }

  function warmHistory(){
    try{if(typeof renderHistory==='function')renderHistory()}catch{}
  }

  const idle=window.requestIdleCallback||((fn)=>setTimeout(fn,60));
  idle(()=>{warmImages();warmHistory()});

  ['menuElements','menuHistory','menuToday'].forEach(id=>{
    const el=document.getElementById(id);
    if(!el)return;
    el.addEventListener('pointerdown',()=>{
      warmImages();
      if(id==='menuHistory')warmHistory();
    },{passive:true});
    el.addEventListener('touchstart',()=>{
      warmImages();
      if(id==='menuHistory')warmHistory();
    },{passive:true});
  });

  document.querySelectorAll('[data-open-skill]').forEach(el=>{
    el.addEventListener('pointerdown',warmImages,{passive:true});
    el.addEventListener('touchstart',warmImages,{passive:true});
  });
})();
