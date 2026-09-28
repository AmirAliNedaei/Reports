/* AudioWorklet ضبط: سه کانال (بکینگ چپ، بکینگ راست، میکروفون) رو نمونه‌به‌نمونه هم‌زمان جمع می‌کنه
   و بلندی میکروفون رو برای نمایشگر سطح می‌فرسته. در thread صوتی اجرا می‌شه، نه در صفحه. */
class RiffRecProc extends AudioWorkletProcessor{
  constructor(){super();this.on=false;this.peak=0;this.n=0;
    this.port.onmessage=(e)=>{if(e.data==='start')this.on=true;else if(e.data==='stop'){this.on=false;this.port.postMessage({done:true});}};}
  process(inputs){const inp=inputs[0];if(!inp||!inp.length)return true;
    const mic=inp[2]||inp[0];for(let i=0;i<mic.length;i++){const a=Math.abs(mic[i]);if(a>this.peak)this.peak=a;}
    if(++this.n>=16){this.port.postMessage({lvl:this.peak});this.peak=0;this.n=0;}
    if(this.on)this.port.postMessage({ch:[inp[0]?inp[0].slice(0):null,inp[1]?inp[1].slice(0):null,inp[2]?inp[2].slice(0):null]});
    return true;}}
registerProcessor('riff-rec',RiffRecProc);
