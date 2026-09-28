/* بانک پیشرفت‌های آکورد */
/* ---------- chord progression bank ---------- */
var FEELT={e:'حماسی',d:'تاریک',m:'غمگین',h:'امیدوار',t:'پرتنش',a:'تهاجمی',y:'هیپنوتیزمی',c:'سینمایی',n:'نئوکلاسیک',r:'پایان‌بندی قوی',f:'معلق',g:'سرد و خشن',w:'سنگین',x:'دیسونانت',l:'سوگوار',p:'رو به جلو',b:'روشن'};
var WHERET={in:'اینترو',ve:'ورس',pc:'پیش‌کُر',ch:'کُر',br:'بریج',so:'پشت سولو',bd:'بریک‌داون',ou:'آوترو',bu:'بیلدآپ',at:'بخش اتمسفریک',ri:'ریف اصلی'};
var SD={
 melodeath:{name:'ملودیک دث متال',rh:'gal',tech:'گالاپ و چاگ پالم‌میوت زیر لیدهای دوصدایی، ترمولو پیکینگ، آرپژ با لت رینگ. حس غالب: حماسی و غمگین.',p:{
  aeo:'0526/em/chso;0560/er/chou;0656/ym/inat;0362/dp/ve;0263/m/br;5600/er/ch;0356/me/vech;0536/cm/pc;0654/md/ve;3560/e/buch',
  dor:'03/mh/so;0360/eh/ch;0230/h/bu;0630/m/so;0304/p/ve;0430/m/ve;0623/e/ch;3600/h/ou',
  phr:'01/dt/ribd;0121/ap/ve;0510/dc/br;0160/df/in;0310/wl/br;0651/d/ch;0210/d/ve;5100/cr/ou',
  hm:'0340/nr/chso;0540/dn/in;0534/et/pc;5340/r/bu;0140/n/so;0454/td/ve;3400/r/ou;0604/nt/so',
  loc:'01/tx/bd;0410/x/br;0121/t/ve;0560/d/br;0431/d/ou;0310/w/ve;0210/t/ve;1010/x/bd',
  ion:'0453/eb/ch;5304/mh/ch;0534/bh/ou;3425/ec/pc;0234/bp/so;3400/er/ch;0340/br/ou;5434/c/ch',
  lyd:'01/fb/at;0140/fb/in;0210/f/br;5410/h/ou;0154/c/at;0610/f/at;5100/h/ch;0121/f/in',
  mix:'0630/ab/ri;06/y/so;6300/er/ch;0430/b/ve;5600/e/ch;0360/b/ve;0656/c/br;3600/r/ou'}},
 techdeath:{name:'تکنیکال دث متال',rh:'td',tech:'دولاچنگ‌های پیوسته با لهجه‌های نامنظم، سوییپ و پرش سیم، آکوردهای کاسته و تریتون، تغییر کسر میزان. حس غالب: پرتنش و دیسونانت.',p:{
  aeo:'01/tx/ri;0410/ta/ve;0514/dt/ve;0156/ap/ch;0610/t/ri;0314/d/br;0216/tp/so;5100/tr/ou',
  phr:'01/ax/ri;0104/xa/bd;0410/xt/ve;0131/ap/ve;0610/t/so;0541/dx/br;1040/tx/ri;0341/dt/br;0123/pa/bu',
  hm:'0401/nt/ri;0604/nt/so;0140/nr/so;0514/nd/ve;0364/tn/br;0254/nx/ch;5600/nt/bu;0451/dn/ve;3640/nr/ou',
  loc:'01/xt/ri;04/xg/ri;0141/xa/ve;0651/dx/br;0340/t/ve;0510/d/bd;4010/x/bd;0241/tx/so',
  dor:'0301/p/ve;0503/tx/ri;0130/p/so;0650/t/br;0365/t/br;0431/d/ve;0236/p/ch;0103/a/ri',
  ion:'06/tx/ri;0460/tr/so;0265/t/br;5600/tr/ch;0362/p/ve;1406/t/so;0514/p/ch;3625/t/br',
  lyd:'03/xf/at;0134/tp/bu;01/f/so;5310/t/br;0651/f/ve;0430/xf/br;1030/t/in;0231/ft/so',
  mix:'02/tx/ri;0623/t/ve;0460/p/so;5230/t/br;0326/pt/ve;6020/x/bd;0632/t/br;3602/t/ou'}},
 progdeath:{name:'پراگرسیو دث متال',rh:'pd',tech:'ریتم‌های سنکوپ و گروه‌بندی ۳+۳+۲، کسرهای لنگ، بخش‌های کلین و آکوردهای گسترده (add9، maj7، m9) کنار ریف‌های سنگین. حس غالب: سینمایی و معلق.',p:{
  aeo:'0256/ec/ch;0452/mf/at;5260/cr/ch;0645/mf/br;0326/p/ve;3456/e/bu;0524/mc/so;2603/f/ch;5640/mr/ou',
  dor:'03/hy/so;0130/h/ve;0342/f/at;0631/c/ch;1300/hr/ou;0263/e/ch;0463/f/br;3106/m/br;0314/p/ve',
  phr:'0160/df/at;0610/d/ve;0512/c/ch;0261/f/br;1065/dm/ou;0316/d/ve;0156/c/ch;5610/cr/ou',
  lyd:'01/fb/at;0165/fc/ch;0510/h/in;5104/he/ch;0251/f/br;0410/b/ve;0125/f/bu;6010/f/ou;0145/c/so',
  mix:'0630/b/ve;0463/f/br;0316/c/ch;5600/e/ch;0160/f/so;0564/m/br;3460/er/ou;0613/f/at',
  ion:'0514/hb/ve;0253/c/ch;3425/ec/pc;0452/m/br;5304/mh/ch;1405/h/so;0314/b/ve;0134/b/bu',
  hm:'0345/nc/ch;0514/nd/ve;0254/ct/br;5400/r/ou;0435/nm/so;3405/c/br;0605/nt/bu;0145/n/ch',
  loc:'0160/df/at;0561/dc/br;0231/t/ve;0451/x/br;0361/d/so;1600/t/ou;0134/x/bu;0651/d/ch'}},
 black:{name:'بلک متال',rh:'bm',tech:'ترمولو پیکینگ روی آکوردهای باز و سیم‌های باز، بلست‌بیت، پیشرفت‌های کند و ساکن زیر ریتم خیلی سریع. حس غالب: سرد، خشن و هیپنوتیزمی.',p:{
  aeo:'05/gy/at;0656/ge/ch;0560/eg/ch;0305/g/ve;0453/mg/ve;0265/eg/ch;0534/lg/br;0605/y/at;5600/er/ou;0350/gl/ve',
  phr:'01/gd/ri;0105/gd/ve;0510/dg/ch;0165/dl/at;0310/wg/br;1060/dy/at;0610/g/ve;0561/ed/ch;0210/dg/ve',
  loc:'01/xg/ri;0401/xg/ve;0160/dx/at;0541/dx/br;0310/gw/br;0651/dx/ch;4100/xr/ou;0210/g/ve',
  hm:'04/ng/ve;0540/dn/ch;0340/nr/ch;0605/ng/at;0140/nd/so;5450/en/ch;0534/dt/br;3400/r/ou',
  dor:'03/ym/at;0630/em/ch;0236/e/ch;0365/l/br;0430/m/ve;0603/y/at;3600/er/ou;0260/m/ve',
  ion:'0534/be/ch;5304/me/ch;0453/eb/ch;0354/h/at;3455/e/bu;0253/c/at;5434/m/ch;0304/y/at',
  lyd:'01/fb/at;0154/fc/at;0510/b/ch;5100/h/ou;0210/f/at;0121/y/at;4100/er/ch;0610/f/br',
  mix:'06/yb/at;0630/e/ch;6300/er/ou;0365/m/br;0560/e/ch;0430/b/ve;3600/er/ch;0656/y/at'}},
 doom:{name:'دووم متال',rh:'do',tech:'تمپوی آهسته، آکوردهای کشیده با لت رینگ، ریف‌های سنگین روی سیم‌های بم، ملودی‌های سوگوار و گاهی کلین. حس غالب: سنگین و سوگوار.',p:{
  aeo:'05/wl/ri;03/lw/ve;0530/lw/ch;0654/lm/ve;30/lr/ou;0450/ld/ch;0560/el/ch;0230/mw/br;0630/w/br;5400/lr/ou',
  phr:'01/wd/ri;0105/wd/ve;0510/ld/ch;10/wr/ou;0310/lw/br;0610/dw/at;0130/wl/ve;5100/cl/ch;0210/dw/ve',
  hm:'0540/ln/ch;0340/lr/ch;54/lt/so;04/dw/ri;0354/lc/br;0140/nw/ve;3400/rl/ou;0534/cl/ch;0605/tw/br',
  dor:'03/mw/so;0360/le/ch;0230/m/ve;0630/w/br;30/lr/ou;0430/l/ve;0304/w/ve;0623/c/ch',
  loc:'01/wx/ri;0510/lx/ch;0410/xw/ve;10/wx/ou;0310/w/br;0651/lx/br;0210/x/ve;0561/dx/at',
  ion:'03/hl/at;0530/ml/ch;5300/mr/ou;0354/lc/br;0453/el/ch;30/rl/ou;0230/m/ve;5430/lr/ou',
  lyd:'01/fl/at;0510/lf/ch;5100/m/ou;0210/f/br;0154/c/at;4100/er/ch;0650/fl/br;0125/fl/at',
  mix:'06/wy/ri;0630/wl/ch;6300/er/ou;0306/w/ve;0560/el/ch;0430/l/ve;3600/r/ou;0656/l/at'}}};
