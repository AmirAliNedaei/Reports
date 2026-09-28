/* میزان‌های لنگ (odd time signatures) */
/* ---------- odd time signatures ---------- */
var ODD=[
 {m:'5/8',n:5,d:8,g:[[2,3],[3,2]],feel:'کوتاه و لنگ؛ انگار یک ضرب از ۶/۸ جا افتاده. حس عجله و بی‌قراری می‌ده.',use:'ریف‌های کوتاه تکرارشونده، بخش‌های عصبی در تکنیکال و پراگرسیو.'},
 {m:'7/8',n:7,d:8,g:[[2,2,3],[3,2,2],[2,3,2]],feel:'رایج‌ترین کسر لنگ متال؛ مثل ۴/۴ که نصف ضرب آخرش بریده شده. «لنگیدن» مشخص و گیرا.',use:'ورس‌های پراگرسیو، ریف‌های تکنیکال، بخش‌های حماسی با حس بی‌تعادلی.'},
 {m:'9/8',n:9,d:8,g:[[2,2,2,3],[3,3,3],[3,2,2,2],[2,3,2,2]],feel:'۳+۳+۳ یک کسر ترکیبی روانه؛ بقیه‌ی گروه‌بندی‌ها «آکساک» (لنگ) هستن و حس رقص‌های بالکانی دارن.',use:'۳+۳+۳ برای ریف‌های غلتان؛ ۲+۲+۲+۳ برای ریف‌هایی که آخرشون یک ضربه‌ی بلند دارن.'},
 {m:'11/8',n:11,d:8,g:[[3,3,3,2],[2,2,3,2,2],[3,2,3,3]],feel:'طولانی و پیچیده؛ گوش باید گروه‌ها رو دنبال کنه تا ریف رو حس کنه.',use:'بخش‌های تکنیکال و پراگرسیو، بریج‌های غیرمنتظره.'},
 {m:'13/8',n:13,d:8,g:[[3,3,3,2,2],[2,2,2,3,2,2],[3,3,2,3,2]],feel:'مثل یک میزان ۴/۴ به‌اضافه‌ی کمی بیشتر؛ اگه گروه‌ها واضح باشن، روان شنیده می‌شه.',use:'ریف‌های طولانی پراگرسیو، سولوهای روی ریتم پیچیده.'},
 {m:'15/8',n:15,d:8,g:[[3,3,3,3,3],[2,2,2,3,2,2,2]],feel:'۳+۳+۳+۳+۳ غلتان و پیوسته‌ست؛ گروه‌بندی نامتقارن حس «گیر کردن» می‌ده.',use:'ریف‌های گالاپ‌مانند طولانی، بخش‌های اتمسفریک.'},
 {m:'17/8',n:17,d:8,g:[[3,3,3,3,3,2],[2,2,2,2,3,2,2,2]],feel:'خیلی طولانی؛ بیشتر به‌صورت دو نیمه‌ی ۸+۹ یا ۹+۸ شنیده می‌شه.',use:'پراگرسیو و تکنیکال پیشرفته؛ برای وقتی که می‌خوای شنونده رو سردرگم کنی.'},
 {m:'5/4',n:5,d:4,g:[[3,2],[2,3]],feel:'یک ضرب کامل بیشتر از ۴/۴؛ حس کش آمدن و سنگینی.',use:'ریف‌های سنگین و دووم، بخش‌های حماسی آهسته.'},
 {m:'7/4',n:7,d:4,g:[[4,3],[3,4],[2,2,3]],feel:'مثل ۴/۴ به‌اضافه‌ی ۳/۴؛ طولانی و قدرتمند.',use:'ورس‌های پراگرسیو و بریک‌داون‌های کش‌دار.'},
 {m:'6/8',n:6,d:8,g:[[3,3]],feel:'کسر ترکیبی لنگ نیست؛ اینجاست تا با ۵/۸ و ۷/۸ مقایسه‌اش کنی. دو ضرب سه‌تایی، غلتان.',use:'بخش‌های حماسی و فولک، پایه‌ی فهم گروه‌بندی سه‌تایی.'}];
