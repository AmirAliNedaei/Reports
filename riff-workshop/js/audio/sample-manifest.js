/* فهرست نمونه‌های صدا: برای هر ساز، شماره‌ی MIDI نت‌هایی که فایل samples/<ساز>/<midi>.mp3 دارند.
   اگه mp3 اضافه/حذف کردی، این فهرست رو هم به‌روز کن. */
var SAMPLE_DIR='samples/';
var SAMPLES={
 acou:[37,40,43,46,49,52,55,58,61,64,67,70,73,76,79,82,85],
 harm:[49,53,57,61,65,69,73,77,81,85,89,93,97]
};
/* گیتار الکتریک DI (صدای خشک، بدون آمپ) برای تون‌های درایو، اوردرایو و کلین.
   منبع: Karoryfer Emilyguitar با مجوز CC0 — https://github.com/sfzinstruments/karoryfer.emilyguitar
   فایل‌ها: samples/di/<midi>_<شدت>_<برداشت>.mp3 و samples/di/mute_<n>.mp3 (نت dead).
   با tools/convert_di_samples.py ساخته شدن؛ اگه نمونه‌ها رو عوض کردی، خروجی اون اسکریپت رو اینجا بذار. */
var DI_SAMPLES={"notes":[37,40,42,45,48,51,54,57,60,63,66,69,72,75,78,81,84,86],"layers":{"f":3,"mf":3,"mp":1},"mutes":5};