var STYLES={};Object.keys(SD).forEach(function(k){var d=SD[k],pr={};Object.keys(d.p).forEach(function(m){pr[m]=d.p[m].split(';').map(function(x){var q=x.split('/');
  return [q[0].split('').map(Number),q[1].split('').map(function(c){return FEELT[c];}).join('، '),q[2].match(/../g).map(function(c){return WHERET[c];}).join('، ')];});});
  STYLES[k]={name:d.name,rh:d.rh,tech:d.tech,prog:pr};});

var curStyle='melodeath';
var ROMAN=['I','II','III','IV','V','VI','VII'];
function triad(mk,j){var iv=MODES[mk].iv,nm=spell(iv);
  var a=iv[j],b=iv[(j+2)%7],c=iv[(j+4)%7],t3=(b-a+12)%12,t5=(c-a+12)%12;
  var q=t3===4&&t5===7?'maj':t3===3&&t5===7?'min':t3===3&&t5===6?'dim':t3===4&&t5===8?'aug':'other';
  var root=nm[j],name=root+(q==='min'?'m':q==='dim'?'dim':q==='aug'?'aug':'');
  var r=ROMAN[j];r=(q==='min'||q==='dim')?r.toLowerCase():r;r+=q==='dim'?'°':q==='aug'?'+':'';
  return {name:name,rn:r,q:q,pc:(S.key+a)%12,tones:[nm[j],nm[(j+2)%7],nm[(j+4)%7]],pcs:[a,b,c].map(function(x){return (S.key+x)%12;})};}
