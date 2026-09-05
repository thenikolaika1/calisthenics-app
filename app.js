const PROGRAM = {
  mon: { title: 'Понедельник', subtitle: 'Выход силой · ~30 минут', load: 'ОСНОВНОЙ ДЕНЬ', exercises: [
    ['Выход силой с резинкой','5 × 2–3','Элемент'],
    ['Взрывные высокие подтягивания','4 × 3','Мощность'],
    ['Строгие подтягивания','2 × 5','Сила'],
    ['Tuck L-sit','3 подхода','Кор'],
    ['50 отжиманий','За день','Привычка']
  ]},
  tue: { title: 'Вторник', subtitle: 'База + брусья · ~30 минут', load: 'БАЗА', exercises: [
    ['Обычные брусья','5 × 2–3','Сила'],
    ['Строгие подтягивания','4 × 5','Сила'],
    ['Tuck L-sit','3 подхода','Кор'],
    ['50 отжиманий','За день','Привычка']
  ]},
  wed: { title: 'Среда', subtitle: 'Выход силой · ~30 минут', load: 'ОСНОВНОЙ ДЕНЬ', exercises: [
    ['Выход силой с резинкой','5 × 2–3','Элемент'],
    ['Взрывные высокие подтягивания','4 × 3','Мощность'],
    ['Строгие подтягивания','2 × 5','Сила'],
    ['Tuck L-sit','3 подхода','Кор'],
    ['50 отжиманий','За день','Привычка']
  ]},
  thu: { title: 'Четверг', subtitle: 'Брусья + лёгкая техника · ~30 минут', load: 'ЛЁГЧЕ', exercises: [
    ['Обычные брусья','4 × 2–3','Сила'],
    ['Выход силой с сильной резинкой','3 × 2 легко','Техника'],
    ['Лёгкие строгие подтягивания','3 × 3','Техника'],
    ['Tuck L-sit','2 подхода','Кор'],
    ['50 отжиманий','За день','Привычка']
  ]},
  fri: { title: 'Пятница', subtitle: 'Выход силой · ~30 минут', load: 'ОСНОВНОЙ ДЕНЬ', exercises: [
    ['Выход силой с резинкой','5 × 2–3','Элемент'],
    ['Взрывные высокие подтягивания','4 × 3','Мощность'],
    ['Строгие подтягивания','2 × 5','Сила'],
    ['Tuck L-sit','3 подхода','Кор'],
    ['50 отжиманий','За день','Привычка']
  ]},
  sat: { title: 'Суббота', subtitle: 'Сила + брусья · ~30 минут', load: 'БАЗА', exercises: [
    ['Обычные брусья','5 × 2–3','Сила'],
    ['Строгие подтягивания','4 × 5','Сила'],
    ['Взрывные подтягивания','3 × 2','Мощность'],
    ['Tuck L-sit','3 подхода','Кор'],
    ['50 отжиманий','За день','Привычка']
  ]},
  sun: { title: 'Воскресенье', subtitle: 'Выход силой · умеренно', load: 'УМЕРЕННО', exercises: [
    ['Выход силой с резинкой','4 × 2','Элемент'],
    ['Взрывные высокие подтягивания','3 × 3','Мощность'],
    ['Лёгкие подтягивания','2 × 3','Техника'],
    ['Tuck L-sit','2 подхода','Кор'],
    ['50 отжиманий','Если руки свежие','Привычка']
  ]}
};

const DAYS = [
  ['mon','ПН'],['tue','ВТ'],['wed','СР'],['thu','ЧТ'],['fri','ПТ'],['sat','СБ'],['sun','ВС']
];

const futureCopy = {
  onearm: ['Подтягивание на одной руке','Будущая цель на тяговую силу. Тренировки появятся здесь позже.'],
  frontlever: ['Front Lever','Передний вис на прямых руках. Подключим отдельную прогрессию после первого этапа.'],
  planche: ['Горизонт','Planche — сложная жимовая цель. Добавим её в программу позже, постепенно и без спешки.']
};

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
let selectedDay = getTodayKey();
let deferredPrompt = null;

