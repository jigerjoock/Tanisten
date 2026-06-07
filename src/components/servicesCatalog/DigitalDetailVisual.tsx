interface DigitalDetailVisualProps {
  image: string;
  productId: string;
  title: string;
}

export default function DigitalDetailVisual({ image, productId, title }: DigitalDetailVisualProps) {
  return (
    <div className="relative min-h-[300px] overflow-hidden rounded-lg border border-violet-400/25 bg-[#111827] shadow-[0_22px_70px_rgba(139,92,246,0.14)]">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
      <div className="absolute inset-0 bg-gradient-to-br from-base-800/45 via-base-800/80 to-violet-950/80" />
      <div className="relative flex h-full min-h-[300px] flex-col justify-between p-5">
        <VisualTopBar />

        <DigitalVisualScheme productId={productId} />

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-200/85">Digital interface</p>
          <p className="mt-2 break-words text-lg font-semibold leading-tight text-white [overflow-wrap:anywhere]">{title}</p>
        </div>
      </div>
    </div>
  );
}

function VisualTopBar() {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="h-2 w-28 rounded-full bg-violet-300/75" />
      <div className="grid grid-cols-3 gap-1.5">
        <span className="h-2 w-2 rounded-full bg-violet-300/80" />
        <span className="h-2 w-2 rounded-full bg-sky-300/70" />
        <span className="h-2 w-2 rounded-full bg-slate-400/70" />
      </div>
    </div>
  );
}

function DigitalVisualScheme({ productId }: { productId: string }) {
  switch (productId) {
    case "business-portals":
      return <BusinessPortalScheme />;
    case "customer-platforms":
      return <CustomerPlatformScheme />;
    case "internal-company-tools":
      return <InternalToolsScheme />;
    case "booking-scheduling-systems":
      return <BookingScheme />;
    case "dashboards-reporting-systems":
      return <DashboardScheme />;
    case "company-websites":
      return <WebsiteScheme />;
    default:
      return <CustomerPlatformScheme />;
  }
}

function BusinessPortalScheme() {
  return (
    <div className="grid grid-cols-[0.72fr_1.1fr_0.72fr] items-center gap-3">
      <PersonNode label="USER" />
      <PortalWindow />
      <PersonNode label="AI" variant="ai" />
    </div>
  );
}

function CustomerPlatformScheme() {
  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-[1fr_0.45fr] gap-3">
        <PortalWindow compact />
        <DatabaseStack />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <MiniPanel label="Login" />
        <MiniPanel label="Requests" />
        <MiniPanel label="Status" />
      </div>
    </div>
  );
}

function InternalToolsScheme() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <ToolPanel icon="gear" label="Workflow" />
      <ToolPanel icon="wrench" label="Tools" />
      <ToolPanel icon="driver" label="Admin" />
      <ToolPanel icon="table" label="Data" />
      <ToolPanel icon="forms" label="Forms" />
      <ToolPanel icon="export" label="Export" />
    </div>
  );
}

