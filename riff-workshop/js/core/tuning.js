/* ساز و کوک: انتخاب تعداد سیم، کوک استاندارد/دراپ/دیگر، کوک دلخواه، و جابه‌جا کردن ریف با عوض شدن کوک */
/* ---------- tuning picker ---------- */
var TUNUI={n:NS,edit:null,follow:true};
var TUNREFOPEN=[61,56,52,47,42,37]; // پریست‌ها و درس‌ها برای C# Standard شش‌سیم نوشته شدن
function tunNear(d){d=((d%12)+12)%12;return d>6?d-12:d;}
function tunNotes(t){return t.low.map(function(m){return TNAMES[m%12]+(Math.floor(m/12)-1);}).join(' ');}
// نت‌ها رو با کوک فعلی جا می‌ده: هر نت روی سیمی با همون فاصله از سیم بم (اگه نشد، نزدیک‌ترین سیم آزاد، بعد یک اکتاو بالا/پایین)
// events: رویدادهای خام (قبل از fixEv)، from: OPEN کوکی که ریف باهاش نوشته شده، shift: جابه‌جایی به نیم‌پرده
function retune(events,from,shift){
  (events||[]).forEach(function(e){if(!e||!Array.isArray(e.notes))return;var used={},out=[];
    e.notes.forEach(function(n){if(!n||!(n.s>=0&&n.s<from.length))return;var p=from[n.s]+n.f+shift,pref=Math.max(0,Math.min(LOW,LOW-(from.length-1-n.s)));
      var order=[];for(var s=0;s<NS;s++)order.push(s);order.sort(function(a,b){return Math.abs(a-pref)-Math.abs(b-pref);});
      var put=null;[0,12,-12].some(function(o){return order.some(function(s){var f=p+o-OPEN[s];if(!used[s]&&f>=0&&f<=NF){put={s:s,f:f};return true;}return false;});});
      if(put){used[put.s]=1;out.push(put);}});
    out.sort(function(a,b){return b.s-a.s;});e.notes=out;if(!out.length)e.rest=true;});
  return events;}
// پریست یا درس (نوشته‌شده برای C# Standard) رو به کوک فعلی ببر: کلید = نت سیم بم
function presetFit(){var sh=tunNear(OPEN[LOW]-TUNREFOPEN[5]);if(!sh&&TUNING.id===TUNREF)return;
  retune(S.events,TUNREFOPEN,sh);S.key=((1+sh)%12+12)%12;}
// کوک جدید: ریف ذخیره و منتقل می‌شه، بعد صفحه دوباره بارگذاری می‌شه تا همه‌چیز با تعداد سیم جدید ساخته بشه
function tunSet(t){if(!t)return;var old=OPEN.slice(),oldLow=OPEN[LOW],same=TUNING&&TUNING.id===t.id;
  try{localStorage.setItem(TUNKEY,t.id);}catch(e){}
  if(same){closeKeyPop();return;}
  if(playing)stop();
  var sh=TUNUI.follow?tunNear(t.low[0]-oldLow):0;
  tunApply(t);retune(S.events,old,sh);if(TUNUI.follow)S.key=((S.key+sh)%12+12)%12;S.cs=Math.min(S.cs,LOW);
  save();location.reload();}
