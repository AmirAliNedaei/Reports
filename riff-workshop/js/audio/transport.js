/* پخش و زمان‌بندی (transport) و درامز */
/* ---------- transport ---------- */
var playing=false,timer=null,nextT=0,evI=0,visQ=[],nowEv=-1,loopA=0,loopB=0,curTick=0,STARTS=[];
function computeStarts(){var a=[],t=0;S.events.forEach(function(e){a.push(t);t+=ticks(e);});a.push(t);STARTS=a;return a;}
function click(t,acc){var o=ac.createOscillator(),g=ac.createGain();o.frequency.value=acc?1760:1180;g.gain.setValueAtTime(0.0001,t);g.gain.linearRampToValueAtTime(acc?0.35:0.22,t+0.003);g.gain.exponentialRampToValueAtTime(0.0001,t+0.06);o.connect(g);g.connect(ac.destination);o.start(t);o.stop(t+0.08);}
/* ---------- drums ---------- */
var NOISE=null;
function drumNoise(){if(!NOISE){var n=Math.floor(ac.sampleRate*1.2),b=ac.createBuffer(1,n,ac.sampleRate),d=b.getChannelData(0);for(var i=0;i<n;i++)d[i]=Math.random()*2-1;NOISE=b;}return NOISE;}
function dbus(){return (FX&&FX.comp)||ac.destination;}
function drumHit(kind,t,v){v=v||1;var out=dbus();
  if(kind==='k'){var o=ac.createOscillator(),g=ac.createGain();o.frequency.setValueAtTime(140,t);o.frequency.exponentialRampToValueAtTime(42,t+0.12);g.gain.setValueAtTime(0.9*v,t);g.gain.exponentialRampToValueAtTime(0.001,t+0.32);o.connect(g);g.connect(out);o.start(t);o.stop(t+0.35);
    var c=ac.createBufferSource();c.buffer=drumNoise();var hp=ac.createBiquadFilter();hp.type='highpass';hp.frequency.value=2500;var cg=ac.createGain();cg.gain.setValueAtTime(0.25*v,t);cg.gain.exponentialRampToValueAtTime(0.001,t+0.02);c.connect(hp);hp.connect(cg);cg.connect(out);c.start(t);c.stop(t+0.03);}
  else if(kind==='s'){var n=ac.createBufferSource();n.buffer=drumNoise();var bp=ac.createBiquadFilter();bp.type='bandpass';bp.frequency.value=1900;bp.Q.value=0.7;var g2=ac.createGain();g2.gain.setValueAtTime(0.7*v,t);g2.gain.exponentialRampToValueAtTime(0.001,t+0.2);n.connect(bp);bp.connect(g2);g2.connect(out);n.start(t);n.stop(t+0.22);
    var o2=ac.createOscillator(),g3=ac.createGain();o2.frequency.setValueAtTime(200,t);o2.frequency.exponentialRampToValueAtTime(160,t+0.08);g3.gain.setValueAtTime(0.35*v,t);g3.gain.exponentialRampToValueAtTime(0.001,t+0.1);o2.connect(g3);g3.connect(out);o2.start(t);o2.stop(t+0.12);}
  else{var h=ac.createBufferSource();h.buffer=drumNoise();var hp2=ac.createBiquadFilter();hp2.type='highpass';hp2.frequency.value=kind==='c'?4000:7500;var g4=ac.createGain();var dur=kind==='c'?1.1:kind==='o'?0.22:0.045;g4.gain.setValueAtTime((kind==='c'?0.35:0.22)*v,t);g4.gain.exponentialRampToValueAtTime(0.001,t+dur);h.connect(hp2);hp2.connect(g4);g4.connect(out);h.start(t);h.stop(t+dur+0.02);}}
/* pattern for one bar: [{t,k,v}] from a meter {n,d,g} and a style */
function drumPattern(ts,style){
  var u=384/ts.d,g=ts.g||(ts.d>=8?(ts.n%3===0?Array(ts.n/3).fill(3):[ts.n]):Array(ts.n).fill(1)),bar=ts.n*u,starts=[],t=0,P=[];
  g.forEach(function(x){starts.push(t);t+=x*u;});
  if(ts.d===4&&!ts.g){starts=[];for(var q=0;q<ts.n;q++)starts.push(q*96);}
  var back=starts.filter(function(x,i){return i%2===1;}),down=starts.filter(function(x,i){return i%2===0;});
  if(ts.d===4&&!ts.g&&ts.n===3){down=[0];back=[96,192];}
  function add(tk,k,v){P.push({t:tk,k:k,v:v||1});}
  if(style==='none')return P;
  if(style==='blast'){for(var b=0;b<bar;b+=24){add(b,b%48===0?'k':'s',0.8);if(b%48===0)add(b,'h',0.8);}add(0,'c',1);return P;}
  for(var h=0;h<bar;h+=48)add(h,'h',starts.indexOf(h)>=0?1:0.6);
  if(style==='rock'){down.forEach(function(x){add(x,'k');});back.forEach(function(x){add(x,'s');});}
  else if(style==='metal'){for(var m=0;m<bar;m+=24)add(m,'k',0.7);back.forEach(function(x){add(x,'s');});}
  else if(style==='gallop'){for(var q2=0;q2<bar;q2+=96){add(q2,'k',0.8);add(q2+48,'k',0.7);add(q2+72,'k',0.7);}back.forEach(function(x){add(x,'s');});}
  else if(style==='half'){add(0,'k');var mid=starts[Math.floor(starts.length/2)]||bar/2;add(mid,'s');if(starts.length>2)add(starts[starts.length-1],'k',0.8);}
  add(0,'c',style==='half'?0.6:0.45);
  return P;}

