/* کتابخانه‌ی آکوردها و دیاگرام‌ها */
/* ---------- chord library ---------- */
var CT=[
 {id:'p5',sfx:'5',rs:'5',lv:1,tones:[[0,1],[7,5]],exact:[0,7],desc:'پاورکورد؛ ستون اصلی ریف‌های متال. سوم نداره، پس نه ماژوره نه مینور.'},
 {id:'maj',sfx:'',rs:'',lv:1,tones:[[0,1],[4,3],[7,5]],desc:'ماژور؛ روشن و محکم.'},
 {id:'min',sfx:'m',rs:'',lv:1,tones:[[0,1],[3,3],[7,5]],desc:'مینور؛ غمگین و تیره.'},
 {id:'sus2',sfx:'sus2',rs:'sus2',lv:1,tones:[[0,1],[2,2],[7,5]],desc:'سوم نداره؛ باز و مبهم، پرکاربرد در متال ملودیک.'},
 {id:'sus4',sfx:'sus4',rs:'sus4',lv:1,tones:[[0,1],[5,4],[7,5]],desc:'سوم نداره؛ معلق و منتظر حل شدن.'},
 {id:'dim',sfx:'dim',rs:'°',lv:1,tones:[[0,1],[3,3],[6,5]],desc:'کاسته؛ پرتنش و ناپایدار.'},
 {id:'aug',sfx:'aug',rs:'+',lv:1,tones:[[0,1],[4,3],[8,5]],desc:'افزوده؛ معلق و کمی ترسناک.'},
 {id:'m7',sfx:'m7',rs:'7',lv:2,tones:[[0,1],[3,3],[7,5],[10,7]],req:[0,3,10],desc:'مینور نرم‌تر و ملودیک.'},
 {id:'maj7',sfx:'maj7',rs:'maj7',lv:2,tones:[[0,1],[4,3],[7,5],[11,7]],req:[0,4,11],desc:'گرم و رویایی؛ برای بخش‌های آرام و اتمسفریک.'},
 {id:'dom7',sfx:'7',rs:'7',lv:2,tones:[[0,1],[4,3],[7,5],[10,7]],req:[0,4,10],desc:'دومیننت؛ کشش قوی برای حل شدن.'},
 {id:'madd9',sfx:'m(add9)',rs:'(add9)',lv:2,tones:[[0,1],[3,3],[7,5],[14,9]],req:[0,3,2],desc:'مینور با نهم؛ یکی از امضاهای صدای غمگین-حماسی ملودیک دث.'},
 {id:'add9',sfx:'add9',rs:'add9',lv:2,tones:[[0,1],[4,3],[7,5],[14,9]],req:[0,4,2],desc:'ماژور با رنگ نهم؛ درخشان.'},
 {id:'m7b5',sfx:'m7b5',rs:'ø7',lv:2,tones:[[0,1],[3,3],[6,5],[10,7]],desc:'نیمه‌کاسته؛ تاریک و پیچیده.'},
 {id:'mmaj7',sfx:'m(maj7)',rs:'(maj7)',lv:2,tones:[[0,1],[3,3],[7,5],[11,7]],req:[0,3,11],desc:'مینور با هفتم بزرگ؛ صدای فیلم ترسناک و نئوکلاسیک.'},
 {id:'dim7',sfx:'dim7',rs:'°7',lv:2,tones:[[0,1],[3,3],[6,5],[9,7]],desc:'کاسته‌ی کامل؛ متقارن، هر ۳ فرت همون آکورد تکرار می‌شه.'},
 {id:'7sus4',sfx:'7sus4',rs:'7sus4',lv:2,tones:[[0,1],[5,4],[7,5],[10,7]],req:[0,5,10],desc:'دومیننت معلق؛ نرم‌تر از 7.'},
 {id:'m6',sfx:'m6',rs:'6',lv:2,tones:[[0,1],[3,3],[7,5],[9,6]],req:[0,3,9],desc:'مینور ششم؛ رنگ Dorian.'},
 {id:'6',sfx:'6',rs:'6',lv:2,tones:[[0,1],[4,3],[7,5],[9,6]],req:[0,4,9],desc:'ماژور ششم؛ گرم.'},
 {id:'m9',sfx:'m9',rs:'9',lv:3,tones:[[0,1],[3,3],[7,5],[10,7],[14,9]],req:[0,3,10,2],rl:[3,7,10,2],desc:'مینور غنی؛ پرکاربرد در پراگرسیو متال.'},
 {id:'maj9',sfx:'maj9',rs:'maj9',lv:3,tones:[[0,1],[4,3],[7,5],[11,7],[14,9]],req:[0,4,11,2],rl:[4,7,11,2],desc:'maj7 با نهم؛ خیلی شناور.'},
 {id:'m11',sfx:'m11',rs:'11',lv:3,tones:[[0,1],[3,3],[7,5],[10,7],[14,9],[17,11]],req:[0,3,10,5],desc:'مینور یازدهم؛ فضای باز و چهارمی.'},
 {id:'9',sfx:'9',rs:'9',lv:3,tones:[[0,1],[4,3],[7,5],[10,7],[14,9]],req:[0,4,10,2],rl:[4,7,10,2],desc:'دومیننت نهم.'},
 {id:'13',sfx:'13',rs:'13',lv:3,tones:[[0,1],[4,3],[7,5],[10,7],[14,9],[21,13]],req:[0,4,10,9],rl:[4,9,10,2],desc:'دومیننت سیزدهم؛ پر از رنگ.'},
 {id:'69',sfx:'6/9',rs:'6/9',lv:3,tones:[[0,1],[4,3],[7,5],[9,6],[14,9]],req:[0,4,9,2],desc:'ماژور بدون هفتم ولی خیلی غنی.'},
 {id:'maj7s11',sfx:'maj7#11',rs:'maj7#11',lv:3,tones:[[0,1],[4,3],[7,5],[11,7],[18,11]],req:[0,4,11,6],desc:'امضای Lydian؛ رویایی و عجیب.'},
 {id:'mmaj9',sfx:'m(maj9)',rs:'(maj9)',lv:3,tones:[[0,1],[3,3],[7,5],[11,7],[14,9]],req:[0,3,11,2],desc:'مینور با هفتم بزرگ و نهم؛ خیلی سینمایی.'},
 {id:'7b9',sfx:'7b9',rs:'7b9',lv:3,tones:[[0,1],[4,3],[7,5],[10,7],[13,9]],req:[0,4,10,1],desc:'دومیننت تاریک؛ آکورد V در هارمونیک مینور.'},
 {id:'7s9',sfx:'7#9',rs:'7#9',lv:3,tones:[[0,1],[4,3],[7,5],[10,7],[15,9]],req:[0,4,10,3],desc:'آکورد هندریکس؛ ماژور و مینور همزمان.'},
 {id:'p5o',sfx:'5 (octave)',rs:'5',lv:4,tones:[[0,1],[7,5],[12,8]],exact:[0,7,12],desc:'پاورکورد با اکتاو؛ پرتر و سنگین‌تر از پاورکورد دونتی.'},
 {id:'madd9o',sfx:'m(add9) open',rs:'(add9)',lv:4,tones:[[0,1],[7,5],[14,9],[15,10]],exact:[0,7,14,15],desc:'صدابندی باز m(add9)؛ نیم‌پرده‌ی بین نهم و سوم، غمِ تیز ملودیک دث.'},
 {id:'p5a9',sfx:'5add9',rs:'5add9',lv:4,tones:[[0,1],[7,5],[14,9]],exact:[0,7,14],desc:'پاورکورد با نهم؛ حماسی و باز.'},
 {id:'tri',sfx:'(b5)',rs:'b5',lv:4,tones:[[0,1],[6,5]],exact:[0,6],desc:'تریتون، «فاصله‌ی شیطان»؛ اساس صدای تراش و بلک متال.'},
 {id:'b9c',sfx:'5(b9)',rs:'5(b9)',lv:4,tones:[[0,1],[7,5],[13,9]],exact:[0,7,13],desc:'کلاستر فریژین؛ خشن و خفه‌کننده.'},
 {id:'b9d',sfx:'(b9)',rs:'b9',lv:4,tones:[[0,1],[13,9]],exact:[0,13],desc:'دیاد نهم کوچک؛ خیلی دیسونانت، رایج در djent و تکنیکال دث.'},
 {id:'dimM7',sfx:'dim(maj7)',rs:'°(maj7)',lv:4,tones:[[0,1],[3,3],[6,5],[11,7]],desc:'کاسته با هفتم بزرگ؛ صدای بلک و تکنیکال دث.'},
 {id:'augM7',sfx:'maj7#5',rs:'maj7#5',lv:4,tones:[[0,1],[4,3],[8,5],[11,7]],req:[0,4,8,11],desc:'افزوده با هفتم بزرگ؛ رنگ هارمونیک و ملودیک مینور.'}
];
var CTI={};CT.forEach(function(t){CTI[t.id]=t;});
var LVN={1:'۱. پایه: پاور و سه‌صدایی',2:'۲. هفتم، sus و add',3:'۳. گسترده: ۹، ۱۱، ۱۳',4:'۴. متال پیشرفته',5:'۵. ولویسینگ‌های جز'};
var LVH={1:'آکوردهای سازنده‌ی ۹۰٪ ریف‌های متال.',2:'یک نت چهارم اضافه می‌شه و رنگ آکورد عوض می‌شه.',3:'نهم، یازدهم و سیزدهم. روی گیتار معمولاً پنجم (و گاهی ریشه) حذف می‌شه تا انگشت‌ها جا بشن.',4:'صدابندی‌هایی که توی متال مدرن، ملودیک دث، بلک و djent شنیده می‌شن.',5:'همون آکوردهای هفتم و گسترده، با صدابندی‌های استاندارد جز: Shell، Drop 2، Drop 3، Rootless و Quartal.'};
var JZ7=['maj7','m7','dom7','m7b5','mmaj7'],JZ9=['maj9','m9','9','13'];
var JZSN={full:'کامل',shell:'Shell (۱-۳-۷)',drop2:'Drop 2',drop3:'Drop 3',rootless:'Rootless',quartal:'Quartal'};
function jzStyles(t){if(JZ7.indexOf(t.id)>=0)return ['shell','drop2','drop3'];if(t.id==='dim7')return ['drop2','drop3'];if(t.rl)return ['rootless','full'];if(t.id==='m11')return ['quartal','full'];return ['full'];}
var MAJS={1:0,2:2,3:4,4:5,5:7,6:9,7:11,8:12,9:14,10:16,11:17,13:21};
function degLab(tn){var d=tn[0]-MAJS[tn[1]];return (d<0?'b'.repeat(-d):'#'.repeat(d))+tn[1];}
function spellChord(rootName,rootPc,t){var li=LET.indexOf(rootName[0]);
  return t.tones.map(function(tn){var Li=(li+tn[1]-1)%7,tg=(rootPc+tn[0])%12,d=(tg-NAT[Li]+12)%12;if(d>6)d-=12;return LET[Li]+(d>0?'#'.repeat(d):'b'.repeat(-d));});}
