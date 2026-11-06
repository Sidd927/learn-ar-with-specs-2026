"""Build the Coach's Eye demo film composition from one timing table.

Writes, from the data below:
  index.html                     the HyperFrames composition (1920x1080, 30 fps)
  ../final/captions.srt          the narration as an SRT sidecar for YouTube
  FINAL_SCRIPT_AND_STORYBOARD.md the shot-by-shot script

All times are film seconds. Footage times are seconds into the CFR intermediates:
  rec1.mp4 = Recording 1 (3.22.34 AM) from 30.0 s, preview crop   ("p" times)
  rec2.mp4 = Recording 2 (3.28.19 AM) from 0.0 s,  preview crop   ("q" times)
  wide.mp4 = Recording 1 from 30.0 s, full Lens Studio window (menu bar cropped)
Press frames were measured from the footage (frame difference), not taken from the take log.
"""
import html, json, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
DURATION = 159.5

# Product window: the preview crop (1252x1436) scaled 0.881789 -> 1104x1266, top 294 px hidden.
BOX = dict(left=720, top=54, w=1104, h=972)
VSCALE = 1104 / 1252
VID_TOP = -294

# ---------------------------------------------------------------- footage edit
# (id, src, start, end, media_start, dissolve_in)
CLIPS = [
    ("hook",     "rec1",   0.0,  10.35, 116.0, 0.0),   # Knees comparison, front view (hero / hook)
    ("intro",    "rec1",  10.0,  26.65,   0.0, 0.0),   # intro screen (under the wide shot until 16.5)
    ("phases",   "rec1",  26.4,  45.45,  31.6, 0.25),  # media start includes the 2.0 s ripple at 27.0  # Start p34.4 -> t31.2, squat, complete
    ("step1",    "rec1",  45.2,  49.55,  78.6, 0.25),  # Prev p80.2 -> t46.8
    ("step2",    "rec1",  49.3,  53.85,  91.5, 0.2),   # Prev p93.2 -> t51.0
    ("knees1",   "rec1",  53.6,  70.5,  107.2, 0.3),   # Knees on p113.6 -> t60.0
    ("knees2",   "rec1",  70.5,  80.65, 130.7, 0.0),   # static hold; Knees off p137.4 -> t77.2
    ("heels1",   "rec1",  80.4,  94.6,  163.4, 0.25),  # Heels on p163.8 -> t80.8
    ("heels2",   "rec1",  94.6,  96.85, 187.6, 0.0),   # static hold; Heels off p188.7 -> t95.7
    ("chest1",   "rec1",  96.6, 113.6,  210.1, 0.25),  # Chest on p210.6 -> t97.1
    ("chest2",   "rec1", 113.6, 115.85, 231.9, 0.0),   # static hold; Chest off p233.2 -> t114.9
    ("front",    "rec1", 115.6, 118.6,  248.2, 0.2),   # Front p249.4 -> t116.8
    ("ang35",    "rec1", 118.4, 120.6,  263.1, 0.2),   # 35 deg p264.3 -> t119.6
    ("slowon",   "rec1", 120.4, 123.0,  274.5, 0.2),   # Slow on p275.3 -> t121.2
    ("play",     "rec1", 122.8, 124.3,  286.9, 0.2),   # Play p287.9 -> t123.8 (end of Recording 1)
    ("slowplay", "rec2", 124.0, 127.3,    3.6, 0.3),   # starts 0.6 s later in q (ripple at 124.6)   # Recording 2: same state, half-speed rise
    ("replay",   "rec2", 127.0, 151.65,  18.7, 0.3),   # Replay q20.2 -> t128.5; complete q32.5 -> t140.8
    ("endhero",  "rec1", 151.4, DURATION, 118.0, 0.4), # Knees comparison again under the end card
]
WIDE = dict(start=10.0, end=16.6, media_start=0.0, fade_in=(10.0, 0.35), push=(14.7, 1.6), fade_out=(16.1, 0.4))

