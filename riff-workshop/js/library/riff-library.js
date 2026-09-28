/* کتابخانه‌ی ریف‌های ذخیره‌شده */
/* ---------- riff library ---------- */
var LIBKEY='riff-workshop-lib-v1';
var store={kind:'local',col:null,items:[]},curId=null,armDel=null;
function localItems(){try{return JSON.parse(localStorage.getItem(LIBKEY)||'[]')||[];}catch(e){return [];}}
function localWrite(items){try{localStorage.setItem(LIBKEY,JSON.stringify(items));return true;}catch(e){return false;}}
function snapshotRiff(name){return {name:name,key:S.key,mode:S.mode,bpm:S.bpm,tone:S.tone,ts:tsKey(S.ts),drums:S.drums||'none',open:OPEN.slice(),tuning:TUNING.name,eventsJson:JSON.stringify(S.events),updatedAt:Date.now()};}
function useLocal(){store.kind='local';store.col=null;store.items=localItems();$('storeline').textContent='ذخیره در همین مرورگر';renderLib();}
function saveRiff(asNew){
  var name=$('rname').value.trim();
  if(!name){toast('یک اسم برای ریف بنویس');$('rname').focus();return;}
  if(!S.events.some(function(e){return !e.rest;})){toast('ریف خالیه؛ اول چند نت بنویس');return;}
  var data=snapshotRiff(name),id=(!asNew&&curId)?curId:('r'+Date.now().toString(36)+Math.floor(Math.random()*1e4).toString(36));
  if(store.kind==='db'){
    $('saveb').disabled=true;
    store.col.doc(id).set(data).then(function(){curId=id;toast('ذخیره شد');$('saveb').disabled=false;renderLib();},
      function(err){$('saveb').disabled=false;toast('ذخیره در حساب نشد؛ در همین مرورگر ذخیره شد');useLocal();saveLocal(id,data);});
  }else saveLocal(id,data);
}
function saveLocal(id,data){var it=localItems().filter(function(x){return x.id!==id;});data.id=id;it.push(data);
  if(localWrite(it)){curId=id;store.items=it;toast('ذخیره شد');renderLib();}else toast('ذخیره نشد؛ حافظه‌ی مرورگر در دسترس نیست');}
