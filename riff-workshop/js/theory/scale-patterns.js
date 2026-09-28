/* الگوهای گام روی دسته */
/* ---------- scale patterns ---------- */
var patHigh=true,activePat=null,patType='3',patStr=5,patOrd='1',patDir='ud';
function patScale(){var m=MODES[S.mode];if(patType==='p'){var ix=m.q==='min'?[0,2,3,4,6]:[0,1,2,4,5];return ix.map(function(i){return m.iv[i];});}return m.iv.slice();}
function patNotes(d,high){
  var iv=patScale(),L=iv.length,k=patType==='4'?4:patType==='p'?2:3,ss=patStr,cnt=k*(ss+1);
  var rf=((S.key-OPEN[ss]%12)%12+12)%12,sf=(rf+iv[d])%12+(high?12:0),out=[];
  for(var n=0;n<cnt;n++){var idx=d+n,midi=OPEN[ss]+sf+(iv[idx%L]-iv[d])+12*Math.floor(idx/L),s1=ss-Math.floor(n/k),f=midi-OPEN[s1];
    if(f<0||f>NF)return null;out.push({s:s1,f:f,m:midi,iv:iv[idx%L]});}
  return out;}
function nameOfIv(v){var m=MODES[S.mode],k=m.iv.indexOf(v);return k>=0?spell(m.iv)[k]:PCN[(S.key+v)%12];}
function degOfIv(v){var m=MODES[S.mode],k=m.iv.indexOf(v);return k>=0?dlab(m.iv)[k]:'';}
function asHome(d){var iv=patScale(),rot=iv.map(function(x){return (x-iv[d]+12)%12;}).sort(function(a,b){return a-b;}).join();
  var hit=RZT.filter(function(T2){return T2.iv.slice().sort(function(a,b){return a-b;}).join()===rot;})[0];return hit?nameOfIv(iv[d])+' '+hit.n:null;}
function patSeq(notes){var g=+patOrd;function grp(a){if(g<=1)return a;var r=[];for(var i=0;i+g<=a.length;i++)for(var j=0;j<g;j++)r.push(a[i+j]);return r;}
  var up=notes.slice(),dn=notes.slice().reverse();
  if(patDir==='u')return grp(up);if(patDir==='d')return grp(dn);return grp(up).concat(grp(dn.slice(1)));}
function patName(){if(patType!=='p')return MN();var m=MODES[S.mode];
  return RN()+' '+(S.mode==='aeo'||S.mode==='dor'||S.mode==='phr'?'Minor pentatonic':S.mode==='ion'||S.mode==='mix'||S.mode==='lyd'?'Major pentatonic':'pentatonic ('+SHORT[S.mode]+')');}
