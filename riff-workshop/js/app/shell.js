/* پوسته‌ی برنامه و روتر صفحه‌ها، تنظیمات، تم */
/* ---------- app shell & router ---------- */
var PAGES=[
 {id:'home',g:'امروز',t:'تمرین امروز',d:'مسیر روزانه، هدف‌ها و پیشرفت تو.',ic:'⌂',secs:['homebox']},
 {id:'speed',g:'تمرین',t:'تمرین سرعت',d:'نردبان تمپو با هفت تکنیک، در کلید و مُد خودت.',ic:'⚡',secs:['spbox']},
 {id:'fq',g:'تمرین',t:'دسته‌شناسی',d:'همه‌ی نت‌های دسته رو بشناس؛ با نقشه‌ی نت‌هایی که هنوز اشتباه می‌کنی.',ic:'◎',secs:['fqbox']},
 {id:'rt',g:'تمرین',t:'تمرین ریتم',d:'الگو رو بشنو و همراهش ضربه بزن؛ دقتت تا میلی‌ثانیه سنجیده می‌شه.',ic:'▦',secs:['rtbox']},
 {id:'ear',g:'تمرین',t:'تمرین گوش',d:'بشنو و اسمش رو بگو: فاصله، آکورد، درجه، مُد و پیشرفت.',ic:'◐',secs:['earbox']},
 {id:'sight',g:'تمرین',t:'نت‌خوانی',d:'خوندن نت روی حامل، یکی یکی تا وقتی آنی بشه.',ic:'♩',secs:['sightbox']},
 {id:'neck',g:'کاوش',t:'دسته و الگوها',d:'اسکیل فعلی روی کل دسته و الگوهای اجرایی‌اش.',ic:'▤',secs:['neck','pats']},
 {id:'scl',g:'کاوش',t:'کتابخانه‌ی اسکیل',d:'۴۱ اسکیل در ۱۲ کلید، روی دسته و با صدا.',ic:'△',secs:['sclbox']},
 {id:'chords',g:'کاوش',t:'آکوردها',d:'آکوردهای اسکیل از ساده تا پیچیده، با صدابندی‌ها و کاوشگر.',ic:'◆',secs:['chcards']},
 {id:'bank',g:'کاوش',t:'پیشرفت‌های آکورد',d:'پیشرفت‌های سبک برای هر مُد؛ بشنو و ازشون ریف بساز.',ic:'≡',secs:['bank']},
 {id:'odd',g:'کاوش',t:'میزان‌های لنگ',d:'۳۶ کسر لنگ از ۵/۱۶ تا ۲۳/۸، هر گروه‌بندی با ۸ الگوی گیتار، درام، شمارنده‌ی زنده و بررسی ریف تو.',ic:'⅞',secs:['oddbox']},
 {id:'guide',g:'کاوش',t:'راهنمای مُدها',d:'چی ریفت رو دقیقاً در یک مُد نگه می‌داره و با بقیه قاطیش نمی‌کنه.',ic:'☠',secs:['guidebox']},
 {id:'imp',g:'کاوش',t:'بداهه‌نوازی',d:'روی پیشرفت بنواز؛ نت‌های هدف هر آکورد روشن می‌شن.',ic:'↗',secs:['impbox']},
 {id:'editor',g:'ساختن',t:'ویرایشگر تب',d:'ریف بنویس، بشنو و ببین چقدر با مُدت جوره.',ic:'✎',secs:['tab','checks']},
 {id:'lib',g:'ساختن',t:'ریف‌های من',d:'ریف‌های ذخیره‌شده، نمونه‌ها و درس‌ها.',ic:'▶',secs:['lib']},
 {id:'bands',g:'ساختن',t:'به سبک بندها',d:'تکنیک‌ها، حال‌وهوا و تنظیمات برای ساختن ریف به سبک بندهای ملودیک دث، تکنیکال و دووم.',ic:'🤘',secs:['bandbox']},
 {id:'rz',g:'ساختن',t:'تشخیص اسکیل',d:'نت‌ها رو بده تا اسکیلش رو پیدا کنم.',ic:'⌕',secs:['rzout']},
 {id:'settings',g:'',t:'تنظیمات',d:'زبان، ظاهر، رفتار کلید و پاک‌سازی.',ic:'⚙',secs:['setbox','cleanpanel']}];
