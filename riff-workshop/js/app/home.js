/* صفحه‌ی خانه (داشبورد تمرین) */
/* ---------- home ---------- */
var ACTN={speed:'تمرین سرعت',fq:'دسته‌شناسی',rt:'تمرین ریتم',ear:'تمرین گوش',sight:'نت‌خوانی',riff:'ساختن ریف',imp:'بداهه‌نوازی'};
function accOf(o){var c=0,t=0;Object.keys(o||{}).forEach(function(k){var v=o[k];if(v&&v.t){c+=v.c;t+=v.t;}});return t?c/t:null;}
function routeToday(){
  var k=dayKey();if(P.route[k])return P.route[k];
  var cands=['fq','ear','rt','sight'],best=null,bs=2;
  cands.forEach(function(c){var a=c==='fq'?accOf(P.fq.heat):accOf(P[c]);var sc=a===null?-1:a;if(sc<bs){bs=sc;best=c;}});
  var g=P.goal,m1=Math.max(2,Math.round(g*0.2)),m2=Math.max(3,Math.round(g*0.5)),m3=Math.max(2,g-m1-m2);
  P.route[k]={steps:[{k:'speed',t:'گرم کردن',m:m1},{k:best||'fq',t:'ساختن مهارت',m:m2},{k:(new Date().getDate()%2?'imp':'riff'),t:'موزیک ساختن',m:m3}],man:[false,false,false]};
  saveP();return P.route[k];}
