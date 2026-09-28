/* بینایی‌خوانی */
/* ---------- sight reading ---------- */
var SG={lv:1,q:null,n:0,c:0,streak:0,acc:0};
var SGL=[{n:'سطح ۱: دو تا سل',lo:0,hi:4,acc:false},{n:'سطح ۲: همه‌ی نت‌های طبیعی',lo:-2,hi:12,acc:false},{n:'سطح ۳: با دیز و بمل',lo:0,hi:10,acc:true},{n:'سطح ۴: کل محدوده',lo:-6,hi:15,acc:true}];
function sgStaff(step,acc){var W=320,H=150,top=40,gap=12,y0=top+4*gap;var y=y0-(step-2)*gap/2;
  var h='<svg viewBox="0 0 '+W+' '+H+'" width="100%" style="max-width:420px" role="img" aria-label="staff">';
  for(var i=0;i<5;i++)h+='<line x1="20" x2="'+(W-20)+'" y1="'+(top+i*gap)+'" y2="'+(top+i*gap)+'" stroke="var(--ink)" stroke-width="1"/>';
  h+='<text x="24" y="'+(top+4*gap+6)+'" font-size="58" fill="var(--ink)" font-family="\'Noto Music\',\'Segoe UI Symbol\',\'Apple Symbols\',serif">𝄞</text>';
  var cx=190;for(var s=0;s>=step;s-=2)if(s<=0&&s>=step)h+='<line x1="'+(cx-14)+'" x2="'+(cx+14)+'" y1="'+(y0-(s-2)*gap/2)+'" y2="'+(y0-(s-2)*gap/2)+'" stroke="var(--ink)"/>';
  for(var s2=12;s2<=step;s2+=2)h+='<line x1="'+(cx-14)+'" x2="'+(cx+14)+'" y1="'+(y0-(s2-2)*gap/2)+'" y2="'+(y0-(s2-2)*gap/2)+'" stroke="var(--ink)"/>';
  if(acc)h+='<text x="'+(cx-28)+'" y="'+(y+6)+'" font-size="20" fill="var(--frost)">'+(acc>0?'♯':'♭')+'</text>';
  h+='<ellipse cx="'+cx+'" cy="'+y+'" rx="7" ry="5.2" fill="var(--frost)" transform="rotate(-20 '+cx+' '+y+')"/>';
  h+='<line x1="'+(step<6?cx+6.5:cx-6.5)+'" x2="'+(step<6?cx+6.5:cx-6.5)+'" y1="'+y+'" y2="'+(step<6?y-36:y+36)+'" stroke="var(--frost)" stroke-width="1.6"/>';
  return h+'</svg>';}
function sgNext(){var L=SGL[SG.lv-1],step=L.lo+Math.floor(Math.random()*(L.hi-L.lo+1)),acc=L.acc?[0,1,-1][Math.floor(Math.random()*3)]:0;
  var li=((step%7)+7+0)%7,letter=LET[(li+0)%7];
  // step 0 = C4 (ledger below staff); staff bottom line E4 = step 2
  var oct=4+Math.floor(step/7),midi=12*(oct+1)+NAT[li]+acc;
  SG.q={step:step,letter:letter,acc:acc,midi:midi,done:false};SG.pick=null;
  $('sgstaff').innerHTML=sgStaff(step,acc);$('sgfb').textContent='';
  var ab=$('sgans');ab.innerHTML='';['C','D','E','F','G','A','B'].forEach(function(l){var b=EL('button','ans',l);b.onclick=function(){sgAns(l,b);};ab.appendChild(b);});
  var ac2=$('sgacc');ac2.innerHTML='';if(L.acc){[['♮',0],['♯',1],['♭',-1]].forEach(function(a){var b=EL('button','tb',a[0]);b.setAttribute('aria-pressed',a[1]===SG.accSel);b.onclick=function(){SG.accSel=a[1];sgRenderAcc();};ac2.appendChild(b);});}SG.accSel=0;sgRenderAcc();}
function sgRenderAcc(){$('sgacc').querySelectorAll('button').forEach(function(b,i){b.setAttribute('aria-pressed',[0,1,-1][i]===SG.accSel);});}
function sgAns(l,b){var q=SG.q;if(!q||q.done)return;q.done=true;var L=SGL[SG.lv-1],ok=l===q.letter&&(!L.acc||SG.accSel===q.acc);
  SG.n++;if(ok){SG.c++;SG.streak++;}else SG.streak=0;b.classList.add(ok?'ok':'no');
  var nm=q.letter+(q.acc>0?'♯':q.acc<0?'♭':'')+(4+Math.floor(q.step/7));$('sgfb').innerHTML=(ok?'✓ درسته! ':'✗ نه. ')+'<span class="ltr">'+nm+'</span>';
  var r=P.sight['L'+SG.lv]=P.sight['L'+SG.lv]||{c:0,t:0};r.t++;if(ok)r.c++;saveP();
  whenReady(function(){tone(q.midi,ac.currentTime+0.02,1);});sgStats();setTimeout(function(){if(SG.q===q)sgNext();},ok?900:1800);}
function sgStats(){statTiles($('sgstats'),[[fa(SG.n),'کل'],[fa(SG.c),'درست'],[SG.n?fa(Math.round(SG.c/SG.n*100))+'٪':'–','دقت'],[fa(SG.streak),'پشت سر هم']]);}
function sgRender(){var b=$('sglvl');if(!b)return;b.innerHTML='';SGL.forEach(function(L,i){var x=EL('button','chip',L.n);x.setAttribute('aria-pressed',SG.lv===i+1);x.onclick=function(){SG.lv=i+1;sgRender();sgNext();};b.appendChild(x);});}