var SEC2PAGE={home:'home',speed:'speed',fq:'fq',rt:'rt',ear:'ear',sight:'sight',neck:'neck',pats:'neck',scl:'scl',chords:'chords',bank:'bank',imp:'imp',odd:'odd',guide:'guide',bands:'bands',riff:'editor',an:'editor',lib:'lib',rz:'rz',key:'neck'};
var curPage='home',PGKEY='riff-workshop-page';
try{var _pg=localStorage.getItem(PGKEY);if(_pg&&PAGES.some(function(x){return x.id===_pg;}))curPage=_pg;}catch(e){}
function goSec(k){goPage(SEC2PAGE[k]||k);}
function secOf(k){var pg=document.querySelector('.page[data-page="'+(SEC2PAGE[k]||k)+'"]');return pg;}
function openSec(k){goSec(k);}
function goPage(id){
  var P1=PAGES.filter(function(x){return x.id===id;})[0];if(!P1)return;
  if(id!==curPage){lpStop();if(RT.on)rtStop();if(FQ.on)fqEnd();}
  curPage=id;try{localStorage.setItem(PGKEY,id);}catch(e){}
  document.querySelectorAll('.page').forEach(function(pg){pg.classList.toggle('on',pg.getAttribute('data-page')===id);});
  document.querySelectorAll('.nitem').forEach(function(b){if(b.getAttribute('data-page')===id)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});
  $('ptitle').textContent=P1.t;$('pdesc').textContent=P1.d;$('pgroup').textContent=P1.g;
  closeNav();closeKeyPop();window.scrollTo(0,0);
  if(id==='home')renderHome();
  if(id==='editor'){buildTab();refreshNeck();}
  if(id==='lib')renderPresetCards();
  if(typeof I18N!=='undefined')I18N.apply(document.body);
}
function reveal(el,block){var pg=el.closest('.page');if(pg&&pg.getAttribute('data-page')!==curPage)goPage(pg.getAttribute('data-page'));
  setTimeout(function(){el.scrollIntoView({behavior:'smooth',block:block||'center'});},40);}
function closeNav(){$('snav').classList.remove('open');$('scrim').classList.remove('on');}
function closeKeyPop(){$('keypop').hidden=true;$('keypill').setAttribute('aria-expanded','false');}
function renderPresetCards(){var box=$('presetcards');if(!box)return;box.innerHTML='';
  var items=[];Array.prototype.forEach.call($('preset').options,function(o){items.push({k:o.value,n:o.textContent,d:'نمونه'});});
  Object.keys(LESSONS).forEach(function(k){items.push({k:k,n:LESSONS[k].name,d:'درس'});});
  items.forEach(function(it){var c=EL('div','pcard');c.appendChild(EL('div','kick',it.d));c.appendChild(EL('div','feel',it.n));
    var r=EL('div','row');var b1=EL('button','btn primary','باز کردن در ویرایشگر');b1.onclick=function(){if(playing)stop();loadPreset(it.k);goPage('editor');};
    var b2=EL('button','btn','بشنو');b2.onclick=function(){if(playing)stop();loadPreset(it.k);goPage('editor');setTimeout(function(){start(true);},60);};
    r.appendChild(b1);r.appendChild(b2);c.appendChild(r);box.appendChild(c);});}
