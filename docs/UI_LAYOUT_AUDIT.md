# UI layout audit: button size and spacing (Coach's Eye)

**Status (1 Nov 2026): implemented in build `83e71bc` on `feature/coach-eye`.**
- **Authorization:** the learner's master build brief asked for "the best practical button layout", balancing targetability, stage visibility, text readability, composition and reliability, verified against the actual colliders and with several options investigated.
- **Evidence:** geometry derived from the saved scene and layout code (A), checked against the final preview captures in `docs/screenshots/` (B). LEAF a–h passed on this build.
- **Not done:** no physical SPECS test; real hand-ray pinch comfort and accuracy are untested (C).
- **History:** sections 3 and 4 keep the pre-build audit (build `2201d21`) and the original proposal for comparison. The pre-build version of this file and its v1 script are at commit `65912d8`.

Everything in section 5 can be reproduced from the repository with the script in the appendix (run from the repository root).

## 1. Snap's guidance: published wording and our interpretation

**Source:** Snap Spectacles documentation, [Positioning & Sizing Content](https://developers.snap.com/spectacles/best-practices/design-for-spectacles/positioning-sizing-content), accessed 1 Nov 2026.

**Published wording (verbatim):**
- "Targetable elements should be at least 2 degrees in angular size."
- "Targetable elements should be spaced at least 1 degree apart in angular size."
- "The recommended size refers to the interactive collider on an element."
- "Visual meshes can be smaller, provided the collider meets the minimum standards for comfortable interactions."
- "Spacing may also need to accommodate the size of any targeting feedback."
- Under the heading "Z Axis: Near-Field or Far-Field": "Far-Field (60cm - 160cm): Uses indirect interactions".
- Under "Button Sizing & Spacing", a table indexed by "Position Z" (no caption), introduced with: "Snap OS uses angular sizes as a distance-independent standard, which can be converted to real-world centimeters at different Z-positions."

  | Size | Z = 35 cm | Z = 55 cm | Z = 110 cm | Z = 160 cm |
  |---|---|---|---|---|
  | Minimum | 1.5 cm | 2.0 cm | 4.0 cm | 5.5 cm |
  | Best | 2.0 cm | 3.0 cm | 6.0 cm | 8.5 cm |
  | Large | 2.5 cm | 4.0 cm | 8.0 cm | 11.5 cm |

**Not stated by Snap:**
- whether 2° applies to width, height or the smaller dimension;
- whether the 1° spacing is measured edge to edge or centre to centre.

**Our interpretation (a design choice, not Snap's requirement):**
- **2° in both dimensions** of each collider, as a conservative target: meeting 2° on the narrower axis meets it on every axis.
- **1° edge to edge** between neighbouring colliders, the stricter reading.
- The 60–160 cm far-field range is stated along **Z**. We report Z depth and straight-line distance separately.

## 2. Method

**Eye:** the camera origin (0, 0, 0), with identity rotation (`Lens/Assets/Scene.scene`, `Camera Object`, line 26). In the SPECS preview the device simulation sets the field of view; the saved camera `Fov: 63.54` (line 50) is not what the preview shows.

**Saved inputs (build `83e71bc`):** the `SquatTutorUI` script inputs at `Scene.scene` lines 3595–3600: `sideOffset 29`, `panelHeight −22` (left panels), `rightPanelHeight −31` (right panels), `panelDistance 150`, `cardWidth 26.4`, `panelWidth 25.6`. `SquatTutor` and its child `SquatTutorUI` are at the origin with identity transforms. (Pre-build values: `sideOffset 33`, `panelHeight −26` on both sides, `panelDistance 155`, `cardWidth 21`, `panelWidth 20`.)

**Layout code (`Lens/Assets/Scripts/SquatTutorUI.ts`):**

| Lines | What it does |
|---|---|
| 51–54 | `BUTTON_H 5.8`, `BUTTON_GAP 2.9`, `ROW_SPACER 1.6` |
| 234–242 (`slot`) | Each panel slot sits at (side·sideOffset, height, −panelDistance), where height is `panelHeight` on the left and `rightPanelHeight` on the right, turned about Y by atan2(sideOffset, panelDistance)·(−side) to face the start position |
| 244–263 (`panel`) | Column FlexLayout with padding and a single `rowGap` |
| 265–345 | The four panels: intro card, Start panel, cue card, control panel (no "PLAYBACK" caption; a spacer between the first two rows) |
| 383–398 (`row`) | Row FlexLayout, SpaceBetween, `columnGap = BUTTON_GAP`, centred vertically |
| 400–406 (`spacer`) | Empty fixed-height FlexItem |
| 408–420 (`addButton`) | `btn.size = (width, height, 1)` |
| 44, 46, `row` | Content offset 0.6 cm plus a 0.02 cm lift on rows |

**UIKit behaviour** (`Lens/Packages/SpectaclesUIKit.lspkg`, a zip; paths inside it start with `Package/Assets/Scripts/`; byte-identical to the extracted copy in the git-ignored `Lens/Cache`):

| File and lines | Behaviour |
|---|---|
| `Components/Layout2D/Flex/FlexLayout.ts` 207, 219, 830–861 | Content is centred on the layout's origin by default |
| `Components/Layout2D/Flex/FlexItem.ts` 65, 70 | `flexGrow` 0, `flexShrink` 1 |
| `Components/Layout2D/UIKitItemHandlers.ts` 179–224 | The layout writes the allocated width and height back onto each button, so declared sizes hold only when a row's widths plus gaps equal its inner width exactly. The script asserts this for every row. |
| `Components/Element.ts` 87, 636–652, 717–723 | `colliderFitElement = true`; the collider box equals `size` plus the visual's position offset, which is zero at rest |
| `Components/VisualElement.ts` 351–359 | The offset follows the visual's state |
| `Themes/SnapOS-2.0/Styles/ButtonParameters.ts` 10–109 (PrimaryNeutral, Primary) | Hovered moves the visual +1 cm in z and pressed +0.5 cm, at scale 1. **Width and height never change**; only collider depth does. Dragging can enlarge the collider, but that doesn't apply to pinching buttons. |

**Formulas:**
- Panel point: P = O + R_y(ψ)·(lx, ly, z), where O = (side·so, cy, −D) and ψ = −side·atan2(so, D).
- Column item centre: y_i = H/2 − pad − Σ_{j<i}(h_j + gap) − h_i/2, with H = 2·pad + Σh + gap·(n − 1).
- Angular size or gap between points P and Q: θ = arccos(P·Q / (|P||Q|)). Widths are the minimum over the top, middle and bottom lines of the collider; heights the minimum over its left, centre and right lines.
- Straight-line distance = |P|; Z depth = −P.z.

## 3. Pre-build layout (historical, build `2201d21`; derived from code and scene)

| Control | Collider (w × h cm) | Straight-line / Z (cm) | Angular w × h |
|---|---|---|---|
| Previous, Play/Pause, Next | 5.40 × 3.40 | 159.3–159.5 / 153.1–155.7 | 1.94° × 1.21° |
| Slow, Replay | 8.45 × 3.40 | 160.0 / 153.4–155.3 | 3.02° × 1.20° |
| Front, 35°, Side | 5.40 × 3.40 | 161.2–161.3 / 153.1–155.7 | 1.91° × 1.18° |
| Knees, Heels, Chest | 5.47 × 3.40 | 161.2–161.3 / 153.1–155.7 | 1.94° × 1.18° |
| Start | 16.80 × 5.00 | 160.2 / 154.4 | 5.98° × 1.76° |

- **Spacing (edge to edge):** every horizontal gap 0.70 cm = 0.249–0.252°; vertical Previous → Slow 0.90 cm = 0.319°, Slow → Front 3.40 cm = 1.192°.
- **Summary:** under our conservative interpretation these controls did **not** meet 2° in height (about 1.2°) or 1° spacing (about 0.25°).
- **Text fit:** the approved intro sentence wrapped to five lines on the 21 cm card and nearly touched the disclaimer (capture: `docs/evidence/ui-fit/intro-old-21cm-card.jpg`).

## 4. Options considered

| # | Option | Outcome |
|---|---|---|
| 1 | Keep the pre-build layout | Rejected: about 1.2° tall with 0.25° gaps; intro sentence overflowed |
| 2 | The audit proposal: 5.8 cm buttons, 2.9 cm gaps, card 26.4 cm, panel 25.6 cm, distance 150, side offset 29, **left −25 cm, right −32 cm, "PLAYBACK" caption kept** (control panel 28.5 cm tall) | Implemented first and captured. Targets and text fit were fine, but the control panel (el −16.79° to −6.60°) and card (bottom −14.65°) sat over the stage plate and ring sides, and the bottom row was about 15° below eye level |
| 3 | **Refinement (chosen):** as option 2, but **"PLAYBACK" caption removed** (the five playback buttons label themselves; "VIEW ANGLE" kept because Front/35°/Side need context), **left −22 cm, right −31 cm** | Implemented in `83e71bc`. Control panel 26.0 cm tall, el −16.01° to −6.70°: its top stays below the side-view red hands; the card's bottom (−13.60°) is just above the ring sides |
| 4 | Smaller targets, for example 5.2 cm (exactly 2° at 150 cm) | Not chosen: no margin for off-axis foreshortening, which already brings the bottom row to 2.04° with 5.8 cm |

Other trade-offs considered for option 3:
- **Raising the right panel further** (−30 cm, top −6.33°) would leave the red hands about 0.4° clearance; −31 keeps about 0.77°.
- **Hand clearance vs stage overlap:** the right panel can't go higher without meeting the side-view hands, so it still hides about 0.4° of the turntable ring's right edge. The figures are never covered.
- **Text size:** unchanged. Text roles still scale from a 155 cm reference, so at 150 cm text is about 3% larger in angle than before.

## 5. Implemented layout (build `83e71bc`)

**Parameters:** `panelDistance` 150; `sideOffset` 29; `panelHeight` −22 (intro card, cue card); `rightPanelHeight` −31 (Start panel, control panel); `cardWidth` 26.4; `panelWidth` 25.6; buttons 5.8 cm tall; `columnGap` 2.9 cm; a 1.6 cm spacer between the first two control rows (0.7 + 1.6 + 0.7 = 3.0 cm gap); Start 22.4 × 5.8 cm.

**A. Derived from code and saved scene (script, Part A):**

| Control | Collider (w × h cm) | Straight-line / Z (cm) | Angular w × h |
|---|---|---|---|
| Previous, Play/Pause, Next | 5.80 × 5.80 | 153.8–154.0 / 147.7–151.0 | 2.15° × 2.13–2.14° |
| Slow, Replay | 10.15 × 5.80 | 155.4 / 148.2–150.6 | 3.72° × 2.09° |
| Front, 35°, Side | 5.80 × 5.80 | 157.3–157.5 / 147.7–151.0 | 2.10° × 2.04° |
| Knees, Heels, Chest | 5.80 × 5.80 | 154.8–155.1 / 147.7–151.0 | 2.13–2.14° × 2.10–2.11° |
| Start | 22.40 × 5.80 | 155.6 / 149.4 | 8.20° × 2.08° |

- **Spacing (edge to edge):** horizontal 2.90 cm = 1.055–1.080° (centre to centre 3.17–4.81°); vertical 3.00 cm = 1.095° (Previous → Slow) and 3.20 cm = 1.142° (Slow → Front).
- **Far-field range:** Z depth 147.7–151.0 cm, inside Snap's 60–160 cm; straight-line 153.8–157.5 cm, also under 160.
- **Fit:** every row's widths plus gaps equal its inner width exactly (asserted by the script), so UIKit's flex shrink leaves the sizes alone.
- **Result:** every collider is at least 2.04° in both dimensions and every gap at least 1.055°, meeting our conservative 2°/1° reading. Margins are small on the bottom row (2.04°).
- **Panel extents (corners, panel plane):**

  | Panel | Size | Azimuth | Elevation |
  |---|---|---|---|
  | Control panel | 25.6 × 26.0 cm | +6.15° to +15.73° | −16.01° to −6.70° |
  | Cue card | 26.4 × 30.2 cm | −15.88° to −6.00° | −13.60° to −2.58° |
  | Start panel | 25.6 × 12.2 cm | +6.15° to +15.73° | −13.60° to −9.23° |
  | Intro card | 26.4 × 21.2 cm | −15.88° to −6.00° | −12.00° to −4.25° |
- **Stage features (side points):** the card's bottom edge is 0.04–0.17° above the side points of the turntable ring (radius 19.5 cm), stand top (22 cm) and completion ring (23.6 cm, unpulsed). The control panel hides those right-hand side points over 0.39°, 1.22° and 1.75° of azimuth.

**B. Measured in the final preview captures** (`docs/screenshots/`, 1399 × 1590, script Part B). The pinhole model fitted on 31 Oct (fx 2402, fy 2395, centre 699.9, 797.2) is reused, since the preview camera and window size are unchanged. It is re-checked here: predicted panel edges in `10-view-side.jpg` match measured edges within 0.8–1.7 px for three edges; the control panel's right edge differs by 8 px (about 0.2°). The cause was not investigated, so treat right-panel positions as about ±0.2°.
- **Red Chest pattern hands** (`15`): lowest point **0.77°** above the control panel's top edge. The white figure clears it by 2.04–2.21° (`10`, `14`, `15`).
- **Hip marker:** clears the card's inner edge by 0.42° in the side view (`10`) and 1.15° in the 35° view (`04`).
- **Text fit (visual check of captures):** intro label one line; intro sentence four lines with space above the disclaimer (`01`); comparison cards (label, title, two lines, return hint, note) fit (`13`–`15`); completion text two lines (`11`).
- **Stage:** in every capture the panels cover parts of the stand's plate rim and, on the right, the edge of the ring; the completion ring's pulse passes behind both panels' lower inner corners (`06`, `11`). By visual inspection, no part of the white figure, red figure or body cues is hidden by a panel in `01`–`15`.

**C. Not established:**
- real SPECS optics, eye position and field of view;
- SIK hand-ray targeting tolerance and pinch comfort on the device;
- whether Snap intends our per-axis and edge-to-edge reading;
- views not captured (for example Chest at 35°).

## 6. Validation done and remaining

Done (1 Nov 2026, Lens Studio 5.24.1 preview, same session):
1. Implemented and recompiled; no compile errors; no Lens runtime errors in the refresh log.
2. Captured all 15 screens from the start position (`docs/screenshots/README.md`).
3. Re-measured edges, clearances and text fit (section 5B).
4. Ran all 8 LEAF scenarios one at a time: all passed.

Remaining (external gates, not done): fresh-open check of the branch; a SPECS device test of pinch accuracy and comfort on every button row (`docs/DEVICE_VALIDATION.md`); the 3–5 person user test.

## Appendix: reproduction script (v2)
Save as `ui_layout_audit.py` and run `python3 ui_layout_audit.py` from the repository root. Part B needs `numpy` and `Pillow`. The v1 script (pre-build calibration against the 31 Oct screenshots) is in this file at commit `65912d8`; those screenshots are in `docs/screenshots/archive-2026-10-31/`.

```python
"""Coach's Eye UI layout audit (read-only). Run from the repository root:  python3 ui_layout_audit.py
Part A (geometry) needs only the standard library. Part B (screenshots) needs numpy and Pillow.
Sources: Lens/Assets/Scene.scene (saved inputs), Lens/Assets/Scripts/SquatTutorUI.ts (layout code),
Lens/Packages/SpectaclesUIKit.lspkg (zip; Package/Assets/Scripts/...) for UIKit behaviour."""
import math, re

# ---------- Part A: geometry from saved scene values + layout code ----------
scene = open("Lens/Assets/Scene.scene").read()
def saved(name):  # SquatTutorUI script inputs in Scene.scene (Lens Studio may omit the !<float> tag)
    return float(re.search(rf"\n\s+{name}: (?:!<float> )?(-?[0-9.]+)", scene).group(1))
# Pre-build layout (commit 65912d8, before this build): kept for comparison only.
OLD = dict(sideOffset=33.0, panelDistance=155.0, cyL=-26.0, cyR=-26.0, cardWidth=21.0, panelWidth=20.0,
           rowH=3.6, btnH=3.4, colGap=0.7, spacer=0.0, startRowH=5.6, startH=5.0, playbackLabel=True)
# Implemented layout: saved scene inputs + SquatTutorUI.ts constants (BUTTON_H 5.8, BUTTON_GAP 2.9, ROW_SPACER 1.6;
# no PLAYBACK caption; separate left/right panel heights).
CUR = dict(sideOffset=saved("sideOffset"), panelDistance=saved("panelDistance"),
           cyL=saved("panelHeight"), cyR=saved("rightPanelHeight"),
           cardWidth=saved("cardWidth"), panelWidth=saved("panelWidth"),
           rowH=5.8, btnH=5.8, colGap=2.9, spacer=1.6, startRowH=5.8, startH=5.8, playbackLabel=False)
Z_OFF = 0.6 + 0.02   # CONTENT_Z + LAYOUT_Z_LIFT on rows (SquatTutorUI.ts lines 44-46, row())

def rot_y(p, a): c, s = math.cos(a), math.sin(a); x, y, z = p; return (c*x + s*z, y, -s*x + c*z)
def world(P, side, cy, lx, ly, lz):   # slot(): position (side*so, cy, -D), yaw = atan2(so, D) * -side (SquatTutorUI.ts 234-242)
    so, D = P["sideOffset"], P["panelDistance"]
    q = rot_y((lx, ly, lz), math.atan2(so, D) * -side); return (side*so + q[0], cy + q[1], -D + q[2])
def ang(p, q):   # angle between two points as seen from the camera origin (0,0,0)
    d = sum(a*b for a, b in zip(p, q)) / (math.dist(p, (0, 0, 0)) * math.dist(q, (0, 0, 0)))
    return math.degrees(math.acos(max(-1.0, min(1.0, d))))
def azel(p): return math.degrees(math.atan2(p[0], -p[2])), math.degrees(math.atan2(p[1], math.hypot(p[0], p[2])))
def column(pad, gap, items):   # FlexLayout column, content centred on origin (FlexLayout.ts 207/219, 830-861)
    H = 2*pad + sum(h for _, h in items) + gap*(len(items) - 1); y = H/2 - pad; out = {}
    for n, h in items: out[n] = y - h/2; y -= h + gap
    return H, out
def row_x(inner, widths, gap):   # flexShrink=1/flexGrow=0 (FlexItem.ts 65/70): sizes hold only if the row fits exactly
    assert abs(sum(widths) + gap*(len(widths) - 1) - inner) < 1e-6
    x = -inner/2; out = []
    for w in widths: out.append(x + w/2); x += w + gap
    return out
def layout(P):
    ctrl, rects = [], []
    inner = P["panelWidth"] - 2.4                                  # control panel padding 1.2 (buildControlPanel)
    items = ([("PlaybackLabel", 1.8)] if P["playbackLabel"] else []) + [("r1", P["rowH"])] + ([("spacer", P["spacer"])] if P["spacer"] else []) \
            + [("r2", P["rowH"]), ("ViewLabel", 1.8), ("r3", P["rowH"])]
    H, yc = column(1.2, 0.7, items); rects.append(("ControlPanel", 1, P["cyR"], P["panelWidth"], H))
    G, B = P["colGap"], P["btnH"]; third = (inner - 2*G)/3; half = (inner - G)/2
    for r, names, w in (("r1", ["Previous", "PlayPause", "Next"], third), ("r2", ["Slow", "Replay"], half),
                        ("r3", ["Front", "Angled", "Side"], third)):
        for n, x in zip(names, row_x(inner, [w]*len(names), G)): ctrl.append((n, 1, P["cyR"], x, yc[r], w, B, r))
    cinner = P["cardWidth"] - 3.2                                   # cue card padding 1.6, rowGap 0.6 (buildCueCard)
    CH, cy = column(1.6, 0.6, [("PhaseLabel", 2.0), ("PhaseTitle", 3.0), ("PhaseCue", 5.8), ("ProgressDots", 1.6),
                               ("MistakesLabel", 1.8), ("faults", P["rowH"]), ("Disclaimer", 3.4)])
    rects.append(("CueCard", -1, P["cyL"], P["cardWidth"], CH)); ft = (cinner - 2*G)/3
    for n, x in zip(["Fault_knees", "Fault_heels", "Fault_chest"], row_x(cinner, [ft]*3, G)):
        ctrl.append((n, -1, P["cyL"], x, cy["faults"], ft, B, "faults"))
    SH, sy = column(1.6, 0.8, [("StartHint", 2.4), ("row", P["startRowH"])])   # buildStartPanel
    rects.append(("StartPanel", 1, P["cyR"], P["panelWidth"], SH))
    ctrl.append(("Start", 1, P["cyR"], 0.0, sy["row"], P["panelWidth"] - 3.2, P["startH"], "start"))
    IH, _ = column(1.6, 0.8, [("IntroLabel", 2.0), ("IntroTitle", 3.4), ("IntroBody", 6.6), ("IntroDisclaimer", 3.6)])
    rects.append(("IntroCard", -1, P["cyL"], P["cardWidth"], IH))
    return ctrl, rects
def report(P, label):
    print(f"\n== {label}"); ctrl, rects = layout(P); W = lambda s, c, x, y: world(P, s, c, x, y, Z_OFF)
    print(f"{'control':12s} {'w x h cm':>12s} {'centre x,y,z (cm)':>24s} {'eucl':>6s} {'Z':>6s} {'ang w':>6s} {'ang h':>6s}")
    for n, s, c, x, y, w, h, _ in ctrl:
        p = W(s, c, x, y)
        aw = min(ang(W(s, c, x - w/2, yy), W(s, c, x + w/2, yy)) for yy in (y - h/2, y, y + h/2))
        ah = min(ang(W(s, c, xx, y - h/2), W(s, c, xx, y + h/2)) for xx in (x - w/2, x, x + w/2))
        print(f"{n:12s} {w:5.2f} x {h:4.2f} ({p[0]:6.2f},{p[1]:6.2f},{p[2]:7.2f}) {math.dist(p,(0,0,0)):6.1f} {-p[2]:6.1f} {aw:6.2f} {ah:6.2f}")
    rows = {}
    for t in ctrl: rows.setdefault((t[1], t[7]), []).append(t)
    for (s, r), ts in rows.items():
        ts.sort(key=lambda t: t[3])
        for a, b in zip(ts, ts[1:]):
            g = (b[3] - b[5]/2) - (a[3] + a[5]/2)
            print(f"  gap {a[0]}|{b[0]}: {g:.2f} cm = {ang(W(s,a[2],a[3]+a[5]/2,a[4]), W(s,b[2],b[3]-b[5]/2,b[4])):.3f} deg"
                  f" (centre-centre {ang(W(s,a[2],a[3],a[4]), W(s,b[2],b[3],b[4])):.2f} deg)")
    t = {x[0]: x for x in ctrl}
    for a, b in (("Previous", "Slow"), ("Slow", "Front")):
        A, Bq = t[a], t[b]; xs = (A[3] + Bq[3]) / 2; g = (A[4] - A[6]/2) - (Bq[4] + Bq[6]/2)
        print(f"  vertical gap {a}->{b}: {g:.2f} cm = {ang(W(1,A[2],xs,A[4]-A[6]/2), W(1,Bq[2],xs,Bq[4]+Bq[6]/2)):.3f} deg")
    for n, s, c, w, h in rects:
        a = [azel(world(P, s, c, lx, ly, 0.0)) for lx in (-w/2, w/2) for ly in (-h/2, h/2)]
        print(f"  {n:12s} {w:5.1f} x {h:5.1f} cm  az {min(x for x,_ in a):+6.2f}..{max(x for x,_ in a):+6.2f}"
              f"  el {min(y for _,y in a):+6.2f}..{max(y for _,y in a):+6.2f}")
    return ctrl, rects

# Stage features (Scene.scene): Stage (0,-42,-170) line 1819; StandTop scale 44 (radius 22) line 1228;
# TurntableRing majorRadius 19.5 (line 2933) at y +0.2; Cue_CompletionRing majorRadius 23.6 (line 998) at y +0.35.
RINGS = [("turntable ring", 19.5, 0.2), ("stand top edge", 22.0, 0.0), ("completion ring (unpulsed)", 23.6, 0.35)]
def ring_sides():
    return [(n, math.degrees(math.atan2(r, 170)), math.degrees(math.atan2(-42 + dy, math.hypot(r, 170)))) for n, r, dy in RINGS]

if __name__ == "__main__":
    print("saved inputs:", {k: CUR[k] for k in ("sideOffset", "panelDistance", "cyL", "cyR", "cardWidth", "panelWidth")})
    report(OLD, "PRE-BUILD (commit 65912d8; for comparison)")
    _, rects = report(CUR, "IMPLEMENTED (saved scene + code)")
    print("\nring side points (az, el) vs implemented inner edges:")
    inner = {n: azel(world(CUR, s, c, (w/2 if s < 0 else -w/2), -h/2, 0.0))[0] for n, s, c, w, h in rects}
    bottom = {n: min(azel(world(CUR, s, c, lx, -h/2, 0.0))[1] for lx in (-w/2, w/2)) for n, s, c, w, h in rects}
    for n, a, e in ring_sides():
        for pn, ov in (("card", abs(-a - inner["CueCard"])), ("control panel", a - inner["ControlPanel"])):
            key = "CueCard" if pn == "card" else "ControlPanel"
            if bottom[key] < e: print(f"  {n:28s} az +/-{a:.2f}, el {e:+.2f} -> hidden by the {pn} over {ov:.2f} deg of azimuth")
            else: print(f"  {n:28s} az +/-{a:.2f}, el {e:+.2f} -> clear of the {pn} (its bottom is {bottom[key] - e:.2f} deg above)")

    # ---------- Part B: check against the final screenshots (numpy + Pillow) ----------
    try:
        import numpy as np
        from PIL import Image
    except ImportError:
        raise SystemExit("Part B skipped: install numpy and Pillow")
    # Preview pinhole model fitted on 31 Oct from the pre-build set (docs/screenshots/archive-2026-10-31, script v1):
    # same preview camera and window size, so it is reused here and re-checked by the residuals below.
    fx, fy, cx, cy = 2402.0, 2395.0, 699.9, 797.2
    to_px = lambda a, e: (cx + fx*math.tan(math.radians(a)), cy - fy*math.tan(math.radians(e)))
    to_ang = lambda x, y: (math.degrees(math.atan((x - cx) / fx)), -math.degrees(math.atan((y - cy) / fy)))
    def img(n): return np.asarray(Image.open(f"docs/screenshots/{n}").convert("RGB")).astype(int)
    def step(p, off, sign):   # strongest 6-px brightness step (+ rising, - falling)
        return max(((sign*(p[i:i+6].mean() - p[i-6:i].mean()), i + off) for i in range(6, len(p) - 6)))[1] + 0.5
    r = {n: (s, c, w, h) for n, s, c, w, h in rects}
    def corner(n, lx, ly):   # lx, ly in -1..1 of the backplate
        s, c, w, h = r[n]; return to_px(*azel(world(CUR, s, c, lx*w/2, ly*h/2, 0.0)))
    g = img("10-view-side.jpg").mean(axis=2)
    # edges measured in empty padding bands of the final side-view shot
    ctl_y = int(corner("ControlPanel", 0, 1)[1] + 8); card_y = int(corner("CueCard", 0, 1)[1] + 8)
    meas = {"ControlPanel L": step(g[ctl_y:ctl_y+6, 900:1399].mean(0), 900, +1),
            "ControlPanel R": step(g[ctl_y:ctl_y+6, 900:1399].mean(0), 900, -1),
            "CueCard L": step(g[card_y:card_y+6, 0:520].mean(0), 0, +1),
            "CueCard R": step(g[card_y:card_y+6, 0:520].mean(0), 0, -1)}
    pred = {"ControlPanel L": corner("ControlPanel", -1, 0.8)[0], "ControlPanel R": corner("ControlPanel", 1, 0.8)[0],
            "CueCard L": corner("CueCard", -1, 0.8)[0], "CueCard R": corner("CueCard", 1, 0.8)[0]}
    print("\nbackplate edges in 10-view-side.jpg (px): " + ", ".join(
        f"{k} measured {meas[k]:.1f} / predicted {pred[k]:.1f}" for k in meas))
    pxdeg = fy * math.pi / 180
    (x1, y1), (x2, y2) = corner("ControlPanel", -1, 1), corner("ControlPanel", 1, 1)
    for shot in ("15-mistake-chest-side.jpg", "10-view-side.jpg", "14-mistake-heels-side.jpg"):
        im = img(shot); R, G, Bc = im[..., 0], im[..., 1], im[..., 2]; mx, mn = im.max(2), im.min(2)
        for lbl, m in (("red figure", (R - G > 50) & (R - Bc > 50) & (R > 150)), ("white figure", (mx > 150) & (mx - mn < 35))):
            m = m.copy(); m[:, :353] = False; m[:, 1080:] = False; m[int(min(y1, y2)) + 5:, :] = False
            yy, xx = np.nonzero(m); sel = (xx >= x1) & (xx <= x2)
            if sel.any():
                top = y1 + (xx[sel] - x1) * (y2 - y1) / (x2 - x1); d = ((top - yy[sel]) / pxdeg).min()
                print(f"{shot}: {lbl} lowest point over the control panel = {d:.2f} deg above its top edge")
    for shot in ("10-view-side.jpg", "04-phase3-bottom-position.jpg"):
        im = img(shot); R, G, Bc = im[..., 0], im[..., 1], im[..., 2]
        yel = (R > 200) & (G > 140) & (Bc < 120); yel[:, :400] = False; yel[:, 700:] = False; yel[:1050, :] = False; yel[1200:, :] = False
        yy, xx = np.nonzero(yel); i = np.argmin(xx); a, e = to_ang(xx[i], yy[i])
        s, c, w, h = r["CueCard"]
        edge = min((abs(azel(world(CUR, s, c, w/2, ly, 0.0))[1] - e), azel(world(CUR, s, c, w/2, ly, 0.0))[0])
                   for ly in np.linspace(-h/2, h/2, 301))[1]
        print(f"{shot}: hip-marker ring left-most az {a:+.2f} el {e:+.2f}; card inner edge az {edge:+.2f} -> clearance {a-edge:.2f} deg")
```

Output on build `83e71bc`:

```text
saved inputs: {'sideOffset': 29.0, 'panelDistance': 150.0, 'cyL': -22.0, 'cyR': -31.0, 'cardWidth': 26.4, 'panelWidth': 25.6}

== PRE-BUILD (commit 65912d8; for comparison)
control          w x h cm        centre x,y,z (cm)   eucl      Z  ang w  ang h
Previous      5.40 x 3.40 ( 26.90,-21.70,-155.66)  159.5  155.7   1.94   1.21
PlayPause     5.40 x 3.40 ( 32.87,-21.70,-154.39)  159.3  154.4   1.94   1.21
Next          5.40 x 3.40 ( 38.84,-21.70,-153.12)  159.5  153.1   1.94   1.21
Slow          8.45 x 3.40 ( 28.40,-26.00,-155.35)  160.0  155.3   3.02   1.20
Replay        8.45 x 3.40 ( 37.35,-26.00,-153.44)  160.0  153.4   3.02   1.20
Front         5.40 x 3.40 ( 26.90,-32.80,-155.66)  161.3  155.7   1.91   1.18
Angled        5.40 x 3.40 ( 32.87,-32.80,-154.39)  161.2  154.4   1.91   1.18
Side          5.40 x 3.40 ( 38.84,-32.80,-153.12)  161.3  153.1   1.91   1.18
Fault_knees   5.47 x 3.40 (-38.90,-32.60,-153.11)  161.3  153.1   1.94   1.18
Fault_heels   5.47 x 3.40 (-32.87,-32.60,-154.39)  161.2  154.4   1.94   1.18
Fault_chest   5.47 x 3.40 (-26.84,-32.60,-155.68)  161.3  155.7   1.94   1.18
Start        16.80 x 5.00 ( 32.87,-27.60,-154.39)  160.2  154.4   5.98   1.76
  gap Previous|PlayPause: 0.70 cm = 0.252 deg (centre-centre 2.19 deg)
  gap PlayPause|Next: 0.70 cm = 0.252 deg (centre-centre 2.19 deg)
  gap Slow|Replay: 0.70 cm = 0.251 deg (centre-centre 3.28 deg)
  gap Front|Angled: 0.70 cm = 0.249 deg (centre-centre 2.17 deg)
  gap Angled|Side: 0.70 cm = 0.249 deg (centre-centre 2.17 deg)
  gap Fault_knees|Fault_heels: 0.70 cm = 0.249 deg (centre-centre 2.19 deg)
  gap Fault_heels|Fault_chest: 0.70 cm = 0.249 deg (centre-centre 2.19 deg)
  vertical gap Previous->Slow: 0.90 cm = 0.319 deg
  vertical gap Slow->Front: 3.40 cm = 1.192 deg
  ControlPanel  20.0 x  19.6 cm  az  +8.41..+15.63  el -12.71.. -5.83
  CueCard       21.0 x  28.0 cm  az -15.81.. -8.23  el -14.14.. -4.32
  StartPanel    20.0 x  12.0 cm  az  +8.41..+15.63  el -11.39.. -7.18
  IntroCard     21.0 x  21.2 cm  az -15.81.. -8.23  el -12.98.. -5.54

== IMPLEMENTED (saved scene + code)
control          w x h cm        centre x,y,z (cm)   eucl      Z  ang w  ang h
Previous      5.80 x 5.80 ( 20.34,-22.10,-151.04)  154.0  151.0   2.15   2.13
PlayPause     5.80 x 5.80 ( 28.88,-22.10,-149.39)  153.8  149.4   2.15   2.14
Next          5.80 x 5.80 ( 37.42,-22.10,-147.74)  154.0  147.7   2.15   2.13
Slow         10.15 x 5.80 ( 22.48,-30.90,-150.63)  155.4  150.6   3.72   2.09
Replay       10.15 x 5.80 ( 35.29,-30.90,-148.15)  155.4  148.2   3.72   2.09
Front         5.80 x 5.80 ( 20.34,-39.90,-151.04)  157.5  151.0   2.10   2.04
Angled        5.80 x 5.80 ( 28.88,-39.90,-149.39)  157.3  149.4   2.10   2.04
Side          5.80 x 5.80 ( 37.42,-39.90,-147.74)  157.5  147.7   2.10   2.04
Fault_knees   5.80 x 5.80 (-37.42,-28.60,-147.74)  155.1  147.7   2.13   2.10
Fault_heels   5.80 x 5.80 (-28.88,-28.60,-149.39)  154.8  149.4   2.14   2.11
Fault_chest   5.80 x 5.80 (-20.34,-28.60,-151.04)  155.1  151.0   2.13   2.10
Start        22.40 x 5.80 ( 28.88,-32.60,-149.39)  155.6  149.4   8.20   2.08
  gap Previous|PlayPause: 2.90 cm = 1.080 deg (centre-centre 3.24 deg)
  gap PlayPause|Next: 2.90 cm = 1.080 deg (centre-centre 3.24 deg)
  gap Slow|Replay: 2.90 cm = 1.070 deg (centre-centre 4.81 deg)
  gap Front|Angled: 2.90 cm = 1.055 deg (centre-centre 3.17 deg)
  gap Angled|Side: 2.90 cm = 1.055 deg (centre-centre 3.17 deg)
  gap Fault_knees|Fault_heels: 2.90 cm = 1.072 deg (centre-centre 3.22 deg)
  gap Fault_heels|Fault_chest: 2.90 cm = 1.072 deg (centre-centre 3.22 deg)
  vertical gap Previous->Slow: 3.00 cm = 1.095 deg
  vertical gap Slow->Front: 3.20 cm = 1.142 deg
  ControlPanel  25.6 x  26.0 cm  az  +6.15..+15.73  el -16.01.. -6.70
  CueCard       26.4 x  30.2 cm  az -15.88.. -6.00  el -13.60.. -2.58
  StartPanel    25.6 x  12.2 cm  az  +6.15..+15.73  el -13.60.. -9.23
  IntroCard     26.4 x  21.2 cm  az -15.88.. -6.00  el -12.00.. -4.25

ring side points (az, el) vs implemented inner edges:
  turntable ring               az +/-6.54, el -13.73 -> clear of the card (its bottom is 0.13 deg above)
  turntable ring               az +/-6.54, el -13.73 -> hidden by the control panel over 0.39 deg of azimuth
  stand top edge               az +/-7.37, el -13.77 -> clear of the card (its bottom is 0.17 deg above)
  stand top edge               az +/-7.37, el -13.77 -> hidden by the control panel over 1.22 deg of azimuth
  completion ring (unpulsed)   az +/-7.90, el -13.64 -> clear of the card (its bottom is 0.04 deg above)
  completion ring (unpulsed)   az +/-7.90, el -13.64 -> hidden by the control panel over 1.75 deg of azimuth

backplate edges in 10-view-side.jpg (px): ControlPanel L measured 960.5 / predicted 958.8, ControlPanel R measured 1368.5 / predicted 1376.5, CueCard L measured 17.5 / predicted 16.6, CueCard R measured 446.5 / predicted 447.3
15-mistake-chest-side.jpg: red figure lowest point over the control panel = 0.77 deg above its top edge
15-mistake-chest-side.jpg: white figure lowest point over the control panel = 2.04 deg above its top edge
10-view-side.jpg: white figure lowest point over the control panel = 2.21 deg above its top edge
14-mistake-heels-side.jpg: white figure lowest point over the control panel = 2.21 deg above its top edge
10-view-side.jpg: hip-marker ring left-most az -5.59 el -8.29; card inner edge az -6.00 -> clearance 0.42 deg
04-phase3-bottom-position.jpg: hip-marker ring left-most az -4.85 el -8.08; card inner edge az -6.00 -> clearance 1.15 deg
```
