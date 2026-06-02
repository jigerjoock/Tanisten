interface SnowflakeMarkProps {
  className?: string;
}

export default function SnowflakeMark({ className = "h-10 w-10" }: SnowflakeMarkProps) {
  return (
    <span
      className={`inline-flex items-center justify-center text-white ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 64 64" className="h-full w-full" fill="none">
        <circle cx="32" cy="32" r="5.5" stroke="currentColor" strokeWidth="2" />
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <g key={angle} transform={`rotate(${angle} 32 32)`}>
            <path d="M32 8v48" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
            <path d="M32 15 25 8M32 15l7-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M32 25 22 18M32 25l10-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M32 43 24 49M32 43l8 6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
          </g>
        ))}
      </svg>
    </span>
  );
}
