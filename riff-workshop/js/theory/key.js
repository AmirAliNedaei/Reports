/* انتخاب کلید و مد */
/* ---------- key ---------- */
var KEYLAB=['C','C# / Db','D','D# / Eb','E','F','F# / Gb','G','G# / Ab','A','A# / Bb','B'];
function renderKeys(){var box=$('keys');if(!box)return;box.innerHTML='';
  KEYLAB.forEach(function(l,k){var b=document.createElement('button');b.className='chip';b.setAttribute('aria-pressed',k===S.key);b.innerHTML='<span class="ltr">'+l+'</span>';
    b.onclick=function(){setKey(k,false);};box.appendChild(b);});}
function lensIv(){var s=S.lens&&SCALES[S.lens.i];return s?s[2]:null;}
var PREFKEY='riff-workshop-prefs';
var PREF={onchg:'clear'};
try{var _p=JSON.parse(localStorage.getItem(PREFKEY)||'{}');if(_p&&['clear','move','keep'].indexOf(_p.onchg)>=0)PREF.onchg=_p.onchg;}catch(e){}
function savePref(){try{localStorage.setItem(PREFKEY,JSON.stringify(PREF));}catch(e){}}
function hasRiff(){return S.events.some(function(e){return !e.rest&&e.notes.length;});}
var lastSnap=null;
function takeSnap(){lastSnap=JSON.stringify({events:S.events,cur:S.cur,key:S.key,mode:S.mode,bpm:S.bpm,tone:S.tone,nd:S.nd,rzSeq:rzSeq,rzn:$('rznotes').value,rzt:$('rztab').value,curId:curId,rname:$('rname').value});}
function undoSnap(){if(!lastSnap)return;var d=JSON.parse(lastSnap);lastSnap=null;if(playing)stop();
  S.events=d.events.map(fixEv);S.cur=d.cur;S.key=d.key;S.mode=d.mode;S.bpm=d.bpm;S.tone=d.tone;S.nd=d.nd;setTone();
  rzSeq=d.rzSeq||[];$('rznotes').value=d.rzn||'';$('rztab').value=d.rzt||'';curId=d.curId;$('rname').value=d.rname||'';
  syncControls();renderKeys();renderModes();changed();renderSeq();runRecognizer();renderLib();toast('برگردونده شد');}
function toastUndo(msg){var t=$('toast');t.textContent='';var sp=document.createElement('span');sp.textContent=msg;t.appendChild(sp);
  var b=document.createElement('button');b.textContent='برگردون';b.onclick=function(){t.classList.remove('show','act');undoSnap();};t.appendChild(b);
  t.classList.add('show','act');clearTimeout(tt);tt=setTimeout(function(){t.classList.remove('show','act');},6000);}
function freshView(){
  if(playing)stop();
  activePat=null;S.cur=0;
  document.querySelectorAll('.dot.flash').forEach(function(e){e.classList.remove('flash');});
  renderKeys();renderModes();changed();
}
function applyChange(kind,delta){
  // kind: 'key' or 'mode'. returns message part
  if(!hasRiff())return '';
  if(PREF.onchg==='clear'){takeSnap();S.events=[];curId=null;$('rname').value='';renderLib();return 'clear';}
  if(PREF.onchg==='move'&&kind==='key'){
    var d=delta,alt=d>0?d-12:d+12;
    var ok=function(dd){return S.events.every(function(e){return e.notes.every(function(n){var f=n.f+dd;return f>=0&&f<=NF;});});};
    var use=ok(d)?d:ok(alt)?alt:null;
    if(use===null)return 'nomove';
    S.events.forEach(function(e){e.notes.forEach(function(n){n.f+=use;});});return 'moved';
  }
  return '';
}
function setKey(k,silent){
  if(k===S.key)return;
  var d=((k-S.key)%12+12)%12;if(d>6)d-=12;
  var r=silent?'':applyChange('key',d);
  S.key=k;freshView();
  if(silent)return;
  if(r==='clear')toastUndo('کلید: '+RN()+'؛ صفحه تازه شد');
  else toast('کلید: '+RN()+(r==='moved'?'؛ ریف هم منتقل شد':r==='nomove'?'؛ ریف از دسته بیرون می‌زد و منتقل نشد':''));
}
function setMode(k){
  if(k===S.mode)return;
  var r=applyChange('mode',0);
  S.mode=k;S.lens=null;freshView();
  if(r==='clear')toastUndo(MN()+'؛ صفحه تازه شد');
}
function doClean(o){
  takeSnap();if(playing)stop();
  if(o.riff){S.events=[];S.cur=0;curId=null;$('rname').value='';}
  if(o.view){activePat=null;S.cur=0;S.chord=false;}
  if(o.rz){rzSeq=[];rzCand=null;$('rznotes').value='';$('rztab').value='';$('rzout').innerHTML='';renderSeq();refreshMini();}
  if(o.set){S.key=1;S.mode='aeo';S.lens=null;S.bpm=140;S.tone='drive';setTone();S.nd={d:'8',dot:false,tri:false};S.chord=false;S.loop=true;$('loop').setAttribute('aria-pressed','true');
    ['snap','deg','listen'].forEach(function(id){$(id).checked=false;});S.snap=S.deg=S.listen=false;
    patHigh=true;$('patreg').value='1';$('rzhome').value='-1';syncControls();}
  renderLib();freshView();
  toastUndo('پاک شد');
}
