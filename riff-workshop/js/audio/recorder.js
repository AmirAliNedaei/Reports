/* ضبط گیتار واقعی با میکروفون روی بکینگ (ریف و درام برنامه) */
/* ---------- recording over the backing ---------- */
// میکروفون و خروجی بکینگ در یک AudioWorklet با هم ضبط می‌شن، پس نسبت به هم هیچ لغزشی ندارن.
// تأخیر میکروفون/کارت صدا با اسلایدر «هم‌تراز کردن» جبران می‌شه (صدای گیتار به همون اندازه جلو کشیده می‌شه).
// مترونوم ضبط نمی‌شه (مستقیم به خروجی می‌ره، نه به master).
var REC={ready:false,busy:false,on:false,mute:false,node:null,src:null,mon:null,stream:null,buf:[[],[],[]],len:0,t0:0,takes:[],lat:null,bal:0.6,play:null,saved:null};
var RECMAX=300;
function recSupported(){return !!(window.isSecureContext&&navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&window.AudioWorkletNode);}
function recInit(){
  if(REC.ready)return Promise.resolve();
  if(!recSupported())return Promise.reject(new Error('unsupported'));
  return new Promise(function(res,rej){whenReady(function(){
    navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false,noiseSuppression:false,autoGainControl:false}}).then(function(stream){
      return ac.audioWorklet.addModule('js/audio/rec-worklet.js').then(function(){
        REC.stream=stream;REC.src=ac.createMediaStreamSource(stream);
        var mono=ac.createGain();mono.channelCount=1;mono.channelCountMode='explicit';mono.channelInterpretation='speakers';REC.src.connect(mono);
        var split=ac.createChannelSplitter(2),merge=ac.createChannelMerger(3);FX.master.connect(split);split.connect(merge,0,0);split.connect(merge,1,1);mono.connect(merge,0,2);
        var node=new AudioWorkletNode(ac,'riff-rec',{numberOfInputs:1,numberOfOutputs:1,channelCount:3,channelCountMode:'explicit',channelInterpretation:'discrete'});
        merge.connect(node);var sink=ac.createGain();sink.gain.value=0;node.connect(sink);sink.connect(ac.destination);
        REC.mon=ac.createGain();REC.mon.gain.value=0;mono.connect(REC.mon);REC.mon.connect(ac.destination);
        node.port.onmessage=recMsg;REC.node=node;REC.ready=true;
        if(REC.lat===null){REC.lat=Math.round(((ac.outputLatency||ac.baseLatency||0.01)+0.012)*1000);$('reclat').value=REC.lat;$('reclatv').textContent=fa(REC.lat);}
        res();});}).catch(rej);});});}
function recMsg(e){var d=e.data;
  if(d.lvl!==undefined){var m=$('reclvl');if(m){var db=d.lvl>0?20*Math.log10(d.lvl):-60;m.style.width=Math.max(0,Math.min(100,(db+60)/60*100))+'%';m.classList.toggle('hot',d.lvl>0.95);}return;}
  if(d.ch&&REC.on){for(var c=0;c<3;c++)REC.buf[c].push(d.ch[c]||new Float32Array(d.ch[2]?d.ch[2].length:128));REC.len+=(d.ch[2]||d.ch[0]).length;
    if(REC.len>ac.sampleRate*RECMAX)recStop();}}
function recStart(){
  if(REC.on||REC.busy)return;
  if(!S.events.length&&$('recbk').value==='riff'){toast('ریف خالیه؛ «فقط درام» رو انتخاب کن یا اول ریف بنویس');return;}
  REC.busy=true;
  recInit().then(function(){REC.busy=false;recPlayStop();if(playing)stop();
    var mode=$('recbk').value;REC.saved={countin:S.countin,metro:S.metro,drums:S.drums,loop:S.loop,events:null};
    REC.mute=mode!=='riff';S.countin=$('reccount').checked;S.loop=true;
    if(mode==='drums'&&(!S.drums||S.drums==='none'))S.drums='rock';
    if(mode==='metro'){S.metro=true;S.drums='none';}
    if(!S.events.length){REC.saved.events=S.events;S.events=[blankEv('w',false,false,null)];computeStarts();}
    REC.buf=[[],[],[]];REC.len=0;REC.on=true;REC.t0=Date.now();REC.node.port.postMessage('start');
    start(true);recUI();recTick();},
  function(err){REC.busy=false;
    toast(!recSupported()?'ضبط فقط وقتی کار می‌کنه که برنامه با https یا localhost باز شده باشه':'دسترسی به میکروفون داده نشد؛ از تنظیمات مرورگر اجازه بده');});}
function recStop(){if(!REC.on)return;REC.on=false;REC.node.port.postMessage('stop');stop();
  var sv=REC.saved;if(sv){S.countin=sv.countin;S.metro=sv.metro;S.drums=sv.drums;S.loop=sv.loop;if(sv.events){S.events=sv.events;computeStarts();}}REC.mute=false;REC.saved=null;
  var n=REC.len,out=[0,1,2].map(function(c){var a=new Float32Array(n),o=0;REC.buf[c].forEach(function(b){a.set(b.subarray(0,Math.min(b.length,n-o)),o);o+=b.length;});return a;});
  REC.buf=[[],[],[]];
  if(n<ac.sampleRate*0.5){toast('ضبط خیلی کوتاه بود');recUI();return;}
  var k=REC.takes.length+1;REC.takes.push({n:k,bl:out[0],br:out[1],mic:out[2],sr:ac.sampleRate,len:n});
  toast('برداشت '+fa(k)+' ضبط شد');recUI();recList();}
