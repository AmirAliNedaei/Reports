#!/usr/bin/env python3
"""تبدیل نمونه‌های DI گیتار (wav) به mp3های سبک برای پوشه‌ی samples/di/.

ورودی: پوشه‌ای با فایل‌های نت به اسم <نت>_<شدت>_rr<شماره>.wav، مثلاً a2_mf_rr1.wav
(نت با حروف کوچک و b برای بمل: db2، eb3، gb4 …) و در صورت وجود فایل‌های
صدای سیم خفه (برای نت‌های dead) به اسم muted1_rr<شماره>.wav.
این همان نام‌گذاری Karoryfer Emilyguitar است (CC0):
https://github.com/sfzinstruments/karoryfer.emilyguitar

اگر نمونه‌های خودت را ضبط کردی، با همین نام‌گذاری ذخیره کن و اسکریپت را دوباره اجرا کن.

اجرا:
    pip install numpy soundfile lameenc
    python3 tools/convert_di_samples.py <پوشه‌ی wavها> samples/di

خروجی: samples/di/<midi>_<شدت>_<rr>.mp3 و samples/di/mute_<n>.mp3
و در آخر خط DI_SAMPLES را چاپ می‌کند که باید در js/audio/sample-manifest.js گذاشته شود.
"""
import glob
import json
import os
import re
import sys

import lameenc
import numpy as np
import soundfile as sf

# چه شدت‌هایی و چند برداشت (round robin) از هر کدام نگه داشته شود.
# f برای نت‌های آکسان‌دار، mf برای نت‌های معمولی، mp برای نت‌های گوست.
LAYERS = {'f': 3, 'mf': 3, 'mp': 1}
MUTES = 5
SECONDS = 3.0      # طول نگه‌داشته‌شده از هر نت
FADE = 0.35        # فِید انتهای نت
TARGET_RMS_DB = -18.0  # بلندی نیم‌ثانیه‌ی اول لایه‌ی mf بعد از نرمال‌سازی
KBPS = 96
SR = 44100

NAMES = {'c': 0, 'db': 1, 'd': 2, 'eb': 3, 'e': 4, 'f': 5, 'gb': 6, 'g': 7, 'ab': 8, 'a': 9, 'bb': 10, 'b': 11}


def midi_of(name):
    m = re.fullmatch(r'([a-g]b?)(\d)', name)
    return 12 * (int(m.group(2)) + 1) + NAMES[m.group(1)]


def load(path):
    x, sr = sf.read(path, dtype='float64', always_2d=True)
    x = x.mean(axis=1)
    if sr != SR:
        raise SystemExit('%s: نرخ نمونه‌برداری باید %d باشد، نه %d' % (path, SR, sr))
    return x


def shape(x, seconds):
    n = min(len(x), int(seconds * SR))
    x = x[:n].copy()
    f = min(n, int(FADE * SR))
    x[n - f:] *= np.linspace(1, 0, f) ** 2
    return x


def encode(x, path):
    pcm = (np.clip(x, -1, 1) * 32767).astype('<i2').tobytes()
    enc = lameenc.Encoder()
    enc.set_bit_rate(KBPS)
    enc.set_in_sample_rate(SR)
    enc.set_channels(1)
    enc.set_quality(2)
    with open(path, 'wb') as f:
        f.write(enc.encode(pcm) + enc.flush())


def rms_db(x):
    return 20 * np.log10(np.sqrt(np.mean(x ** 2)) + 1e-12)


def main(src, out):
    os.makedirs(out, exist_ok=True)
    notes = {}
    for p in glob.glob(os.path.join(src, '**', '*.wav'), recursive=True):
        m = re.fullmatch(r'([a-g]b?\d)_(f|mf|mp|p)_rr(\d+)\.wav', os.path.basename(p))
        if m:
            notes.setdefault(midi_of(m.group(1)), {}).setdefault(m.group(2), {})[int(m.group(3))] = p
    if not notes:
        raise SystemExit('هیچ فایل نتی در %s پیدا نشد' % src)
    for midi in sorted(notes):
        layers = notes[midi]
        ref = load(layers['mf'][1])[:SR // 2]
        gain = 10 ** ((TARGET_RMS_DB - rms_db(ref)) / 20)
        # نگذار لایه‌ی f کلیپ کند؛ نسبت بلندی بین شدت‌ها حفظ می‌شود
        peak = max(np.abs(load(p)).max() for p in layers['f'].values())
        gain = min(gain, 0.95 / peak)
        for lay, count in LAYERS.items():
            for rr in range(1, count + 1):
                x = shape(load(layers[lay][rr]) * gain, SECONDS)
                encode(x, os.path.join(out, '%d_%s_%d.mp3' % (midi, lay, rr)))
        print('نت', midi, 'بهره %.1f dB' % (20 * np.log10(gain)))
    mutes = sorted(glob.glob(os.path.join(src, '**', 'muted1_rr*.wav'), recursive=True))[:MUTES]
    for i, p in enumerate(mutes, 1):
        x = load(p)
        encode(shape(x * (0.9 / np.abs(x).max()), 0.4), os.path.join(out, 'mute_%d.mp3' % i))
    manifest = {'notes': sorted(notes), 'layers': LAYERS, 'mutes': len(mutes)}
    print('\nvar DI_SAMPLES=' + json.dumps(manifest, separators=(',', ':')) + ';')


if __name__ == '__main__':
    if len(sys.argv) != 3:
        raise SystemExit(__doc__)
    main(sys.argv[1], sys.argv[2])
