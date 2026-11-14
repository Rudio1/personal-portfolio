import Image from 'next/image';
import styles from './HeroArt.module.css';

// Ilustração própria: um mostrador de instrumento com o retrato ao centro
// e as quatro camadas de um sistema (UI, API, DB, Cloud) em órbita.

const ticks = Array.from({ length: 60 }, (_, index) => index);

const nodes = [
  { label: 'UI', angle: -140 },
  { label: 'API', angle: -40 },
  { label: 'DB', angle: 40 },
  { label: 'CLOUD', angle: 140 },
];

const CX = 300;
const CY = 300;
const ORBIT = 236;

function polar(angle: number, radius: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
}

interface HeroArtProps {
  portraitAlt: string;
}

export default function HeroArt({ portraitAlt }: HeroArtProps) {
  return (
    <div className={styles.art}>
      <svg viewBox="0 0 600 600" className={styles.svg} aria-hidden="true">
        <defs>
          <radialGradient id="art-halo" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#9d8cff" stopOpacity="0.3" />
            <stop offset="0.55" stopColor="#9d8cff" stopOpacity="0.08" />
            <stop offset="1" stopColor="#9d8cff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="art-lime" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#b8f36b" stopOpacity="0.22" />
            <stop offset="1" stopColor="#b8f36b" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="art-node" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#e9ffc9" stopOpacity="0.95" />
            <stop offset="0.35" stopColor="#b8f36b" stopOpacity="0.5" />
            <stop offset="1" stopColor="#b8f36b" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="art-beam" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#f3f4f2" stopOpacity="0.1" />
            <stop offset="1" stopColor="#f3f4f2" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Feixes de luz vindos do alto */}
        <polygon points="300,120 130,-60 190,-60" fill="url(#art-beam)" />
        <polygon points="300,120 410,-60 470,-60" fill="url(#art-beam)" />

        <circle cx={CX} cy={CY} r="290" fill="url(#art-halo)" />
        <circle cx="140" cy="470" r="150" fill="url(#art-lime)" />

        {/* Anéis fixos */}
        <g fill="none" stroke="#9d8cff">
          <circle cx={CX} cy={CY} r={ORBIT} strokeOpacity="0.28" />
          <circle cx={CX} cy={CY} r={ORBIT - 14} strokeOpacity="0.12" strokeDasharray="2 6" />
          <circle cx={CX} cy={CY} r="168" strokeOpacity="0.18" />
        </g>

        {/* Anel de marcações que gira devagar */}
        <g className={styles.spin} stroke="#f3f4f2">
          {ticks.map((tick) => (
            <line
              key={tick}
              x1={CX}
              y1={tick % 5 === 0 ? 30 : 38}
              x2={CX}
              y2="48"
              strokeOpacity={tick % 5 === 0 ? 0.5 : 0.18}
              transform={`rotate(${tick * 6} ${CX} ${CY})`}
            />
          ))}
        </g>

        {/* Arco lima: o trecho "ativo" do mostrador */}
        <path
          d={`M ${polar(-160, 196).x} ${polar(-160, 196).y} A 196 196 0 0 1 ${polar(-60, 196).x} ${polar(-60, 196).y}`}
          fill="none"
          stroke="#b8f36b"
          strokeOpacity="0.7"
          strokeWidth="1.5"
          className={styles.arc}
        />

        {/* Ligações do centro aos nós */}
        <g stroke="#b8f36b" strokeOpacity="0.22" strokeDasharray="3 5">
          {nodes.map((node) => {
            const point = polar(node.angle, ORBIT);
            const inner = polar(node.angle, 172);
            return <line key={node.label} x1={inner.x} y1={inner.y} x2={point.x} y2={point.y} />;
          })}
        </g>

        {/* Nós em órbita */}
        {nodes.map((node, index) => {
          const point = polar(node.angle, ORBIT);
          const labelPoint = polar(node.angle, ORBIT + 34);
          return (
            <g key={node.label}>
              <circle cx={point.x} cy={point.y} r="20" fill="url(#art-node)" className={styles.node} style={{ animationDelay: `${index * 450}ms` }} />
              <rect
                x={point.x - 4}
                y={point.y - 4}
                width="8"
                height="8"
                fill="#0b0d0f"
                stroke="#b8f36b"
                transform={`rotate(45 ${point.x} ${point.y})`}
              />
              <text
                x={labelPoint.x}
                y={labelPoint.y + 4}
                textAnchor="middle"
                className={styles.label}
              >
                {node.label}
              </text>
            </g>
          );
        })}

        {/* Mira no topo */}
        <path d="M300 4 L306 10 L300 16 L294 10 Z" fill="none" stroke="#b8f36b" strokeOpacity="0.7" />
      </svg>

      <div className={styles.portrait}>
        <Image
          src="/guilherme-rudio.png"
          alt={portraitAlt}
          width={840}
          height={1050}
          priority
          sizes="(max-width: 1023px) 220px, 300px"
          className={styles.portraitImage}
        />
      </div>
    </div>
  );
}
