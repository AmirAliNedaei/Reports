/* ابزار مشترک تمرین‌ها و ذخیره‌ی پیشرفت */
/* ================= practice suite ================= */
function EL(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!==undefined)e.innerHTML=html;return e;}
function statTiles(box,arr){box.innerHTML='';arr.forEach(function(a){box.appendChild(EL('div','stat','<b>'+a[0]+'</b><span>'+a[1]+'</span>'));});}
var DEGN={0:'1',1:'b2',2:'2',3:'b3',4:'3',5:'4',6:'b5',7:'5',8:'b6',9:'6',10:'b7',11:'7'};

/* ---------- progress store ---------- */
var PKEY='riff-workshop-progress';
var P={v:1,goal:30,days:{},best:{},fq:{},ear:{},rt:{},sight:{},route:{},rec:0,upd:0};
try{var _pp=JSON.parse(localStorage.getItem(PKEY)||'null');if(_pp&&_pp.days)P=Object.assign(P,_pp);}catch(e){}
var PDOC=null,_psT=null;
function dayKey(d){d=d||new Date();return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2);}
function dayRec(k){k=k||dayKey();if(!P.days[k])P.days[k]={s:0,a:{},met:false};return P.days[k];}
function saveP(){P.upd=Date.now();clearTimeout(_psT);_psT=setTimeout(function(){
  try{localStorage.setItem(PKEY,JSON.stringify(P));}catch(e){}
  if(PDOC)PDOC.set({json:JSON.stringify(P),upd:P.upd}).catch(function(){});},1500);}
if(window.claude&&typeof window.claude.use==='function'){
  Promise.all([window.claude.use('db'),window.claude.use('user')]).then(function(r){var db=r[0],u=r[1];if(!db||!u)return;
    return u.id().then(function(uid){if(!uid)return;var ref;try{ref=db.doc('data/users/'+uid+'/app/progress');}catch(e){return;}
      return ref.get().then(function(sn){
        if(sn.exists){var d=sn.data()||{};try{var R=JSON.parse(d.json||'null');if(R&&R.days&&(R.upd||0)>(P.upd||0)){P=Object.assign(P,R);try{localStorage.setItem(PKEY,JSON.stringify(P));}catch(e){}if(typeof renderHome==='function')renderHome();renderHeat();}}catch(e){}}
        PDOC=ref;if(!sn.exists||(P.upd||0)>((sn.data()||{}).upd||0))ref.set({json:JSON.stringify(P),upd:P.upd||Date.now()}).catch(function(){});
      });});}).catch(function(){});
}
/* activity tracking */
var LASTACT=null,LASTT=0;
function markAct(e){var sc=e.target&&e.target.closest&&e.target.closest('section[data-sec]');if(sc)LASTACT=sc.getAttribute('data-sec');LASTT=Date.now();}
document.addEventListener('pointerdown',markAct,true);document.addEventListener('keydown',markAct,true);
setInterval(function(){
  if(document.hidden)return;
  var busy=playing||LP.on||RT.on;if(!busy&&Date.now()-LASTT>90000)return;
  var d=dayRec();d.s+=10;var a=LASTACT||'other';d.a[a]=(d.a[a]||0)+10;
  if(!d.met&&d.s>=P.goal*60){d.met=true;toast('هدف تمرین امروز کامل شد! 🎸');}
  saveP();if(curPage==='home')renderHome();
},10000);
function streak(){var n=0,d=new Date();if(!(P.days[dayKey(d)]||{}).met)d.setDate(d.getDate()-1);
  while((P.days[dayKey(d)]||{}).met){n++;d.setDate(d.getDate()-1);}if(n>(P.rec||0))P.rec=n;return n;}
