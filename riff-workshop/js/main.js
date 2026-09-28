/* راه‌اندازی: بارگذاری ریف، رندر اولیه */

if(!load()){var p=PRESETS.gallop;setFromSteps(p.steps,p.steps.length);S.bpm=p.bpm;}
syncControls();buildNeck();buildTab();renderKeys();renderModes();changed();
I18N.setDir();if(LANG==='en'){$('langbtn').textContent='فا';}goPage(curPage);I18N.apply(document.body);I18N.watch();
