/* ایده‌های ریف و سولو برای آکوردها و الگوها */
/* ---------- idea helpers ---------- */
// ایده‌ها یا جای ریف رو می‌گیرن، یا (پیش‌فرض) به آخر ریف اضافه می‌شن تا بشه یک پیشرفت کامل ساخت
function ideaLoad(evs,name,opt){opt=opt||{};if(playing)stop();lpStop();
  if(PREF.idea==='append'){if(!hasRiff()){S.events=[];S.ts={n:4,d:4};if(opt.drums)S.drums=opt.drums;if(!$('rname').value)$('rname').value=name;syncControls();}ideaAppend(evs,name);return;}
  S.events=fitBar(evs.map(fixEv));S.ts={n:4,d:4};S.cur=0;S.sel=null;if(opt.drums)S.drums=opt.drums;if(opt.bpm)S.bpm=opt.bpm;curId=null;$('rname').value=name;
  syncControls();changed();renderLib();goPage('editor');setTimeout(function(){start(true);},80);}
// نام و توضیح ۸ ایده‌ی هر آکورد (۴ ریف، ۴ سولو)؛ en/de ترجمه‌ی انگلیسی
var CHIDEAS=[
 {k:'riff',n:'آرپژ لت‌رینگ',en:'let-ring arpeggio',dr:'rock',d:'نت‌های صدابندی یکی‌یکی و بذار هم‌صدا بشن؛ مقدمه و ورس ملودیک.',de:'The voicing notes one by one, left ringing together; melodic intros and verses.'},
 {k:'riff',n:'چاگ و ضربه‌ی آکورد',en:'chug and chord hits',dr:'metal',d:'پالم‌میوت روی نت بم و ضربه‌ی آکورد با لهجه؛ ریف اصلی ملودیک دث.',de:'Palm mutes on the bass note and accented chord hits; a core melodic death metal riff.'},
 {k:'riff',n:'گالاپ',en:'gallop',dr:'gallop',d:'پاورکورد ریشه با ریتم چنگ-دولاچنگ-دولاچنگ (مثل آیرون میدن) و آکورد کامل در آخر.',de:'A root power chord in eighth-sixteenth-sixteenth rhythm (Iron Maiden style), ending on the full chord.'},
 {k:'riff',n:'ترمولو روی نت‌های آکورد',en:'tremolo on chord tones',dr:'blast',d:'ملودی از نت‌های بالای آکورد با ترمولو پیکینگ؛ سبک بلک‌متال.',de:'A melody from the top chord tones, tremolo-picked; black metal style.'},
 {k:'solo',n:'لید با بند و ویبراتو',en:'lead with bends and vibrato',dr:'rock',d:'دو نت بالای آکورد، بند به نت آکورد، ویبراتو و لگاتو؛ جمله‌ی کوتاه سولو.',de:'The top two chord tones, a bend into a chord tone, vibrato and legato; a short solo phrase.'},
 {k:'solo',n:'سوییپ آرپژ',en:'sweep arpeggio',dr:'metal',d:'یک نت آکورد روی هر سیم، از بم تا زیر و برگشت با دولاچنگ؛ تکنیک نئوکلاسیک.',de:'One chord tone per string, low to high and back in sixteenths; a neoclassical technique.'},
 {k:'solo',n:'ران لگاتو روی اسکیل',en:'legato scale run',dr:'metal',d:'سه نت در هر سیم از اسکیل فعلی با همر و پول؛ روی نت آکورد فرود میاد.',de:'Three notes per string from the current scale with hammer-ons and pull-offs, landing on a chord tone.'},
 {k:'solo',n:'تپینگ آرپژ',en:'tapped arpeggio',dr:'metal',d:'سه نت آکورد روی یک سیم: نت بالا با تپ، دو نت دیگه با پول و همر؛ نیمه‌ی دوم یک وارونگی بالاتر.',de:'Three chord tones on one string: the top one tapped, the others pulled and hammered; the second half one inversion higher.'}];
CHIDEAS.forEach(function(x,i){trAdd(x.n,x.en);trAdd(fa(i+1)+'. '+x.n,(i+1)+'. '+x.en);trAdd(x.d,x.de);});
// notes: صدابندی آکورد، rootPc: ریشه، pcs: همه‌ی نت‌های آکورد (pitch class)
function ideaAppend(evs,name){takeSnap();
  var cur=fitBar(S.events.slice()),add=fitBar(evs.map(fixEv)),at=cur.length;S.events=cur.concat(add);S.cur=at;S.sel=null;
  var tk=0;S.events.forEach(function(e){tk+=ticks(e);});var bars=Math.round(tk/barT()*10)/10;
  changed();auditionAdded(add);toastUndo('«'+name+'» به آخر ریف اضافه شد؛ ریف حالا '+fa(bars)+' میزانه');}
