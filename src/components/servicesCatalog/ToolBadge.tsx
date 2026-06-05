interface ToolBadgeProps {
  label: string;
}

export default function ToolBadge({ label }: ToolBadgeProps) {
  return (
    <span className="inline-flex rounded-md border border-slate-700 bg-base-800/80 px-2.5 py-1 text-xs font-semibold text-slate-200">
      {label}
    </span>
  );
}
