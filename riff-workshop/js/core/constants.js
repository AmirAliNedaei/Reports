/* ثابت‌ها: کوک C# Standard، نام نت‌ها، مدها، اعداد فارسی */
var OPEN=[61,56,52,47,42,37];
var SNAME=['C#','G#','E','B','F#','C#'];
var PCN=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
var FLATN=['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'];
var MAJ=[0,2,4,5,7,9,11],LET=['C','D','E','F','G','A','B'],NAT=[0,2,4,5,7,9,11];
var NF=24,RH=34;
var MODES={
 lyd:{n:'Lydian',iv:[0,2,4,6,7,9,11],mood:'رویایی و معلق',q:'maj',sig:[6]},
 ion:{n:'Ionian',iv:[0,2,4,5,7,9,11],mood:'شاد و روشن',q:'maj',sig:[4,11]},
 mix:{n:'Mixolydian',iv:[0,2,4,5,7,9,10],mood:'ماژورِ خشن و راکی',q:'maj',sig:[4,10]},
 dor:{n:'Dorian',iv:[0,2,3,5,7,9,10],mood:'غمگین ولی امیدوار',q:'min',sig:[9]},
 aeo:{n:'Aeolian',iv:[0,2,3,5,7,8,10],mood:'غمگین و حماسی؛ پایه‌ی ملودیک دث',q:'min',sig:[8,2]},
 phr:{n:'Phrygian',iv:[0,1,3,5,7,8,10],mood:'تاریک و تهدیدآمیز',q:'min',sig:[1]},
 loc:{n:'Locrian',iv:[0,1,3,5,6,8,10],mood:'ناپایدار و عجیب',q:'min',sig:[6,1]},
 hm:{n:'Harmonic minor',iv:[0,2,3,5,7,8,11],mood:'تاریک و کلاسیکال',q:'min',sig:[11,8]}
};
var ORDER=['lyd','ion','mix','dor','aeo','phr','loc','hm'];
var SHORT={lyd:'Lydian',ion:'Ionian',mix:'Mixolydian',dor:'Dorian',aeo:'Aeolian',phr:'Phrygian',loc:'Locrian',hm:'Harmonic minor'};
var FA=['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
function fa(n){if(LANG==='en')return String(n);return String(n).replace(/\d/g,function(d){return FA[+d];});}