var ODS={i:1,gi:0,ex:0,drum:'rock',bpm:120,ev:[]};
var KON={2:'تا-کا',3:'تا-کی-تا',4:'تا-کا-دی-می'};
function oddTs(){var M=ODD[ODS.i];return {n:M.n,d:M.d,g:M.g[ODS.gi].slice()};}
function oddUnits(){var M=ODD[ODS.i],g=M.g[ODS.gi],a=[],gi=0;g.forEach(function(x,k){for(var j=0;j<x;j++)a.push({g:k,first:j===0});});return a;}
function oddRiffs(){
  var M=ODD[ODS.i],g=M.g[ODS.gi],U=M.d===8?48:96,iv=MODES[S.mode].iv,rf=((S.key-1)%12+12)%12;
  var P5=function(f){return [{s:5,f:f},{s:4,f:f+2},{s:3,f:f+2}];};
  var degF=function(dg){var f=rf+iv[dg%7];return f>12?f-12:f;};
  var A=[],B=[],C=[];
  // A: accented chug, chords walk i-VI-VII-i across groups
  var walk=[0,5,6,3,4,2];
  g.forEach(function(x,k){var f=degF(walk[k%walk.length]),units=x*(U/48);
    for(var j=0;j<units;j++){var e=j===0?blankEv('8',false,false,P5(f)):blankEv('8',false,false,[{s:5,f:rf}]);if(j===0)e.t.acc=true;else e.t.pm=true;A.push(e);}});
  // B: melodic, arpeggiate a triad per group on strings 4-3-2
  var cyc=[0,5,2,6,3,4];
  g.forEach(function(x,k){var j0=cyc[k%cyc.length],pcs=chordPcs(j0),units=x*(U/48),notes=[];
    [3,2,1].forEach(function(s){notes.push({s:s,f:nearestFret(s,pcs,7)});});
    for(var j=0;j<units;j++){var n=notes[j%3],e=blankEv('8',false,false,[n]);e.t.ring=true;if(j===0)e.t.acc=true;B.push(e);}});
  // C: technical 16ths, accent the group start and move the pedal note
  var mv=[0,1,0,4,0,1,5];
  g.forEach(function(x,k){var units=x*(U/48)*2,f=degF(mv[k%mv.length]);
    for(var j=0;j<units;j++){var e;if(j===0){e=blankEv('16',false,false,P5(f));e.t.acc=true;}else{e=blankEv('16',false,false,[{s:5,f:j%3===2?degF(1):rf}]);e.t.pm=j%3!==2;}C.push(e);}});
  return [{n:'چاگ لهجه‌دار',d:'روی شروع هر گروه یک پاورکورد با لهجه، بقیه چاگ پالم‌میوت روی نت خونه. ساده‌ترین راه برای «شنیدن» گروه‌بندی.',ev:A},
          {n:'آرپژ گروه‌بندی‌شده',d:'هر گروه یک آکورد؛ نت‌ها آرپژ می‌شن و اولین نت هر گروه لهجه داره. مناسب بخش‌های ملودیک و پراگرسیو.',ev:B},
          {n:'ریف تکنیکال دولاچنگ',d:'دولاچنگ پیوسته؛ شروع هر گروه پاورکورد و بقیه چاگ و نت همسایه. سبک تکنیکال دث.',ev:C}];}
function oddCount(){var g=ODD[ODS.i].g[ODS.gi];return {num:g.map(function(x){var a=[];for(var i=1;i<=x;i++)a.push(fa(i));return a.join('-');}).join('  |  '),kon:g.map(function(x){return KON[x]||x;}).join('  |  ')};}
function oddRender(){
  var box=$('oddlist');if(!box)return;box.innerHTML='';
  ODD.forEach(function(M,i){var b=EL('button','litem','<span class="ltr">'+M.m+'</span><small>'+fa(M.g.length)+' گروه‌بندی</small>');b.setAttribute('aria-pressed',i===ODS.i);b.onclick=function(){lpStop();ODS.i=i;ODS.gi=0;oddRender();};box.appendChild(b);});
  var M=ODD[ODS.i];$('oddmeter').textContent=M.m;
  var gb=$('oddgroups');gb.innerHTML='';M.g.forEach(function(g,k){var b=EL('button','chip','<span class="ltr">'+g.join('+')+'</span>');b.setAttribute('aria-pressed',k===ODS.gi);b.onclick=function(){lpStop();ODS.gi=k;oddRender();};gb.appendChild(b);});
  var c=oddCount();$('oddcount').innerHTML='<div><b>بشمار:</b> <span class="ltr">'+c.num+'</span></div><div><b>با هجا:</b> <span>'+c.kon+'</span></div>';
  $('oddfeel').textContent=M.feel;$('odduse').textContent=M.use;
  oddGrid();
  var R=oddRiffs(),eb=$('oddex');eb.innerHTML='';R.forEach(function(r,k){var b=EL('button','tb',r.n);b.setAttribute('aria-pressed',k===ODS.ex);b.onclick=function(){ODS.ex=k;oddRender();if(LP.on&&LP.o.tag==='odd')oddPlay(true);};eb.appendChild(b);});
  var X=R[ODS.ex];ODS.ev=X.ev;$('oddexd').textContent=X.d;miniTab($('oddtab'),X.ev,-1);
  var db=$('odddrum');db.innerHTML='';[['rock','راک'],['metal','دابل کیک'],['gallop','گالاپ'],['blast','بلست‌بیت'],['half','هاف‌تایم'],['none','بدون درام']].forEach(function(x){var b=EL('button','tb',x[1]);b.setAttribute('aria-pressed',x[0]===ODS.drum);b.onclick=function(){ODS.drum=x[0];oddRender();if(LP.on&&LP.o.tag==='odd')oddPlay(true);};db.appendChild(b);});
  oddDrumGrid();
}
function oddGrid(mark){var g=$('oddgrid');g.innerHTML='';var M=ODD[ODS.i],U=oddUnits();
  U.forEach(function(u,i){var c=EL('span','ou g'+(u.g%2)+(u.first?' first':''),u.first?'>':'');c.dataset.i=i;if(mark&&mark[i]!==undefined)c.classList.add(mark[i]);g.appendChild(c);});}