function tunCustomSave(t){var a=tunCustoms().filter(function(x){return x.id!==t.id;});a.push(t);try{localStorage.setItem(TUNKEY+'-custom',JSON.stringify(a));}catch(e){}}
function tunCustomDel(id){var a=tunCustoms().filter(function(x){return x.id!==id;});try{localStorage.setItem(TUNKEY+'-custom',JSON.stringify(a));}catch(e){}if(TUNING.id===id)tunSet(tunFind(TUNREF));else tunRender();}
function tunRender(){var box=$('tunbox');if(!box)return;box.innerHTML='';
  box.appendChild(EL('div','tuncur','<b class="ltr">'+TUNING.name+'</b><span>'+fa(TUNING.n)+' سیم</span><span class="ltr hint">'+tunNotes(TUNING)+'</span>'));
  var nr=EL('div','row');nr.appendChild(EL('span','mfam','تعداد سیم'));[6,7,8].forEach(function(n){var b=EL('button','chip',fa(n)+' سیم');b.setAttribute('aria-pressed',TUNUI.n===n);b.onclick=function(){TUNUI.n=n;TUNUI.edit=null;tunRender();};nr.appendChild(b);});box.appendChild(nr);
  function group(title,list){if(!list.length)return;box.appendChild(EL('div','mfam',title));var r=EL('div','row');
    list.forEach(function(t){var b=EL('button','chip'+(t.custom?' lens':''),'<span class="ltr">'+t.name+'</span>');b.title=tunNotes(t);b.setAttribute('aria-pressed',t.id===TUNING.id);b.onclick=function(){tunSet(t);};r.appendChild(b);
      if(t.custom){var d=EL('button','chip','✕');d.title='حذف کوک '+t.name;d.setAttribute('aria-label','حذف کوک '+t.name);d.onclick=function(){tunCustomDel(t.id);};r.appendChild(d);}});box.appendChild(r);}
  var n=TUNUI.n;group('استاندارد',TUNINGS.filter(function(t){return t.n===n&&t.g==='std';}));group('دراپ',TUNINGS.filter(function(t){return t.n===n&&t.g==='drop';}));
  group('کوک‌های دیگه',TUNINGS.filter(function(t){return t.n===n&&t.g==='other';}));group('کوک‌های من',tunCustoms().map(function(t){t.custom=true;return t;}));
  var fr=EL('label','ctl','<input type="checkbox" id="tunfollow"'+(TUNUI.follow?' checked':'')+'> ریف و کلید همراه کوک جابه‌جا بشن (نت سیم بم = نت خونه)');box.appendChild(fr);
  $('tunfollow').onchange=function(){TUNUI.follow=this.checked;};
  var cb=EL('button','btn','+ ساختن کوک دلخواه');cb.onclick=function(){TUNUI.edit={name:'',low:TUNING.low.slice()};tunRender();};
  if(!TUNUI.edit){box.appendChild(cb);return;}
  // ویرایشگر کوک دلخواه: از بم به زیر
  var E=TUNUI.edit,ed=EL('div','tunedit');ed.appendChild(EL('div','mfam','کوک دلخواه (از سیم بم به زیر)'));
  var top=EL('div','row');var cnt=document.createElement('select');cnt.id='tuncnt';for(var k=4;k<=9;k++){var o=document.createElement('option');o.value=k;o.textContent=fa(k)+' سیم';cnt.appendChild(o);}cnt.value=E.low.length;
  // سیم اضافه زیر سیم بم (چهارم پایین‌تر) اضافه می‌شه، مثل گیتارهای ۷ و ۸ سیم
  cnt.onchange=function(){var m=+this.value;while(E.low.length<m)E.low.unshift(Math.max(23,E.low[0]-5));E.low=E.low.slice(E.low.length-m);tunRender();};
  var lc=EL('label','ctl','تعداد ');lc.appendChild(cnt);top.appendChild(lc);
  var nmIn=document.createElement('input');nmIn.type='text';nmIn.id='tunname';nmIn.className='namein';nmIn.maxLength=30;nmIn.placeholder='اسم کوک (مثلاً Drop B فلان آهنگ)';nmIn.value=E.name;nmIn.oninput=function(){E.name=this.value;};top.appendChild(nmIn);ed.appendChild(top);
  var sr=EL('div','row tunstr');
  E.low.forEach(function(m,i){var w=EL('label','ctl','<small>'+fa(E.low.length-i)+'</small>');var sel=document.createElement('select');sel.id='tuns'+i;
    for(var x=23;x<=76;x++){var o=document.createElement('option');o.value=x;o.textContent=TNAMES[x%12]+(Math.floor(x/12)-1);sel.appendChild(o);}sel.value=m;sel.setAttribute('aria-label','سیم '+fa(E.low.length-i));
    sel.onchange=function(){E.low[i]=+this.value;};w.appendChild(sel);sr.appendChild(w);});
  ed.appendChild(sr);
  var ar=EL('div','row'),ok=EL('button','btn primary','ذخیره و استفاده'),no=EL('button','btn','انصراف');
  ok.onclick=function(){var nm=(E.name||'').trim()||('Custom '+E.low.map(function(x){return TNAMES[x%12];}).join(''));
    var t={id:'custom-'+Date.now().toString(36),n:E.low.length,g:'custom',name:nm.slice(0,30),low:E.low.slice(),custom:true};tunCustomSave(t);TUNUI.edit=null;tunSet(t);};
  no.onclick=function(){TUNUI.edit=null;tunRender();};ar.appendChild(ok);ar.appendChild(no);ed.appendChild(ar);box.appendChild(ed);}
function tunUI(){if($('tunpilltxt'))$('tunpilltxt').textContent=tunLabel();var bs=$('brandsub');if(bs)bs.textContent=TUNING.name+' · '+NF+' frets';TUNUI.n=TUNING.n;tunRender();}
// بار اول: قبل از هر کاری ساز و کوک رو بپرس
function tunFirstRun(){if(!tunIsNew())return;var kp=$('keypop');kp.hidden=false;$('keypill').setAttribute('aria-expanded','true');
  var w=$('tunwelcome');if(w)w.hidden=false;var go=$('tunkeep');if(go)go.onclick=function(){try{localStorage.setItem(TUNKEY,TUNING.id);}catch(e){}w.hidden=true;closeKeyPop();};}
