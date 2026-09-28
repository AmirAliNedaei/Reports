/* اتصال رابط کاربری ترینرها */
/* ---------- wiring ---------- */
(function(){
  // speed
  SP.bpm=+$('spstart').value;SP.metro=true;SP.auto=false;
  function spToggle(){if(LP.on&&LP.o.tag==='sp'){lpStop();return;}if(!SP.ex)return;SP.reps=0;
    lpStart(SP.ex.ev,function(){return SP.bpm;},{tag:'sp',loop:true,click:SP.metro,countIn:true,
      onStart:function(){$('spplay').textContent='توقف';spUI();},
      onLoop:function(rep){SP.reps=rep;var N=+$('spreps').value;if(SP.auto&&rep%N===0){spBump(+$('spstep').value,true);toast('تمپو: '+fa(SP.bpm));if(SP.bpm>=+$('sptarget').value){SP.auto=false;$('spauto').setAttribute('aria-pressed','false');}}spUI();},
      onStep:function(i){miniNow($('sptab'),i);},onStop:function(){$('spplay').textContent='شروع';miniNow($('sptab'),-1);spUI();}});}
  $('spplay').onclick=spToggle;
  $('spclean').onclick=function(){spBump(+$('spstep').value,true);};
  $('spmiss').onclick=function(){spBump(-(+$('spstep').value));};
  $('spplus').onclick=function(){spBump(+$('spstep').value);};$('spminus').onclick=function(){spBump(-(+$('spstep').value));};
  $('spstart').onchange=function(){if(!(LP.on&&LP.o.tag==='sp')){SP.bpm=+this.value;}spUI();};$('sptarget').onchange=spUI;
  $('spmetro').onclick=function(){SP.metro=!SP.metro;this.setAttribute('aria-pressed',SP.metro);if(LP.on&&LP.o.tag==='sp')LP.o.click=SP.metro;};
  $('spauto').onclick=function(){SP.auto=!SP.auto;this.setAttribute('aria-pressed',SP.auto);spUI();};
  // fretboard quiz
  buildNeckInto($('fqneck'),function(e){var s=+e.currentTarget.dataset.s,f=+e.currentTarget.dataset.f;if($('fqsnd').checked)audition({t:'n',s:s,f:f,pc:false,pm:false});
    var q=FQ.q;if(FQ.on&&q&&q.mode==='note'&&!q.done){if(s!==q.s){$('fqfb').textContent='روی سیم '+fa(q.s+1)+' کلیک کن';return;}fqAnswer((OPEN[s]+f)%12===q.pc);}});
  SNAME.forEach(function(n,i){var b=EL('button','tb','سیم '+fa(i+1));b.setAttribute('aria-pressed','true');b.onclick=function(){b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true');};$('fqstr').appendChild(b);});
  $('fqgo').onclick=function(){if(FQ.on){fqEnd();return;}FQ={on:true,q:null,n:0,c:0,times:[],streak:0,t0:0,timer:null};this.textContent='پایان راند';fqStats();fqNext();};
  fqStats();renderHeat();fqPaint();
  // rhythm
  $('rtgo').onclick=rtGo;$('rttap').addEventListener('pointerdown',function(e){e.preventDefault();rtTap();});
  $('rtbpm').oninput=function(){$('rtbpmv').textContent=this.value;};rtRenderList();rtShow();
  // ear
  $('earnew').onclick=earNew;$('earrep').onclick=earPlay;$('earlvl').onchange=function(){EAR.q=null;$('earans').innerHTML='';};earRender();
  // sight
  sgRender();sgNext();sgStats();$('sgnext').onclick=sgNext;$('sglisten').onclick=function(){if(SG.q)whenReady(function(){tone(SG.q.midi,ac.currentTime+0.02,1.2);});};
  // scales
  KEYLAB.forEach(function(l,k){var o=document.createElement('option');o.value=k;o.textContent=l;$('sclroot').appendChild(o);});$('sclroot').value=S.key;SCS.root=S.key;
  $('sclroot').onchange=function(){SCS.root=+this.value;sclShow();};
  buildNeckInto($('sclneck'),function(e){audition({t:'n',s:+e.currentTarget.dataset.s,f:+e.currentTarget.dataset.f,pc:false,pm:false});});
  $('scllab').onclick=function(){SCS.deg=!SCS.deg;this.setAttribute('aria-pressed',SCS.deg);sclShow();};
  $('sclsearch').oninput=function(){SCS.q=this.value.trim();sclRender();};
  $('sclplay').onclick=function(){var iv=SCL[SCS.i][2],base=40+((SCS.root-4)%12+12)%12,seq=iv.concat([12]);seq=seq.concat(seq.slice(0,-1).reverse());
    whenReady(function(){var t=ac.currentTime+0.05;choke(t);seq.forEach(function(x,i){playMidis([base+12+x],t+i*0.22,false);});});};
  $('scluse').onclick=sclUse;
  sclSync();sclRender();
  // improv
  buildNeckInto($('impneck'),function(e){audition({t:'n',s:+e.currentTarget.dataset.s,f:+e.currentTarget.dataset.f,pc:false,pm:false});});
  $('impplay').onclick=function(){if(LP.on&&LP.o.tag==='imp'){lpStop();return;}impStart();};
  $('impbpm').oninput=function(){$('impbpmv').textContent=this.value;};
  ['impbars','impsty'].forEach(function(id){$(id).onchange=function(){if(LP.on&&LP.o.tag==='imp')impStart();};});
  $('imp7').onchange=function(){impShow(IMP.ci<0?0:IMP.ci);};
  impRender();
  // chord search
  var cs=$('cxsearch');if(cs){var go=function(){var r=parseChord(cs.value);if(!r){$('cxhint').textContent=cs.value.trim()?'این آکورد رو نشناختم. نمونه: C#m7b5، Asus2، E5، Bbmaj7':'';return;}$('cxhint').textContent='';CXNAME={pc:r.pc,n:r.name};$('cxroot').value=r.pc;$('cxtype').value=r.id;renderExplorer();};
    cs.addEventListener('input',go);cs.addEventListener('keydown',function(e){if(e.key==='Enter')go();});}
})();
