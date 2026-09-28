/* کتابخانه‌ی اسکیل‌ها و مُدها (همه‌ی اسکیل‌ها از SCALES در constants.js) */
/* ---------- scale library ---------- */
var SCL=SCALES;
var SCS={i:1,root:1,deg:false,q:''};
// اسکیل فعلی برنامه در کتابخانه (مُد اصلی یا لایه)
function sclCurrent(){if(S.lens&&SCL[S.lens.i])return S.lens.i;var i=scaleOf(S.mode);return i<0?1:i;}
function sclSync(){SCS.i=sclCurrent();SCS.root=S.key;if($('sclroot'))$('sclroot').value=S.key;}
function sclRender(){var box=$('scllist');if(!box)return;box.innerHTML='';var cat='',q=SCS.q.toLowerCase(),cur=sclCurrent();
  SCL.forEach(function(s,i){if(q&&(s[1]+s[3]+s[0]).toLowerCase().indexOf(q)<0)return;if(s[0]!==cat){cat=s[0];box.appendChild(EL('div','kick',cat));}
    var b=EL('button','litem',s[1]+(i===cur?'<small>مُد فعلی</small>':''));b.classList.add('ltr');b.setAttribute('aria-pressed',i===SCS.i);b.onclick=function(){SCS.i=i;sclRender();};box.appendChild(b);});
  sclShow();}
function sclShow(){var s=SCL[SCS.i],iv=s[2],r=SCS.root,sp=iv.length===7?spellAny(r,iv):{root:PCN[r],notes:iv.map(function(x){return PCN[(r+x)%12];})};
  $('sclname').textContent=sp.root+' '+s[1];$('scldesc').textContent=s[3]+' '+fa(iv.length)+' نت. فرمول: ';$('scldesc').innerHTML+='<span class="ltr">'+iv.map(function(x){return DEGN[x];}).join(' ')+'</span>';
  if(!s[4]&&s[5])$('scldesc').innerHTML+='<br>برای آکوردها و پیشرفت‌ها از اسکیل مادر <span class="ltr">'+MODES[s[5]].n+'</span> استفاده می‌شه و نت‌های این اسکیل روی دسته‌ی برنامه به‌صورت لایه نشون داده می‌شن.';
  $('sclnotes').innerHTML=iv.map(function(x,k){return '<span class="'+(k===0?'rt':'')+'">'+sp.notes[k]+'<small>'+DEGN[x]+'</small></span>';}).join('');
  var cur=SCS.i===sclCurrent()&&SCS.root===S.key,u=$('scluse');u.hidden=false;u.disabled=cur;
  u.textContent=cur?'این مُد اصلی برنامه‌ست':s[4]?'استفاده به‌عنوان مُد اصلی':'استفاده به‌عنوان لایه روی '+MODES[s[5]].n;
  $('sclneck').querySelectorAll('.cell').forEach(function(c){var m=OPEN[+c.dataset.s]+(+c.dataset.f),rel=((m%12)-r+12)%12,k=iv.indexOf(rel),d=c.querySelector('.dot');
    if(k<0){d.className='dot ghost';d.textContent=PCN[m%12];return;}d.className='dot '+(rel===0?'root':'scale');d.textContent=SCS.deg?DEGN[rel]:sp.notes[k];});}
// اسکیل انتخاب‌شده در کتابخانه رو مُد اصلی برنامه کن
function sclUse(){var s=SCL[SCS.i];setKey(SCS.root,false);
  if(s[4]){S.lens=null;if(s[4]===S.mode)freshView();else setMode(s[4]);toast('مُد اصلی برنامه: '+MN());}
  else{var i=SCS.i;if(s[5]!==S.mode)setMode(s[5]);S.lens={i:i};freshView();toast('لایه‌ی '+s[1]+' روی '+MN());}
  save();sclRender();}
