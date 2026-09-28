/* اتصال دکمه‌ها و میان‌برهای صفحه‌کلید ویرایشگر */
$('play').onclick=function(){playing?stop():start(false);};
$('loop').onclick=function(){S.loop=!S.loop;this.setAttribute('aria-pressed',S.loop);};
$('bpm').onchange=$('bpm').oninput=function(){var v=+this.value;if(!(v>=BPMMIN&&v<=BPMMAX)){if(this.value!==''&&arguments[0]&&arguments[0].type==='change'){v=bpmClamp(v);this.value=v;}else return;}S.bpm=v;$('bpmv').textContent=S.bpm;save();};
$('tone').onchange=function(){S.tone=this.value;setTone();save();};
$('copy').onclick=copyTab;$('gpx').onclick=gpExport;
$('wipe').onclick=function(){if(!hasRiff()){toast('ریف از قبل خالیه');return;}doClean({riff:true});};
$('onchg').value=PREF.onchg;$('onchg').onchange=function(){PREF.onchg=this.value;savePref();};
if($('cleanbtn'))$('cleanbtn').onclick=function(){var p=$('cleanpanel'),open=p.hidden;p.hidden=!open;this.setAttribute('aria-expanded',open);if(open)p.scrollIntoView({behavior:'smooth',block:'nearest'});};
$('cl-close').hidden=true;
$('cl-go').onclick=function(){var o={riff:$('cl-riff').checked,view:$('cl-view').checked,rz:$('cl-rz').checked,set:$('cl-set').checked};
  if(!o.riff&&!o.view&&!o.rz&&!o.set){toast('حداقل یک گزینه رو انتخاب کن');return;}doClean(o);};
