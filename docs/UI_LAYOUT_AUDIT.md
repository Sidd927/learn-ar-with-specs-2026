# UI layout audit: button size and spacing (Coach's Eye)

**Status:** documentation only, 1 Nov 2026.
- **What it is:** a static analysis of the saved scene, the layout code and the committed preview screenshots.
- **What was not done:** no runtime preview measurement and no physical SPECS validation. The Lens was not changed.
- **The proposed layout below is not approved, not implemented and not preview-validated.**

Everything here can be reproduced from the repository with the script in the appendix (run from the repository root).

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

**Saved inputs:** the `SquatTutorUI` script inputs at `Scene.scene` lines 3597–3601: `sideOffset 33`, `panelHeight −26`, `panelDistance 155`, `cardWidth 21`, `panelWidth 20`. `SquatTutor` (line 1211) and its child `SquatTutorUI` (line 4631) are at the origin with identity transforms.

**Layout code (`Lens/Assets/Scripts/SquatTutorUI.ts`):**

| Lines | What it does |
|---|---|
| 222–229 (`slot`) | Each panel slot sits at (side·sideOffset, panelHeight, −panelDistance), turned about Y by atan2(sideOffset, panelDistance)·(−side) to face the start position |
| 231–250 (`panel`) | Column FlexLayout with padding and a single `rowGap` |
| 252–330 | The four panels: intro card, Start panel, cue card, control panel |
| 368–382 (`row`) | Row FlexLayout, SpaceBetween, `columnGap 0.7`, centred vertically |
| 385–416 (`addButton`) | `btn.size = (width, height, 1)` |
| 44, 46, 370 | Content offset 0.6 cm plus a 0.02 cm lift on rows |

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

## 3. Current build (derived from code and scene; not measured at runtime)

| Control | Collider (w × h cm) | Straight-line / Z (cm) | Angular w × h |
|---|---|---|---|
| Previous, Play/Pause, Next | 5.40 × 3.40 | 159.3–159.5 / 153.1–155.7 | 1.94° × 1.21° |
| Slow, Replay | 8.45 × 3.40 | 160.0 / 153.4–155.3 | 3.02° × 1.20° |
| Front, 35°, Side | 5.40 × 3.40 | 161.2–161.3 / 153.1–155.7 | 1.91° × 1.18° |
| Knees, Heels, Chest | 5.47 × 3.40 | 161.2–161.3 / 153.1–155.7 | 1.94° × 1.18° |
| Start | 16.80 × 5.00 | 160.2 / 154.4 | 5.98° × 1.76° |

**Spacing (edge to edge):**
- Every horizontal gap is 0.70 cm = 0.249–0.252° (centre to centre 2.17–3.28°).
- Vertical: Previous → Slow 0.90 cm = 0.319°; Slow → Front 3.40 cm = 1.192°.

**Far-field range:** by Z depth (153–156 cm), every control is inside Snap's stated 60–160 cm range. By straight-line distance, the lower rows are 0.2–1.3 cm beyond 160 cm.

**Summary:** under our conservative interpretation the current controls **do not** meet 2° in height (about 1.2°; Start 1.76°). The 5.40–5.47 cm buttons are just under 2° wide, and the gaps (about 0.25°) are well below 1°.

## 4. Agent's proposed layout (not approved, not implemented, not preview-validated)

