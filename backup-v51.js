(()=>{
  function toast(msg){
    const el=document.getElementById('toast');
    if(el){el.textContent=msg;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2200)}
    else alert(msg)
  }
  function collect(){
    const data={version:1,exportedAt:new Date().toISOString(),origin:location.origin,items:{}};
    for(let i=0;i<localStorage.length;i++){
      const k=localStorage.key(i);
      if(k!=null)data.items[k]=localStorage.getItem(k);
    }
    return data;
  }
  function downloadBackup(){
    const data=collect();
    const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;
    a.download=`calisthenics-backup-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    toast('Прогресс скачан');
  }
  function restore(file){
    const r=new FileReader();
    r.onload=()=>{
      try{
        const parsed=JSON.parse(String(r.result||''));
        if(!parsed||typeof parsed.items!=='object'||Array.isArray(parsed.items))throw new Error('bad');
        Object.entries(parsed.items).forEach(([k,v])=>{
          if(typeof k==='string'&&(typeof v==='string'||v===null)) localStorage.setItem(k,v??'');
        });
        toast('Прогресс загружен');
        setTimeout(()=>location.reload(),500);
      }catch{toast('Не удалось загрузить файл')}
    };
    r.readAsText(file);
  }
  function addUI(){
    const host=document.querySelector('.menu-summary')||document.getElementById('menuView');
    if(!host||document.getElementById('backupTools'))return;
    const box=document.createElement('article');
    box.id='backupTools';box.className='menu-summary';
    box.innerHTML=`<div><span class="mini">РЕЗЕРВНАЯ КОПИЯ</span><h3>Прогресс</h3></div><p>Сохрани файл перед переустановкой приложения. Потом его можно загрузить обратно.</p><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px"><button id="backupDownload" class="primary-btn" type="button">Скачать прогресс</button><button id="backupUpload" class="primary-btn" type="button">Загрузить прогресс</button></div><input id="backupFile" type="file" accept="application/json,.json" hidden>`;
    host.insertAdjacentElement('afterend',box);
    box.querySelector('#backupDownload').onclick=downloadBackup;
    box.querySelector('#backupUpload').onclick=()=>box.querySelector('#backupFile').click();
    box.querySelector('#backupFile').onchange=e=>{const f=e.target.files&&e.target.files[0];if(f)restore(f);e.target.value=''};
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',addUI);else addUI();
})();