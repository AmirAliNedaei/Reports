/* تمرین گوش */
/* ---------- ear trainer ---------- */
var cleanBus=null;
function cbus(){if(!cleanBus){cleanBus=ac.createGain();cleanBus.gain.value=0.9;cleanBus.connect(FX.hp);}return cleanBus;}
function tone(midi,t,dur,g){sbLoad('clean');var sm=sbGet('clean',midi);if(sm){var s2=ac.createBufferSource();s2.buffer=sm.buf;s2.playbackRate.value=sm.rate;var g2=ac.createGain();g2.gain.setValueAtTime((g||0.7)*1.1,t);g2.gain.setTargetAtTime(0,t+(dur||1.2),0.08);s2.connect(g2);g2.connect(sbus);s2.start(t);s2.stop(t+(dur||1.2)+0.6);return;}var src=ac.createBufferSource();src.buffer=ks(midi,false);var gn=ac.createGain();gn.gain.setValueAtTime(g||0.7,t);gn.gain.setTargetAtTime(0,t+(dur||1.2),0.08);src.connect(gn);gn.connect(cbus());src.start(t);src.stop(t+(dur||1.2)+0.6);}
var EARN={int:'فاصله‌ها',chord:'کیفیت آکورد',deg:'درجه در گام',mode:'تشخیص مُد',prog:'پیشرفت آکورد'};
var INTN=['هم‌صدا','دوم کوچک','دوم بزرگ','سوم کوچک','سوم بزرگ','چهارم درست','تریتون','پنجم درست','ششم کوچک','ششم بزرگ','هفتم کوچک','هفتم بزرگ','اکتاو'];
var EAR={d:'int',q:null,n:0,c:0,streak:0,recent:[]};
function earOpts(){var lv=+$('earlvl').value,d=EAR.d;
  if(d==='int')return lv===1?[3,4,5,7,12]:lv===2?[1,2,3,4,5,6,7,8,9,10,11,12]:[1,2,3,4,5,6,7,8,9,10,11,12];
  if(d==='chord')return lv===1?['maj','min']:lv===2?['maj','min','dim','aug','sus2','sus4']:['maj7','m7','dom7','m7b5','dim7','mmaj7'];
  if(d==='mode')return lv===1?['ion','aeo']:lv===2?['ion','aeo','dor','phr','mix']:['ion','aeo','dor','phr','mix','lyd','loc','hm'];
  return [];}
function earPlay(){var q=EAR.q;if(!q)return;whenReady(function(){var t=ac.currentTime+0.05;choke(t);
  if(q.d==='int'){tone(q.r,t,0.9);tone(q.r+q.a,t+0.8,1.2);if(+$('earlvl').value===3){tone(q.r,t+2.2,1.4);tone(q.r+q.a,t+2.2,1.4);}}
  else if(q.d==='chord'){var tn=CTI[q.a].tones.map(function(x){return q.r+x[0];});tn.forEach(function(m,i){tone(m,t+i*0.28,0.9,0.5);});tn.forEach(function(m){tone(m,t+tn.length*0.28+0.2,1.6,0.45);});}
  else if(q.d==='deg'){var iv=MODES[S.mode].iv,k=48+((S.key%12)+12)%12;[[0,2,4],[3,5,0],[4,6,1],[0,2,4]].forEach(function(ch,i){ch.forEach(function(j){tone(k+iv[j]+(j<ch[0]?12:0),t+i*0.55,0.5,0.35);});});tone(k+12+iv[q.a],t+2.6,1.4,0.8);}
  else if(q.d==='mode'){var mi=MODES[q.a].iv,seq=mi.concat([12]).concat(mi.slice().reverse());tone(q.r-12,t,5.2,0.35);seq.forEach(function(x,i){tone(q.r+x,t+i*0.3,0.35,0.6);});}
  else if(q.d==='prog'){var base=40+((S.key-4)%12+12)%12;q.a.forEach(function(j,i){var iv2=MODES[S.mode].iv;[0,2,4].forEach(function(k2,n){tone(base+iv2[(j+k2)%7]+12*Math.floor((j+k2)/7)+(n?12:0),t+i*0.9,0.85,0.4);});tone(base+iv2[j]-12+12*Math.floor(j/7),t+i*0.9,0.85,0.5);});}
});}
function earNew(){var d=EAR.d,o=earOpts(),q={d:d};
  if(d==='int'){q.a=o[Math.floor(Math.random()*o.length)];q.r=48+Math.floor(Math.random()*12);q.opts=o;}
  else if(d==='chord'){q.a=o[Math.floor(Math.random()*o.length)];q.r=48+Math.floor(Math.random()*12);q.opts=o;}
  else if(d==='deg'){q.a=Math.floor(Math.random()*7);q.opts=[0,1,2,3,4,5,6];}
  else if(d==='mode'){q.a=o[Math.floor(Math.random()*o.length)];q.r=52+Math.floor(Math.random()*8);q.opts=o;}
  else{var list=(STYLES[curStyle].prog[S.mode]||[]).map(function(p){return p[0];});if(list.length<2){toast('برای این مُد پیشرفت کافی نیست');return;}
    var ch=list.slice().sort(function(){return Math.random()-0.5;}).slice(0,Math.min(4,list.length));q.a=ch[0];q.opts=ch.slice().sort(function(){return Math.random()-0.5;});}
  EAR.q=q;$('earfb').textContent='';var ab=$('earans');ab.innerHTML='';
  var qt={int:'این چه فاصله‌ایه؟',chord:'این چه آکوردیه؟',deg:'این نت کدوم درجه‌ی '+MN()+'ه؟',mode:'این کدوم مُده؟',prog:'کدوم پیشرفت پخش شد؟'};
  $('earq').innerHTML=qt[d];
  q.opts.forEach(function(v){var lab=d==='int'?INTN[v]:d==='chord'?(CTI[v].sfx||'ماژور')+(v==='min'?' (مینور)':''):d==='deg'?spell(MODES[S.mode].iv)[v]+' ('+dlab(MODES[S.mode].iv)[v]+')':d==='mode'?(MODES[v].n):v.map(function(j){return triad(S.mode,j).rn;}).join(' – ');
    var b=EL('button','ans',lab);b.classList.add('ltr');b.onclick=function(){earAns(v,b,lab);};ab.appendChild(b);});
  earPlay();}
