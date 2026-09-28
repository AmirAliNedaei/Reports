/* ویرایشگر تب: رندر تب و نت‌نویسی ریتم */
/* ---------- tab ---------- */
var BAMT={1:'½',2:'1',3:'1½',4:'2'};
function techLabel(e,next){
  if(!e||e.rest)return '';var p=[];
  if(T(e,'pm'))p.push('PM');if(T(e,'ring'))p.push('LR');if(T(e,'tie'))p.push('⌒');
  if(e.sin)p.push(e.sin==='b'?'/':'\\');
  if(e.lg==='h'){var n=e.notes[0],nn=next&&!next.rest?(next.notes.filter(function(x){return x.s===n.s;})[0]||next.notes[0]):null;
    p.push(nn&&midiAt(nn.s,nn.f)<midiAt(n.s,n.f)?'P':'H');}
  else if(e.lg==='sl')p.push('sl');else if(e.lg==='ss')p.push('S');
  if(e.sout)p.push(e.sout==='d'?'\\':'/');
  if(e.bt)p.push((e.bt==='b'?'b':e.bt==='br'?'br':'pb')+BAMT[e.bend||2]);
  if(T(e,'vib'))p.push('~');if(T(e,'trem'))p.push('≡');if(T(e,'acc'))p.push('>');if(T(e,'stac'))p.push('·');
  if(T(e,'tap'))p.push('T');if(e.harm==='nh')p.push('NH');if(e.harm==='ah')p.push('PH');
  return p.join(' ');}
function durLabel(e){return DFR[e.d]+(e.dot?'.':'')+(e.tri?'³':'')+(e.rest?' r':'');}
function noteText(e,s){
  if(e.rest)return {t:s===2?'r':''};
  var n=e.notes.filter(function(x){return x.s===s;})[0];if(!n)return {t:''};
  var f=String(n.f),t=T(e,'dead')?'x':T(e,'ghost')?'('+f+')':e.harm==='nh'?'<'+f+'>':f;
  return {t:t,bad:!T(e,'dead')&&!inScale(e.harm==='nh'?harmPitch(n):midiAt(n.s,n.f)),tied:T(e,'tie')};}
