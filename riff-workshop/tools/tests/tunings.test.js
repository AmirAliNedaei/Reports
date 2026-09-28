// اجرا: tools/tests/run.sh (یا BASE=http://localhost:8000/ node این‌فایل.js)
const BASE=process.env.BASE||'http://localhost:8000/';const OUT=process.env.OUT||require('path').join(require('os').tmpdir(),'riff-tests');require('fs').mkdirSync(OUT,{recursive:true});
function fail(m){console.log('FAIL:',m);process.exitCode=1;}
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});const ctx=await b.newContext({viewport:{width:1280,height:900}});const p=await ctx.newPage();const errs=[];
p.on('pageerror',e=>errs.push('pageerror '+e.message));p.on('console',m=>{if(m.type()==='error'&&!/fonts|ERR_CERT|Failed to load/.test(m.text()))errs.push(m.text());});
const U=BASE;
await p.goto(U);await p.waitForTimeout(500);
console.log('first run',await p.evaluate(()=>({welcome:!$('tunwelcome').hidden,pop:!$('keypop').hidden,pill:$('tunpilltxt').textContent,chips:document.querySelectorAll('#tunbox .chip').length})));
await p.screenshot({path:OUT+'/tun_first.png'});
await p.click('#tunkeep');await p.waitForTimeout(200);console.log('kept',await p.evaluate(()=>localStorage.getItem('riff-workshop-tuning')+' pop hidden '+$('keypop').hidden));
// generators across all tunings (runtime apply, no reload)
const gen=await p.evaluate(()=>{var bad=[],cnt=0,all=TUNINGS.concat([{id:'c9',n:9,name:'nine',low:[23,28,33,38,43,48,53,57,62]}]);
  function chk(tag,evs){evs.forEach(function(e){var seen={};(e.notes||[]).forEach(function(n){cnt++;if(!(n.s>=0&&n.s<NS&&n.f>=0&&n.f<=NF))bad.push(tag+' pos '+n.s+':'+n.f);if(seen[n.s])bad.push(tag+' dup string');seen[n.s]=1;});});}
  var save=TUNING;
  all.forEach(function(t){tunApply(t);VCACHE={};S.key=OPEN[LOW]%12;S.mode='aeo';
    // power chord intervals
    for(var f=0;f<=12;f++){var pc=pow5(LOW,f),m=pc.map(function(n){return OPEN[n.s]+n.f;});if(pc.length===3&&(m[1]-m[0]!==7||m[2]-m[0]!==12))bad.push(t.id+' pow5');}
    ODS.i=1;ODS.gi=0;oddRiffs().forEach(function(x,k){chk(t.id+' odd'+k,x.ev);var first=x.ev[0];if(k===0&&first.notes.length===3){var mm=first.notes.map(function(n){return OPEN[n.s]+n.f;}).sort(function(a,b){return a-b;});if(mm[1]-mm[0]!==7)bad.push(t.id+' odd chord fifth '+(mm[1]-mm[0]));}});
    var V=solveVoicings(S.key,CTI.min,'full');if(!V.length)bad.push(t.id+' no voicing');else chordIdeas(V[0].notes,S.key).forEach(function(x,k){chk(t.id+' idea'+k,x.ev);});
    SPT.forEach(function(tc){spExercises(tc.k).forEach(function(x){chk(t.id+' sp '+tc.k,x.ev);});});
    Object.keys(PRESETS).concat(Object.keys(LESSONS)).forEach(function(k){var P=PRESETS[k]||LESSONS[k];S.events=tunRef(function(){return P.events?JSON.parse(JSON.stringify(P.events)).map(fixEv):stepsToEvents(P.steps,P.steps.length);});
      var before=S.events.reduce(function(a,e){return a+e.notes.length;},0);presetFit();chk(t.id+' preset '+k,S.events);var after=S.events.reduce(function(a,e){return a+e.notes.length;},0);if(after<before)bad.push(t.id+' preset '+k+' lost '+(before-after));});
  });
  tunApply(save);VCACHE={};return {tunings:all.length,notes:cnt,bad:bad.slice(0,20),badN:bad.length};});