# camera punch-ins on the product window: (scale, origin x, origin y, in-start, out-start)
PUNCHES = [
    (1.45, 560, 620, 69.4, 75.4),   # Knees: red knees inside the white
    (1.60, 600, 770, 86.0, 91.6),   # Heels: the raised red heel
    (1.40, 560, 520, 101.0, 105.6), # Chest: torso and head
    (1.90, 30, 650, 107.0, 113.0),  # card note "Exaggerated for clarity. This Lens does not assess your form."
    (1.80, 30, 620, 141.0, 144.0),  # completion card "Try Knees, Heels or Chest below ..."
]

# real button presses (frame where the UI responds) -> soft click one frame later
PRESSES = [31.2, 46.8, 51.0, 60.0, 77.2, 80.8, 95.7, 97.1, 114.9, 116.8, 119.6, 121.2, 123.8, 128.5]

# ---------------------------------------------------------------- narration
VO = [("L01", 0.5), ("L02", 4.35), ("L03", 10.3), ("L04", 17.7), ("L05a", 30.8), ("L05b", 36.55), ("L06", 45.2),
      ("L07", 53.9), ("L08", 64.9), ("L09", 76.8), ("L10", 80.6), ("L11", 96.9), ("L12", 106.4),
      ("L13", 116.0), ("L14a", 128.0), ("L15", 131.6), ("L14b", 141.0), ("L16", 143.8), ("L17", 151.7)]
NO_CAPTION = {"L17"}  # the end card prints these words
# lines split at a measured pause after synthesis: id -> cut time (s) in the synthesised file
SPLITS = {"L05": 3.70, "L14": 3.12}

# ---------------------------------------------------------------- editorial column (x 192..680)
SECTIONS = [  # (text, start, end)
    ("The demonstration", 26.6, 53.6), ("Compare one pattern", 53.8, 115.4), ("Explore", 115.8, 127.0),
    ("Replay", 127.2, 131.4), ("Why head-worn", 131.6, 140.9), ("What's next", 143.6, 151.2)]

# kinetic lines: (id, text, cls, start, end, top)
LINES = [
    ("h1", "Watch the movement.", "stack", 0.0, 9.95, 280),
    ("h2", "See what changes.", "stack", 5.8, 9.95, 410),
    ("h3", "Know where to look.", "stack", 8.25, 9.95, 540),
    ("t1", "Coach's Eye", "wordmark", 16.4, 26.3, 140),
    ("t2", "Spatial squat comparison for SPECS", "sub", 16.8, 26.3, 248),
    ("d1", "Demonstration only", "statement", 21.9, 26.3, 420),
    ("d2", "No body tracking.", "aside", 23.8, 26.3, 556),
    ("d3", "No form assessment.", "aside", 25.6, 26.3, 604),
    ("k1", "Knees", "bigword", 60.1, 77.2, 230),
    ("k2", "Front view", "tag", 60.5, 77.2, 370),
    ("e1", "Heels", "bigword", 80.9, 95.7, 230),
    ("e2", "Side view", "tag", 82.7, 95.7, 370),
    ("c1", "Chest", "bigword", 97.2, 114.9, 230),
    ("c2", "Side view", "tag", 98.0, 114.9, 370),
    ("x1", "Front", "bigword", 116.8, 119.6, 230),
    ("x2", "35°", "bigword", 119.6, 121.2, 230),
    ("x3", "Slow 0.5x", "bigword-s", 121.2, 127.0, 244),
    ("w1", "Hands free", "stack", 133.9, 140.9, 230),
    ("w2", "Eyes up", "stack", 135.0, 140.9, 360),
    ("w3", "In your own space", "stack", 137.4, 140.9, 490),
    ("n1", "Does it help people learn?", "question", 144.5, 151.2, 230),
    ("n2", "Could it work for other movements?", "question", 147.4, 151.2, 380),
    ("z1", "Coach's Eye", "endmark", 151.8, DURATION, 200),
    ("z2", "See the difference.", "tagline", 152.45, DURATION, 352),
    ("z3", "Understand what to observe.", "tagline", 154.05, DURATION, 414),
    ("z4", "Learn AR with SPECS 2026", "event", 155.0, DURATION, 548),
    ("z5", "github.com/Sidd927/learn-ar-with-specs-2026", "url", 155.4, DURATION, 598),
    ("z6", "Recorded in the Lens Studio preview (SPECS 27 simulation). Illustrative patterns, "
           "exaggerated for clarity. This Lens does not assess your form.", "fine", 155.8, DURATION, 800),
]
DIM = {"h1": [5.8], "h2": [8.25], "w1": [135.0], "w2": [137.4]}  # earlier stack lines step back

