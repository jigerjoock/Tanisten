import { AnimatePresence, motion } from "framer-motion";
import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import weddingMusic from "../assets/wedding-music.mp3";
import Seo from "../components/seo/Seo";
import { findWeddingGuest, findWeddingInviter } from "../data/weddingGuests";
import "./wedding.css";

type Language = "ky" | "ru";
type WeddingStyle = "silver" | "palazzo";
type Screen = "home" | "location" | "route" | "program" | "table" | "wishes" | "games" | "gallery" | "rsvp";

const weddingDate = new Date("2026-08-25T17:00:00+05:00");
const venues = { ky: "Palazzo банкеттик залы", ru: "Банкетный зал Palazzo" };
const addresses = { ky: "Бишкек ш., Сухэ-Батор көчөсү, 3/2", ru: "г. Бишкек, ул. Сухэ-Батора, 3/2" };

const copy = {
  ky: {
    welcome: "Салтанатта чоогу болуңуз",
    date: "25-август, 2026",
    monthYear: "август, 2026",
    open: "Чакырууну ачуу",
    days: "күн", hours: "саат", minutes: "мүнөт",
    subtitleFamily: "Сизди үйлөнүү үлпөт тойго чакырабыз", subtitleCouple: "Сизди үйлөнүү үлпөт тоюма чакырам",
    remaining: "калды",
    responseNote: "Сиздин жообуңуз биз үчүн маанилүү",
    seating: "Отургузуу", guestBook: "Каалоо китеби", moments: "Тойдогу көз ирмемдер", gallery: "Сүрөттөр",
    guestFallback: "Конок", plan: "План", planPending: "Отуруу ирети тойго жакын белгилүү болот", galleryPending: "Сүрөттөрдү жүктөө тойго жакын жеткиликтүү болот",
    greetingMale: "Урматтуу", greetingFemale: "Урматтуу", greetingUnknown: "Урматтуу",
    cards: ["Орун", "Жол", "Программа", "Менин столум", "Каалоо", "Оюндар", "Сүрөттөр", "RSVP"],
    home: "Башкы", music: "Музыка", language: "Кыргызча",
    back: "Артка", map: "Картадан ачуу", copy: "Даректи көчүрүү", call: "Уюштуруучуга жазуу",
    locationTitle: "Сиздерди күтөбүз", programTitle: "Кеченин программасы",
    tableTitle: "Сиздин ордуңуз", tableHint: "Коноктун аты-жөнүн жазыңыз", find: "Столду табуу",
    wishesTitle: "Жылуу каалооңуз", wishesHint: "Бизге жүрөктөн чыккан сөздөрүңүздү калтырыңыз",
    name: "Атыңыз", wish: "Каалооңуз", media: "Сүрөт же видео", send: "Жөнөтүү",
    gamesTitle: "Эстеликке айланган оюндар", galleryTitle: "Сиздердин көзүңүздөр менен",
    rsvpTitle: "Биз менен бирге болосузбу?", yes: "Ооба", no: "Жок", transport: "Транспорт керек",
    confirm: "Жоопту ырастоо", success: "Рахмат! Жообуңуз кабыл алынды.", tableResult: "Сиздин столуңуз — № 8"
  },
  ru: {
    welcome: "Добро пожаловать на нашу свадьбу",
    date: "25 августа 2026",
    monthYear: "август 2026",
    open: "Открыть приглашение",
    days: "дней", hours: "часов", minutes: "минут",
    subtitleFamily: "Приглашаем Вас на свадебное торжество", subtitleCouple: "Приглашаю Вас на свою свадьбу",
    remaining: "осталось",
    responseNote: "Ваш ответ очень важен для нас",
    seating: "Рассадка", guestBook: "Книга пожеланий", moments: "Свадебные моменты", gallery: "Фотографии",
    guestFallback: "Гость", plan: "План", planPending: "Порядок рассадки будет известен ближе к торжеству", galleryPending: "Загрузка фотографий станет доступна ближе к дате торжества",
    greetingMale: "Уважаемый", greetingFemale: "Уважаемая", greetingUnknown: "Уважаемый гость",
    cards: ["Место", "Маршрут", "Программа", "Мой стол", "Пожелания", "Игры", "Фотографии", "RSVP"],
    home: "Главная", music: "Музыка", language: "Русский",
    back: "Назад", map: "Открыть карту", copy: "Скопировать адрес", call: "Написать организатору",
    locationTitle: "Мы ждём вас", programTitle: "Программа вечера",
    tableTitle: "Ваше место", tableHint: "Введите имя и фамилию гостя", find: "Найти стол",
    wishesTitle: "Ваше тёплое пожелание", wishesHint: "Оставьте нам несколько слов от сердца",
    name: "Ваше имя", wish: "Пожелание", media: "Фото или видео", send: "Отправить",
    gamesTitle: "Игры, которые станут воспоминаниями", galleryTitle: "Свадьба вашими глазами",
    rsvpTitle: "Вы будете с нами?", yes: "Да", no: "Нет", transport: "Нужен транспорт",
    confirm: "Подтвердить ответ", success: "Спасибо! Ваш ответ принят.", tableResult: "Ваш стол — № 8"
  }
};

