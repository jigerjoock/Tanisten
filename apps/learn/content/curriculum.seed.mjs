const pythonModules = [
  ["Python starten", [
    ["Messwerte begrüßen", "Ausgabe, Variablen und Datentypen", "Ein Wetterlabor protokolliert Temperatur und Luftfeuchte."],
    ["Taschengeld-Rechner", "Rechnen mit Ganz- und Kommazahlen", "Ein Wochenbudget soll transparent aufgeteilt werden."],
    ["Text aufräumen", "Strings und f-Strings", "Ein Verein formatiert Namensschilder einheitlich."],
    ["Einheiten umrechnen", "Eingaben umwandeln", "Eine Fahrradwerkstatt rechnet Kilometer, Meter und Zentimeter um."],
    ["Punktestand lesen", "Eingabe und Ausgabe", "Ein Quiz soll einen eingegebenen Punktestand verständlich melden."],
    ["Kochzeiten planen", "Operatoren und Reihenfolge", "Für ein Frühstück werden mehrere Zeiten zusammengezählt."],
    ["Farbcodes mischen", "Variablen aktualisieren", "Ein Kunstprojekt speichert RGB-Werte und verändert sie schrittweise."],
    ["Bibliotheksausweis", "Boolesche Werte", "Eine Ausleihe prüft, ob ein Ausweis gültig und ein Buch verfügbar ist."],
    ["Schulweg vergleichen", "Zahlen formatieren", "Zwei Wege werden nach Dauer und Länge vergleichbar ausgegeben."],
    ["Datensparsame Notiz", "Sinnvolle Namen und Kommentare", "Eine kurze Notiz wird als klar lesbarer Datensatz vorbereitet."]
  ]],
  ["Entscheiden und wiederholen", [
    ["Ampel-Assistent", "if/elif/else", "Eine Kreuzung gibt abhängig von ihrer Farbe eine Handlung aus."],
    ["Rabatt fair berechnen", "Vergleiche und Bedingungen", "Ein Museum vergibt altersabhängige Ermäßigungen."],
    ["Passwort-Regeln", "logische Operatoren", "Ein Formular bewertet Länge, Zahl und Sonderzeichen."],
    ["Schrittzähler", "for-Schleifen", "Eine Trainingswoche wird aus Tageswerten zusammengezählt."],
    ["Warteschlange leeren", "while-Schleifen", "Ein Kiosk bearbeitet Bestellungen, bis keine mehr übrig ist."],
    ["Zahl erraten", "Schleifen beenden", "Ein Spiel reagiert auf zu große, zu kleine und richtige Tipps."],
    ["Busfahrplan prüfen", "Bereiche und Modulo", "Eine Anzeige erkennt, ob ein Bus im Takt erwartet wird."],
    ["Müll trennen", "verschachtelte Entscheidungen", "Ein Sortierer weist Materialien einer passenden Tonne zu."],
    ["Energie sparen", "Zähler und Abbruchbedingungen", "Ein Raum senkt Verbrauchswerte bis zu einem Ziel."],
    ["Lernserie", "Schleifen mit Qualitätsprüfung", "Eine Serie gilt nur, wenn jeder Eintrag plausibel ist."]
  ]],
  ["Funktionen und Sammlungen", [
    ["Rezept-Funktionen", "Parameter und Rückgabewerte", "Ein Rezeptrechner skaliert Zutaten für verschiedene Personenzahlen."],
    ["Teamliste", "Listen lesen und ändern", "Eine AG verwaltet Anmeldungen ohne doppelte Namen."],
    ["Wortdetektiv", "String-Methoden", "Ein Text wird nach häufigen und verborgenen Wörtern untersucht."],
    ["Notenübersicht", "Listen und Aggregation", "Eine Klasse berechnet Minimum, Maximum und Mittelwert nachvollziehbar."],
    ["Inventar", "Dictionaries", "Eine Werkstatt zählt Material und meldet fehlende Teile."],
    ["Fahrkarten", "Listen von Dictionaries", "Eine Haltestelle sortiert Tickets nach Ziel und Gültigkeit."],
    ["Wiederverwendbare Prüfung", "Funktionszerlegung", "Eine Eingabeprüfung soll in mehreren Formularen funktionieren."],
    ["Koordinaten sammeln", "Tupel und Iteration", "Eine Schatzkarte speichert Fundorte als feste Paare."],
    ["Abstimmung auswerten", "Mengen", "Eine Klassensprecherwahl trennt gültige von doppelten Stimmen."],
    ["Kontaktfinder", "Suche und Sortierung", "Ein Adressbuch findet Einträge unabhängig von Großschreibung."]
  ]],
  ["Daten und Zuverlässigkeit", [
    ["Tagebuchdatei", "Dateien lesen", "Ein Lernjournal wird Zeile für Zeile ausgewertet."],
    ["Ergebnis exportieren", "Dateien schreiben", "Eine Statistik wird mit Überschrift sicher gespeichert."],
    ["CSV auswerten", "getrennte Daten", "Messdaten werden in Spalten zerlegt und geprüft."],
    ["Fehlerfreundlicher Rechner", "try/except", "Falsche Eingaben erzeugen hilfreiche statt kryptische Meldungen."],
    ["Konfiguration laden", "JSON-Grundlagen", "Ein Spiel liest erlaubte Einstellungen aus einer Datei."],
    ["Daten bereinigen", "Validierung", "Leere, doppelte und unplausible Werte werden dokumentiert."],
    ["Zeitstempel prüfen", "Datumsstrings", "Ein Terminplan erkennt das Format Jahr-Monat-Tag."],
    ["Testfälle formulieren", "Arrange-Act-Assert", "Für eine Gebührenfunktion werden klare Beispiele vorbereitet."],
    ["Fehler suchen", "Debugging", "Ein absichtlich fehlerhaftes Programm wird mit Beobachtungen repariert."],
    ["Kleine API-Attrappe", "Trennung von Daten und Logik", "Eine lokale Antwort wird verarbeitet, ohne Netzwerkzugriff."]
  ]],
  ["Algorithmen und Projekte", [
    ["Routenplaner", "Greedy-Entscheidungen", "Mehrere kurze Wege werden nach einer einfachen Regel ausgewählt."],
    ["Vokabeltrainer", "Zufall und Zustände", "Ein Trainer merkt richtige und falsche Antworten."],
    ["Mini-Bank", "Zustandsmodell", "Ein Konto erlaubt Einzahlen, Abheben und sichere Grenzen."],
    ["Sortierlabor", "Sortierstrategien", "Zahlenkarten werden erst selbst sortiert, dann mit Python verglichen."],
    ["Suchmaschine für Bücher", "lineare und binäre Suche", "Titel werden in einer sortierten Liste gefunden."],
    ["Morse-Übersetzer", "Abbildungen", "Zeichen und Codes werden in beide Richtungen übersetzt."],
    ["Spielstatistik", "Datenmodell und Auswertung", "Ein Turnier berechnet Punkte und eine Rangliste."],
    ["CO₂-Tagebuch", "Projektstruktur", "Alltagswege werden gesammelt und in Wochenwerte überführt."],
    ["Kommandozeilen-Abenteuer", "Verzweigte Abläufe", "Ein Textabenteuer hält Ort, Inventar und Entscheidungen konsistent."],
    ["Abschlussprojekt Python", "Planung, Implementierung und Review", "Ein eigenes nützliches Werkzeug wird als kleines, getestetes Programm entwickelt."]
  ]]
];

