import { useCallback, useEffect, useRef, useState } from "react";
import Seo from "../components/seo/Seo";
import "./wedding.css";

const wedding = {
  couple: "Айжигит & Айдай",
  date: "2026-08-25T17:00:00+05:00",
  dateLabel: "2026-жылдын 25-августу",
  timeLabel: "17:00",
  venue: "Palazzo банкеттик залы",
  address: "Бишкек ш., Сухэ-Батор көч., 3/2",
  mapUrl: "https://yandex.com/maps/?text=Palazzo%20%D0%A1%D1%83%D1%85%D1%8D-%D0%91%D0%B0%D1%82%D0%BE%D1%80%D0%B0%203%2F2%20%D0%91%D0%B8%D1%88%D0%BA%D0%B5%D0%BA",
  rsvpUrl: "https://wa.me/"
};

const slides = ["Башталышы", "Чакыруу", "Күнү жана дареги", "Программа", "Жооп"];

function Photographer() {
  return (
    <div className="story-photographer" aria-hidden="true">
      <span className="story-flash" />
      <svg viewBox="0 0 220 170">
        <g className="story-girl">
        <circle className="story-skin" cx="61" cy="34" r="19" />
        <path className="story-hair" d="M40 37c-3-24 9-33 23-33 18 0 29 14 23 40-5-13-10-22-24-25-7 10-12 15-22 18Z" />
        <path className="story-dress" d="M48 55h26l18 94H27Z" />
        <path className="story-arms" d="m49 66-16 18m39-18 25-30" />
        </g>
        <g className="story-guy">
          <circle className="story-skin" cx="145" cy="36" r="20" />
          <path className="story-guy-hair" d="M125 35c-1-23 11-32 22-32 16 0 25 10 23 30-9-9-27-12-45 2Z" />
          <path className="story-suit" d="M124 58h42l22 92h-82Z" />
          <path className="story-shirt" d="m136 59 10 20 11-20Z" />
          <path className="story-arms" d="m125 70-29 23m69-23 17 29" />
        </g>
        <g className="story-phone"><rect x="91" y="23" width="17" height="29" rx="3" /><circle cx="99.5" cy="27.5" r="1.8" /></g>
      </svg>
    </div>
  );
}

function SceneDecor({ type }: { type: "flowers" | "rings" | "stars" | "cake" }) {
  if (type === "rings") return <div className="story-rings" aria-hidden="true"><i /><i /></div>;
  if (type === "cake") return <div className="story-cake" aria-hidden="true"><i /><i /><i /><b>♥</b></div>;
  if (type === "stars") return <div className="story-stars" aria-hidden="true">✦　·　✧　·　✦</div>;
  return <><div className="story-branch story-branch-left" aria-hidden="true">❦</div><div className="story-branch story-branch-right" aria-hidden="true">❦</div></>;
}

function WeddingAtmosphere() {
  return (
    <div className="story-atmosphere" aria-hidden="true">
      <div className="story-botanical story-botanical-left">
        <span className="story-stem" />
        <i className="story-leaf story-leaf-one" /><i className="story-leaf story-leaf-two" />
        <b className="story-cotton story-cotton-one" /><b className="story-cotton story-cotton-two" />
        <em className="story-rose">✿</em>
      </div>
      <div className="story-botanical story-botanical-right">
        <span className="story-stem" />
        <i className="story-leaf story-leaf-one" /><i className="story-leaf story-leaf-two" />
        <b className="story-cotton story-cotton-one" /><b className="story-cotton story-cotton-two" />
        <em className="story-rose">✿</em>
      </div>
      {Array.from({ length: 12 }, (_, index) => <span className={`story-petal story-petal-${index + 1}`} key={index} />)}
    </div>
  );
}

function getTimeLeft() {
  const difference = Math.max(0, new Date(wedding.date).getTime() - Date.now());
  return {
    күн: Math.floor(difference / 86_400_000),
    саат: Math.floor((difference / 3_600_000) % 24),
    мүнөт: Math.floor((difference / 60_000) % 60)
  };
}

