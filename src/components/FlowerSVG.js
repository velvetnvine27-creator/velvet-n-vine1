import React from 'react';

function RoseSVG({ color, size = 60 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      {/* Petals */}
      {[0,45,90,135,180,225,270,315].map((angle, i) => (
        <ellipse
          key={i}
          cx={30 + Math.cos((angle * Math.PI) / 180) * 12}
          cy={30 + Math.sin((angle * Math.PI) / 180) * 12}
          rx="9" ry="6"
          transform={`rotate(${angle}, ${30 + Math.cos((angle * Math.PI) / 180) * 12}, ${30 + Math.sin((angle * Math.PI) / 180) * 12})`}
          fill={color}
          opacity="0.85"
        />
      ))}
      {/* Inner petals */}
      {[22,67,112,157,202,247,292,337].map((angle, i) => (
        <ellipse
          key={i + 10}
          cx={30 + Math.cos((angle * Math.PI) / 180) * 7}
          cy={30 + Math.sin((angle * Math.PI) / 180) * 7}
          rx="6" ry="4"
          transform={`rotate(${angle}, ${30 + Math.cos((angle * Math.PI) / 180) * 7}, ${30 + Math.sin((angle * Math.PI) / 180) * 7})`}
          fill={color}
          opacity="0.95"
        />
      ))}
      {/* Center */}
      <circle cx="30" cy="30" r="5" fill={color} opacity="1" />
      <circle cx="30" cy="30" r="3" fill="white" opacity="0.4" />
      {/* Stem */}
      <line x1="30" y1="52" x2="30" y2="60" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DaisySVG({ color, size = 60 }) {
  const petalCount = 12;
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      {Array.from({ length: petalCount }).map((_, i) => {
        const angle = (i * 360) / petalCount;
        const rad = (angle * Math.PI) / 180;
        return (
          <ellipse
            key={i}
            cx={30 + Math.cos(rad) * 14}
            cy={30 + Math.sin(rad) * 14}
            rx="5" ry="9"
            transform={`rotate(${angle}, ${30 + Math.cos(rad) * 14}, ${30 + Math.sin(rad) * 14})`}
            fill={color === '#fef9c3' ? '#ffffff' : color}
            opacity="0.9"
          />
        );
      })}
      {/* Yellow center */}
      <circle cx="30" cy="30" r="8" fill="#fbbf24" />
      <circle cx="30" cy="30" r="5" fill="#f59e0b" />
      <line x1="30" y1="52" x2="30" y2="60" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LilySVG({ color, size = 60 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 30 + Math.cos(rad) * 15;
        const y = 30 + Math.sin(rad) * 15;
        return (
          <ellipse
            key={i}
            cx={x} cy={y}
            rx="7" ry="12"
            transform={`rotate(${angle}, ${x}, ${y})`}
            fill={color}
            opacity="0.88"
          />
        );
      })}
      {/* Stamens */}
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={i}
            x1="30" y1="30"
            x2={30 + Math.cos(rad) * 8}
            y2={30 + Math.sin(rad) * 8}
            stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round"
          />
        );
      })}
      <circle cx="30" cy="30" r="3" fill="#c9a84c" />
      <line x1="30" y1="52" x2="30" y2="60" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function TulipSVG({ color, size = 60 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      {/* Main petals */}
      <ellipse cx="30" cy="22" rx="8" ry="16" fill={color} opacity="0.9" />
      <ellipse cx="21" cy="28" rx="7" ry="14" transform="rotate(-20, 21, 28)" fill={color} opacity="0.85" />
      <ellipse cx="39" cy="28" rx="7" ry="14" transform="rotate(20, 39, 28)" fill={color} opacity="0.85" />
      {/* Sepal */}
      <ellipse cx="30" cy="42" rx="6" ry="5" fill="#4ade80" opacity="0.8" />
      <line x1="30" y1="44" x2="30" y2="60" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="50" x2="24" y2="56" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SunflowerSVG({ color = '#fbbf24', size = 60 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16;
        const rad = (angle * Math.PI) / 180;
        return (
          <ellipse
            key={i}
            cx={30 + Math.cos(rad) * 16}
            cy={30 + Math.sin(rad) * 16}
            rx="4" ry="10"
            transform={`rotate(${angle}, ${30 + Math.cos(rad) * 16}, ${30 + Math.sin(rad) * 16})`}
            fill={color}
            opacity="0.9"
          />
        );
      })}
      <circle cx="30" cy="30" r="10" fill="#78350f" />
      <circle cx="30" cy="30" r="7" fill="#92400e" />
      {/* Seeds texture */}
      {[0,60,120,180,240,300].map((a,i) => {
        const r = (a*Math.PI)/180;
        return <circle key={i} cx={30+Math.cos(r)*3.5} cy={30+Math.sin(r)*3.5} r="1.5" fill="#451a03" opacity="0.6" />;
      })}
      <line x1="30" y1="52" x2="30" y2="60" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function CarnationSVG({ color, size = 60 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      {/* Ruffled petals - multiple layers */}
      {[0,20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const dist = i % 2 === 0 ? 10 : 7;
        return (
          <ellipse
            key={i}
            cx={30 + Math.cos(rad) * dist}
            cy={30 + Math.sin(rad) * dist}
            rx="7" ry="4"
            transform={`rotate(${angle}, ${30 + Math.cos(rad) * dist}, ${30 + Math.sin(rad) * dist})`}
            fill={color}
            opacity={0.7 + (i % 3) * 0.1}
          />
        );
      })}
      <circle cx="30" cy="30" r="5" fill={color} opacity="1" />
      <line x1="30" y1="52" x2="30" y2="60" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LavenderSVG({ color = '#8b5cf6', size = 60 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <line x1="30" y1="60" x2="30" y2="20" stroke="#4ade80" strokeWidth="2" />
      {[22, 26, 30, 34, 38, 42, 46].map((y, i) => (
        <React.Fragment key={i}>
          <ellipse cx={30 - 4 + (i % 2)*2} cy={y} rx="4" ry="3" fill={color} opacity="0.85" />
          <ellipse cx={30 + 4 - (i % 2)*2} cy={y + 1} rx="4" ry="3" fill={color} opacity="0.75" />
        </React.Fragment>
      ))}
      <ellipse cx="30" cy="20" rx="3" ry="4" fill={color} opacity="0.9" />
    </svg>
  );
}

const SVG_MAP = {
  rose: RoseSVG,
  daisy: DaisySVG,
  lily: LilySVG,
  tulip: TulipSVG,
  sunflower: SunflowerSVG,
  carnation: CarnationSVG,
  lavender: LavenderSVG,
};

export default function FlowerSVG({ type, color, size }) {
  const Comp = SVG_MAP[type] || RoseSVG;
  return <Comp color={color} size={size} />;
}