function oddDrumGrid(){var gd=$('odddgrid');gd.innerHTML='';var ts=oddTs(),P=drumPattern(ts,ODS.drum),U=ts.d===8?48:96,n=ts.n*(U/24);
  gd.style.gridTemplateColumns='44px repeat('+n+',minmax(0,1fr))';
  [['c','سنج'],['h','های‌هت'],['s','اسنر'],['k','کیک']].forEach(function(r){gd.appendChild(EL('span','dl',r[1]));
    for(var i=0;i<n;i++){var tk=i*24,hit=P.some(function(h){return h.k===r[0]&&Math.abs(h.t-tk)<1;}),gs=groupsTs(ts).indexOf(tk)>=0;gd.appendChild(EL('span','dc'+(hit?' on':'')+(gs?' gs':'')+(tk%U===0?' u':'')));}});}
function groupsTs(ts){var U=ts.d===8?48:96,a=[0],t=0;(ts.g||[]).forEach(function(x){t+=x*U;a.push(t);});return a;}
function oddPlay(restart){if(LP.on&&LP.o.tag==='odd'&&!restart){lpStop();return;}
  var ts=oddTs(),bar=ts.n*384/ts.d;
  lpStart(ODS.ev,function(){return +$('oddbpm').value;},{tag:'odd',loop:true,click:false,countIn:false,drumTs:ts,drumStyle:function(){return ODS.drum;},
    onStart:function(){$('oddplay').textContent='توقف';},onStop:function(){$('oddplay').textContent='پخش';miniNow($('oddtab'),-1);oddGrid();},
    onStep:function(i){miniNow($('oddtab'),i);var t=0;for(var k=0;k<i;k++)t+=ticks(ODS.ev[k]);var u=Math.floor((t%bar)/(ts.d===8?48:96));$('oddgrid').querySelectorAll('.ou').forEach(function(x,j){x.classList.toggle('now',j===u);});}});}