function evWidth(e){return Math.round(Math.max(34,Math.min(84,22+ticks(e)*0.4)));}
var BEAMN={'8':1,'16':2,'32':3};
function rhythmSVG(E,i,st,w){
  var e=E[i],cx=w/2,h='<svg viewBox="0 0 '+w+' 28" preserveAspectRatio="none" aria-hidden="true">',sk='stroke="var(--muted)" stroke-width="1.3" fill="none"';
  if(e.rest){
    if(e.d==='w'||e.d==='h')h+='<rect x="'+(cx-5)+'" y="'+(e.d==='w'?8:11)+'" width="10" height="3" fill="var(--muted)"/>';
    else if(e.d==='q')h+='<path d="M'+(cx-2)+' 4 L'+(cx+3)+' 10 L'+(cx-2)+' 15 L'+(cx+3)+' 21 Q'+(cx-4)+' 18 '+(cx)+' 25" '+sk+'/>';
    else{var nb=BEAMN[e.d]||1;for(var k=0;k<nb;k++)h+='<circle cx="'+(cx-2)+'" cy="'+(7+k*5)+'" r="1.8" fill="var(--muted)"/>';h+='<path d="M'+(cx-2)+' '+(7)+' L'+(cx+3)+' 6 L'+(cx-1)+' '+(12+nb*5)+'" '+sk+'/>';}
  }else{
    var n=BEAMN[e.d]||0,G=beamG(),BT=barT();
    function bm(j){var x=E[j];return x&&!x.rest&&BEAMN[x.d]&&grpIdx(STARTS[j])===grpIdx(STARTS[i]);}
    if(e.d==='w')h+='<ellipse cx="'+cx+'" cy="14" rx="4.5" ry="3" '+sk+'/>';
    else{h+='<line x1="'+cx+'" y1="2" x2="'+cx+'" y2="24" '+sk+'/>';
      if(e.d==='h')h+='<ellipse cx="'+cx+'" cy="24" rx="3.5" ry="2.4" '+sk+' />';
      if(n){var pv=bm(i-1)?BEAMN[E[i-1].d]:0,nx=bm(i+1)?BEAMN[E[i+1].d]:0;
        for(var k2=0;k2<n;k2++){var y=24-k2*4;
          if(k2<pv)h+='<line x1="0" y1="'+y+'" x2="'+cx+'" y2="'+y+'" stroke="var(--muted)" stroke-width="2.4"/>';
          if(k2<nx)h+='<line x1="'+cx+'" y1="'+y+'" x2="'+w+'" y2="'+y+'" stroke="var(--muted)" stroke-width="2.4"/>';
          if(!pv&&!nx)h+='<line x1="'+cx+'" y1="'+y+'" x2="'+(cx+7)+'" y2="'+(y-6)+'" stroke="var(--muted)" stroke-width="1.8"/>';
          else if(k2>=pv&&k2>=nx)h+='<line x1="'+cx+'" y1="'+y+'" x2="'+(nx?cx+6:cx-6)+'" y2="'+y+'" stroke="var(--muted)" stroke-width="2.4"/>';}}}
    if(e.dot)h+='<circle cx="'+(cx+5)+'" cy="21" r="1.7" fill="var(--muted)"/>';
    if(e.tri)h+='<text x="'+(cx+4)+'" y="9" font-size="9" fill="var(--frost)" font-weight="700">3</text>';
  }
  return h+'</svg>';
}
function buildTab(){
  var tb=$('tab'),E=S.events,st=computeStarts(),BT=barT(),tot=st[E.length];tb.innerHTML='';
  var meas=[];for(var i=0;i<=E.length;i++){var m=Math.floor((i<E.length?st[i]:tot)/BT+1e-9);if(i===E.length&&E.length&&tot%BT===0)m=Math.floor(tot/BT);(meas[m]=meas[m]||[]).push(i);}
  var ms=[];meas.forEach(function(a,m){if(a)ms.push({m:m,beats:a});});
  var W=function(i){return i<E.length?evWidth(E[i]):36;};
  var avail=Math.max(300,(tb.clientWidth||900)-40),rows=[],cur=[],cw=0;
  ms.forEach(function(M){var mw=M.beats.reduce(function(a,i){return a+W(i);},0);if(cur.length&&cw+mw>avail){rows.push(cur);cur=[];cw=0;}cur.push(M);cw+=mw;});
  if(cur.length)rows.push(cur);
  var selA=S.sel?S.sel.a:-1,selB=S.sel?S.sel.b:-2;
  rows.forEach(function(row,ri){
    var beats=[];row.forEach(function(M){M.beats.forEach(function(i,k){beats.push({i:i,first:k===0,m:M.m});});});
    var rw=beats.reduce(function(a,b){return a+W(b.i);},0),last=ri===rows.length-1,fac=Math.max(1,Math.min(last&&rows.length>1?1.35:2.2,avail/Math.max(1,rw)));
    var g=document.createElement('div');g.className='trow';g.style.gridTemplateColumns='30px '+beats.map(function(b){return Math.floor(W(b.i)*fac)+'px';}).join(' ');
    ['mn','tq'].concat((function(){var a=[];for(var q=0;q<NS;q++)a.push('s'+q);return a;})(),['rh']).forEach(function(r){
      var lab=document.createElement('div');lab.className='tl'+(r==='rh'?' rh':r==='mn'?' mn':'');lab.textContent=r[0]==='s'?SNAME[+r[1]]:'';g.appendChild(lab);
      beats.forEach(function(b,bi){
        var i=b.i,e=E[i],d=document.createElement('div'),sp=document.createElement('span');
        var cls='tc'+(r==='tq'?' tq':r==='rh'?' rh':r==='mn'?' mn':'')+(b.first?' bl':(i<E.length&&st[i]%beatT()===0?' beat':''))+(i===E.length?' app':'')+(bi===beats.length-1?' rend':'')+(i===S.cur?' cur':'')+(i>=selA&&i<=selB?' sel':'');
        if(r[0]==='s'&&r.length===2&&i===S.cur&&+r[1]===S.cs)cls+=' curs';
        d.className=cls;d.dataset.i=i;if(r[0]==='s'&&r.length===2)d.dataset.s=r[1];
        if(i<E.length){
          if(r==='mn'){if(b.first){var full=M_fill(b.m);sp.textContent=fa(b.m+1)+(full?'':' !');if(!full){d.classList.add('warn');d.title='این میزان با خط میزان هم‌خوانی نداره (یک نت از خط میزان رد می‌شه یا میزان ناقصه)';}}}
          else if(r==='tq')sp.textContent=techLabel(e,E[i+1]);
          else if(r==='rh'){d.innerHTML=rhythmSVG(E,i,st,W(i));if(Math.floor(st[i]/BT)!==Math.floor((st[i+1]-1)/BT)){d.classList.add('cross');d.title='این نت از خط میزان رد می‌شه';}d.onclick=cellClick;g.appendChild(d);return;}
          else{var nt=noteText(e,+r[1]);sp.textContent=nt.t;if(nt.bad)d.classList.add('badn');if(nt.tied)d.classList.add('tied');}
        }else{if(r==='mn'&&b.first)sp.textContent=fa(b.m+1);if(r==='s'+S.cs)sp.textContent='+';}
        d.appendChild(sp);d.onclick=cellClick;g.appendChild(d);
      });
    });
    tb.appendChild(g);
  });
  function M_fill(m){var sum=0;E.forEach(function(e,i){if(Math.floor(st[i]/BT+1e-9)===m)sum+=ticks(e);});var last=Math.floor((tot-1)/BT);return m===last?sum<=BT:Math.abs(sum-BT)<1e-6;}
  renderStatus();
}
var DRAGSUP=false;
function cellClick(ev){var d=ev.currentTarget,i=+d.dataset.i;if(DRAGSUP){DRAGSUP=false;return;}
  if(ev.shiftKey&&S.events.length){var a=S.sel?S.sel.anchor:Math.min(S.cur,S.events.length-1),j=Math.min(i,S.events.length-1);S.sel={a:Math.min(a,j),b:Math.max(a,j),anchor:a};}
  else S.sel=null;
  S.cur=i;if(d.dataset.s!==undefined)S.cs=+d.dataset.s;changed(true);}
