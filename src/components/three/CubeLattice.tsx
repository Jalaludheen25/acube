'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

const GRID = 3
const SPACING = 1.07
const FLIGHT = 2.6 // seconds for each cube to settle into the lattice

type Cell = {
  home: THREE.Vector3
  start: THREE.Vector3
  startRot: THREE.Euler
  delay: number
  kind: 'navy' | 'accent' | 'glass'
  breathe: { axis: THREE.Vector3; phase: number } | null
}

/** Deterministic PRNG so the composition is identical on every load. */
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const key = (x: number, y: number, z: number) => `${x}${y}${z}`
const GLASS = new Set([key(0, 2, 2), key(2, 2, 0), key(1, 0, 2)])
const ACCENT = key(2, 2, 2)
const BREATHERS: Record<string, [number, number, number]> = {
  [key(2, 1, 1)]: [1, 0, 0],
  [key(1, 2, 1)]: [0, 1, 0],
  [key(1, 1, 2)]: [0, 0, 1],
  [key(0, 0, 1)]: [-1, 0, 0],
  [key(1, 0, 0)]: [0, 0, -1],
}

function buildCells(): Cell[] {
  const rand = seeded(11)
  const half = (GRID - 1) / 2
  const cells: Cell[] = []
  for (let x = 0; x < GRID; x++)
    for (let y = 0; y < GRID; y++)
      for (let z = 0; z < GRID; z++) {
        const k = key(x, y, z)
        const home = new THREE.Vector3((x - half) * SPACING, (y - half) * SPACING, (z - half) * SPACING)
        const outward = home.lengthSq() > 0 ? home.clone().normalize() : new THREE.Vector3(0, 1, 0)
        const start = outward
          .multiplyScalar(4.5 + rand() * 3.5)
          .add(new THREE.Vector3((rand() - 0.5) * 2.5, (rand() - 0.2) * 2.5, (rand() - 0.5) * 2.5))
        const b = BREATHERS[k]
        cells.push({
          home,
          start,
          startRot: new THREE.Euler((rand() - 0.5) * Math.PI, (rand() - 0.5) * Math.PI, (rand() - 0.5) * Math.PI),
          delay: 0.1 + y * 0.22 + rand() * 0.45,
          kind: k === ACCENT ? 'accent' : GLASS.has(k) ? 'glass' : 'navy',
          breathe: b ? { axis: new THREE.Vector3(...b), phase: rand() * Math.PI * 2 } : null,
        })
      }
  return cells
}

/** A soft light painted onto the matcap. `sx`/`sy` stretch it into bands and streaks. */
type Glow = { x: number; y: number; r: number; rgb: string; alpha: number; sx?: number; sy?: number }

/**
 * Procedural "studio sphere" matcap. Matcaps bake lighting into a texture, so the materials need
 * no environment pre-filtering (PMREM) and compile almost instantly — important on Windows,
 * where shader compilation runs through Direct3D.
 *
 * Flat cube faces each sample a single point of the sphere while bevels sweep between them,
 * so face points stay dark and the bright light lives where the bevels sample.
 */
function paintMatcap(stops: [number, string][], glows: Glow[]) {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  const c = size / 2

  ctx.beginPath()
  ctx.arc(c, c, c, 0, Math.PI * 2)
  ctx.clip()

  const body = ctx.createRadialGradient(c, c, 0, c, c, c)
  for (const [at, color] of stops) body.addColorStop(at, color)
  ctx.fillStyle = body
  ctx.fillRect(0, 0, size, size)

  ctx.globalCompositeOperation = 'lighter'
  for (const g of glows) {
    ctx.save()
    ctx.translate(g.x * size, g.y * size)
    ctx.scale(g.sx ?? 1, g.sy ?? 1)
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, g.r * size)
    grad.addColorStop(0, `rgba(${g.rgb},${g.alpha})`)
    grad.addColorStop(1, `rgba(${g.rgb},0)`)
    ctx.fillStyle = grad
    ctx.fillRect(-size, -size, size * 2, size * 2)
    ctx.restore()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function createMatcaps() {
  // Deep navy: dark faces, crisp bevel highlights, blue and cyan reflections.
  const navy = paintMatcap(
    [
      [0, '#131c3c'],
      [0.62, '#0b1330'],
      [0.9, '#17244e'],
      [1, '#2b3d78'],
    ],
    [
      { x: 0.5, y: 0.31, r: 0.5, rgb: '235,242,255', alpha: 0.62, sy: 0.1 }, // top-edge bevel band
      { x: 0.5, y: 0.06, r: 0.3, rgb: '191,213,255', alpha: 0.14, sy: 0.4 }, // soft sheen on top faces
      { x: 0.14, y: 0.6, r: 0.22, rgb: '147,183,255', alpha: 0.55, sx: 0.3 }, // blue softbox streak
      { x: 0.88, y: 0.58, r: 0.2, rgb: '126,223,255', alpha: 0.38, sx: 0.28 }, // cyan rim streak
      { x: 0.22, y: 0.9, r: 0.16, rgb: '58,107,255', alpha: 0.28 }, // blue glint
      { x: 0.8, y: 0.9, r: 0.16, rgb: '34,195,255', alpha: 0.24 }, // cyan glint
    ],
  )
  // Glossy brand blue.
  const accent = paintMatcap(
    [
      [0, '#7ea4ff'],
      [0.58, '#2f62f5'],
      [0.86, '#1736b0'],
      [1, '#0b1a5c'],
    ],
    [
      { x: 0.5, y: 0.31, r: 0.5, rgb: '240,246,255', alpha: 0.95, sy: 0.1 },
      { x: 0.5, y: 0.07, r: 0.32, rgb: '200,222,255', alpha: 0.5, sy: 0.4 },
      { x: 0.14, y: 0.6, r: 0.22, rgb: '190,214,255', alpha: 0.5, sx: 0.32 },
      { x: 0.88, y: 0.58, r: 0.2, rgb: '126,223,255', alpha: 0.55, sx: 0.28 },
    ],
  )
  return { navy, accent }
}

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4)
}