/* composition helpers for "which grouping does your riff feel like" */
function comps(n){var out=[];(function rec(rem,acc){if(acc.length>7)return;if(rem===0){out.push(acc.slice());return;}[2,3].forEach(function(x){if(x<=rem){acc.push(x);rec(rem-x,acc);acc.pop();}});})(n,[]);return out;}
function oddCheck(){
  var M=ODD[ODS.i],ts=oddTs(),U=ts.d===8?48:96,bar=ts.n*U,E=S.events,out=$('oddres');out.innerHTML='';
  if(!E.some(function(e){return !e.rest;})){out.innerHTML='<p class="hint">ریف ویرایشگر خالیه. یکی از الگوهای بالا رو با «باز کردن در ویرایشگر» بفرست، یا ریف خودت رو بنویس.</p>';return;}
  var L=[];function add(st,t,b,extra){L.push([st,t,b,extra]);}
  var same=S.ts.n===ts.n&&S.ts.d===ts.d;
  if(!same){var fix=EL('button','btn','کسر ویرایشگر رو روی '+M.m+' بذار');fix.onclick=function(){S.ts={n:ts.n,d:ts.d,g:ts.g.slice()};syncControls();changed();oddCheck();};
    add('n','کسر میزان ویرایشگر '+S.ts.n+'/'+S.ts.d+' است','برای اینکه خط‌های میزان، مترونوم و درام درست باشن، کسر ویرایشگر باید '+M.m+' باشه.',fix);}
  var st=[],t=0;E.forEach(function(e){st.push(t);t+=ticks(e);});var tot=t,full=Math.floor(tot/bar),rem=tot-full*bar;
  if(rem===0)add('y','طول ریف درسته',fa(full)+' میزان کامل '+M.m+'؛ هیچ میزان ناقصی نیست.');
  else add(full?'m':'n','میزان آخر ناقصه','ریف '+fa(full)+' میزان کامل و '+fa(Math.round(rem/U*10)/10)+' واحد اضافه داره. هر میزان '+M.m+' باید دقیقاً '+fa(ts.n)+' '+(ts.d===8?'چنگ':'سیاه')+' باشه؛ '+fa(Math.round((bar-rem)/U*10)/10)+' واحد کم داره یا اضافه رو حذف کن.');
  var cross=0;E.forEach(function(e,i){if(Math.floor(st[i]/bar)!==Math.floor((st[i]+ticks(e)-1)/bar))cross++;});
  if(cross)add('m',fa(cross)+' نت از خط میزان رد می‌شه','در کسرهای لنگ بهتره نت‌ها داخل میزان تموم بشن؛ وگرنه گوش شروع میزان بعد رو گم می‌کنه. نت رو کوتاه کن یا با تای به دو قسمت تقسیمش کن.');
  // emphasized onsets
  var emp={},prevLow=null,prevRest=true,posHits=[];
  E.forEach(function(e,i){if(e.rest||T(e,'tie')){prevRest=true;return;}var low=Math.min.apply(null,e.notes.map(function(n){return midiAt(n.s,n.f);}));
    var strong=T(e,'acc')||e.notes.length>1||prevRest||(!T(e,'pm')&&(i===0||T(E[i-1],'pm')))||(prevLow!==null&&low!==prevLow&&!T(e,'pm'));
    var r=st[i]%bar;if(strong){emp[r]=(emp[r]||0)+1;}prevLow=low;prevRest=false;});
  var bars=Math.max(1,full+(rem?1:0));
  function score(g){var gs=[0],tt=0;g.forEach(function(x){tt+=x*U;gs.push(tt);});gs.pop();var hit=0,onG=0,all=0;
    gs.forEach(function(p){if(emp[p])hit+=Math.min(emp[p],bars);});Object.keys(emp).forEach(function(p){all+=emp[p];if(gs.indexOf(+p)>=0)onG+=emp[p];});
    var rec=hit/(gs.length*bars),prec=all?onG/all:0;return {rec:Math.min(1,rec),prec:prec,f:rec+prec?2*rec*prec/(rec+prec):0};}
  var mine=score(ts.g),rp=Math.round(mine.rec*100),pp=Math.round(mine.prec*100);
  add(rp>=70?'y':rp>=40?'m':'n','شروع گروه‌ها: '+fa(rp)+'٪ لهجه دارن','در گروه‌بندی '+ts.g.join('+')+'، اول هر گروه باید «شنیده» بشه: با لهجه، آکورد، نت باز، تغییر نت یا بعد از سکوت. '+(rp<70?'روی شروع گروه‌هایی که خالی‌ان یک پاورکورد یا لهجه بذار.':'عالیه؛ گروه‌ها واضح شنیده می‌شن.'));
  add(pp>=60?'y':pp>=35?'m':'n','لهجه‌های بیرون از گروه‌ها: '+fa(100-pp)+'٪',''+(pp>=60?'بیشتر لهجه‌هات روی شروع گروه‌ها هستن و حس کسر حفظ می‌شه.':'لهجه‌های زیادی وسط گروه‌ها افتادن؛ این حس کسر رو مبهم می‌کنه یا ریف رو شبیه گروه‌بندی دیگه‌ای می‌کنه.'));
  var best=null;comps(ts.d===8?ts.n:ts.n).forEach(function(g){if(ts.d===4&&g.some(function(x){return x>4;}))return;var sc=score(g);if(!best||sc.f>best.f+1e-9)best={g:g,f:sc.f};});
  if(ts.d===4){[[1,1,1,1,1,1,1].slice(0,ts.n)].forEach(function(g){var sc=score(g);if(sc.f>best.f)best={g:g,f:sc.f};});}
  if(best&&best.g.join('+')!==ts.g.join('+')&&best.f>mine.f+0.08)add('m','حس ریفت به '+best.g.join('+')+' نزدیک‌تره','لهجه‌هات بیشتر با گروه‌بندی '+best.g.join('+')+' جورن تا '+ts.g.join('+')+'. اگه عمدیه، گروه‌بندی رو عوض کن؛ اگه نه، لهجه‌ها رو جابه‌جا کن.');
  else add('y','گروه‌بندی ریف با '+ts.g.join('+')+' می‌خونه','بین همه‌ی گروه‌بندی‌های ممکن '+M.m+'، ریفت بیشترین تطابق رو با همین گروه‌بندی داره.');
  var sc=Math.round((rem===0?30:10)+(same?10:0)+(cross?0:10)+25*mine.rec+25*mine.prec);
  var head=EL('div','oddscore','<b>'+fa(sc)+'</b><span>/ ۱۰۰</span><div>'+(sc>=85?'ریفت واقعاً در '+M.m+' ('+ts.g.join('+')+') نوشته شده.':sc>=60?'نزدیکه؛ نکته‌های زیر رو ببین.':'هنوز حس '+M.m+' رو نمی‌ده؛ از نکته‌های زیر شروع کن.')+'</div>');
  out.appendChild(head);var ul=EL('ul','checks');
  L.forEach(function(x){var li=EL('li','','<span class="mark '+x[0]+'">'+(x[0]==='y'?'✓':x[0]==='n'?'✗':'!')+'</span><div><b>'+x[1]+'</b><p>'+x[2]+'</p></div>');if(x[3])li.lastChild.appendChild(x[3]);ul.appendChild(li);});out.appendChild(ul);
  var mark={};oddUnits().forEach(function(u,i){var p=i*U;if(emp[p])mark[i]=u.first?'hitok':'hitoff';else if(u.first)mark[i]='miss';});oddGrid(mark);
}
function oddToEditor(){var ts=oddTs();if(playing)stop();lpStop();S.ts={n:ts.n,d:ts.d,g:ts.g.slice()};S.events=JSON.parse(JSON.stringify(ODS.ev)).map(fixEv);
  var once=S.events.slice();S.events=once.concat(JSON.parse(JSON.stringify(once)).map(fixEv));S.cur=0;S.sel=null;S.drums=ODS.drum;S.bpm=+$('oddbpm').value;curId=null;$('rname').value=ODD[ODS.i].m+' '+ts.g.join('+');
  syncControls();changed();renderLib();goPage('editor');toast('دو میزان '+ODD[ODS.i].m+' در ویرایشگر؛ حالا تغییرش بده و دوباره بررسی کن');}