function earAns(v,b,lab){var q=EAR.q;if(!q||q.done)return;q.done=true;var ok=JSON.stringify(v)===JSON.stringify(q.a);
  EAR.n++;if(ok){EAR.c++;EAR.streak++;}else EAR.streak=0;b.classList.add(ok?'ok':'no');
  if(!ok)$('earans').querySelectorAll('.ans').forEach(function(x,i){if(JSON.stringify(q.opts[i])===JSON.stringify(q.a))x.classList.add('ok');});
  var r=P.ear[q.d]=P.ear[q.d]||{c:0,t:0};r.t++;if(ok)r.c++;saveP();
  var right=$('earans').querySelector('.ans.ok');$('earfb').textContent=ok?'✓ درسته!':'✗ جواب درست: '+(right?right.textContent:'');
  EAR.recent.unshift((ok?'✓ ':'✗ ')+(right?right.textContent:lab));EAR.recent=EAR.recent.slice(0,8);$('earrecent').innerHTML='آخرین جواب‌ها: <span class="ltr">'+EAR.recent.join('  ·  ')+'</span>';
  earStats();setTimeout(function(){if(EAR.q===q)earNew();},ok?1100:2200);}
function earStats(){var r=P.ear[EAR.d]||{c:0,t:0};statTiles($('earstats'),[[fa(EAR.n),'کل'],[fa(EAR.c),'درست'],[EAR.n?fa(Math.round(EAR.c/EAR.n*100))+'٪':'–','دقت این جلسه'],[fa(EAR.streak),'پشت سر هم'],[r.t?fa(Math.round(r.c/r.t*100))+'٪':'–','دقت کل این تمرین']]);}
function earRender(){var b=$('eardrill');if(!b)return;b.innerHTML='';Object.keys(EARN).forEach(function(k){var x=EL('button','chip',EARN[k]);x.setAttribute('aria-pressed',k===EAR.d);x.onclick=function(){EAR.d=k;EAR.q=null;$('earans').innerHTML='';$('earq').textContent='برای شروع «سؤال جدید» رو بزن';earRender();};b.appendChild(x);});
  var H={int:'دو نت پشت هم پخش می‌شن (در سطح سخت، هم‌زمان هم).',chord:'آکورد اول آرپژ و بعد کامل پخش می‌شه.',deg:'اول یک کادانس در '+MN()+' پخش می‌شه تا گوشت خونه رو پیدا کنه، بعد یک نت.',mode:'اسکیل روی نت بیس پخش می‌شه؛ به رنگ نت‌های امضا دقت کن.',prog:'یکی از پیشرفت‌های بانک آکورد در '+MN()+' پخش می‌شه.'};
  $('earhint').textContent=H[EAR.d];$('earlvl').disabled=EAR.d==='deg'||EAR.d==='prog';earStats();}
