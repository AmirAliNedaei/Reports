/* بانک نمونه‌های صدای گیتار واقعی (mp3های پوشه‌ی samples/) */
/* ---------- sample bank (real guitar recordings) ---------- */
var sbus=null,SBUF={},SBLOAD={},SBTOLD=false;
var TONEMAP={drive:{main:'dist',pm:'dist',pmf:1500,pmdec:0.07},od:{main:'od',pm:'od',pmf:1600,pmdec:0.07},clean:{main:'clean',pm:'mute'},acoustic:{main:'acou',pm:'acou',pmf:2200,pmdec:0.09},synth:{}};
var SBG={dist:0.5,od:0.55,clean:0.95,mute:1.1,acou:1.0,harm:0.85};
/* mp3ها با fetch خونده می‌شن؛ اگه نشد (مثلاً باز کردن فایل با file://) بی‌صدا رد می‌شه و سنتز جایگزین پخش می‌کنه */
function sbFetch(inst,m){if(typeof fetch!=='function')return Promise.reject();
  return fetch(SAMPLE_DIR+inst+'/'+m+'.mp3').then(function(r){if(!r.ok)throw new Error(r.status);return r.arrayBuffer();});}
function sbLoad(inst){
  if(!ac||typeof SAMPLES==='undefined'||!SAMPLES[inst]||typeof ac.decodeAudioData!=='function')return Promise.resolve();
  if(SBLOAD[inst])return SBLOAD[inst];SBUF[inst]={};
  SBLOAD[inst]=Promise.all(SAMPLES[inst].map(function(m){return new Promise(function(res){
    sbFetch(inst,m).then(function(buf){var r=ac.decodeAudioData(buf,function(b){SBUF[inst][m]=b;res();},function(){res();});if(r&&r.catch)r.catch(function(){res();});}).catch(function(){res();});});}));
  return SBLOAD[inst];}
function sbGet(inst,midi){var B=SBUF[inst];if(!B)return null;var best=null,bd=99;for(var k in B){var d=Math.abs(+k-midi);if(d<bd){bd=d;best=+k;}}
  return best===null||bd>6?null:{buf:B[best],rate:Math.pow(2,(midi-best)/12)};}
function sbPrime(){var T=TONEMAP[S.tone]||TONEMAP.drive;if(!T.main)return;
  var first=!SBLOAD[T.main];
  Promise.all([sbLoad(T.main),sbLoad(T.pm)]).then(function(){if(first&&!SBTOLD&&SBUF[T.main]&&Object.keys(SBUF[T.main]).length){SBTOLD=true;toast('صدای واقعی گیتار آماده‌ست');}
    setTimeout(function(){sbLoad('harm');sbLoad('clean');sbLoad('mute');},300);});}
function voice(midi,t,o){
  var T=TONEMAP[S.tone]||TONEMAP.drive,inst=o.harm?'harm':(o.pm?T.pm:T.main),smp=(S.tone!=='synth'&&inst)?sbGet(inst,midi):null;
  var src=ac.createBufferSource(),g=ac.createGain(),base=1;
  if(smp){src.buffer=smp.buf;base=smp.rate;var gn=o.gain*(SBG[inst]||0.8),node=src;
    if(o.pm&&T.pmf){var lp=ac.createBiquadFilter();lp.type='lowpass';lp.frequency.value=T.pmf;lp.Q.value=0.7;src.connect(lp);node=lp;}
    node.connect(g);g.connect(sbus);g.gain.setValueAtTime(gn,t);
    if(o.pm&&T.pmdec)g.gain.setTargetAtTime(0.0001,t+0.05,T.pmdec);}
  else{src.buffer=ks(midi,o.pm);g.gain.value=o.gain;src.connect(g);g.connect(input);}
  var pr=src.playbackRate;if(o.auto)o.auto(pr,t,base);else pr.setValueAtTime(base,t);
  if(o.vib){var l=ac.createOscillator(),lg=ac.createGain();l.frequency.value=5.5;lg.gain.value=0.02*base;l.connect(lg);lg.connect(pr);l.start(t+Math.min(0.12,o.dur*0.3));l.stop(t+o.dur+0.4);}
  if(o.stac){g.gain.setValueAtTime(g.gain.value||o.gain,t+o.dur*0.45);g.gain.linearRampToValueAtTime(0.0001,t+o.dur*0.45+0.03);}
  src.start(t);voices.push({src:src,g:g});}
