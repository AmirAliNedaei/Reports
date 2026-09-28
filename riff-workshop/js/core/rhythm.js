/* مدل ریتم: دیرش نت‌ها، میزان‌ها، تبدیل استپ به رویداد */
/* ---------- rhythm model ---------- */
var DT={w:384,h:192,q:96,'8':48,'16':24,'32':12};
var DORDER=['w','h','q','8','16','32'];
var DFR={w:'1',h:'1/2',q:'1/4','8':'1/8','16':'1/16','32':'1/32'};
var DASC={w:'w',h:'h',q:'q','8':'e','16':'s','32':'t'};
function ticks(e){var t=DT[e.d]*(e.dot?1.5:1);if(e.tri)t=t*2/3;return t;}
function secsOf(t){return t/96*60/(S.bpm*S.speed/100);}
function barT(){return S.ts.n*384/S.ts.d;}
var METERS=[['4/4','4/4'],['3/4','3/4'],['6/8','6/8 (3+3)','3+3'],['12/8','12/8 (3+3+3+3)','3+3+3+3'],['5/4','5/4 (3+2)','3+2'],['7/4','7/4 (4+3)','4+3'],
 ['5/8','5/8 (2+3)','2+3'],['5/8','5/8 (3+2)','3+2'],['7/8','7/8 (2+2+3)','2+2+3'],['7/8','7/8 (3+2+2)','3+2+2'],['7/8','7/8 (2+3+2)','2+3+2'],
 ['9/8','9/8 (2+2+2+3)','2+2+2+3'],['9/8','9/8 (3+3+3)','3+3+3'],['9/8','9/8 (3+2+2+2)','3+2+2+2'],['11/8','11/8 (3+3+3+2)','3+3+3+2'],['11/8','11/8 (2+2+3+2+2)','2+2+3+2+2'],
 ['13/8','13/8 (3+3+3+2+2)','3+3+3+2+2'],['13/8','13/8 (2+2+2+3+2+2)','2+2+2+3+2+2'],['15/8','15/8 (3+3+3+3+3)','3+3+3+3+3'],['15/8','15/8 (2+2+2+3+2+2+2)','2+2+2+3+2+2+2'],
 ['7/16','7/16 (3+2+2)','3+2+2'],['13/16','13/16 (4+4+5)','4+4+5'],['16/16','16/16 (3+3+3+3+4)','3+3+3+3+4']];
function tsKey(ts){return ts.n+'/'+ts.d+(ts.g?':'+ts.g.join('+'):'');}
function unitT(){return 384/S.ts.d;}
function groupsT(){var u=unitT(),g=S.ts.g||(S.ts.d>=8?(S.ts.n%3===0?Array(S.ts.n/3).fill(3):[S.ts.n]):Array(S.ts.n).fill(1)),a=[0],t=0;g.forEach(function(x){t+=x*u;a.push(t);});return a;}
function grpIdx(tick){var bt=barT(),r=((tick%bt)+bt)%bt,a=groupsT();for(var i=a.length-2;i>=0;i--)if(r>=a[i]-1e-6)return Math.floor(tick/bt)*100+i;return 0;}
function beatT(){return unitT();}
function beamG(){return S.ts.d===16?96:S.ts.d===8?144:96;}
function T(e,k){return !!(e&&e.t&&e.t[k]);}
function blankEv(d,dot,tri,notes){return {d:d,dot:!!dot,tri:!!tri,rest:!notes||!notes.length,notes:notes||[],t:{},lg:'',sin:'',sout:'',bend:2,bt:'',harm:''};}
function newEv(notes){return blankEv(S.nd.d,S.nd.dot,S.nd.tri,notes);}
function fixEv(e){var b=blankEv(DT[e.d]?e.d:'8',e.dot,e.tri,Array.isArray(e.notes)?e.notes.filter(function(n){return n&&n.s>=0&&n.s<6&&n.f>=0&&n.f<=NF;}):[]);
  b.rest=!!e.rest||!b.notes.length;b.t=(e.t&&typeof e.t==='object')?e.t:{};['lg','sin','sout','bt','harm'].forEach(function(k){if(typeof e[k]==='string')b[k]=e[k];});if(e.bend)b.bend=e.bend;return b;}
function decomp(t){var P=[[384,'w',0],[288,'h',1],[192,'h',0],[144,'q',1],[96,'q',0],[72,'8',1],[48,'8',0],[36,'16',1],[24,'16',0],[12,'32',0]],out=[];
  while(t>=12){for(var i=0;i<P.length;i++){if(P[i][0]<=t){out.push({d:P[i][1],dot:!!P[i][2]});t-=P[i][0];break;}}}return out;}
function stepsToEvents(steps,len){
  len=len||steps.length;var ev=[],idx=[];steps.forEach(function(st,i){if(st)idx.push(i);});
  if(!idx.length)return [];
  if(idx[0]>0)decomp(idx[0]*24).forEach(function(p){ev.push(blankEv(p.d,p.dot,false,null));});
  idx.forEach(function(i,k){var st=steps[i],end=k+1<idx.length?idx[k+1]:len,parts=decomp((end-i)*24);
    var notes=st.t==='n'?chordFrets(st):null;
    parts.forEach(function(p,j){var e=blankEv(p.d,p.dot,false,notes?notes.map(function(n){return {s:n.s,f:n.f};}):null);
      if(notes){if(st.pm)e.t.pm=true;if(j>0)e.t.tie=true;}ev.push(e);});});
  return ev;}
function setFromSteps(steps,len){S.events=stepsToEvents(steps,len);S.cur=0;}
