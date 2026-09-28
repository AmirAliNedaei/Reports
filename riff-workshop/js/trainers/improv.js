/* بداهه‌نوازی */
/* ---------- improvisation ---------- */
var IMP={pi:0,ci:-1};
function impProgs(){var L=(STYLES[curStyle].prog[S.mode]||[]).map(function(p){return {deg:p[0],name:p[1]};});return L;}
function impRender(){var box=$('impprog');if(!box)return;box.innerHTML='';var L=impProgs();if(IMP.pi>=L.length)IMP.pi=0;
  L.forEach(function(p,i){var b=EL('button','tb',p.deg.map(function(j){return triad(S.mode,j).rn;}).join(' – '));b.classList.add('ltr');b.title=p.name;b.setAttribute('aria-pressed',i===IMP.pi);b.onclick=function(){IMP.pi=i;if(LP.on&&LP.o.tag==='imp')impStart();impRender();};box.appendChild(b);});
  impChips();impShow(IMP.ci<0?0:IMP.ci);}
function impSeq(){var p=impProgs()[IMP.pi];if(!p)return [];var d=p.deg;return d.length===2?d.concat(d):d;}
function impChips(){var c=$('impchips');c.innerHTML='';impSeq().forEach(function(j,i){var t=triad(S.mode,j);var b=EL('span','ichip'+(i===IMP.ci?' on':''),t.name+'<small>'+t.rn+'</small>');c.appendChild(b);});}
function impShow(ci){var seq=impSeq();if(!seq.length)return;ci=Math.max(0,ci)%seq.length;var j=seq[ci],t=triad(S.mode,j),iv=MODES[S.mode].iv,names=spell(iv);
  var sev=$('imp7').checked,roles={};roles[iv[j]]='root';roles[iv[(j+2)%7]]='c3';roles[iv[(j+4)%7]]='c5';if(sev)roles[iv[(j+6)%7]]='c7';
  $('impneck').querySelectorAll('.cell').forEach(function(c){var m=OPEN[+c.dataset.s]+(+c.dataset.f),rel=((m%12)-S.key+12)%12,d=c.querySelector('.dot'),k=iv.indexOf(rel);
    if(k<0){d.className='dot ghost';d.textContent=PCN[m%12];return;}d.className='dot '+(roles[rel]||'scale faded');d.textContent=names[k];});
  var tn=[0,2,4].concat(sev?[6]:[]).map(function(k){return names[(j+k)%7];});
  $('imptarget').innerHTML='نت‌های هدف برای <span class="ltr">'+t.name+(sev?' ('+t.name+'7)':'')+'</span>: <span class="ltr">'+tn.join('  ')+'</span>';
  var tips=['روی سوم آکورد (سبز) بایست؛ سوم، رنگ ماژور یا مینور آکورد رو مشخص می‌کنه.','هفتم (بنفش) کشش می‌سازه و گوش رو به آکورد بعدی می‌کشه.','با ریشه (نارنجی) شروع کن و با یه نت همسایه‌ی کم‌رنگ به سوم آکورد بعدی برس.','پنجم (آبی) امن و محکمه؛ برای پایان جمله‌ها خوبه.'];
  $('imptip').textContent=tips[ci%tips.length];
  $('impchips').querySelectorAll('.ichip').forEach(function(x,i){x.classList.toggle('on',i===ci);});}
function impEvents(){var seq=impSeq(),bars=+$('impbars').value,sty=$('impsty').value,out=[],map=[];
  seq.forEach(function(j,ci){var t=triad(S.mode,j),pos=placeChord(t),m=OPEN[pos.s]+pos.f;
    var pc=pos.power?[{s:pos.s,f:pos.f},{s:pos.s-1,f:m+7-OPEN[pos.s-1]},{s:pos.s-2,f:m+12-OPEN[pos.s-2]}]:[{s:pos.s,f:pos.f}];
    var V=solveVoicings(t.pc,CTI[t.q==='min'?'min':t.q==='dim'?'dim':t.q==='aug'?'aug':'maj'],'full'),vo=V.length?V[0].notes:pc;
    for(var b=0;b<bars;b++){
      if(sty==='pm'){for(var k=0;k<8;k++){var e=blankEv('8',false,false,pc.map(function(x){return {s:x.s,f:x.f};}));if(k%4)e.t.pm=true;else e.t.acc=true;out.push(e);map.push(ci);}}
      else if(sty==='arp'){var ns=vo.slice().sort(function(a,b2){return b2.s-a.s;});for(var k2=0;k2<8;k2++){var n=ns[[0,1,2,3,2,1,2,3][k2]%ns.length];var e2=blankEv('8',false,false,[{s:n.s,f:n.f}]);e2.t.ring=true;out.push(e2);map.push(ci);}}
      else{var e3=blankEv('w',false,false,vo.map(function(x){return {s:x.s,f:x.f};}));e3.t.ring=true;out.push(e3);map.push(ci);}}});
  return {ev:out,map:map};}
function impStart(){var r=impEvents();if(!r.ev.length)return;IMP.map=r.map;
  lpStart(r.ev,function(){return +$('impbpm').value;},{tag:'imp',loop:true,click:false,onStart:function(){$('impplay').textContent='توقف';},
    onStep:function(i){var ci=IMP.map[i];if(ci!==IMP.ci){IMP.ci=ci;impShow(ci);}},onStop:function(){$('impplay').textContent='شروع';}});}