function autoPitch(e,n,midi,nextN,pr,t0,d,br){
  var B=br||1,sv=function(v,t){pr.setValueAtTime(v*B,t);},lr=function(v,t){pr.linearRampToValueAtTime(v*B,t);};
  var sem=e.bend||2;sv(1,t0);
  if(e.sin==='b'||e.sin==='a'){sv(rate(e.sin==='b'?-4:4),t0);lr(1,t0+Math.min(0.09,d*0.4));}
  if(e.bt==='b'){sv(1,t0+0.02);lr(rate(sem),t0+Math.max(0.06,Math.min(0.3,d*0.45)));}
  else if(e.bt==='br'){sv(1,t0+0.02);lr(rate(sem),t0+Math.max(0.05,d*0.3));sv(rate(sem),t0+d*0.55);lr(1,t0+d*0.9);}
  else if(e.bt==='pb'){sv(rate(sem),t0);sv(rate(sem),t0+d*0.2);lr(1,t0+d*0.7);}
  else if((e.lg==='sl'||e.lg==='ss')&&nextN){sv(1,t0+d*0.6);lr(rate(midiAt(nextN.s,nextN.f)-midi),t0+d*0.97);}
  if(e.sout&&!e.bt){sv(1,t0+d*0.45);lr(rate(e.sout==='d'?-7:5),t0+d*0.95);}
}
function playEvent(e,t,dur,prev,next){
  if(e.rest){choke(t);return;}
  if(T(e,'tie'))return;
  var legato=prev&&!prev.rest&&(prev.lg==='h'||prev.lg==='sl');
  if(!T(prev,'ring'))choke(t);
  var hits=T(e,'trem')?Math.max(1,Math.round(dur/secsOf(12))):1,hd=dur/hits;
  for(var h=0;h<hits;h++){(function(th,first){
    if(!first)choke(th);
    e.notes.forEach(function(n,k){
      var tt=th+(hits===1&&e.notes.length>1?k*0.008:0),midi=midiAt(n.s,n.f);
      var g=0.8*(T(e,'acc')?1.35:1)*(T(e,'ghost')?0.4:1)*(legato&&first?0.6:1)*(T(e,'tap')?0.9:1)*(k?0.75:1);
      if(T(e,'dead')){deadHit(tt,g);return;}
      if(e.harm==='nh'){voice(harmPitch(n),tt,{pm:false,harm:true,gain:g*0.9,dur:hd,vib:T(e,'vib')});return;}
      if(e.harm==='ah'){voice(midi+19,tt,{pm:false,harm:true,gain:g*0.6,dur:hd,vib:T(e,'vib'),auto:function(pr,t0,b){autoPitch(e,n,midi,null,pr,t0,hd,b);}});voice(midi,tt,{pm:T(e,'pm'),gain:g*0.3,dur:hd});return;}
      var nextN=next&&!next.rest?(next.notes.filter(function(x){return x.s===n.s;})[0]||next.notes[0]):null;
      voice(midi,tt,{pm:T(e,'pm'),gain:g,dur:hd,vib:T(e,'vib'),stac:T(e,'stac'),auto:function(pr,t0,b){autoPitch(e,n,midi,nextN,pr,t0,hd,b);}});
    });
  })(t+h*hd,h===0);}
}
function auditionEv(e){var i=S.events.indexOf(e);whenReady(function(){var t=ac.currentTime+0.02;choke(t);
  playEvent(e,t,Math.max(0.3,Math.min(1.4,secsOf(ticks(e)))),null,i>=0?S.events[i+1]||null:null);});}
