import { useEffect, useMemo, useState } from "react";
import Seo from "../components/seo/Seo";
import "./wedding.css";

const wedding = {
  couple: "Айжигит & Айдай",
  date: "2026-08-25T17:00:00+05:00",
  dateLabel: "25 августа 2026",
  timeLabel: "17:00",
  venue: "Название площадки",
  address: "Адрес свадебной площадки",
  mapUrl: "https://maps.google.com",
  rsvpUrl: "https://wa.me/"
};

const schedule = [
  ["17:00", "Сбор гостей", "Обнимаемся, знакомимся и настраиваемся на прекрасный вечер"],
  ["17:30", "Церемония", "Самый важный момент, который мы хотим разделить с вами"],
  ["18:30", "Праздничный ужин", "Тёплые слова, музыка, танцы и немного волшебства"],
  ["23:00", "Финал вечера", "Но хорошие воспоминания останутся с нами навсегда"]
];

function MotorcycleAnimation() {
  return (
    <div className="wedding-motorcycle" aria-hidden="true">
      <svg viewBox="0 0 210 120" role="presentation">
        <circle className="wedding-wheel" cx="48" cy="88" r="25" />
        <circle className="wedding-wheel" cx="164" cy="88" r="25" />
        <path className="wedding-bike-frame" d="M48 88 82 49h45l37 39M82 49l32 39H48m66 0 26-52m-13 0h25" />
        <path className="wedding-bike-red" d="M73 54c14-14 41-16 58-4l-15 22H87Z" />
        <circle className="wedding-rider-head" cx="111" cy="22" r="14" />
        <path className="wedding-rider" d="m100 38-19 22 31 9 21-24-17-11Z" />
        <path className="wedding-rider-line" d="m124 44 22 12m-45-9-10 27" />
        <path className="wedding-scarf" d="M99 34C78 27 66 33 53 23c15 2 25-8 47 1Z" />
      </svg>
      <span className="wedding-motion-line wedding-motion-line-one" />
      <span className="wedding-motion-line wedding-motion-line-two" />
    </div>
  );
}

function PhotographerAnimation() {
  return (
    <div className="wedding-photographer" aria-hidden="true">
      <span className="wedding-camera-flash" />
      <svg viewBox="0 0 120 170" role="presentation">
        <circle className="wedding-photographer-skin" cx="61" cy="34" r="19" />
        <path className="wedding-photographer-hair" d="M40 37c-3-24 9-33 23-33 18 0 29 14 23 40-5-13-10-22-24-25-7 10-12 15-22 18Z" />
        <path className="wedding-photographer-dress" d="M48 55h26l18 94H27Z" />
        <path className="wedding-photographer-arm" d="m49 66-23 25m47-25 16 25" />
        <g className="wedding-camera">
          <rect x="16" y="80" width="37" height="25" rx="4" />
          <circle cx="35" cy="92.5" r="8" />
          <path d="M23 80l5-7h11l5 7" />
        </g>
      </svg>
    </div>
  );
}

function getTimeLeft(target: string) {
  const difference = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60)
  };
}

export default function WeddingPage() {
  const targetDate = useMemo(() => wedding.date, []);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => window.clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="wedding-page">
      <Seo title={`${wedding.couple} — свадебное приглашение`} description="Приглашение на нашу свадьбу" />

      <header className="wedding-hero">
        <MotorcycleAnimation />
        <PhotographerAnimation />
        <div className="wedding-flower wedding-flower-left" aria-hidden="true">❦</div>
        <div className="wedding-flower wedding-flower-right" aria-hidden="true">❦</div>
        <div className="wedding-hero-content">
          <p className="wedding-kicker">Мы женимся</p>
          <h1>{wedding.couple}</h1>
          <div className="wedding-rule"><span>♥</span></div>
          <p className="wedding-date">{wedding.dateLabel}</p>
          <a className="wedding-scroll" href="#invitation" aria-label="Перейти к приглашению">↓</a>
        </div>
      </header>

      <main>
        <section className="wedding-section wedding-intro" id="invitation">
          <p className="wedding-kicker">Дорогие родные и друзья</p>
          <h2>Будьте рядом в наш особенный день</h2>
          <p>
            Совсем скоро случится событие, которое наполнит нашу жизнь новым смыслом. Мы будем счастливы,
            если этот день вы проведёте вместе с нами — разделите радость, улыбки и начало нашей семейной истории.
          </p>
        </section>

        <section className="wedding-date-card" aria-label="Дата и место свадьбы">
          <div><span>Август</span><strong>25</strong><span>2026</span></div>
          <div className="wedding-date-details">
            <p>Вторник · {wedding.timeLabel}</p>
            <h2>{wedding.venue}</h2>
            <p>{wedding.address}</p>
            <a href={wedding.mapUrl} target="_blank" rel="noreferrer">Открыть на карте ↗</a>
          </div>
        </section>

        <section className="wedding-section">
          <p className="wedding-kicker">До нашей встречи</p>
          <h2>Считаем дни вместе</h2>
          <div className="wedding-countdown">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div key={label}><strong>{String(value).padStart(2, "0")}</strong><span>{{ days: "дней", hours: "часов", minutes: "минут", seconds: "секунд" }[label]}</span></div>
            ))}
          </div>
        </section>

        <section className="wedding-program">
          <div className="wedding-section">
            <p className="wedding-kicker">План дня</p>
            <h2>Программа вечера</h2>
            <div className="wedding-timeline">
              {schedule.map(([time, title, text]) => (
                <article key={time}>
                  <time>{time}</time>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="wedding-rsvp">
          <div>
            <p className="wedding-kicker">Пожалуйста, ответьте до 10 августа</p>
            <h2>Вы будете с нами?</h2>
            <p>Сообщите нам о своём решении и укажите, с кем вы придёте.</p>
            <a href={wedding.rsvpUrl} target="_blank" rel="noreferrer">Подтвердить участие</a>
          </div>
        </section>
      </main>

      <footer className="wedding-footer">
        <p>С любовью</p><strong>{wedding.couple}</strong><span>{wedding.dateLabel}</span>
      </footer>
    </div>
  );
}
