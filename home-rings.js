(function(){
  function monthActs(){
    const now=new Date(),y=now.getFullYear(),m=now.getMonth();
    return db.activities.filter(a=>{const d=new Date(a.date+'T12:00:00');return d.getFullYear()===y&&d.getMonth()===m});
  }
  function renderHomeRings(){
    const el=document.getElementById('context');if(!el)return;
    const week=weekActs(),month=monthActs();
    const activeDays=new Set(week.map(a=>a.date)).size;
    const minutes=month.reduce((q,a)=>q+(Number(a.duration)||0),0);
    const sessions=month.length;
    const trainingH=Math.floor(minutes/60),trainingM=minutes%60;
    el.innerHTML=`<div class="homeRings">
      <div class="ringMetric"><div class="ring"><strong>${activeDays}</strong><span>/7</span></div><label>ACTIVITY</label><small>${activeDays}/7 actieve dagen</small></div>
      <div class="ringMetric"><div class="ring"><strong>${trainingH}</strong><span>h</span><em>${trainingM}m</em></div><label>TRAINING</label><small>${trainingH}u ${trainingM}m deze maand</small></div>
      <div class="ringMetric"><div class="ring"><strong>${sessions}</strong></div><label>SESSIONS</label><small>${sessions} trainingen</small></div>
    </div>`;
  }
  const baseHome=home;
  home=function(){baseHome();renderHomeRings()};
  window.addEventListener('load',renderHomeRings);
})();