console.log('generators',JSON.stringify(gen));if(gen.badN)fail(gen.badN+' generated notes wrong across tunings');
// switch to 7-string B Standard through the UI (reloads)
await p.evaluate(()=>{loadPreset('gallop');save();});
await p.click('#tunpill');await p.waitForTimeout(200);await p.click('#tunbox .chip:has-text("۷ سیم")');await p.waitForTimeout(200);
await Promise.all([p.waitForNavigation(),p.click('#tunbox .chip:has-text("B Standard")')]);await p.waitForTimeout(600);
const s7=await p.evaluate(()=>({t:TUNING.name,ns:NS,open:OPEN.join(','),key:PCN[S.key],pill:$('tunpilltxt').textContent,brand:$('brandsub').textContent,title:document.title,neckRows:document.querySelectorAll('#neck .sname').length,tabRows:document.querySelector('#tab .trow')?document.querySelector('#tab .trow').querySelectorAll('.tl').length:0,
  riff:S.events.slice(0,6).map(e=>e.notes.map(n=>n.s+':'+n.f).join('+')).join(' '),score:$('score').textContent}));console.log('7-string',JSON.stringify(s7));
for(const pg of ['home','speed','fq','rt','ear','sight','neck','scl','chords','bank','odd','guide','imp','editor','lib','bands','rz','settings']){await p.evaluate(x=>goPage(x),pg);await p.waitForTimeout(120);}
await p.evaluate(()=>goPage('editor'));await p.screenshot({path:OUT+'/tun7.png'});
// GP export tuning round-trip on 7-string
console.log('gp7',await p.evaluate(async()=>{var at=await gpLoad(),bytes=gpBytes(at,riffToTex(S.events,{title:'t'})),sc=at.importer.ScoreLoader.loadScoreFromBytes(bytes,new at.Settings());return sc.tracks[0].staves[0].stringTuning.tunings.join(',');}));
// drop D, key follows
await p.click('#tunpill');await p.click('#tunbox .chip:has-text("۶ سیم")');await p.waitForTimeout(150);
await Promise.all([p.waitForNavigation(),p.click('#tunbox .chip:has-text("Drop D")')]);await p.waitForTimeout(500);
console.log('dropD',await p.evaluate(()=>TUNING.name+' key '+PCN[S.key]+' open '+OPEN.join(',')+' riff '+S.events.slice(0,4).map(e=>e.notes.map(n=>n.s+':'+n.f).join('+')).join(' ')));
// custom tuning
await p.click('#tunpill');await p.click('#tunbox .btn:has-text("ساختن کوک دلخواه")');await p.selectOption('#tuncnt','7');await p.fill('#tunname','My Drop A');await p.selectOption('#tuns0','33');
await Promise.all([p.waitForNavigation(),p.click('#tunbox .btn:has-text("ذخیره و استفاده")')]);await p.waitForTimeout(500);
console.log('custom',await p.evaluate(()=>TUNING.name+' n'+NS+' '+OPEN.join(',')+' mine:'+tunCustoms().length+' pill '+$('tunpilltxt').textContent));
// tempo inputs
await p.evaluate(()=>goPage('odd'));await p.fill('#oddbpmv','300');await p.press('#oddbpmv','Enter');await p.evaluate(()=>$('oddbpmv').dispatchEvent(new Event('change')));
await p.evaluate(()=>goPage('rt'));await p.fill('#rtbpmv','350');await p.evaluate(()=>$('rtbpmv').dispatchEvent(new Event('change')));
await p.evaluate(()=>goPage('speed'));await p.fill('#spbpm','250');await p.evaluate(()=>$('spbpm').dispatchEvent(new Event('change')));
await p.evaluate(()=>goPage('editor'));await p.fill('#bpm','300');await p.evaluate(()=>$('bpm').dispatchEvent(new Event('change')));
console.log('tempo',await p.evaluate(()=>({odd:$('oddbpm').value,oddMax:$('oddbpm').max,rt:$('rtbpm').value+'/'+$('rtbpmv').value,sp:SP.bpm,editor:S.bpm})));
await p.evaluate(()=>{$('bpm').value='5';$('bpm').dispatchEvent(new Event('change'));});console.log('editor clamp low',await p.evaluate(()=>S.bpm+' '+$('bpm').value));
await p.click('#langbtn');await p.waitForTimeout(200);await p.click('#tunpill');await p.waitForTimeout(200);console.log('en',await p.evaluate(()=>$('tunbox').innerText.slice(0,300).replace(/\n/g,' | ')));
await p.screenshot({path:OUT+'/tun_en.png'});
console.log('errors',errs);if(errs.length)fail('page errors: '+errs.join(' | '));await b.close();})();
