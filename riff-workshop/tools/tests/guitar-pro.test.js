// اجرا: tools/tests/run.sh (یا BASE=http://localhost:8000/ node این‌فایل.js)
const BASE=process.env.BASE||'http://localhost:8000/';const OUT=process.env.OUT||require('path').join(require('os').tmpdir(),'riff-tests');require('fs').mkdirSync(OUT,{recursive:true});
function fail(m){console.log('FAIL:',m);process.exitCode=1;}
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({acceptDownloads:true});const p=await ctx.newPage();const errs=[];
p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/fonts|ERR_CERT|Failed to load/.test(m.text()))errs.push(m.text());});
await p.addInitScript(()=>{try{localStorage.setItem('riff-workshop-tuning','6-std-37')}catch(e){}});await p.goto(BASE);await p.waitForTimeout(400);
const res=await p.evaluate(async()=>{
  var at=await gpLoad();var out=[];
  function riffs(){var L=[];Object.keys(PRESETS).forEach(function(k){loadPreset(k);L.push({n:'preset '+k,ev:S.events,ts:S.ts,tone:S.tone});});
    Object.keys(LESSONS).forEach(function(k){loadPreset(k);L.push({n:'lesson '+k,ev:S.events,ts:S.ts,tone:S.tone});});
    ODD.forEach(function(M,i){M.g.forEach(function(g,gi){ODS.i=i;ODS.gi=gi;oddRiffs().forEach(function(x,k){L.push({n:'odd '+M.m+' '+g.join('+')+' #'+k,ev:x.ev.map(fixEv),ts:{n:M.n,d:M.d},tone:'drive'});});});});
    var V=solveVoicings(1,CTI.min,'full');chordIdeas(V[0].notes,1).forEach(function(x,k){L.push({n:'idea '+k,ev:fitBar(x.ev.map(fixEv)),ts:{n:4,d:4},tone:'drive'});});
    // synthetic: every technique, a note crossing the bar, a triplet group, dotted notes
    function ev(d,notes,f){var e=blankEv(d,false,false,notes);if(f)f(e);return e;}
    var X=[ev('q',[{s:5,f:0}],function(e){e.t.pm=true;e.t.acc=true;}),ev('8',[{s:4,f:2}],function(e){e.lg='h';}),ev('8',[{s:4,f:4}]),
      ev('q',[{s:1,f:12}],function(e){e.bt='b';e.bend=2;}),ev('h',[{s:1,f:10}],function(e){e.bt='br';e.bend=1;e.t.vib=true;}),
      ev('h',[{s:0,f:9}],function(e){e.t.ring=true;e.sin='b';}),ev('q',[{s:0,f:12}],function(e){e.harm='nh';}),ev('8',[{s:2,f:5}],function(e){e.harm='ah';e.t.ghost=true;}),
      ev('8',[{s:5,f:0}],function(e){e.t.dead=true;}),ev('16',[{s:1,f:15}],function(e){e.t.tap=true;}),ev('16',[{s:1,f:12}],function(e){e.lg='sl';}),ev('8',[{s:1,f:14}],function(e){e.sout='d';e.t.stac=true;}),
      ev('q',[{s:5,f:0},{s:4,f:2},{s:3,f:2}],function(e){e.t.trem=true;}),ev('8',null),ev('q',[{s:3,f:4}],function(e){e.dot=true;}),
      ev('8',[{s:2,f:4}],function(e){e.tri=true;}),ev('8',[{s:2,f:5}],function(e){e.tri=true;}),ev('8',[{s:2,f:7}],function(e){e.tri=true;}),
      ev('h',[{s:4,f:5}],function(e){e.bt='pb';e.lg='ss';}),ev('w',[{s:5,f:3},{s:4,f:5}],function(e){e.sout='u';})];
    L.push({n:'synthetic',ev:X,ts:{n:4,d:4},tone:'clean'});return L;}
  var L=riffs();
  L.forEach(function(R){var tex=riffToTex(R.ev,{title:R.n,bpm:120,tone:R.tone,ts:R.ts}),r={n:R.n,ok:true,msg:''};
    try{var bytes=gpBytes(at,tex),st=new at.Settings(),sc=at.importer.ScoreLoader.loadScoreFromBytes(bytes,st),staff=sc.tracks[0].staves[0];
      // expected: note onsets (not tie continuations) as "fret/string"
      var exp=[];R.ev.forEach(function(e){if(!e.rest&&e.notes.length&&!T(e,'tie'))e.notes.forEach(function(n){exp.push((T(e,'dead')?'x':n.f)+'/'+(6-n.s));});});
      var got=[],techs={},barLen=[];staff.bars.forEach(function(bar){var t=0;bar.voices[0].beats.forEach(function(bt){t+=bt.playbackDuration;
        if(bt.tap)techs.tap=1;if(bt.isTremolo)techs.trem=1;
        bt.notes.forEach(function(nn){if(nn.isTieDestination){techs.tie=1;return;}got.push((nn.isDead?'x':nn.fret)+'/'+nn.string);
          if(nn.isPalmMute)techs.pm=1;if(nn.isHammerPullOrigin)techs.h=1;if(nn.hasBend)techs.bend=1;if(nn.vibrato)techs.vib=1;if(nn.isLetRing)techs.lr=1;if(nn.harmonicType)techs['harm'+nn.harmonicType]=1;
          if(nn.slideOutType)techs['so'+nn.slideOutType]=1;if(nn.slideInType)techs['si'+nn.slideInType]=1;if(nn.isGhost)techs.ghost=1;if(nn.isStaccato)techs.st=1;if(nn.accentuated)techs.ac=1;});});barLen.push(t);});
      var sortN=function(a){return a.slice().sort().join(',');};
      if(sortN(exp)!==sortN(got)||exp.length!==got.length){r.ok=false;r.msg='notes differ exp '+exp.length+' got '+got.length+' '+exp.slice(0,8)+' | '+got.slice(0,8);}
      var want=R.ts.n*960*4/R.ts.d;var badBars=barLen.filter(function(x){return Math.abs(x-want)>1;});if(badBars.length){r.ok=false;r.msg+=' barlen '+badBars.slice(0,3)+' want '+want;}
      r.techs=Object.keys(techs).join(' ');r.bars=barLen.length;r.ts=sc.masterBars[0].timeSignatureNumerator+'/'+sc.masterBars[0].timeSignatureDenominator;r.program=sc.tracks[0].playbackInfo.program;
      if(R.n==='synthetic'){r.tex=tex;window.__gp=Array.from(bytes);}
    }catch(e){r.ok=false;r.msg='ERR '+e.message;r.tex=tex.slice(0,600);}
    out.push(r);});
  return out;});
const bad=res.filter(r=>!r.ok);if(bad.length)fail(bad.length+' Guitar Pro round-trips failed');console.log('riffs',res.length,'failed',bad.length);bad.slice(0,8).forEach(r=>console.log(JSON.stringify(r).slice(0,900)));
const syn=res.find(r=>r.n==='synthetic');console.log('synthetic',syn.techs,'bars',syn.bars,'program',syn.program);console.log(syn.tex);
console.log('programs',[...new Set(res.map(r=>r.program))].join(','),'ts sample',res.filter(r=>r.n.startsWith('odd')).slice(0,3).map(r=>r.ts).join(' '));
const bytes=await p.evaluate(()=>window.__gp);fs.writeFileSync(OUT+'/synthetic.gp',Buffer.from(bytes));
// the real button: download
await p.evaluate(()=>{loadPreset('gallop');goPage('editor');$('rname').value='Gallop test';});
const [dl]=await Promise.all([p.waitForEvent('download'),p.click('#gpx')]);const path=await dl.path();console.log('download',dl.suggestedFilename(),fs.statSync(path).size);fs.copyFileSync(path,OUT+'/download.gp');
console.log('errors',errs);if(errs.length)fail('page errors: '+errs.join(' | '));await b.close();})();