PHASES = ["Starting Stance", "Controlled Descent", "Bottom Position", "Rising Up", "Standing Finish"]
PHASE_WIN = (26.6, 53.6)
# (time, active index or "all")
PHASE_STATES = [(31.2, 0), (32.7, 1), (35.4, 2), (38.1, 3), (40.8, 4), (43.5, "all"), (46.8, 3), (51.0, 2)]

LOWER_THIRD = dict(start=10.4, end=16.5, mark_at=10.95, sub_at=12.45, note_at=14.8)


# ---------------------------------------------------------------- captions from word timings
def caption_groups():
    timings = json.load(open(os.path.join(ROOT, "..", "audio", "vo_word_timings.json")))
    caps = {l["id"]: l["cap"] for l in json.load(open(os.path.join(ROOT, "narration.json")))}
    for vid, cut in SPLITS.items():          # split timings and caption text at the same cut as the audio
        ws = timings[vid]; words = caps[vid].split()
        a = [w for w in ws if w["start"] < cut]
        timings[vid + "a"] = a
        timings[vid + "b"] = [dict(w, start=w["start"] - cut, end=w["end"] - cut) for w in ws if w["start"] >= cut]
        caps[vid + "a"] = " ".join(words[:len(a)]); caps[vid + "b"] = " ".join(words[len(a):])
    groups = []
    for vid, start in VO:
        if vid in NO_CAPTION:
            continue
        words, shown = timings[vid], caps[vid].split()
        assert len(words) == len(shown), (vid, len(words), len(shown))
        pairs = list(zip(words, shown))
        # 1) clauses: break after . : ; ? and after a comma
        clauses, cur = [], []
        for w, s in pairs:
            cur.append((w, s))
            if s[-1] in ".:;?,":
                clauses.append(cur); cur = []
        if cur:
            clauses.append(cur)
        # 2) long clauses split into balanced chunks of at most 50 characters (two caption lines)
        chunks = []
        for c in clauses:
            n = 1
            while len(" ".join(x[1] for x in c)) / n > 50:
                n += 1
            per = -(-len(c) // n)
            chunks.extend(c[i:i + per] for i in range(0, len(c), per))
        # 3) merge a fragment under 16 characters into its neighbour when the pair still fits
        txt = lambda c: " ".join(x[1] for x in c)
        ends_sentence = lambda c: txt(c)[-1] in ".:;?"
        merged, carry = [], []
        for c in chunks:
            c = carry + c; carry = []
            short = len(txt(c)) < 16
            if short and (not merged or ends_sentence(merged[-1])) and not ends_sentence(c):
                carry = c                      # lead-in fragment: join the clause it introduces
            elif merged and (short or len(txt(merged[-1])) < 16) and not ends_sentence(merged[-1]) \
                    and len(txt(merged[-1] + c)) <= 52:
                merged[-1] = merged[-1] + c    # tail fragment: join the clause it finishes
            else:
                merged.append(c)
        if carry:
            merged.append(carry)
        for c in merged:
            groups.append(dict(text=" ".join(x[1] for x in c), start=round(start + c[0][0]["start"] - 0.05, 3),
                               end=round(start + c[-1][0]["end"] + 0.12, 3)))
    # no overlaps; close each group before the next opens; keep each on screen >= 0.9 s when possible
    for a, b in zip(groups, groups[1:]):
        a["end"] = min(max(a["end"], a["start"] + 0.9), b["start"] - 0.02)
        if b["start"] - a["end"] < 0.6:          # short pause: hold the caption instead of flickering
            a["end"] = round(b["start"] - 0.02, 3)
    return groups


def split_vo():
    import subprocess
    vo = os.path.join(ROOT, "assets", "vo")
    for vid, cut in SPLITS.items():
        src = os.path.join(vo, f"{vid}.wav")
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src, "-t", f"{cut}", "-af",
                        f"afade=t=out:st={cut - 0.06:.2f}:d=0.06", os.path.join(vo, f"{vid}a.wav")], check=True)
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", f"{cut}", "-i", src, "-af", "afade=t=in:st=0:d=0.03",
                        os.path.join(vo, f"{vid}b.wav")], check=True)