function schedule(){
  var E=S.events;if(!E.length){stop();return;}
  while(nextT<ac.currentTime+0.15){
    if(evI>loopB||evI>=E.length){
      if(S.loop){evI=S.sel?loopA:0;curTick=STARTS[evI];}
      else{var endT=nextT;setTimeout(stop,Math.max(0,(endT-ac.currentTime)*1000));clearInterval(timer);timer=null;return;}
    }
    var e=E[evI],tk=ticks(e),d=secsOf(tk),prev=evI>0?E[evI-1]:null,next=E[evI+1]||(S.loop?E[S.sel?loopA:0]:null);
    playEvent(e,nextT,d,prev,next);
    if(S.metro){var BT=beatT(),b=Math.ceil(curTick/BT-1e-9)*BT,GS=groupsT();while(b<curTick+tk-1e-9){var rb=b%barT();click(nextT+secsOf(b-curTick),Math.abs(rb)<1e-6||GS.indexOf(rb)>0&&GS.indexOf(rb)<GS.length-1);b+=BT;}}
    if(S.drums&&S.drums!=='none'){var DP=drumPattern(S.ts,S.drums),BTk=barT(),b0=Math.floor(curTick/BTk)*BTk;for(var bb=b0;bb<curTick+tk;bb+=BTk)DP.forEach(function(h){var at=bb+h.t;if(at>=curTick-1e-6&&at<curTick+tk-1e-6)drumHit(h.k,nextT+secsOf(at-curTick),h.v);});}
    visQ.push({i:evI,t:nextT});nextT+=d;curTick+=tk;evI++;
  }
}
function start(fromZero){if(!S.events.length){toast('ریف خالیه');return;}whenReady(function(){realStart(fromZero);});}
function realStart(fromZero){if(playing)return;lpStop();if(RT.on)rtStop();
  computeStarts();var n=S.events.length;
  if(S.sel){loopA=S.sel.a;loopB=S.sel.b;evI=loopA;}
  else{loopA=0;loopB=n-1;evI=fromZero||S.cur>=n?0:S.cur;}
  curTick=STARTS[evI];playing=true;visQ=[];nextT=ac.currentTime+0.08;
  if(S.countin){var bs=secsOf(beatT());for(var k=0;k<S.ts.n;k++)click(nextT+k*bs,k===0);nextT+=S.ts.n*bs;}
  timer=setInterval(schedule,25);schedule();
  $('play').textContent='■';if($('gplay'))$('gplay').hidden=false;requestAnimationFrame(vis);}
function stop(){playing=false;if(timer){clearInterval(timer);timer=null;}if(ac)choke(ac.currentTime);visQ=[];setNow(-1);$('play').textContent='▶';if($('gplay'))$('gplay').hidden=true;}
function vis(){
  if(!playing)return;
  while(visQ.length&&visQ[0].t<=ac.currentTime){var q=visQ.shift();setNow(q.i);}
  requestAnimationFrame(vis);
}
function neckCells(s,f){var out=[];['neck','rneck'].forEach(function(id){var n=$(id);if(n){var c=n.querySelector('.cell[data-s="'+s+'"][data-f="'+f+'"]');if(c)out.push(c);}});return out;}
var FOLLOW=true,USCROLL=0;
['wheel','touchmove'].forEach(function(ev){window.addEventListener(ev,function(){USCROLL=Date.now();},{passive:true});});
window.addEventListener('keydown',function(e){if(['PageUp','PageDown','Home','End'].indexOf(e.key)>=0)USCROLL=Date.now();});
function setNow(i){
  document.querySelectorAll('#tab .tc.now').forEach(function(e){e.classList.remove('now');});
  document.querySelectorAll('.dot.flash').forEach(function(e){e.classList.remove('flash');});
  nowEv=i;if(i<0)return;
  var cols=document.querySelectorAll('#tab .tc[data-i="'+i+'"]');cols.forEach(function(e){e.classList.add('now');});
  if(cols.length&&FOLLOW&&curPage==='editor'&&Date.now()-USCROLL>2500){var r=cols[0].getBoundingClientRect();if(r.top<80||r.bottom>window.innerHeight-10)cols[0].scrollIntoView({block:'center',behavior:'auto'});}
  var e=S.events[i];
  if(e&&!e.rest)e.notes.forEach(function(p){neckCells(p.s,p.f).forEach(function(c){c.querySelector('.dot').classList.add('flash');});});
}
