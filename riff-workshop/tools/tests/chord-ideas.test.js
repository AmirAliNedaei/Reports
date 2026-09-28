// اجرا: tools/tests/run.sh (یا BASE=http://localhost:8000/ node این‌فایل.js)
const BASE=process.env.BASE||'http://localhost:8000/';const OUT=process.env.OUT||require('path').join(require('os').tmpdir(),'riff-tests');require('fs').mkdirSync(OUT,{recursive:true});
function fail(m){console.log('FAIL:',m);process.exitCode=1;}
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});const p=await b.newPage({viewport:{width:1280,height:1000}});const errs=[];
p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/fonts|ERR_CERT|Failed to load/.test(m.text()))errs.push(m.text());});
await p.addInitScript(()=>{try{localStorage.setItem('riff-workshop-tuning','6-std-37')}catch(e){}});await p.goto(BASE);await p.waitForTimeout(400);
const r=await p.evaluate(()=>{var bad=[],n=0,stat={};Object.keys(MODES).forEach(function(mk){S.mode=mk;var iv=MODES[mk].iv;
  CT.forEach(function(t){for(var j=0;j<7;j++){if(!diatonic(t,j))continue;var rp=(S.key+iv[j])%12,V=solveVoicings(rp,t,'full');if(!V.length)continue;
    var pcs=t.tones.map(function(tn){return (rp+tn[0])%12;}).filter(function(x,i,a){return a.indexOf(x)===i;});
    var L=chordIdeas(V[0].notes,rp,pcs);if(L.length!==8)bad.push('len '+L.length);
    L.forEach(function(x,k){n++;var tk=0,notes=0,inC=0,inS=0;x.ev.forEach(function(e){tk+=ticks(e);if(!DT[e.d])bad.push('dur');e.notes.forEach(function(q){notes++;if(!(q.f>=0&&q.f<=NF)||!(q.s>=0&&q.s<6))bad.push(mk+' '+t.id+' ex'+k+' pos '+q.s+':'+q.f);var pc=(OPEN[q.s]+q.f)%12;if(pcs.indexOf(pc)>=0)inC++;if(iv.indexOf((pc-S.key+12)%12)>=0)inS++;});});
      if(!notes)bad.push(mk+' '+t.id+' ex'+k+' empty');var st=stat[k]=stat[k]||{n:0,c:0,s:0,tk:0};st.n+=notes;st.c+=inC;st.s+=inS;st.tk+=tk;st.cnt=(st.cnt||0)+1;});}});});
  S.mode='aeo';var out={};Object.keys(stat).forEach(function(k){var s=stat[k];out[CHIDEAS[k].n]={chordTone:Math.round(100*s.c/s.n)+'%',inScale:Math.round(100*s.s/s.n)+'%',bars:(s.tk/s.cnt/384).toFixed(2)};});
  return {ideas:n,bad:bad.slice(0,15),badN:bad.length,stat:out};});
console.log(JSON.stringify(r,null,1));if(r.badN)fail(r.badN+' chord ideas wrong');
// chords page: card idea rows
await p.evaluate(()=>goPage('chords'));await p.waitForTimeout(300);
console.log('card rows',await p.evaluate(()=>{var c=document.querySelector('#chcards .chcard');return c?[...c.querySelectorAll('.chideas .idearow')].map(r=>r.textContent).join(' || '):'none';}));
await p.click('#chcards .chcard .chideas button:nth-of-type(3)');await p.waitForTimeout(600);
console.log('loaded',await p.evaluate(()=>curPage+' '+$('rname').value+' events '+S.events.length+' drums '+S.drums+' playing '+playing));
await p.evaluate(()=>stop());
// progressions page: click a chord, then an idea
await p.evaluate(()=>goPage('bank'));await p.waitForTimeout(300);
await p.click('#bank .pcard .chs button:nth-child(2)');await p.waitForTimeout(200);
console.log('bank ideas',await p.evaluate(()=>{var x=document.querySelector('#bank .bankideas');return x?x.textContent.slice(0,300):'none';}));
await p.screenshot({path:OUT+'/bank.png'});
await p.click('#bank .bankideas .idearow:last-child button:last-child');await p.waitForTimeout(600);
console.log('loaded2',await p.evaluate(()=>curPage+' '+$('rname').value+' events '+S.events.length+' '+S.events.slice(0,4).map(e=>e.notes.map(n=>n.s+':'+n.f+(e.t.tap?'T':'')+(e.lg||'')).join(',')).join(' ')));
await p.evaluate(()=>stop());
await p.click('#langbtn');await p.waitForTimeout(300);await p.evaluate(()=>goPage('chords'));await p.waitForTimeout(300);
console.log('en',await p.evaluate(()=>{var c=document.querySelector('#chcards .chcard');return [...c.querySelectorAll('.chideas .idearow')].map(r=>r.textContent).join(' || ')+' | title: '+c.querySelector('.chideas button').title;}));
console.log('errors',errs);if(errs.length)fail('page errors: '+errs.join(' | '));await b.close();})();
