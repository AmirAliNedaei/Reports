/* ایده‌های ریف */
/* ---------- idea helpers ---------- */
function ideaLoad(evs,name,opt){opt=opt||{};if(playing)stop();lpStop();
  S.events=fitBar(evs.map(fixEv));S.ts={n:4,d:4};S.cur=0;S.sel=null;if(opt.drums)S.drums=opt.drums;if(opt.bpm)S.bpm=opt.bpm;curId=null;$('rname').value=name;
  syncControls();changed();renderLib();goPage('editor');setTimeout(function(){start(true);},80);}
function chordIdeas(notes,rootPc,label){
  var ns=notes.slice().sort(function(a,b){return b.s-a.s;}),low=ns[0],hi=ns.slice(-2),A=[],B=[],C=[];
  var up=ns.concat(ns.slice(1,-1).reverse());for(var r=0;r<2;r++)up.forEach(function(n,i){var e=blankEv('8',false,false,[{s:n.s,f:n.f}]);e.t.ring=true;if(i===0)e.t.acc=true;A.push(e);});
  for(var b=0;b<2;b++){for(var k=0;k<3;k++){var e1=blankEv('16',false,false,[{s:low.s,f:low.f}]);e1.t.pm=true;var e2=blankEv('16',false,false,[{s:low.s,f:low.f}]);e2.t.pm=true;var h=blankEv('8',false,false,ns.slice(0,3).map(function(x){return {s:x.s,f:x.f};}));h.t.acc=true;B.push(e1,e2,h);}
    var hit=blankEv('q',false,false,ns.map(function(x){return {s:x.s,f:x.f};}));hit.t.ring=true;hit.t.acc=true;B.push(hit);}
  var top=hi[hi.length-1],sec=hi[0];
  C.push(blankEv('8',false,false,[{s:sec.s,f:sec.f}]),blankEv('8',false,false,[{s:top.s,f:top.f}]));
  var bd=blankEv('q',false,false,[{s:top.s,f:Math.max(0,top.f-2)}]);bd.bt='b';bd.bend=2;C.push(bd);
  var v=blankEv('h',false,false,[{s:top.s,f:top.f}]);v.t.vib=true;C.push(v);
  var s1=blankEv('8',false,false,[{s:sec.s,f:sec.f}]);s1.lg='h';C.push(s1,blankEv('8',false,false,[{s:sec.s,f:Math.min(NF,sec.f+2)}]),blankEv('q',false,false,[{s:low.s,f:low.f}]));
  var vv=blankEv('h',false,false,ns.map(function(x){return {s:x.s,f:x.f};}));vv.t.ring=true;C.push(vv);
  return [{n:'آرپژ لت‌رینگ',ev:A},{n:'چاگ و ضربه‌ی آکورد',ev:B},{n:'لید روی نت‌های آکورد',ev:C}];}
function patternIdeas(notes){var up=notes.slice(),dn=notes.slice().reverse(),A=[],B=[],C=[],root=notes[0];
  groups(up.slice(0,12),3).forEach(function(n,i){var e=blankEv('16',false,true,[{s:n.s,f:n.f}]);if(i%3===0)e.t.acc=true;A.push(e);});
  groups(dn.slice(0,12),4).forEach(function(n,i){var e=blankEv('16',false,false,[{s:n.s,f:n.f}]);if(i%4===0)e.t.acc=true;B.push(e);});
  up.slice(1,13).forEach(function(n){var p=blankEv('16',false,false,[{s:root.s,f:root.f}]);p.t.pm=true;C.push(p,blankEv('16',false,false,[{s:n.s,f:n.f}]));});
  return [{n:'سکوئنس ۳تایی رو به بالا',ev:A},{n:'سکوئنس ۴تایی رو به پایین',ev:B},{n:'ران با نت پدال',ev:C}];}
function ideaRow(list,prefix){var r=EL('div','idearow');r.appendChild(EL('span','kick','۳ ایده'));
  list.forEach(function(x,i){var b=EL('button','tb',fa(i+1)+'. '+x.n);b.onclick=function(){ideaLoad(x.ev,prefix+' — '+x.n);};r.appendChild(b);});return r;}
