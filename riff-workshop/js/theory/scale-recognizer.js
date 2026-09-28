/* تشخیص گام از روی نت‌ها */
/* ---------- scale recognizer ---------- */
var RZT=[
 {k:'aeo',n:'Aeolian (natural minor)',iv:[0,2,3,5,7,8,10]},
 {k:'hm',n:'Harmonic minor',iv:[0,2,3,5,7,8,11]},
 {k:'dor',n:'Dorian',iv:[0,2,3,5,7,9,10]},
 {k:'phr',n:'Phrygian',iv:[0,1,3,5,7,8,10]},
 {k:'pdom',n:'Phrygian dominant',iv:[0,1,4,5,7,8,10]},
 {k:'ion',n:'Ionian (major)',iv:[0,2,4,5,7,9,11]},
 {k:'lyd',n:'Lydian',iv:[0,2,4,6,7,9,11]},
 {k:'mix',n:'Mixolydian',iv:[0,2,4,5,7,9,10]},
 {k:'loc',n:'Locrian',iv:[0,1,3,5,6,8,10]},
 {k:'mm',n:'Melodic minor',iv:[0,2,3,5,7,9,11]},
 {k:'hun',n:'Hungarian minor',iv:[0,2,3,6,7,8,11]},
 {k:'mpent',n:'Minor pentatonic',iv:[0,3,5,7,10]},
 {k:'Mpent',n:'Major pentatonic',iv:[0,2,4,7,9]},
 {k:'blues',n:'Blues',iv:[0,3,5,6,7,10]}];
var rzMode='neck',rzSeq=[],rzCand=null;
function spellAny(r,ivs){
  if(ivs.length!==7)return {root:PCN[r],notes:ivs.map(function(i){return PCN[(r+i)%12];})};
  var best=null;[PCN[r],FLATN[r]].forEach(function(rn){
    var li=LET.indexOf(rn[0]),pen=0,out=ivs.map(function(i,k){var L=LET[(li+k)%7],t=(r+i)%12,d=(t-NAT[(li+k)%7]+12)%12;if(d>6)d-=12;pen+=Math.abs(d)+(Math.abs(d)>1?5:0);return L+(d>0?'#'.repeat(d):'b'.repeat(-d));});
    if(!best||pen<best.pen)best={root:rn,notes:out,pen:pen};});
  return best;}
function parseNotes(txt){
  var re=/([A-Ga-g])\s?(##|bb|#|b|♯|♭)?/g,m,out=[];
  txt=txt.replace(/sharp/gi,'#');
  while((m=re.exec(txt))){var L=m[1].toUpperCase(),a=m[2]||'',d=a==='#'||a==='♯'?1:a==='##'?2:a==='b'||a==='♭'?-1:a==='bb'?-2:0;
    out.push({pc:(NAT[LET.indexOf(L)]+d+12)%12,w:1,midi:null});}
  return out;}
function parseTab(txt,order){
  txt=txt.replace(/[۰-۹]/g,function(c){return '۰۱۲۳۴۵۶۷۸۹'.indexOf(c);}).replace(/[٠-٩]/g,function(c){return '٠١٢٣٤٥٦٧٨٩'.indexOf(c);});
  var lines=txt.split(/\n/).map(function(l){return l.trim();}).filter(function(l){return l.length;});
  var out=[],err=null;
  lines.forEach(function(l,k){
    var sn=null,mm=l.match(/^(?:s|string|سیم)?\s*([1-9])\s*[:|)]/i);
    if(mm){sn=+mm[1];l=l.slice(mm[0].length);}
    else sn=order==='low'?NS-k:1+k;
    if(sn<1||sn>NS){err='بیشتر از تعداد سیم‌ها خط نوشتی';return;}
    var frets=(l.match(/\d+/g)||[]).map(Number);
    frets.forEach(function(f){if(f>NF){err='فرت '+f+' بیشتر از ۲۴ است';return;}var midi=OPEN[sn-1]+f;out.push({pc:midi%12,w:1,midi:midi,s:sn,f:f});});
  });
  return {notes:out,err:err};}