function Lattice({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null)
  const meshes = useRef<(THREE.Mesh | null)[]>([])
  const startTime = useRef<number | null>(null)
  const spin = useRef(-0.6)
  const cells = useMemo(() => buildCells(), [])

  const { geometry, edges, materials, caps } = useMemo(() => {
    const geometry = new RoundedBoxGeometry(1, 1, 1, 4, 0.075)
    const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(0.985, 0.985, 0.985))
    const caps = createMatcaps()
    const materials = {
      navy: new THREE.MeshMatcapMaterial({ matcap: caps.navy }),
      accent: new THREE.MeshMatcapMaterial({ matcap: caps.accent }),
      glass: new THREE.MeshMatcapMaterial({ matcap: caps.navy, color: '#dce8ff', transparent: true, opacity: 0.16, depthWrite: false }),
      line: new THREE.LineBasicMaterial({ color: '#3a6bff', transparent: true, opacity: 0.85 }),
    }
    return { geometry, edges, materials, caps }
  }, [])

  useEffect(
    () => () => {
      geometry.dispose()
      edges.dispose()
      Object.values(materials).forEach((m) => m.dispose())
      caps.navy.dispose()
      caps.accent.dispose()
    },
    [geometry, edges, materials, caps],
  )

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    if (startTime.current === null) startTime.current = t
    const e = t - startTime.current
    const dt = Math.min(delta, 1 / 20)

    cells.forEach((c, i) => {
      const m = meshes.current[i]
      if (!m) return
      const p = Math.min(Math.max((e - c.delay) / FLIGHT, 0), 1)
      const k = easeOutQuart(p)
      m.position.lerpVectors(c.start, c.home, k)
      if (c.breathe && p >= 1) {
        const wave = Math.sin((e - c.delay - FLIGHT) * 0.5 + c.breathe.phase)
        m.position.addScaledVector(c.breathe.axis, Math.pow(Math.max(0, wave), 2) * 0.38)
      }
      m.rotation.set(c.startRot.x * (1 - k), c.startRot.y * (1 - k), c.startRot.z * (1 - k))
      m.scale.setScalar(0.55 + 0.45 * k)
    })

    const g = group.current
    if (!g) return
    const intro = easeOutQuart(Math.min(e / 3.2, 1))
    spin.current += dt * 0.075
    const px = pointer.current?.x ?? 0
    const py = pointer.current?.y ?? 0
    const targetX = 0.52 - py * 0.16
    const targetY = spin.current + px * 0.32
    g.rotation.x += (targetX - g.rotation.x) * Math.min(1, dt * 2.4)
    g.rotation.y += (targetY - g.rotation.y) * Math.min(1, dt * 2.4)
    g.rotation.z = 0.0
    g.position.y = Math.sin(t * 0.55) * 0.07 + (1 - intro) * -0.6
    g.position.x = (1 - intro) * 0.9
  })

  return (
    <group ref={group} rotation={[0.52, -0.6, 0]}>
      {cells.map((c, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshes.current[i] = el
          }}
          geometry={geometry}
          material={materials[c.kind]}
          position={c.start}
          renderOrder={c.kind === 'glass' ? 2 : 1}
        >
          {c.kind === 'glass' && <lineSegments geometry={edges} material={materials.line} />}
        </mesh>
      ))}
    </group>
  )
}

export default function CubeLattice({
  active,
  onReady,
  onFail,
  className,
}: {
  active: boolean
  onReady: () => void
  onFail: () => void
  className?: string
}) {
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <Canvas
      className={className}
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 12.5], fov: 30, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', stencil: false }}
      flat
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', (e) => {
          e.preventDefault()
          onFail()
        })
        onReady()
      }}
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <Lattice pointer={pointer} />
    </Canvas>
  )
}
