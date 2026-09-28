/* کارگاه بند (چیدمان سازها) */
/* ---------- band workshop ---------- */
var BANDS=[
 {id:'amon',n:'Amon Amarth',g:'ملودیک دث (وایکینگ)',c:'سوئد',tv:1,rel:'دو نیم‌پرده پایین‌تر از کوک تو؛ برای صدای مشابه، ریف رو دو فرت پایین‌تر روی گیتارت بزن یا کلید برنامه رو B بذار.',tune:'B Standard؛ آلبوم Berserker کوک بالاتری داشت و در The Great Heathen Army دوباره به B برگشتن.',src:'مصاحبه‌ی Guitar World و HEAVY Magazine',
  tr:['ریف‌های ترمولو','چاگ‌های کوک‌پایین','هارمونی حماسی دو گیتار','سولوهای ملودیک','تمپوی مارش‌مانند'],mood:'حماسی، پیروزمندانه و سنگین',
  tip:'ریف‌های ساده و به‌یادماندنی بساز؛ خودشون گفتن اگه ریف خوب نباشه، هیچ پرداختی نجاتش نمی‌ده. روی ریف ترمولو یک هارمونی سومی بذار.',app:{style:'melodeath',mode:'aeo',drums:'gallop',tone:'drive',bpm:120}},
 {id:'ins',n:'Insomnium',g:'ملودیک دث',c:'فنلاند',tv:2,rel:'یک نیم‌پرده بالاتر از کوک تو؛ همون فرت‌ها روی گیتار تو یک نیم‌پرده بم‌تر صدا می‌دن.',tune:'D Standard. طبق Songsterr (گزارش تو). من Songsterr رو بررسی کردم ولی کوک هر تب رو با جاوااسکریپت نمایش می‌ده و نتونستم مستقیم ببینمش. همچنین تأیید شده که Ville Friman از گیتار ۷ سیم برای عمق بیشتر استفاده کرده.',src:'Songsterr (گزارش تو)، Blabbermouth و Equipboard',
  tr:['ملودی‌های امضایی غمگین','ترکیب ریف‌های تهاجمی با فضای مالیخولیایی','بخش‌های آکوستیک و صدای کلین','لیدهای چندصدایی'],mood:'مالیخولیایی، زمستانی و حماسی',
  tip:'ملودی رو اول بساز و ریف رو زیرش بچین. کنار بخش‌های سنگین، یک بخش آکوستیک یا کلین بذار تا غم نفس بکشه.',app:{style:'melodeath',mode:'aeo',drums:'gallop',tone:'drive',bpm:125}},
 {id:'og',n:'Omnium Gatherum',g:'ملودیک دث با تأثیر پراگرسیو',c:'فنلاند',tv:2,rel:'دقیقاً همون کوک گیتار تو؛ تب‌هاشون رو مستقیم می‌تونی بزنی.',tune:'C# Standard. طبق Songsterr (گزارش تو). من Songsterr رو بررسی کردم ولی کوک هر تب رو با جاوااسکریپت نمایش می‌ده و نتونستم مستقیم ببینمش. در فهرست تب‌هاشون در Songsterr یک نسخه با عنوان «Rest in Your Heart C# Standard» هم دیده می‌شه.',src:'Songsterr، ویکی‌پدیا، Blabbermouth و مصاحبه‌ی Metal Wani',
  tr:['هوک‌های گیرا و سولوهای بلند','کیبورد پررنگ','ترکیب ملودیک دث گوتنبرگی با هوی متال کلاسیک','ظرافت پراگرسیو','تناوب صدای خشن و ملودیک'],mood:'پرانرژی، امیدوار و در عین حال مالیخولیایی',
  tip:'خود Markus Vanhala سبکشون رو این‌طور توصیف کرده: At the Gates، ترکیب‌شده با Journey، به‌اضافه‌ی مالیخولیای فنلاندی. یعنی ریف سنگین با هوک خیلی آوازی.',app:{style:'melodeath',mode:'dor',drums:'rock',tone:'drive',bpm:130}},
 {id:'ens',n:'Enshine',g:'دووم/دث اتمسفریک و امبینت',c:'سوئد و فرانسه',tv:0,tune:'تأیید نشد.',src:'Sputnikmusic، Metal Temple، Dead Rhetoric و Doomed Nation',
  tr:['کیبوردهای پوشاننده و امبینت','لیدهای غمگین و ملودیک','انفجار ناگهانی از فضای آرام به دیوار صدا','حال‌وهوای مراقبه‌ای'],mood:'درون‌نگر، کیهانی و غمگین',
  tip:'با فضای آرام و لت‌رینگ شروع کن و ناگهان به دیوار صدا برس. پروژه‌ی Jari Lindholm و Sébastien Pierre با شعار «کاوش موسیقایی دنیای درون».',app:{style:'doom',mode:'aeo',drums:'half',tone:'drive',bpm:90}},
 {id:'cob',n:'Children of Bodom',g:'ملودیک دث نئوکلاسیک',c:'فنلاند',tv:1,rel:'D Standard یک نیم‌پرده بالاتر از کوک توئه، ولی آلبوم Something Wild دقیقاً در کوک خودت ضبط شده.',tune:'D Standard در آلبوم‌های کلاسیک، Drop C در بعضی آهنگ‌ها، C# Standard در آلبوم اول (Something Wild) و Drop B در آلبوم‌های آخر.',src:'ویکی‌پدیا (صفحه‌ی آلبوم‌ها) و Premier Guitar',
  tr:['ملودی‌های نئوکلاسیک','دوئل گیتار و کیبورد','سولوهای سریع','ریف‌های تند با حس پاور/تراش'],mood:'سریع، پرانرژی و تاریک-کلاسیک',
  tip:'برای رنگ نئوکلاسیک از هارمونیک مینور و کادانس V به i استفاده کن. جالب برای تو: آلبوم Something Wild با همین کوک C# Standard ضبط شده.',app:{style:'melodeath',mode:'hm',drums:'metal',tone:'drive',bpm:170}},
 {id:'alle',n:'Allegaeon',g:'ملودیک تکنیکال دث',c:'آمریکا (کلرادو)',tv:1,rel:'شش سیم بالای گیتارهاشون در کوک E استاندارده (سه نیم‌پرده بالاتر از تو) و سیم‌های اضافه بم‌تر؛ برای نزدیک شدن، ریف‌ها رو روی سیم‌های بم خودت جابه‌جا کن.',tune:'گیتار چندسیمه با سیم‌های بالای استاندارد. Damnum: ۸ سیم E B E A D G B E. Apoptosis: ترکیب ۸ سیم (Drop E)، ۷ سیم B Standard، ۷ سیم Drop A و یک آهنگ ۶ سیم استاندارد. Proponent for Sentience: بیشتر ۸ سیم Drop E.',src:'کتاب‌های رسمی تب Sheet Happens، ویکی‌پدیا، Metal Injection و Loudwire',
  tr:['قطعه‌های گیتار کلاسیک و آکوستیک','ریف‌های تکنیکال با گروو سنگین','عناصر سمفونیک و پراگرسیو','تم‌های علمی'],mood:'دقیق، حماسی و علمی',
  tip:'Greg Burgess گفته از ملودیک دث گیتارمحور شروع کردن و کم‌کم عناصر تکنیکال، سمفونیک و پراگرسیو اضافه شده. کنار ریف تکنیکال، یک میان‌پرده‌ی آکوستیک بذار.',app:{style:'techdeath',mode:'aeo',drums:'metal',tone:'drive',bpm:180}},
 {id:'inf',n:'Inferi',g:'ملودیک تکنیکال دث',c:'آمریکا (نشویل)',tv:2,rel:'یک نیم‌پرده پایین‌تر از کوک تو؛ همون فرت‌ها روی گیتار تو یک نیم‌پرده زیرتر صدا می‌دن.',tune:'C Standard. طبق Songsterr (گزارش تو). من Songsterr رو بررسی کردم ولی کوک هر تب رو با جاوااسکریپت نمایش می‌ده و نتونستم مستقیم ببینمش.',src:'Songsterr (گزارش تو)، Distorted Sound و Everything Is Noise',
  tr:['لیدهای ملودیک گیرا در دل تکنیک','بیس ویرتوئوز','ارکستراسیون و عناصر سمفونیک','سرعت بالا بدون فدا کردن ملودی'],mood:'حماسی، سمفونیک و بی‌رحم',
  tip:'ملودی رو فدای تکنیک نکن؛ نقدها دقیقاً همین رو نقطه‌ی قوتشون می‌دونن. هارمونیک مینور و آرپژهای سوییپ روی یک پایه‌ی بلست‌بیت.',app:{style:'techdeath',mode:'hm',drums:'blast',tone:'drive',bpm:190}},
 {id:'dra',n:'Draconian',g:'گاتیک دووم / دث-دووم',c:'سوئد',tv:2,rel:'Drop C یعنی C G C F A D: پنج سیم بالا یک نیم‌پرده بالاتر از کوک تو (مثل D Standard) و سیم ششم یک نیم‌پرده پایین‌تر. پاورکوردها روی سیم ششم با یک انگشت (شکل Drop) زده می‌شن.',tune:'Drop C. طبق Songsterr (گزارش تو). من Songsterr رو بررسی کردم ولی کوک هر تب رو با جاوااسکریپت نمایش می‌ده و نتونستم مستقیم ببینمش.',src:'Songsterr (گزارش تو)، ویکی‌پدیا، Metal Music Archives، Equipboard و Distorted Sound',
  tr:['تضاد صدای گراول و صدای زنانه‌ی کلین','لایه‌های هارمونی گیتار','عناصر سمفونیک و کیبورد','درام دووم خلوت با گاهی دابل کیک'],mood:'سوگوار، دراماتیک و گاتیک',
  tip:'Johan Ericson از Katatonia، Paradise Lost و Anathema به‌عنوان نقطه‌ی شروع نام برده. آکوردهای کشیده، هارمونی گیتار روی هم، و فضا برای وکال بذار.',app:{style:'doom',mode:'aeo',drums:'half',tone:'drive',bpm:75}},
 {id:'sat',n:'Saturnus',g:'ملودیک دث/دووم با رنگ گاتیک',c:'دانمارک',tv:2,rel:'دقیقاً همون کوک گیتار تو.',tune:'C# Standard. طبق Songsterr (گزارش تو). من Songsterr رو بررسی کردم ولی کوک هر تب رو با جاوااسکریپت نمایش می‌ده و نتونستم مستقیم ببینمش.',src:'Songsterr (گزارش تو)، ویکی‌پدیا، heavymetal.ch و Metalbite',
  tr:['تمپوی آهسته و ریف‌های سنگین کشیده','خطوط ملودیک غمگین گیتار','بیس جلو با ملودی‌های فرعی','میان‌پرده‌های گیتار کلین و پیانو','سه سبک وکال: کلین، گراول و دکلمه'],mood:'غمگین، درون‌نگر و سوگوار',
  tip:'آهسته و کشیده بنواز؛ وقتی گیتارها هارمونی می‌زنن، بیس یک ملودی فرعی می‌زنه. میان‌پرده‌ی کلین بین بخش‌های سنگین.',app:{style:'doom',mode:'aeo',drums:'half',tone:'drive',bpm:70}}];