function patEv(){return {d:'16',dot:false,tri:patOrd==='3'};}
function renderPatterns(){
  if(activePat&&(activePat.mode!==S.mode||activePat.key!==S.key))activePat=null;
  $('patmode').textContent=patName();$('patclear').hidden=!activePat;
  var box=$('pats');box.innerHTML='';var iv=patScale(),k=patType==='4'?4:patType==='p'?2:3,sig=patType+'|'+patStr+'|'+patHigh;
  for(var d=0;d<iv.length;d++){(function(d){
    var notes=patNotes(d,patHigh),alt=false;if(!notes){notes=patNotes(d,!patHigh);alt=!!notes;}
    var sgd=sig+(alt?'a':'');
    var c=document.createElement('div');c.className='pcard'+(activePat&&activePat.sig===sgd&&activePat.deg===d?' act':'');
    var h=document.createElement('div');h.className='feel';
    h.innerHTML='الگوی '+fa(d+1)+': از <span class="ltr">'+nameOfIv(iv[d])+' ('+degOfIv(iv[d])+')</span>'+(notes?' روی فرت '+fa(notes[0].f)+'، سیم '+fa(patStr+1)+(alt?' <span class="pmeta">('+(patHigh?'پایین':'بالای')+' دسته؛ در ناحیه‌ی انتخابی جا نمی‌شد)</span>':''):'');
    c.appendChild(h);
    var hm=asHome(d);
    if(hm&&d>0){var md=document.createElement('div');md.className='pmeta';md.innerHTML='اسمش همچنان <b class="ltr">'+patName()+'</b> است. فقط اگه <span class="ltr">'+nameOfIv(iv[d])+'</span> خونه بشه، همین شکل می‌شه <b class="ltr">'+hm+'</b>.';c.appendChild(md);}
    if(!notes){var no=document.createElement('div');no.className='tip';no.textContent='این الگو در این ناحیه از فرت ۲۴ یا صفر بیرون می‌زنه؛ ناحیه‌ی دیگه یا سیم شروع دیگه‌ای رو امتحان کن.';c.appendChild(no);box.appendChild(c);return;}
    var g=document.createElement('div');g.className='pgrid';g.style.gridTemplateColumns='30px repeat('+k+',minmax(0,1fr))';
    for(var s1=0;s1<=patStr;s1++){var sl=document.createElement('span');sl.className='sl';sl.textContent=SNAME[s1];g.appendChild(sl);
      notes.filter(function(x){return x.s===s1;}).forEach(function(x){var e=document.createElement('span');e.className='fn'+(x.iv===0?' home':'');e.textContent=x.f;e.title=S.deg?degOfIv(x.iv):nameOfIv(x.iv);g.appendChild(e);});}
    c.appendChild(g);
    var fr=notes.map(function(x){return x.f;}),lo=Math.min.apply(null,fr),hi=Math.max.apply(null,fr);
    var tip=document.createElement('div');tip.className='tip';
    tip.textContent='محدوده: فرت '+fa(lo)+' تا '+fa(hi)+' ('+fa(hi-lo+1)+' فرت)، '+fa(notes.length)+' نت. '+(k%2?'پیک آلترنیت: جهت شروع هر سیم برعکس سیم قبلیه؛ یا اکونومی: موقع رفتن به سیم بعد، همون جهت ادامه بده.':'پیک آلترنیت: هر سیم با ضربه‌ی پایین شروع می‌شه.')+(k===4?' این الگو مورب است و دستت در طول دسته جابه‌جا می‌شه؛ برای ۴ نت، لگاتو (هامر و پول) هم خیلی رایجه.':'');
    c.appendChild(tip);
    var r=document.createElement('div');r.className='row';
    var b0=document.createElement('button');b0.className='btn';b0.textContent='نمایش روی دسته';
    b0.onclick=function(){activePat={mode:S.mode,key:S.key,deg:d,sig:sgd,notes:notes};renderPatterns();refreshNeck();reveal($('neck'));};
    var b1=document.createElement('button');b1.className='btn';b1.textContent='شنیدن';b1.onclick=function(){listenRun(notes);};
    var b2=document.createElement('button');b2.className='btn';b2.textContent='ساختن ریف';b2.onclick=function(){loadRun(notes);};
    r.appendChild(b0);r.appendChild(b1);r.appendChild(b2);c.appendChild(r);c.appendChild(ideaRow(patternIdeas(notes),'الگوی '+fa(d+1)));box.appendChild(c);
  })(d);}
}
function listenRun(notes){
  if(playing)stop();
  whenReady(function(){var sd=secsOf(ticks(patEv())),t=ac.currentTime+0.05,t0=t;
    patSeq(notes).forEach(function(x){choke(t);playMidis([x.m],t,false);
      (function(x,delay){setTimeout(function(){var c=cellEl(x.s,x.f);if(!c)return;var dd=c.querySelector('.dot');dd.classList.add('flash');setTimeout(function(){dd.classList.remove('flash');},Math.max(60,sd*900));},delay);})(x,(t-t0)*1000+50);
      t+=sd;});
    setTimeout(function(){if(!playing)choke(ac.currentTime);},(t-ac.currentTime+0.3)*1000);
  });
}
function loadRun(notes){
  if(playing)stop();
  var e0=patEv();
  S.events=patSeq(notes).map(function(x){return blankEv(e0.d,false,e0.tri,[{s:x.s,f:x.f}]);});
  S.events.push(blankEv('q',false,false,null));S.cur=0;curId=null;$('rname').value='';
  syncControls();changed();renderLib();
  toast('ران در ریف نوشته شد ('+fa(S.events.length-1)+' نت)');
  reveal($('tab'));
}
$('patreg').onchange=function(){patHigh=this.value==='1';renderPatterns();};
$('pattype').onchange=function(){patType=this.value;renderPatterns();};
$('patstr').onchange=function(){patStr=+this.value;renderPatterns();};
$('patord').onchange=function(){patOrd=this.value;};
$('patdir').onchange=function(){patDir=this.value;};
$('patclear').onclick=function(){activePat=null;renderPatterns();refreshNeck();};
