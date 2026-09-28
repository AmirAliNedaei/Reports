// اجرا: tools/tests/run.sh (یا BASE=http://localhost:8000/ node این‌فایل.js)
const BASE=process.env.BASE||'http://localhost:8000/';const OUT=process.env.OUT||require('path').join(require('os').tmpdir(),'riff-tests');require('fs').mkdirSync(OUT,{recursive:true});
function fail(m){console.log('FAIL:',m);process.exitCode=1;}
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:900}});const errs=[];
p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/fonts|ERR_CERT|Failed to load/.test(m.text()))errs.push(m.text());});
await p.addInitScript(()=>{try{localStorage.setItem('riff-workshop-tuning','6-std-37')}catch(e){}});await p.goto(BASE);await p.waitForTimeout(400);
const out={};
out.modesCount=await p.evaluate(()=>MODEKEYS.length);
out.parents=await p.evaluate(()=>SCALES.filter(s=>!s[4]).map(s=>s[1]+'→'+s[5]).join(', '));
out.bases=await p.evaluate(()=>MODEKEYS.filter(k=>ORDER.indexOf(k)<0).map(k=>k+':'+MODES[k].base+':'+MODES[k].q+':'+MODES[k].sig.join('.')).join(' '));
// open key popover and click Phrygian dominant chip
await p.click('#keypill');await p.waitForTimeout(200);
out.chips=await p.$$eval('#modes .chip',c=>c.length);
await p.evaluate(()=>{PREF.onchg='keep';});
await p.click('#modes .chip:has-text("Phrygian dominant")');await p.waitForTimeout(300);
out.after=await p.evaluate(()=>({mode:S.mode,pill:$('keypilltxt').textContent,mn:$('mnotes').textContent}));
// pages
for(const pg of ['bank','chords','neck','guide','editor','imp','ear','speed','odd','scl']){await p.evaluate(x=>goPage(x),pg);await p.waitForTimeout(250);}
out.bank=await p.evaluate(()=>document.querySelectorAll('#bank .pcard').length+' | '+(document.querySelector('#bank .pcard .chs')||{}).textContent);
out.chords=await p.evaluate(()=>document.querySelectorAll('#chcards .ccard, #chcards > *').length);
out.guide=await p.evaluate(()=>(document.querySelector('#guidebox .gm')||{}).textContent);
out.scl=await p.evaluate(()=>({sel:SCL[SCS.i][1],btn:$('scluse').textContent,dis:$('scluse').disabled}));
// lens: minor pentatonic via library
await p.evaluate(()=>{SCS.i=SCALES.findIndex(s=>s[1]==='Minor blues');sclRender();});
await p.click('#scluse');await p.waitForTimeout(300);
out.lens=await p.evaluate(()=>({mode:S.mode,lens:S.lens&&SCALES[S.lens.i][1],pill:$('keypilltxt').textContent}));
await p.evaluate(()=>goPage('editor'));await p.waitForTimeout(200);
out.neck=await p.evaluate(()=>{var c={};document.querySelectorAll('#neck .cell .dot').forEach(d=>{var k=d.className.replace('dot ','');c[k]=(c[k]||0)+1;});return c;});
// analysis with a riff
await p.evaluate(()=>{loadPreset('gallop');});await p.waitForTimeout(200);
out.anal=await p.evaluate(()=>({score:$('score').textContent,compat:[...document.querySelectorAll('.compat span')].map(x=>x.textContent).join(',')}));
// reload persistence
await p.evaluate(()=>{S.mode='hun';S.lens=null;save();});await p.reload();await p.waitForTimeout(400);
out.reload=await p.evaluate(()=>S.mode+' '+$('keypilltxt').textContent);
await p.evaluate(()=>{SCS.i=SCALES.findIndex(s=>s[1]==='Whole tone');sclUse();save();});await p.reload();await p.waitForTimeout(400);
out.reloadLens=await p.evaluate(()=>S.mode+' '+(S.lens&&SCALES[S.lens.i][1]));
// english
await p.click('#langbtn');await p.waitForTimeout(300);await p.evaluate(()=>goPage('scl'));await p.waitForTimeout(300);
out.en=await p.evaluate(()=>$('ptitle').textContent+' | '+$('pdesc').textContent+' | '+$('scluse').textContent+' | '+$('scldesc').textContent.slice(-160));
out.enFam=await p.evaluate(()=>[...document.querySelectorAll('#modes .mfam')].map(x=>x.textContent).join(', '));
await p.screenshot({path:OUT+'/scl_en.png'});
await p.click('#langbtn');await p.waitForTimeout(200);await p.click('#keypill');await p.waitForTimeout(200);await p.screenshot({path:OUT+'/keypop.png'});
console.log(JSON.stringify(out,null,1));if(out.modesCount!==31)fail('expected 31 modes');if(out.chips!==48)fail('expected 48 scale chips');if(out.lens.lens!=='Minor blues')fail('layer not applied');console.log('errors',errs);if(errs.length)fail('page errors: '+errs.join(' | '));await b.close();})();
