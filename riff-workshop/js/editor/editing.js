/* ویرایش: undo/redo، کلیپ‌بورد، ابزار دیرش و تکنیک‌ها، کپی تب */
/* ---------- UI glue ---------- */
function renderModes(){
  var box=$('modes');box.innerHTML='';
  ORDER.forEach(function(k){var b=document.createElement('button');b.className='chip';b.setAttribute('aria-pressed',k===S.mode);
    b.innerHTML='<span class="ltr">'+SHORT[k]+'</span>'+(k==='aeo'?'<small>(مینور طبیعی)</small>':'');
    b.onclick=function(){setMode(k);};box.appendChild(b);});
  var m=MODES[S.mode];$('mname').textContent=MN();if($('keypilltxt'))$('keypilltxt').textContent=MN();if(typeof renderBank==='function'&&$('style')){renderBank();renderPatterns();renderChords();if(typeof spRender==='function'&&SPT){spRender();impRender();earRender();if(typeof guideRender==='function'&&typeof MG!=='undefined'){guideRender();bandRender();}if(FQ&&!FQ.on)fqPaint();}}$('mmood').textContent=m.mood;
  $('mnotes').textContent=spell(m.iv).join(' ')+'   |   '+dlab(m.iv).join(' ');
}
var UNDO=[],REDO=[],lastJ=null,undoing=false,CLIP=null,typeBuf=null,typeT=0;
function changed(onlyCursor){
  if(S.cur>S.events.length)S.cur=S.events.length;
  if(S.sel&&(S.sel.b>=S.events.length))S.sel=null;
  if(!onlyCursor){var j=JSON.stringify(S.events);if(lastJ!==null&&j!==lastJ&&!undoing){UNDO.push(lastJ);if(UNDO.length>200)UNDO.shift();REDO=[];}lastJ=j;}
  refreshTab();refreshNeck();syncTools();if(!onlyCursor){renderAnalysis();save();}
  if($('undo')){$('undo').disabled=!UNDO.length;$('redo').disabled=!REDO.length;}if($('gundo'))$('gundo').disabled=!UNDO.length;}
function undo(){if(!UNDO.length){toast('چیزی برای برگشت نیست');return;}REDO.push(JSON.stringify(S.events));var j=UNDO.pop();S.events=JSON.parse(j).map(fixEv);lastJ=JSON.stringify(S.events);S.sel=null;undoing=true;changed();undoing=false;if(curPage!=='editor')toast('آخرین تغییر ریف برگشت داده شد');}
function redo(){if(!REDO.length){toast('چیزی برای جلو رفتن نیست');return;}UNDO.push(JSON.stringify(S.events));var j=REDO.pop();S.events=JSON.parse(j).map(fixEv);lastJ=JSON.stringify(S.events);S.sel=null;undoing=true;changed();undoing=false;}
function selRange(){if(S.sel)return [S.sel.a,S.sel.b];if(S.cur<S.events.length)return [S.cur,S.cur];return null;}
function copySel(){var r=selRange();if(!r){toast('خانه‌ای انتخاب نشده');return;}CLIP=JSON.stringify(S.events.slice(r[0],r[1]+1));toast('کپی شد: '+fa(r[1]-r[0]+1)+' خانه');}
function pasteClip(){if(!CLIP){toast('اول چیزی کپی کن');return;}var a=JSON.parse(CLIP).map(fixEv);S.events.splice.apply(S.events,[S.cur,0].concat(a));S.sel={a:S.cur,b:S.cur+a.length-1,anchor:S.cur};S.cur+=a.length;changed();toast('چسبانده شد: '+fa(a.length)+' خانه');}
function dupSel(){var r=selRange();if(!r){toast('خانه‌ای انتخاب نشده');return;}var a=JSON.parse(JSON.stringify(S.events.slice(r[0],r[1]+1))).map(fixEv);S.events.splice.apply(S.events,[r[1]+1,0].concat(a));S.sel={a:r[1]+1,b:r[1]+a.length,anchor:r[1]+1};S.cur=r[1]+1;changed();}
function delSel(){var r=selRange();if(!r)return;S.events.splice(r[0],r[1]-r[0]+1);S.cur=r[0];S.sel=null;changed();}
function typeFret(dg){
  var now=Date.now(),f=dg,combined=false;
  if(typeBuf&&typeBuf.i===S.cur&&typeBuf.s===S.cs&&now-typeT<800){var f2=typeBuf.v*10+dg;if(f2<=NF){f=f2;combined=true;}}
  var m=midiAt(S.cs,f);
  if(S.snap&&!inScale(m)){toast(PCN[m%12]+' داخل '+SHORT[S.mode]+' نیست');return;}
  var E=S.events,ev=E[S.cur];if(!ev){ev=newEv([]);E.push(ev);S.cur=E.length-1;}
  ev.rest=false;ev.notes=ev.notes.filter(function(n){return n.s!==S.cs;});ev.notes.push({s:S.cs,f:f});ev.notes.sort(function(a,b){return b.s-a.s;});delete ev.t.tie;
  typeBuf=(!combined&&(f===1||f===2))?{v:f,i:S.cur,s:S.cs}:null;typeT=now;
  audition({t:'n',s:S.cs,f:f,pc:false,pm:T(ev,'pm')});changed();}
