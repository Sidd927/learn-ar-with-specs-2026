"""Loudness-normalise the rendered film's audio and write the delivery MP4.

Usage: finalize.py <render.mp4> <out.mp4>
Two-pass EBU R128 loudnorm to -15 LUFS integrated, true peak <= -1.5 dBTP; the video stream is copied unchanged.
"""
import json, re, subprocess, sys

src, out = sys.argv[1], sys.argv[2]
target = "I=-15:TP=-1.5:LRA=11"
probe = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", src, "-af", f"loudnorm={target}:print_format=json",
                        "-f", "null", "-"], capture_output=True, text=True).stderr
m = json.loads(re.search(r"\{[^{}]*\"input_i\"[^{}]*\}", probe, re.S).group(0))
print("pass 1:", {k: m[k] for k in ("input_i", "input_tp", "input_lra", "input_thresh", "target_offset")})
af = (f"loudnorm={target}:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}"
      f":measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true,aresample=48000")
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src, "-map", "0:v:0", "-map", "0:a:0", "-c:v", "copy",
                "-af", af, "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-ac", "2",
                "-movflags", "+faststart", out], check=True)
print("wrote", out)