function riffNotes(){
  var out=[],tick=0;
  S.events.forEach(function(e){var tk=ticks(e),st=tick;tick+=tk;if(e.rest||T(e,'dead')||T(e,'tie'))return;
    var w=tk/24*(st%96===0?1.6:1);
    e.notes.forEach(function(n,j){var m=e.harm==='nh'?harmPitch(n):midiAt(n.s,n.f);out.push({pc:m%12,w:w*(j?0.5:1),midi:m});});});
  return out;}
function recognize(notes,home){
  var w=[0,0,0,0,0,0,0,0,0,0,0,0],W=0;notes.forEach(function(n){w[n.pc]+=n.w;W+=n.w;});
  var used=[];for(var p=0;p<12;p++)if(w[p]>0)used.push(p);
  var first=notes[0].pc,last=notes[notes.length-1].pc,low=null;
  notes.forEach(function(n){if(n.midi!==null&&(low===null||n.midi<low.midi))low=n;});
  var C=[];
  for(var r=0;r<12;r++)RZT.forEach(function(T){
    var set={};T.iv.forEach(function(i){set[(r+i)%12]=1;});
    var inW=0,outs=[];used.forEach(function(pc){if(set[pc])inW+=w[pc];else outs.push(pc);});
    var fit=inW/W,cov=used.filter(function(pc){return set[pc];}).length/T.iv.length;
    var sc=4*fit-0.9*outs.length+1.2*cov+2.5*(w[r]/W)+(first===r?0.7:0)+(last===r?1:0)+(low&&low.pc===r?0.8:0)+(T.iv.indexOf(7)>=0&&w[(r+7)%12]>0?0.3:0);
    if(T.iv.length<7&&cov<1)sc-=0.4;
    sc+=({aeo:0.2,ion:0.15,hm:0.08,mpent:0.05,dor:0.03,phr:0.03,loc:-0.15,hun:-0.15,mm:-0.1,pdom:-0.05})[T.k]||0;
    if(home>=0)sc+=home===r?3:-2.5;
    C.push({r:r,T:T,sc:sc,outs:outs,set:set,fit:fit});
  });
  C.sort(function(a,b){return b.sc-a.sc;});
  var mx=C[0].sc,sum=0;C.forEach(function(c){c.e=Math.exp((c.sc-mx)/0.45);sum+=c.e;});C.forEach(function(c){c.p=c.e/sum;});
  return {C:C,used:used,w:w,W:W,first:first,last:last,low:low};}