function rootNameFor(pc,t){var a=PCN[pc],b=FLATN[pc];if(a===b)return a;
  function pen(n){return spellChord(n,pc,t).reduce(function(x,y){return x+(y.length-1)*(y.length>2?4:1);},0);}
  return pen(b)<pen(a)?b:a;}
var VCACHE={};
function solveVoicings(rootPc,t,style,bassRel){
  var ck=rootPc+'|'+t.id+'|'+style+'|'+(bassRel===undefined?'r':bassRel);var bassPc=bassRel===undefined?rootPc:(rootPc+bassRel)%12;if(VCACHE[ck])return VCACHE[ck];
  var rel=t.tones.map(function(x){return x[0]%12;}),allow={};rel.forEach(function(r){allow[(rootPc+r)%12]=1;});
  var req=(t.req||rel).map(function(r){return (rootPc+r)%12;}),nmin=Math.max(t.tones.length<=3?t.tones.length:3,req.length),nmax=6,rootBass=true,adj=false,maxGap=1,spanMax=t.lv>=3?4:3,fixN=0,check=null;
  var q=[];rel.forEach(function(r){if(q.indexOf(r)<0)q.push(r);});
  if(style==='shell'){var th=rel[1],sv=rel[3];var set=t.id==='m7b5'?[0,6,10]:[0,th,sv];allow={};set.forEach(function(r){allow[(rootPc+r)%12]=1;});req=set.map(function(r){return (rootPc+r)%12;});fixN=3;}
  else if(style==='drop2'||style==='drop3'){req=q.map(function(r){return (rootPc+r)%12;});fixN=4;adj=style==='drop2';rootBass=false;
    check=function(mids){var ord=mids.map(function(m){return q.indexOf(((m%12)-rootPc+12)%12);});
      if(ord.slice().sort().join()!=='0,1,2,3')return false;
      for(var k=0;k<4;k++){var a=style==='drop2'?[(k+2)%4,k,(k+1)%4,(k+3)%4]:[(k+1)%4,k,(k+2)%4,(k+3)%4];if(a.join()===ord.join())return true;}return false;};}
  else if(style==='rootless'){allow={};t.rl.forEach(function(r){allow[(rootPc+r)%12]=1;});req=t.rl.map(function(r){return (rootPc+r)%12;});fixN=4;adj=true;rootBass=false;
    check=function(mids){return mids.every(function(m){return m%12!==rootPc;});};}
  else if(style==='quartal'){fixN=5;adj=true;check=function(mids){var iv=[];for(var i=1;i<mids.length;i++)iv.push(mids[i]-mids[i-1]);return iv.join()==='5,5,5,4';};}
  if(t.exact){fixN=t.exact.length;req=[];check=function(mids){return mids.map(function(m){return m-mids[0];}).join()===t.exact.join();};spanMax=5;}
  if(fixN){nmin=nmax=fixN;}
  var found={},list=[];
  for(var w=0;w<=21;w++){
    var cands=[];for(var s0=0;s0<6;s0++){var c=[null];if(w<=4&&allow[OPEN[s0]%12])c.push(0);
      for(var f=Math.max(1,w);f<=Math.min(NF,w+spanMax);f++)if(allow[(OPEN[s0]+f)%12])c.push(f);cands.push(c);}
    var pick=[null,null,null,null,null,null];
    (function rec(si){
      if(si<0){evalV();return;}
      for(var k=0;k<cands[si].length;k++){pick[si]=cands[si][k];rec(si-1);}
    })(5);
  }
  function evalV(){
    var notes=[];for(var s1=5;s1>=0;s1--)if(pick[s1]!==null)notes.push({s:s1,f:pick[s1]});
    if(notes.length<nmin||notes.length>nmax)return;
    var fr=notes.filter(function(n){return n.f>0;}).map(function(n){return n.f;});
    var mn=fr.length?Math.min.apply(null,fr):0,mx=fr.length?Math.max.apply(null,fr):0,span=fr.length?mx-mn:0;
    if(span>spanMax)return;
    var atMin=fr.filter(function(f){return f===mn;}).length,fingers=fr.length-(atMin>1?atMin-1:0);if(fingers>4)return;
    var ss=notes.map(function(n){return n.s;}),gaps=(ss[0]-ss[ss.length-1]+1)-ss.length;
    if(adj&&gaps)return;if(gaps>maxGap)return;
    var mids=notes.map(function(n){return OPEN[n.s]+n.f;}).sort(function(a,b){return a-b;});
    if(rootBass&&mids[0]%12!==bassPc)return;
    var have={};mids.forEach(function(m){have[m%12]=1;});
    for(var i=0;i<req.length;i++)if(!have[req[i]])return;
    if(check&&!check(mids))return;
    var key=notes.map(function(n){return n.s+':'+n.f;}).join(',');if(found[key])return;found[key]=1;
    var dbl=mids.filter(function(m){return m%12===rootPc;}).length>1;
    var sc=(t.exact||fixN?0:2*notes.length)-1.2*span-3*gaps+(ss[0]>=4?1:0)+(dbl?0.5:0)-0.03*mn-(span>=4?2:0);
    list.push({notes:notes,sc:sc,lo:fr.length?mn:0,set:ss[0]+'-'+ss[ss.length-1]});
  }
  list.sort(function(a,b){return b.sc-a.sc;});
  var out=[],seen={};
  list.forEach(function(v){if(out.length>=5)return;var b=Math.min(3,Math.floor(v.lo/5))+'/'+v.set;if(seen[b])return;seen[b]=1;out.push(v);});
  out.sort(function(a,b){return a.lo-b.lo;});
  VCACHE[ck]=out;return out;
}
function diagSVG(notes,rootPc){
  var pl={};notes.forEach(function(n){pl[n.s]=n.f;});
  var fr=notes.filter(function(n){return n.f>0;}).map(function(n){return n.f;}),mx=fr.length?Math.max.apply(null,fr):0,mn=fr.length?Math.min.apply(null,fr):1;
  var st=mx<=5?1:mn,x0=24,dx=16,y0=28,dy=18,h='<svg viewBox="0 0 118 136" role="img" aria-label="chord diagram">';
  for(var r=0;r<=5;r++)h+='<line x1="'+x0+'" y1="'+(y0+r*dy)+'" x2="'+(x0+5*dx)+'" y2="'+(y0+r*dy)+'" stroke="var(--muted)" stroke-width="'+(r===0&&st===1?4:1)+'"/>';
  for(var c=0;c<6;c++)h+='<line x1="'+(x0+c*dx)+'" y1="'+y0+'" x2="'+(x0+c*dx)+'" y2="'+(y0+5*dy)+'" stroke="var(--muted)" stroke-width="1"/>';
  if(st>1)h+='<text x="4" y="'+(y0+dy*0.5+4)+'" font-size="11" fill="var(--muted)">'+st+'</text>';
  for(var s1=0;s1<6;s1++){var cx=x0+(5-s1)*dx,f=pl[s1];
    if(f===undefined)h+='<text x="'+cx+'" y="20" font-size="12" text-anchor="middle" fill="var(--muted)">×</text>';
    else{var m=OPEN[s1]+f,isR=m%12===rootPc;
      if(f===0)h+='<circle cx="'+cx+'" cy="16" r="5" fill="none" stroke="'+(isR?'var(--lantern)':'var(--ink)')+'" stroke-width="1.6"/>';
      else h+='<circle cx="'+cx+'" cy="'+(y0+(f-st+0.5)*dy)+'" r="6.5" fill="'+(isR?'var(--lantern)':'var(--pine)')+'"/>';
      h+='<text x="'+cx+'" y="130" font-size="10" text-anchor="middle" fill="var(--muted)">'+PCN[m%12]+'</text>';}}
  return h+'</svg>';}