export default function WeddingPage() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  const touchStart = useRef<number | null>(null);

  const goTo = useCallback((index: number) => {
    const next = Math.max(0, Math.min(slides.length - 1, index));
    setDirection(next >= active ? "next" : "prev");
    setActive(next);
  }, [active]);

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const previousLanguage = document.documentElement.lang;
    document.documentElement.lang = "ky";
    return () => { document.documentElement.lang = previousLanguage; };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => goTo((active + 1) % slides.length), active === slides.length - 1 ? 10_000 : 8_000);
    return () => window.clearTimeout(timer);
  }, [active, goTo]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") goTo(active + 1);
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") goTo(active - 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, goTo]);

  const scene = [
    <section className="story-scene story-cover" key="cover">
      <WeddingAtmosphere />
      <SceneDecor type="flowers" />
      <Photographer />
      <div className="story-content story-content-cover">
        <p className="story-eyebrow">Биз үйлөнөбүз</p>
        <h1>Айжигит <span>&</span> Айдай</h1>
        <p className="story-cover-date">25 · 08 · 2026</p>
      </div>
    </section>,
    <section className="story-scene story-letter" key="letter">
      <WeddingAtmosphere />
      <SceneDecor type="rings" />
      <div className="story-content story-paper">
        <span className="story-monogram">A <i>♥</i> A</span>
        <p className="story-eyebrow">Урматтуу туугандар жана достор</p>
        <h2>Кубанычыбызда бирге болуңуздар</h2>
        <div className="story-copy story-invitation-copy">
          <p>Жаңы жашоого бирге кадам таштаган күнүбүздө сиздерди жаныбызда көрүүнү каалайбыз.</p>
          <p>Бул өзгөчө күнүбүздө кубанычыбызды бөлүшүп, ак батаңызды бериңиздер!</p>
        </div>
        <span className="story-signature">Урматтоо менен, Айжигит жана Айдай</span>
      </div>
    </section>,
    <section className="story-scene story-place" key="place">
      <WeddingAtmosphere />
      <SceneDecor type="stars" />
      <div className="story-content story-place-grid">
        <div className="story-big-date"><span>август</span><strong>25</strong><span>шейшемби</span></div>
        <div className="story-place-copy">
          <p className="story-eyebrow">Сиздерди саат {wedding.timeLabel}дө күтөбүз</p>
          <h2>{wedding.venue}</h2>
          <p>{wedding.address}</p>
          <a className="story-primary" href={wedding.mapUrl} target="_blank" rel="noreferrer">Картадан көрүү ↗</a>
        </div>
      </div>
      <div className="story-countdown">{Object.entries(timeLeft).map(([label, value]) => <span key={label}><strong>{value}</strong>{label}</span>)}</div>
    </section>,
    <section className="story-scene story-program" key="program">
      <WeddingAtmosphere />
      <SceneDecor type="cake" />
      <div className="story-content">
        <p className="story-eyebrow">Биздин майрамдык кечебиз</p>
        <h2>Программа</h2>
        <div className="story-schedule">
          <article><time>17:00</time><div><b>Конокторду тосуп алуу</b><span>Жолугуп, кучакташабыз</span></div></article>
          <article><time>17:30</time><div><b>Салтанаттын башталышы</b><span>Эң маанилүү сөздөр айтылат</span></div></article>
          <article><time>18:30</time><div><b>Майрамдык дасторкон</b><span>Музыка, бий жана ак тилектер</span></div></article>
          <article><time>23:00</time><div><b>Кеченин жыйынтыгы</b><span>Майрамдын кооз аякташы</span></div></article>
        </div>
      </div>
    </section>,
    <section className="story-scene story-rsvp" key="rsvp">
      <WeddingAtmosphere />
      <SceneDecor type="flowers" />
      <div className="story-content story-rsvp-card">
        <span className="story-envelope" aria-hidden="true">✉</span>
        <p className="story-eyebrow">10-августка чейин жооп бериңиздер</p>
        <h2>Биз менен бирге болосуздарбы?</h2>
        <p className="story-copy">Катышаарыңызды жана ким менен келериңизди билдирип коюңуздар.</p>
        <a className="story-primary" href={wedding.rsvpUrl} target="_blank" rel="noreferrer">Катышууну ырастоо</a>
        <p className="story-final">Тойдо жолугушканча ♥</p>
      </div>
    </section>
  ][active];

  return (
    <div className="wedding-story" onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }} onTouchEnd={(e) => {
      if (touchStart.current === null) return;
      const distance = touchStart.current - e.changedTouches[0].clientX;
      if (Math.abs(distance) > 45) goTo(active + (distance > 0 ? 1 : -1));
      touchStart.current = null;
    }}>
      <Seo title={`${wedding.couple} — үйлөнүү үлпөтүнө чакыруу`} description={`${wedding.dateLabel} күнүнө үйлөнүү үлпөтүнө чакыруу`} />
      <div className={`story-stage story-${direction} story-theme-${active}`} key={active}>{scene}</div>
      <div className="story-progress" key={`progress-${active}`} style={{ animationDuration: active === slides.length - 1 ? "10s" : "8s" }} />

      <nav className="story-nav" aria-label="Чакыруу баракчалары">
        {slides.map((label, index) => <button key={label} className={index === active ? "active" : ""} onClick={() => goTo(index)} aria-label={label} aria-current={index === active ? "step" : undefined}><span /></button>)}
      </nav>
      <div className="story-step">{String(active + 1).padStart(2, "0")} <span>/</span> {String(slides.length).padStart(2, "0")}</div>
      {active > 0 && <button className="story-arrow story-arrow-prev" onClick={() => goTo(active - 1)} aria-label="Мурунку барак">←</button>}
      {active < slides.length - 1 && <button className="story-arrow story-arrow-next" onClick={() => goTo(active + 1)} aria-label="Кийинки барак">→</button>}
      <p className="story-hint">барактаңыз</p>
    </div>
  );
}
