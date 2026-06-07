interface EngineeringDetailVisualProps {
  image: string;
  productId: string;
  title: string;
}

export default function EngineeringDetailVisual({ image, productId, title }: EngineeringDetailVisualProps) {
  return (
    <div className="relative min-h-[300px] overflow-hidden rounded-lg border border-blue-300/25 bg-[#111827] shadow-[0_22px_70px_rgba(77,163,255,0.13)]">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40 saturate-90" />
      <div className="absolute inset-0 bg-gradient-to-br from-base-800/52 via-base-800/84 to-blue-950/78" />
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="relative flex h-full min-h-[300px] flex-col justify-between p-5">
        <VisualTopBar />
        <EngineeringVisualScheme productId={productId} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-200/85">Engineering scope</p>
          <p className="mt-2 break-words text-lg font-semibold leading-tight text-white [overflow-wrap:anywhere]">{title}</p>
        </div>
      </div>
    </div>
  );
}

function VisualTopBar() {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="h-2 w-28 rounded-full bg-blue-300/75" />
      <div className="grid grid-cols-3 gap-1.5">
        <span className="h-2 w-2 rounded-full bg-blue-300/80" />
        <span className="h-2 w-2 rounded-full bg-accent-300/70" />
        <span className="h-2 w-2 rounded-full bg-slate-400/70" />
      </div>
    </div>
  );
}

function EngineeringVisualScheme({ productId }: { productId: string }) {
  switch (productId) {
    case "product-development-support":
      return <DevelopmentScheme />;
    case "mechanical-design-cad":
      return <CadScheme />;
    case "aerospace-structural-design-support":
      return <AerospaceScheme />;
    case "semiconductor-equipment-engineering":
      return <SemiconductorScheme />;
    case "technical-documentation":
      return <DocumentationScheme />;
    case "design-changes-product-updates":
      return <ChangeScheme />;
    case "supplier-manufacturing-coordination":
      return <SupplierScheme />;
    case "engineering-contracting":
      return <ContractingScheme />;
    default:
      return <CadScheme />;
  }
}

function DevelopmentScheme() {
  return (
    <div className="grid grid-cols-3 gap-2">
      <StageCard label="Concept" />
      <StageCard label="Design" accent />
      <StageCard label="Release" />
    </div>
  );
}

function CadScheme() {
  return (
    <div className="grid grid-cols-[1fr_0.9fr] gap-3">
      <ModelFrame />
      <DrawingFrame />
    </div>
  );
}

function AerospaceScheme() {
  return (
    <div className="grid grid-cols-[1.05fr_0.95fr] gap-3">
      <StructureFrame />
      <PanelStack labels={["Frame", "Bracket", "Panel"]} />
    </div>
  );
}

function SemiconductorScheme() {
  return (
    <div className="grid grid-cols-[0.9fr_1.1fr] gap-3">
      <ModuleStack />
      <InterfaceFrame />
    </div>
  );
}

function DocumentationScheme() {
  return (
    <div className="grid grid-cols-3 gap-2">
      <DocTile label="Drawings" />
      <DocTile label="BOM" accent />
      <DocTile label="Review" />
    </div>
  );
}

function ChangeScheme() {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
      <RevisionCard label="Rev A" />
      <span className="h-px w-8 bg-gradient-to-r from-blue-300/20 via-blue-200/80 to-accent-300/20" />
      <RevisionCard label="Rev B" accent />
    </div>
  );
}

function SupplierScheme() {
  return (
    <div className="grid grid-cols-[0.9fr_1.1fr_0.9fr] gap-2">
      <StageCard label="Engineering" />
      <StageCard label="Package" accent />
      <StageCard label="Supplier" />
    </div>
  );
}

function ContractingScheme() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <WorkPackage label="Work package" />
      <WorkPackage label="Remote support" accent />
      <WorkPackage label="Reviews" />
      <WorkPackage label="Handover" />
    </div>
  );
}

function StageCard({ label, accent = false }: { label: string; accent?: boolean }) {
  return (
    <div className={`min-w-0 rounded-lg border p-3 shadow-[0_12px_32px_rgba(0,0,0,0.28)] backdrop-blur-md ${accent ? "border-blue-300/42 bg-blue-950/58" : "border-white/18 bg-base-900/66"}`}>
      <span className={`mb-3 block h-8 w-8 rounded-md border ${accent ? "border-blue-200/45 bg-blue-300/14" : "border-accent-200/30 bg-accent-300/10"}`} />
      <p className="truncate text-[9px] font-bold uppercase tracking-[0.08em] text-slate-100">{label}</p>
    </div>
  );
}

function ModelFrame() {
  return (
    <div className="rounded-lg border border-blue-300/32 bg-base-900/68 p-4 shadow-[0_12px_32px_rgba(0,0,0,0.28)] backdrop-blur-md">
      <div className="relative h-28">
        <span className="absolute left-5 top-4 h-16 w-16 rotate-45 rounded-md border border-blue-200/55 bg-blue-300/12" />
        <span className="absolute left-14 top-8 h-16 w-16 rotate-45 rounded-md border border-accent-200/40 bg-accent-300/10" />
        <span className="absolute bottom-3 left-4 right-6 h-px bg-blue-200/30" />
      </div>
    </div>
  );
}