const scratchModules = [
  ["Scratch starten", [
    ["Bühne begrüßt dich", "Figuren, Bühne und grüne Flagge", "Eine Figur begrüßt Besucherinnen und Besucher mit einem persönlichen Text."],
    ["Figur mit Plan", "Ereignisse und Reihenfolge", "Eine Spielfigur führt beim Start drei klar erkennbare Schritte aus."],
    ["Kostümwechsel", "Kostüme und Aussehen", "Ein Maskottchen zeigt seine Stimmung über passende Kostüme."],
    ["Klangsignal", "Klänge und Lautstärke", "Ein Startsignal wird hörbar und für andere nicht zu laut gestaltet."],
    ["Maus-Spur", "Zeiger und Koordinaten", "Ein Pinsel folgt dem Mauszeiger und hinterlässt eine kontrollierte Spur."],
    ["Tastensteuerung", "Tastaturereignisse", "Eine Figur reagiert unabhängig auf vier Pfeiltasten."],
    ["Namensschild", "Fragen und Antworten", "Ein Projekt fragt nach einem Namen und verwendet ihn respektvoll."],
    ["Mini-Comic", "Sprechen und Warten", "Zwei Figuren wechseln sich in einem kurzen Dialog ab."],
    ["Bühnenbild wählen", "Hintergründe", "Ein Museum führt durch zwei Szenen mit verständlichen Übergängen."],
    ["Start-Check", "Projektorganisation", "Ein neues Projekt erhält klare Figuren- und Variablennamen."]
  ]],
  ["Bewegung und Geschichten", [
    ["Labyrinthlauf", "Bewegung und Kollision", "Eine Figur bewegt sich durch ein farbiges Labyrinth ohne Wände zu durchqueren."],
    ["Tanzfolge", "Wiederholungen", "Eine Figur tanzt eine achtteilige Choreografie im Takt."],
    ["Sternensammler", "Zufällige Positionen", "Ein Stern erscheint an sicheren zufälligen Orten auf der Bühne."],
    ["Raumschiff drehen", "Richtung und Gleitbewegung", "Ein Raumschiff richtet sich sichtbar auf ein Ziel aus."],
    ["Unterwasserreise", "Gleiten und Hintergründe", "Ein U-Boot wechselt zwischen drei Meereszonen."],
    ["Schatzkarte", "Koordinatensystem", "Hinweise führen zu präzisen x- und y-Positionen."],
    ["Tierparade", "Kostüm-Animation", "Drei Tiere bewegen sich mit unterschiedlichen, gut lesbaren Rhythmen."],
    ["Wetterbericht", "Aussehen und Klang", "Sonne, Regen und Wind erhalten eigene sicht- und hörbare Signale."],
    ["Kamerafahrt", "Bühneninszenierung", "Eine Geschichte erzeugt durch Größen- und Positionswechsel Tiefenwirkung."],
    ["Interaktive Postkarte", "Gestaltung und Bedienung", "Eine klickbare Postkarte reagiert auf mindestens drei Elemente."]
  ]],
  ["Logik, Daten und Spielregeln", [
    ["Punkte zählen", "Variablen", "Ein Fangspiel erhöht den Punktestand genau einmal pro Treffer."],
    ["Countdown", "Zahlen und Bedingungen", "Ein Timer endet sichtbar bei null und verhindert negative Werte."],
    ["Quiz mit Feedback", "Antworten und Vergleiche", "Ein Quiz unterscheidet richtig, fast richtig und falsch freundlich."],
    ["Zufallswürfel", "Zufall und Operatoren", "Ein Würfel erzeugt nur Werte von eins bis sechs und zeigt sie an."],
    ["Highscore", "Vergleiche", "Ein neuer Rekord ersetzt den alten nur bei einer höheren Punktzahl."],
    ["Einkaufskorb", "Listen", "Eine Einkaufsliste fügt Produkte hinzu und zeigt die aktuelle Anzahl."],
    ["Geheime Zahl", "Schleifen und Bedingungen", "Ein Ratespiel gibt Hinweise, bis die geheime Zahl gefunden ist."],
    ["Energieanzeige", "Zustände", "Eine Spielfigur verliert Energie, kann sie aber begrenzt auffüllen."],
    ["Reaktionsspiel", "Zeitgefühl", "Ein Klick zählt nur, wenn ein eindeutiges Signal sichtbar ist."],
    ["Regelwerk testen", "Testfälle", "Ein Spiel wird mit unfairen und ungewöhnlichen Eingaben geprüft."]
  ]],
  ["Nachrichten und Klone", [
    ["Theaterregie", "Senden und Empfangen", "Figuren starten Szenen erst nach einer klar benannten Nachricht."],
    ["Startmenü", "Zustandswechsel", "Ein Menü startet, erklärt und beendet ein Spiel ohne versteckte Abläufe."],
    ["Meteorregen", "Klone", "Meteore werden erzeugt, bewegt und nach dem Verlassen der Bühne gelöscht."],
    ["Blasenspiel", "Klone und Treffer", "Seifenblasen reagieren nur einmal auf einen Klick."],
    ["Mehrere Level", "Broadcasts", "Ein Spiel erhöht nach einem Ziel den Schwierigkeitsgrad nachvollziehbar."],
    ["Dialogsystem", "Nachrichten und Variablen", "Antworten verändern den weiteren Gesprächsverlauf."],
    ["Ampelnetz", "parallele Skripte", "Drei Ampeln koordinieren sich, ohne gleichzeitig Grün zu zeigen."],
    ["Haustierpflege", "Zustände und Nachrichten", "Hunger, Freude und Schlaf werden durch getrennte Ereignisse aktualisiert."],
    ["Teilchenzauber", "Klone und Zufall", "Ein Klick erzeugt begrenzte, sich selbst aufräumende Partikel."],
    ["Debugging mit Nachrichten", "Beobachten und Benennen", "Ein fehlerhafter Ablauf wird mit klaren Nachrichten protokolliert."]
  ]],
  ["Eigene Spiele und Medien", [
    ["Pong fair", "Spielmechanik", "Ball, Schläger und Punkte bilden ein faires Zwei-Spieler-Spiel."],
    ["Jump-and-Run", "Kollisionen und Schwerkraft", "Eine Figur springt, landet und verliert nicht unbemerkt Leben."],
    ["Escape Room", "Rätsel und Inventar", "Gegenstände werden erst nach passenden Hinweisen nutzbar."],
    ["Musikmaschine", "Klänge und Listen", "Tasten spielen eine kurze selbst komponierte Sequenz."],
    ["Nachrichtenstudio", "Medienprojekt", "Ein Nachrichtensprecher kombiniert Text, Bild und Übergänge verantwortungsvoll."],
    ["Müllsortierer", "Lernspiel", "Objekte landen per Drag-and-drop in der richtigen Tonne."],
    ["Weltraum-Mission", "Projektplanung", "Ein Missionsziel verbindet Steuerung, Punkte und mehrere Level."],
    ["Interaktive Geschichte", "Verzweigungen", "Entscheidungen führen zu mindestens drei unterschiedlichen Enden."],
    ["Barrierearmes Spiel", "Zugänglichkeit", "Farben, Texte und Klänge liefern mindestens zwei Hinweise pro Ereignis."],
    ["Abschlussprojekt Scratch", "Konzept, Bau und Review", "Ein eigenes Spiel oder Lernmedium wird mit Testplan präsentiert."]
  ]]
];