// فقط بخش اضافه‌شده رو یک بار پخش می‌کنه
function auditionAdded(add){whenReady(function(){var t=ac.currentTime+0.05;choke(t);add.forEach(function(e,i){var d=secsOf(ticks(e));playEvent(e,t,d,add[i-1]||null,add[i+1]||null);t+=d;});});}
// انتخاب «اضافه به آخر ریف» یا «جایگزین ریف» برای همه‌ی دکمه‌های ایده
function ideaModeRender(){['ideamode1','ideamode2'].forEach(function(id){var box=$(id);if(!box)return;box.innerHTML='';box.appendChild(EL('span','kick','با زدن ایده‌ها:'));
  [['append','به آخر ریف اضافه بشن'],['replace','جای ریف رو بگیرن']].forEach(function(x){var b=EL('button','chip',x[1]);b.setAttribute('aria-pressed',PREF.idea===x[0]);b.onclick=function(){PREF.idea=x[0];savePref();ideaModeRender();};box.appendChild(b);});});}
function chordIdeas(notes,rootPc,pcs){
  var cp=function(a){return a.map(function(x){return {s:x.s,f:x.f};});};
  var ns=notes.slice().sort(function(a,b){return b.s-a.s;}),low=ns[0],hi=ns.slice(-2);
  pcs=pcs&&pcs.length?pcs:ns.map(function(n){return (OPEN[n.s]+n.f)%12;}).filter(function(x,i,a){return a.indexOf(x)===i;});
  var fr=ns.filter(function(n){return n.f>0;}).map(function(n){return n.f;}),center=fr.length?Math.round(fr.reduce(function(a,b){return a+b;},0)/fr.length):5;
  center=Math.max(3,Math.min(15,center));
  var A=[],B=[],C=[],D=[],E=[],F=[],G=[],H=[];
  // 1. let-ring arpeggio
  var up=ns.concat(ns.slice(1,-1).reverse());for(var r=0;r<2;r++)up.forEach(function(n,i){var e=blankEv('8',false,false,[{s:n.s,f:n.f}]);e.t.ring=true;if(i===0)e.t.acc=true;A.push(e);});
  // 2. chug and chord hits
  for(var b=0;b<2;b++){for(var k=0;k<3;k++){var e1=blankEv('16',false,false,[{s:low.s,f:low.f}]);e1.t.pm=true;var e2=blankEv('16',false,false,[{s:low.s,f:low.f}]);e2.t.pm=true;var h=blankEv('8',false,false,cp(ns.slice(0,3)));h.t.acc=true;B.push(e1,e2,h);}
    var hit=blankEv('q',false,false,cp(ns));hit.t.ring=true;hit.t.acc=true;B.push(hit);}
  // 3. gallop on the root power chord (root on the lowest string that has it)
  var rs=LOW,rf=nearestFret(LOW,[rootPc],Math.min(center,9));if(rf===null||rf>12){rs=LOW-1;rf=nearestFret(rs,[rootPc],Math.min(center,9));}
  var pw=pow5(rs,rf);
  for(var g=0;g<8;g++){var last=g===7;if(last){var fin=blankEv('q',false,false,cp(ns));fin.t.ring=true;fin.t.acc=true;D.push(fin);break;}
    var c1=blankEv('8',false,false,cp(pw));c1.t.acc=g%4===0;var c2=blankEv('16',false,false,[{s:rs,f:rf}]);c2.t.pm=true;var c3=blankEv('16',false,false,[{s:rs,f:rf}]);c3.t.pm=true;D.push(c1,c2,c3);}
  // 4. tremolo melody on the top chord tones
  var tops=[2,1,0].map(function(s){var f=nearestFret(s,pcs,center+2);return f===null?null:{s:s,f:f};}).filter(Boolean);
  if(!tops.length)tops=hi.slice();
  [0,1,2,1].forEach(function(i){var n=tops[i%tops.length],e=blankEv('h',false,false,[n]);e.t.trem=true;e.t.acc=i===0;E.push(e);});
  // 5. lead: bend into the top chord tone, vibrato, legato
  var top=hi[hi.length-1],sec=hi[0];
  C.push(blankEv('8',false,false,[{s:sec.s,f:sec.f}]),blankEv('8',false,false,[{s:top.s,f:top.f}]));
  var bd=blankEv('q',false,false,[{s:top.s,f:Math.max(0,top.f-2)}]);bd.bt='b';bd.bend=2;C.push(bd);
  var v=blankEv('h',false,false,[{s:top.s,f:top.f}]);v.t.vib=true;C.push(v);
  var s1=blankEv('8',false,false,[{s:sec.s,f:sec.f}]);s1.lg='h';C.push(s1,blankEv('8',false,false,[{s:sec.s,f:Math.min(NF,sec.f+2)}]),blankEv('q',false,false,[{s:low.s,f:low.f}]));
  var vv=blankEv('h',false,false,cp(ns));vv.t.ring=true;C.push(vv);
  // 6. sweep: one chord tone per string, up and back down in 16ths
  var sw=(function(){var a=[];for(var q=LOW;q>=0;q--)a.push(q);return a;})().map(function(s){return {s:s,f:nearestFret(s,pcs,center)};}).filter(function(n){return n.f!==null;});
  var path=sw.concat(sw.slice(1,-1).reverse());while(path.length<12)path.push(sw[path.length%sw.length]);
  path.slice(0,12).forEach(function(n,i){var e=blankEv('16',false,false,[n]);if(i===0)e.t.acc=true;F.push(e);});
  var sv=blankEv('q',false,false,[sw[sw.length-1]]);sv.t.vib=true;F.push(sv);
  path.slice(0,12).forEach(function(n,i){var e=blankEv('16',false,false,[n]);if(i===0)e.t.acc=true;F.push(e);});
  var sv2=blankEv('q',false,false,[sw[0]]);sv2.t.ring=true;F.push(sv2);
  // 7. legato run: three scale notes per string on strings 3-2-1, up and down, landing on a chord tone
  var siv=MODES[S.mode].iv,spc=siv.map(function(x){return (S.key+x)%12;}),run=[];
  [2,1,0].forEach(function(s,k){var f0=nearestFret(s,spc,center-1+k),fs=[];if(f0===null)return;for(var f=f0;f<=NF&&fs.length<3;f++)if(spc.indexOf((OPEN[s]+f)%12)>=0)fs.push(f);fs.forEach(function(f,j){run.push({s:s,f:f,first:j===0});});});
  var seq=run.concat(run.slice(0,-1).reverse().slice(0,6));
  seq.forEach(function(n,i){var e=blankEv('16',false,false,[{s:n.s,f:n.f}]);if(i===0)e.t.acc=true;else if(!(i<run.length&&n.first))e.lg='h';G.push(e);});
  var land=seq.length?seq[seq.length-1]:top,lf=nearestFret(land.s,pcs,land.f);var ld=blankEv('h',false,false,[{s:land.s,f:lf===null?land.f:lf}]);ld.t.vib=true;G.push(ld);
  // 8. tapping: three chord tones on the high string, top one tapped; second half one inversion up
  var ts=0,tf=[];for(var f2=Math.max(1,center-3);f2<=NF&&tf.length<5;f2++)if(pcs.indexOf((OPEN[ts]+f2)%12)>=0)tf.push(f2);
  while(tf.length<5)tf.push(Math.min(NF,(tf[tf.length-1]||center)+3));
  [[0,1,2],[1,2,3]].forEach(function(sh){if(tf[sh[2]]-tf[sh[0]]<4)sh[2]=Math.min(4,sh[2]+1);var a=tf[sh[0]],m=tf[sh[1]],c=tf[sh[2]];
    for(var q=0;q<2;q++)[c,m,a,m].forEach(function(f,i){var e=blankEv('16',false,false,[{s:ts,f:f}]);if(i===0){e.t.tap=true;e.t.acc=q===0;}else e.lg='h';H.push(e);});});
  var L=[A,B,D,E,C,F,G,H];
  return CHIDEAS.map(function(x,i){return {n:x.n,d:x.d,k:x.k,dr:x.dr,ev:L[i]};});}