function DrawingFrame() {
  return (
    <div className="rounded-lg border border-white/18 bg-base-900/66 p-4 shadow-[0_12px_32px_rgba(0,0,0,0.28)] backdrop-blur-md">
      <div className="mb-3 h-2 w-20 rounded-full bg-blue-200/55" />
      <div className="grid grid-cols-2 gap-2">
        <span className="h-14 rounded border border-blue-200/30 bg-blue-300/10" />
        <span className="h-14 rounded border border-white/16 bg-white/[0.06]" />
      </div>
      <div className="mt-3 space-y-1.5">
        <span className="block h-1.5 rounded-full bg-white/20" />
        <span className="block h-1.5 w-4/5 rounded-full bg-white/14" />
      </div>
    </div>
  );
}

function StructureFrame() {
  return (
    <div className="rounded-lg border border-blue-300/32 bg-base-900/68 p-4 shadow-[0_12px_32px_rgba(0,0,0,0.28)] backdrop-blur-md">
      <div className="relative h-28 overflow-hidden rounded-md border border-white/12 bg-white/[0.04]">
        <span className="absolute left-4 top-5 h-px w-40 rotate-12 bg-blue-200/55" />
        <span className="absolute left-3 top-12 h-px w-44 -rotate-6 bg-blue-200/40" />
        <span className="absolute left-10 top-3 h-24 w-px rotate-12 bg-accent-200/40" />
        <span className="absolute right-12 top-4 h-24 w-px -rotate-12 bg-accent-200/30" />
      </div>
    </div>
  );
}

function PanelStack({ labels }: { labels: string[] }) {
  return (
    <div className="grid gap-2">
      {labels.map((label) => (
        <div key={label} className="rounded-md border border-white/18 bg-base-900/66 px-3 py-2 shadow-[0_8px_22px_rgba(0,0,0,0.22)] backdrop-blur-md">
          <span className="mb-2 block h-1.5 w-12 rounded-full bg-blue-200/55" />
          <p className="truncate text-[9px] font-bold uppercase tracking-[0.08em] text-slate-100">{label}</p>
        </div>
      ))}
    </div>
  );
}

function ModuleStack() {
  return (
    <div className="grid gap-2">
      {[0, 1, 2].map((item) => (
        <span key={item} className="h-10 rounded-md border border-blue-300/28 bg-base-900/66 shadow-[0_8px_22px_rgba(0,0,0,0.22)] backdrop-blur-md" />
      ))}
    </div>
  );
}

function InterfaceFrame() {
  return (
    <div className="rounded-lg border border-blue-300/32 bg-base-900/68 p-4 shadow-[0_12px_32px_rgba(0,0,0,0.28)] backdrop-blur-md">
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <span key={index} className={`h-10 rounded border ${index === 1 || index === 4 ? "border-accent-200/45 bg-accent-300/14" : "border-blue-200/25 bg-blue-300/10"}`} />
        ))}
      </div>
    </div>
  );
}

function DocTile({ label, accent = false }: { label: string; accent?: boolean }) {
  return (
    <div className={`rounded-lg border p-3 shadow-[0_12px_32px_rgba(0,0,0,0.28)] backdrop-blur-md ${accent ? "border-blue-300/42 bg-blue-950/58" : "border-white/18 bg-base-900/66"}`}>
      <span className="mb-3 block h-12 rounded-md border border-blue-200/30 bg-white/[0.04]" />
      <p className="truncate text-[9px] font-bold uppercase tracking-[0.08em] text-slate-100">{label}</p>
    </div>
  );
}

function RevisionCard({ label, accent = false }: { label: string; accent?: boolean }) {
  return (
    <div className={`rounded-lg border p-4 shadow-[0_12px_32px_rgba(0,0,0,0.28)] backdrop-blur-md ${accent ? "border-blue-300/42 bg-blue-950/58" : "border-white/18 bg-base-900/66"}`}>
      <span className="mb-3 block h-2 w-20 rounded-full bg-blue-200/55" />
      <span className="mb-2 block h-1.5 rounded-full bg-white/20" />
      <span className="block h-1.5 w-4/5 rounded-full bg-white/14" />
      <p className="mt-3 truncate text-[10px] font-bold uppercase tracking-[0.1em] text-slate-100">{label}</p>
    </div>
  );
}

function WorkPackage({ label, accent = false }: { label: string; accent?: boolean }) {
  return (
    <div className={`rounded-lg border p-4 shadow-[0_10px_26px_rgba(0,0,0,0.24)] backdrop-blur-md ${accent ? "border-blue-300/42 bg-blue-950/58" : "border-white/18 bg-base-900/66"}`}>
      <span className="mb-3 block h-2 w-16 rounded-full bg-blue-200/55" />
      <p className="truncate text-[10px] font-bold uppercase tracking-[0.09em] text-slate-100">{label}</p>
    </div>
  );
}