function candName(c){var sp=spellAny(c.r,c.T.iv);return sp.root+' '+c.T.n;}
function pcNameIn(c,pc){var sp=spellAny(c.r,c.T.iv),k=c.T.iv.indexOf((pc-c.r+12)%12);return k>=0?sp.notes[k]:PCN[pc];}
function runRecognizer(){
  var out=$('rzout'),notes,err=null;
  if(rzMode==='notes')notes=parseNotes($('rznotes').value);
  else if(rzMode==='tab'){var t=parseTab($('rztab').value,$('rzorder').value);notes=t.notes;err=t.err;}
  else if(rzMode==='neck')notes=rzSeq.map(function(x){var m=midiAt(x.s,x.f);return {pc:m%12,w:1,midi:m};});
  else notes=riffNotes();
  if(err){out.innerHTML='<p class="hint" style="color:var(--rust)">'+err+'</p>';return;}
  if(!notes.length){rzCand=null;if(rzMode==='neck'){refreshMini();out.innerHTML='<p class="hint">هنوز نتی انتخاب نکردی. روی دسته‌ی بالا کلیک کن.</p>';return;}out.innerHTML='<p class="hint" style="color:var(--rust)">'+(rzMode==='riff'?'ریف فعلی خالیه.':'هیچ نتی پیدا نکردم. نت‌ها رو مثل C# D# E یا فرت‌ها رو با فاصله بنویس.')+'</p>';return;}
  var home=+$('rzhome').value,R=recognize(notes,home),top=R.C[0];
  var h='';
  var read=notes.slice(0,40).map(function(n){return PCN[n.pc];}).join(' ');
  h+='<p class="hint" style="margin:0 0 8px">نت‌هایی که خوندم: <span class="ltr">'+read+(notes.length>40?' …':'')+'</span></p>';
  if(R.used.length<4)h+='<p class="hint" style="color:var(--rust);margin:0 0 8px">فقط '+fa(R.used.length)+' نت متفاوت داری؛ با این تعداد، اسکیل‌های زیادی جورن و جواب قطعی نیست.</p>';
  var sp=spellAny(top.r,top.T.iv);
  h+='<div class="rztop"><div class="row" style="justify-content:space-between"><span class="nm ltr">'+sp.root+' '+top.T.n+'</span><b>'+fa(Math.round(top.p*100))+'٪ اطمینان</b></div>';
  h+='<div class="rznotes">'+top.T.iv.map(function(i,k){var pc=(top.r+i)%12;return '<span class="'+(k===0?'r':R.w[pc]>0?'u':'')+'">'+sp.notes[k]+'</span>';}).join('')+
     top.outs.map(function(pc){return '<span class="x">'+PCN[pc]+'</span>';}).join('')+'</div>';
  h+='<p class="hint" style="margin:0">نارنجی: نت خونه. سبز: نت‌هایی که زدی. خاکستری: نت‌های اسکیل که توی تیکه‌ت نبودن.'+(top.outs.length?' قرمز: نت‌های بیرون از این اسکیل (کروماتیک یا گذر).':'')+'</p>';
  if(MODES[top.T.k])h+='<div class="row" style="margin-top:10px"><button class="btn" id="rzopen">نمایش این مُد روی دسته</button></div>';
  h+='</div>';
  h+='<div class="rzbox"><b>گزینه‌های بعدی</b>';
  R.C.slice(1,6).forEach(function(c){h+='<div class="rzrow"><span class="ltr">'+candName(c)+'</span><div class="bar"><i style="width:'+Math.max(2,Math.round(c.p*100))+'%;background:var(--frost)"></i></div><span>'+fa(Math.round(c.p*100))+'٪</span></div>';});
  h+='</div>';
  var tips=[],second=R.C[1];
  var same=R.C.slice(1,8).filter(function(c){return c.T.iv.length===top.T.iv.length&&Object.keys(c.set).join()===Object.keys(top.set).join();});
  if(same.length&&home<0)tips.push('نت‌های تو دقیقاً همون نت‌های <span class="ltr">'+same.slice(0,3).map(candName).join('، ')+'</span> هم هستن. فرقشون فقط نت خونه‌ست؛ نت بیس یا پدال زیرش رو از منوی بالا انتخاب کن.');
  R.C.slice(1,6).forEach(function(c){
    if(c.r!==top.r)return;
    var a=[],b=[];for(var p=0;p<12;p++){if(top.set[p]&&!c.set[p]&&!R.w[p])a.push(pcNameIn(top,p));if(c.set[p]&&!top.set[p]&&!R.w[p])b.push(pcNameIn(c,p));}
    if(a.length||b.length)tips.push('بین <span class="ltr">'+candName(top)+'</span> و <span class="ltr">'+candName(c)+'</span>: '+(a.length?'اگه <span class="ltr">'+a.join(' یا ')+'</span> بیاد، اولی قطعی‌تر می‌شه':'')+(a.length&&b.length?'؛ ':'')+(b.length?'اگه <span class="ltr">'+b.join(' یا ')+'</span> بیاد، دومی.':'.'));
  });
  if(R.last!==top.r)tips.push('تیکه‌ت روی نت خونه (<span class="ltr">'+sp.root+'</span>) تموم نمی‌شه. اگه پایانِ واقعی جمله رو هم وارد کنی، تشخیص دقیق‌تر می‌شه.');
  if(tips.length)h+='<div class="rzbox"><b>برای قطعی شدن</b><ul>'+tips.slice(0,5).map(function(t){return '<li class="hint">'+t+'</li>';}).join('')+'</ul></div>';
  out.innerHTML=h;
  rzCand={r:top.r,iv:top.T.iv,names:sp.notes};if(rzMode==='neck')refreshMini();
  var ob=$('rzopen');if(ob)ob.onclick=function(){setKey(top.r,true);S.mode=top.T.k;renderModes();changed();reveal($('neck'));toast(MN(top.T.k)+' روی دسته نمایش داده شد');};
}
(function(){
  var sel=$('rzhome');for(var p=0;p<12;p++){var o=document.createElement('option');o.value=p;o.textContent=PCN[p]+(p===1?' (سیم باز ششم)':'');sel.appendChild(o);}
  buildNeckInto($('rzneck'),function(e){var s=+e.currentTarget.dataset.s,f=+e.currentTarget.dataset.f;
    rzSeq.push({s:s,f:f});audition({t:'n',s:s,f:f,pc:false,pm:false});renderSeq();runRecognizer();});
  $('rzundo').onclick=function(){rzSeq.pop();renderSeq();runRecognizer();};
  $('rzclear').onclick=function(){rzSeq=[];renderSeq();runRecognizer();};
  $('rzshow').onchange=refreshMini;
  $('rzplay').onclick=function(){if(!rzSeq.length){toast('اول چند نت روی دسته انتخاب کن');return;}if(playing)stop();
    whenReady(function(){var sd=60/S.bpm/2,t=ac.currentTime+0.05;rzSeq.forEach(function(x){choke(t);playMidis([midiAt(x.s,x.f)],t,false);t+=sd;});
      setTimeout(function(){if(!playing)choke(ac.currentTime);},(t-ac.currentTime+0.4)*1000);});};
  $('rzmake').onclick=function(){
    if(!rzSeq.length){toast('اول چند نت روی دسته انتخاب کن');return;}
    if(rzSeq.length>24){toast('برای ساختن ریف حداکثر ۲۴ نت رو استفاده می‌کنم');}
    var seq=rzSeq.slice(0,24),need=seq.length*2,len=need<=16?16:need<=32?32:48,steps=[];
    seq.forEach(function(x){steps.push({t:'n',s:x.s,f:x.f,pc:false,pm:false},null);});
    while(steps.length<len)steps.push(null);
    if(playing)stop();
    if(rzCand&&MODES[RZT.filter(function(t){return t.iv===rzCand.iv;})[0].k]){var tk=RZT.filter(function(t){return t.iv===rzCand.iv;})[0].k;S.key=rzCand.r;S.mode=tk;renderKeys();renderModes();}
    setFromSteps(steps,len);curId=null;$('rname').value='';syncControls();changed();renderLib();
    toast('ریف ساخته شد');reveal($('tab'));};
  renderSeq();refreshMini();
  Array.prototype.forEach.call($('rzmodes').children,function(b){b.onclick=function(){rzMode=b.getAttribute('data-m');$('rz-neck').hidden=rzMode!=='neck';
    Array.prototype.forEach.call($('rzmodes').children,function(x){x.setAttribute('aria-pressed',x===b);});
    $('rz-notes').hidden=rzMode!=='notes';$('rz-tab').hidden=rzMode!=='tab';$('rz-riff').hidden=rzMode!=='riff';};});
  $('rzgo').onclick=runRecognizer;
})();

