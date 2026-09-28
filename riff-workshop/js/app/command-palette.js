/* پالت فرمان (Ctrl+K) و جست‌وجوی آکورد */
/* ---------- command palette ---------- */
function cmdList(){var L=[];
  PAGES.forEach(function(d){L.push({t:'رفتن به: '+d.t,k:d.t+' '+d.id,f:function(){goPage(d.id);}});});
  L.push({t:'پخش یا توقف ریف',k:'play پخش',f:function(){goSec('riff');playing?stop():start();}});
  L.push({t:'ریف جدید',k:'new',f:function(){goSec('riff');$('wipe').click();}});
  L.push({t:'شروع راند دسته‌شناسی',k:'quiz',f:function(){goSec('fq');if(!FQ.on)$('fqgo').click();}});
  L.push({t:'سؤال جدید گوش',k:'ear',f:function(){goSec('ear');earNew();}});
  KEYLAB.forEach(function(l,k){L.push({t:'کلید: '+l,k:'key '+l,f:function(){setKey(k,false);}});});
  MODEKEYS.forEach(function(m){L.push({t:'مُد: '+MODES[m].n,k:'mode '+m,f:function(){setMode(m);}});});
  Object.keys(LESSONS).forEach(function(k){L.push({t:'درس: '+LESSONS[k].name,k:'lesson',f:function(){goSec('riff');loadPreset(k);}});});
  CT.forEach(function(t){L.push({t:'آکورد در کاوشگر: '+PCN[S.key]+t.sfx,k:'chord '+t.sfx,f:function(){goSec('chords');$('cxroot').value=S.key;$('cxtype').value=t.id;renderExplorer();reveal($('cxout'));}});});
  SCL.forEach(function(s,i){L.push({t:'اسکیل: '+s[1],k:'scale '+s[0],f:function(){goSec('scl');SCS.i=i;sclRender();}});});
  return L;}
var CK=null;
function openCmd(){if(CK){CK.close();return;}var ov=EL('div','ck'),bx=EL('div','ckbox'),inp=EL('input','ckin'),ul=EL('div','cklist');
  inp.placeholder='دنبال چی می‌گردی؟ (بخش، کلید، مُد، آکورد، اسکیل، درس...)';inp.setAttribute('dir','auto');bx.appendChild(inp);bx.appendChild(ul);ov.appendChild(bx);document.body.appendChild(ov);
  var L=cmdList(),sel=0,cur=[];
  function draw(){var q=inp.value.trim().toLowerCase();cur=L.filter(function(x){return !q||(x.t+' '+x.k).toLowerCase().indexOf(q)>=0;}).slice(0,40);sel=Math.min(sel,Math.max(0,cur.length-1));
    ul.innerHTML='';cur.forEach(function(x,i){var it=EL('button','cki'+(i===sel?' on':''));it.textContent=x.t;it.onclick=function(){run(i);};ul.appendChild(it);});
    if(!cur.length)ul.appendChild(EL('div','hint','چیزی پیدا نشد'));var on=ul.querySelector('.on');if(on&&on.scrollIntoView)on.scrollIntoView({block:'nearest'});}
  function run(i){var x=cur[i];CK.close();if(x)x.f();}
  inp.oninput=function(){sel=0;draw();};
  inp.onkeydown=function(e){if(e.key==='ArrowDown'){e.preventDefault();sel=Math.min(cur.length-1,sel+1);draw();}else if(e.key==='ArrowUp'){e.preventDefault();sel=Math.max(0,sel-1);draw();}else if(e.key==='Enter'){e.preventDefault();run(sel);}else if(e.key==='Escape'){CK.close();}};
  ov.onclick=function(e){if(e.target===ov)CK.close();};
  CK={close:function(){ov.remove();CK=null;}};draw();inp.focus();}
document.addEventListener('keydown',function(e){if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();e.stopPropagation();openCmd();}
  else if(e.key===' '&&RT.on&&e.target.tagName!=='INPUT'&&e.target.tagName!=='TEXTAREA'&&e.target.tagName!=='SELECT'){e.preventDefault();e.stopImmediatePropagation();rtTap();}},true);

/* ---------- chord symbol search ---------- */
var CALIAS={'':'maj','maj':'maj','M':'maj','major':'maj','m':'min','min':'min','-':'min','minor':'min','5':'p5','dim':'dim','°':'dim','o':'dim','aug':'aug','+':'aug','sus2':'sus2','sus4':'sus4','sus':'sus4',
 'm7':'m7','min7':'m7','-7':'m7','maj7':'maj7','M7':'maj7','Δ':'maj7','Δ7':'maj7','7':'dom7','dom7':'dom7','m7b5':'m7b5','ø':'m7b5','ø7':'m7b5','dim7':'dim7','°7':'dim7','o7':'dim7',
 'mmaj7':'mmaj7','m(maj7)':'mmaj7','mM7':'mmaj7','minmaj7':'mmaj7','7sus4':'7sus4','7sus':'7sus4','add9':'add9','madd9':'madd9','m(add9)':'madd9','m6':'m6','6':'6','m9':'m9','maj9':'maj9','M9':'maj9','9':'9','m11':'m11','13':'13','6/9':'69','69':'69',
 'maj7#11':'maj7s11','m(maj9)':'mmaj9','mmaj9':'mmaj9','7b9':'7b9','7#9':'7s9','5add9':'p5a9','b5':'tri','(b5)':'tri','5b5':'tri','dim(maj7)':'dimM7','maj7#5':'augM7','5(b9)':'b9c'};
var CXNAME=null;
function parseChord(str){var m=String(str).trim().match(/^([A-Ga-g])\s*(#|b|♯|♭)?\s*(.*)$/);if(!m)return null;
  var pc=(NAT[LET.indexOf(m[1].toUpperCase())]+(m[2]==='#'||m[2]==='♯'?1:m[2]==='b'||m[2]==='♭'?-1:0)+12)%12,sfx=m[3].replace(/\s+/g,'');
  var id=CALIAS[sfx]||CALIAS[sfx.toLowerCase()];return id?{pc:pc,id:id,name:m[1].toUpperCase()+(m[2]==='#'||m[2]==='♯'?'#':m[2]?'b':'')}:null;}
