import { useRef } from "react";
import type { ServiceCategory, ServiceProduct } from "../../types/serviceCatalog";
import { fallbackServiceImage, serviceProductImages } from "./serviceCatalogAssets";
import { serviceAccentStyles } from "./serviceCatalogStyles";

interface ServiceProductRowProps {
  category: ServiceCategory;
  selectedProductId: string | null;
  onSelectProduct: (product: ServiceProduct) => void;
}

export default function ServiceProductRow({ category, selectedProductId, onSelectProduct }: ServiceProductRowProps) {
  const accent = serviceAccentStyles[category.id];
  const visibleProducts = category.products
    .filter((product) => !product.catalogHidden)
    .sort((first, second) => (first.catalogOrder ?? 100) - (second.catalogOrder ?? 100));
  const scrollRef = useRef<HTMLDivElement>(null);
  const momentumRef = useRef<number | null>(null);
  const dragState = useRef({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
    moved: false,
    pointerType: "",
    lastScrollLeft: 0,
    lastTime: 0,
    velocity: 0
  });

  const stopMomentum = () => {
    if (momentumRef.current !== null) {
      window.cancelAnimationFrame(momentumRef.current);
      momentumRef.current = null;
    }
  };

  const startMomentum = () => {
    if (!scrollRef.current) return;

    let velocity = dragState.current.velocity;
    const step = () => {
      if (!scrollRef.current || Math.abs(velocity) < 0.02) {
        momentumRef.current = null;
        return;
      }

      scrollRef.current.scrollLeft += velocity * 16;
      velocity *= 0.92;
      momentumRef.current = window.requestAnimationFrame(step);
    };

    momentumRef.current = window.requestAnimationFrame(step);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    if (event.pointerType === "mouse") {
      stopMomentum();
    }

    dragState.current = {
      isDragging: true,
      startX: event.clientX,
      scrollLeft: scrollRef.current.scrollLeft,
      moved: false,
      pointerType: event.pointerType,
      lastScrollLeft: scrollRef.current.scrollLeft,
      lastTime: performance.now(),
      velocity: 0
    };
    if (event.pointerType === "mouse") {
      scrollRef.current.setPointerCapture(event.pointerId);
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = dragState.current;
    if (!state.isDragging || !scrollRef.current) return;

    const delta = event.clientX - state.startX;
    if (Math.abs(delta) > 12) {
      state.moved = true;
    }

    if (state.pointerType !== "mouse") {
      return;
    }

    const nextScrollLeft = state.scrollLeft - delta;
    scrollRef.current.scrollLeft = nextScrollLeft;

    const now = performance.now();
    const elapsed = now - state.lastTime;
    if (elapsed > 0) {
      state.velocity = (nextScrollLeft - state.lastScrollLeft) / elapsed;
      state.lastScrollLeft = nextScrollLeft;
      state.lastTime = now;
    }
  };

  const stopDragging = () => {
    const shouldContinue =
      dragState.current.pointerType === "mouse" && dragState.current.isDragging && dragState.current.moved;
    dragState.current.isDragging = false;
    if (shouldContinue) {
      startMomentum();
    }
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = dragState.current;
    const wasMoved = state.moved;

    stopDragging();

    if (wasMoved) {
      state.moved = false;
      return;
    }

    const element = document.elementFromPoint(event.clientX, event.clientY);
    const productElement = element?.closest("[data-product-id]");
    const productId = productElement?.getAttribute("data-product-id");
    const product = category.products.find((item) => item.id === productId);

    if (product) {
      onSelectProduct(product);
    }
  };

  const handleKeyboardSelect = (product: ServiceProduct) => {
    if (dragState.current.moved) {
      dragState.current.moved = false;
      return;
    }

    onSelectProduct(product);
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={stopDragging}
        onPointerLeave={stopDragging}
        className="flex cursor-grab select-none gap-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden active:cursor-grabbing"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {visibleProducts.map((product) => {
          const isSelected = product.id === selectedProductId;
          const cardTitle = product.cardTitle ?? product.title;
          const cardDescription = product.cardDescription ?? product.description;

          return (
            <button
              key={product.id}
              type="button"
              data-product-id={product.id}
              onClick={(event) => {
                if (event.detail === 0) {
                  handleKeyboardSelect(product);
                }
              }}
              className={`group relative flex min-h-[300px] w-[315px] shrink-0 flex-col overflow-hidden rounded-lg border text-left transition duration-300 hover:-translate-y-1 ${
                isSelected
                  ? `${accent.border} bg-[#172033] text-white ${accent.shadow}`
                  : `${accent.hoverBorder} border-slate-800 bg-base-700/80 text-slate-300 hover:bg-[#172033]/75`
              }`}
            >
              <div className={`absolute left-0 top-0 h-1 w-16 transition-all duration-300 group-hover:w-24 ${isSelected ? accent.line : "bg-slate-700"}`} />
              <img
                src={serviceProductImages[product.id] ?? fallbackServiceImage}
                alt=""
                draggable={false}
                loading="lazy"
                decoding="async"
                className="h-36 w-full object-cover opacity-90 transition duration-300 group-hover:opacity-100"
              />
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h4 className="min-w-0 break-words text-lg font-semibold leading-tight text-white [overflow-wrap:anywhere] [hyphens:auto]">
                    {cardTitle}
                  </h4>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-400">{cardDescription}</p>
                </div>
                <span className={`mt-5 h-2 w-2 rounded-full ${isSelected ? accent.line : "bg-slate-600 group-hover:bg-slate-400"}`} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