var BD={i:0};
function bandRender(){var box=$('bandlist');if(!box)return;box.innerHTML='';
  BANDS.forEach(function(b,i){var x=EL('button','litem','<span class="ltr">'+b.n+'</span><small>'+b.g+'</small>');x.setAttribute('aria-pressed',i===BD.i);x.onclick=function(){BD.i=i;bandRender();};box.appendChild(x);});
  var b=BANDS[BD.i],st=STYLES[b.app.style];
  var h='<div class="bhead"><div><div class="bn ltr">'+b.n+'</div><div class="hint">'+b.g+'، '+b.c+'</div></div><span class="vbadge '+(b.tv===1?'ok':b.tv===2?'mid':'no')+'">'+(b.tv===1?'کوک تأییدشده':b.tv===2?'کوک طبق Songsterr':'کوک تأیید نشد')+'</span></div>'+
    '<div class="gline"><b>کوک:</b> '+b.tune+'</div>'+(b.rel?'<div class="gline"><b>'+(TUNING.id===TUNREF?'نسبت به گیتار تو (C# Standard):':'نسبت به C# Standard:')+'</b> '+b.rel+'</div>':'')+'<div class="gline"><b>حال‌وهوا:</b> '+b.mood+'</div>'+
    '<div class="gline"><b>تکنیک‌ها و عناصر:</b></div><div class="tags">'+b.tr.map(function(t){return '<span>'+t+'</span>';}).join('')+'</div>'+
    '<div class="gline"><b>نکته برای ساختن:</b> '+b.tip+'</div>'+
    '<div class="gline"><b>تنظیمات پیشنهادی در برنامه:</b> سبک '+st.name+'، مُد <span class="ltr">'+MODES[b.app.mode].n+'</span>، تمپوی حدود '+fa(b.app.bpm)+'. این‌ها پیشنهاد من بر اساس سبک بند هستن، نه تحلیل آهنگ خاص.</div>'+
    '<p class="credit">منابع: '+b.src+'</p>';
  $('bandcur').innerHTML=h;
  var r=EL('div','row');var go=EL('button','btn primary','ساختن ریف به سبک '+b.n);go.onclick=function(){bandBuild(b);};r.appendChild(go);
  var ap=EL('button','btn','اعمال سبک و مُد');ap.onclick=function(){curStyle=b.app.style;if($('style'))$('style').value=curStyle;if(S.mode!==b.app.mode)setMode(b.app.mode);else renderModes();toast('سبک و مُد روی '+b.n+' تنظیم شد');};r.appendChild(ap);
  $('bandcur').appendChild(r);
  var L=(STYLES[b.app.style].prog[b.app.mode]||[]).slice(0,3),pb=EL('div','bprog');pb.appendChild(EL('h3','h3','سه پیشرفت مناسب این حال‌وهوا'));
  L.forEach(function(p){var chords=p[0].map(function(j){return triad(b.app.mode,j);}),c=EL('div','prow','<b class="ltr">'+chords.map(function(x){return x.rn;}).join(' – ')+'</b><span class="ltr">'+chords.map(function(x){return x.name;}).join('  ')+'</span><span class="hint">'+p[1]+'</span>');
    var bb=EL('button','tb','شنیدن');bb.onclick=function(){listenProg(chords);};c.appendChild(bb);pb.appendChild(c);});
  $('bandcur').appendChild(pb);}
function bandBuild(b){curStyle=b.app.style;if($('style'))$('style').value=curStyle;if(S.mode!==b.app.mode){S.mode=b.app.mode;renderModes();}
  var L=STYLES[b.app.style].prog[b.app.mode],p=L[Math.floor(Math.random()*Math.min(4,L.length))];
  loadProg(p[0].map(function(j){return triad(S.mode,j);}));S.drums=b.app.drums;S.bpm=b.app.bpm;S.tone=b.app.tone;setTone();$('rname').value='به سبک '+b.n;syncControls();changed();goPage('editor');}
(function(){if(!$('bandbox'))return;bandRender();})();

(function(){var gp=$('guideprin');if(gp)MGP.forEach(function(x){gp.appendChild(EL('div','','<b>'+x[0]+'</b><p>'+x[1]+'</p>'));});guideRender();})();