// آکورد پیشرفت به‌صورت صدابندی قابل‌اجرا (برای ایده‌ها)
function triadVoicing(ch){var V=solveVoicings(ch.pc,CTI[ch.q==='min'?'min':ch.q==='dim'?'dim':ch.q==='aug'?'aug':'maj'],'full');return V.length?V[0].notes:null;}
function placeChord(ch){var lf=(ch.pc-1+12)%12;var pos=lf<=7?{s:5,f:lf}:{s:4,f:(ch.pc-6+12)%12};
  pos.power=(ch.q==='maj'||ch.q==='min');return pos;}
function renderBank(){
  var sel=$('style');if(!sel.options.length){Object.keys(STYLES).forEach(function(k){var o=document.createElement('option');o.value=k;o.textContent=STYLES[k].name;sel.appendChild(o);});sel.value=curStyle;}
  $('bankmode').textContent=MN();
  if($('bankinfo'))$('bankinfo').innerHTML='<b>'+STYLES[curStyle].name+':</b> '+STYLES[curStyle].tech+' <br>این پیشرفت‌ها فقط از آکوردهای خود مُد ساخته شدن و الگوهای رایج هارمونی این سبک‌ان؛ به آهنگ خاصی نسبت داده نشدن. «ساختن ریف» ریتم مخصوص همین سبک رو می‌سازه. روی هر آکورد بزن تا ۸ ریف و سولو برای همون آکورد ببینی.'+(STYLES[curStyle].prog[S.mode]?'':'<br>برای <span class="ltr">'+MODES[S.mode].n+'</span> الگوی درجه‌ها از <span class="ltr">'+MODES[MODES[S.mode].base].n+'</span> گرفته شده و آکوردها از خود این اسکیل ساخته می‌شن.');
  var box=$('bank');box.innerHTML='';
  var list=(STYLES[curStyle].prog[S.mode])||(STYLES[curStyle].prog[MODES[S.mode].base])||[];
  list.forEach(function(p){
    var chords=p[0].map(function(j){return triad(S.mode,j);});
    var c=document.createElement('div');c.className='pcard';
    var rn=document.createElement('div');rn.className='rn';rn.textContent=chords.map(function(x){return x.rn;}).join(' – ');c.appendChild(rn);
    var chs=document.createElement('div');chs.className='chs';
    var ideas=null;
    chords.forEach(function(x){var sp=document.createElement('button');sp.type='button';sp.textContent=x.name;sp.title=x.tones.join(' ')+' — ۸ ریف و سولو';if(x.pc===S.key)sp.className='home';
      sp.onclick=function(){var was=sp.getAttribute('aria-pressed')==='true';chs.querySelectorAll('button').forEach(function(o){o.setAttribute('aria-pressed','false');});if(ideas){ideas.remove();ideas=null;}
        if(was)return;sp.setAttribute('aria-pressed','true');ideas=EL('div','bankideas');ideas.appendChild(EL('div','hint','ایده‌ها برای <b class="ltr">'+x.name+'</b> ('+x.rn+'):'));
        ideas.appendChild(chordIdeaRow(function(){return triadVoicing(x);},x.pc,x.pcs,x.name));chs.after(ideas);};
      chs.appendChild(sp);});
    c.appendChild(chs);
    var f=document.createElement('div');f.className='feel';f.textContent=p[1];c.appendChild(f);
    var t=document.createElement('div');t.className='tip';t.textContent='کجا: '+p[2];c.appendChild(t);
    var r=document.createElement('div');r.className='row';
    var b1=document.createElement('button');b1.className='btn';b1.innerHTML='شنیدن';b1.onclick=function(){listenProg(chords);};
    var b2=document.createElement('button');b2.className='btn';b2.textContent='ساختن ریف';b2.onclick=function(){loadProg(chords);};
    r.appendChild(b1);r.appendChild(b2);c.appendChild(r);box.appendChild(c);
  });
}
function listenProg(chords){
  if(playing)stop();
  whenReady(function(){
    var seq=chords.length===2?chords.concat(chords):chords,beat=60/Math.max(80,Math.min(S.bpm,160)),t=ac.currentTime+0.05;
    seq.forEach(function(ch){var pos=placeChord(ch),m=OPEN[pos.s]+pos.f;
      var ms=pos.power?[m,m+7,m+12]:(ch.q==='dim'?[m,m+6]:[m]);
      choke(t);playMidis(ms,t,false);t+=beat*2;});
    setTimeout(function(){if(!playing)choke(ac.currentTime);},(t-ac.currentTime)*1000);
  });
}
function loadProg(chords){
  if(playing)stop();
  var seq=chords.length===2?chords.concat(chords):chords,E=[],rh=(STYLES[curStyle]||{}).rh||'gal';
  seq.forEach(function(ch){var pos=placeChord(ch),m=OPEN[pos.s]+pos.f;
    var pc=pos.power?[{s:pos.s,f:pos.f},{s:pos.s-1,f:m+7-OPEN[pos.s-1]},{s:pos.s-2,f:m+12-OPEN[pos.s-2]}]:[{s:pos.s,f:pos.f}];
    var root=[{s:pos.s,f:pos.f}],cp=function(a){return a.map(function(x){return {s:x.s,f:x.f};});};
    var V=solveVoicings(ch.pc,CTI[ch.q==='min'?'min':ch.q==='dim'?'dim':ch.q==='aug'?'aug':'maj'],'full'),vo=V.length?V[0].notes:pc;
    if(rh==='gal'){for(var b=0;b<4;b++){var a=blankEv('16',false,false,cp(root));a.t.pm=true;var c=blankEv('16',false,false,cp(root));c.t.pm=true;var h=blankEv('8',false,false,cp(pc));h.t.acc=true;E.push(a,c,h);}}
    else if(rh==='td'){[3,3,3,3,2,2].forEach(function(g){for(var k=0;k<g;k++){var e=blankEv('16',false,false,k===0?cp(pc):cp(root));if(k===0)e.t.acc=true;else e.t.pm=true;E.push(e);}});}
    else if(rh==='pd'){[3,3,2].forEach(function(g){for(var k=0;k<g;k++){var e=blankEv('8',false,false,k===0?cp(pc):cp(root));if(k===0){e.t.acc=true;e.t.ring=true;}else e.t.pm=true;E.push(e);}});}
    else if(rh==='bm'){var e=blankEv('w',false,false,cp(vo));e.t.trem=true;E.push(e);}
    else{var e2=blankEv('w',false,false,cp(pos.power?pc:vo));e2.t.ring=true;e2.t.acc=true;E.push(e2);}
  });
  S.events=E;S.cur=0;S.sel=null;S.ts={n:4,d:4};S.drums=rh==='bm'?'blast':rh==='do'?'half':rh==='gal'?'gallop':rh==='td'?'metal':'rock';curId=null;$('rname').value='';
  syncControls();buildTab();changed();renderLib();
  toast('ریف '+STYLES[curStyle].name+' ساخته شد؛ حالا نت‌هاش رو تغییر بده');
  reveal($('tab'));
}

$('style').onchange=function(){curStyle=this.value;renderBank();};