const icons = ["⌖", "↗", "◷", "⌑", "✉", "✦", "▧", "♡"];
const utilityScreens: Screen[] = ["table", "wishes", "games", "gallery"];
const utilityCardIndexes = [3, 4, 5, 6];
const timelines = {
  ky: [["17:00", "Конокторду тосуп алуу"], ["17:30", "Салтанат"], ["18:30", "Майрамдык дасторкон"], ["23:00", "Кеченин жыйынтыгы"]],
  ru: [["17:00", "Сбор гостей"], ["17:30", "Церемония"], ["18:30", "Праздничный ужин"], ["23:00", "Финал вечера"]]
};
const games = {
  ky: [["Той тапшырмасы", "Романтикалык тапшырманы аткарыңыз"], ["Жубайлар тууралуу суроолор", "Жубайларды ким жакшы билет?"], ["Тагдыр гүлү", "Гүлдүн бир желекчесин тандаңыз"], ["Жашыруун кат", "Биринчи жылдыкка кат калтырыңыз"]],
  ru: [["Свадебный квест", "Выполните романтическое задание"], ["Викторина о паре", "Кто лучше всех знает молодожёнов?"], ["Цветок судьбы", "Выберите один лепесток"], ["Тайное послание", "Оставьте письмо к первой годовщине"]]
};

function Logo({ compact = false, original = false, shimmer = false }: { compact?: boolean; original?: boolean; shimmer?: boolean }) {
  return <div className={`wapp-logo ${compact ? "compact" : ""} ${shimmer ? "shimmer" : ""}`}>{original ? "AIDAI" : "Айжигит"} <span>✿</span> {original ? "Айжигит" : "Айдай"}</div>;
}

function BotanicalCorners() {
  return <div className="wapp-botanical" aria-hidden="true"><span className="wapp-flower one">❀</span><span className="wapp-flower two">❁</span><i className="leaf a" /><i className="leaf b" /><i className="leaf c" /></div>;
}

function WhatsAppIcon() {
  return <svg className="wapp-whatsapp" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.8a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.3-4.4a8.4 8.4 0 1 1 15.7-4.3Z" /><path d="M8.2 7.5c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.8 2c.1.3 0 .5-.2.7l-.6.7c-.2.2-.1.4 0 .6.7 1.2 1.6 2.1 2.8 2.7.2.1.4.1.6-.1l.8-1c.2-.2.4-.3.7-.2l1.9.9c.3.1.4.3.4.5 0 .4-.2 1.4-.8 2-.5.5-1.3.8-2.2.6-1.1-.2-2.7-.8-4.4-2.3-2-1.8-3.2-4-3.5-5.1-.3-.9 0-1.5.1-1.8Z" /></svg>;
}

function SilverOrnaments() {
  return <div className="wapp-silver-ornaments" aria-hidden="true">{["tl", "tr", "br", "bl"].map((corner) => <svg className={corner} key={corner} viewBox="0 0 86 86"><path d="M4 82V29C4 15 15 4 29 4H82" /><path d="M11 82V33C11 21 21 11 33 11H82" /><path d="M19 64V38C19 27 27 19 38 19H64" /><path d="M4 49c25 0 45-20 45-45M11 59c27 0 48-21 48-48" /><path className="gem" d="m19 12 7 7-7 7-7-7 7-7Z" /></svg>)}</div>;
}

function PalazzoBackdrop() {
  return <div className="wapp-palazzo-backdrop" aria-hidden="true">
    <i className="line left" /><i className="line right" />
    <i className="carving left top" /><i className="carving right top" />
    <i className="carving left bottom" /><i className="carving right bottom" />
    <i className="mark top" /><i className="mark bottom" />
  </div>;
}

