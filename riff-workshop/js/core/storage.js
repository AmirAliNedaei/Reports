/* ذخیره و بازیابی ریف فعلی در localStorage */
/* ---------- persistence ---------- */
var KEY='riff-workshop-csharp-v1';
function save(){try{localStorage.setItem(KEY,JSON.stringify({v:2,key:S.key,mode:S.mode,events:S.events,bpm:S.bpm,tone:S.tone,ts:S.ts,drums:S.drums||'none'}));}catch(e){}}
function load(){try{var d=JSON.parse(localStorage.getItem(KEY)||'null');if(!d)return false;
  if(Array.isArray(d.events))S.events=d.events.map(fixEv);else if(Array.isArray(d.steps))S.events=stepsToEvents(d.steps,d.len||d.steps.length);else return false;
  S.key=(d.key>=0&&d.key<12)?d.key:1;S.mode=MODES[d.mode]?d.mode:'aeo';S.bpm=d.bpm||140;S.tone=normT(d.tone);S.ts=(d.ts&&d.ts.n&&d.ts.d)?d.ts:{n:4,d:4};S.drums=d.drums||'none';S.cur=0;return true;}catch(e){return false;}}
