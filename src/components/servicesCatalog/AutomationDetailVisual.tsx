interface AutomationDetailVisualProps {
  image: string;
  productId: string;
  title: string;
}

export default function AutomationDetailVisual({ image, productId, title }: AutomationDetailVisualProps) {
  return (
    <div className="relative min-h-[300px] overflow-hidden rounded-lg border border-accent-400/25 bg-[#111827] shadow-[0_22px_70px_rgba(0,169,157,0.13)]">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-38 saturate-90" />
      <div className="absolute inset-0 bg-gradient-to-br from-base-800/50 via-base-800/84 to-teal-950/78" />
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="relative flex h-full min-h-[300px] flex-col justify-between p-5">
        <VisualTopBar />
        <AutomationVisualScheme productId={productId} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-200/85">Automation workflow</p>
          <p className="mt-2 break-words text-lg font-semibold leading-tight text-white [overflow-wrap:anywhere]">{title}</p>
        </div>
      </div>
    </div>
  );
}

function VisualTopBar() {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="h-2 w-28 rounded-full bg-accent-300/75" />
      <div className="grid grid-cols-3 gap-1.5">
        <span className="h-2 w-2 rounded-full bg-accent-300/80" />
        <span className="h-2 w-2 rounded-full bg-sky-300/70" />
        <span className="h-2 w-2 rounded-full bg-slate-400/70" />
      </div>
    </div>
  );
}

function AutomationVisualScheme({ productId }: { productId: string }) {
  switch (productId) {
    case "automation-audit-workflow-cleanup":
      return <AuditScheme />;
    case "workflow-automation":
      return <WorkflowScheme />;
    case "ai-assistants":
      return <AssistantScheme />;
    case "reporting-automation":
      return <ReportingScheme />;
    case "business-process-automation":
      return <ProcessScheme />;
    case "custom-business-tools":
      return <ToolsScheme />;
    case "data-processing-solutions":
      return <DataScheme />;
    default:
      return <WorkflowScheme />;
  }
}

function AuditScheme() {
  return (
    <div className="grid min-w-0 grid-cols-3 items-stretch gap-2">
      <AuditCard label="Current" lines={3} />
      <AuditCard label="Gaps" lines={2} accent />
      <AuditCard label="Roadmap" lines={4} />
    </div>
  );
}

function WorkflowScheme() {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
      <Node label="Input" />
      <Connector />
      <Node label="Rules" accent />
      <Connector />
      <Node label="Output" />
    </div>
  );
}

function AssistantScheme() {
  return (
    <div className="grid grid-cols-[0.8fr_1.2fr_0.8fr] items-center gap-3">
      <Node label="Docs" />
      <div className="rounded-lg border border-accent-300/35 bg-base-900/68 p-4 text-center shadow-[0_12px_32px_rgba(0,0,0,0.28)] backdrop-blur-md">
        <div className="mx-auto mb-3 h-12 w-12 rounded-full border border-sky-200/35 bg-sky-200/10">
          <span className="mx-auto mt-5 block h-2 w-7 rounded-full bg-accent-200/70" />
        </div>
        <p className="truncate text-[10px] font-bold uppercase tracking-[0.12em] text-accent-100/85">Assistant</p>
      </div>
      <Node label="Answer" />
    </div>
  );
}