function countdown() {
  const ms = Math.max(0, weddingDate.getTime() - Date.now());
  return { days: Math.floor(ms / 86400000), hours: Math.floor(ms / 3600000) % 24, minutes: Math.floor(ms / 60000) % 60 };
}

export default function WeddingPage() {
  const [screen, setScreen] = useState<Screen>("home");
  const [language, setLanguage] = useState<Language>("ky");
  const [weddingStyle, setWeddingStyle] = useState<WeddingStyle>(() => Math.random() < .5 ? "silver" : "palazzo");
  const [entered, setEntered] = useState(false);
  const [clock, setClock] = useState(countdown);
  const [music, setMusic] = useState(false);
  const [rsvp, setRsvp] = useState("yes");
  const [confirmed, setConfirmed] = useState(false);
  const [wishSent, setWishSent] = useState(false);
  const [uploads, setUploads] = useState<string[]>([]);
  const [invitationVisible, setInvitationVisible] = useState(false);
  const [invitationReady, setInvitationReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const t = copy[language];
  const venue = venues[language];
  const address = addresses[language];
  const timeline = timelines[language];
  const guestParameter = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("guest") ?? params.get("name");
  }, []);
  const guestRecord = useMemo(() => findWeddingGuest(guestParameter), [guestParameter]);
  const isGroupInvitation = guestParameter?.trim().toLocaleLowerCase() === "guest";
  const guestName = guestRecord?.name ?? guestParameter?.trim().slice(0, 80) ?? t.guestFallback;
  const inviterName = findWeddingInviter(guestRecord?.inviterId)?.name || findWeddingInviter(1)?.name || "Асанбай Табанович";
  const greeting = language === "ky" ? t.greetingUnknown : guestRecord?.gender === "female" ? t.greetingFemale : guestRecord?.gender === "male" ? t.greetingMale : t.greetingUnknown;
  const invitationText = guestRecord && guestRecord.inviterId >= 3 ? t.subtitleCouple : t.subtitleFamily;
  const invitationLetter = useMemo(() => {
    if (isGroupInvitation) {
      return language === "ky"
        ? "Урматтуу биздин ардактуу конокторубуз!\n\nСиздерди Айжигит & Айдай үйлөнүү үлпөт тоюна чакырабыз!"
        : "Дорогие наши почётные гости!\n\nПриглашаем вас на свадьбу Айжигита и Айдай!";
    }
    const salutation = `${greeting} ${guestName}!`;
    return `${salutation}\n\n${invitationText}\n\n${inviterName}`;
  }, [greeting, guestName, invitationText, inviterName, isGroupInvitation, language]);

  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = language;
    return () => { document.documentElement.lang = previous; };
  }, [language]);

  useEffect(() => {
    document.documentElement.classList.add("wedding-light-theme");
    document.body.classList.add("wedding-light-theme");
    return () => {
      document.documentElement.classList.remove("wedding-light-theme");
      document.body.classList.remove("wedding-light-theme");
    };
  }, []);

  useEffect(() => {
    const theme = document.querySelector('meta[name="theme-color"]');
    theme?.setAttribute("content", weddingStyle === "palazzo" ? "#160F13" : "#FAF8F3");
  }, [weddingStyle]);

  useEffect(() => {
    const manifest = document.createElement("link");
    manifest.rel = "manifest";
    manifest.href = `${import.meta.env.BASE_URL}wedding-manifest.webmanifest`;
    document.head.appendChild(manifest);
    const theme = document.querySelector('meta[name="theme-color"]');
    const previousTheme = theme?.getAttribute("content");
    theme?.setAttribute("content", "#FAF8F3");
    if ("serviceWorker" in navigator && import.meta.env.PROD) {
      navigator.serviceWorker.register(`${import.meta.env.BASE_URL}wedding-sw.js`, { scope: `${import.meta.env.BASE_URL}wedding` }).catch(() => undefined);
    }
    return () => {
      manifest.remove();
      if (previousTheme) theme?.setAttribute("content", previousTheme);
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setClock(countdown()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const clockItems = useMemo(() => [[clock.days, t.days], [clock.hours, t.hours], [clock.minutes, t.minutes]], [clock, t]);
  const go = (next: Screen) => { setScreen(next); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const playMusic = () => {
    const audio = audioRef.current;
    if (!audio || audio.ended) return;
    if (!audioContextRef.current) {
      const context = new AudioContext();
      const source = context.createMediaElementSource(audio);
      const gain = context.createGain();
      gain.gain.value = 1.5;
      source.connect(gain).connect(context.destination);
      audioContextRef.current = context;
      gainRef.current = gain;
    }
    void audioContextRef.current.resume();
    void audio.play().then(() => setMusic(true)).catch(() => setMusic(false));
  };
  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) playMusic(); else { audio.pause(); setMusic(false); }
  };
  const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    setUploads((current) => [...current, ...files.map((file) => URL.createObjectURL(file))]);
  };

  useEffect(() => {
    if (!entered || screen !== "home") return;
    setInvitationVisible(false);
    setInvitationReady(false);
    window.scrollTo({ top: 0 });
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      const reveal = window.setTimeout(() => {
        setInvitationVisible(true);
        setInvitationReady(true);
      }, 500);
      return () => window.clearTimeout(reveal);
    }
    let scrollFrame = 0;
    let autoScrolling = false;
    const stopAutoScroll = () => {
      if (!autoScrolling) return;
      autoScrolling = false;
      window.cancelAnimationFrame(scrollFrame);
    };
    window.addEventListener("pointerdown", stopAutoScroll, { passive: true });
    window.addEventListener("touchstart", stopAutoScroll, { passive: true });
    window.addEventListener("wheel", stopAutoScroll, { passive: true });
    window.addEventListener("keydown", stopAutoScroll);
    const revealTimer = window.setTimeout(() => setInvitationVisible(true), 2_000);
    const readyTimer = window.setTimeout(() => {
      setInvitationReady(true);
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
        const details = document.getElementById("wedding-primary-details");
        if (!details) return;
        const start = window.scrollY;
        const target = Math.max(0, start + details.getBoundingClientRect().top - (window.innerHeight - 145));
        const distance = target - start;
        const startedAt = performance.now();
        const duration = 12_000;
        autoScrolling = true;
        const move = (now: number) => {
          if (!autoScrolling) return;
          const progress = Math.min(1, (now - startedAt) / duration);
          const eased = .5 - Math.cos(Math.PI * progress) / 2;
          window.scrollTo(0, start + distance * eased);
          if (progress < 1) scrollFrame = window.requestAnimationFrame(move);
          else autoScrolling = false;
        };
        scrollFrame = window.requestAnimationFrame(move);
      }));
    }, 3_450);
    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(readyTimer);
      window.cancelAnimationFrame(scrollFrame);
      window.removeEventListener("pointerdown", stopAutoScroll);
      window.removeEventListener("touchstart", stopAutoScroll);
      window.removeEventListener("wheel", stopAutoScroll);
      window.removeEventListener("keydown", stopAutoScroll);
    };
  }, [entered, invitationLetter, screen]);

  const enterInvitation = () => {
    playMusic();
    setEntered(true);
  };

  return (
      <div className={`wapp-shell theme-${weddingStyle} ${entered ? "entered" : ""}`}>
        <PalazzoBackdrop />
        <Seo title="AIDAI ✿ Айжигит — үйлөнүү үлпөтү" description="25-август 2026 — биздин тойго кош келиңиз" />
        <audio ref={audioRef} src={weddingMusic} preload="auto" onEnded={() => setMusic(false)} />
        <AnimatePresence>
          {!entered && <motion.section className="wapp-entry" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.025, filter: "blur(7px)" }} transition={{ duration: .85, ease: [0.22, 1, 0.36, 1] }}>
            <PalazzoBackdrop />
            <div className="wapp-petals wapp-entry-petals" aria-hidden="true">{Array.from({ length: 9 }, (_, index) => <i key={index} />)}</div>
            <motion.div className="wapp-entry-card" initial={{ opacity: 0, y: 16, rotateX: 5 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
              <SilverOrnaments />
              <p>AIDAI <span>✿</span> Айжигит</p>
              <button className="wapp-entry-button" onClick={enterInvitation}><span>{language === "ky" ? "Чакыруу" : "Приглашение"}</span></button>
              <small>{language === "ky" ? "Ачуу үчүн басыңыз" : "Нажмите, чтобы открыть"}</small>
            </motion.div>
          </motion.section>}
        </AnimatePresence>
          <div className="wapp-app">
            <div className="wapp-petals" aria-hidden="true">{Array.from({ length: 9 }, (_, index) => <i key={index} />)}</div>
              <header className="wapp-header"><button onClick={() => go("home")} aria-label={t.home}><Logo compact original /></button><div className="wapp-header-actions"><button className={screen === "home" ? "active" : ""} onClick={() => go("home")} aria-label={t.home}>⌂</button><button className={`wapp-style-toggle ${weddingStyle === "palazzo" ? "active" : ""}`} onClick={() => setWeddingStyle((value) => value === "silver" ? "palazzo" : "silver")} aria-label={language === "ky" ? "Стилди өзгөртүү" : "Сменить стиль"} title={weddingStyle === "silver" ? "Palazzo" : "Silver"}>{weddingStyle === "silver" ? "✦" : "◇"}</button><button className={music ? "active" : ""} onClick={toggleMusic} aria-label={t.music}>{music ? "♪" : "♩"}</button><button onClick={() => setLanguage((value) => value === "ky" ? "ru" : "ky")} aria-label={t.language}>{language === "ky" ? "RU" : "КЫР"}</button></div></header>
            <AnimatePresence mode="wait">
              <motion.main key={screen} className="wapp-main" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .55, ease: "easeOut" }}>
                {screen === "home" ? Home() : Section()}
              </motion.main>
            </AnimatePresence>
          </div>
    </div>
  );

  function Home() {
    return <>
      <section className="wapp-hero wapp-letter-hero"><BotanicalCorners /><div className={`wapp-invitation wapp-letter-sheet ${invitationVisible ? "revealed" : ""}`}><SilverOrnaments />
        <section className="wapp-letter-opening"><h1 className="wapp-letter-title">{language === "ky" ? "Чакыруу" : "Приглашение"}</h1><span className="wapp-invitation-rule" /></section>
        <section className="wapp-letter-copy"><p>{invitationLetter}</p></section>
      </div></section>
      {invitationReady && <motion.div className="wapp-details-feed" id="wedding-details" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
        <header className="wapp-feed-divider"><span>✦</span><p>{language === "ky" ? "Той тууралуу маалымат" : "Информация о торжестве"}</p></header>
        <section className="wapp-hero"><div className="wapp-invitation wapp-invite-flow"><SilverOrnaments />
          <section className="wapp-invite-section" id="wedding-primary-details"><p className="wapp-kicker">25 · 08 · 2026</p><Logo shimmer /><span className="wapp-invitation-rule" /><p className="wapp-invitation-message">{t.welcome}</p><div className="wapp-invitation-details"><div className="wapp-date-detail"><span className="wapp-date-shimmer" data-text="25">25</span><p>{t.monthYear}<b>17:00</b></p></div><i /><p><b>{venue}</b><span>{address}</span></p></div><div className="wapp-countdown"><p className="wapp-countdown-label">{t.remaining}</p>{clockItems.map(([value, label]) => <div key={String(label)}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>)}</div></section>
          <section className="wapp-invite-section"><p className="wapp-kicker">25 · 08 · 2026</p><h2 className="wapp-page-title">{t.programTitle}</h2><span className="wapp-invitation-rule" /><div className="wapp-invite-program">{timeline.map(([time, name]) => <div key={time}><time>{time}</time><span>{name}</span></div>)}</div><div className="wapp-location-summary"><span>⌖</span><div><b>{venue}</b><p>{address}</p></div></div><div className="wapp-invite-actions"><a href="https://yandex.com/maps/?text=Palazzo%20Bishkek" target="_blank" rel="noreferrer">{t.map} →</a></div></section>
          <section className="wapp-invite-section"><div className="wapp-response-mark">❀</div><p className="wapp-kicker">{t.responseNote}</p><h2 className="wapp-page-title">{t.rsvpTitle}</h2><span className="wapp-invitation-rule" /><a className="wapp-organizer-link" href="https://wa.me/996000000000" target="_blank" rel="noreferrer"><WhatsAppIcon />{t.call}</a><Logo compact original /></section>
        </div></section>
        <section className="wapp-utility-grid">{utilityScreens.map((target, index) => { const cardIndex = utilityCardIndexes[index]; return <button key={target} onClick={() => go(target)}><span>{icons[cardIndex]}</span><b>{t.cards[cardIndex]}</b></button>; })}</section>
        <p className="wapp-signoff">25 · 08 · 2026<br /><Logo compact original /></p>
      </motion.div>}
    </>;
  }

  function Section() {
    return <section className="wapp-section"><button className="wapp-back" onClick={() => go("home")}>← {t.back}</button>
      {screen === "location" && <><SectionHead eyebrow="Palazzo" title={t.locationTitle} /><div className="wapp-location-hero"><span>25</span><div><b>{t.date}</b><p>17:00</p></div></div><article className="wapp-info-card"><h3>{venue}</h3><p>{address}</p><div className="wapp-actions"><a href="https://yandex.com/maps/?text=Palazzo%20Bishkek" target="_blank" rel="noreferrer">{t.map}</a><button onClick={() => navigator.clipboard?.writeText(address)}>{t.copy}</button><a href="https://wa.me/996000000000" target="_blank" rel="noreferrer"><WhatsAppIcon />{t.call}</a></div></article></>}
      {screen === "route" && <><SectionHead eyebrow={t.cards[1]} title={t.cards[1]} /><div className="wapp-map"><div className="wapp-route-line"><span>●</span><i /><b>Palazzo</b></div></div><article className="wapp-info-card"><h3>{venue}</h3><p>{address}</p><a className="wapp-primary-link" href="https://yandex.com/maps/?text=Palazzo%20Bishkek" target="_blank" rel="noreferrer">{t.map} →</a></article></>}
      {screen === "program" && <><SectionHead eyebrow="25 · 08 · 2026" title={t.programTitle} /><div className="wapp-timeline">{timeline.map(([time, name], index) => <motion.article key={time} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .12 }}><div className="wapp-bud">❀</div><time>{time}</time><p>{name}</p></motion.article>)}</div></>}
      {screen === "table" && <><SectionHead eyebrow={t.seating} title={guestName} /><p className="wapp-guest-place">{t.tableTitle}</p><article className="wapp-plan-card"><header><span>⌑</span><h2>{t.plan}</h2></header><div className="wapp-plan-preview" aria-hidden="true"><i className="table one" /><i className="table two" /><i className="table three" /><i className="chair marked">?</i></div><div className="wapp-plan-pending"><span>✦</span><p>{t.planPending}</p></div></article></>}
      {screen === "wishes" && <><SectionHead eyebrow={t.guestBook} title={t.wishesTitle} /><p className="wapp-section-copy">{t.wishesHint}</p><form className="wapp-form" onSubmit={(e: FormEvent) => { e.preventDefault(); setWishSent(true); }}><label>{t.name}<input required /></label><label>{t.wish}<textarea required rows={4} /></label><label className="wapp-upload">＋ {t.media}<input type="file" accept="image/*,video/*,audio/*" multiple onChange={onUpload} /></label><button className="wapp-button">{t.send}</button></form>{wishSent && <motion.div className="wapp-success" initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }}>❀<p>{t.success}</p></motion.div>}</>}
      {screen === "games" && <><SectionHead eyebrow={t.moments} title={t.gamesTitle} /><div className="wapp-game-list">{games[language].map(([name, desc], i) => <motion.button key={name} whileTap={{ scale: .98 }} onClick={(event) => { event.currentTarget.classList.toggle("revealed"); }}><span>0{i + 1}</span><div><b>{name}</b><p>{desc}</p></div><i>✿</i></motion.button>)}</div></>}
      {screen === "gallery" && <><SectionHead eyebrow={t.gallery} title={t.galleryTitle} /><article className="wapp-feature-pending"><div className="wapp-pending-camera" aria-hidden="true"><span>□</span><i>✦</i></div><p>{t.galleryPending}</p></article></>}
      {screen === "rsvp" && <><SectionHead eyebrow="RSVP" title={t.rsvpTitle} />{!confirmed ? <div className="wapp-rsvp"><div>{[["yes", t.yes], ["no", t.no], ["transport", t.transport]].map(([value, label]) => <button className={rsvp === value ? "active" : ""} onClick={() => setRsvp(value)} key={value}><span>{rsvp === value ? "✓" : ""}</span>{label}</button>)}</div><button className="wapp-button" onClick={() => setConfirmed(true)}>{t.confirm}</button></div> : <motion.div className="wapp-success large" initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }}><motion.span animate={{ rotate: [0, 12, -8, 0] }} transition={{ duration: 1.6 }}>❀</motion.span><h3>{t.success}</h3><Logo compact /></motion.div>}</>}
    </section>;
  }
}

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <header className="wapp-section-head"><p>{eyebrow}</p><h1>{title}</h1><span /></header>;
}