(function(){if(!$('oddbox'))return;
  $('oddplay').onclick=function(){oddPlay(false);};$('oddbpm').oninput=function(){$('oddbpmv').textContent=this.value;};
  $('oddedit').onclick=oddToEditor;$('oddcheck').onclick=oddCheck;
  var tips=[['اول بشمار، بعد بنواز','قبل از نوشتن ریف، گروه‌بندی رو با صدای بلند بشمار (مثلاً «۱-۲ ۱-۲ ۱-۲-۳»). اگه نتونی بشماری، نمی‌تونی درست بنویسیش.'],
    ['شروع هر گروه باید شنیده بشه','لهجه، پاورکورد، سیم باز، یا تغییر نت روی اول هر گروه. بقیه‌ی واحدها رو ساده‌تر (پالم‌میوت یا تکرار) نگه دار.'],
    ['درام گروه‌ها رو مشخص می‌کنه','کیک روی شروع گروه‌ها، اسنر روی شروع گروه‌های زوج، و های‌هت روی هر چنگ. اینجا درام‌ها دقیقاً همین منطق رو دارن.'],
    ['گروه بلند رو آخر بذار','۲+۲+۳ طبیعی‌تر از ۳+۲+۲ شنیده می‌شه، چون گروه بلند مثل «نفس گرفتن» قبل از میزان بعده.'],
    ['دو میزان تکرار کن','ریف لنگ رو حداقل دو بار پشت هم تکرار کن تا گوش الگو رو یاد بگیره؛ تنوع رو از میزان سوم به بعد بیار.'],
    ['ترفند djent','می‌تونی کسر ۴/۴ رو نگه داری و فقط ریف رو با گروه‌های ۵ یا ۷ دولاچنگی تکرار کنی؛ درام در ۴/۴ می‌مونه و ریف روش «می‌چرخه».'],
    ['شبیه کسر دیگه نشه','اگه لهجه‌ها وسط گروه‌ها بیفتن، ۷/۸ ممکنه مثل ۴/۴ ناقص شنیده بشه. بررسی‌کننده‌ی پایین همین رو می‌سنجه.']];
  var tb=$('oddtips');tips.forEach(function(x,i){var d=EL('details','tipd');if(i<2)d.open=true;d.innerHTML='<summary>'+x[0]+'</summary><p>'+x[1]+'</p>';tb.appendChild(d);});
  oddRender();})();