function BookingScheme() {
  return (
    <div className="grid gap-3">
      <div className="rounded-lg border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm">
        <div className="mb-3 grid grid-cols-7 gap-1.5">
          {Array.from({ length: 7 }).map((_, index) => (
            <span key={index} className="h-1.5 rounded-full bg-white/25" />
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {Array.from({ length: 21 }).map((_, index) => (
            <span
              key={index}
              className={`h-6 rounded border ${
                [8, 9, 15].includes(index)
                  ? "border-violet-300/45 bg-violet-300/25"
                  : "border-white/10 bg-white/[0.05]"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-[1fr_0.7fr] gap-3">
        <MiniPanel label="Availability" />
        <MiniPanel label="Confirm" accent />
      </div>
    </div>
  );
}

function DashboardScheme() {
  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-3 gap-2">
        <MetricCard value="KPI" />
        <MetricCard value="CSV" />
        <MetricCard value="API" />
      </div>
      <div className="rounded-lg border border-white/10 bg-white/[0.055] p-4 backdrop-blur-sm">
        <div className="flex h-24 items-end gap-2">
          {[34, 58, 46, 74, 62, 88, 69].map((height, index) => (
            <span
              key={index}
              className="flex-1 rounded-t bg-[linear-gradient(180deg,rgba(196,181,253,0.68),rgba(56,189,248,0.18))]"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function WebsiteScheme() {
  return (
    <div className="grid gap-3">
      <div className="rounded-lg border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm">
        <div className="mb-4 h-2 w-24 rounded-full bg-violet-200/55" />
        <div className="grid grid-cols-[1fr_0.75fr] gap-3">
          <div className="space-y-2">
            <span className="block h-3 rounded-full bg-white/25" />
            <span className="block h-3 w-4/5 rounded-full bg-white/18" />
            <span className="block h-3 w-2/3 rounded-full bg-white/14" />
          </div>
          <div className="h-20 rounded-md border border-sky-300/20 bg-sky-300/10" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <MiniPanel label="SEO" />
        <MiniPanel label="Forms" />
        <MiniPanel label="Pages" />
      </div>
    </div>
  );
}

function PersonNode({ label, variant = "user" }: { label: string; variant?: "user" | "ai" }) {
  return (
    <div className="rounded-lg border border-white/18 bg-base-900/68 p-4 text-center shadow-[0_12px_32px_rgba(0,0,0,0.28)] backdrop-blur-md">
      <div className="relative mx-auto h-14 w-14 rounded-full border border-violet-300/30 bg-violet-300/10">
        {variant === "ai" ? (
          <>
            <span className="absolute left-3 right-3 top-4 h-2 rounded-full bg-sky-300/65" />
            <span className="absolute bottom-4 left-4 h-2 w-2 rounded-full bg-violet-200/75" />
            <span className="absolute bottom-4 right-4 h-2 w-2 rounded-full bg-violet-200/75" />
          </>
        ) : (
          <>
            <span className="absolute left-1/2 top-3 h-4 w-4 -translate-x-1/2 rounded-full bg-violet-200/75" />
            <span className="absolute bottom-3 left-3 right-3 h-5 rounded-t-full bg-sky-200/35" />
          </>
        )}
      </div>
      <p className="mt-3 truncate text-[10px] font-bold uppercase tracking-[0.1em] text-violet-100/80">{label}</p>
    </div>
  );
}

function PortalWindow({ compact = false }: { compact?: boolean }) {
  return (
    <div className="rounded-lg border border-violet-300/35 bg-base-900/68 p-4 shadow-[0_12px_32px_rgba(0,0,0,0.28)] backdrop-blur-md">
      <div className="mb-3 h-2 w-20 rounded-full bg-violet-200/60" />
      <div className={`grid ${compact ? "grid-cols-2" : "grid-cols-3"} gap-2`}>
        <span className="h-12 rounded-md border border-violet-300/25 bg-violet-300/15" />
        <span className="h-12 rounded-md border border-sky-300/20 bg-sky-300/10" />
        {!compact ? <span className="h-12 rounded-md border border-white/10 bg-white/[0.07]" /> : null}
      </div>
      <div className="mt-3 space-y-1.5">
        <span className="block h-1.5 rounded-full bg-white/22" />
        <span className="block h-1.5 w-4/5 rounded-full bg-white/14" />
      </div>
    </div>
  );
}

function DatabaseStack() {
  return (
    <div className="rounded-lg border border-sky-300/30 bg-base-900/66 p-4 shadow-[0_12px_32px_rgba(0,0,0,0.28)] backdrop-blur-md">
      <div className="space-y-2">
        {[0, 1, 2].map((item) => (
          <span key={item} className="block h-8 rounded-[50%] border border-sky-200/35 bg-sky-200/10" />
        ))}
      </div>
    </div>
  );
}

function ToolPanel({ icon, label }: { icon: "gear" | "wrench" | "driver" | "table" | "forms" | "export"; label: string }) {
  return (
    <div className="rounded-lg border border-white/18 bg-base-900/66 p-3 text-center shadow-[0_10px_26px_rgba(0,0,0,0.24)] backdrop-blur-md">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md border border-violet-300/25 bg-violet-300/10">
        <ToolIcon icon={icon} />
      </div>
      <p className="mt-2 truncate text-[10px] font-bold uppercase tracking-[0.08em] text-slate-200">{label}</p>
    </div>
  );
}

function ToolIcon({ icon }: { icon: "gear" | "wrench" | "driver" | "table" | "forms" | "export" }) {
  if (icon === "gear") {
    return <span className="h-6 w-6 rounded-full border-4 border-violet-200/75 outline outline-2 outline-offset-2 outline-sky-200/35" />;
  }

  if (icon === "wrench") {
    return <span className="h-7 w-2 rotate-45 rounded-full bg-sky-200/65 before:block before:h-3 before:w-5 before:-translate-x-1.5 before:-translate-y-1 before:rounded-full before:border-2 before:border-violet-200/70 before:bg-transparent" />;
  }

  if (icon === "driver") {
    return <span className="h-7 w-1.5 rotate-45 rounded-full bg-violet-200/70 before:block before:h-3 before:w-3 before:-translate-x-[3px] before:-translate-y-1 before:rounded-sm before:bg-sky-200/55" />;
  }

  if (icon === "table") {
    return <span className="grid h-6 w-7 grid-cols-2 gap-1">{Array.from({ length: 4 }).map((_, index) => <i key={index} className="rounded-sm bg-sky-200/45" />)}</span>;
  }

  if (icon === "forms") {
    return <span className="space-y-1">{Array.from({ length: 3 }).map((_, index) => <i key={index} className="block h-1.5 w-7 rounded-full bg-violet-200/65" />)}</span>;
  }

  return <span className="h-5 w-6 border-b-2 border-r-2 border-sky-200/70 before:block before:h-3 before:w-3 before:translate-x-2 before:-translate-y-1 before:rotate-45 before:border-r-2 before:border-t-2 before:border-violet-200/70" />;
}

function MiniPanel({ label, accent = false }: { label: string; accent?: boolean }) {
  return (
    <div className={`rounded-md border p-3 text-xs font-semibold text-slate-100 shadow-[0_8px_22px_rgba(0,0,0,0.22)] backdrop-blur-md ${accent ? "border-violet-300/45 bg-violet-950/55" : "border-white/18 bg-base-900/62"}`}>
      <span className="mb-2 block h-1.5 w-10 rounded-full bg-white/30" />
      <span className="block truncate">{label}</span>
    </div>
  );
}

function MetricCard({ value }: { value: string }) {
  return (
    <div className="rounded-md border border-violet-300/35 bg-violet-950/55 p-3 text-center text-sm font-bold text-white shadow-[0_8px_22px_rgba(0,0,0,0.22)] backdrop-blur-md">
      <span className="mb-2 block h-1.5 rounded-full bg-violet-200/55" />
      <span className="block truncate">{value}</span>
    </div>
  );
}
