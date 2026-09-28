/* خروجی Guitar Pro 7/8 (.gp): ریف به متن AlphaTex تبدیل می‌شه و کتابخانه‌ی alphaTab ازش فایل .gp می‌سازه */
/* ---------- Guitar Pro export ---------- */
var GPLIB='vendor/alphatab/alphaTab.min.js',GPLOAD=null;
// کتابخانه فقط بار اولی که دکمه زده می‌شه لود می‌شه (روی سرعت صفحه اثری نداره)
function gpLoad(){if(window.alphaTab)return Promise.resolve(window.alphaTab);if(GPLOAD)return GPLOAD;
  GPLOAD=new Promise(function(res,rej){var s=document.createElement('script');s.src=GPLIB;s.async=true;
    s.onload=function(){if(window.alphaTab)res(window.alphaTab);else{GPLOAD=null;rej(new Error('alphaTab'));}};
    s.onerror=function(){GPLOAD=null;rej(new Error('load'));};document.head.appendChild(s);});
  return GPLOAD;}
var GPDUR={w:1,h:2,q:4,'8':8,'16':16,'32':32};
var GPINST={drive:'distortionguitar',od:'overdrivenguitar',clean:'electricguitarclean',acoustic:'acousticguitarsteel',synth:'distortionguitar'};
function gpNoteName(m){return PCN[m%12]+(Math.floor(m/12)-1);}
function gpText(x){return String(x||'').replace(/["\\]/g,'').replace(/\s+/g,' ').trim();}
// یک رویداد (یا بخشی از یک رویداد که از خط میزان رد شده) به یک ضرب AlphaTex
// part: {d,dot,tri,first,last}
function gpBeat(e,p){
  var dur='.'+GPDUR[p.d],bfx=[];if(p.dot)bfx.push('d');if(p.tri)bfx.push('tu 3');
  if(T(e,'tap')&&p.first)bfx.push('tt');if(T(e,'trem'))bfx.push('tp 16');
  var fx=bfx.length?'{'+bfx.join(' ')+'}':'';
  if(e.rest||!e.notes.length)return 'r'+dur+fx;
  var sem=e.bend||2,q=sem*2,tie=T(e,'tie')||!p.first;
  var notes=e.notes.map(function(n){var nf=[];
    if(tie){nf.push('t');}
    else{if(T(e,'pm'))nf.push('pm');if(T(e,'acc'))nf.push('ac');if(T(e,'ghost'))nf.push('g');if(T(e,'stac'))nf.push('st');
      if(e.sin==='b')nf.push('sib');else if(e.sin==='a')nf.push('sia');
      if(e.bt==='b')nf.push('b (0 '+q+')');else if(e.bt==='br')nf.push('b (0 '+q+' '+q+' 0)');else if(e.bt==='pb')nf.push('b ('+q+' '+q+' 0)');
      if(e.harm==='nh')nf.push('nh');else if(e.harm==='ah')nf.push('ph');}
    if(T(e,'ring'))nf.push('lr');if(T(e,'vib'))nf.push('v');
    if(p.last){if(e.lg==='h')nf.push('h');else if(e.lg==='sl')nf.push('sl');else if(e.lg==='ss')nf.push('ss');
      if(e.sout==='d')nf.push('sod');else if(e.sout==='u')nf.push('sou');}
    var fret=T(e,'dead')&&!tie?'x':n.f;
    return fret+'.'+(n.s+1)+(nf.length?'{'+nf.join(' ')+'}':'');});
  return (notes.length>1?'('+notes.join(' ')+')':notes[0])+dur+fx;}
// کل ریف به AlphaTex: نت‌هایی که از خط میزان رد می‌شن با تای به دو بخش تقسیم می‌شن و میزان آخر با سکوت کامل می‌شه
function riffToTex(events,o){
  o=o||{};var ts=o.ts||S.ts,bar=ts.n*384/ts.d,bars=[],cur=[],pos=0;
  function push(s,len){cur.push(s);pos+=len;if(pos>=bar-1e-6){bars.push(cur);cur=[];pos-=bar;}}
  events.forEach(function(e){var tk=ticks(e);
    if(e.tri||pos+tk<=bar+1e-6){push(gpBeat(e,{d:e.d,dot:e.dot,tri:e.tri,first:true,last:true}),tk);return;}
    var parts=decomp(bar-pos).concat(decomp(tk-(bar-pos)));
    parts.forEach(function(p,j){push(gpBeat(e,{d:p.d,dot:p.dot,tri:false,first:j===0,last:j===parts.length-1}),DT[p.d]*(p.dot?1.5:1));});});
  if(cur.length){decomp(bar-pos).forEach(function(p){cur.push('r.'+GPDUR[p.d]+(p.dot?'{d}':''));});bars.push(cur);}
  if(!bars.length)bars.push(decomp(bar).map(function(p){return 'r.'+GPDUR[p.d]+(p.dot?'{d}':'');}));
  var tn=OPEN.map(gpNoteName).join(' ');
  return '\\title "'+(gpText(o.title)||'Riff')+'"\n\\subtitle "'+gpText(o.subtitle)+'"\n\\tempo '+Math.round(o.bpm||S.bpm)+'\n'+
    '\\track "'+(gpText(o.track)||'Guitar')+'" { instrument '+(GPINST[o.tone||S.tone]||'distortionguitar')+' }\n\\staff {tabs}\n\\tuning ('+tn+')\n\\ts ('+ts.n+' '+ts.d+')\n'+
    bars.map(function(b){return b.join(' ');}).join(' |\n')+' |\n';}
function gpBytes(at,tex){var st=new at.Settings(),imp=new at.importer.AlphaTexImporter();imp.initFromString(tex,st);
  var score=imp.readScore();return new at.exporter.Gp7Exporter().export(score,st);}
function gpFileName(){return (gpText($('rname').value)||'riff').replace(/[\/:*?"<>|]/g,'-')+'.gp';}
function gpExport(){
  if(!hasRiff()){toast('ریف خالیه؛ اول چند نت بنویس');return;}
  var name=$('rname').value.trim()||'Riff',tex=riffToTex(S.events,{title:name,subtitle:MN()+' · '+TUNING.name,bpm:S.bpm,tone:S.tone,ts:S.ts});
  toast('در حال ساختن فایل Guitar Pro…');
  gpLoad().then(function(at){var bytes=gpBytes(at,tex),blob=new Blob([bytes],{type:'application/octet-stream'}),url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download=gpFileName();document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(url);},4000);
    toast('فایل '+a.download+' ساخته شد؛ با Guitar Pro 7 یا 8 بازش کن');},
  function(){toast('ساختن فایل Guitar Pro انجام نشد؛ اتصال اینترنت یا باز کردن برنامه از طریق سرور رو چک کن');});}