function renderStatus(){
  var E=S.events,st=STARTS.length===E.length+1?STARTS:computeStarts(),BT=barT(),i=S.cur,e=E[i],tot=st[E.length];
  var pos=i<E.length?st[i]:tot,m=Math.floor(pos/BT)+1,bt=(pos%BT)/beatT()+1;
  var h='<span>میزان <b>'+fa(m)+'</b>، ضرب <b>'+fa(Math.round(bt*100)/100)+'</b></span><span>سیم <b>'+fa(S.cs+1)+'</b> <span class="ltr">('+SNAME[S.cs]+')</span></span>';
  if(e){var n=e.notes.filter(function(x){return x.s===S.cs;})[0];
    h+='<span>طول: <b class="ltr">'+DFR[e.d]+(e.dot?'.':'')+(e.tri?' ³':'')+'</b></span>';
    h+=e.rest?'<span>سکوت</span>':n?'<span>نت: <b class="ltr">'+label(midiAt(n.s,n.f))+'</b> (فرت '+fa(n.f)+')</span>':'<span>روی این سیم نتی نیست</span>';
    if(e.notes.length>1)h+='<span>آکورد '+fa(e.notes.length)+' نتی</span>';}
  else h+='<span>خانه‌ی جدید: عدد فرت رو تایپ کن یا روی دسته کلیک کن</span>';
  if(S.sel)h+='<span>انتخاب: <b>'+fa(S.sel.b-S.sel.a+1)+'</b> خانه (پخش و تکرار فقط روی همین بخش)</span>';
  h+='<span id="lenv">'+(E.length?fa(E.length)+' خانه، '+fa(Math.ceil(tot/BT))+' میزان '+S.ts.n+'/'+S.ts.d:'ریف خالیه')+'</span>';
  $('rstat').innerHTML=h;
}
var _rsz;window.addEventListener('resize',function(){clearTimeout(_rsz);_rsz=setTimeout(buildTab,150);});
function refreshTab(){buildTab();}