function attribution(source, license, url) {
  return { source, license, url, note: "Eigenständige deutsche Adaption; keine Upstream-Dateien, Tests oder Lösungen enthalten." };
}

const pythonSequences = [
  ["Eingaben und Ausgabe planen", "Rechenweg implementieren", "Ergebnis lesbar ausgeben", "mit Beispielwerten prüfen", "kleine Variante begründen"],
  ["Entscheidungstabelle schreiben", "Bedingung oder Schleife bauen", "Abbruch und Sonderfall absichern", "Ablauf mit Grenzwerten testen", "Lesbarkeit gezielt verbessern"],
  ["passende Datenstruktur wählen", "Funktion mit klarem Vertrag schreiben", "Daten verarbeiten", "Rückgabewerte testen", "Wiederverwendung zeigen"],
  ["Datenformat untersuchen", "Daten sicher einlesen", "ungültige Daten behandeln", "Testfall dokumentieren", "Ergebnis nachvollziehbar ausgeben"],
  ["Anforderungen zerlegen", "Kernfunktion implementieren", "Zustand oder Algorithmus prüfen", "Akzeptanztest schreiben", "Projektentscheidung reflektieren"]
];

const scratchSequences = [
  ["Figuren und Bühne vorbereiten", "Start-Ereignis bauen", "Interaktion sichtbar machen", "Ablauf mit drei Klicks testen", "Bedienhinweis ergänzen"],
  ["Bewegungsweg festlegen", "Steuerung oder Schleife bauen", "Kollision oder Szenenwechsel absichern", "Spielgefühl testen", "Bewegung verfeinern"],
  ["Variable und Startwert festlegen", "Regel mit Operator bauen", "Bedingung gegen Fehlerzustand bauen", "Regel mit Extremwerten testen", "Rückmeldung verbessern"],
  ["Nachrichtenplan schreiben", "Nachricht oder Klon einsetzen", "parallele Abläufe begrenzen", "Aufräumen und Wechsel testen", "Ablauf protokollieren"],
  ["Spielziel und Eingaben planen", "Kernmechanik umsetzen", "Sieg, Verlust oder Ende sichtbar machen", "Akzeptanztest durchführen", "eigene Gestaltung begründen"]
];

