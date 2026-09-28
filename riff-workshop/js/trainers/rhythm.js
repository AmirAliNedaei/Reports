/* ترینر ریتم */
/* ---------- rhythm trainer ---------- */
function evenOn(step,len){var a=[];for(var t=0;t<len;t+=step)a.push(t);return a;}
function perBeat(offs,beats){var a=[];for(var b=0;b<beats;b++)offs.forEach(function(o){a.push(b*96+o);});return a;}
var RTP=[
 {c:'پایه',n:'سیاه‌ها',len:384,u:48,on:evenOn(96,384)},
 {c:'پایه',n:'سکوت روی ضرب ۲',len:384,u:48,on:[0,192,288]},
 {c:'پایه',n:'سکوت روی ضرب ۴',len:384,u:48,on:[0,96,192]},
 {c:'چنگ',n:'چنگ‌های یکنواخت',len:384,u:48,on:evenOn(48,384)},
 {c:'چنگ',n:'پشت‌ضرب‌ها',len:384,u:48,on:[48,144,240,336]},
 {c:'چنگ',n:'سنکوپ',len:384,u:48,on:[0,48,144,240,288]},
 {c:'دولاچنگ',n:'دولاچنگ‌های یکنواخت',len:384,u:24,on:evenOn(24,384)},
 {c:'دولاچنگ',n:'گالاپ',len:384,u:24,on:perBeat([0,48,72],4)},
 {c:'دولاچنگ',n:'گالاپ معکوس',len:384,u:24,on:perBeat([0,24,48],4)},
 {c:'دولاچنگ',n:'چاگ ۳+۳+۲',len:384,u:24,on:[0,72,144,192,264,336]},
 {c:'دولاچنگ',n:'سنکوپ متال',len:384,u:24,on:[0,24,72,120,144,216,264,312]},
 {c:'تریوله',n:'تریوله‌ی چنگ',len:384,u:32,on:evenOn(32,384)},
 {c:'تریوله',n:'شافل',len:384,u:32,on:perBeat([0,64],4)},
 {c:'لنگ',n:'۵/۴ سیاه‌ها',len:480,u:48,on:evenOn(96,480),ts:[5,4]},
 {c:'لنگ',n:'۷/۸ (۲+۲+۳)',len:336,u:48,on:[0,96,192],ts:[7,8],acc:[0,96,192]},
 {c:'لنگ',n:'۷/۸ (۳+۲+۲)',len:336,u:48,on:[0,144,240],ts:[7,8]},
 {c:'لنگ',n:'۶/۸',len:288,u:48,on:[0,144],ts:[6,8]}];
var RT={on:false,p:RTP[3],exp:[],bars:0,good:0,hits:0,miss:0,streak:0,offs:[],timer:null};
function rtRenderList(){var box=$('rtlist');if(!box)return;box.innerHTML='';var cat='';
  RTP.forEach(function(p){if(p.c!==cat){cat=p.c;box.appendChild(EL('div','kick',cat));}var b=EL('button','litem',p.n+(P.rt[p.n]?' <small>'+fa(Math.round(P.rt[p.n].best*100))+'٪</small>':''));
    b.setAttribute('aria-pressed',p===RT.p);b.onclick=function(){if(RT.on)rtStop();RT.p=p;rtRenderList();rtShow();};box.appendChild(b);});}
function rtShow(){var p=RT.p;$('rtname').textContent=p.n;$('rtdesc').textContent=(p.ts?p.ts[0]+'/'+p.ts[1]:'4/4')+'، '+fa(p.on.length)+' ضربه در هر میزان';
  var g=$('rtgrid');g.innerHTML='';for(var t=0;t<p.len;t+=p.u){var c=EL('span',p.on.indexOf(t)>=0?'hit':'');c.dataset.t=t;if(t%96===0||(p.ts&&p.ts[1]===8&&t%48===0&&false))c.classList.add('bt');if(p.on.indexOf(t)>=0)c.innerHTML='●';g.appendChild(c);}rtStats();}
function rtStats(){var tot=RT.good+RT.miss,avg=RT.offs.length?Math.round(RT.offs.reduce(function(a,b){return a+b;},0)/RT.offs.length):null;
  statTiles($('rtstats'),[[fa(RT.bars),'میزان'],[fa(RT.good),'دقیق'],[tot?fa(Math.round(RT.good/tot*100))+'٪':'–','دقت'],[fa(RT.streak),'پشت سر هم'],[avg===null?'–':(avg>0?'+':'')+avg+'ms',avg===null?'گرایش':avg>8?'دیرتر از ضرب':avg<-8?'زودتر از ضرب':'دقیق روی ضرب']]);}
