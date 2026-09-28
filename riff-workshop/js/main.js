/* راه‌اندازی: بارگذاری ریف، رندر اولیه */

if(!load()){var p=PRESETS.gallop;S.events=tunRef(function(){return stepsToEvents(p.steps,p.steps.length);});S.cur=0;presetFit();S.bpm=p.bpm;}
syncControls();buildNeck();buildTab();renderKeys();renderModes();changed();
tunUI();I18N.setDir();if(LANG==='en'){$('langbtn').textContent='فا';}goPage(curPage);I18N.apply(document.body);I18N.watch();
tunFirstRun();
