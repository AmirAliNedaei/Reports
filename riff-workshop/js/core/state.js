/* وضعیت سراسری S، تابع $ و توابع پایه‌ی تئوری (اسپل نت، آکورد) */

function $(id){return document.getElementById(id);}

var S={key:1,mode:'aeo',events:[],cur:0,cs:5,sel:null,ts:{n:4,d:4},speed:100,metro:false,countin:false,nd:{d:'8',dot:false,tri:false},chord:false,bpm:140,tone:'drive',loop:true,snap:false,deg:false,listen:false,lens:null};
function emptySteps(n){var a=[];for(var i=0;i<n;i++)a.push(null);return a;}

function spell(ivs){return spellAny(S.key,ivs).notes;}
function RN(k){return spellAny(S.key,MODES[k||S.mode].iv).root;}
function MN(k){k=k||S.mode;return RN(k)+' '+MODES[k].n;}
function dlab(ivs){return ivs.map(function(iv,i){var d=iv-MAJ[i];return (d<0?'b'.repeat(-d):'#'.repeat(d))+(i+1);});}
function ivOf(midi){return ((midi%12)-S.key+12)%12;}
function midiAt(s,f){return OPEN[s]+f;}
function inScale(midi){return MODES[S.mode].iv.indexOf(ivOf(midi))>=0;}
function label(midi){var m=MODES[S.mode],iv=ivOf(midi),k=m.iv.indexOf(iv);
  if(k>=0)return S.deg?dlab(m.iv)[k]:spell(m.iv)[k];
  return PCN[midi%12];}
function chordMidis(st){var m=midiAt(st.s,st.f);return st.pc?[m,m+7,m+12]:[m];}
function chordFrets(st){var out=[{s:st.s,f:st.f}];if(!st.pc)return out;
  var m=midiAt(st.s,st.f);
  if(st.s-1>=0)out.push({s:st.s-1,f:m+7-OPEN[st.s-1]});
  if(st.s-2>=0)out.push({s:st.s-2,f:m+12-OPEN[st.s-2]});
  return out;}