function rtGo(){if(RT.on){rtStop();return;}
  if(playing)stop();lpStop();
  whenReady(function(){var p=RT.p,bpm=+$('rtbpm').value,sp=60/bpm/96,t0=ac.currentTime+0.15,beatT=p.ts&&p.ts[1]===8?48:96;
    RT.on=true;RT.bars=0;RT.good=0;RT.miss=0;RT.streak=0;RT.offs=[];RT.exp=[];RT.t0=t0;RT.sp=sp;RT.next=0;RT.demo=1;
    for(var b=0;b<p.len;b+=beatT)click(t0+b*sp,b===0);
    RT.startT=t0+p.len*sp;RT.barIdx=0;$('rtgo').textContent='توقف';$('rtfb').textContent='گوش بده...';
    RT.timer=setInterval(rtTick,25);rtTick();requestAnimationFrame(rtVis);});}
function rtTick(){if(!RT.on)return;var p=RT.p,sp=RT.sp,beatT=p.ts&&p.ts[1]===8?48:96;
  while(RT.startT+RT.barIdx*p.len*sp<ac.currentTime+0.2){var bt=RT.startT+RT.barIdx*p.len*sp,isDemo=RT.barIdx<RT.demo;
    for(var b=0;b<p.len;b+=beatT)click(bt+b*sp,b===0);
    p.on.forEach(function(o){var t=bt+o*sp;if(isDemo||$('rtguide').checked)playMidis([OPEN[LOW]+rootFret(LOW,S.key)],t,true);if(!isDemo)RT.exp.push({t:t,o:o,hit:false,bar:RT.barIdx});});
    RT.barIdx++;}
  var now=ac.currentTime-(ac.outputLatency||0);RT.exp.forEach(function(x){if(!x.hit&&!x.gone&&now>x.t+0.15){x.gone=true;RT.miss++;RT.streak=0;rtMark(x.o,'m');rtStats();}});
  RT.exp=RT.exp.filter(function(x){return now<x.t+1;});}
function rtVis(){if(!RT.on)return;var p=RT.p,el=(ac.currentTime-RT.startT)/RT.sp;var pos=((el%p.len)+p.len)%p.len,cell=Math.floor(pos/p.u)*p.u;
  $('rtgrid').querySelectorAll('span').forEach(function(s){s.classList.toggle('now',+s.dataset.t===cell);});
  var bar=Math.floor(el/p.len);if(bar>=0&&bar+1>RT.bars+RT.demo){RT.bars=Math.max(0,bar+1-RT.demo);if(RT.bars>0)$('rtfb').textContent='حالا همراهش ضربه بزن!';rtStats();
    $('rtgrid').querySelectorAll('span').forEach(function(s){s.classList.remove('g','e','m');});}
  requestAnimationFrame(rtVis);}
function rtMark(o,c){var s=$('rtgrid').querySelector('span[data-t="'+o+'"]');if(s){s.classList.remove('g','e','m');s.classList.add(c);}}
function rtTap(){if(!RT.on)return;var t=ac.currentTime-(ac.outputLatency||0),best=null,bd=1;
  RT.exp.forEach(function(x){if(x.hit||x.gone)return;var d=t-x.t;if(Math.abs(d)<Math.abs(bd)){bd=d;best=x;}});
  if(!best||Math.abs(bd)>0.15){$('rtfb').textContent='ضربه‌ی اضافه';RT.streak=0;rtStats();return;}
  best.hit=true;var ms=Math.round(bd*1000);RT.offs.push(ms);
  if(Math.abs(ms)<=60){RT.good++;RT.streak++;rtMark(best.o,'g');$('rtfb').textContent='✓ دقیق ('+(ms>0?'+':'')+ms+'ms)';}
  else{RT.miss++;RT.streak=0;rtMark(best.o,'e');$('rtfb').textContent=(ms>0?'دیر':'زود')+' ('+(ms>0?'+':'')+ms+'ms)';}
  rtStats();}
function rtStop(){if(!RT.on)return;RT.on=false;clearInterval(RT.timer);$('rtgo').textContent='شروع';
  var tot=RT.good+RT.miss;if(tot>=4){var a=RT.good/tot,r=P.rt[RT.p.n]=P.rt[RT.p.n]||{c:0,t:0,best:0};r.c+=RT.good;r.t+=tot;if(a>r.best)r.best=a;saveP();rtRenderList();}
  $('rtfb').textContent=tot?'نتیجه: '+fa(Math.round(RT.good/tot*100))+'٪ ضربه‌ی دقیق':'اول الگو رو گوش بده، بعد همراهش ضربه بزن.';}