function renderSeq(){var box=$('rzseq');box.innerHTML='';
  if(!rzSeq.length){var e=document.createElement('span');e.className='empty';e.textContent='ترتیب نت‌هات اینجا نمایش داده می‌شه. روی هر نت کلیک کنی حذف می‌شه.';box.appendChild(e);return;}
  rzSeq.forEach(function(x,i){var m=midiAt(x.s,x.f),b=document.createElement('button');
    b.textContent=(i+1)+'. '+PCN[m%12];b.title='سیم '+(x.s+1)+'، فرت '+x.f+' (برای حذف کلیک کن)';
    b.onclick=function(){rzSeq.splice(i,1);renderSeq();runRecognizer();};box.appendChild(b);});}
function refreshMini(){
  var nk=$('rzneck');if(!nk)return;var cnt={};rzSeq.forEach(function(x){var k=x.s+':'+x.f;cnt[k]=(cnt[k]||0)+1;});
  var show=$('rzshow').checked&&rzCand;
  nk.querySelectorAll('.cell').forEach(function(c){
    var s=+c.dataset.s,f=+c.dataset.f,m=midiAt(s,f),pc=m%12,k=s+':'+f,d=c.querySelector('.dot');
    var ci=show?((pc-rzCand.r+12)%12):-1,idx=show?rzCand.iv.indexOf(ci):-1,nm=idx>=0?rzCand.names[idx]:PCN[pc];
    if(cnt[k]){d.className='dot '+(show&&idx<0?'bad':'pick')+(show&&ci===0?' root':'');}
    else if(show&&idx>=0){d.className='dot faded '+(ci===0?'root':'scale');}
    else d.className='dot ghost';
    d.textContent=nm;
    if(cnt[k]>1){var b=document.createElement('span');b.className='cnt';b.textContent=cnt[k];d.appendChild(b);}
  });}