def typo(t):
    """Typographic apostrophes for on-screen text."""
    return t.replace("'", "\u2019")


def srt_time(t):
    ms = int(round(t * 1000)); h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def vo_duration(vid):
    import wave
    with wave.open(os.path.join(ROOT, "assets", "vo", f"{vid}.wav")) as w:
        return w.getnframes() / w.getframerate()


# ---------------------------------------------------------------- HTML
# Ripple cuts, applied to every film time at build: (from time, shift). Removes dead holds measured on render v2:
# the wait before Start (27.0), the static Heels hold (93.0), and the slow-motion setup (122.0, 124.6).
RIPPLES = [(27.0, -2.0), (93.0, -1.6), (122.0, -0.6), (124.6, -0.6)]


def R(t):
    return round(t + sum(d for at, d in RIPPLES if t >= at), 3)


def apply_ripples():
    global CLIPS, WIDE, PUNCHES, PRESSES, VO, SECTIONS, LINES, PHASE_WIN, PHASE_STATES, LOWER_THIRD, DURATION, DIM
    CLIPS = [(i, src, R(s), R(e), m, d) for i, src, s, e, m, d in CLIPS]
    PUNCHES = [(sc, ox, oy, R(a), R(b)) for sc, ox, oy, a, b in PUNCHES]
    PRESSES = [R(t) for t in PRESSES]
    VO = [(v, R(t)) for v, t in VO]
    SECTIONS = [(t, R(a), R(b)) for t, a, b in SECTIONS]
    LINES = [(i, t, c, R(a), R(b), top) for i, t, c, a, b, top in LINES]
    DIM = {k: [R(t) for t in v] for k, v in DIM.items()}
    PHASE_WIN = (R(PHASE_WIN[0]), R(PHASE_WIN[1]))
    PHASE_STATES = [(R(t), i) for t, i in PHASE_STATES]
    DURATION = R(DURATION)