function pythonStarter(modulePosition, lessonPosition, focus, stageIndex) {
  if (stageIndex !== 1 && stageIndex !== 2) return "";
  return `def loese_${modulePosition}_${lessonPosition}(eingabe):\n    \"\"\"Verarbeitet eine Eingabe für: ${focus}.\"\"\"\n    # Ergänze die Regel; gib ein klar prüfbares Ergebnis zurück.\n    pass\n`;
}

function scratchBlocks(modulePosition, stageIndex) {
  const base = ["Ereignisse: „Wenn grüne Flagge angeklickt“", "Aussehen: eine sichtbare Rückmeldung mit „sage“, Kostüm oder Hintergrund"];
  const modules = [
    ["Ereignisse: „Wenn diese Figur angeklickt“ oder „Wenn Taste … gedrückt“", "Steuerung: „warte … Sekunden“ für erkennbare Reihenfolge"],
    ["Bewegung: „gehe zu x: … y: …“ oder „ändere x/y um …“", "Steuerung: „wiederhole“ statt kopierter Bewegungsblöcke"],
    ["Variablen: Startwert mit „setze … auf …“", "Steuerung/Operatoren: „falls … dann“ mit einem Vergleich"],
    ["Ereignisse: „sende …“ und „wenn ich … empfange“", "Steuerung: bei Klonen „lösche diesen Klon“ oder eine eindeutige Endbedingung"],
    ["Ereignisse: Start- und Eingabe-Ereignis", "Steuerung: sichtbarer Sieg-, Verlust- oder Szenenwechsel"]
  ];
  const selected = modules[modulePosition - 1] ?? base;
  return stageIndex === 0 ? base : [base[0], ...selected];
}