**Parameters:**
- `panelDistance` 150; `sideOffset` 29;
- right panels at −32 cm and left panels at −25 cm (one `panelHeight` input serves both sides today, so this needs a code change);
- button rows 5.8 cm tall with 5.8 cm buttons; `columnGap` 2.9 cm;
- a 1.6 cm spacer between the first two control rows (the panel's single `rowGap` stays 0.7 cm), which gives a 3.0 cm gap: 0.7 + 1.6 + 0.7;
- `panelWidth` 25.6; `cardWidth` 26.4; Start 22.4 × 5.8 cm.

**A. Derived from code and geometry:**

| Control | Collider (w × h cm) | Straight-line / Z (cm) | Angular w × h |
|---|---|---|---|
| Previous, Play/Pause, Next | 5.80 × 5.80 | 154.1–154.3 / 147.7–151.0 | 2.14–2.15° × 2.12–2.13° |
| Slow, Replay | 10.15 × 5.80 | 155.9 / 148.2–150.6 | 3.71° × 2.08° |
| Front, 35°, Side | 5.80 × 5.80 | 157.9–158.1 / 147.7–151.0 | 2.09° × 2.02–2.03° |
| Knees, Heels, Chest | 5.80 × 5.80 | 155.4–155.6 / 147.7–151.0 | 2.12–2.13° × 2.09° |
| Start | 22.40 × 5.80 | 155.8 / 149.4 | 8.19° × 2.08° |

- **Spacing:** horizontal gaps 2.90 cm = 1.052–1.077° (centre to centre 3.15–4.80°); vertical gaps 3.00 cm = 1.089° (Previous → Slow) and 3.20 cm = 1.134° (Slow → Front).
- **Fit:** every row's widths plus gaps equal its inner width exactly (asserted by the script).
- **Panel extents (corners, at the panel plane):**

  | Panel | Size | Azimuth | Elevation |
  |---|---|---|---|
  | Control panel | 25.6 × 28.5 cm | +6.15° to +15.73° | −16.79° to −6.60° |
  | Cue card | 26.4 × 30.2 cm | −15.88° to −6.00° | −14.65° to −3.69° |
  | Start panel | 25.6 × 12.2 cm | +6.15° to +15.73° | −13.96° to −9.59° |
  | Intro card | 26.4 × 21.2 cm | −15.88° to −6.00° | −13.07° to −5.36° |
- **Stage overlap:** the panels' lower inner corners would hide the sides of:
  - the turntable ring (radius 19.5 cm, `Scene.scene` line 2933; sides at ±6.54°) by 0.39–0.54°;
  - the stand top (44 cm wide, line 1228; ±7.37°) by 1.22–1.37°;
  - the completion ring (radius 23.6 cm, line 998; ±7.90° unpulsed) by 1.75–1.90°.

  Today's panels already touch the completion ring at its pulse peak (captured at ±8.71°).

**B. Estimated from screenshot calibration** (`docs/screenshots/*.jpg`, 1399 × 1590):
- **Method:** in `10-view-side.jpg`, the current backplate edges were measured automatically as the strongest 6-pixel brightness steps in empty padding bands. A pinhole model (pixel = centre + focal × tangent) was fitted to those edges against the geometry in section 3.
- **Fit:** fx 2402, fy 2395 (square pixels), centre (699.9, 797.2), residuals 1.6 px or less (about 0.04°). Features were found by colour thresholds, so treat feature positions as about ±0.2°.
- **Preview view:** about −16.25° to +16.23° azimuth and −18.32° to +18.41° elevation. The proposed panels' outer edges sit 0.37° (card) and 0.50° (control panel) inside the view edge, and the control panel's bottom about 1.5° above the bottom edge.
- **Figure clearance (side view):**
  - the red chest-pattern figure's lowest point over the proposed control panel is **0.68°** above its top edge;
  - the white figure's is 1.95–2.12°;
  - no white or red figure pixels fall inside the proposed panels in screenshots 09, 10 and 12–15.
- **Hip-marker ring (side view):** its left-most point (−5.59°) is **0.42°** outside the proposed card's inner edge.
- **Caption widths:** measured captions of the same style run 0.69–0.82 cm per character.
  - **Intro label:** "SPATIAL SQUAT COMPARISON" (24 characters) is therefore about 16.6–19.7 cm wide. It fits the proposed 26.4 cm card; on the current 21 cm card it is **uncertain**.
- **Proposed intro sentence:** "Watch a squat in five phases. Then compare three illustrative patterns with the reference, each from a view chosen to show its difference." (140 characters). The current intro body is 117 characters in 4 lines with a 1.54 cm line pitch.
  - On today's card (about 30 characters per line) it would likely wrap to **5 lines, about 7.7 cm**, overflowing the 6.6 cm `IntroBody` row (`SquatTutorUI.ts` line 256).
  - On the proposed 26.4 cm card it wraps to 4 lines.
  - This is a character-count estimate for a proportional font.

**C. Not established from the available evidence:**
- that the runtime layout matches this static model (no runtime measurement was made);
- that `Component.Canvas` on each slot applies no scaling;
- how much targeting tolerance SIK's hand ray adds;
- figure poses and views not in the committed screenshots (for example Chest at 35°, or Descent from the side);
- real SPECS optics, eye position and field of view;
- glyph widths of new copy;
- whether Snap intends our per-axis and edge-to-edge interpretation.

## 5. Why the proposal is not approved

**Tight margins:**
- the red arm clears the control panel by only 0.68°;
- the card's outer edge is 0.37° inside the view edge;
- the hip-marker ring clears the card by 0.42°.

**Ring overlaps:** the panels' corners would hide the sides of the turntable ring and stand top, and more of the completion ring.

**Code changes needed:**
- per-side panel heights;
- a spacer row;
- new column-gap and width formulas;
- new values for `panelDistance`, `sideOffset`, `cardWidth` and `panelWidth` in both the code and the saved scene.

**Unverified so far:** none of it has been checked in the preview or on a device. The decision is the owner's.

**If approved, the preview-validation plan:**
1. Implement on the branch and recompile.
2. Capture from the start position:
   - the intro and the five phases;
   - each comparison in its automatic view;
   - the Side view at the Bottom Position and with Chest open;
   - the 35° view;
   - the completion card.
3. Re-measure edges, clearances, ring overlap and text fit with the method in section 4B.
4. Re-run all 8 LEAF scenarios one at a time.
5. Report any shortfall before going further.

Pinch comfort still needs SPECS hardware.

## Appendix: reproduction script
Save as `ui_layout_audit.py` and run `python3 ui_layout_audit.py` from the repository root. Part B needs `numpy` and `Pillow`.

```python
"""Coach's Eye UI layout audit (read-only). Run from the repository root:  python3 ui_layout_audit.py
Part A (geometry) needs only the standard library. Part B (screenshots) needs numpy and Pillow.
Sources: Lens/Assets/Scene.scene (saved inputs), Lens/Assets/Scripts/SquatTutorUI.ts (layout code),
Lens/Packages/SpectaclesUIKit.lspkg (zip; Package/Assets/Scripts/...) for UIKit behaviour."""
import math, re

# ---------- Part A: geometry from saved scene values + layout code ----------
scene = open("Lens/Assets/Scene.scene").read()
def saved(name):  # SquatTutorUI script inputs, Scene.scene lines 3597-3601
    return float(re.search(rf"\n\s+{name}: !<float> (-?[0-9.]+)", scene).group(1))
CUR = dict(sideOffset=saved("sideOffset"), panelDistance=saved("panelDistance"),
           cyL=saved("panelHeight"), cyR=saved("panelHeight"),
           cardWidth=saved("cardWidth"), panelWidth=saved("panelWidth"),
           rowH=3.6, btnH=3.4, colGap=0.7, spacer=0.0, startRowH=5.6, startH=5.0)   # SquatTutorUI.ts 261-330, 368-382
PROP = dict(sideOffset=29.0, panelDistance=150.0, cyL=-25.0, cyR=-32.0, cardWidth=26.4, panelWidth=25.6,
            rowH=5.8, btnH=5.8, colGap=2.9, spacer=1.6, startRowH=5.8, startH=5.8)    # agent proposal (not approved)
Z_OFF = 0.6 + 0.02   # CONTENT_Z (line 46) + LAYOUT_Z_LIFT on rows (line 44, applied at line 370)

def rot_y(p, a): c, s = math.cos(a), math.sin(a); x, y, z = p; return (c*x + s*z, y, -s*x + c*z)
def world(P, side, cy, lx, ly, lz):   # slot(): position (side*so, cy, -D), yaw = atan2(so, D) * -side (lines 222-229)
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
    inner = P["panelWidth"] - 2.4                                  # control panel padding 1.2 (line 309)
    items = [("PlaybackLabel", 1.8), ("r1", P["rowH"])] + ([("spacer", P["spacer"])] if P["spacer"] else []) \
            + [("r2", P["rowH"]), ("ViewLabel", 1.8), ("r3", P["rowH"])]
    H, yc = column(1.2, 0.7, items); rects.append(("ControlPanel", 1, P["cyR"], P["panelWidth"], H))
    G, B = P["colGap"], P["btnH"]; third = (inner - 2*G)/3; half = (inner - G)/2
    for r, names, w in (("r1", ["Previous", "PlayPause", "Next"], third), ("r2", ["Slow", "Replay"], half),
                        ("r3", ["Front", "Angled", "Side"], third)):
        for n, x in zip(names, row_x(inner, [w]*len(names), G)): ctrl.append((n, 1, P["cyR"], x, yc[r], w, B, r))
    cinner = P["cardWidth"] - 3.2                                   # cue card padding 1.6, rowGap 0.6 (line 270)
    CH, cy = column(1.6, 0.6, [("PhaseLabel", 2.0), ("PhaseTitle", 3.0), ("PhaseCue", 5.8), ("ProgressDots", 1.6),
                               ("MistakesLabel", 1.8), ("faults", P["rowH"]), ("Disclaimer", 3.4)])
    rects.append(("CueCard", -1, P["cyL"], P["cardWidth"], CH)); ft = (cinner - 2*G)/3
    for n, x in zip(["Fault_knees", "Fault_heels", "Fault_chest"], row_x(cinner, [ft]*3, G)):
        ctrl.append((n, -1, P["cyL"], x, cy["faults"], ft, B, "faults"))
    SH, sy = column(1.6, 0.8, [("StartHint", 2.4), ("row", P["startRowH"])])   # lines 261-267
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
    print("saved inputs:", {k: CUR[k] for k in ("sideOffset", "panelDistance", "cyL", "cardWidth", "panelWidth")})
    report(CUR, "CURRENT (saved scene + code)")
    _, rects = report(PROP, "PROPOSED (agent proposal; not approved, not implemented)")
    print("\nring side points (az, el) vs proposed inner edges:")
    inner = {n: azel(world(PROP, s, c, (w/2 if s < 0 else -w/2), -h/2, 0.0))[0] for n, s, c, w, h in rects}
    for n, a, e in ring_sides():
        print(f"  {n:28s} az +/-{a:.2f}, el {e:+.2f} -> covered by card {abs(-a - inner['CueCard']):.2f} deg, "
              f"control panel {a - inner['ControlPanel']:.2f} deg")

    # ---------- Part B: screenshot calibration (numpy + Pillow) ----------
    try:
        import numpy as np
        from PIL import Image
    except ImportError:
        raise SystemExit("Part B skipped: install numpy and Pillow")
    def img(n): return np.asarray(Image.open(f"docs/screenshots/{n}").convert("RGB")).astype(int)
    g = img("10-view-side.jpg").mean(axis=2)
    def step(p, off, sign):   # strongest 6-px brightness step (+ rising, - falling)
        best = max(((sign*(p[i:i+6].mean() - p[i-6:i].mean()), i + off) for i in range(6, len(p) - 6)))
        return best[1] + 0.5
    # current panel backplate edges (pixels), measured in empty padding bands
    px = {"ctrl_L": step(g[1056:1064, 1000:1399].mean(0), 1000, +1), "ctrl_R": step(g[1056:1064, 1000:1399].mean(0), 1000, -1),
          "card_L": step(g[990:996, 0:520].mean(0), 0, +1), "card_R": step(g[990:996, 0:520].mean(0), 0, -1),
          "ctrl_T": step(g[950:1450, 1360:1366].mean(1), 950, +1), "ctrl_B": step(g[950:1450, 1360:1366].mean(1), 950, -1),
          "card_T": step(g[900:1500, 28:34].mean(1), 900, +1), "card_B": step(g[900:1500, 28:34].mean(1), 900, -1)}
    print("\nmeasured backplate edges (px):", {k: round(v, 1) for k, v in px.items()})
    uv = lambda p: (p[0] / -p[2], p[1] / -p[2]); P = CUR; Wp = lambda s, lx, ly: world(P, s, -26, lx, ly, 0.0)
    xs = [(uv(Wp(1, -10, 9.3))[0], px["ctrl_L"]), (uv(Wp(1, 10, 9.3))[0], px["ctrl_R"]),
          (uv(Wp(-1, -10.5, 13.6))[0], px["card_L"]), (uv(Wp(-1, 10.5, 13.6))[0], px["card_R"])]
    ys = [(uv(Wp(1, 9.5, 9.8))[1], px["ctrl_T"]), (uv(Wp(1, 9.5, -9.8))[1], px["ctrl_B"]),
          (uv(Wp(-1, -10, 14))[1], px["card_T"]), (uv(Wp(-1, -10, -14))[1], px["card_B"])]
    fx, cx = np.linalg.lstsq(np.array([[u, 1] for u, _ in xs]), np.array([p for _, p in xs]), rcond=None)[0]
    fy, cy = np.linalg.lstsq(np.array([[-v, 1] for v, _ in ys]), np.array([p for _, p in ys]), rcond=None)[0]
    print(f"pinhole fit: fx {fx:.0f} cx {cx:.1f} fy {fy:.0f} cy {cy:.1f}; residuals x "
          f"{[round(fx*u+cx-p,1) for u,p in xs]} y {[round(-fy*v+cy-p,1) for v,p in ys]}")
    to_ang = lambda x, y: (math.degrees(math.atan((x - cx) / fx)), -math.degrees(math.atan((y - cy) / fy)))
    to_px = lambda a, e: (cx + fx*math.tan(math.radians(a)), cy - fy*math.tan(math.radians(e)))
    W_, H_ = 1399, 1590
    print(f"preview view: az {to_ang(0,0)[0]:+.2f}..{to_ang(W_,0)[0]:+.2f}, el {to_ang(0,H_)[1]:+.2f}..{to_ang(0,0)[1]:+.2f}")
    # proposed control panel top edge in pixels (inner-top to outer-top corner)
    r = {n: (s, c, w, h) for n, s, c, w, h in rects}
    def corner(n, lx_sign, ly_sign):
        s, c, w, h = r[n]; return to_px(*azel(world(PROP, s, c, lx_sign*w/2, ly_sign*h/2, 0.0)))
    (x1, y1), (x2, y2) = corner("ControlPanel", -1, 1), corner("ControlPanel", 1, 1)
    pxdeg = fy * math.pi / 180
    for shot in ("15-mistake-chest-side.jpg", "10-view-side.jpg"):
        im = img(shot); R, G, Bc = im[..., 0], im[..., 1], im[..., 2]; mx, mn = im.max(2), im.min(2)
        for lbl, m in (("red figure", (R - G > 50) & (R - Bc > 50) & (R > 150)), ("white figure", (mx > 150) & (mx - mn < 35))):
            m = m.copy(); m[:, :353] = False; m[:, 1055:] = False; m[1100:, :] = False
            yy, xx = np.nonzero(m); sel = (xx >= x1) & (xx <= x2)
            if sel.any():
                top = y1 + (xx[sel] - x1) * (y2 - y1) / (x2 - x1); d = ((top - yy[sel]) / pxdeg).min()
                print(f"{shot}: {lbl} lowest point over proposed control panel = {d:.2f} deg above its top edge")
    im = img("10-view-side.jpg"); R, G, Bc = im[..., 0], im[..., 1], im[..., 2]
    yel = (R > 200) & (G > 140) & (Bc < 120); yel[:, :360] = False; yel[:, 700:] = False
    yy, xx = np.nonzero(yel); i = np.argmin(xx); a, e = to_ang(xx[i], yy[i])
    s, c, w, h = r["CueCard"]
    edge = min((abs(azel(world(PROP, s, c, w/2, ly, 0.0))[1] - e), azel(world(PROP, s, c, w/2, ly, 0.0))[0])
               for ly in np.linspace(-h/2, h/2, 301))[1]
    print(f"hip-marker ring left-most az {a:+.2f} el {e:+.2f}; proposed card inner edge az {edge:+.2f} -> clearance {a-edge:.2f} deg")
    im = img("11-completion.jpg"); R, G, Bc = im[..., 0], im[..., 1], im[..., 2]
    mint = (G > 200) & (R < 190) & (Bc > 140) & (G - R > 40); yy, xx = np.nonzero(mint)
    print(f"completion ring as captured (pulse phase unknown): az {to_ang(xx.min(),0)[0]:+.2f}..{to_ang(xx.max(),0)[0]:+.2f}")
    def caption_cm(shot, y0, y1, accent):   # text width on the 21 cm card (current card spans card_L..card_R px)
        im = img(shot); R, G, Bc = im[..., 0], im[..., 1], im[..., 2]
        m = ((R > 200) & (G > 140) & (Bc < 150)) if accent else (im.mean(2) > 150)
        cols = np.where(m[y0:y1, 20:352].any(0))[0]; return (cols.max() - cols.min() + 1) * 21 / (px["card_R"] - px["card_L"])
    for txt, shot, y0, y1, acc in (("COMPARE COMMON PATTERNS", "02-phase1-starting-stance.jpg", 1238, 1262, False),
                                   ("BEST SEEN FROM THE FRONT", "13-mistake-knees-front.jpg", 1010, 1035, True),
                                   ("SEEN FROM THE SIDE OR REAR", "14-mistake-heels-side.jpg", 1010, 1035, True),
                                   ("BEST SEEN FROM THE SIDE", "15-mistake-chest-side.jpg", 1010, 1035, True),
                                   ("PINCH AGAIN TO RETURN", "13-mistake-knees-front.jpg", 1238, 1262, False)):
        w = caption_cm(shot, y0, y1, acc); print(f"caption '{txt}' ({len(txt)} chars): {w:.2f} cm = {w/len(txt):.2f} cm/char")
```