function delNote(){var ev=S.events[S.cur];if(!ev)return;var had=ev.notes.length;ev.notes=ev.notes.filter(function(n){return n.s!==S.cs;});
  if(ev.notes.length===had){toast('روی این سیم نتی نیست؛ برای حذف کل خانه Shift+Delete');return;}if(!ev.notes.length){ev.rest=true;ev.t={};}changed();}
function stepDur(dir){var e=curEv(),c=(e||S.nd).d,k=DORDER.indexOf(c)+dir;if(k<0||k>=DORDER.length)return;setDur(DORDER[k]);}
function parseTs(v){var pr=String(v||'4/4').split(':'),m=pr[0].split('/');var n=+m[0],d=+m[1];if(!(n>0&&(d===4||d===8)))return {n:4,d:4};var o={n:n,d:d};if(pr[1]){var g=pr[1].split('+').map(Number);if(g.reduce(function(a,b){return a+b;},0)===n)o.g=g;}return o;}
var tt;function toast(msg){var t=$('toast');t.classList.remove('act');t.textContent=msg;t.classList.add('show');clearTimeout(tt);tt=setTimeout(function(){t.classList.remove('show');},1800);}
function curEv(){return S.events[S.cur]||null;}
function needEv(){var e=curEv();if(!e||e.rest||!e.notes.length){toast('اول یک نت در این خانه بنویس');return null;}return e;}
function syncTools(){
  var e=curEv(),src=e||S.nd;
  document.querySelectorAll('#tools2 [data-d]').forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-d')===src.d);});
  $('tdot').setAttribute('aria-pressed',!!src.dot);$('ttri').setAttribute('aria-pressed',!!src.tri);$('tchord').setAttribute('aria-pressed',!!S.chord);
  var live=e&&!e.rest;
  document.querySelectorAll('#tools2 [data-t]').forEach(function(b){b.setAttribute('aria-pressed',!!(live&&T(e,b.getAttribute('data-t'))));});
  ['lg','sin','sout','bt','harm'].forEach(function(f){document.querySelectorAll('#tools2 [data-'+f+']').forEach(function(b){b.setAttribute('aria-pressed',!!(live&&e[f]===b.getAttribute('data-'+f)));});});
  if(live&&e.bt)$('bendamt').value=String(e.bend||2);
  var pcOn=false;if(live&&e.notes.length>=3){var lo=e.notes[0];pcOn=e.notes.some(function(n){return n.s===lo.s-1;})&&e.notes.some(function(n){return n.s===lo.s-2;});}
  $('tpc').setAttribute('aria-pressed',pcOn);
  $('trest').setAttribute('aria-pressed',!!(e&&e.rest));
}
function setDur(d){S.nd.d=d;var e=curEv();if(e)e.d=d;changed(!e);}
function toggleDot(){var e=curEv();S.nd.dot=e?!e.dot:!S.nd.dot;if(e)e.dot=S.nd.dot;changed(!e);}
function toggleTri(){var e=curEv();S.nd.tri=e?!e.tri:!S.nd.tri;if(e)e.tri=S.nd.tri;changed(!e);}
function toggleT(k){var e=needEv();if(!e)return;
  if(k==='tie'){var prev=S.events[S.cur-1];if(!e.t.tie){if(!prev||prev.rest){toast('تای به نت قبلی وصل می‌شه؛ خانه‌ی قبل نت نداره');return;}e.notes=prev.notes.map(function(n){return {s:n.s,f:n.f};});}}
  e.t[k]=!e.t[k];if(k==='dead'&&e.t.dead)e.harm='';changed();if(k!=='tie')auditionEv(e);}
function setField(f,v){var e=needEv();if(!e)return;e[f]=e[f]===v?'':v;
  if(f==='bt'&&e.bt)e.bend=+$('bendamt').value;
  if(f==='harm'&&e.harm)e.t.dead=false;
  if(f==='lg'&&e.lg&&!S.events[S.cur+1])toast('این تکنیک به نت بعدی وصل می‌شه؛ خانه‌ی بعد رو هم بنویس');
  changed();auditionEv(e);}