$('cl-all').onclick=function(){doClean({riff:true,view:true,rz:true,set:true});};
document.querySelectorAll('#tools2 [data-d]').forEach(function(b){b.onclick=function(){setDur(b.getAttribute('data-d'));};});
document.querySelectorAll('#tools2 [data-t]').forEach(function(b){b.onclick=function(){toggleT(b.getAttribute('data-t'));};});
['lg','sin','sout','bt','harm'].forEach(function(f){document.querySelectorAll('#tools2 [data-'+f+']').forEach(function(b){b.onclick=function(){setField(f,b.getAttribute('data-'+f));};});});
$('tdot').onclick=toggleDot;$('ttri').onclick=toggleTri;
$('tchord').onclick=function(){S.chord=!S.chord;syncTools();toast(S.chord?'حالت آکورد: نت‌ها به همین خانه اضافه می‌شن؛ برای خانه‌ی بعد → رو بزن':'حالت تک‌نت');};
$('tpc').onclick=togglePC;$('tmaj').onclick=function(){barre(false);};$('tmin').onclick=function(){barre(true);};
$('trest').onclick=setRest;$('tdup').onclick=dupEv;$('tins').onclick=insEv;$('tdel').onclick=delEv;
$('bendamt').onchange=function(){var e=curEv();if(e&&e.bt){e.bend=+this.value;changed();auditionEv(e);}};
$('preset').onchange=function(){if(this.value){if(playing){stop();}loadPreset(this.value);}this.value='';};
$('snap').onchange=function(){S.snap=this.checked;};
$('deg').onchange=function(){S.deg=this.checked;refreshNeck();renderAnalysis();renderPatterns();};
$('listen').onchange=function(){S.listen=this.checked;};
document.addEventListener('keydown',function(e){
  var tg=e.target.tagName;if(tg==='INPUT'||tg==='SELECT'||tg==='TEXTAREA'||e.target.isContentEditable)return;
  if((e.ctrlKey||e.metaKey)&&!e.altKey){var kz=e.key.toLowerCase();if(kz==='z'&&!e.shiftKey){e.preventDefault();undo();return;}if(kz==='y'||(kz==='z'&&e.shiftKey)){e.preventDefault();redo();return;}}
  if(curPage!=='editor'){if(e.key===' '&&playing){e.preventDefault();stop();}return;}
  var k=e.key,kl=k.toLowerCase(),n=S.events.length;
  if(e.ctrlKey||e.metaKey){
    if(kl==='z'&&!e.shiftKey){e.preventDefault();undo();}
    else if(kl==='y'||(kl==='z'&&e.shiftKey)){e.preventDefault();redo();}
    else if(kl==='c'){e.preventDefault();copySel();}
    else if(kl==='v'){e.preventDefault();pasteClip();}
    else if(kl==='d'){e.preventDefault();dupSel();}
    return;}
  if(e.altKey)return;
  if(k===' '){e.preventDefault();playing?stop():start();}
  else if(k==='ArrowRight'||k==='ArrowLeft'){e.preventDefault();var d=k==='ArrowRight'?1:-1,ni=Math.max(0,Math.min(n,S.cur+d));
    if(e.shiftKey&&n){var a=S.sel?S.sel.anchor:Math.min(S.cur,n-1),j=Math.min(ni,n-1);S.sel={a:Math.min(a,j),b:Math.max(a,j),anchor:a};}else S.sel=null;
    S.cur=ni;changed(true);}
  else if(k==='ArrowUp'){e.preventDefault();S.cs=Math.max(0,S.cs-1);changed(true);}
  else if(k==='ArrowDown'){e.preventDefault();S.cs=Math.min(LOW,S.cs+1);changed(true);}
  else if(k>='0'&&k<='9'){e.preventDefault();typeFret(+k);}
  else if(k==='Delete'||k==='Backspace'){e.preventDefault();if(e.shiftKey||S.sel)delSel();else delNote();}
  else if(k==='Insert'){e.preventDefault();insEv();}
  else if(k==='Escape'){S.sel=null;changed(true);}
  else if(k==='+'||k==='='){e.preventDefault();stepDur(1);}
  else if(k==='-'||k==='_'){e.preventDefault();stepDur(-1);}
  else if(k==='.')toggleDot();
  else if(kl==='t')toggleTri();
  else if(kl==='c'){$('tchord').click();}
  else if(kl==='r')setRest();
  else if(kl==='p')toggleT('pm');
  else if(kl==='l')toggleT('ring');
  else if(kl==='g')toggleT('ghost');
  else if(kl==='h')setField('lg','h');
  else if(kl==='s')setField('lg','sl');
  else if(kl==='b')setField('bt','b');
  else if(kl==='v')toggleT('vib');
  else if(kl==='x')toggleT('dead');
});
(function(){
  // shortcuts popover
  var HELP=[['کلیک روی تب','انتخاب ضرب و سیم'],['0 تا 9','نوشتن فرت (دو رقم پشت هم تا ۲۴)'],['← →','ضرب قبل و بعد'],['↑ ↓','سیم بالا و پایین'],['Alt + ↑ ↓','یک فرت بالا یا پایین بردن نت'],['Shift + ← → یا کشیدن موس','انتخاب چند خانه'],['راست‌کلیک','منوی خانه'],['+ / -','کوتاه‌تر و بلندتر کردن نت'],['.','نقطه‌دار'],['T','تریوله'],['R','سکوت'],['C','حالت آکورد'],['Delete','حذف نت همین سیم'],['Shift + Delete','حذف خانه یا انتخاب'],['Insert','درج خانه'],['P · L · X · G','پالم‌میوت، لت رینگ، دد، گوست'],['H · S · B · V','هامر، اسلاید، بند، ویبراتو'],['Ctrl + Z / Y','برگشت و جلو'],['Ctrl + C / V / D','کپی، چسباندن، تکرار'],['Space','پخش از مکان‌نما'],['Esc','لغو انتخاب'],['Ctrl + K','جستجو در کل برنامه']];
  var hp=$('helppop');hp.innerHTML=HELP.map(function(h){return '<div><span>'+h[1]+'</span><kbd class="ltr">'+h[0]+'</kbd></div>';}).join('');
  $('helpbtn').onclick=function(){hp.hidden=!hp.hidden;this.setAttribute('aria-pressed',!hp.hidden);};
  // drag selection on the staff
  var drag=null;
  $('tab').addEventListener('pointerdown',function(e){var c=e.target.closest('.tc');if(!c||e.button!==0||e.shiftKey)return;var i=+c.dataset.i;if(i>=S.events.length)return;drag={a:i,moved:false};});
  $('tab').addEventListener('pointerover',function(e){if(!drag)return;var c=e.target.closest('.tc');if(!c)return;var i=Math.min(+c.dataset.i,S.events.length-1);if(i===drag.last)return;drag.last=i;
    if(i!==drag.a||drag.moved){drag.moved=true;S.sel={a:Math.min(drag.a,i),b:Math.max(drag.a,i),anchor:drag.a};S.cur=i;changed(true);}});
  document.addEventListener('pointerup',function(){if(drag&&drag.moved){DRAGSUP=true;setTimeout(function(){DRAGSUP=false;},80);}drag=null;});
  // context menu
  var cm=null;function closeCM(){if(cm){cm.remove();cm=null;}}
  $('tab').addEventListener('contextmenu',function(e){var c=e.target.closest('.tc');if(!c)return;e.preventDefault();closeCM();
    var i=+c.dataset.i;if(!(S.sel&&i>=S.sel.a&&i<=S.sel.b)){S.sel=null;S.cur=i;if(c.dataset.s!==undefined)S.cs=+c.dataset.s;changed(true);}
    cm=EL('div','cmenu');[['کپی','Ctrl+C',copySel],['چسباندن','Ctrl+V',pasteClip],['تکرار','Ctrl+D',dupSel],['درج خانه','Insert',insEv],['سکوت','R',setRest],['حذف','Shift+Del',function(){S.sel?delSel():delEv();}]].forEach(function(x){
      var b=EL('button','','<span>'+x[0]+'</span><kbd class="ltr">'+x[1]+'</kbd>');b.onclick=function(){closeCM();x[2]();};cm.appendChild(b);});
    document.body.appendChild(cm);var w=cm.offsetWidth||180,h=cm.offsetHeight||220;cm.style.left=Math.min(e.clientX,window.innerWidth-w-8)+'px';cm.style.top=Math.min(e.clientY,window.innerHeight-h-8)+'px';
    if(typeof I18N!=='undefined')I18N.apply(cm);});
  document.addEventListener('pointerdown',function(e){if(cm&&!cm.contains(e.target))closeCM();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeCM();});
  // Alt + arrows move note by a fret
  document.addEventListener('keydown',function(e){if(!e.altKey||(e.key!=='ArrowUp'&&e.key!=='ArrowDown')||curPage!=='editor')return;var tg=e.target.tagName;if(tg==='INPUT'||tg==='SELECT'||tg==='TEXTAREA')return;
    var ev=S.events[S.cur];if(!ev)return;var n=ev.notes.filter(function(x){return x.s===S.cs;})[0];if(!n)return;e.preventDefault();e.stopImmediatePropagation();
    var f=n.f+(e.key==='ArrowUp'?1:-1);if(f<0||f>NF)return;n.f=f;audition({t:'n',s:n.s,f:f,pc:false,pm:T(ev,'pm')});changed();},true);
})();
$('undo').onclick=undo;$('redo').onclick=redo;$('cpy').onclick=copySel;$('pst').onclick=pasteClip;$('dups').onclick=dupSel;$('delsel').onclick=delSel;
$('playstart').onclick=function(){if(playing)stop();S.sel=null;start(true);};
$('metro').onclick=function(){S.metro=!S.metro;this.setAttribute('aria-pressed',S.metro);};
$('countin').onclick=function(){S.countin=!S.countin;this.setAttribute('aria-pressed',S.countin);};
$('speed').onchange=function(){S.speed=+this.value;$('speedv').textContent=S.speed+'%';};
METERS.forEach(function(m){var o=document.createElement('option');o.value=m[0]+(m[2]?':'+m[2]:'');o.textContent=m[1];$('tsig').appendChild(o);});
$('tsig').onchange=function(){S.ts=parseTs(this.value);changed();};
$('follow').onclick=function(){FOLLOW=!FOLLOW;this.setAttribute('aria-pressed',FOLLOW);USCROLL=0;};
$('drums').onchange=function(){S.drums=this.value;save();};
