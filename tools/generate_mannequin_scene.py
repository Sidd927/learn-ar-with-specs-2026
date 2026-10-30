import json
"""Generates VirtualScene 'apply' instructions for the Squat Tutor scene.

Run: python3 tools/generate_mannequin_scene.py > /tmp/squat/ins.json
All sizes in cm. The mannequin faces +Z in its own space; the Turntable yaws it.
Meshes and materials are referenced by project path (they live in Lens/Assets).
"""
import json
C="@asset:Meshes/MannequinCapsule.mesh"; S="@asset:Meshes/MannequinSphere.mesh"
CONE="@asset:Meshes/CueCone.mesh"; TOR="@asset:Meshes/CueTorus.mesh"; CYL="@asset:Meshes/StandCylinder.mesh"
MAT={"body":"@asset:Materials/BodyMaterial.mat","core":"@asset:Materials/CoreMaterial.mat",
     "joint":"@asset:Materials/JointMaterial.mat","cue":"@asset:Materials/CueHighlight.mat",
     "done":"@asset:Materials/CueComplete.mat","stand":"@asset:Materials/StandColumnMaterial.mat",
     "standtop":"@asset:Materials/StandPlateMaterial.mat"}
create=[]
def obj(id,name,parent,pos=(0,0,0),rot=(0,0,0),scale=(1,1,1),mesh=None,mat=None):
    o={"id":"$temp:"+id,"name":name,"transform":{"position":list(pos),"rotation":list(rot),"scale":list(scale)}}
    if parent: o["parentId"]="$temp:"+parent if not parent.startswith("@") else parent
    if mesh: o["components"]=[{"type":"RenderMeshVisual","properties":{"mesh":mesh,"mainMaterial":MAT[mat]}}]
    create.append(o)
def cap(id,name,parent,center,length,radius,mat,rot=(0,0,0)):
    obj(id,name,parent,center,rot,(radius*4,length,radius*4),C,mat)
def sph(id,name,parent,center,d,mat):
    if isinstance(d,(int,float)): d=(d,d,d)
    obj(id,name,parent,center,(0,0,0),d,S,mat)
obj("root","SquatTutor",None)
obj("stage","Stage","root",(0,-62,-150))
# stand: column + top plate (static)
obj("stand","Stand","stage")
obj("col","StandColumn","stand",(0,-46,0),(0,0,0),(14,88,14),CYL,"stand")
obj("top","StandTop","stand",(0,-1.2,0),(0,0,0),(44,2.4,44),CYL,"standtop")
obj("tt","Turntable","stage",(0,0,0),(0,35,0))
obj("ttring","TurntableRing","tt",(0,0.1,0),(0,0,0),(40,1.2,40),TOR,"joint")
obj("ttmark","TurntableFrontMark","tt",(0,0.3,19.5),(0,0,0),(1.6,0.6,1.6),S,"joint")
obj("man","Mannequin","tt")
PY=34.8
obj("pelvis","Pelvis","man",(0,PY,0))
sph("pelvism","PelvisMesh","pelvis",(0,0.6,0),(12.5,7.5,8.5),"core")
# spine / torso
obj("spine","Spine","pelvis",(0,2.5,0))
cap("abd","AbdomenMesh","spine",(0,3.5,0),9,3.6,"core")
sph("chest","ChestMesh","spine",(0,10.0,0),(13.5,13.0,8.2),"body")
obj("neck","Neck","spine",(0,15.5,0))
cap("neckm","NeckMesh","neck",(0,1.4,0),4.0,1.25,"body")
sph("head","Head","neck",(0,5.7,0.3),(7.6,8.6,8.2),"body")
for side,sx in (("L",-1),("R",1)):
    obj("sh"+side,"Shoulder"+side,"spine",(sx*7.4,13.6,0))
    sph("shb"+side,"ShoulderBall"+side,"sh"+side,(0,0,0),3.2,"joint")
    cap("ua"+side,"UpperArm"+side,"sh"+side,(0,-5.0,0),10.5,1.35,"body")
    obj("el"+side,"Elbow"+side,"sh"+side,(0,-10.0,0),(-8,0,0))
    sph("elb"+side,"ElbowBall"+side,"el"+side,(0,0,0),2.5,"joint")
    cap("fa"+side,"Forearm"+side,"el"+side,(0,-4.6,0),9.5,1.15,"body")
    sph("hand"+side,"Hand"+side,"el"+side,(0,-9.9,0),(2.4,3.0,1.8),"body")
    # legs
    obj("hip"+side,"Hip"+side,"pelvis",(sx*4.5,-1.5,0))
    sph("hipb"+side,"HipBall"+side,"hip"+side,(0,0,0),3.6,"joint")
    cap("th"+side,"Thigh"+side,"hip"+side,(0,-7.75,0),15.5,2.15,"body")
    obj("kn"+side,"Knee"+side,"hip"+side,(0,-15.5,0))
    sph("knb"+side,"KneeBall"+side,"kn"+side,(0,0,0),3.3,"joint")
    cap("sn"+side,"Shin"+side,"kn"+side,(0,-7.75,0),15.5,1.7,"body")
    obj("an"+side,"Ankle"+side,"kn"+side,(0,-15.5,0))
    sph("anb"+side,"AnkleBall"+side,"an"+side,(0,0,0),2.4,"joint")
    obj("ft"+side,"Foot"+side,"an"+side,(0,-1.4,2.6),(90,0,0),(6.8,9.0,4.8),C,"body")
# cue indicators
obj("cues","Cues","man")
obj("cfeet","Cue_FootOutlines","cues")
for side,sx in (("L",-1),("R",1)):
    obj("cf"+side,"FootOutline"+side,"cfeet",(sx*6.5,0.25,2.4),(0,sx*12,0),(6.4,0.9,12.5),TOR,"cue")
obj("cknee","Cue_KneeArrows","cues")
for side in ("L","R"):
    obj("ck"+side,"KneeArrow"+side,"cknee",(0,20,8),(90,0,0),(2.4,3.6,2.4),CONE,"cue")
obj("chip","Cue_HipMarker","pelvis")
obj("chipring","HipMarkerRing","chip",(0,0,-1),(0,0,0),(20,1.4,15),TOR,"cue")
obj("chiparrow","HipMarkerArrow","chip",(0,0,-8.5),(-90,0,0),(2.4,3.6,2.4),CONE,"cue")
obj("cdone","Cue_CompletionRing","cues",(0,0.4,0),(0,0,0),(34,1.0,34),TOR,"done")
obj("ui","SquatTutorUI","root")
obj("systems","Systems","root")
create[[o["id"] for o in create].index("$temp:man")]["components"]=[{"type":"ScriptComponent","properties":{"scriptAsset":"@asset:Scripts/MannequinRig.ts"}}]
create[[o["id"] for o in create].index("$temp:ui")]["components"]=[{"type":"ScriptComponent","properties":{"scriptAsset":"@asset:Scripts/SquatTutorUI.ts"}}]
create[[o["id"] for o in create].index("$temp:systems")]["components"]=[
  {"type":"ScriptComponent","properties":{"scriptAsset":"@asset:Scripts/SquatPlayer.ts"}},
  {"type":"ScriptComponent","properties":{"scriptAsset":"@asset:Scripts/Turntable.ts"}},
  {"type":"ScriptComponent","properties":{"scriptAsset":"@asset:Scripts/CueIndicators.ts"}},
  {"type":"ScriptComponent","properties":{"scriptAsset":"@asset:Scripts/SquatTutorController.ts"}}]
print(json.dumps({"create":create},separators=(",",":")))
