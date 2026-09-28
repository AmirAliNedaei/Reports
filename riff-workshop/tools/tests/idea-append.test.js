// اجرا: tools/tests/run.sh (یا BASE=http://localhost:8000/ node این‌فایل.js)
// سناریو: پیشرفت Amaj7#11 → B6 → C#m با «آرپژ لت‌رینگ»، هر کدوم به آخر ریف اضافه بشه
const BASE=process.env.BASE||'http://localhost:8000/';
function fail(m){console.log('FAIL:',m);process.exitCode=1;}
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});const p=await b.newPage({viewport:{width:1280,height:900}});const errs=[];
p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/fonts|ERR_CERT|Failed to load/.test(m.text()))errs.push(m.text());});
await p.addInitScript(()=>{try{localStorage.setItem('riff-workshop-tuning','6-std-37')}catch(e){}});await p.goto(BASE);await p.waitForTimeout(400);
await p.evaluate(()=>{S.events=[];S.key=1;S.mode='aeo';renderModes();changed();goPage('chords');});
// کارت هر آکورد رو پیدا کن و «۱. آرپژ لت‌رینگ» رو بزن
async function add(level,label){await p.evaluate(l=>{chLv=l;chDeg=-1;renderChords();},level);await p.waitForTimeout(150);
  const ok=await p.evaluate(lab=>{var c=[...document.querySelectorAll('#chcards .chcard')].find(x=>x.querySelector('.rn').textContent===lab);if(!c)return false;c.querySelector('.chideas button').click();return true;},label);
  if(!ok)fail('chord card not found: '+label);await p.waitForTimeout(250);
  return p.evaluate(()=>({n:S.events.length,page:curPage,bars:S.events.reduce((a,e)=>a+ticks(e),0)/barT()}));}
const r1=await add(3,'Amaj7#11'),r2=await add(2,'B6'),r3=await add(1,'C#m');
console.log(JSON.stringify([r1,r2,r3]));
if(!(r1.n>0&&r2.n>r1.n&&r3.n>r2.n))fail('riff did not grow with each chord');
if(r3.page!=='chords')fail('should stay on the chords page');
if(r1.bars%1||r2.bars%1||r3.bars%1)fail('each part should end on a full bar');
// نت‌های هر بخش باید نت‌های همون آکورد باشن، به ترتیب
const parts=await p.evaluate(([a,b2])=>{function pcs(from,to){var s={};S.events.slice(from,to).forEach(e=>e.notes.forEach(n=>{s[(OPEN[n.s]+n.f)%12]=1;}));return Object.keys(s).map(Number).sort((x,y)=>x-y);}return [pcs(0,a),pcs(a,b2),pcs(b2,S.events.length)];},[r1.n,r2.n]);
const want=[[1,3,4,8,9],[3,6,8,11],[1,4,8]];console.log('pitch classes',JSON.stringify(parts));
parts.forEach((ps,i)=>{if(!ps.every(x=>want[i].includes(x)))fail('part '+(i+1)+' has notes outside its chord');});
// برگردون: آخرین اضافه حذف بشه
await p.click('#toast button');await p.waitForTimeout(200);const afterUndo=await p.evaluate(()=>S.events.length);if(afterUndo!==r2.n)fail('undo should remove only the last addition ('+afterUndo+')');
// حالت «جای ریف رو بگیرن»
await p.click('#ideamode2 .chip:nth-of-type(2)');await p.evaluate(()=>{chLv=1;renderChords();});await p.waitForTimeout(150);
await p.evaluate(()=>document.querySelector('#chcards .chcard .chideas button').click());await p.waitForTimeout(400);
const rep=await p.evaluate(()=>({n:S.events.length,page:curPage,pref:PREF.idea}));console.log('replace',JSON.stringify(rep));if(rep.page!=='editor'||rep.pref!=='replace')fail('replace mode should open the editor');
await p.evaluate(()=>{stop();});
console.log('errors',errs);if(errs.length)fail('page errors: '+errs.join(' | '));await b.close();})();
