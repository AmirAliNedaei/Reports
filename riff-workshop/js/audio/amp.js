/* شبیه‌ساز آمپ برای نمونه‌های DI گیتار: پیش‌تقویت، دو طبقه دیستورشن، اکولایزر، کابینت و ریورب */
/* ---------- amp simulator ---------- */
// همه‌ی عددهای صدای آمپ اینجاست تا راحت تنظیم بشه.
// hp/mid/midf: فیلتر قبل از دیستورشن (مثل پدال Tube Screamer که بم رو سفت و مید رو جلو میاره)
// k1/k2: شدت دو طبقه‌ی دیستورشن، lp: فیلتر بین دو طبقه برای گرفتن خش
// bass/scoop/pres: تون‌استک آمپ، cab: فرکانس قطع کابینت، out: بلندی خروجی، verb: مقدار ریورب
// pmf/pmdec: فیلتر و سرعت خاموش شدن پالم‌میوت، wide: جدا کردن دو برداشت گیتار به چپ و راست (0 تا 1)
var AMPSET={
 drive:{hp:140,mid:5,midf:850,k1:16,k2:4,lp:6500,bass:0,scoop:-3,pres:4,cab:6000,out:0.3,verb:0.07,pmf:900,pmdec:0.045,wide:0.8},
 od:{hp:100,mid:4,midf:750,k1:6,k2:1.8,lp:7500,bass:0,scoop:-2,pres:3,cab:6200,out:0.28,verb:0.09,pmf:1100,pmdec:0.06,wide:0.7},
 clean:{hp:70,mid:6,midf:2500,k1:1.2,k2:1,lp:14000,bass:0,scoop:-1,pres:4,cab:10000,out:0.7,verb:0.16,pmf:2000,pmdec:0.08,wide:0}
};
var AMP=null,AMPCURVE={};
function ampCurve(k,asym){var key=k+'_'+asym;if(AMPCURVE[key])return AMPCURVE[key];
  var n=4096,c=new Float32Array(n),b=asym||0,t0=Math.tanh(k*b),m=0,i,x;
  for(i=0;i<n;i++){x=i*2/(n-1)-1;c[i]=Math.tanh(k*(x+b))-t0;m=Math.max(m,Math.abs(c[i]));}
  for(i=0;i<n;i++)c[i]/=m;
  AMPCURVE[key]=c;return c;}
function ampBiq(type,f,q,g){var b=ac.createBiquadFilter();b.type=type;b.frequency.value=f;if(q!==undefined)b.Q.value=q;if(g!==undefined)b.gain.value=g;return b;}
function ampChain(dest,verb){
  var n={in:ac.createGain(),hp:ampBiq('highpass',100,0.6),mid:ampBiq('peaking',800,0.9,0),sh1:ac.createWaveShaper(),lp:ampBiq('lowpass',7000,0.7),
    sh2:ac.createWaveShaper(),chp:ampBiq('highpass',80,0.7),bass:ampBiq('lowshelf',110,undefined,0),scoop:ampBiq('peaking',450,0.8,0),
    pres:ampBiq('peaking',2800,1.2,0),cab1:ampBiq('lowpass',5200,1.0),cab2:ampBiq('lowpass',5200,0.55),out:ac.createGain(),send:ac.createGain(),
    pan:ac.createStereoPanner?ac.createStereoPanner():null};
  n.sh1.oversample='4x';n.sh2.oversample='4x';
  var seq=[n.in,n.hp,n.mid,n.sh1,n.lp,n.sh2,n.chp,n.bass,n.scoop,n.pres,n.cab1,n.cab2,n.out];
  for(var i=0;i<seq.length-1;i++)seq[i].connect(seq[i+1]);
  var last=n.pan?(n.out.connect(n.pan),n.pan):n.out;
  last.connect(dest);last.connect(n.send);n.send.connect(verb);
  return n;}
function ampSet(n,s,pan){
  n.hp.frequency.value=s.hp;n.mid.frequency.value=s.midf;n.mid.gain.value=s.mid;
  n.sh1.curve=ampCurve(s.k1,0.12);n.sh2.curve=ampCurve(s.k2,0);n.lp.frequency.value=s.lp;
  n.bass.gain.value=s.bass;n.scoop.gain.value=s.scoop;n.pres.gain.value=s.pres;n.cab1.frequency.value=s.cab;n.cab2.frequency.value=s.cab;
  n.out.gain.value=s.out;n.send.gain.value=s.verb;if(n.pan)n.pan.pan.value=pan||0;}
function ampVerbIR(){var sr=ac.sampleRate,len=Math.floor(sr*1.3),pre=Math.floor(sr*0.015),b=ac.createBuffer(2,len,sr);
  for(var ch=0;ch<2;ch++){var d=b.getChannelData(ch);for(var i=pre;i<len;i++){var t=(i-pre)/sr;d[i]=(Math.random()*2-1)*Math.exp(-t*4.2)*(1-Math.exp(-t*300));}}
  return b;}
// سه زنجیره: دو تا برای گیتارِ دوبل‌شده‌ی چپ و راست (درایو/اوردرایو) و یکی تمیز در وسط
function ampBuild(dest){
  var verb=ac.createConvolver();verb.buffer=ampVerbIR();verb.connect(dest);
  AMP={l:ampChain(dest,verb),r:ampChain(dest,verb),c:ampChain(dest,verb),verb:verb};
  ampSet(AMP.c,AMPSET.clean,0);ampTone();}
function ampMode(){return S.tone==='drive'||S.tone==='od'||S.tone==='clean'?S.tone:null;}
function ampTone(){if(!AMP)return;var s=AMPSET[ampMode()]||AMPSET.drive;ampSet(AMP.l,s,-s.wide);ampSet(AMP.r,s,s.wide);}
