/* آزمون دسته‌ی گیتار */
/* ---------- fretboard quiz ---------- */
var FQ={on:false,q:null,n:0,c:0,times:[],streak:0,t0:0,timer:null};
function fqStrings(){var a=[];$('fqstr').querySelectorAll('button').forEach(function(b,i){if(b.getAttribute('aria-pressed')==='true')a.push(i);});return a;}
function fqPool(){var diff=document.querySelector('input[name=fqdiff]:checked').value,max=+$('fqmax').value,strs=fqStrings(),pool=[];
  strs.forEach(function(s){for(var f=0;f<=max;f++){var pc=(OPEN[s]+f)%12;if(diff==='nat'&&PCN[pc].length>1)continue;if(diff==='scale'&&!inScale(OPEN[s]+f))continue;pool.push({s:s,f:f,pc:pc});}});return pool;}
function fqPaint(mark){var q=FQ.q;$('fqneck').querySelectorAll('.cell').forEach(function(c){var s=+c.dataset.s,f=+c.dataset.f,d=c.querySelector('.dot');d.className='dot ghost';d.textContent='';
  if(q&&q.mode==='pos'&&s===q.s&&f===q.f){d.className='dot root';d.textContent='?';}
  if(mark)mark.forEach(function(m){if(m.s===s&&m.f===f){d.className='dot '+m.c;d.textContent=PCN[(OPEN[s]+f)%12];}});});}
function fqNext(){
  clearTimeout(FQ.timer);var pool=fqPool();if(!pool.length){toast('با این تنظیمات نتی برای پرسیدن نیست');fqEnd();return;}
  if(FQ.n>=+$('fqn').value){fqEnd();return;}
  var mode=document.querySelector('input[name=fqmode]:checked').value,p=pool[Math.floor(Math.random()*pool.length)];
  FQ.q={mode:mode,s:p.s,f:p.f,pc:p.pc,done:false};FQ.t0=performance.now();$('fqfb').textContent='';
  var ab=$('fqans');ab.innerHTML='';
  if(mode==='pos'){$('fqprompt').innerHTML='این نت چیه؟ <span class="hint">(سیم '+fa(p.s+1)+')</span>';
    var nat=document.querySelector('input[name=fqdiff]:checked').value==='nat';
    PCN.forEach(function(nm,pc){if(nat&&nm.length>1)return;var b=EL('button','ans',nm+(nm.length>1?'<small> / '+FLATN[pc]+'</small>':''));b.onclick=function(){fqAnswer(pc===p.pc,b);};ab.appendChild(b);});
    if($('fqsnd').checked)audition({t:'n',s:p.s,f:p.f,pc:false,pm:false});}
  else $('fqprompt').innerHTML='<span class="ltr">'+PCN[p.pc]+'</span> رو روی سیم '+fa(p.s+1)+' پیدا کن';
  fqPaint();
  var lim=+$('fqlim').value;$('fqtime').style.transition='none';$('fqtime').style.width='100%';
  if(lim){setTimeout(function(){$('fqtime').style.transition='width '+lim+'s linear';$('fqtime').style.width='0%';},20);FQ.timer=setTimeout(function(){fqAnswer(false,null,true);},lim*1000);}
}
function fqAnswer(ok,btn,timeout){
  var q=FQ.q;if(!q||q.done)return;q.done=true;clearTimeout(FQ.timer);
  var dt=(performance.now()-FQ.t0)/1000;FQ.n++;if(ok){FQ.c++;FQ.streak++;FQ.times.push(dt);}else FQ.streak=0;
  var h=P.fq.heat=P.fq.heat||{};h[q.pc]=h[q.pc]||{c:0,t:0};h[q.pc].t++;if(ok)h[q.pc].c++;saveP();
  if(btn)btn.classList.add(ok?'ok':'no');
  var all=[];for(var f=0;f<=NF;f++)if((OPEN[q.s]+f)%12===q.pc&&f<=+$('fqmax').value)all.push({s:q.s,f:f,c:'root'});
  fqPaint(q.mode==='note'?all:[{s:q.s,f:q.f,c:ok?'scale':'bad'}]);
  $('fqfb').innerHTML=(timeout?'وقت تموم شد. ':ok?'✓ درسته! ':'✗ نه. ')+'<span class="ltr">'+PCN[q.pc]+'</span> روی سیم '+fa(q.s+1)+(q.mode==='pos'?'، فرت '+fa(q.f):'')+(ok?' ('+(Math.round(dt*10)/10)+' ثانیه)':'');
  fqStats();renderHeat();setTimeout(function(){if(FQ.on)fqNext();},ok?700:1500);
}
function fqEnd(){FQ.on=false;clearTimeout(FQ.timer);$('fqgo').textContent='شروع راند';$('fqprompt').textContent=FQ.n?'راند تموم شد: '+fa(FQ.c)+' از '+fa(FQ.n)+' درست':'برای شروع «شروع راند» رو بزن';$('fqans').innerHTML='';FQ.q=null;fqPaint();}
function fqStats(){var avg=FQ.times.length?FQ.times.reduce(function(a,b){return a+b;},0)/FQ.times.length:0;
  statTiles($('fqstats'),[[fa(FQ.c),'درست'],[fa(FQ.n),'کل'],[FQ.n?fa(Math.round(FQ.c/FQ.n*100))+'٪':'–','دقت'],[avg?fa(Math.round(avg*10)/10)+'s':'–','میانگین زمان'],[fa(FQ.streak),'پشت سر هم']]);}
function renderHeat(){var hb=$('fqheat');if(!hb)return;hb.innerHTML='';var h=(P.fq&&P.fq.heat)||{};
  PCN.forEach(function(nm,pc){var v=h[pc],a=v&&v.t?v.c/v.t:null,c=a===null?'h0':a>=0.9?'h1':a>=0.7?'h2':a>=0.5?'h3':'h4';
    hb.appendChild(EL('div',c,nm+'<small>'+(a===null?'–':Math.round(a*100)+'%')+'</small><small>'+(v?v.c+'/'+v.t:'')+'</small>'));});}
