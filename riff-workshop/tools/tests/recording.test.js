// اجرا: tools/tests/run.sh (یا BASE=http://localhost:8000/ node این‌فایل.js)
const BASE=process.env.BASE||'http://localhost:8000/';const OUT=process.env.OUT||require('path').join(require('os').tmpdir(),'riff-tests');require('fs').mkdirSync(OUT,{recursive:true});
function fail(m){console.log('FAIL:',m);process.exitCode=1;}
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch({args:['--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream','--autoplay-policy=no-user-gesture-required']});
const ctx=await b.newContext({acceptDownloads:true,permissions:['microphone']});const p=await ctx.newPage();const errs=[];
p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/fonts|ERR_CERT|Failed to load/.test(m.text()))errs.push(m.text());});
await p.addInitScript(()=>{try{localStorage.setItem('riff-workshop-tuning','6-std-37')}catch(e){}});await p.goto(BASE);await p.waitForTimeout(400);
await p.evaluate(()=>{loadPreset('gallop');goPage('editor');$('rname').value='Rec test';});
await p.screenshot({path:OUT+'/rec0.png',fullPage:false});
// take 1: riff + drums
await p.click('#recgo');await p.waitForTimeout(3500);
const mid=await p.evaluate(()=>({on:REC.on,len:REC.len,btn:$('recgo').textContent,time:$('rectime').textContent,lvl:$('reclvl').style.width,playing:playing,mute:REC.mute}));
await p.click('#recgo');await p.waitForTimeout(400);
// take 2: drums only (guitar muted)
await p.selectOption('#recbk','drums');await p.click('#recgo');await p.waitForTimeout(2500);const mute2=await p.evaluate(()=>REC.mute);await p.click('#recgo');await p.waitForTimeout(400);
const st=await p.evaluate(()=>REC.takes.map(function(t){function rms(a){var s=0;for(var i=0;i<a.length;i++)s+=a[i]*a[i];return Math.sqrt(s/a.length);}
  return {n:t.n,sec:(t.len/t.sr).toFixed(2),bl:rms(t.bl).toFixed(4),br:rms(t.br).toFixed(4),mic:rms(t.mic).toFixed(4)};}));
const after=await p.evaluate(()=>({drums:S.drums,countin:S.countin,metro:S.metro,mute:REC.mute,events:S.events.length,lat:REC.lat,rows:document.querySelectorAll('#rectakes .rectake').length}));
// playback + downloads
await p.click('#rectakes .rectake button');await p.waitForTimeout(500);const pl=await p.evaluate(()=>!!REC.play);await p.click('#rectakes .rectake button');
const [d1]=await Promise.all([p.waitForEvent('download'),p.click('#rectakes .rectake button:nth-of-type(2)')]);
const [d2]=await Promise.all([p.waitForEvent('download'),p.click('#rectakes .rectake button:nth-of-type(3)')]);
const f1=await d1.path(),f2=await d2.path();fs.copyFileSync(f1,OUT+'/take_guitar.wav');fs.copyFileSync(f2,OUT+'/take_mix.wav');
if(st.length!==2||st.some(t=>+t.mic<=0))fail('recording takes missing or silent');console.log(JSON.stringify({mid,mute2,takes:st,after,playback:pl,dl:[d1.suggestedFilename(),fs.statSync(f1).size,d2.suggestedFilename(),fs.statSync(f2).size]},null,1));
await p.evaluate(()=>window.scrollTo(0,document.getElementById('recbox').getBoundingClientRect().top+window.scrollY-80));await p.screenshot({path:OUT+'/rec1.png'});
await p.click('#langbtn');await p.waitForTimeout(300);console.log('en',await p.evaluate(()=>$('recbox').innerText.slice(0,500)));
console.log('errors',errs);if(errs.length)fail('page errors: '+errs.join(' | '));await b.close();})();
