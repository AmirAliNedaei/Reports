/* موتور ترجمه‌ی فارسی/انگلیسی (دیکشنری در translations.js) */
/* ---------- i18n (fa / en) ---------- */
var LANG='fa';try{LANG=localStorage.getItem('riff-workshop-lang')==='en'?'en':'fa';}catch(e){}
var I18N=(function(){
  var D=I18N_DICT,FAD='۰۱۲۳۴۵۶۷۸۹',PR=/[\u0600-\u06FF]/;
  function nrm(x){return x.replace(/[۰-۹]/g,function(c){return FAD.indexOf(c);}).replace(/\s+/g,' ');}
  var keys=Object.keys(D).filter(function(k){return k.length>=2;}).sort(function(a,b){return b.length-a.length;});
  var RX={};function rx(k){if(!RX[k])RX[k]=new RegExp('(?<![\\u0620-\\u065F\\u0671-\\u06D3\\u06FA-\\u06FC\\u200c])'+k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(?![\\u0620-\\u065F\\u0671-\\u06D3\\u06FA-\\u06FC\\u200c])','g');return RX[k];}
  var cache={};
  function tr(str){
    if(!PR.test(str))return str;if(cache[str]!==undefined)return cache[str];
    var n=nrm(str),t=n.trim(),lead=n.match(/^\s*/)[0],tail=n.match(/\s*$/)[0],out;
    if(D[t]!==undefined)out=lead+D[t]+tail;
    else{out=n;for(var i=0;i<keys.length&&PR.test(out);i++){var k=keys[i];if(out.indexOf(k)>=0)out=out.replace(rx(k),D[k]);}}
    out=out.replace(/،/g,',').replace(/؛/g,';').replace(/؟/g,'?').replace(/[«»]/g,'"').replace(/٪/g,'%').replace(/\u200c/g,'');
    cache[str]=out;return out;}
  var ATTRS=['title','placeholder','aria-label'];
  function trNode(n){var p=n.parentNode;if(!p||p.nodeName==='SCRIPT'||p.nodeName==='STYLE')return;var v=n.nodeValue;
    if(LANG==='en'){if(v===n.__en)return;if(!PR.test(v))return;n.__fa=v;n.__en=tr(v);n.nodeValue=n.__en;}
    else if(n.__fa!==undefined&&v===n.__en){n.nodeValue=n.__fa;n.__en=undefined;}}
  function trAttr(el,a){var v=el.getAttribute(a);if(v===null)return;var st='data-o-'+a;
    if(LANG==='en'){if(el.__ea&&el.__ea[a]===v)return;if(!PR.test(v))return;el.setAttribute(st,v);var e=tr(v);el.__ea=el.__ea||{};el.__ea[a]=e;el.setAttribute(a,e);}
    else if(el.hasAttribute(st)&&el.__ea&&el.__ea[a]===v){el.setAttribute(a,el.getAttribute(st));el.__ea[a]=undefined;}}
  function apply(root){if(!root)return;if(root.nodeType===3){trNode(root);return;}
    var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null),n,list=[];while((n=w.nextNode()))list.push(n);list.forEach(trNode);
    if(root.querySelectorAll){var els=[root].concat(Array.prototype.slice.call(root.querySelectorAll('[title],[placeholder],[aria-label]')));
      els.forEach(function(el){if(el.getAttribute)ATTRS.forEach(function(a){if(el.hasAttribute(a))trAttr(el,a);});});}}
  var mo=null;
  function watch(){if(mo||typeof MutationObserver==='undefined')return;
    mo=new MutationObserver(function(ms){if(LANG!=='en')return;ms.forEach(function(m){
      if(m.type==='characterData')trNode(m.target);
      else if(m.type==='attributes')trAttr(m.target,m.attributeName);
      else Array.prototype.forEach.call(m.addedNodes,function(x){if(x.nodeType===3)trNode(x);else if(x.nodeType===1)apply(x);});});});
    mo.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:ATTRS});}
  function setDir(){var h=document.documentElement;h.setAttribute('lang',LANG);h.setAttribute('dir',LANG==='en'?'ltr':'rtl');document.title=LANG==='en'?'Riff Forge · C# Standard':'کارگاه ریف C# Standard';}
  return {tr:tr,apply:apply,watch:watch,setDir:setDir};
})();
// ترجمه‌ی متن‌هایی که در فایل‌های داده تعریف می‌شن (کلید مثل دیکشنری: اعداد لاتین، فاصله‌ی یکسان)
function trAdd(fa,en){if(!fa||!en)return;I18N_DICT[fa.replace(/[۰-۹]/g,function(c){return '۰۱۲۳۴۵۶۷۸۹'.indexOf(c);}).replace(/\s+/g,' ').trim()]=en;}
function setLang(l){LANG=l==='en'?'en':'fa';try{localStorage.setItem('riff-workshop-lang',LANG);}catch(e){}
  I18N.setDir();if($('setlang'))$('setlang').value=LANG;if($('langbtn')){$('langbtn').textContent=LANG==='en'?'فا':'EN';$('langbtn').title=LANG==='en'?'فارسی':'English';}
  renderKeys();renderModes();changed(true);renderAnalysis();renderLib();if(curPage)goPage(curPage);I18N.apply(document.body);}
