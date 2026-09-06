(()=>{
function goMenu(){const training=document.getElementById('trainingView'),menu=document.getElementById('menuView');training?.classList.add('hidden');menu?.classList.remove('hidden');window.scrollTo(0,0)}
function ensureResults(){
 const training=document.getElementById('trainingView'),main=training?.querySelector('main');if(!training||!main)return;
 let view=document.getElementById('resultsView');
 if(!view){view=document.createElement('section');view.id='resultsView';view.className='view results-view';view.innerHTML='<div class="results-top"><div><span class="mini">МОЙ ПРОГРЕСС</span><h2>Результаты</h2><p>Рекорды, графики и статистика тренировок</p></div></div><div id="resultsMount"></div>';main.appendChild(view)}
 const dash=document.getElementById('progressDashboard'),mount=document.getElementById('resultsMount');if(dash&&mount&&dash.parentNode!==mount)mount.appendChild(dash);
}
function openResults(){ensureResults();document.getElementById('menuView').classList.add('hidden');document.getElementById('trainingView').classList.remove('hidden');document.querySelectorAll('#trainingView .view').forEach(v=>v.classList.remove('active'));document.getElementById('resultsView')?.classList.add('active');const topBtn=document.getElementById('menuBackBtn');if(topBtn)topBtn.onclick=goMenu;window.scrollTo(0,0);setTimeout(()=>window.dispatchEvent(new Event('resize')),50)}
function addMenu(){const actions=document.querySelector('.menu-actions');if(!actions||document.getElementById('menuResults'))return;const b=document.createElement('button');b.id='menuResults';b.innerHTML='<span>⌁</span><b>Результаты</b><small>Рекорды · графики</small>';b.onclick=openResults;actions.appendChild(b)}
const obs=new MutationObserver(()=>ensureResults());obs.observe(document.body,{childList:true,subtree:true});setTimeout(()=>{addMenu();ensureResults()},0);window.openResultsV35=openResults;
})();