(function(){
  // settings box
  var sb=EL('section','panel');sb.innerHTML='<div id="setbox">'+
    '<div class="setrow"><label class="ctl">زبان <select id="setlang"><option value="fa">فارسی</option><option value="en">English</option></select></label>'+
    '<label class="ctl">ظاهر <select id="settheme"><option value="auto">خودکار</option><option value="light">روشن</option><option value="dark">تیره</option></select></label></div>'+
    '<div class="setrow" id="onchgslot"></div>'+
    '<p class="credit">صداهای گیتار: نمونه‌های واقعی از بانک‌های آزاد MusyngKite و FluidR3 (نسخه‌ی gleitz/midi-js-soundfonts).</p></div>';
  var pages=$('pages');pages.insertBefore(sb,pages.firstChild);
  var oc=$('onchg').closest('label');oc.style.margin='0';$('onchgslot').appendChild(oc);
  // key popover
  var keySec=$('keys').closest('section');$('keypop').appendChild(keySec);
  // build pages
  PAGES.forEach(function(P1){var pg=EL('div','page');pg.setAttribute('data-page',P1.id);
    P1.secs.forEach(function(id,i){var el=$(id);if(!el)return;var sc=el.tagName==='SECTION'?el:el.closest('section');if(!sc)return;
      if(i===0){var h=sc.querySelector('h2');if(h&&!sc.classList.contains('editor'))h.classList.add('phide');}
      pg.appendChild(sc);});
    pages.appendChild(pg);});
  // leftover sections (none expected) stay hidden
  Array.prototype.forEach.call(pages.children,function(c){if(!c.classList.contains('page'))c.style.display='none';});
  // foldable analysis
  var an=$('checks').closest('section'),ah=an.querySelector('h2');ah.classList.add('foldh');
  try{if(localStorage.getItem('riff-workshop-anfold')==='1')an.classList.add('folded');}catch(e){}
  ah.onclick=function(){an.classList.toggle('folded');try{localStorage.setItem('riff-workshop-anfold',an.classList.contains('folded')?'1':'0');}catch(e){}};
  // nav
  var nav=$('navlist'),grp=null;
  PAGES.forEach(function(P1){if(!P1.g){return;}if(P1.g!==grp){grp=P1.g;nav.appendChild(EL('div','ngrp',grp));}
    var b=EL('button','nitem','<span class="ic" aria-hidden="true">'+P1.ic+'</span><span class="nt">'+P1.t+'</span>');b.setAttribute('data-page',P1.id);b.onclick=function(){goPage(P1.id);};nav.appendChild(b);});
  var st=PAGES.filter(function(x){return x.id==='settings';})[0],sbtn=EL('button','nitem','<span class="ic" aria-hidden="true">'+st.ic+'</span><span class="nt">'+st.t+'</span>');sbtn.setAttribute('data-page','settings');sbtn.onclick=function(){goPage('settings');};$('navfoot').appendChild(sbtn);
  $('menubtn').onclick=function(){$('snav').classList.add('open');$('scrim').classList.add('on');};$('scrim').onclick=closeNav;
  $('keypill').onclick=function(e){e.stopPropagation();var kp=$('keypop'),open=kp.hidden;kp.hidden=!open;this.setAttribute('aria-expanded',open);};
  document.addEventListener('pointerdown',function(e){var kp=$('keypop');if(!kp.hidden&&!kp.contains(e.target)&&e.target!==$('keypill')&&!$('keypill').contains(e.target))closeKeyPop();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeKeyPop();closeNav();}});
  $('srchbtn').onclick=openCmd;$('gplay').onclick=function(){stop();};$('gundo').onclick=function(){undo();};
  // theme
  var TH='dark';try{TH=localStorage.getItem('riff-workshop-theme')||'dark';}catch(e){}
  function applyTheme(v){if(v==='auto')document.documentElement.removeAttribute('data-theme');else document.documentElement.setAttribute('data-theme',v);}
  $('langbtn').onclick=function(){setLang(LANG==='en'?'fa':'en');};$('setlang').value=LANG;$('setlang').onchange=function(){setLang(this.value);};
  applyTheme(TH);$('settheme').value=TH;$('settheme').onchange=function(){applyTheme(this.value);try{localStorage.setItem('riff-workshop-theme',this.value);}catch(e){}};
})();
