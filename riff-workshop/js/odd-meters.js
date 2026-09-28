/* میزان‌های لنگ (odd time signatures) */
/* ---------- odd time signatures ---------- */
// هر ردیف: m برچسب، n/d کسر، g گروه‌بندی‌ها، c دسته، feel/use توضیح فارسی، fe/ue ترجمه‌ی انگلیسی
var ODD=[];
(function(){
  var C1='کلاسیک لنگ (/8)',C2='تکنیکال و djent (/16)',C3='سنگین و کش‌دار (/4)',C4='گروه‌بندی نامتقارن در زمان معمولی',C5='ترکیبی: دو کسر پشت‌سرهم';
  function M(c,m,n,d,g,feel,use,fe,ue){ODD.push({c:c,m:m,n:n,d:d,g:g,feel:feel,use:use,fe:fe,ue:ue});}
  M(C1,'5/8',5,8,[[2,3],[3,2]],'کوتاه و لنگ؛ انگار یک ضرب از ۶/۸ جا افتاده. حس عجله و بی‌قراری می‌ده.','ریف‌های کوتاه تکرارشونده، بخش‌های عصبی در تکنیکال و پراگرسیو.');
  M(C1,'7/8',7,8,[[2,2,3],[3,2,2],[2,3,2]],'رایج‌ترین کسر لنگ متال؛ مثل ۴/۴ که نصف ضرب آخرش بریده شده. «لنگیدن» مشخص و گیرا.','ورس‌های پراگرسیو، ریف‌های تکنیکال، بخش‌های حماسی با حس بی‌تعادلی.');
  M(C1,'9/8',9,8,[[2,2,2,3],[3,3,3],[3,2,2,2],[2,3,2,2],[2,2,3,2]],'۳+۳+۳ یک کسر ترکیبی روانه؛ بقیه‌ی گروه‌بندی‌ها «آکساک» (لنگ) هستن و حس رقص‌های بالکانی دارن.','۳+۳+۳ برای ریف‌های غلتان؛ ۲+۲+۲+۳ برای ریف‌هایی که آخرشون یک ضربه‌ی بلند دارن.');
  M(C1,'10/8',10,8,[[3,3,2,2],[2,3,2,3],[3,2,2,3],[3,3,4]],'یک میزان ۵/۴ که به چنگ‌ها شکسته شده؛ ۳+۳+۲+۲ اول «غلت» می‌خوره و بعد صاف می‌شه.','ریف‌های پراگرسیو که باید کمی از ۴/۴ طولانی‌تر باشن ولی هنوز راحت شمرده بشن.','A 5/4 bar broken into eighths; 3+3+2+2 rolls first and then straightens out.','Progressive riffs that need to be a little longer than 4/4 but still easy to count.');
  M(C1,'11/8',11,8,[[3,3,3,2],[2,2,3,2,2],[3,2,3,3],[2,2,2,2,3],[3,3,2,3]],'طولانی و پیچیده؛ گوش باید گروه‌ها رو دنبال کنه تا ریف رو حس کنه.','بخش‌های تکنیکال و پراگرسیو، بریج‌های غیرمنتظره.');
  M(C1,'12/8 لنگ',12,8,[[2,2,3,2,3],[3,3,2,2,2],[2,3,2,2,3]],'همون طول ۱۲/۸ ولی با گروه‌های نابرابر؛ ریتم «آکساک» بالکانی که مثل ۱۲/۸ معمولی نیست.','ریف‌های فولک‌متال و بخش‌هایی که می‌خوای طول آشنا ولی حس غریب داشته باشن.','The same length as 12/8 but with unequal groups; a Balkan aksak rhythm that does not feel like ordinary 12/8.','Folk-metal riffs and sections that should have a familiar length but a strange feel.');
  M(C1,'13/8',13,8,[[3,3,3,2,2],[2,2,2,3,2,2],[3,3,2,3,2],[3,2,2,3,3]],'مثل یک میزان ۴/۴ به‌اضافه‌ی کمی بیشتر؛ اگه گروه‌ها واضح باشن، روان شنیده می‌شه.','ریف‌های طولانی پراگرسیو، سولوهای روی ریتم پیچیده.');
  M(C1,'14/8',14,8,[[3,3,3,3,2],[2,2,3,2,2,3],[3,3,2,3,3]],'دو تا ۷/۸ پشت هم یا یک ۱۲/۸ با یک گروه اضافه؛ گروه‌بندی تعیین می‌کنه کدوم شنیده بشه.','ریف‌هایی که نیمه‌ی دومشون جواب نیمه‌ی اوله (سؤال و جواب).','Two 7/8 bars in a row, or a 12/8 bar with an extra group; the grouping decides which one you hear.','Riffs whose second half answers the first (call and response).');
  M(C1,'15/8',15,8,[[3,3,3,3,3],[2,2,2,3,2,2,2],[3,3,3,2,2,2]],'۳+۳+۳+۳+۳ غلتان و پیوسته‌ست؛ گروه‌بندی نامتقارن حس «گیر کردن» می‌ده.','ریف‌های گالاپ‌مانند طولانی، بخش‌های اتمسفریک.');
  M(C1,'17/8',17,8,[[3,3,3,3,3,2],[2,2,2,2,3,2,2,2],[3,3,2,3,3,3]],'خیلی طولانی؛ بیشتر به‌صورت دو نیمه‌ی ۸+۹ یا ۹+۸ شنیده می‌شه.','پراگرسیو و تکنیکال پیشرفته؛ برای وقتی که می‌خوای شنونده رو سردرگم کنی.');
  M(C1,'19/8',19,8,[[3,3,3,3,3,2,2],[2,2,3,2,2,3,2,3]],'یک جمله‌ی بلند که فقط با لهجه‌های محکم قابل دنبال کردنه؛ مثل ۱۶/۸ به‌اضافه‌ی یک گروه سه‌تایی.','تم‌های اصلی آهنگ‌های پراگرسیو طولانی و بخش‌های تکنوازی.','A long phrase you can only follow with strong accents; like 16/8 plus one group of three.','Main themes of long progressive songs and solo sections.');
  M(C1,'21/8',21,8,[[2,2,3,2,2,3,2,2,3],[3,3,3,3,3,3,3]],'سه تا ۷/۸ پشت هم (۲+۲+۳ سه بار) یا هفت گروه سه‌تایی؛ اولی لنگ، دومی غلتان.','ریف‌هایی که یک الگوی ۷/۸ رو سه بار تکرار می‌کنن و بعد برمی‌گردن.','Three 7/8 bars in a row (2+2+3 three times) or seven groups of three; the first limps, the second rolls.','Riffs that repeat a 7/8 pattern three times and then return.');
  M(C1,'23/8',23,8,[[3,3,3,3,3,2,2,2,2],[2,2,3,2,2,3,2,2,3,2]],'خیلی بلند؛ عملاً یک جمله‌ی کامل در یک میزان. نیمه‌ی سه‌تایی و نیمه‌ی دوتایی حس «ترمز گرفتن» می‌ده.','بخش‌های اوج پراگرسیو و تکنیکال دث.','Very long; practically a whole phrase in one bar. A half of threes then a half of twos feels like braking.','Climaxes in progressive and technical death metal.');
  M(C2,'5/16',5,16,[[3,2],[2,3]],'تند و بریده؛ هر میزان از یک ضرب سیاه کوتاه‌تره. تکرارش حس لرزش می‌ده.','ریف‌های djent و ماث‌کور که روی درام ۴/۴ «می‌چرخن».','Fast and clipped; each bar is shorter than a quarter-note beat. Repeating it feels like a shudder.','Djent and mathcore riffs that rotate over a 4/4 drum beat.');
  M(C2,'7/16',7,16,[[3,2,2],[2,2,3],[2,3,2]],'نسخه‌ی تند ۷/۸؛ گیرا و عصبی، مخصوص پالم‌میوت‌های سریع.','ریف‌های تکنیکال دث و djent، بریک‌های کوتاه.','A fast version of 7/8; catchy and nervous, made for fast palm mutes.','Technical death metal and djent riffs, short breaks.');
  M(C2,'9/16',9,16,[[3,3,3],[2,2,2,3]],'سه‌تایی‌های سریع (۳+۳+۳) یا لنگ‌تر (۲+۲+۲+۳)؛ حس غلتیدن تند.','فیل‌های گیتار و درام، ریف‌های تریپلت‌مانند.','Fast threes (3+3+3) or a limping 2+2+2+3; a quick rolling feel.','Guitar and drum fills, triplet-like riffs.');
  M(C2,'11/16',11,16,[[3,3,3,2],[2,2,3,2,2]],'کوتاه ولی پیچیده؛ مثل ۳/۴ که یک دولاچنگ کم داره.','ریف‌های ماث‌متال و بخش‌های «جابه‌جا شونده».','Short but intricate; like 3/4 missing one sixteenth.','Math-metal riffs and shifting sections.');
  M(C2,'13/16',13,16,[[3,3,3,2,2],[4,4,5]],'تقریباً یک میزان ۳/۴ به‌اضافه‌ی یک دولاچنگ؛ ۴+۴+۵ امضای djent مدرنه.','ریف‌های djent با پالم‌میوت و سکوت‌های ناگهانی.','Almost a 3/4 bar plus one sixteenth; 4+4+5 is a modern djent signature.','Djent riffs with palm mutes and sudden rests.');
  M(C2,'15/16',15,16,[[3,3,3,3,3],[4,4,4,3]],'یک دولاچنگ کمتر از ۴/۴؛ شنونده حس می‌کنه ریف «زودتر» برمی‌گرده.','ریف‌هایی که باید مثل ۴/۴ به نظر برسن ولی لنگ بزنن.','One sixteenth shorter than 4/4; the listener feels the riff comes back early.','Riffs that should sound like 4/4 but limp.');
  M(C2,'17/16',17,16,[[4,4,4,5],[3,3,3,3,3,2]],'یک دولاچنگ بیشتر از ۴/۴؛ ریف هر بار کمی «دیرتر» برمی‌گرده.','djent و پراگرسیو مدرن؛ روی درامی که مدام کمی جابه‌جا می‌شه.','One sixteenth longer than 4/4; the riff returns slightly late every time.','Djent and modern progressive, over drums that keep shifting slightly.');
  M(C2,'19/16',19,16,[[4,4,4,4,3],[3,3,3,3,3,2,2]],'۴/۴ به‌اضافه‌ی سه دولاچنگ؛ گروه سه‌تایی آخر مثل یک «سکسکه»ست.','ریف‌های تکنیکال با یک ضربه‌ی اضافه در آخر میزان.','4/4 plus three sixteenths; the final group of three is like a hiccup.','Technical riffs with an extra kick at the end of the bar.');
  M(C2,'21/16',21,16,[[4,4,4,4,5],[3,3,3,3,3,3,3]],'۵/۴ تقریباً، با یک دولاچنگ اضافه؛ یا هفت گروه سه‌تایی سریع.','تم‌های طولانی djent و ماث‌کور.','Almost 5/4 with one extra sixteenth, or seven fast groups of three.','Long djent and mathcore themes.');
  M(C2,'23/16',23,16,[[4,4,4,4,4,3],[3,3,3,3,3,3,3,2]],'یک دولاچنگ کمتر از ۶/۴؛ طولانی و پیش‌رونده.','ریف‌های اصلی پراگرسیو مدرن.','One sixteenth shorter than 6/4; long and driving.','Main riffs of modern progressive metal.');
  M(C3,'5/4',5,4,[[3,2],[2,3]],'یک ضرب کامل بیشتر از ۴/۴؛ حس کش آمدن و سنگینی.','ریف‌های سنگین و دووم، بخش‌های حماسی آهسته.');
  M(C3,'7/4',7,4,[[4,3],[3,4],[2,2,3]],'مثل ۴/۴ به‌اضافه‌ی ۳/۴؛ طولانی و قدرتمند.','ورس‌های پراگرسیو و بریک‌داون‌های کش‌دار.');
  M(C3,'9/4',9,4,[[3,3,3],[2,2,2,3],[4,3,2]],'خیلی کش‌دار؛ مثل دو میزان که ضرب آخرشون قاطی شده.','دووم و استونر، بخش‌های آهسته و سنگین.','Very stretched; like two bars whose last beats got mixed up.','Doom and stoner, slow heavy sections.');
  M(C3,'11/4',11,4,[[4,4,3],[3,3,3,2]],'دو میزان ۴/۴ به‌اضافه‌ی ۳/۴؛ نفس بلند.','بریک‌داون‌های طولانی و بخش‌های سینمایی.','Two 4/4 bars plus a 3/4; one long breath.','Long breakdowns and cinematic sections.');
  M(C3,'13/4',13,4,[[4,4,3,2],[3,3,3,2,2]],'سه میزان ۴/۴ و یک ضرب اضافه؛ آخرش حس «جا ماندن» داره.','بخش‌های آهسته‌ی پراگرسیو و پست‌متال.','Three 4/4 bars and one extra beat; the end feels like being left behind.','Slow progressive and post-metal sections.');
  M(C3,'15/4',15,4,[[4,4,4,3],[3,3,3,3,3]],'یک ضرب کمتر از چهار میزان ۴/۴؛ برای جمله‌های بلندی که زود تموم می‌شن.','تم‌های آهسته و پیش‌درآمدها.','One beat short of four 4/4 bars; for long phrases that end early.','Slow themes and intros.');
  M(C4,'8/8 (ترسیلو)',8,8,[[3,3,2],[3,2,3],[2,3,3]],'طول ۴/۴ ولی ۳+۳+۲؛ پایه‌ی ریتم‌های لاتین و خیلی از ریف‌های متال مدرن.','ریف‌هایی که درام ۴/۴ می‌زنه ولی گیتار «لنگ» می‌زنه؛ ساده‌ترین راه ورود به ریتم نامتقارن.','The length of 4/4 but grouped 3+3+2; the root of Latin rhythms and many modern metal riffs.','Riffs where the drums play 4/4 but the guitar limps; the easiest way into asymmetric rhythm.');
  M(C4,'16/16',16,16,[[3,3,3,3,4],[3,3,3,3,2,2],[5,5,6],[3,3,3,7]],'طول ۴/۴ با گروه‌های دولاچنگی نامتقارن؛ ترفند اصلی djent برای «جابه‌جا» شنیدن ریف.','ریف‌های Meshuggah‌طور روی درام صاف ۴/۴.','The length of 4/4 with asymmetric sixteenth groups; the main djent trick to make a riff sound displaced.','Meshuggah-style riffs over a straight 4/4 beat.');
  M(C4,'6/8',6,8,[[3,3],[2,2,2]],'کسر ترکیبی لنگ نیست؛ اینجاست تا با ۵/۸ و ۷/۸ مقایسه‌اش کنی. ۳+۳ غلتانه و ۲+۲+۲ همی‌یولا (حس ۳/۴) می‌سازه.','بخش‌های حماسی و فولک، پایه‌ی فهم گروه‌بندی سه‌تایی.','Not an odd meter; it is here to compare with 5/8 and 7/8. 3+3 rolls and 2+2+2 makes a hemiola (a 3/4 feel).','Epic and folk sections, the basis for understanding groups of three.');
  M(C5,'7/8 + 9/8',16,8,[[2,2,3,2,2,2,3],[3,2,2,3,3,3]],'دو میزان پشت هم: کوتاه و بعد بلند. جمع‌شون ۱۶ چنگه ولی اصلاً مثل ۴/۴ نیست.','ریف‌های پراگرسیو که «سؤال» کوتاه و «جواب» بلند دارن.','Two bars in a row: short then long. Together they make 16 eighths but nothing like 4/4.','Progressive riffs with a short question and a long answer.');
  M(C5,'5/8 + 7/8',12,8,[[3,2,2,2,3],[2,3,2,2,3]],'پنج و هفت پشت هم؛ حس یک میزان ۱۲/۸ که وسطش شکسته.','بخش‌های تکنیکال با تغییر کسر هر میزان.','Five then seven; it feels like a 12/8 bar broken in the middle.','Technical sections that change meter every bar.');
  M(C5,'7/16 + 9/16',16,16,[[3,2,2,3,3,3],[2,2,3,2,2,2,3]],'نسخه‌ی تند ۷+۹؛ طول ۴/۴ ولی دو نیمه‌ی نابرابر.','djent و ماث‌کور؛ روی درام ۴/۴ عجیب و گیرا.','A fast 7+9; the length of 4/4 but with two unequal halves.','Djent and mathcore; strange and catchy over a 4/4 beat.');
  M(C5,'3/4 + 7/8',13,8,[[2,2,2,2,2,3],[3,3,2,2,3]],'یک میزان صاف ۳/۴ و بعد یک ۷/۸ لنگ؛ تضاد بین «صاف» و «لنگ».','ورس‌هایی که با حس معمولی شروع می‌شن و بعد پا می‌لغزه.','A straight 3/4 bar and then a limping 7/8; contrast between straight and limping.','Verses that start normally and then trip.');
})();
ODD.forEach(function(M){if(M.fe)trAdd(M.feel,M.fe);if(M.ue)trAdd(M.use,M.ue);});
var ODS={i:1,gi:0,ex:0,drum:'rock',bpm:120,ev:[]};
var KON={2:'تا-کا',3:'تا-کی-تا',4:'تا-کا-دی-می',5:'تا-کا-تا-کی-تا',6:'تا-کی-تا-تا-کی-تا',7:'تا-کا-تا-کی-تا-کی-تا'};
function oddU(d){return 384/d;}
function oddTs(){var M=ODD[ODS.i];return {n:M.n,d:M.d,g:M.g[ODS.gi].slice()};}
function oddUnits(){var M=ODD[ODS.i],g=M.g[ODS.gi],a=[];g.forEach(function(x,k){for(var j=0;j<x;j++)a.push({g:k,first:j===0});});return a;}
// ۸ الگوی گیتار برای هر گروه‌بندی، در کلید و مُد فعلی
function oddRiffs(){
  var M=ODD[ODS.i],g=M.g[ODS.gi],U=oddU(M.d),iv=MODES[S.mode].iv,rf=rootFret(LOW,S.key);
  var slot=Math.min(48,U),sd=slot===48?'8':'16',spu=U/slot,fine=slot===48?'16':'16',fpu=U/24;
  var P5=function(f){return pow5(LOW,f);};
  var degF=function(dg){var f=rf+iv[dg%7];return f>12?f-12:f;};
  var cp=function(a){return a.map(function(x){return {s:x.s,f:x.f};});};
  // یک نت با طول دلخواه (با تای اگه یک دیرش استاندارد نباشه)
  function long(tk,notes,flag){var out=[];decomp(tk).forEach(function(p,j){var e=blankEv(p.d,p.dot,false,cp(notes));if(j)e.t.tie=true;if(flag)flag(e,j);out.push(e);});return out;}
  function hi(midi){for(var s=0;s<3;s++){var f=midi-OPEN[s];if(f>=5&&f<=17)return {s:s,f:f};}return {s:1,f:Math.max(0,Math.min(NF,midi-OPEN[1]))};}
  var home=OPEN[0]+rootFret(0,S.key)+12;
  function scaleMidi(step){var o=Math.floor(step/7),k=((step%7)+7)%7;return home+iv[k]+12*o;}
  var A=[],B=[],C=[],D=[],E=[],F=[],G=[],H=[];
  // A: accented chug, chords walk i-VI-VII-i across groups
  var walk=[0,5,6,3,4,2];
  g.forEach(function(x,k){var f=degF(walk[k%walk.length]),units=x*spu;
    for(var j=0;j<units;j++){var e=j===0?blankEv(sd,false,false,P5(f)):blankEv(sd,false,false,[{s:LOW,f:rf}]);if(j===0)e.t.acc=true;else e.t.pm=true;A.push(e);}});
  // B: melodic, arpeggiate a triad per group on strings 4-3-2
  var cyc=[0,5,2,6,3,4];
  g.forEach(function(x,k){var j0=cyc[k%cyc.length],pcs=chordPcs(j0),units=x*spu,notes=[];
    [3,2,1].forEach(function(s){notes.push({s:s,f:nearestFret(s,pcs,7)});});
    for(var j=0;j<units;j++){var n=notes[j%3],e=blankEv(sd,false,false,[n]);e.t.ring=true;if(j===0)e.t.acc=true;B.push(e);}});
  // C: technical 16ths, accent the group start and move the pedal note
  var mv=[0,1,0,4,0,1,5];
  g.forEach(function(x,k){var units=x*fpu,f=degF(mv[k%mv.length]);
    for(var j=0;j<units;j++){var e;if(j===0){e=blankEv('16',false,false,P5(f));e.t.acc=true;}else{e=blankEv('16',false,false,[{s:LOW,f:j%3===2?degF(1):rf}]);e.t.pm=j%3!==2;}C.push(e);}});
  // D: gallop inside each group: accented chord, then 16th pairs on the low string
  g.forEach(function(x,k){var f=degF(walk[k%walk.length]),tk=x*U,e=blankEv(sd,false,false,P5(f));e.t.acc=true;D.push(e);tk-=slot;
    while(tk>=24){var a=blankEv('16',false,false,[{s:LOW,f:rf}]);a.t.pm=true;D.push(a);tk-=24;}});
  // E: tremolo melody (black metal): one scale note per group, tremolo-picked for the whole group
  var mel=[4,3,2,1,0,1,2,3,5,4];
  g.forEach(function(x,k){var n=hi(scaleMidi(7+mel[k%mel.length]));long(x*U,[n],function(e){e.t.trem=true;if(!e.t.tie)e.t.acc=true;}).forEach(function(e){E.push(e);});});
  // F: djent syncopation: chord hit, a rest, then palm-muted low string to the end of the group
  g.forEach(function(x,k){var f=degF(mv[k%mv.length]),units=x*fpu;
    for(var j=0;j<units;j++){var e;if(j===0){e=blankEv('16',false,false,P5(f));e.t.acc=true;}else if(j===1)e=blankEv('16',false,false,null);else{e=blankEv('16',false,false,[{s:LOW,f:0}]);e.t.pm=true;if(j===units-1&&units>3){e.t.pm=false;e.t.dead=true;}}F.push(e);}});
  // G: lead line: each group starts on a chord tone, walks up the scale, last note gets vibrato
  var tones=[0,2,4,2,5,4,3,1];
  g.forEach(function(x,k){var st=7+tones[k%tones.length],units=x*spu;
    for(var j=0;j<units;j++){var e=blankEv(sd,false,false,[hi(scaleMidi(st+j))]);if(j===0)e.t.acc=true;if(j===units-1&&units>1){e.t.vib=true;}if(j>0&&j<units-1)e.lg='h';G.push(e);}});
  // H: half-time breakdown: one ringing chord per group, open low string drives the groups
  g.forEach(function(x,k){var f=k%2?degF(1):0,notes=P5(f);
    long(x*U,notes,function(e,j){if(!j){e.t.acc=true;e.t.ring=true;}}).forEach(function(e){H.push(e);});});
  return [{n:'چاگ لهجه‌دار',en:'accented chug',dr:'rock',d:'روی شروع هر گروه یک پاورکورد با لهجه، بقیه چاگ پالم‌میوت روی نت خونه. ساده‌ترین راه برای «شنیدن» گروه‌بندی.',ev:A},
          {n:'آرپژ گروه‌بندی‌شده',en:'grouped arpeggio',dr:'rock',d:'هر گروه یک آکورد؛ نت‌ها آرپژ می‌شن و اولین نت هر گروه لهجه داره. مناسب بخش‌های ملودیک و پراگرسیو.',ev:B},
          {n:'ریف تکنیکال دولاچنگ',en:'technical 16th riff',dr:'metal',d:'دولاچنگ پیوسته؛ شروع هر گروه پاورکورد و بقیه چاگ و نت همسایه. سبک تکنیکال دث.',ev:C},
          {n:'گالاپ گروهی',en:'grouped gallop',dr:'gallop',d:'اول هر گروه یک آکورد، بعد جفت‌های دولاچنگ روی سیم بم تا آخر گروه؛ گالاپ آیرون‌میدنی که با گروه‌بندی لنگ می‌زنه.',en2:'A chord on each group start, then sixteenth pairs on the low string to the end of the group; an Iron Maiden gallop that limps with the grouping.',ev:D},
          {n:'ترمولو ملودیک',en:'tremolo melody',dr:'blast',d:'هر گروه یک نت ملودی که با ترمولو پیکینگ کل گروه رو پر می‌کنه؛ سبک بلک‌متال. عوض شدن نت‌ها گروه‌ها رو نشون می‌ده.',en2:'One melody note per group, tremolo-picked across the whole group; black metal style. The note changes mark the groups.',ev:E},
          {n:'سنکوپ djent',en:'djent syncopation',dr:'half',d:'ضربه‌ی آکورد، یک سکوت کوتاه، بعد پالم‌میوت روی سیم باز و یک نت dead آخر گروه‌های بلند. سکوت‌ها ریتم رو «جابه‌جا» می‌کنن.',en2:'A chord hit, a short rest, then palm mutes on the open string and a dead note at the end of long groups. The rests displace the rhythm.',ev:F},
          {n:'لید روی گروه‌ها',en:'lead over the groups',dr:'rock',d:'هر گروه از یک نت آکورد شروع می‌شه و پله‌ای بالا می‌ره؛ نت آخر ویبراتو داره. برای تمرین سولو در کسر لنگ.',en2:'Each group starts on a chord tone and climbs the scale; the last note has vibrato. For practising solos in an odd meter.',ev:G},
          {n:'بریک‌داون نیم‌ضرب',en:'half-time breakdown',dr:'half',d:'هر گروه یک آکورد کشیده؛ گروه‌ها با تغییر آکورد شنیده می‌شن. سنگین و آهسته، برای بخش‌های بریک‌داون.',en2:'One sustained chord per group; you hear the groups through the chord changes. Heavy and slow, for breakdown sections.',ev:H}];}
