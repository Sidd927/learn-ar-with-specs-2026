"""Synthesise narration lines with Kokoro (local, offline).
Usage: tts.py <narration.json> <outdir> <voice> <speed> [id ...]
A line may give "parts": sentences synthesised separately and joined with a 0.24 s pause
(used where Kokoro's long-sentence prosody blurred a word)."""
import json, os, sys
import numpy as np, soundfile as sf, kokoro_onnx
src, outdir, voice, speed = sys.argv[1], sys.argv[2], sys.argv[3], float(sys.argv[4])
only = set(sys.argv[5:])
cache = os.path.expanduser("~/.cache/hyperframes/tts")
model = kokoro_onnx.Kokoro(f"{cache}/models/kokoro-v1.0.onnx", f"{cache}/voices/voices-v1.0.bin")
os.makedirs(outdir, exist_ok=True)

def synth(text):
    s, sr = model.create(text, voice=voice, speed=speed, lang="en-us")
    s = np.asarray(s, dtype=np.float32); idx = np.where(np.abs(s) > 0.01)[0]
    return s[max(idx[0] - int(0.04 * sr), 0):min(idx[-1] + int(0.08 * sr), len(s))], sr

for line in json.load(open(src)):
    if only and line["id"] not in only: continue
    parts = line.get("parts") or [line["tts"]]
    chunks = []
    for k, p in enumerate(parts):
        s, sr = synth(p)
        if k: chunks.append(np.zeros(int(0.24 * sr), dtype=np.float32))
        chunks.append(s)
    out = np.concatenate(chunks)
    sf.write(os.path.join(outdir, f"{line['id']}.wav"), out, sr)
    print(f"{line['id']}\t{len(out)/sr:.2f}s")