function renderHome(){
  var box=$('homebox');if(!box)return;var d=dayRec(),r=routeToday(),st=streak(),h=new Date().getHours();
  var greet=h<12?'صبح بخیر':h<17?'عصر بخیر':'شب بخیر';
  var tot=0,active=0;Object.keys(P.days).forEach(function(k){tot+=P.days[k].s;if(P.days[k].s>=60)active++;});
  var best=0;Object.keys(P.best).forEach(function(k){if(P.best[k]>best)best=P.best[k];});
  var todayMin=Math.floor(d.s/60),pct=Math.min(100,Math.round(d.s/(P.goal*60)*100));
  var done=r.steps.map(function(s,i){return r.man[i]||((d.a[s.k]||0)>=s.m*60);});
  var h1='<div class="hero"><div><div class="kick">فضای رشد تو</div><div class="htitle">'+greet+'؛ بیا نوازنده‌ای بشیم که فقط خودت می‌تونی بشی.</div>'+
    '<div class="hint">تا حالا '+fa(Math.round(tot/60))+' دقیقه تمرین متمرکز، در '+fa(active)+' روز.</div>'+
    '<div class="row" style="margin-top:12px"><button class="btn primary" id="hmgo">ادامه‌ی تمرین</button>'+
    '<label class="ctl">هدف روزانه <select id="hmgoal">'+[10,15,20,30,45,60,90].map(function(x){return '<option value="'+x+'"'+(x===P.goal?' selected':'')+'>'+fa(x)+' دقیقه</option>';}).join('')+'</select></label></div></div>'+
    '<div class="mom"><div class="kick">امروز</div><div class="htitle">'+fa(todayMin)+' از '+fa(P.goal)+' دقیقه</div><div class="pbar"><i style="width:'+pct+'%"></i></div><div class="hint">'+(st?'🔥 '+fa(st)+' روز پشت سر هم (رکورد: '+fa(P.rec||st)+')':'امروز رو شروع کن تا زنجیره‌ات ساخته بشه.')+'</div></div></div>';
  var rt='<h3 class="h3">مسیر تمرین امروز</h3><p class="hint" style="margin:0 0 8px">'+fa(P.goal)+' دقیقه در سه قدم. هر قدم وقتی به اندازه‌ی کافی تمرینش کنی خودش تیک می‌خوره، یا خودت تیکش بزن.</p><div class="route">'+
    r.steps.map(function(s,i){var mm=Math.floor((d.a[s.k]||0)/60);return '<div class="rcard'+(done[i]?' done':'')+'"><div class="row" style="justify-content:space-between"><span class="kick">'+fa(i+1)+'. '+s.t+'</span><span class="hint">'+fa(Math.min(mm,s.m))+' از '+fa(s.m)+' دقیقه'+(done[i]?' ✓':'')+'</span></div><div class="feel" style="font-size:17px">'+ACTN[s.k]+'</div><div class="row" style="justify-content:space-between;margin-top:8px"><button class="btn" data-open="'+s.k+'">باز کن</button><label class="ctl"><input type="checkbox" data-man="'+i+'"'+(r.man[i]?' checked':'')+'> انجام شد</label></div></div>';}).join('')+'</div>';
  var ins=[];
  var heat=P.fq.heat||{},weak=null,wa=2;Object.keys(heat).forEach(function(k){var v=heat[k];if(v.t>=3&&v.c/v.t<wa){wa=v.c/v.t;weak=k;}});
  if(weak!==null)ins.push(['<span class="ltr">'+PCN[+weak]+'</span> ضعیف‌ترین نتت روی دسته‌ست ('+fa(Math.round(wa*100))+'٪ درست).','fq']);
  var eweak=null,ew=2;Object.keys(P.ear).forEach(function(k){var v=P.ear[k];if(v.t>=5&&v.c/v.t<ew){ew=v.c/v.t;eweak=k;}});
  if(eweak)ins.push(['در تمرین گوش، «'+(EARN[eweak]||eweak)+'» با '+fa(Math.round(ew*100))+'٪ ضعیف‌ترین بخشته.','ear']);
  var nov=0;['rt','sight','imp','fq','ear'].forEach(function(k){var any=Object.keys(P.days).some(function(dk){return (P.days[dk].a[k]||0)>0;});if(!any&&nov<2&&ins.length<4){nov++;ins.push(['هنوز «'+ACTN[k]+'» رو امتحان نکردی؛ ارزش یک جلسه رو داره.',k]);}});
  if(best)ins.unshift(['بهترین سرعتت تا امروز '+fa(best)+' BPM بوده.','speed']);
  var pl='<div class="twocol2"><div><h3 class="h3">نبض تمرین</h3>'+ins.slice(0,4).map(function(x){return '<button class="insight" data-open="'+x[1]+'">'+x[0]+' ←</button>';}).join('')+'</div>'+
    '<div><h3 class="h3">آمار</h3><div class="stats" id="hmstats"></div></div></div>';
  var wk='<h3 class="h3">هفته‌ی تو</h3><div class="week">';var FAD=['ی','د','س','چ','پ','ج','ش'],mx=P.goal*60;
  for(var i=6;i>=0;i--){var dd=new Date();dd.setDate(dd.getDate()-i);var rec=P.days[dayKey(dd)]||{s:0,met:false};mx=Math.max(mx,rec.s);}
  for(i=6;i>=0;i--){var dd2=new Date();dd2.setDate(dd2.getDate()-i);var rc=P.days[dayKey(dd2)]||{s:0,met:false};
    wk+='<div class="wcol"><span class="hint">'+(rc.s?fa(Math.round(rc.s/60))+'′':'–')+'</span><div class="b'+(rc.met?' met':'')+(i===0?' today':'')+'" style="height:'+Math.max(4,Math.round(rc.s/mx*90))+'px"></div><span class="hint">'+(i===0?'امروز':FAD[dd2.getDay()])+'</span></div>';}
  wk+='</div>';
  box.innerHTML=h1+rt+pl+wk;
  statTiles($('hmstats'),[[fa(Math.round(tot/60)),'دقیقه‌ی کل'],[best?fa(best):'–','بهترین BPM'],[fa(st),'روز پشت سر هم'],[fa(active),'روز فعال']]);
  box.querySelectorAll('[data-open]').forEach(function(b){b.onclick=function(){goSec(b.getAttribute('data-open'));};});
  box.querySelectorAll('[data-man]').forEach(function(c){c.onchange=function(){r.man[+c.getAttribute('data-man')]=c.checked;saveP();renderHome();};});
  $('hmgo').onclick=function(){var k=r.steps.filter(function(s,i){return !done[i];})[0];goSec(k?k.k:'riff');};
  $('hmgoal').onchange=function(){P.goal=+this.value;delete P.route[dayKey()];saveP();renderHome();};
}