def build():
    apply_ripples()
    split_vo()
    e = lambda t: html.escape(typo(t), quote=False)
    tl = []          # GSAP statements
    body = []        # markup

    # product window and its footage
    vids = []
    for z, (cid, src, s, end, m, d) in enumerate(CLIPS):
        vids.append(f'<video id="v-{cid}" class="clip vid" src="assets/video/{src}.mp4" muted playsinline '
                    f'data-start="{s}" data-duration="{round(end - s, 3)}" data-media-start="{m}" '
                    f'data-track-index="1" style="z-index:{z + 1}"></video>')
        if d:
            tl.append(f'tl.fromTo("#v-{cid}", {{opacity: 0}}, {{opacity: 1, duration: {d}, ease: "none"}}, {s});')
    body.append('<div id="stage"><div id="cam" data-layout-allow-overflow>' + "\n".join(vids) + '</div></div>')

    # camera: hook push, then punch-ins
    tl.append('tl.set("#cam", {scale: 1, transformOrigin: "50% 50%"}, 10.4);')
    for sc, ox, oy, t_in, t_out in PUNCHES:
        tl.append(f'tl.set("#cam", {{transformOrigin: "{ox}px {oy}px"}}, {t_in - 0.01});')
        tl.append(f'tl.to("#cam", {{scale: {sc}, duration: 0.6, ease: "power2.inOut"}}, {t_in});')
        tl.append(f'tl.to("#cam", {{scale: 1, duration: 0.6, ease: "power2.inOut"}}, {t_out});')
    tl.append(f'tl.to("#stage", {{scale: 0.8, transformOrigin: "100% 50%", duration: 0.8, ease: "power3.inOut"}}, {R(151.3)});')
    tl.append(f'tl.set("#cam", {{transformOrigin: "560px 620px"}}, {R(151.39)});')
    tl.append(f'tl.to("#cam", {{scale: 1.06, duration: {round(DURATION - R(151.4), 3)}, ease: "sine.inOut"}}, {R(151.4)});')

    # establishing wide shot of Lens Studio, pushing into the preview
    W = WIDE
    fx = BOX["left"] - 1614 * VSCALE
    fy = BOX["top"] - 569 * VSCALE
    body.append(f'<div id="wide-wrap"><video id="v-wide" class="clip" src="assets/video/wide.mp4" muted playsinline '
                f'data-start="{W["start"]}" data-duration="{round(W["end"] - W["start"], 3)}" '
                f'data-media-start="{W["media_start"]}" data-track-index="2"></video></div>')
    tl.append(f'tl.fromTo("#wide-wrap", {{scale: {1920 / 2880:.6f}, x: 0, y: 0, opacity: 0, transformOrigin: "0px 0px"}}, '
              f'{{opacity: 1, duration: {W["fade_in"][1]}, ease: "none"}}, {W["fade_in"][0]});')
    tl.append(f'tl.to("#wide-wrap", {{scale: {VSCALE:.6f}, x: {fx:.2f}, y: {fy:.2f}, duration: {W["push"][1]}, '
              f'ease: "power2.inOut"}}, {W["push"][0]});')
    tl.append(f'tl.to("#wide-wrap", {{opacity: 0, duration: {W["fade_out"][1]}, ease: "none"}}, {W["fade_out"][0]});')

    # lower third over the wide shot
    L = LOWER_THIRD
    body.append(f'<div id="lower" class="clip" data-start="{L["start"]}" data-duration="{round(L["end"] - L["start"], 3)}" '
                f'data-track-index="3"><div id="lower-scrim"></div>'
                f'<div id="lower-mark" class="wipe">Coach&rsquo;s Eye</div>'
                f'<div id="lower-sub" class="wipe">Spatial squat comparison &middot; SPECS</div>'
                f'<div id="lower-note" class="wipe">Lens Studio preview recording</div></div>')
    tl.append(f'tl.fromTo("#lower-scrim", {{opacity: 0}}, {{opacity: 1, duration: 0.4, ease: "power2.out"}}, {L["start"]});')
    for el, at in (("#lower-mark", L["mark_at"]), ("#lower-sub", L["sub_at"]), ("#lower-note", L["note_at"])):
        tl.append(f'tl.fromTo("{el}", {{clipPath: "inset(0% 100% 0% 0%)"}}, '
                  f'{{clipPath: "inset(0% 0% 0% 0%)", duration: 0.55, ease: "power3.out"}}, {at});')
    tl.append(f'tl.to("#lower > *", {{opacity: 0, duration: 0.35, ease: "power2.in"}}, {L["end"] - 0.4});')

    # section labels
    for k, (text, s, end) in enumerate(SECTIONS):
        sid = f"sec{k}"
        body.append(f'<div id="{sid}" class="clip section" data-start="{s}" data-duration="{round(end - s, 3)}" '
                    f'data-track-index="4"><span class="rule"></span><span class="label">{e(text)}</span></div>')
        tl.append(f'tl.fromTo("#{sid} .rule", {{scaleX: 0, transformOrigin: "0% 50%"}}, '
                  f'{{scaleX: 1, duration: 0.4, ease: "power3.out"}}, {s});')
        tl.append(f'tl.fromTo("#{sid} .label", {{clipPath: "inset(0% 100% 0% 0%)"}}, '
                  f'{{clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "power3.out"}}, {s + 0.12});')
        tl.append(f'tl.to("#{sid}", {{opacity: 0, duration: 0.25, ease: "power2.in"}}, {end - 0.27});')

    # kinetic lines
    for lid, text, cls, s, end, top in LINES:
        body.append(f'<div id="{lid}" class="clip line {cls}" data-start="{s}" data-duration="{round(end - s, 3)}" '
                    f'data-track-index="5" style="top:{top}px"><span class="ink">{e(text)}</span></div>')
        if s > 0:
            tl.append(f'tl.fromTo("#{lid} .ink", {{clipPath: "inset(-10% 100% -10% 0%)"}}, '
                      f'{{clipPath: "inset(-10% 0% -10% 0%)", duration: 0.55, ease: "power3.out"}}, {s});')
        if end < DURATION:
            tl.append(f'tl.to("#{lid} .ink", {{opacity: 0, duration: 0.25, ease: "power2.in"}}, {round(end - 0.27, 3)});')
        for t in DIM.get(lid, []):
            tl.append(f'tl.to("#{lid} .ink", {{opacity: 0.34, duration: 0.3, ease: "power2.out"}}, {t});')

    # phase list
    s, end = PHASE_WIN
    rows = "".join(f'<div class="ph" id="ph{i}"><span class="bar"></span><span class="nm">{e(n)}</span></div>'
                   for i, n in enumerate(PHASES))
    body.append(f'<div id="phases" class="clip" data-start="{s}" data-duration="{round(end - s, 3)}" '
                f'data-track-index="6">{rows}</div>')
    for i in range(5):
        tl.append(f'tl.fromTo("#ph{i}", {{opacity: 0}}, {{opacity: 0.34, duration: 0.35, ease: "power2.out"}}, {s + 0.2 + i * 0.08});')
        tl.append(f'tl.set("#ph{i} .bar", {{scaleY: 0, transformOrigin: "50% 50%"}}, {s});')
    active = None
    for t, idx in PHASE_STATES:
        for i in range(5):
            on = idx == "all" or idx == i
            was = active == "all" or active == i
            if on and not was:
                tl.append(f'tl.to("#ph{i}", {{opacity: 1, duration: 0.2, ease: "power2.out"}}, {t});')
                tl.append(f'tl.to("#ph{i} .bar", {{scaleY: 1, duration: 0.25, ease: "power3.out"}}, {t});')
            elif was and not on:
                tl.append(f'tl.to("#ph{i}", {{opacity: 0.34, duration: 0.2, ease: "power2.out"}}, {t});')
                tl.append(f'tl.to("#ph{i} .bar", {{scaleY: 0, duration: 0.2, ease: "power2.in"}}, {t});')
        active = idx
    tl.append(f'tl.to("#phases", {{opacity: 0, duration: 0.25, ease: "power2.in"}}, {end - 0.27});')

    # captions
    groups = caption_groups()
    caps = []
    for k, g in enumerate(groups):
        caps.append(f'<div id="cap{k}" class="clip cap" data-start="{g["start"]}" '
                    f'data-duration="{round(g["end"] - g["start"], 3)}"><span>{e(g["text"])}</span></div>')
        tl.append(f'tl.fromTo("#cap{k} span", {{opacity: 0}}, {{opacity: 1, duration: 0.12, ease: "power2.out"}}, {g["start"]});')
        tl.append(f'tl.to("#cap{k} span", {{opacity: 0, duration: 0.1, ease: "power2.in"}}, {round(g["end"] - 0.1, 3)});')
    body.append('<div id="captions" data-track-kind="captions">' + "\n".join(caps) + '</div>')

    # audio: narration, clicks, whooshes
    aud = []
    for vid, s in VO:
        aud.append(f'<audio id="vo-{vid}" src="assets/vo/{vid}.wav" data-start="{s}" '
                   f'data-duration="{round(vo_duration(vid), 3)}" data-track-index="10" data-volume="1"></audio>')
    for k, t in enumerate(PRESSES):
        aud.append(f'<audio id="sfx-click-{k:02d}" src="assets/sfx/click.wav" data-start="{round(t + 1 / 30 - 0.051, 3)}" '
                   f'data-duration="0.37" data-track-index="11" data-volume="0.42"></audio>')
    aud.append('<audio id="sfx-whoosh-push" src="assets/sfx/whoosh.wav" data-start="14.95" data-duration="0.57" '
               'data-track-index="12" data-volume="0.55"></audio>')
    aud.append(f'<audio id="sfx-whoosh-end" src="assets/sfx/whoosh-long.wav" data-start="{R(149.05)}" data-duration="5.54" '
               'data-track-index="12" data-volume="0.45"></audio>')
    body.extend(aud)

    page = TEMPLATE.replace("{{DURATION}}", str(DURATION)).replace("{{BODY}}", "\n".join(body)) \
                   .replace("{{TIMELINE}}", "\n      ".join(tl))
    page = page.replace("{{BOX_LEFT}}", str(BOX["left"])).replace("{{BOX_TOP}}", str(BOX["top"])) \
               .replace("{{BOX_W}}", str(BOX["w"])).replace("{{BOX_H}}", str(BOX["h"])) \
               .replace("{{VID_TOP}}", str(VID_TOP))
    open(os.path.join(ROOT, "index.html"), "w").write(page)

    # SRT sidecar
    srt = []
    for k, g in enumerate(groups, 1):
        srt.append(f"{k}\n{srt_time(g['start'])} --> {srt_time(g['end'])}\n{g['text']}\n")
    srt.append(f"{len(groups) + 1}\n{srt_time(R(151.75))} --> {srt_time(R(155.7))}\nCoach's Eye. See the difference. Understand what to observe.\n")
    os.makedirs(os.path.join(ROOT, "..", "final"), exist_ok=True)
    open(os.path.join(ROOT, "..", "final", "captions.srt"), "w").write("\n".join(srt))
    print(f"index.html: {len(CLIPS)} footage clips, {len(groups)} caption groups, {len(VO)} narration clips, "
          f"{len(PRESSES)} clicks")