function oddCount(){var g=ODD[ODS.i].g[ODS.gi];return {num:g.map(function(x){var a=[];for(var i=1;i<=x;i++)a.push(fa(i));return a.join('-');}).join('  |  '),kon:g.map(function(x){return KON[x]||x;}).join('  |  ')};}
function oddRender(){
  var box=$('oddlist');if(!box)return;box.innerHTML='';
  var cat='';ODD.forEach(function(M,i){if(M.c!==cat){cat=M.c;box.appendChild(EL('div','kick',cat));}
    var b=EL('button','litem','<span class="ltr">'+M.m+'</span><small>'+fa(M.g.length)+' گروه‌بندی</small>');b.setAttribute('aria-pressed',i===ODS.i);b.onclick=function(){lpStop();ODS.i=i;ODS.gi=0;oddRender();};box.appendChild(b);});
  var M=ODD[ODS.i];$('oddmeter').textContent=M.m;
  var gb=$('oddgroups');gb.innerHTML='';M.g.forEach(function(g,k){var b=EL('button','chip','<span class="ltr">'+g.join('+')+'</span>');b.setAttribute('aria-pressed',k===ODS.gi);b.onclick=function(){lpStop();ODS.gi=k;oddRender();};gb.appendChild(b);});
  var c=oddCount();$('oddcount').innerHTML='<div><b>بشمار:</b> <span class="ltr">'+c.num+'</span></div><div><b>با هجا:</b> <span>'+c.kon+'</span></div>';
  $('oddfeel').textContent=M.feel;$('odduse').textContent=M.use;
  oddGrid();
  var R=oddRiffs(),eb=$('oddex');eb.innerHTML='';R.forEach(function(r,k){trAdd(r.n,r.en);trAdd(fa(k+1)+'. '+r.n,(k+1)+'. '+r.en);if(r.en2)trAdd(r.d,r.en2);var b=EL('button','tb',fa(k+1)+'. '+r.n);b.setAttribute('aria-pressed',k===ODS.ex);b.onclick=function(){ODS.ex=k;ODS.drum=r.dr;oddRender();if(LP.on&&LP.o.tag==='odd')oddPlay(true);};eb.appendChild(b);});
  var X=R[ODS.ex];ODS.ev=X.ev;$('oddexd').textContent=X.d;miniTab($('oddtab'),X.ev,-1);
  var db=$('odddrum');db.innerHTML='';[['rock','راک'],['metal','دابل کیک'],['gallop','گالاپ'],['blast','بلست‌بیت'],['half','هاف‌تایم'],['none','بدون درام']].forEach(function(x){var b=EL('button','tb',x[1]);b.setAttribute('aria-pressed',x[0]===ODS.drum);b.onclick=function(){ODS.drum=x[0];oddRender();if(LP.on&&LP.o.tag==='odd')oddPlay(true);};db.appendChild(b);});
  oddDrumGrid();
}
function oddGrid(mark){var g=$('oddgrid');g.innerHTML='';var M=ODD[ODS.i],U=oddUnits();
  U.forEach(function(u,i){var c=EL('span','ou g'+(u.g%2)+(u.first?' first':''),u.first?'>':'');c.dataset.i=i;if(mark&&mark[i]!==undefined)c.classList.add(mark[i]);g.appendChild(c);});}
