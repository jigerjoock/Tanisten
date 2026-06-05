interface DigitalDetailVisualProps {
  image: string;
  title: string;
}

export default function DigitalDetailVisual({ image, title }: DigitalDetailVisualProps) {
  return (
    <div className="relative min-h-[300px] overflow-hidden rounded-lg border border-violet-400/25 bg-[#111827] shadow-[0_22px_70px_rgba(139,92,246,0.14)]">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
      <div className="absolute inset-0 bg-gradient-to-br from-base-800/45 via-base-800/80 to-violet-950/80" />
      <div className="relative flex h-full min-h-[300px] flex-col justify-between p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="h-2 w-28 rounded-full bg-violet-300/75" />
          <div className="grid grid-cols-3 gap-1.5">
            <span className="h-2 w-2 rounded-full bg-violet-300/80" />
            <span className="h-2 w-2 rounded-full bg-sky-300/70" />
            <span className="h-2 w-2 rounded-full bg-slate-400/70" />
          </div>
        </div>

        <div className="grid gap-3">
          <div className="rounded-lg border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm">
            <div className="mb-3 h-2 w-24 rounded-full bg-white/35" />
            <div className="grid grid-cols-3 gap-2">
              <span className="h-14 rounded-md border border-violet-300/25 bg-violet-300/15" />
              <span className="h-14 rounded-md border border-sky-300/20 bg-sky-300/10" />
              <span className="h-14 rounded-md border border-white/10 bg-white/[0.07]" />
            </div>
          </div>

          <div className="grid grid-cols-[1fr_0.72fr] gap-3">
            <div className="rounded-lg border border-white/10 bg-white/[0.055] p-4 backdrop-blur-sm">
              <div className="mb-3 h-2 w-20 rounded-full bg-white/30" />
              <div className="space-y-2">
                <span className="block h-2 rounded-full bg-white/20" />
                <span className="block h-2 w-4/5 rounded-full bg-white/15" />
                <span className="block h-2 w-2/3 rounded-full bg-white/10" />
              </div>
            </div>
            <div className="rounded-lg border border-violet-300/20 bg-violet-300/10 p-4 backdrop-blur-sm">
              <div className="mb-3 h-2 w-16 rounded-full bg-violet-200/55" />
              <div className="h-16 rounded-md bg-[linear-gradient(135deg,rgba(167,139,250,0.42),rgba(56,189,248,0.18))]" />
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-200/85">Digital interface</p>
          <p className="mt-2 text-lg font-semibold leading-tight text-white">{title}</p>
        </div>
      </div>
    </div>
  );
}