function patternIdeas(notes){var up=notes.slice(),dn=notes.slice().reverse(),A=[],B=[],C=[],root=notes[0];
  groups(up.slice(0,12),3).forEach(function(n,i){var e=blankEv('16',false,true,[{s:n.s,f:n.f}]);if(i%3===0)e.t.acc=true;A.push(e);});
  groups(dn.slice(0,12),4).forEach(function(n,i){var e=blankEv('16',false,false,[{s:n.s,f:n.f}]);if(i%4===0)e.t.acc=true;B.push(e);});
  up.slice(1,13).forEach(function(n){var p=blankEv('16',false,false,[{s:root.s,f:root.f}]);p.t.pm=true;C.push(p,blankEv('16',false,false,[{s:n.s,f:n.f}]));});
  return [{n:'سکوئنس ۳تایی رو به بالا',ev:A},{n:'سکوئنس ۴تایی رو به پایین',ev:B},{n:'ران با نت پدال',ev:C}];}
function ideaRow(list,prefix){var r=EL('div','idearow');r.appendChild(EL('span','kick',fa(list.length)+' ایده'));
  list.forEach(function(x,i){var b=EL('button','tb',fa(i+1)+'. '+x.n);if(x.d)b.title=x.d;b.onclick=function(){ideaLoad(x.ev,prefix+' — '+x.n,x.dr?{drums:x.dr}:null);};r.appendChild(b);});return r;}
// ردیف ایده‌های یک آکورد: ۴ ریف و ۴ سولو، هر کدوم با توضیح
function chordIdeaRow(getNotes,rootPc,pcs,label){var w=EL('div','chideas');
  [['riff','ریف'],['solo','سولو']].forEach(function(K){var r=EL('div','idearow');r.appendChild(EL('span','kick',K[1]));
    CHIDEAS.forEach(function(x,i){if(x.k!==K[0])return;var b=EL('button','tb',fa(i+1)+'. '+x.n);b.title=x.d;
      b.onclick=function(){var n=getNotes();if(!n||!n.length)return;var L=chordIdeas(n,rootPc,pcs);ideaLoad(L[i].ev,label+' — '+x.n,{drums:x.dr});};r.appendChild(b);});
    w.appendChild(r);});
  return w;}