function openRiff(it){
  if(playing)stop();
  var evs=null;
  try{if(it.eventsJson){evs=JSON.parse(it.eventsJson);if(Array.isArray(it.open)&&it.open.join()!==OPEN.join())retune(evs,it.open,0);evs=evs.map(fixEv);}else if(it.stepsJson){var st=JSON.parse(it.stepsJson);evs=stepsToEvents(st,it.len||st.length);}}catch(e){evs=null;}
  if(!evs){toast('این ریف خراب شده');return;}
  S.key=(it.key>=0&&it.key<12)?it.key:1;renderKeys();S.mode=MODES[it.mode]?it.mode:'aeo';S.bpm=it.bpm||140;S.tone=normT(it.tone);setTone();
  S.ts=parseTs(it.ts);S.drums=it.drums||S.drums||'none';S.events=evs;S.cur=0;S.sel=null;curId=it.id;$('rname').value=it.name||'';
  syncControls();buildTab();renderModes();changed();renderLib();goPage('editor');toast('«'+(it.name||'ریف')+'» باز شد');
}
function deleteRiff(it){
  if(armDel!==it.id){armDel=it.id;renderLib();return;}
  armDel=null;
  if(store.kind==='db'){store.col.doc(it.id).delete().then(function(){toast('حذف شد');},function(){toast('حذف نشد');});}
  else{var rest=localItems().filter(function(x){return x.id!==it.id;});localWrite(rest);store.items=rest;renderLib();toast('حذف شد');}
  if(curId===it.id)curId=null;
}
function renderLib(){
  var ul=$('lib');ul.innerHTML='';
  var items=store.items.slice().sort(function(a,b){return (b.updatedAt||0)-(a.updatedAt||0);});
  $('saveb').textContent=curId?'ذخیره‌ی تغییرات':'ذخیره';
  $('saveas').hidden=!curId;
  var cur=items.filter(function(x){return x.id===curId;})[0];
  $('curline').textContent=cur?'در حال ویرایش: «'+cur.name+'». «ذخیره‌ی تغییرات» همین ریف رو به‌روز می‌کنه.':'';
  if(!items.length){var e=document.createElement('li');e.className='empty';e.textContent='هنوز ریفی ذخیره نکردی. یک اسم بنویس و «ذخیره» رو بزن.';ul.appendChild(e);return;}
  items.forEach(function(it){
    var li=document.createElement('li');if(it.id===curId)li.className='on';
    var info=document.createElement('div');
    var b=document.createElement('b');b.textContent=it.name||'بدون اسم';info.appendChild(b);
    var meta=document.createElement('div');meta.className='meta';
    var d=it.updatedAt?new Date(it.updatedAt):null;
    meta.innerHTML='<span class="ltr">'+spellAny((it.key>=0&&it.key<12)?it.key:1,MODES[it.mode]?MODES[it.mode].iv:[0,2,3,5,7,8,10]).root+' '+(MODES[it.mode]?SHORT[it.mode]:'')+'</span>، '+fa(it.bpm||'')+' bpm'+(d?'، '+d.toLocaleDateString('fa-IR'):'');
    info.appendChild(meta);li.appendChild(info);
    var act=document.createElement('div');act.className='row';
    var o=document.createElement('button');o.className='btn';o.textContent='باز کردن';o.onclick=function(){openRiff(it);};
    var x=document.createElement('button');x.className='btn';x.textContent=armDel===it.id?'مطمئنی؟ حذف کن':'حذف';
    if(armDel===it.id)x.style.color='var(--rust)';x.onclick=function(){deleteRiff(it);};
    act.appendChild(o);act.appendChild(x);li.appendChild(act);ul.appendChild(li);
  });
}
$('saveb').onclick=function(){saveRiff(false);};
$('saveas').onclick=function(){saveRiff(true);};
$('rname').addEventListener('keydown',function(e){if(e.key==='Enter')saveRiff(false);});
$('wipe').addEventListener('click',function(){curId=null;$('rname').value='';renderLib();});
useLocal();
if(window.claude&&typeof window.claude.use==='function'){
  Promise.all([window.claude.use('db'),window.claude.use('user')]).then(function(r){
    var db=r[0],u=r[1];if(!db||!u)return null;
    return u.id().then(function(uid){
      if(!uid)return;
      var col;try{col=db.doc('data/users/'+uid+'/lib').collection('riffs');}catch(e){return;}
      var first=true;
      col.onSnapshot(function(snap){
        store.kind='db';store.col=col;
        store.items=snap.docs.filter(function(d){return d.exists;}).map(function(d){var x=d.data()||{};return {id:d.id,name:x.name,key:x.key,mode:x.mode,len:x.len,bpm:x.bpm,tone:x.tone,ts:x.ts,drums:x.drums,stepsJson:x.stepsJson,eventsJson:x.eventsJson,updatedAt:x.updatedAt};});
        $('storeline').textContent='ذخیره در حساب تو (روی هر دستگاهی باز می‌شه)';
        if(first){first=false;var loc=localItems();
          if(loc.length&&!store.items.length){loc.forEach(function(it,k){setTimeout(function(){var d=Object.assign({},it);delete d.id;col.doc(it.id).set(d).catch(function(){});},k*150);});}}
        renderLib();
      },function(){useLocal();});
    });
  }).catch(function(){});
  window.claude.use('downloads').then(function(dl){
    if(!dl)return;var b=$('dl');b.hidden=false;
    b.onclick=function(){var nm=($('rname').value.trim()||'riff').replace(/[\\/:*?"<>|]/g,'-');
      dl.save({filename:nm+'.txt',data:tabText()}).then(function(r){if(r==='saved'||(r&&r.status==='saved'))toast('فایل ذخیره شد');},function(){toast('دانلود انجام نشد');});};
  }).catch(function(){});
}
