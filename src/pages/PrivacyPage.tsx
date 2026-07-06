import PageHero from "../components/common/PageHero";
import Container from "../components/layout/Container";
import Seo from "../components/seo/Seo";
import { useLanguage } from "../i18n/LanguageContext";

const content = {
  en: {
    title: "Privacy & Legal Notice",
    eyebrow: "Privacy",
    subtitle:
      "Information about contact details, data protection, local storage and legal responsibility for this website.",
    updated: "Last updated: July 2026",
    sections: [
      {
        title: "Legal Notice",
        items: [
          "Provider: Tanisten",
          "Germany: Schellengasse 8, 74072 Heilbronn, Germany",
          "Worldwide: IFZA Business Park, Dubai Silicon Oasis, Dubai, UAE",
          "Email: info@tanisten.com",
          "Phone Germany: +49 177 58 65 916",
          "Phone Worldwide: +971 55 396 2189"
        ]
      },
      {
        title: "Privacy Policy",
        items: [
          "This website is used to present Tanisten services and provide contact information.",
          "If you contact Tanisten by email, phone or contact form, the information you provide is used to process your inquiry.",
          "Typical inquiry data may include name, company, email address, project type and message content.",
          "This data is not sold and is not used for advertising networks."
        ]
      },
      {
        title: "Cookies & Local Storage",
        items: [
          "This website does not use analytics, advertising or marketing cookies.",
          "The selected language can be stored locally in your browser so the site keeps EN or DE after reload.",
          "The cookie notice dismissal can also be stored locally so the notice is not shown repeatedly.",
          "You can delete this data at any time through your browser settings."
        ]
      },
      {
        title: "External Services",
        items: [
          "The site may link to external services such as Google Maps or external image sources.",
          "When you open an external link, the privacy policy of that external service applies.",
          "No embedded tracking tools are intentionally used on this website."
        ]
      }
    ]
  },
  de: {
    title: "Datenschutz & Impressum",
    eyebrow: "Datenschutz",
    subtitle:
      "Informationen zu Kontaktdaten, Datenschutz, lokalem Speicher und rechtlicher Verantwortung für diese Website.",
    updated: "Stand: Juli 2026",
    sections: [
      {
        title: "Impressum",
        items: [
          "Anbieter: Tanisten",
          "Deutschland: Schellengasse 8, 74072 Heilbronn, Deutschland",
          "Weltweit: IFZA Business Park, Dubai Silicon Oasis, Dubai, VAE",
          "E-Mail: info@tanisten.com",
          "Telefon Deutschland: +49 177 58 65 916",
          "Telefon weltweit: +971 55 396 2189"
        ]
      },
      {
        title: "Datenschutzerklärung",
        items: [
          "Diese Website dient der Darstellung der Leistungen von Tanisten und der Bereitstellung von Kontaktinformationen.",
          "Wenn Sie Tanisten per E-Mail, Telefon oder Kontaktformular kontaktieren, werden die von Ihnen angegebenen Informationen zur Bearbeitung Ihrer Anfrage verwendet.",
          "Typische Anfragedaten können Name, Unternehmen, E-Mail-Adresse, Projekttyp und Nachrichteninhalt sein.",
          "Diese Daten werden nicht verkauft und nicht für Werbenetzwerke genutzt."
        ]
      },
      {
        title: "Cookies & lokaler Speicher",
        items: [
          "Diese Website verwendet keine Analyse-, Werbe- oder Marketing-Cookies.",
          "Die ausgewählte Sprache kann lokal im Browser gespeichert werden, damit EN oder DE nach dem Neuladen erhalten bleibt.",
          "Auch das Schließen des Cookie-Hinweises kann lokal gespeichert werden, damit der Hinweis nicht wiederholt angezeigt wird.",
          "Sie können diese Daten jederzeit über Ihre Browsereinstellungen löschen."
        ]
      },
      {
        title: "Externe Dienste",
        items: [
          "Die Website kann auf externe Dienste wie Google Maps oder externe Bildquellen verlinken.",
          "Wenn Sie einen externen Link öffnen, gelten die Datenschutzbestimmungen des jeweiligen externen Dienstes.",
          "Auf dieser Website werden bewusst keine eingebetteten Tracking-Tools verwendet."
        ]
      }
    ]
  }
};

export default function PrivacyPage() {
  const { language } = useLanguage();
  const page = content[language];

  return (
    <>
      <Seo title={`${page.title} | Tanisten`} description={page.subtitle} />
      <PageHero eyebrow={page.eyebrow} title={page.title} subtitle={page.subtitle} />

      <section className="section-pad">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">{page.updated}</p>
          <div className="mt-7 grid gap-5 lg:grid-cols-2">
            {page.sections.map((section) => (
              <article key={section.title} className="card-surface p-6">
                <h2 className="font-display text-2xl font-semibold text-white">{section.title}</h2>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-300">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