function mondayOf(date = new Date()) {
  const d = new Date(date);
  d.setHours(0,0,0,0);
  const day = d.getDay() || 7;
  d.setDate(d.getDate() - day + 1);
  return d;
}
function isoDate(d){ return d.toISOString().slice(0,10); }
function weekKey(date = new Date()){ return `week:${isoDate(mondayOf(date))}`; }
function getWeekData(date = new Date()){
  try { return JSON.parse(localStorage.getItem(weekKey(date))) || {}; }
  catch { return {}; }
}
function saveWeekData(data,date = new Date()){
  localStorage.setItem(weekKey(date),JSON.stringify(data));
}
function getTodayKey(){ return DAYS[(new Date().getDay()+6)%7][0]; }
function dayDate(index, date = new Date()){
  const d = mondayOf(date); d.setDate(d.getDate()+index); return d;
}
function exerciseId(dayKey,i){ return `${dayKey}:${i}`; }
function totalExercises(){ return DAYS.reduce((n,[k])=>n+PROGRAM[k].exercises.length,0); }
function countCompleted(data){ return Object.values(data).filter(Boolean).length; }
function completedForDay(data,key){
  return PROGRAM[key].exercises.filter((_,i)=>data[exerciseId(key,i)]).length;
}
function dayIsDone(data,key){ return completedForDay(data,key) === PROGRAM[key].exercises.length; }

function renderWeek(){
  const mon = mondayOf();
  const sun = dayDate(6);
  $('#weekLabel').textContent = `${mon.toLocaleDateString('ru-RU',{day:'numeric',month:'short'})} — ${sun.toLocaleDateString('ru-RU',{day:'numeric',month:'short'})}`;
  const data = getWeekData();
  const done = countCompleted(data);
  const total = totalExercises();
  const pct = total ? Math.round(done/total*100) : 0;
  $('#weekPercent').textContent = `${pct}%`;
  $('#weekProgressBar').style.width = `${pct}%`;

  const strip = $('#dayStrip'); strip.innerHTML='';
  DAYS.forEach(([key,label],i)=>{
    const b=document.createElement('button');
    b.className='day-btn'+(key===selectedDay?' active':'')+(dayIsDone(data,key)?' done':'');
    b.type='button';
    b.innerHTML=`<span class="dname">${label}</span><span class="dnum">${dayDate(i).getDate()}</span>`;
    b.addEventListener('click',()=>{selectedDay=key;renderWeek();});
    strip.appendChild(b);
  });

  renderDay(data);
}

function renderDay(data){
  const p=PROGRAM[selectedDay];
  $('#dayLoadBadge').textContent=p.load;
  $('#dayTitle').textContent=p.title;
  $('#daySubtitle').textContent=p.subtitle;
  const list=$('#exerciseList'); list.innerHTML='';
  p.exercises.forEach((ex,i)=>{
    const id=exerciseId(selectedDay,i);
    const checked=!!data[id];
    const b=document.createElement('button');
    b.type='button';
    b.className='exercise-card'+(checked?' checked':'');
    b.innerHTML=`<span class="check-box">${checked?'✓':''}</span><span class="exercise-main"><b>${ex[0]}</b><span>${ex[1]}</span></span><span class="tag">${ex[2]}</span>`;
    b.addEventListener('click',()=>{
      const fresh=getWeekData(); fresh[id]=!fresh[id]; saveWeekData(fresh); renderWeek();
    });
    list.appendChild(b);
  });
  const done=completedForDay(data,selectedDay), total=p.exercises.length;
  const pct=Math.round(done/total*100);
  $('#dayPercent').textContent=`${pct}%`;
  $('#dayProgressBar').style.width=`${pct}%`;
  $('#dayProgressText').textContent=`${done} из ${total} выполнено`;
}

function historyWeeks(){
  const out=[];
  for(let i=1;i<=12;i++){
    const d=new Date(); d.setDate(d.getDate()-7*i);
    const key=weekKey(d);
    const raw=localStorage.getItem(key);
    if(raw) out.push({date:d,data:JSON.parse(raw)});
  }
  return out;
}