function oddDrumGrid(){var gd=$('odddgrid');gd.innerHTML='';var ts=oddTs(),P=drumPattern(ts,ODS.drum),U=oddU(ts.d),n=ts.n*(U/24);
  gd.style.gridTemplateColumns='44px repeat('+n+',minmax(0,1fr))';
  [['c','سنج'],['h','های‌هت'],['s','اسنر'],['k','کیک']].forEach(function(r){gd.appendChild(EL('span','dl',r[1]));
    for(var i=0;i<n;i++){var tk=i*24,hit=P.some(function(h){return h.k===r[0]&&Math.abs(h.t-tk)<1;}),gs=groupsTs(ts).indexOf(tk)>=0;gd.appendChild(EL('span','dc'+(hit?' on':'')+(gs?' gs':'')+(tk%U===0?' u':'')));}});}
function groupsTs(ts){var U=oddU(ts.d),a=[0],t=0;(ts.g||[]).forEach(function(x){t+=x*U;a.push(t);});return a;}
function oddPlay(restart){if(LP.on&&LP.o.tag==='odd'&&!restart){lpStop();return;}
  var ts=oddTs(),bar=ts.n*384/ts.d;
  lpStart(ODS.ev,function(){return +$('oddbpm').value;},{tag:'odd',loop:true,click:false,countIn:false,drumTs:ts,drumStyle:function(){return ODS.drum;},
    onStart:function(){$('oddplay').textContent='توقف';ODL.u=-1;requestAnimationFrame(oddLive);},onStop:function(){$('oddplay').textContent='پخش';miniNow($('oddtab'),-1);oddGrid();$('oddlive').hidden=true;},
    onStep:function(i){miniNow($('oddtab'),i);var t=0;for(var k=0;k<i;k++)t+=ticks(ODS.ev[k]);ODL.tk=t;ODL.t=ac.currentTime;ODL.bar=bar;ODL.U=oddU(ts.d);}});}
