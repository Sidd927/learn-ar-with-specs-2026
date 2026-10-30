/**
 * Replaces this object's RenderMeshVisual mesh with a thin torus built at runtime.
 *
 * The torus primitive's tube is a fixed third of its diameter, so scaling it flat
 * gives a wide band. This builds a ring with an independent tube radius, keeping
 * the existing material and scene wiring. Non-uniform object scale gives ovals.
 */
@component
export class RingMesh extends BaseScriptComponent {
  @ui.label("Ring Mesh — thin torus with a custom tube radius")
  @ui.separator
  @input
  @hint("Distance from the centre to the middle of the tube (cm, before object scale)")
  majorRadius: number = 1

  @input
  @hint("Tube radius (cm, before object scale)")
  tubeRadius: number = 0.05

  @input
  @hint("Segments around the ring")
  @widget(new SliderWidget(16, 128, 1))
  majorSegments: number = 64

  @input
  @hint("Segments around the tube")
  @widget(new SliderWidget(4, 24, 1))
  tubeSegments: number = 10

  onAwake(): void {
    const rmv = this.sceneObject.getComponent("Component.RenderMeshVisual") as RenderMeshVisual
    if (!rmv) {
      console.error("[RingMesh] No RenderMeshVisual on " + this.sceneObject.name)
      return
    }
    rmv.mesh = this.build()
  }

  private build(): RenderMesh {
    const builder = new MeshBuilder([
      {name: "position", components: 3},
      {name: "normal", components: 3, normalized: true},
      {name: "texture0", components: 2}
    ])
    builder.topology = MeshTopology.Triangles
    builder.indexType = MeshIndexType.UInt16

    const M = Math.max(3, Math.round(this.majorSegments))
    const T = Math.max(3, Math.round(this.tubeSegments))
    const R = this.majorRadius
    const r = this.tubeRadius
    const verts: number[] = []
    for (let i = 0; i <= M; i++) {
      const u = (i / M) * Math.PI * 2
      const cu = Math.cos(u)
      const su = Math.sin(u)
      for (let j = 0; j <= T; j++) {
        const v = (j / T) * Math.PI * 2
        const cv = Math.cos(v)
        const sv = Math.sin(v)
        verts.push((R + r * cv) * cu, r * sv, (R + r * cv) * su, cv * cu, sv, cv * su, i / M, j / T)
      }
    }
    builder.appendVerticesInterleaved(verts)

    // Quad a=(i,j) b=(i+1,j) c=(i+1,j+1) d=(i,j+1); (a,c,b) and (a,d,c) are CCW from outside.
    const idx: number[] = []
    const row = T + 1
    for (let i = 0; i < M; i++) {
      for (let j = 0; j < T; j++) {
        const a = i * row + j
        const b = (i + 1) * row + j
        const c = (i + 1) * row + j + 1
        const d = i * row + j + 1
        idx.push(a, c, b, a, d, c)
      }
    }
    builder.appendIndices(idx)
    builder.updateMesh()
    return builder.getMesh()
  }
}
