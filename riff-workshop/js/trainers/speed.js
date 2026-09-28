/* ترینر سرعت */
/* ---------- speed trainer ---------- */
function runNotes(ss,k,deg,high,iv){
  var L=iv.length,cnt=k*(ss+1),rf=((S.key-OPEN[ss]%12)%12+12)%12,sf=(rf+iv[deg])%12+(high?12:0),out=[];
  for(var n=0;n<cnt;n++){var idx=deg+n,midi=OPEN[ss]+sf+(iv[idx%L]-iv[deg])+12*Math.floor(idx/L),s1=ss-Math.floor(n/k),f=midi-OPEN[s1];if(f<0||f>NF)return null;out.push({s:s1,f:f,m:midi});}return out;}
function goodRun(ss,k,deg){var iv=MODES[S.mode].iv;return runNotes(ss,k,deg,false,iv)||runNotes(ss,k,deg,true,iv);}
function evs(notes,d,tri,extra){return notes.map(function(n,i){var e=blankEv(d,false,!!tri,[{s:n.s,f:n.f}]);if(extra)extra(e,i,notes);return e;});}
function upDown(a){return a.concat(a.slice(0,-1).reverse().slice(0,a.length-1));}
function groups(a,g){var r=[];for(var i=0;i+g<=a.length;i++)for(var j=0;j<g;j++)r.push(a[i+j]);return r;}
function legatoMark(e,i,a){var n=a[i],nx=a[i+1];if(nx&&nx.s===n.s)e.lg='h';}
function fitBar(evl){var t=0;evl.forEach(function(e){t+=ticks(e);});var rem=(384-t%384)%384;decomp(rem).forEach(function(p){evl.push(blankEv(p.d,p.dot,false,null));});return evl;}
function nearestFret(s,pcs,center){var best=null,bd=99;for(var f=0;f<=NF;f++){if(pcs.indexOf((OPEN[s]+f)%12)<0)continue;var dd=Math.abs(f-center);if(dd<bd){bd=dd;best=f;}}return best;}
function chordPcs(j,sev){var iv=MODES[S.mode].iv;var ks=[0,2,4];if(sev)ks.push(6);return ks.map(function(k){return (S.key+iv[(j+k)%7])%12;});}
var SPT=[
 {k:'alt',n:'آلترنیت پیکینگ'},{k:'leg',n:'لگاتو'},{k:'trem',n:'ترمولو'},{k:'gal',n:'گالاپ و چاگ'},{k:'skip',n:'پرش سیم'},{k:'sweep',n:'سوییپ'},{k:'eco',n:'اکونومی'}];
