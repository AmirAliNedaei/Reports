/* تحلیل ریف (نت‌ها، درجه‌ها، پیشنهادها) */
/* ---------- analysis ---------- */
var KMAJ=[6.35,2.23,3.48,2.33,4.38,4.09,2.52,5.19,2.39,3.66,2.29,2.88],KMIN=[6.33,2.68,3.52,5.38,2.60,3.53,2.54,4.75,3.98,2.69,3.34,3.17];
function corr(a,b){var n=12,ma=0,mb=0,i;for(i=0;i<n;i++){ma+=a[i];mb+=b[i];}ma/=n;mb/=n;var num=0,da=0,db=0;
  for(i=0;i<n;i++){num+=(a[i]-ma)*(b[i]-mb);da+=(a[i]-ma)*(a[i]-ma);db+=(b[i]-mb)*(b[i]-mb);}return da&&db?num/Math.sqrt(da*db):0;}
function keyFind(h){var res=[];for(var t=0;t<12;t++){[['maj',KMAJ],['min',KMIN]].forEach(function(p){
  var prof=[];for(var i=0;i<12;i++)prof.push(p[1][(i-t+12)%12]);res.push({t:t,q:p[0],r:corr(h,prof)});});}
  res.sort(function(a,b){return b.r-a.r;});return res;}
function nearestFix(st){
  var cands=[st.f-1,st.f+1,st.f-2,st.f+2];
  for(var i=0;i<cands.length;i++){var f=cands[i];if(f>=0&&f<=NF&&inScale(midiAt(st.s,f)))return f;}return null;}