function recTick(){if(!REC.on)return;var s=Math.floor((Date.now()-REC.t0)/1000);$('rectime').textContent=fa(Math.floor(s/60))+':'+fa(('0'+s%60).slice(-2));setTimeout(recTick,250);}
function recUI(){var b=$('recgo');b.textContent=REC.on?'■ توقف ضبط':'● ضبط';b.classList.toggle('recon',REC.on);$('recbk').disabled=REC.on;if(!REC.on)$('rectime').textContent='';}
// میکس: بکینگ + گیتار (گیتار به اندازه‌ی تأخیر جلو کشیده می‌شه)
function recMix(tk){var sh=Math.round((REC.lat||0)*tk.sr/1000),n=tk.len,L=new Float32Array(n),R=new Float32Array(n),bk=Math.min(1,2*(1-REC.bal)),gg=Math.min(1,2*REC.bal)*1.4,pk=0;
  for(var i=0;i<n;i++){var g=i+sh<n?tk.mic[i+sh]*gg:0;L[i]=tk.bl[i]*bk+g;R[i]=tk.br[i]*bk+g;pk=Math.max(pk,Math.abs(L[i]),Math.abs(R[i]));}
  if(pk>0.98){var f=0.98/pk;for(i=0;i<n;i++){L[i]*=f;R[i]*=f;}}return [L,R];}
function recGuitar(tk){var sh=Math.round((REC.lat||0)*tk.sr/1000),n=tk.len,g=new Float32Array(n);for(var i=0;i+sh<n;i++)g[i]=tk.mic[i+sh];return [g];}
function recPlay(tk,btn){recPlayStop();whenReady(function(){var ch=recMix(tk),b=ac.createBuffer(2,tk.len,tk.sr);b.copyToChannel(ch[0],0);b.copyToChannel(ch[1],1);
  var s=ac.createBufferSource();s.buffer=b;s.connect(ac.destination);s.start();REC.play={s:s,btn:btn};btn.textContent='■';s.onended=function(){if(REC.play&&REC.play.s===s)recPlayStop();};});}
function recPlayStop(){if(REC.play){try{REC.play.s.stop();}catch(e){}REC.play.btn.textContent='▶';REC.play=null;}}
function recWav(chs,sr){var n=chs[0].length,nc=chs.length,buf=new ArrayBuffer(44+n*nc*2),v=new DataView(buf),o=0;
  function w(s){for(var i=0;i<s.length;i++)v.setUint8(o++,s.charCodeAt(i));}function u32(x){v.setUint32(o,x,true);o+=4;}function u16(x){v.setUint16(o,x,true);o+=2;}
  w('RIFF');u32(36+n*nc*2);w('WAVE');w('fmt ');u32(16);u16(1);u16(nc);u32(sr);u32(sr*nc*2);u16(nc*2);u16(16);w('data');u32(n*nc*2);
  for(var i=0;i<n;i++)for(var c=0;c<nc;c++){var x=Math.max(-1,Math.min(1,chs[c][i]));v.setInt16(o,x<0?x*32768:x*32767,true);o+=2;}
  return new Blob([buf],{type:'audio/wav'});}
function recSave(blob,name){var url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(url);},4000);}
function recName(tk,kind){return ((($('rname').value||'riff').trim()||'riff').replace(/[\/:*?"<>|]/g,'-'))+' - take '+tk.n+' - '+kind+'.wav';}
function recList(){var box=$('rectakes');box.innerHTML='';
  if(!REC.takes.length){box.appendChild(EL('p','hint','هنوز برداشتی ضبط نشده.'));return;}
  REC.takes.forEach(function(tk,i){var row=EL('div','rectake'),sec=Math.round(tk.len/tk.sr);
    row.appendChild(EL('b','','برداشت '+fa(tk.n)));row.appendChild(EL('span','hint ltr',fa(Math.floor(sec/60))+':'+fa(('0'+sec%60).slice(-2))));
    var p=EL('button','btn','▶');p.setAttribute('aria-label','پخش برداشت '+fa(tk.n));p.onclick=function(){if(REC.play&&REC.play.btn===p)recPlayStop();else recPlay(tk,p);};
    var g=EL('button','btn','⬇ فقط گیتار');g.onclick=function(){recSave(recWav(recGuitar(tk),tk.sr),recName(tk,'guitar'));};
    var m=EL('button','btn','⬇ میکس');m.onclick=function(){recSave(recWav(recMix(tk),tk.sr),recName(tk,'mix'));};
    var d=EL('button','btn','حذف');d.onclick=function(){recPlayStop();REC.takes.splice(i,1);recList();};
    [p,g,m,d].forEach(function(x){row.appendChild(x);});box.appendChild(row);});}
(function(){if(!$('recbox'))return;
  $('recgo').onclick=function(){if(REC.on)recStop();else recStart();};
  $('reclat').oninput=function(){REC.lat=+this.value;$('reclatv').textContent=fa(REC.lat);};
  $('recbal').oninput=function(){REC.bal=+this.value/100;};
  $('recmon').onchange=function(){var on=this.checked;recInit().then(function(){REC.mon.gain.value=on?1:0;},function(){$('recmon').checked=false;toast('دسترسی به میکروفون داده نشد');});};
  if(!recSupported())$('recnote').hidden=false;
  recList();})();