function ReportingScheme() {
  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-3 gap-2">
        <MiniPanel label="CSV" />
        <MiniPanel label="Excel" />
        <MiniPanel label="API" />
      </div>
      <div className="rounded-lg border border-white/18 bg-base-900/68 p-4 shadow-[0_12px_32px_rgba(0,0,0,0.28)] backdrop-blur-md">
        <div className="flex h-20 items-end gap-2">
          {[40, 68, 52, 82, 64, 92, 74].map((height, index) => (
            <span key={index} className="flex-1 rounded-t bg-[linear-gradient(180deg,rgba(45,212,191,0.72),rgba(77,163,255,0.20))]" style={{ height: `${height}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProcessScheme() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <ProcessCard label="Request" />
      <ProcessCard label="Review" />
      <ProcessCard label="Notify" />
      <ProcessCard label="Archive" />
    </div>
  );
}

function ToolsScheme() {
  return (
    <div className="grid grid-cols-3 gap-2">
      <ToolTile label="Form" />
      <ToolTile label="Admin" />
      <ToolTile label="Users" />
      <ToolTile label="Table" />
      <ToolTile label="Export" />
      <ToolTile label="Deploy" />
    </div>
  );
}

function DataScheme() {
  return (
    <div className="grid grid-cols-[0.8fr_1.2fr_0.8fr] items-center gap-3">
      <DataStack label="Raw" />
      <div className="rounded-lg border border-accent-300/35 bg-base-900/68 p-4 shadow-[0_12px_32px_rgba(0,0,0,0.28)] backdrop-blur-md">
        <div className="space-y-2">
          <span className="block h-2 rounded-full bg-accent-200/55" />
          <span className="block h-2 w-4/5 rounded-full bg-sky-200/35" />
          <span className="block h-2 w-2/3 rounded-full bg-white/20" />
        </div>
      </div>
      <DataStack label="Clean" />
    </div>
  );
}

function AuditCard({ label, lines, accent = false }: { label: string; lines: number; accent?: boolean }) {
  return (
    <div className={`min-w-0 rounded-lg border p-3 shadow-[0_12px_32px_rgba(0,0,0,0.28)] backdrop-blur-md ${accent ? "border-accent-300/42 bg-teal-950/58" : "border-white/18 bg-base-900/66"}`}>
      <div className="mb-3 flex min-w-0 items-center gap-2">
        <span className={`h-6 w-6 shrink-0 rounded-md border ${accent ? "border-accent-200/45 bg-accent-300/14" : "border-sky-200/30 bg-sky-300/10"}`} />
        <p className="min-w-0 truncate text-[9px] font-bold uppercase tracking-[0.08em] text-slate-100">{label}</p>
      </div>
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <span key={index} className={`block h-1.5 rounded-full ${index === 0 ? "w-full bg-accent-200/55" : "w-4/5 bg-white/18"}`} />
        ))}
      </div>
    </div>
  );
}

function Node({ label, accent = false }: { label: string; accent?: boolean }) {
  return (
    <div className={`rounded-lg border p-4 text-center shadow-[0_12px_32px_rgba(0,0,0,0.28)] backdrop-blur-md ${accent ? "border-accent-300/42 bg-teal-950/58" : "border-white/18 bg-base-900/66"}`}>
      <span className="mx-auto mb-3 block h-10 w-10 rounded-md border border-sky-300/25 bg-sky-300/10" />
      <p className="truncate text-[10px] font-bold uppercase tracking-[0.1em] text-slate-100">{label}</p>
    </div>
  );
}

function Connector() {
  return <span className="h-px w-8 bg-gradient-to-r from-accent-300/15 via-accent-200/80 to-sky-300/15" />;
}

function MiniPanel({ label }: { label: string }) {
  return (
    <div className="min-w-0 rounded-md border border-white/18 bg-base-900/66 p-3 text-center text-xs font-bold uppercase tracking-[0.08em] text-slate-100 shadow-[0_8px_22px_rgba(0,0,0,0.22)] backdrop-blur-md">
      <span className="mb-2 block h-1.5 rounded-full bg-accent-200/50" />
      <span className="block truncate">{label}</span>
    </div>
  );
}

function ProcessCard({ label }: { label: string }) {
  return (
    <div className="rounded-lg border border-white/18 bg-base-900/66 p-4 shadow-[0_10px_26px_rgba(0,0,0,0.24)] backdrop-blur-md">
      <span className="mb-3 block h-2 w-16 rounded-full bg-accent-200/55" />
      <p className="truncate text-xs font-bold uppercase tracking-[0.1em] text-slate-100">{label}</p>
    </div>
  );
}

function ToolTile({ label }: { label: string }) {
  return (
    <div className="rounded-md border border-white/18 bg-base-900/66 p-3 text-center shadow-[0_8px_22px_rgba(0,0,0,0.22)] backdrop-blur-md">
      <span className="mx-auto mb-2 block h-8 w-8 rounded border border-accent-300/25 bg-accent-300/10" />
      <p className="truncate text-[9px] font-bold uppercase tracking-[0.08em] text-slate-200">{label}</p>
    </div>
  );
}

function DataStack({ label }: { label: string }) {
  return (
    <div className="rounded-lg border border-sky-300/30 bg-base-900/66 p-4 text-center shadow-[0_12px_32px_rgba(0,0,0,0.28)] backdrop-blur-md">
      <div className="mb-3 space-y-2">
        {[0, 1, 2].map((item) => (
          <span key={item} className="block h-6 rounded-[50%] border border-sky-200/35 bg-sky-200/10" />
        ))}
      </div>
      <p className="truncate text-[10px] font-bold uppercase tracking-[0.1em] text-slate-100">{label}</p>
    </div>
  );
}