function analyze(){
  var m=MODES[S.mode],hist=[0,0,0,0,0,0,0,0,0,0,0,0],tot=0,inW=0,bad=[],first=null,last=null,count=0,tick=0;
  S.events.forEach(function(e,i){var tk=ticks(e),st=tick;tick+=tk;
    if(e.rest||T(e,'dead')||!e.notes.length)return;
    var w=tk/24*(st%96===0?1.6:1)*(T(e,'pm')?0.8:1)*(T(e,'ghost')?0.3:1),bads=[];
    e.notes.forEach(function(n,j){var md=e.harm==='nh'?harmPitch(n):midiAt(n.s,n.f),ww=w*(j?0.6:1),pc=md%12;hist[pc]+=ww;tot+=ww;
      if(inScale(md))inW+=ww;else if(!T(e,'tie'))bads.push({n:n,md:md});});
    if(!T(e,'tie')){if(first===null)first=i;last=i;count++;}
    if(bads.length)bad.push({i:i,e:e,b:bads});
  });
  if(!count)return null;
  var rel=[];for(var p=0;p<12;p++)rel[(p-S.key+12)%12]=hist[p];
  var used=[];for(p=0;p<12;p++)if(hist[p]>0)used.push((p-S.key+12)%12);
  var compat=ORDER.filter(function(k){return used.every(function(iv){return MODES[k].iv.indexOf(iv)>=0;});});
  var keys=keyFind(hist),best=keys[0];
  var rank=-1;for(var r=0;r<keys.length;r++){if(keys[r].t===S.key&&keys[r].q===m.q){rank=r;break;}}
  var anyC=keys[0].t===S.key||keys[1].t===S.key;
  var ratio=tot?inW/tot:0;
  var sigHave=m.sig.filter(function(iv){return rel[iv]>0;});
  var rootShare=tot?rel[0]/tot:0;
  function lowIv(e){var lo=null;e.notes.forEach(function(n){var md=midiAt(n.s,n.f);if(lo===null||md<lo)lo=md;});return ivOf(lo);}
  var fi=lowIv(S.events[first]),li=lowIv(S.events[last]);
  var edge=(fi===0||fi===7?1:0)+(li===0||li===7?1:0);
  var cScore=rank===0?25:(rank===1||rank===2)?15:anyC?10:0;
  var score=Math.round(45*ratio+cScore+15*(sigHave.length/m.sig.length)+Math.min(10,rootShare/0.25*10)+edge*2.5);
  return {ratio:ratio,bad:bad,keys:keys,rank:rank,best:best,cScore:cScore,sigHave:sigHave,rootShare:rootShare,edge:edge,fi:fi,li:li,compat:compat,score:Math.max(0,Math.min(100,score)),count:count};
}
function ivName(iv){var m=MODES[S.mode],k=m.iv.indexOf(iv);var nm=k>=0?spell(m.iv)[k]:PCN[(iv+S.key)%12];var dg=k>=0?dlab(m.iv)[k]:'';return nm+(dg?' ('+dg+')':'');}
function renderAnalysis(){
  var A=analyze(),m=MODES[S.mode],ul=$('checks');ul.innerHTML='';
  if(!A){$('score').innerHTML='–<small> / ۱۰۰</small>';$('barfill').style.width='0';$('verdict').textContent='هنوز نتی ننوشتی.';
    $('keyline').textContent='روی دسته کلیک کن یا از منوی «نمونه» یک ریف آماده انتخاب کن.';return;}
  $('score').innerHTML=fa(A.score)+'<small> / ۱۰۰</small>';
  var col=A.score>=85?'var(--ok)':A.score>=60?'var(--lantern)':'var(--rust)';
  var bf=$('barfill');bf.style.width=A.score+'%';bf.style.background=col;
  var v=A.score>=85?'دقیقاً حال‌وهوای '+SHORT[S.mode]+' رو داره.':A.score>=65?'خیلی نزدیکه؛ چند جزئیات رو ببین.':A.score>=40?'حال‌وهواش مبهمه یا بین چند مُد معلقه.':'از '+SHORT[S.mode]+' فاصله گرفته.';
  $('verdict').textContent=v;
  var kn=PCN[A.best.t]+(A.best.q==='min'?' minor':' major');
  $('keyline').innerHTML='گوش این ریف رو بیشتر در <b class="ltr">'+kn+'</b> می‌شنوه.';
  function add(state,title,body,extra){var li=document.createElement('li');
    li.innerHTML='<span class="mark '+state+'">'+(state==='y'?'✓':state==='n'?'✗':'!')+'</span><div><b>'+title+'</b><p>'+body+'</p></div>';
    if(extra)li.lastChild.appendChild(extra);ul.appendChild(li);}
  var pct=Math.round(A.ratio*100);
  if(!A.bad.length)add('y','همه‌ی نت‌ها داخل اسکیل‌ان','هیچ نت خارج از <span class="ltr">'+MN()+'</span> توی ریفت نیست.');
  else{
    var box=document.createElement('div');
    var shown=0;
    A.bad.forEach(function(b){b.b.forEach(function(x){
      if(shown>=6)return;shown++;
      var e=b.e,n=x.n,line=document.createElement('div');line.className='fix';
      var txt=document.createElement('span');txt.className='hint';
      txt.innerHTML='خانه‌ی '+fa(b.i+1)+': نت <span class="ltr">'+PCN[x.md%12]+'</span> (سیم '+fa(n.s+1)+'، فرت '+fa(n.f)+') ';
      line.appendChild(txt);
      var btn=document.createElement('button');btn.className='btn';btn.style.padding='2px 10px';btn.style.fontSize='13px';
      var fixF=e.harm==='nh'?null:nearestFix(n);
      if(e.notes.length>1){btn.textContent='حذف از آکورد';btn.onclick=function(){var k=e.notes.indexOf(n);if(k>=0)e.notes.splice(k,1);changed();auditionEv(e);};}
      else if(fixF!==null){btn.innerHTML='جایگزین با فرت '+fixF+' (<span class="ltr">'+label(midiAt(n.s,fixF))+'</span>)';btn.onclick=function(){n.f=fixF;changed();auditionEv(e);};}
      else{btn.textContent='تبدیل به سکوت';btn.onclick=function(){e.rest=true;e.notes=[];changed();};}
      line.appendChild(btn);box.appendChild(line);
    });});
    add(pct>=85?'m':'n',fa(pct)+'٪ از ریف داخل اسکیله','این نت‌ها بیرون از <span class="ltr">'+MN()+'</span> هستن. اگه عمدی نیست، اصلاحشون کن:',box);
  }
  var R0=RN(),target=R0+' '+(m.q==='min'?'minor':'major');
  if(A.rank===0)add('y','مرکز تونال درسته','نت خونه‌ی ریفت واقعاً <span class="ltr">'+R0+'</span> شنیده می‌شه و حس کلی‌اش <span class="ltr">'+target+'</span> است.');
  else if(A.cScore>0)add('m','مرکز تونال نیمه‌محکمه','گوش بین <span class="ltr">'+target+'</span> و <span class="ltr">'+PCN[A.best.t]+(A.best.q==='min'?' minor':' major')+'</span> مردده. نت <span class="ltr">'+R0+'</span> رو روی ضرب‌های اول (ستون‌های شماره‌دار) بزن یا زیر ریف روش پدال کن.');
  else add('n','مرکز تونال جای دیگه‌ست','ریفت بیشتر حول <span class="ltr">'+PCN[A.best.t]+'</span> می‌چرخه تا <span class="ltr">'+R0+'</span>. با نت خونه شروع و تموم کن تا خونه مشخص بشه.');
  var sigAll=m.sig.map(function(iv){return (A.sigHave.indexOf(iv)>=0?'✓ ':'✗ ')+'<span class="ltr">'+ivName(iv)+'</span>';}).join('، ');
  var miss=m.sig.length-A.sigHave.length;
  var others=A.compat.filter(function(k){return k!==S.mode;});
  var cbox=document.createElement('div');cbox.className='compat';
  A.compat.forEach(function(k){var s=document.createElement('span');s.textContent=SHORT[k];if(k===S.mode)s.className='me';s.classList.add('ltr');cbox.appendChild(s);});
  var sigBody='نت‌هایی که '+SHORT[S.mode]+' رو از همسایه‌هاش جدا می‌کنن: '+sigAll+'.';
  if(miss&&others.length)sigBody+=' چون همه‌شون رو نزدی، ریفت با این مُدها هم جوره:';
  else if(others.length)sigBody+=' نت‌هات با این مُدها هم سازگارن، ولی نت‌های امضا حال‌وهوا رو به '+SHORT[S.mode]+' می‌برن:';
  add(miss===0?'y':A.sigHave.length?'m':'n',miss===0?'امضای مُد شنیده می‌شه':'امضای مُد کامل نیست',sigBody,A.compat.length?cbox:null);
  var rs=Math.round(A.rootShare*100),R1=RN(),F5=ivName(7).split(' ')[0];
  add(rs>=20?'y':rs>=10?'m':'n','تأکید روی نت خونه: '+fa(rs)+'٪', rs>=20?'<span class="ltr">'+R1+'</span> به اندازه‌ی کافی تکرار شده و ریف «خونه» داره.':'<span class="ltr">'+R1+'</span> کم شنیده می‌شه. تو ملودیک دث معمولاً ریف مدام به نت خونه برمی‌گرده (پدال‌تون).');
  add(A.edge===2?'y':A.edge===1?'m':'n','شروع و پایان','ریف با <span class="ltr">'+ivName(A.fi)+'</span> شروع و با <span class="ltr">'+ivName(A.li)+'</span> تموم می‌شه. '+(A.edge===2?'شروع و پایان روی نت خونه یا پنجمش حس کامل بودن می‌ده.':'اگه می‌خوای حس «رسیدن به خونه» قوی‌تر بشه، روی <span class="ltr">'+R1+'</span> (یا <span class="ltr">'+F5+'</span>) تموم کن.'));
}
