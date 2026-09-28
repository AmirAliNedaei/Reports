// اجرا: tools/tests/run.sh (یا BASE=http://localhost:8000/ node این‌فایل.js)
const BASE=process.env.BASE||'http://localhost:8000/';const OUT=process.env.OUT||require('path').join(require('os').tmpdir(),'riff-tests');require('fs').mkdirSync(OUT,{recursive:true});
function fail(m){console.log('FAIL:',m);process.exitCode=1;}
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});const p=await b.newPage({viewport:{width:1280,height:1000}});const errs=[];
p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/fonts|ERR_CERT|Failed to load/.test(m.text()))errs.push(m.text());});
await p.addInitScript(()=>{try{localStorage.setItem('riff-workshop-tuning','6-std-37')}catch(e){}});await p.goto(BASE);await p.waitForTimeout(400);await p.evaluate(()=>goPage('odd'));
const r=await p.evaluate(()=>{var bad=[],n=0;ODD.forEach(function(M,i){M.g.forEach(function(g,gi){var sum=g.reduce((a,b)=>a+b,0);if(sum!==M.n)bad.push(M.m+' sum '+g.join('+'));
  ODS.i=i;ODS.gi=gi;var R=oddRiffs();R.forEach(function(x,k){n++;var t=x.ev.reduce((a,e)=>a+ticks(e),0),bar=M.n*384/M.d;if(Math.abs(t-bar)>0.01)bad.push(M.m+' '+g.join('+')+' ex'+k+' '+t+'/'+bar);
   x.ev.forEach(function(e){if(!DT[e.d])bad.push('dur '+e.d);e.notes.forEach(function(q){if(q.f<0||q.f>NF)bad.push(M.m+' ex'+k+' fret '+q.f);});});});});});
  ODS.i=1;ODS.gi=0;oddRender();return {meters:ODD.length,groupings:ODD.reduce((a,M)=>a+M.g.length,0),examples:n,bad:bad.slice(0,20),badN:bad.length};});
console.log(JSON.stringify(r));if(r.badN)fail(r.badN+' odd-meter patterns wrong');if(r.meters!==36)fail('expected 36 meters');
await p.evaluate(()=>{ODS.i=ODD.findIndex(m=>m.m==='13/16');ODS.gi=1;ODS.ex=5;oddRender();});
await p.click('#oddplay');const seen=new Set();for(let k=0;k<30;k++){await p.waitForTimeout(80);const t=await p.evaluate(()=>$('oddlive').hidden?'':$('oddlive').textContent+'|'+[...document.querySelectorAll('#oddgrid .ou')].findIndex(x=>x.classList.contains('now')));if(t)seen.add(t);}
await p.screenshot({path:OUT+'/odd.png'});
await p.click('#oddplay');console.log('live samples',[...seen].slice(0,12).join('  ;  '),'distinct',seen.size);
await p.click('#oddedit');await p.waitForTimeout(300);console.log('editor ts',await p.evaluate(()=>tsKey(S.ts)+' '+$('tsig').value+' events '+S.events.length));
await p.evaluate(()=>{$('tsig').value='13/16:4+4+5';$('tsig').onchange.call($('tsig'));});console.log('parse',await p.evaluate(()=>tsKey(S.ts)));
await p.evaluate(()=>goPage('odd'));await p.click('#langbtn');await p.waitForTimeout(300);
console.log('en',await p.evaluate(()=>$('oddfeel').textContent+' || '+$('oddexd').textContent+' || '+[...document.querySelectorAll('#oddlist .kick')].map(x=>x.textContent).join(', ')+' || '+[...document.querySelectorAll('#oddex .tb')].map(x=>x.textContent).join(', ')));
console.log('errors',errs);if(errs.length)fail('page errors: '+errs.join(' | '));await b.close();})();
