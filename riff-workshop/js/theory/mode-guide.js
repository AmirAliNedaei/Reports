/* راهنمای هویت مدها */
/* ---------- mode identity guide ---------- */
var MG={
 aeo:{sig:5,sn:'b6 (و ۲ طبیعی)',ch:[0,5,3,0],chn:'VI و iv',conf:'Dorian (اگه b6 نزنی)، Phrygian (اگه ۲ رو نزنی) و ماژور نسبی (اگه روی آکورد III بایستی).'},
 dor:{sig:5,sn:'۶ بزرگ',ch:[0,3,0,3],chn:'IV ماژور',conf:'Aeolian (اگه ۶ بزرگ رو نزنی) و Mixolydian نسبی (اگه روی آکورد VII بایستی).'},
 phr:{sig:1,sn:'b2',ch:[0,1,0,1],chn:'II ماژور (bII)',conf:'Aeolian (اگه b2 نزنی) و Locrian (اگه پنجم درست رو حذف کنی).'},
 loc:{sig:4,sn:'b5',ch:[0,1,4,0],chn:'i° کاسته و bV',conf:'Phrygian (اگه پنجم درست بزنی). گوش راحت خونه‌ی Locrian رو از دست می‌ده، پس پدال لازم داره.'},
 hm:{sig:6,sn:'۷ بزرگ (کنار b6)',ch:[0,3,4,0],chn:'V ماژور ← i',conf:'Aeolian (اگه ۷ بزرگ نزنی) و Phrygian dominant (اگه مرکز روی درجه‌ی ۵ بره).'},
 ion:{sig:3,sn:'۴ و ۷ بزرگ',ch:[0,3,4,0],chn:'IV و V',conf:'Lydian (اگه به‌جای ۴، #4 بزنی) و Mixolydian (اگه b7 بزنی).'},
 lyd:{sig:3,sn:'#4',ch:[0,1,0,1],chn:'II ماژور',conf:'Ionian (اگه #4 نزنی). #4 رو روی ضرب قوی بذار تا حس معلق بیاد.'},
 mix:{sig:6,sn:'b7',ch:[0,6,3,0],chn:'bVII ماژور',conf:'Ionian (اگه b7 نزنی) و Dorian (اگه سوم مینور بیاد).'}};
var MGP=[['۱. خونه رو تثبیت کن','نت خونه باید «بیشترین حضور» رو داشته باشه: پدال روی سیم بم، شروع و پایان جمله روی خونه، و ضرب اول میزان‌ها. بدون خونه‌ی روشن، گوش خودش یه خونه‌ی دیگه انتخاب می‌کنه و مُد عوض می‌شه.'],
 ['۲. نت امضا رو روی ضرب قوی بزن','هر مُد یک یا دو نت داره که از همسایه‌هاش جداش می‌کنه (مثلاً ۶ بزرگ در Dorian). اگه این نت فقط گذرا و روی ضرب ضعیف بیاد، شنیده نمی‌شه.'],
 ['۳. آکورد امضا رو بیار','هر مُد یک آکورد «امضا» داره: bII در Phrygian، IV ماژور در Dorian، V ماژور در هارمونیک مینور. یک بار شنیدن همین آکورد کنار خونه، مُد رو تثبیت می‌کنه.'],
 ['۴. روی خونه‌ی نسبی نایست','همه‌ی مُدهای یک خانواده نت‌های یکسان دارن. اگه جمله‌هات روی آکورد III تموم بشن، Aeolian مثل ماژور نسبی شنیده می‌شه. پایان رو به خونه برگردون.'],
 ['۵. با بررسی‌کننده بسنج','ریف رو در ویرایشگر بنویس و «بررسی حال‌وهوا» رو باز کن: اگه مرکز تونال، نت‌های امضا و تأکید روی خونه هر سه سبز باشن، ریفت واقعاً در همون مُده.']];
var GUIDE={m:null};
function guideRender(){var box=$('guidebox');if(!box)return;var m=GUIDE.m||(MG[S.mode]?S.mode:MODES[S.mode].base),G=MG[m],iv=MODES[m].iv,names=spellAny(S.key,iv).notes,dl=dlab(iv);
  var ch=$('guidemodes');ch.innerHTML='';ORDER.forEach(function(k){var b=EL('button','chip','<span class="ltr">'+MODES[k].n+'</span>');b.setAttribute('aria-pressed',k===m);b.onclick=function(){GUIDE.m=k;guideRender();};ch.appendChild(b);});
  var sigIv=iv[G.sig],rows='<div class="gcard"><div class="gm ltr">'+spellAny(S.key,iv).root+' '+MODES[m].n+'</div><div class="hint">'+MODES[m].mood+'</div>'+
    '<div class="nts ltr" style="margin:8px 0">'+iv.map(function(x,k){return '<span class="'+(k===0?'rt':k===G.sig?'sg':'')+'">'+names[k]+'<small>'+dl[k]+'</small></span>';}).join('')+'</div>'+
    '<div class="gline"><b>نت امضا:</b> <span class="ltr">'+names[G.sig]+'</span> ('+G.sn+')</div><div class="gline"><b>آکورد امضا:</b> '+G.chn+'</div><div class="gline"><b>با چی قاطی می‌شه:</b> '+G.conf+'</div></div>';
  $('guidecur').innerHTML=rows;
  var r=EL('div','row');var b1=EL('button','btn','شنیدن آکورد امضا');b1.onclick=function(){listenProg(G.ch.map(function(j){return triad(m,j);}));};
  var b2=EL('button','btn primary','ریف نمونه در ویرایشگر');b2.onclick=function(){guideRiff(m);};var b3=EL('button','btn','بررسی ریف خودم');b3.onclick=function(){if(m!==S.mode)setMode(m);goPage('editor');var an=$('checks').closest('section');an.classList.remove('folded');setTimeout(function(){reveal($('checks'));},60);};
  r.appendChild(b1);r.appendChild(b2);r.appendChild(b3);$('guidecur').appendChild(r);}
function guideRiff(m){var iv=MODES[m].iv,rf=((S.key-1)%12+12)%12,G=MG[m],E=[];
  var seq=[G.sig,2,G.sig,4,G.sig,3,1,0];
  seq.forEach(function(dg,i){var f=rf+iv[dg];if(f>14)f-=12;var a=blankEv('16',false,false,[{s:5,f:rf}]);a.t.pm=true;var c=blankEv('16',false,false,[{s:5,f:rf}]);c.t.pm=true;var h=blankEv('8',false,false,[{s:5,f:f},{s:4,f:f+2}]);h.t.acc=dg===G.sig;E.push(a,c,h);});
  if(m!==S.mode){S.mode=m;renderModes();}
  ideaLoad(E,'نمونه‌ی '+MODES[m].n,{drums:'gallop'});}