// شمارنده‌ی زنده: واحد و گروه فعلی رو هم‌زمان با صدا نشون می‌ده (حتی وسط نت‌های کشیده)
var ODL={tk:0,t:0,bar:1,U:48,u:-1};
function oddLive(){if(!(LP.on&&LP.o.tag==='odd'))return;
  var bpm=+$('oddbpm').value,tick=ODL.tk+Math.max(0,ac.currentTime-ODL.t)*bpm/60*96,u=Math.floor((tick%ODL.bar)/ODL.U);
  if(u!==ODL.u&&ODL.t){ODL.u=u;var U=oddUnits(),x=U[u];if(x){var g=ODD[ODS.i].g[ODS.gi],pos=0;for(var j=u;j>0&&!U[j].first;j--)pos++;
    $('oddgrid').querySelectorAll('.ou').forEach(function(c,j){c.classList.toggle('now',j===u);});
    var syl=(KON[g[x.g]]||'').split('-')[pos]||'',lv=$('oddlive');lv.hidden=false;
    lv.innerHTML='<b class="'+(x.first?'on':'')+'">'+fa(pos+1)+'</b><span>'+syl+'</span><small>گروه '+fa(x.g+1)+' از '+fa(g.length)+'</small>';}}
  requestAnimationFrame(oddLive);}
