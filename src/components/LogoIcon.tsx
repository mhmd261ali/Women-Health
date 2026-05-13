export default function LogoIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 240"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="100" cy="45" r="25" fill="#F2A08E" opacity="0.9" />
      <path
        d="M 100 70 Q 95 90 95 120 Q 95 150 100 180"
        stroke="#8A9E84"
        strokeWidth="12"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />
      <circle cx="95" cy="80" r="3.5" fill="#8A9E84" opacity="0.7" />
      <circle cx="94" cy="95" r="3.5" fill="#8A9E84" opacity="0.7" />
      <circle cx="94" cy="110" r="3.5" fill="#8A9E84" opacity="0.7" />
      <circle cx="95" cy="125" r="3.5" fill="#8A9E84" opacity="0.7" />
      <circle cx="96" cy="140" r="3.5" fill="#8A9E84" opacity="0.7" />
      <circle cx="98" cy="155" r="3.5" fill="#8A9E84" opacity="0.7" />
      <circle cx="100" cy="170" r="3.5" fill="#8A9E84" opacity="0.7" />
      <path
        d="M 95 85 Q 70 95 65 120"
        stroke="#9DAE97"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M 105 85 Q 130 95 135 120"
        stroke="#9DAE97"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M 100 105 Q 85 95 75 105 Q 60 120 75 145 Q 100 165 100 175 Q 100 165 125 145 Q 140 120 125 105 Q 115 95 100 105"
        fill="#D4756A"
        opacity="0.85"
      />
      <ellipse cx="100" cy="140" rx="18" ry="25" fill="#F2A99B" opacity="0.9" />
      <circle cx="100" cy="115" r="12" fill="#F5C5BC" opacity="0.85" />
      <path
        d="M 100 130 Q 92 125 88 132 Q 85 137 92 145 Q 100 150 100 155 Q 100 150 108 145 Q 115 137 112 132 Q 108 125 100 130"
        fill="#C4605A"
        opacity="0.7"
      />
      <circle cx="155" cy="145" r="5" fill="#8A9E84" opacity="0.6" />
      <circle cx="168" cy="158" r="4" fill="#9DAE97" opacity="0.5" />
      <circle cx="160" cy="175" r="3.5" fill="#8A9E84" opacity="0.5" />
      <circle cx="145" cy="168" r="3" fill="#9DAE97" opacity="0.4" />
    </svg>
  );
}
