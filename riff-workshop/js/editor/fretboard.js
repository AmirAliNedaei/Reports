/* دسته‌ی گیتار (fretboard) تعاملی */
/* ---------- fretboard ---------- */
var FW=[];(function(){for(var f=1;f<=NF;f++)FW.push(Math.round(48*Math.pow(0.972,f-1)));})();
function cellEl(s,f){return ($('rneck')||$('neck')).querySelector('.cell[data-s="'+s+'"][data-f="'+f+'"]');}
function buildNeck(){buildNeckInto($('neck'),onCell);buildNeckInto($('rneck'),onCell);}
function buildNeckInto(nk,handler){
  nk.innerHTML='';
  nk.style.gridTemplateColumns='30px 44px '+FW.map(function(w){return w+'px';}).join(' ');
  for(var s=0;s<NS;s++){
    var sn=document.createElement('div');sn.className='sname';sn.textContent=SNAME[s];nk.appendChild(sn);
    for(var f=0;f<=NF;f++){
      var b=document.createElement('button');b.className='cell'+(f===0?' open':'');b.dataset.s=s;b.dataset.f=f;
      b.setAttribute('aria-label','سیم '+(s+1)+' فرت '+f);
      var str=document.createElement('span');str.className='str';str.style.height=(1+s*0.55)+'px';b.appendChild(str);
      var dt=document.createElement('span');dt.className='dot';b.appendChild(dt);
      b.addEventListener('click',handler);nk.appendChild(b);
    }
  }
  nk.appendChild(document.createElement('div'));
  for(var f2=0;f2<=NF;f2++){var fn=document.createElement('div');fn.className='fnum';fn.textContent=f2;nk.appendChild(fn);}
  var x=30+44,cx=[];for(var i=0;i<NF;i++){cx.push(x+FW[i]/2);x+=FW[i];}
  var top=6;
  [3,5,7,9,15,17,19,21].forEach(function(f){addInlay(cx[f-1],top+RH*NS/2);});
  [12,24].forEach(function(f){addInlay(cx[f-1],top+RH*NS/4);addInlay(cx[f-1],top+RH*NS*3/4);});
  function addInlay(l,t){var d=document.createElement('div');d.className='inlay';d.style.left=l+'px';d.style.top=t+'px';nk.appendChild(d);}
}
function refreshNeck(){
  var used={},cur={},pset={};
  if(activePat&&activePat.mode===S.mode&&activePat.key===S.key)activePat.notes.forEach(function(x){pset[x.s+':'+x.f]=1;});
  S.events.forEach(function(e,i){if(!e.rest)e.notes.forEach(function(p){used[p.s+':'+p.f]=1;if(i===S.cur)cur[p.s+':'+p.f]=1;});});
  document.querySelectorAll('#neck .cell, #rneck .cell').forEach(function(c){
    var s=+c.dataset.s,f=+c.dataset.f,m=midiAt(s,f),d=c.querySelector('.dot'),k=s+':'+f,ed=!!c.closest('#rneck');
    var ins=inScale(m),root=ivOf(m)===0,u=ed&&used[k],L=lensIv(),inl=L&&L.indexOf(ivOf(m))>=0;
    d.className='dot '+((ins||inl)?(root?'root':'scale'):(u?'bad':'ghost'));if(L&&ins&&!inl)d.classList.add('faded');
    if(u)d.classList.add('used');if(ed&&cur[k])d.classList.add('cur');
    if(activePat&&activePat.mode===S.mode&&activePat.key===S.key){if(pset[k])d.classList.add('pat');else if(ins)d.classList.add('faded');}
    d.textContent=label(m);
  });
}
function onCell(e){
  var s=+e.currentTarget.dataset.s,f=+e.currentTarget.dataset.f,m=midiAt(s,f);
  if(e.currentTarget.closest('#neck')){audition({t:'n',s:s,f:f,pc:false,pm:false});return;}
  S.cs=s;S.sel=null;
  if(S.listen){audition({t:'n',s:s,f:f,pc:false,pm:false});return;}
  if(S.snap&&!inScale(m)){audition({t:'n',s:s,f:f,pc:false,pm:false});toast(PCN[m%12]+' داخل '+SHORT[S.mode]+' نیست');return;}
  var E=S.events,ev=E[S.cur];
  if(S.chord){
    if(!ev){ev=newEv([]);E.push(ev);S.cur=E.length-1;}
    var had=ev.notes.some(function(n){return n.s===s&&n.f===f;});
    ev.notes=ev.notes.filter(function(n){return n.s!==s;});
    if(had){ev.rest=!ev.notes.length;changed();if(!ev.rest)auditionEv(ev);return;}
    ev.rest=false;ev.notes.push({s:s,f:f});ev.notes.sort(function(a,b){return b.s-a.s;});
  }else{
    if(ev){ev.rest=false;ev.notes=[{s:s,f:f}];delete ev.t.tie;}else{ev=newEv([{s:s,f:f}]);E.push(ev);}
    S.cur=E.indexOf(ev)+1;
  }
  auditionEv(ev);changed();
}