function spExercises(tech){
  var iv=MODES[S.mode].iv,rf=((S.key-1)%12+12)%12,out=[],A=goodRun(5,3,0);
  function add(id,n,desc,ev){if(ev&&ev.length)out.push({id:tech+'-'+id,n:n,desc:desc,ev:fitBar(ev)});}
  if(tech==='alt'||tech==='leg'||tech==='eco'){
    var mark=tech==='leg'?legatoMark:null;
    if(A)add('run',tech==='leg'?'اسکیل ۳ نتی با هامر و پول':'اسکیل ۳ نتی، بالا و پایین','الگوی ۱، از سیم ۶ تا ۱ و برگشت، با دولاچنگ.'+(tech==='eco'?' اکونومی: موقع رفتن به سیم بعد، جهت پیک رو عوض نکن.':tech==='leg'?' فقط اولین نت هر سیم پیک می‌خوره.':' هر نت یک ضربه‌ی پیک، پایین و بالا یک در میان.'),evs(upDown(A),'16',false,mark));
    if(A)add('g4','گروه‌های ۴تایی','سکوئنس ۱-۲-۳-۴، ۲-۳-۴-۵ و... روی الگوی ۱.',evs(groups(A.slice(0,12),4),'16',false,mark));
    if(A)add('g3','گروه‌های ۳تایی (تریوله)','سکوئنس سه‌تایی با تریوله‌ی دولاچنگ؛ لهجه روی اول هر گروه.',evs(groups(A.slice(0,12),3),'16',true,function(e,i){if(i%3===0)e.t.acc=true;if(mark)mark(e,i,groups(A.slice(0,12),3));}));
    if(A){var two=A.slice(0,6);add('two','تکرار روی دو سیم','شش نت روی دو سیم بم، بالا و پایین؛ برای هماهنگی دو دست عالیه.',evs(two.concat(two.slice().reverse()),'16',false,mark));}
    var one=[];for(var i=0;i<8;i++){var f=rf+(i<7?iv[i]:12);if(f<=NF)one.push({s:0,f:f});}
    if(one.length===8)add('one','نردبان تک‌سیم','اسکیل روی یک سیم (سیم ۱)؛ برای جابه‌جایی دست در طول دسته.',evs(upDown(one),'8',false,mark));
  }
  if(tech==='trem'){
    var hi=[];for(var i2=0;i2<8;i2++){var f2=rf+(i2<7?iv[i2]:12);if(f2<=NF)hi.push({s:0,f:f2});}
    add('mel','ملودی ترمولو','هر نت اسکیل یک ضرب کامل با ترمولو پیکینگ؛ دست راست شل و یکنواخت.',evs(upDown(hi),'q',false,function(e){e.t.trem=true;}));
    var dy=[];[4,3,2,1,0,1,2,3].forEach(function(dg){var tf=(rf+iv[dg])%12;if(tf<5)tf+=12;var topM=OPEN[0]+tf,intv=(iv[dg]-iv[(dg+5)%7]+12)%12,lf=topM-intv-OPEN[1];
      if(lf>=0&&lf<=NF)dy.push([{s:0,f:tf},{s:1,f:lf}]);});
    add('dyad','ترمولو دوصدایی','دیادهای سومی روی دو سیم بالا؛ صدای کلاسیک بلک و ملودیک دث.',dy.map(function(n){var e=blankEv('h',false,false,n);e.t.trem=true;return e;}));
  }
  if(tech==='gal'){
    var ped=function(f){return {s:5,f:f};},g=[],rg=[],ch=[];
    [2,3,4,5].forEach(function(dg){var f=rf+iv[dg];g.push(blankEv('16',false,false,[ped(rf)]),blankEv('16',false,false,[ped(rf)]),blankEv('8',false,false,[ped(f)]));});
    g.forEach(function(e,i){if(i%3<2)e.t.pm=true;});
    add('gal','گالاپ روی پدال','دولاچنگ، دولاچنگ، چنگ؛ دو نت اول پالم‌میوت روی سیم باز یا ریشه.',g);
    [2,3,4,5].forEach(function(dg){var f=rf+iv[dg];rg.push(blankEv('8',false,false,[ped(f)]),blankEv('16',false,false,[ped(rf)]),blankEv('16',false,false,[ped(rf)]));});
    rg.forEach(function(e,i){if(i%3)e.t.pm=true;});
    add('rgal','گالاپ معکوس','چنگ، دولاچنگ، دولاچنگ؛ حس کوبنده‌ی متال کلاسیک.',rg);
    [0,1,2,0,1,2,0,1].forEach(function(x,i){var e=blankEv('16',false,false,[ped(rf)]);e.t.pm=x!==0;if(x===0)e.t.acc=true;ch.push(e);});
    [0,1,2,0,1,2,0,1].forEach(function(x){var e=blankEv('16',false,false,[ped(rf)]);e.t.pm=x!==0;if(x===0)e.t.acc=true;ch.push(e);});
    add('332','چاگ ۳+۳+۲','گروه‌بندی ۳+۳+۲ دولاچنگ با لهجه؛ پایه‌ی خیلی از ریف‌های مدرن.',ch);
  }
  if(tech==='skip'||tech==='sweep'){
    [[0,'i'],[5,'VI']].forEach(function(cj){var pcs=chordPcs(cj[0]),root=pcs[0],c5=nearestFret(4,[root],7);
      if(tech==='skip'){var n=[{s:4,f:c5},{s:2,f:nearestFret(2,pcs,c5)},{s:0,f:nearestFret(0,pcs,c5)},{s:2,f:nearestFret(2,pcs,c5)}];
        var ev=[];for(var r=0;r<4;r++)n.forEach(function(x){ev.push(blankEv('16',false,false,[x]));});add('sk'+cj[0],'پرش سیم روی آکورد '+cj[1],'ریشه روی سیم ۵، بعد سیم ۳ و ۱؛ سیم‌های وسط رو خفه نگه دار.',ev);}
      else{var up=[4,3,2,1,0].map(function(s){return {s:s,f:nearestFret(s,pcs,c5+(s<2?1:0))};});
        var sw=up.concat(up.slice(0,-1).reverse());var ev2=evs(sw,'16',true);ev2.forEach(function(e,i){if(i===0)e.t.acc=true;});
        add('sw'+cj[0],'سوییپ ۵ سیمه روی آکورد '+cj[1],'یک حرکت پیوسته‌ی پیک به پایین، بعد به بالا؛ هر نت فقط وقتی صدا بده که نوبتشه.',ev2);
        var s3=[2,1,0].map(function(s){return {s:s,f:nearestFret(s,pcs,c5+5)};});var ev3=[];for(var r2=0;r2<4;r2++)s3.concat([s3[1]]).forEach(function(x){ev3.push(blankEv('16',false,true,[x]));});
        add('s3'+cj[0],'سوییپ ۳ سیمه روی آکورد '+cj[1],'الگوی کوتاه سه‌سیمی با تریوله؛ نقطه‌ی شروع خوب برای سوییپ.',ev3);}
    });
  }
  return out;
}
var SP={tech:'alt',ex:null,bpm:60,cur:0,reps:0};
function spRender(){
  var tb=$('sptech');if(!tb)return;tb.innerHTML='';
  SPT.forEach(function(t){var b=EL('button','chip',t.n);b.setAttribute('aria-pressed',t.k===SP.tech);b.onclick=function(){lpStop();SP.tech=t.k;SP.ex=null;spRender();};tb.appendChild(b);});
  var list=spExercises(SP.tech),eb=$('spex');eb.innerHTML='';
  if(!SP.ex||!list.some(function(x){return x.id===SP.ex.id;}))SP.ex=list[0]||null;else SP.ex=list.filter(function(x){return x.id===SP.ex.id;})[0];
  list.forEach(function(x){var b=EL('button','tb',x.n);b.setAttribute('aria-pressed',SP.ex&&x.id===SP.ex.id);b.onclick=function(){lpStop();SP.ex=x;spLoadBpm();spRender();};eb.appendChild(b);});
  if(!SP.ex){$('spname').textContent='برای این مُد تمرینی ساخته نشد.';return;}
  $('spname').innerHTML=SP.ex.n+' <span class="hint ltr">('+MN()+')</span>';$('spdesc').textContent=SP.ex.desc;
  miniTab($('sptab'),SP.ex.ev,-1);spUI();
}
function spKey(){return SP.ex?S.mode+'|'+SP.ex.id:'';}
function spLoadBpm(){var st=+$('spstart').value||60;SP.bpm=st;SP.reps=0;}
function spUI(){
  $('spbpm').textContent=fa(SP.bpm);var st=+$('spstart').value,tg=+$('sptarget').value;
  $('spbar').style.width=Math.max(0,Math.min(100,(SP.bpm-st)/Math.max(1,tg-st)*100))+'%';
  var b=P.best[spKey()];$('spbest').textContent=b?'بهترین رکورد این تمرین: '+fa(b)+' BPM':'هنوز رکوردی ثبت نشده';
  $('spinfo').textContent=LP.on&&LP.o.tag==='sp'?'تکرار '+fa(SP.reps+1)+(SP.auto?'، '+fa(+$('spreps').value-(SP.reps%+$('spreps').value))+' تکرار تا افزایش بعدی':''):'از '+fa(st)+' تا '+fa(tg)+' BPM';
}
function spBump(d,rec){SP.bpm=Math.max(30,Math.min(320,SP.bpm+d));if(rec){var k=spKey();if(!P.best[k]||SP.bpm>P.best[k]){P.best[k]=SP.bpm;saveP();}}spUI();
  if(d>0&&SP.bpm>=+$('sptarget').value)toast('به هدف رسیدی! 🎉');}
