"""Generates VirtualScene 'apply' instructions for the translucent 'mistake' figure.

Same proportions and joint pivots as the solid mannequin (see generate_mannequin_scene.py),
names prefixed with 'Ghost', one translucent material, parented under the Turntable so it
overlays the solid figure exactly. Run: python3 tools/generate_fault_ghost.py > /tmp/ghost.json
"""
import json
C = "@asset:Meshes/MannequinCapsule.mesh"
S = "@asset:Meshes/MannequinSphere.mesh"
MAT = "$temp:ghostmat"
create = []

INSET = 0.96  # ghost meshes sit just inside the solid figure, so only differences show

def obj(id, name, parent, pos=(0, 0, 0), rot=(0, 0, 0), scale=(1, 1, 1), mesh=None):
    if mesh:
        scale = tuple(round(v * INSET, 4) for v in scale)
    o = {"id": "$temp:" + id, "name": "Ghost" + name,
         "transform": {"position": list(pos), "rotation": list(rot), "scale": list(scale)}}
    o["parentId"] = parent if parent.startswith("@") else "$temp:" + parent
    if mesh:
        o["components"] = [{"type": "RenderMeshVisual", "properties": {"mesh": mesh, "mainMaterial": MAT}}]
    create.append(o)

def cap(id, name, parent, center, length, radius, rot=(0, 0, 0)):
    obj(id, name, parent, center, rot, (radius * 4, length, radius * 4), C)

def sph(id, name, parent, center, d):
    if isinstance(d, (int, float)):
        d = (d, d, d)
    obj(id, name, parent, center, (0, 0, 0), d, S)

obj("g", "Mannequin", "@sceneObject:Turntable")
obj("pelvis", "Pelvis", "g", (0, 35.0, 0))
sph("pelvism", "PelvisMesh", "pelvis", (0, 0.6, 0), (12.5, 7.5, 8.5))
obj("spine", "Spine", "pelvis", (0, 2.5, 0))
cap("abd", "AbdomenMesh", "spine", (0, 3.5, 0), 9, 3.6)
sph("chest", "ChestMesh", "spine", (0, 10.0, 0), (13.5, 13.0, 8.2))
obj("neck", "Neck", "spine", (0, 15.5, 0))
cap("neckm", "NeckMesh", "neck", (0, 1.4, 0), 4.0, 1.25)
sph("head", "Head", "neck", (0, 5.7, 0.3), (7.6, 8.6, 8.2))
for side, sx in (("L", -1), ("R", 1)):
    obj("sh" + side, "Shoulder" + side, "spine", (sx * 7.4, 13.6, 0))
    cap("ua" + side, "UpperArm" + side, "sh" + side, (0, -5.0, 0), 10.5, 1.35)
    obj("el" + side, "Elbow" + side, "sh" + side, (0, -10.0, 0), (-8, 0, 0))
    cap("fa" + side, "Forearm" + side, "el" + side, (0, -4.6, 0), 9.5, 1.15)
    sph("hand" + side, "Hand" + side, "el" + side, (0, -9.9, 0), (2.4, 3.0, 1.8))
    obj("hip" + side, "Hip" + side, "pelvis", (sx * 4.5, -1.5, 0))
    cap("th" + side, "Thigh" + side, "hip" + side, (0, -7.75, 0), 15.5, 2.15)
    obj("kn" + side, "Knee" + side, "hip" + side, (0, -15.5, 0))
    sph("knb" + side, "KneeBall" + side, "kn" + side, (0, 0, 0), 3.3)
    cap("sn" + side, "Shin" + side, "kn" + side, (0, -7.75, 0), 15.5, 1.7)
    obj("an" + side, "Ankle" + side, "kn" + side, (0, -15.5, 0))
    obj("ft" + side, "Foot" + side, "an" + side, (0, -1.4, 2.6), (90, 0, 0), (6.8, 9.0, 4.8), C)

assets = [{"id": MAT, "preset": "UnlitMaterialPreset", "name": "GhostMistakeMaterial", "destinationPath": "Materials",
           "properties": {"passInfos.0.baseColor": {"x": 1.0, "y": 0.42, "z": 0.38, "w": 0.55},
                          "passInfos.0.blendMode": {"value": "Normal", "type": "enum", "enumType": "Editor.Assets.BlendMode"},
                          "passInfos.0.depthWrite": False}}]
print(json.dumps({"assets": assets, "create": create}, separators=(",", ":")))
