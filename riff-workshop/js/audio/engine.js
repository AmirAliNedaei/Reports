/* موتور صدا: AudioContext، زنجیره‌ی افکت، سنتز Karplus-Strong، صدای رویدادها */
/* ---------- audio ---------- */
var ac=null,input,driveIn,cleanIn,voices=[],cache={};
function initAudio(){
  if(ac)return;
  try{ac=new (window.AudioContext||window.webkitAudioContext)();}catch(e){ac=null;return;}
  input=ac.createGain();
  cleanIn=ac.createGain();driveIn=ac.createGain();
  var pre=ac.createGain();pre.gain.value=5;
  var sh=ac.createWaveShaper();var n=2048,c=new Float32Array(n),k=40;
  for(var i=0;i<n;i++){var x=i*2/n-1;c[i]=(1+k)*x/(1+k*Math.abs(x));}
  sh.curve=c;sh.oversample='4x';
  var post=ac.createGain();post.gain.value=0.22;
  var hp=ac.createBiquadFilter();hp.type='highpass';hp.frequency.value=75;
  var mid=ac.createBiquadFilter();mid.type='peaking';mid.frequency.value=750;mid.Q.value=0.9;mid.gain.value=-5;
  var pres=ac.createBiquadFilter();pres.type='peaking';pres.frequency.value=2400;pres.Q.value=1;pres.gain.value=3;
  var cab=ac.createBiquadFilter();cab.type='lowpass';cab.frequency.value=4800;cab.Q.value=0.7;
  var cab2=ac.createBiquadFilter();cab2.type='lowpass';cab2.frequency.value=6500;cab2.Q.value=0.5;
  var master=ac.createGain();master.gain.value=0.55;
  var comp=ac.createDynamicsCompressor();comp.threshold.value=-14;comp.ratio.value=4;
  FX={hp:hp,mid:mid,pres:pres,cab:cab,cab2:cab2,comp:comp};
  sbus=ac.createGain();sbus.gain.value=1;sbus.connect(comp);
  input.connect(cleanIn);input.connect(driveIn);
  driveIn.connect(pre);pre.connect(sh);sh.connect(post);post.connect(hp);
  cleanIn.connect(hp);
  hp.connect(mid);mid.connect(pres);pres.connect(cab);cab.connect(cab2);cab2.connect(comp);comp.connect(master);master.connect(ac.destination);
  setTone();
}
var FX=null;
function normT(x){return ['clean','drive','acoustic','od','synth'].indexOf(x)>=0?x:'drive';}
function setTone(){if(!ac)return;sbPrime();var d=S.tone==='drive'||S.tone==='od',a=S.tone==='acoustic';driveIn.gain.value=d?1:0;cleanIn.gain.value=d?0:(a?1:0.9);
  if(FX){FX.mid.gain.value=a?1:-5;FX.pres.gain.value=a?5:3;FX.cab.frequency.value=a?10000:4800;FX.cab2.frequency.value=a?12000:6500;FX.hp.frequency.value=a?90:75;}}
function ks(midi,pm){
  var key=midi+(pm?'p':'o');if(cache[key])return cache[key];
  var sr=ac.sampleRate,freq=440*Math.pow(2,(midi-69)/12),dur=pm?0.4:2.4,len=Math.floor(sr*dur);
  var N=Math.max(2,Math.round(sr/freq)),buf=ac.createBuffer(1,len,sr),d=buf.getChannelData(0);
  var prev=0;for(var i=0;i<N;i++){var r=Math.random()*2-1;prev=pm?prev*0.6+r*0.4:prev*0.2+r*0.8;d[i]=prev;}
  var decay=pm?0.982:0.9965,a=pm?0.3:0.5;
  d[N]=decay*d[0];for(i=N+1;i<len;i++){d[i]=decay*(a*d[i-N]+(1-a)*d[i-N-1]);}
  for(i=0;i<len;i++){if(!isFinite(d[i]))d[i]=0;}
  var mx=0;for(i=0;i<len;i++)mx=Math.max(mx,Math.abs(d[i]));
  var g=0.7/(mx||1);for(i=0;i<len;i++)d[i]*=g;
  cache[key]=buf;return buf;
}
function choke(t){voices.forEach(function(v){try{v.g.gain.setTargetAtTime(0,t,0.012);v.src.stop(t+0.12);}catch(e){}});voices=[];}
function sound(st,t){
  if(!ac)return;
  playMidis(chordMidis(st),t,st.pm);
}
function playMidis(ms,t,pm){
  ms.forEach(function(m,k){voice(m,t+k*0.007,{pm:!!pm,gain:(pm?1:0.8)*(k?0.7:1),dur:2});});
}
function whenReady(fn){initAudio();if(!ac){toast('مرورگرت پخش صدا رو پشتیبانی نمی‌کنه');return;}
  if(ac.state!=='running'){var p=ac.resume();if(p&&p.then)p.then(fn,function(){toast('مرورگر اجازه‌ی پخش صدا نداد');});else fn();}else fn();}
function audition(st){whenReady(function(){var t=ac.currentTime+0.02;choke(t);sound(st,t);});}

/* ---------- event audio ---------- */
function rate(semi){return Math.pow(2,semi/12);}
var noiseBuf=null;
function deadHit(t,g0){
  if(!noiseBuf){var sr=ac.sampleRate,len=Math.floor(sr*0.07);noiseBuf=ac.createBuffer(1,len,sr);var d=noiseBuf.getChannelData(0);for(var i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,3);}
  var src=ac.createBufferSource();src.buffer=noiseBuf;var bp=ac.createBiquadFilter();bp.type='bandpass';bp.frequency.value=1100;bp.Q.value=1.1;
  var g=ac.createGain();g.gain.value=g0;src.connect(bp);bp.connect(g);g.connect(input);src.start(t);voices.push({src:src,g:g});}
function harmPitch(n){var map={12:12,24:24,7:19,19:19,5:24,4:28,9:28,16:28,3:31};return map[n.f]!==undefined?OPEN[n.s]+map[n.f]:OPEN[n.s]+n.f+12;}