/* composition helpers for "which grouping does your riff feel like" */
function comps(n){var out=[];(function rec(rem,acc){if(acc.length>7)return;if(rem===0){out.push(acc.slice());return;}[2,3].forEach(function(x){if(x<=rem){acc.push(x);rec(rem-x,acc);acc.pop();}});})(n,[]);return out;}
function oddCheck(){
  var M=ODD[ODS.i],ts=oddTs(),U=oddU(ts.d),bar=ts.n*U,E=S.events,out=$('oddres');out.innerHTML='';
  if(!E.some(function(e){return !e.rest;})){out.innerHTML='<p class="hint">ریف ویرایشگر خالیه. یکی از الگوهای بالا رو با «باز کردن در ویرایشگر» بفرست، یا ریف خودت رو بنویس.</p>';return;}
  var L=[];function add(st,t,b,extra){L.push([st,t,b,extra]);}
  var same=S.ts.n===ts.n&&S.ts.d===ts.d;
  if(!same){var fix=EL('button','btn','کسر ویرایشگر رو روی '+M.m+' بذار');fix.onclick=function(){S.ts={n:ts.n,d:ts.d,g:ts.g.slice()};syncControls();changed();oddCheck();};
    add('n','کسر میزان ویرایشگر '+S.ts.n+'/'+S.ts.d+' است','برای اینکه خط‌های میزان، مترونوم و درام درست باشن، کسر ویرایشگر باید '+M.m+' باشه.',fix);}
  var st=[],t=0;E.forEach(function(e){st.push(t);t+=ticks(e);});var tot=t,full=Math.floor(tot/bar),rem=tot-full*bar;
  if(rem===0)add('y','طول ریف درسته',fa(full)+' میزان کامل '+M.m+'؛ هیچ میزان ناقصی نیست.');
  else add(full?'m':'n','میزان آخر ناقصه','ریف '+fa(full)+' میزان کامل و '+fa(Math.round(rem/U*10)/10)+' واحد اضافه داره. هر میزان '+M.m+' باید دقیقاً '+fa(ts.n)+' '+(ts.d===16?'دولاچنگ':ts.d===8?'چنگ':'سیاه')+' باشه؛ '+fa(Math.round((bar-rem)/U*10)/10)+' واحد کم داره یا اضافه رو حذف کن.');
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
  $('oddplay').onclick=function(){oddPlay(false);};$('oddbpm').oninput=function(){$('oddbpmv').value=this.value;};
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