function makeExercises(topic, kind, modulePosition, lessonPosition) {
  const [title, focus, scenario] = topic;
  const sequence = (kind === "python_code" ? pythonSequences : scratchSequences)[modulePosition - 1];

  return sequence.map((stage, index) => {
    const isPython = kind === "python_code";
    const instruction = isPython
      ? `${scenario} Bearbeite den Lernschritt „${stage}“ mit ${focus}.`
      : `${scenario} Bearbeite den Lernschritt „${stage}“ mit ${focus}. Baue die Blöcke selbst in Scratch; lade keine Lösung hoch.`;
    const successCriteria = isPython
      ? [
        `Die Lösung erfüllt den Schritt „${stage}“ für das Szenario.`,
        "Namen, Einrückung und Ausgabe sind für andere Lernende nachvollziehbar.",
        index >= 2 ? "Mindestens ein konkreter Rand- oder Gegenfall ist dokumentiert." : "Ein Beispiel mit erwartetem Ergebnis ist angegeben."
      ]
      : [
        `Die zentrale Interaktion zu „${title}“ ist nach dem Start ohne Erklärung vorführbar.`,
        "Die geforderten Scratch-Blöcke sind in getrennten, verständlich benannten Skripten erkennbar.",
        index >= 2 ? "Ein Fehlerzustand oder unerwarteter Klick führt nicht zu einem unklaren Spielzustand." : "Eine sichtbare oder hörbare Rückmeldung bestätigt die Aktion."
      ];
    const hints = isPython
      ? [
        `Beginne mit einem kleinen Beispiel für „${title}“, bevor du Sonderfälle ergänzt.`,
        index > 0 ? "Lies die Funktion laut: Parameter, Rückgabewert und Regel sollen zusammenpassen." : "Notiere zuerst, welche Werte erlaubt sind und was bei anderen Werten geschieht."
      ]
      : [
        "Starte jedes wichtige Skript mit einem klaren Ereignis, nicht mit einem versteckten Dauerlauf.",
        "Teste nach jeder Änderung mit grüner Flagge; beobachte Bühne, Variable und Figur gleichzeitig."
      ];
    return {
      position: index + 1,
      title: `${title}: ${stage}`,
      description: instruction,
      kind,
      check_mode: "teacher",
      check_config: {},
      starter_code: isPython ? pythonStarter(modulePosition, lessonPosition, focus, index) : "",
      content: {
        instructions: [instruction, "Reiche nur eigene Arbeit sowie eine kurze Erklärung deiner Entscheidungen ein."],
        learning_goal: focus,
        scenario,
        success_criteria: successCriteria,
        hints,
        ...(isPython ? { submission_format: "Python-Code und kurze Testnotiz" } : { scratch_blocks: scratchBlocks(modulePosition, index), submission_format: "Scratch-Projekt-Link oder Projektdokumentation mit Testnotiz" }),
        solution_visibility: "none"
      }
    };
  });
}