TEMPLATE = r"""<!doctype html>
<html lang="en" data-resolution="landscape">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <title>Coach's Eye — Learn AR with SPECS 2026 demo</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
    <style>
      /* Generated by tools/build.py — edit the timing table there, then rebuild. */
      :root {
        --ground: #121416;      /* deep neutral charcoal, darker than the preview's own grey */
        --panel: #1b1e21;
        --ink: #f2f3f1;
        --ink-2: #a3aaae;
        --ink-3: #6f777b;
        --accent: #5bb6bd;      /* lifted from the Lens's stage-ring teal #408890 */
        --font: "Inter", sans-serif;
      }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1920px; height: 1080px; overflow: hidden; background: var(--ground); }
      #root { position: relative; width: 100%; height: 100%; overflow: hidden; background: var(--ground);
              font-family: var(--font); color: var(--ink); }

      #stage { position: absolute; left: {{BOX_LEFT}}px; top: {{BOX_TOP}}px; width: {{BOX_W}}px; height: {{BOX_H}}px;
               overflow: hidden; border-radius: 18px; background: #3a3b3c;
               box-shadow: 0 28px 70px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.07); }
      #cam { position: absolute; left: 0; top: 0; width: {{BOX_W}}px; height: {{BOX_H}}px; }
      .vid { position: absolute; left: 0; top: {{VID_TOP}}px; width: 1104px; height: 1266px; object-fit: fill; }

      #wide-wrap { position: absolute; left: 0; top: 0; width: 2880px; height: 1808px; z-index: 20; }
      #v-wide { position: absolute; left: 0; top: 0; width: 2880px; height: 1808px; }

      #lower { position: absolute; inset: 0; z-index: 30; }
      #lower-scrim { position: absolute; left: 150px; top: 640px; width: 640px; height: 360px; border-radius: 18px;
                     background: rgba(18, 20, 22, 0.9); box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5); }
      #lower-mark { position: absolute; left: 192px; top: 672px; font-size: 76px; font-weight: 900; letter-spacing: -0.025em; white-space: nowrap; }
      #lower-sub { position: absolute; left: 194px; top: 768px; font-size: 32px; font-weight: 700; color: var(--accent); white-space: nowrap; }
      #lower-note { position: absolute; left: 194px; top: 816px; font-size: 28px; font-weight: 400; color: var(--ink-2); white-space: nowrap; }

      .section { position: absolute; left: 192px; top: 150px; width: 488px; height: 40px; display: flex; align-items: center; gap: 16px; z-index: 40; }
      .section .rule { display: block; width: 44px; height: 4px; border-radius: 2px; background: var(--accent); }
      .section .label { font-size: 28px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); white-space: nowrap; }

      .line { position: absolute; left: 192px; width: 500px; z-index: 40; }
      .line .ink { display: block; }
      .stack .ink { font-size: 54px; font-weight: 900; letter-spacing: -0.025em; line-height: 1.08; }
      .wordmark .ink { font-size: 76px; font-weight: 900; letter-spacing: -0.03em; line-height: 1.05; }
      .sub .ink { font-size: 32px; font-weight: 700; color: var(--accent); line-height: 1.25; }
      .statement .ink { font-size: 52px; font-weight: 900; letter-spacing: -0.02em; line-height: 1.08; }
      .aside .ink { font-size: 34px; font-weight: 700; color: var(--ink-2); }
      .bigword .ink { font-size: 116px; font-weight: 900; letter-spacing: -0.035em; line-height: 1; }
      .bigword-s .ink { font-size: 84px; font-weight: 900; letter-spacing: -0.03em; line-height: 1; }
      .tag .ink { font-size: 40px; font-weight: 700; color: var(--accent); }
      .question .ink { font-size: 46px; font-weight: 900; letter-spacing: -0.02em; line-height: 1.12; }
      .endmark, .tagline, .event, .url, .fine { width: 700px; }
      .endmark .ink { font-size: 104px; font-weight: 900; letter-spacing: -0.035em; line-height: 1; }
      .tagline .ink { font-size: 42px; font-weight: 700; letter-spacing: -0.015em; }
      .event .ink { font-size: 34px; font-weight: 700; color: var(--accent); }
      .url .ink { font-size: 28px; font-weight: 400; color: var(--ink); }
      .fine .ink { font-size: 28px; font-weight: 400; color: var(--ink-2); line-height: 1.32; }

      #phases { position: absolute; left: 192px; top: 236px; width: 488px; z-index: 40; }
      .ph { position: relative; display: flex; align-items: center; height: 64px; }
      .ph .bar { display: block; width: 6px; height: 40px; border-radius: 3px; background: var(--accent); margin-right: 20px; }
      .ph .nm { font-size: 38px; font-weight: 700; letter-spacing: -0.01em; white-space: nowrap; }

      #captions { position: absolute; inset: 0; z-index: 50; pointer-events: none; }
      .cap { position: absolute; left: 192px; bottom: 112px; width: 488px; }
      .cap span { display: block; font-size: 34px; font-weight: 400; line-height: 1.32; color: var(--ink); }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="{{DURATION}}" data-width="1920" data-height="1080">
{{BODY}}
    </div>
    <script>
      const tl = gsap.timeline({ paused: true });
      {{TIMELINE}}
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
"""

if __name__ == "__main__":
    build()