function renderHistory(){
  const list=$('#historyList'); list.innerHTML='';
  const weeks=historyWeeks();
  if(!weeks.length){ list.innerHTML='<div class="empty-history">Предыдущих недель пока нет. После новой недели история появится здесь автоматически.</div>'; return; }
  weeks.forEach(({date,data})=>{
    const mon=mondayOf(date); const sun=new Date(mon); sun.setDate(sun.getDate()+6);
    const done=countCompleted(data), total=totalExercises(), pct=Math.round(done/total*100);
    const card=document.createElement('article'); card.className='history-card';
    card.innerHTML=`<div class="history-top"><div><h3>${mon.toLocaleDateString('ru-RU',{day:'numeric',month:'short'})} — ${sun.toLocaleDateString('ru-RU',{day:'numeric',month:'short'})}</h3><p>${done} из ${total} упражнений</p></div><div class="history-percent">${pct}%</div></div><div class="history-days">${DAYS.map(([k,l])=>`<div class="history-day ${dayIsDone(data,k)?'done':''}">${l}${dayIsDone(data,k)?' ✓':''}</div>`).join('')}</div>`;
    list.appendChild(card);
  });
}

function switchView(name){
  $$('.view').forEach(v=>v.classList.remove('active'));
  if(name==='muscleup') $('#muscleupView').classList.add('active');
  else if(name==='history'){ $('#historyView').classList.add('active'); renderHistory(); }
  else { $('#futureView').classList.add('active'); const [t,txt]=futureCopy[name]; $('#futureTitle').textContent=t; $('#futureText').textContent=txt; }
}

$$('.skill-tab').forEach(tab=>tab.addEventListener('click',()=>{
  $$('.skill-tab').forEach(t=>t.classList.remove('active')); tab.classList.add('active');
  switchView(tab.dataset.skill);
}));
$('#historyBtn').addEventListener('click',()=>switchView('history'));
$('#backBtn').addEventListener('click',()=>switchView('muscleup'));

function makeReport(){
  const data=getWeekData();
  const mon=mondayOf(); const sun=dayDate(6);
  const done=countCompleted(data), total=totalExercises();
  const lines=[
    'КАЛИСТЕНИКА — ОТЧЁТ ЗА НЕДЕЛЮ',
    `${mon.toLocaleDateString('ru-RU')} — ${sun.toLocaleDateString('ru-RU')}`,
    `Выполнено: ${done}/${total} упражнений (${Math.round(done/total*100)}%)`,
    ''
  ];
  DAYS.forEach(([k])=>{
    const c=completedForDay(data,k), t=PROGRAM[k].exercises.length;
    lines.push(`${PROGRAM[k].title}: ${c}/${t}${c===t?' ✓':''}`);
  });
  const muscleSessions=['mon','wed','thu','fri','sun'].filter(k=>PROGRAM[k].exercises.some(x=>x[0].toLowerCase().includes('выход силой')) && completedForDay(data,k)>0).length;
  lines.push('',`Дней с работой над выходом: ${muscleSessions}/5`,`Комментарий: `);
  return lines.join('\n');
}

$('#shareWeekBtn').addEventListener('click',async()=>{
  const text=makeReport();
  try{ await navigator.clipboard.writeText(text); showToast('Отчёт скопирован'); }
  catch{
    const ta=document.createElement('textarea'); ta.value=text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); showToast('Отчёт скопирован');
  }
});

function showToast(text){ const t=$('#toast'); t.textContent=text; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),1800); }

window.addEventListener('beforeinstallprompt',e=>{ e.preventDefault(); deferredPrompt=e; $('#installBtn').classList.remove('hidden'); });
$('#installBtn').addEventListener('click',async()=>{ if(!deferredPrompt)return; deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt=null; $('#installBtn').classList.add('hidden'); });

if('serviceWorker' in navigator){ window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js')); }
renderWeek();