function makeCourse({ slug, title, description, kind, modules, sources }) {
  return {
    slug,
    title,
    description,
    locale: "de",
    attribution: sources,
    modules: modules.map(([moduleTitle, topics], moduleIndex) => ({
      position: moduleIndex + 1,
      title: moduleTitle,
      lessons: topics.map((topic, lessonIndex) => ({
        position: lessonIndex + 1,
        title: topic[0],
        description: `${topic[1]}. ${topic[2]}`,
        exercises: makeExercises(topic, kind, moduleIndex + 1, lessonIndex + 1)
      }))
    }))
  };
}

export const curriculum = {
  schema_version: 1,
  locale: "de",
  policy: {
    public_upstream_assets_included: false,
    upstream_solutions_included: false,
    automatic_code_execution_claimed: false
  },
  courses: [
    makeCourse({
      slug: "python-werkstatt",
      title: "Python-Werkstatt: Denken, Daten, Projekte",
      description: "250 eigenständige Aufgaben von ersten Variablen bis zum Abschlussprojekt.",
      kind: "python_code",
      modules: pythonModules,
      sources: [attribution("Exercism Python Track", "MIT", "https://github.com/exercism/python")]
    }),
    makeCourse({
      slug: "scratch-spielstudio",
      title: "Scratch-Spielstudio: Geschichten, Logik, Spiele",
      description: "250 eigenständige Aufgaben für interaktive Scratch-Projekte und nachvollziehbare Spielregeln.",
      kind: "scratch_project",
      modules: scratchModules,
      sources: [
        attribution("Getting Started with Scratch — Raspberry Pi Foundation", "CC BY 4.0", "https://github.com/raspberrypilearning/getting-started-with-scratch"),
        attribution("Scary Spot the Difference — Raspberry Pi Foundation", "CC BY 4.0", "https://github.com/raspberrypilearning/scary-spot-the-difference"),
        attribution("Turtley Amazing — Raspberry Pi Foundation", "CC BY 4.0", "https://github.com/raspberrypilearning/turtley-amazing")
      ]
    })
  ]
};