function addChordToRiff(notes){
  var ns=notes.map(function(n){return {s:n.s,f:n.f};}).sort(function(a,b){return b.s-a.s;}),ev=S.events[S.cur];
  if(ev){ev.rest=false;ev.notes=ns;delete ev.t.tie;}else{ev=newEv(ns);S.events.push(ev);}
  var i=S.events.indexOf(ev);S.cur=i+1;changed();auditionEv(ev);toast('آکورد در خانه‌ی '+fa(i+1)+' نوشته شد');}
function showChordOnNeck(notes){activePat={mode:S.mode,key:S.key,deg:-1,high:null,notes:notes.map(function(n){return {s:n.s,f:n.f};})};
  renderPatterns();refreshNeck();reveal($('neck'));}
function strum(notes){whenReady(function(){var t=ac.currentTime+0.02;choke(t);
  playMidis(notes.map(function(n){return OPEN[n.s]+n.f;}).sort(function(a,b){return a-b;}),t,false);});}
function chordCard(rootPc,t,o){
  o=o||{};var rn=o.rootName||rootNameFor(rootPc,t),names=spellChord(rn,rootPc,t),styles=o.styles||['full'],st=0,vi=0;
  var c=document.createElement('div');c.className='pcard chcard';
  var hd=document.createElement('div');hd.className='row';hd.style.justifyContent='space-between';
  hd.innerHTML='<span class="rn">'+rn+t.sfx+'</span>'+(o.roman?'<span class="hint ltr">'+o.roman+'</span>':'');c.appendChild(hd);
  var inS=function(semi){return MODES[S.mode].iv.indexOf(((rootPc+semi)%12-S.key+24)%12)>=0;};
  var nt=document.createElement('div');nt.className='nts';
  t.tones.forEach(function(tn,k){var sp=document.createElement('span');if(k===0)sp.className='rt';else if(o.fit&&!inS(tn[0]))sp.className='out';
    sp.innerHTML=names[k]+'<small>'+degLab(tn)+'</small>';nt.appendChild(sp);});
  c.appendChild(nt);
  var ds=document.createElement('div');ds.className='tip';ds.textContent=t.desc;c.appendChild(ds);
  if(o.fit){var outs=[];t.tones.forEach(function(tn,k){if(!inS(tn[0])&&outs.indexOf(names[k])<0)outs.push(names[k]);});
    var ab=[];for(var p=0;p<12;p++){}
    var abs=t.tones.map(function(tn){return (rootPc+tn[0])%12;});
    var fits=RZT.filter(function(T2){return abs.every(function(pc){return T2.iv.indexOf((pc-S.key+12)%12)>=0;});}).map(function(T2){return RN()+' '+T2.n;});
    var fd=document.createElement('div');fd.className='fit '+(outs.length?'no':'ok');
    fd.innerHTML=outs.length?'بیرون از <span class="ltr">'+MN()+'</span>: <span class="ltr">'+outs.join('، ')+'</span>.'+(fits.length?' با خونه‌ی <span class="ltr">'+RN()+'</span> توی این اسکیل‌ها جا می‌شه: <span class="ltr">'+fits.slice(0,5).join('، ')+'</span>.':' با خونه‌ی فعلی توی هیچ‌کدوم از اسکیل‌های برنامه کامل جا نمی‌شه؛ آکورد قرضی یا کروماتیکه.'):'✓ کاملاً داخل <span class="ltr">'+MN()+'</span> است.';
    c.appendChild(fd);}
  var sty=null;
  if(styles.length>1){sty=document.createElement('div');sty.className='sty';styles.forEach(function(sn,k){var b=document.createElement('button');b.className='tb';b.textContent=JZSN[sn];b.onclick=function(){st=k;vi=0;draw();};sty.appendChild(b);});c.appendChild(sty);}
  var dg=document.createElement('div');dg.className='dg';var prv=document.createElement('button'),nxt=document.createElement('button'),box=document.createElement('div');
  prv.textContent='◂';nxt.textContent='▸';prv.setAttribute('aria-label','صدابندی قبلی');nxt.setAttribute('aria-label','صدابندی بعدی');
  dg.appendChild(prv);dg.appendChild(box);dg.appendChild(nxt);c.appendChild(dg);
  var vl=document.createElement('div');vl.className='vl';c.appendChild(vl);
  var r=document.createElement('div');r.className='row';
  var b1=document.createElement('button');b1.className='btn';b1.textContent='شنیدن';
  var b2=document.createElement('button');b2.className='btn';b2.textContent='فرت‌برد';b2.setAttribute('aria-expanded','false');
  var b3=document.createElement('button');b3.className='btn';b3.textContent='+ ریف';
  r.appendChild(b1);r.appendChild(b2);r.appendChild(b3);c.appendChild(r);
  var V=[];
  function draw(){
    if(sty)Array.prototype.forEach.call(sty.children,function(b,k){b.setAttribute('aria-pressed',k===st);});
    V=solveVoicings(rootPc,t,styles[st]);
    if(!V.length){box.innerHTML='<div class="hint" style="width:118px;text-align:center">صدابندی قابل‌اجرایی پیدا نشد</div>';vl.textContent='';[prv,nxt,b1,b2,b3].forEach(function(b){b.disabled=true;});return;}
    [prv,nxt,b1,b2,b3].forEach(function(b){b.disabled=false;});
    vi=(vi+V.length)%V.length;var v=V[vi];box.innerHTML=diagSVG(v.notes,rootPc);
    vl.textContent='صدابندی '+fa(vi+1)+' از '+fa(V.length)+'، از فرت '+fa(v.lo)+'، سیم‌های '+fa(v.notes[0].s+1)+' تا '+fa(v.notes[v.notes.length-1].s+1);
  }
  prv.onclick=function(){vi--;draw();strum(V[vi].notes);};nxt.onclick=function(){vi++;draw();strum(V[vi].notes);};
  b1.onclick=function(){strum(V[vi].notes);};b3.onclick=function(){addChordToRiff(V[vi].notes);};
  var X=null;
  function closeX(){if(X){X.remove();X=null;}c.classList.remove('open');b2.setAttribute('aria-expanded','false');b2.textContent='فرت‌برد';}
  function openX(){
    if(openChord&&openChord!==closeX)openChord();openChord=closeX;
    c.classList.add('open');b2.setAttribute('aria-expanded','true');b2.textContent='بستن';
    X=document.createElement('div');X.className='chx';c.appendChild(X);
    var toneOf={};t.tones.forEach(function(tn,k){var r2=tn[0]%12;if(toneOf[r2]===undefined)toneOf[r2]=k;});
    function role(tn){var d=tn[1];return d===1||d===8?'root':(d===3||d===2||d===4||d===10)?'c3':d===5?'c5':(d===7||d===6)?'c7':'cx';}
    var lg=document.createElement('div');lg.className='lgd';
    var roles={root:['var(--lantern)','ریشه'],c3:['var(--pine)','سوم (یا sus)'],c5:['var(--frost)','پنجم'],c7:['var(--plum)','هفتم یا ششم'],cx:['var(--moss)','گسترده (۹، ۱۱، ۱۳)']},usedR={};
    t.tones.forEach(function(tn){usedR[role(tn)]=1;});
    Object.keys(roles).forEach(function(k){if(usedR[k])lg.innerHTML+='<span><i style="background:'+roles[k][0]+'"></i>'+roles[k][1]+'</span>';});
    lg.innerHTML+='<span>حلقه‌ی سفید: صدابندی انتخاب‌شده. روی هر نت دسته کلیک کنی صداش پخش می‌شه.</span>';
    X.appendChild(lg);
    // inversions
    var inv=[],seenPc={};
    t.tones.forEach(function(tn,k){var r2=tn[0]%12;if(seenPc[r2]===undefined){seenPc[r2]=1;inv.push(k);}});
    inv=inv.slice(0,4);
    var exactOk=!t.exact||t.exact.every(function(e,i,a){return a.map(function(x){return x%12;}).indexOf(e%12)===i;});
    if(!exactOk)inv=[0];
    var ig=document.createElement('div');ig.className='grp';ig.innerHTML='<b>وارونگی</b>';X.appendChild(ig);
    var vg=document.createElement('div');vg.className='grp';X.appendChild(vg);
    var wrap=document.createElement('div');wrap.className='neck-wrap';var nk=document.createElement('div');nk.className='neck chneck';wrap.appendChild(nk);X.appendChild(wrap);
    var ar=document.createElement('div');ar.className='row';X.appendChild(ar);
    var a1=document.createElement('button');a1.className='btn';a1.textContent='شنیدن این صدابندی';
    var a2=document.createElement('button');a2.className='btn';a2.textContent='افزودن به ریف';
    var a3=document.createElement('button');a3.className='btn';a3.textContent='روی دسته‌ی اصلی هم نشون بده';
    var a4=document.createElement('button');a4.className='btn';a4.textContent='فقط نت‌ها (بدون صدابندی)';
    ar.appendChild(a1);ar.appendChild(a2);ar.appendChild(a3);ar.appendChild(a4);
    buildNeckInto(nk,function(e){var s2=+e.currentTarget.dataset.s,f2=+e.currentTarget.dataset.f;audition({t:'n',s:s2,f:f2,pc:false,pm:false});});
    var ii=0,sv=0,VV=[],sel=null;
    function invType(k){if(!t.exact||k===0)return t;var e=t.exact,r2=e.slice(k).concat(e.slice(0,k).map(function(x){return x+12;}));var b=r2[0];
      return {id:t.id+'_i'+k,tones:t.tones,lv:t.lv,exact:r2.map(function(x){return x-b;})};}
    function invVoices(k){var tt=invType(k);return solveVoicings(rootPc,tt,'full',t.tones[inv[k]][0]%12);}
    function paint(){
      var selK={};if(sel)sel.forEach(function(n){selK[n.s+':'+n.f]=1;});
      nk.querySelectorAll('.cell').forEach(function(cl){
        var s2=+cl.dataset.s,f2=+cl.dataset.f,m=OPEN[s2]+f2,r2=((m%12)-rootPc+12)%12,k=toneOf[r2],d=cl.querySelector('.dot');
        if(k===undefined){d.className='dot ghost';d.textContent=PCN[m%12];return;}
        var tn=t.tones[k];d.className='dot '+role(tn)+(sel?(selK[s2+':'+f2]?' pat':' faded'):'');
        d.textContent=S.deg?degLab(tn):names[k];});
    }
    function drawInv(){
      ig.querySelectorAll('button').forEach(function(b,k){b.setAttribute('aria-pressed',k===ii);});
      VV=invVoices(ii);vg.innerHTML='<b>صدابندی‌ها</b>';
      if(!VV.length){vg.innerHTML+='<span class="hint">برای این وارونگی صدابندی قابل‌اجرایی پیدا نشد.</span>';sel=null;paint();[a1,a2,a3].forEach(function(b){b.disabled=true;});return;}
      [a1,a2,a3].forEach(function(b){b.disabled=false;});
      sv=Math.min(sv,VV.length-1);
      VV.forEach(function(v,k){var b=document.createElement('button');b.className='tb';
        b.textContent='فرت '+fa(v.lo)+'، سیم '+fa(v.notes[0].s+1)+' تا '+fa(v.notes[v.notes.length-1].s+1);
        b.setAttribute('aria-pressed',k===sv);b.onclick=function(){sv=k;sel=VV[sv].notes;drawInv();strum(sel);};vg.appendChild(b);});
      sel=VV[sv].notes;paint();
    }
    inv.forEach(function(k,j){var tn=t.tones[k],b=document.createElement('button');b.className='tb';
      b.innerHTML=j===0?'حالت پایه <small>(ریشه در بیس)</small>':'وارونگی '+fa(j)+' <small>'+rn+t.sfx+'/'+names[k]+' ('+degLab(tn)+' در بیس)</small>';
      b.onclick=function(){ii=j;sv=0;drawInv();if(sel)strum(sel);};ig.appendChild(b);});
    if(styles[st]==='full'&&V.length)sv=vi;
    drawInv();
    a1.onclick=function(){if(sel)strum(sel);};a2.onclick=function(){if(sel)addChordToRiff(sel);};a3.onclick=function(){if(sel)showChordOnNeck(sel);};
    a4.onclick=function(){if(sel){sel=null;paint();a4.textContent='نمایش صدابندی انتخاب‌شده';}else{sel=VV[sv]?VV[sv].notes:null;paint();a4.textContent='فقط نت‌ها (بدون صدابندی)';}};
    setTimeout(function(){c.scrollIntoView({behavior:'smooth',block:'nearest'});},30);
  }
  var ir=EL('div','idearow');ir.appendChild(EL('span','kick','۳ ایده'));['آرپژ لت‌رینگ','چاگ و ضربه‌ی آکورد','لید روی نت‌های آکورد'].forEach(function(nm,i){var bi=EL('button','tb',fa(i+1)+'. '+nm);bi.onclick=function(){if(!V.length)return;var L2=chordIdeas(V[vi].notes,rootPc);ideaLoad(L2[i].ev,rn+t.sfx+' — '+nm);};ir.appendChild(bi);});c.appendChild(ir);
  b2.onclick=function(){if(X)closeX();else openX();};
  hd.querySelector('.rn').onclick=b2.onclick;
  draw();return c;
}
var chLv=1,chDeg=-1,openChord=null;
function diatonic(t,j){var iv=MODES[S.mode].iv,base=iv[j];return t.tones.every(function(tn){return iv.indexOf((base+tn[0])%12)>=0;});}
function romanFor(t,j){var third=t.tones.filter(function(x){return x[1]===3;})[0],low=third&&third[0]===3;var r=ROMAN[j];return (low?r.toLowerCase():r)+t.rs;}
function renderChords(){
  if(!$('chcards'))return;
  $('chmode').textContent=MN();
  var lv=$('chlv');lv.innerHTML='';[1,2,3,4,5].forEach(function(k){var b=document.createElement('button');b.className='chip';b.textContent=LVN[k];b.setAttribute('aria-pressed',k===chLv);b.onclick=function(){chLv=k;renderChords();};lv.appendChild(b);});
  var iv=MODES[S.mode].iv,names=spell(iv);
  var dg=$('chdeg');dg.innerHTML='';
  var all=document.createElement('button');all.className='chip';all.textContent='همه‌ی درجه‌ها';all.setAttribute('aria-pressed',chDeg<0);all.onclick=function(){chDeg=-1;renderChords();};dg.appendChild(all);
  for(var j=0;j<7;j++){(function(j){var b=document.createElement('button');b.className='chip';b.innerHTML='<span class="ltr">'+names[j]+'</span>';b.setAttribute('aria-pressed',chDeg===j);b.onclick=function(){chDeg=j;renderChords();};dg.appendChild(b);})(j);}
  $('chlvhint').textContent=LVH[chLv];
  openChord=null;var box=$('chcards');box.innerHTML='';
  var types=chLv===5?CT.filter(function(t){return JZ7.indexOf(t.id)>=0||t.id==='dim7'||JZ9.indexOf(t.id)>=0||t.id==='m11';}):CT.filter(function(t){return t.lv===chLv;});
  var n=0;
  types.forEach(function(t){for(var j=0;j<7;j++){if(chDeg>=0&&j!==chDeg)continue;if(!diatonic(t,j))continue;
    var rp=(S.key+iv[j])%12;box.appendChild(chordCard(rp,t,{rootName:names[j],roman:romanFor(t,j),styles:chLv===5?jzStyles(t):['full']}));n++;}});
  if(!n){var e=document.createElement('p');e.className='hint';e.textContent='توی این سطح، آکوردی که کاملاً از نت‌های این اسکیل ساخته بشه برای این درجه وجود نداره. از «کاوشگر آکورد» پایین برای آکوردهای بیرون از اسکیل استفاده کن.';box.appendChild(e);}
  renderExplorer();
}
function renderExplorer(){
  var rs=$('cxroot'),ts=$('cxtype');
  if(!rs.options.length){KEYLAB.forEach(function(l,k){var o=document.createElement('option');o.value=k;o.textContent=l;rs.appendChild(o);});rs.value=S.key;
    [1,2,3,4].forEach(function(lv){var g=document.createElement('optgroup');g.label=LVN[lv];CT.filter(function(t){return t.lv===lv;}).forEach(function(t){var o=document.createElement('option');o.value=t.id;o.textContent=(t.sfx||'(ماژور)')+' — '+t.desc.split('؛')[0].split('.')[0];g.appendChild(o);});ts.appendChild(g);});
    ts.value='maj7';rs.onchange=function(){CXNAME=null;renderExplorer();};ts.onchange=renderExplorer;}
  var t=CTI[ts.value],rp=+rs.value,box=$('cxout');box.innerHTML='';
  var miv=MODES[S.mode].iv,mi=miv.indexOf((rp-S.key+12)%12),rname=(CXNAME&&CXNAME.pc===rp)?CXNAME.n:mi>=0?spell(miv)[mi]:(rp===S.key?RN():rootNameFor(rp,t));
  var styles=(JZ7.indexOf(t.id)>=0||t.id==='dim7'||JZ9.indexOf(t.id)>=0||t.id==='m11')?['full'].concat(jzStyles(t).filter(function(x){return x!=='full';})):['full'];
  box.appendChild(chordCard(rp,t,{fit:true,styles:styles,rootName:rname}));
}