function togglePC(){var e=needEv();if(!e)return;var lo=e.notes[0];
  if(lo.s<2){toast('پاورکورد رو روی یکی از سه سیم بم بساز');return;}
  var m=midiAt(lo.s,lo.f),a={s:lo.s-1,f:m+7-OPEN[lo.s-1]},b={s:lo.s-2,f:m+12-OPEN[lo.s-2]};
  var has=e.notes.some(function(n){return n.s===a.s&&n.f===a.f;})&&e.notes.some(function(n){return n.s===b.s&&n.f===b.f;});
  if(has)e.notes=[lo];else{if(a.f>NF||b.f>NF){toast('این پاورکورد از فرت ۲۴ بیرون می‌زنه');return;}e.notes=[lo,a,b];}
  changed();auditionEv(e);}
function barre(minor){var e=needEv();if(!e)return;var lo=e.notes[0],f=lo.f,sh;
  if(lo.s===5)sh=minor?[[5,f],[4,f+2],[3,f+2],[2,f],[1,f],[0,f]]:[[5,f],[4,f+2],[3,f+2],[2,f+1],[1,f],[0,f]];
  else if(lo.s===4)sh=minor?[[4,f],[3,f+2],[2,f+2],[1,f+1],[0,f]]:[[4,f],[3,f+2],[2,f+2],[1,f+2],[0,f]];
  else{toast('ریشه‌ی آکورد رو روی سیم ۶ یا ۵ بذار');return;}
  if(sh.some(function(x){return x[1]>NF;})){toast('این آکورد از فرت ۲۴ بیرون می‌زنه');return;}
  e.notes=sh.map(function(x){return {s:x[0],f:x[1]};});changed();auditionEv(e);}
function setRest(){var e=curEv();if(e){e.rest=true;e.notes=[];e.t={};e.lg=e.sin=e.sout=e.bt=e.harm='';}else S.events.push(newEv(null));S.cur=Math.min(S.events.length,S.cur+1);changed();}
function dupEv(){var e=curEv();if(!e){toast('یک خانه رو انتخاب کن');return;}var c=JSON.parse(JSON.stringify(e));S.events.splice(S.cur+1,0,c);S.cur++;changed();}
function insEv(){S.events.splice(S.cur,0,newEv(null));changed();}
function delEv(){if(!curEv())return;S.events.splice(S.cur,1);S.cur=Math.min(S.cur,S.events.length);changed();}
function tabText(){
  var E=S.events,tl='   ',dl='   ',lines=SNAME.map(function(n,s){return ((s===0?'c#':n)+'  ').slice(0,2)+'|';}),tk=0;
  E.forEach(function(e,i){
    if(i>0&&tk%barT()===0){lines=lines.map(function(l){return l+'|';});tl+=' ';dl+=' ';}
    tk+=ticks(e);
    var cells=[0,1,2,3,4,5].map(function(s){var t=noteText(e,s).t;return t==='r'?'':t;});
    var tq=techLabel(e,E[i+1]).replace(/ /g,''),du=DASC[e.d]+(e.dot?'.':'')+(e.tri?'3':'')+(e.rest?'r':'');
    var w=Math.max(1,tq.length,du.length,Math.max.apply(null,cells.map(function(c){return c.length;})));
    lines=lines.map(function(l,s){return l+(cells[s]+'-'.repeat(w)).slice(0,w)+'-';});
    tl+=(tq+' '.repeat(w)).slice(0,w)+' ';dl+=(du+' '.repeat(w)).slice(0,w)+' ';
  });
  return 'Riff in '+MN()+' (C# standard tuning, '+S.bpm+' bpm, '+S.ts.n+'/'+S.ts.d+')\n'+
    'Rhythm: w=1 h=1/2 q=1/4 e=1/8 s=1/16 t=1/32, .=dotted, 3=triplet, r=rest\n'+
    'PM=palm mute LR=let ring H/P=hammer/pull sl=slide S=shift slide b/br/pb=bend ~=vibrato x=dead ()=ghost <>=harmonic PH=pinch T=tap ≡=tremolo >=accent ·=staccato ⌒=tie\n\n'+
    tl+'\n'+lines.join('\n')+'\n'+dl;
}
function copyTab(){var t=tabText();
  function ok(){toast('تب کپی شد');}
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(ok,fallback);}else fallback();
  function fallback(){var ta=document.createElement('textarea');ta.value=t;ta.style.position='absolute';ta.style.left='-9999px';document.body.appendChild(ta);ta.select();
    try{document.execCommand('copy');ok();}catch(e){toast('کپی نشد');}document.body.removeChild(ta);}
}
