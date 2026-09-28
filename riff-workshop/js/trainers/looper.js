/* لوپر عمومی مشترک بین ترینرها */
/* ---------- generic looper for trainers ---------- */
var LP={on:false},BPM_OVR=0;
function lpStart(events,getBpm,opt){
  if(playing)stop();lpStop(true);if(RT.on)rtStop();
  whenReady(function(){
    LP={on:true,ev:events,bpm:getBpm,o:opt,i:0,rep:0,tick:0,nextT:ac.currentTime+0.1,vq:[],timer:null};
    if(opt.countIn){var bs=60/getBpm();for(var k=0;k<4;k++)click(LP.nextT+k*bs,k===0);LP.nextT+=4*bs;}
    LP.timer=setInterval(lpTick,25);lpTick();requestAnimationFrame(lpVis);if(opt.onStart)opt.onStart();
  });}
function lpTick(){var L=LP;if(!L.on||!ac)return;
  while(L.nextT<ac.currentTime+0.15){
    if(L.i>=L.ev.length){L.i=0;L.rep++;L.tick=0;if(L.o.onLoop)L.o.onLoop(L.rep);if(!L.on)return;}
    var bpm=L.bpm(),e=L.ev[L.i],tk=ticks(e),d=tk/96*60/bpm;
    BPM_OVR=bpm;playEvent(e,L.nextT,d,L.ev[L.i-1]||null,L.ev[L.i+1]||L.ev[0]);BPM_OVR=0;
    if(L.o.drumTs){var dts=L.o.drumTs,dst=L.o.drumStyle?L.o.drumStyle():'rock',dbar=dts.n*384/dts.d,DP=drumPattern(dts,dst),db0=Math.floor(L.tick/dbar)*dbar;for(var dbb=db0;dbb<L.tick+tk;dbb+=dbar)DP.forEach(function(h){var at=dbb+h.t;if(at>=L.tick-1e-6&&at<L.tick+tk-1e-6)drumHit(h.k,L.nextT+(at-L.tick)/96*60/bpm,h.v);});}
    if(L.o.click){var b=Math.ceil(L.tick/96-1e-9)*96;while(b<L.tick+tk-1e-9){click(L.nextT+(b-L.tick)/96*60/bpm,b%384===0);b+=96;}}
    L.vq.push({i:L.i,t:L.nextT});L.nextT+=d;L.tick+=tk;L.i++;}}
function lpVis(){var L=LP;if(!L.on)return;while(L.vq.length&&L.vq[0].t<=ac.currentTime){var q=L.vq.shift();if(L.o.onStep)L.o.onStep(q.i);}requestAnimationFrame(lpVis);}
function lpStop(silent){if(!LP.on)return;LP.on=false;clearInterval(LP.timer);if(ac)choke(ac.currentTime);if(LP.o&&LP.o.onStop)LP.o.onStop();}
function miniTab(box,events,idx){
  box.innerHTML='';var g=EL('div','trow');var w=events.map(function(e){return Math.max(24,Math.min(44,14+ticks(e)*0.3));});
  g.style.gridTemplateColumns='26px '+w.map(function(x){return Math.round(x)+'px';}).join(' ');
  var st=0,starts=events.map(function(e){var s=st;st+=ticks(e);return s;});
  ['tq','s0','s1','s2','s3','s4','s5'].forEach(function(r){g.appendChild(EL('div','tl',r[0]==='s'?SNAME[+r[1]]:''));
    events.forEach(function(e,i){var d=EL('div','tc'+(r==='tq'?' tq':'')+(starts[i]%384===0?' bl':starts[i]%96===0?' beat':'')+(i===idx?' now':''));d.dataset.i=i;
      var sp=EL('span');sp.textContent=r==='tq'?techLabel(e,events[i+1]):noteText(e,+r[1]).t;d.appendChild(sp);g.appendChild(d);});});
  box.appendChild(g);}
function miniNow(box,i){box.querySelectorAll('.tc.now').forEach(function(x){x.classList.remove('now');});box.querySelectorAll('.tc[data-i="'+i+'"]').forEach(function(x){x.classList.add('now');});}
