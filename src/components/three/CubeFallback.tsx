import { cn } from '@/lib/utils'

/**
 * Static isometric 3×3×3 lattice — the no-WebGL / reduced-motion counterpart of the 3D hero.
 * Geometry is computed once at module load.
 */

const U = 56
const GAP = 0.06
const ISO_X: [number, number] = [Math.cos(Math.PI / 6) * U, Math.sin(Math.PI / 6) * U]
const ISO_Z: [number, number] = [-Math.cos(Math.PI / 6) * U, Math.sin(Math.PI / 6) * U]
const ORIGIN: [number, number] = [0, 0]

function P(x: number, y: number, z: number): [number, number] {
  return [ORIGIN[0] + x * ISO_X[0] + z * ISO_Z[0], ORIGIN[1] + x * ISO_X[1] + z * ISO_Z[1] - y * U]
}

function quad(points: [number, number][]) {
  const cx = points.reduce((s, p) => s + p[0], 0) / 4
  const cy = points.reduce((s, p) => s + p[1], 0) / 4
  return points
    .map(([x, y]) => `${(x + (cx - x) * GAP * 2).toFixed(1)},${(y + (cy - y) * GAP * 2).toFixed(1)}`)
    .join(' ')
}

type Face = { points: string; fill: string; accent: boolean }

const faces: Face[] = []
for (let i = 0; i < 3; i++)
  for (let k = 0; k < 3; k++)
    faces.push({ points: quad([P(i, 3, k), P(i + 1, 3, k), P(i + 1, 3, k + 1), P(i, 3, k + 1)]), fill: 'url(#cf-top)', accent: i === 2 && k === 2 })
for (let j = 0; j < 3; j++)
  for (let k = 0; k < 3; k++)
    faces.push({ points: quad([P(3, j, k), P(3, j + 1, k), P(3, j + 1, k + 1), P(3, j, k + 1)]), fill: 'url(#cf-right)', accent: j === 2 && k === 2 })
for (let i = 0; i < 3; i++)
  for (let j = 0; j < 3; j++)
    faces.push({ points: quad([P(i, j, 3), P(i + 1, j, 3), P(i + 1, j + 1, 3), P(i, j + 1, 3)]), fill: 'url(#cf-left)', accent: i === 2 && j === 2 })

const minX = P(0, 0, 3)[0]
const maxX = P(3, 0, 0)[0]
const minY = P(0, 3, 0)[1]
const maxY = P(3, 0, 3)[1]
const PAD = 40
const VIEWBOX = `${(minX - PAD).toFixed(0)} ${(minY - PAD).toFixed(0)} ${(maxX - minX + PAD * 2).toFixed(0)} ${(maxY - minY + PAD * 2).toFixed(0)}`

export function CubeFallback({ className }: { className?: string }) {
  return (
    <svg viewBox={VIEWBOX} overflow="visible" className={cn('h-full w-full overflow-visible', className)} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="cf-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2b3d78" />
          <stop offset="1" stopColor="#17244e" />
        </linearGradient>
        <linearGradient id="cf-right" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#17244e" />
          <stop offset="1" stopColor="#0b1330" />
        </linearGradient>
        <linearGradient id="cf-left" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#111b3d" />
          <stop offset="1" stopColor="#080f26" />
        </linearGradient>
        <linearGradient id="cf-accent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9dbbff" />
          <stop offset="0.55" stopColor="#2f62f5" />
          <stop offset="1" stopColor="#1736b0" />
        </linearGradient>
        <radialGradient id="cf-glow" cx="0.5" cy="0.55" r="0.55">
          <stop offset="0" stopColor="#3a6bff" stopOpacity="0.2" />
          <stop offset="1" stopColor="#3a6bff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx={(minX + maxX) / 2} cy={(minY + maxY) / 2 + 30} rx={(maxX - minX) * 0.75} ry={(maxY - minY) * 0.65} fill="url(#cf-glow)" />
      {faces.map((f, i) => (
        <polygon
          key={i}
          points={f.points}
          fill={f.accent ? 'url(#cf-accent)' : f.fill}
          stroke={f.accent ? '#dce8ff' : 'rgba(147,183,255,0.18)'}
          strokeWidth={0.8}
          strokeLinejoin="round"
        />
      ))}
    </svg>
  )
}
