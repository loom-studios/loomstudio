// Contenuto legale dei modal Privacy / Termini / Cookie.
// Il testo è mantenuto come dati (non JSX) così da poter riutilizzare un solo
// componente modal per tutti e tre i documenti.

export type LegalKey = "privacy" | "termini" | "cookie";

export type LegalBlock =
  | { kind: "p"; text: string }
  | { kind: "list"; items: string[] };

export type LegalSection = {
  heading: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  key: LegalKey;
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
};

const UPDATED = "1 luglio 2026";
const EMAIL = "info@loom-studio.it";

const privacy: LegalDocument = {
  key: "privacy",
  eyebrow: "Informativa privacy",
  title: "Privacy Policy",
  intro:
    "La presente informativa descrive come Loom Studio raccoglie, utilizza e protegge i dati personali degli utenti che visitano questo sito e ci contattano, in conformità al Regolamento (UE) 2016/679 (GDPR) e alla normativa italiana vigente in materia di protezione dei dati personali.",
  updated: UPDATED,
  sections: [
    {
      heading: "Titolare del trattamento",
      blocks: [
        {
          kind: "p",
          text: `Il Titolare del trattamento dei dati è Loom Studio (di seguito "Loom Studio", "noi"), contattabile per qualsiasi richiesta relativa al trattamento dei dati personali all'indirizzo email ${EMAIL}.`,
        },
      ],
    },
    {
      heading: "Dati personali che trattiamo",
      blocks: [
        { kind: "p", text: "Trattiamo le seguenti categorie di dati personali:" },
        {
          kind: "list",
          items: [
            "Dati di contatto forniti volontariamente: nome, indirizzo email, numero di telefono (facoltativo), tipologia di progetto e contenuto del messaggio, quando compili il modulo di contatto.",
            "Dati di navigazione: indirizzo IP, tipo di browser e di dispositivo, pagine visitate e informazioni raccolte tramite cookie e tecnologie simili (vedi la Cookie Policy).",
            "Dati statistici e di marketing: informazioni in forma aggregata o pseudonima raccolte tramite strumenti di analisi e piattaforme pubblicitarie, previo tuo consenso.",
          ],
        },
      ],
    },
    {
      heading: "Finalità e base giuridica del trattamento",
      blocks: [
        { kind: "p", text: "Trattiamo i tuoi dati personali per le seguenti finalità:" },
        {
          kind: "list",
          items: [
            "Rispondere alle richieste inviate tramite il modulo di contatto e fornire preventivi o informazioni (base giuridica: esecuzione di misure precontrattuali su tua richiesta, art. 6.1.b GDPR).",
            "Erogare e gestire i servizi eventualmente concordati (base giuridica: esecuzione del contratto, art. 6.1.b GDPR).",
            "Garantire il corretto funzionamento e la sicurezza del sito (base giuridica: legittimo interesse, art. 6.1.f GDPR).",
            "Effettuare analisi statistiche del traffico e attività di marketing tramite cookie di analisi e di profilazione (base giuridica: tuo consenso, art. 6.1.a GDPR, revocabile in qualsiasi momento).",
            "Adempiere a obblighi di legge, contabili e fiscali (base giuridica: obbligo legale, art. 6.1.c GDPR).",
          ],
        },
      ],
    },
    {
      heading: "Modalità del trattamento",
      blocks: [
        {
          kind: "p",
          text: "I dati sono trattati con strumenti elettronici e informatici, adottando misure tecniche e organizzative adeguate a garantirne la sicurezza, l'integrità e la riservatezza e a prevenirne l'accesso non autorizzato, la perdita o la divulgazione.",
        },
      ],
    },
    {
      heading: "Destinatari dei dati",
      blocks: [
        {
          kind: "p",
          text: "I tuoi dati possono essere trattati da soggetti terzi che agiscono in qualità di responsabili del trattamento per nostro conto o, per quanto di loro competenza, come autonomi titolari, tra cui:",
        },
        {
          kind: "list",
          items: [
            "Web3Forms, il servizio utilizzato per l'invio e la gestione dei messaggi del modulo di contatto.",
            "Il fornitore di hosting e dell'infrastruttura su cui è ospitato il sito.",
            "Google (Google Analytics, Google Ads) per le finalità di analisi statistica e di marketing.",
            "Meta Platforms per le finalità di marketing e remarketing, ove attivo.",
          ],
        },
        {
          kind: "p",
          text: "I dati non sono diffusi né ceduti a terzi per finalità diverse da quelle indicate nella presente informativa.",
        },
      ],
    },
    {
      heading: "Trasferimento dei dati fuori dall'Unione Europea",
      blocks: [
        {
          kind: "p",
          text: "Alcuni dei fornitori sopra indicati (ad esempio Web3Forms, Google e Meta) possono trattare i dati anche in Paesi al di fuori dello Spazio Economico Europeo. In tali casi il trasferimento avviene nel rispetto delle garanzie previste dagli articoli 44 e seguenti del GDPR, quali le Clausole Contrattuali Standard approvate dalla Commissione Europea o eventuali decisioni di adeguatezza.",
        },
      ],
    },
    {
      heading: "Periodo di conservazione",
      blocks: [
        {
          kind: "p",
          text: "Conserviamo i dati personali per il tempo strettamente necessario a conseguire le finalità per cui sono stati raccolti. I dati di contatto sono conservati per il tempo necessario a gestire la tua richiesta e l'eventuale rapporto contrattuale, nonché per adempiere agli obblighi di legge; i dati raccolti tramite cookie sono conservati secondo le durate indicate nella Cookie Policy. Trascorsi tali termini, i dati sono cancellati o resi anonimi.",
        },
      ],
    },
    {
      heading: "I tuoi diritti",
      blocks: [
        {
          kind: "p",
          text: "In qualsiasi momento puoi esercitare i diritti previsti dagli articoli da 15 a 22 del GDPR, ovvero:",
        },
        {
          kind: "list",
          items: [
            "Diritto di accesso ai tuoi dati personali.",
            "Diritto di rettifica dei dati inesatti o incompleti.",
            "Diritto alla cancellazione (“diritto all'oblio”).",
            "Diritto di limitazione del trattamento.",
            "Diritto alla portabilità dei dati.",
            "Diritto di opposizione al trattamento.",
            "Diritto di revocare il consenso in qualsiasi momento, senza pregiudicare la liceità del trattamento effettuato prima della revoca.",
          ],
        },
      ],
    },
    {
      heading: "Come esercitare i tuoi diritti",
      blocks: [
        {
          kind: "p",
          text: `Per esercitare i tuoi diritti puoi scriverci in qualsiasi momento all'indirizzo ${EMAIL}. Risponderemo alla tua richiesta nel più breve tempo possibile e comunque entro i termini previsti dalla legge.`,
        },
      ],
    },
    {
      heading: "Reclamo all'autorità di controllo",
      blocks: [
        {
          kind: "p",
          text: "Se ritieni che il trattamento dei tuoi dati personali violi la normativa vigente, hai il diritto di proporre reclamo al Garante per la protezione dei dati personali (https://www.garanteprivacy.it) o all'autorità di controllo competente nel tuo Stato di residenza.",
        },
      ],
    },
    {
      heading: "Modifiche alla presente informativa",
      blocks: [
        {
          kind: "p",
          text: "Ci riserviamo il diritto di aggiornare la presente informativa in qualsiasi momento per adeguarla a modifiche normative o organizzative. Le eventuali modifiche saranno pubblicate su questa pagina con l'indicazione della data di ultimo aggiornamento.",
        },
      ],
    },
  ],
};

const termini: LegalDocument = {
  key: "termini",
  eyebrow: "Termini di servizio",
  title: "Termini e Condizioni",
  intro:
    "I presenti Termini e Condizioni regolano l'accesso e l'utilizzo del sito web di Loom Studio. Navigando su questo sito dichiari di accettarli integralmente.",
  updated: UPDATED,
  sections: [
    {
      heading: "Oggetto",
      blocks: [
        {
          kind: "p",
          text: 'I presenti Termini e Condizioni (di seguito i "Termini") disciplinano l\'utilizzo del sito web di Loom Studio (di seguito il "Sito") e i rapporti tra Loom Studio e gli utenti che vi accedono. L\'accesso e l\'uso del Sito implicano la piena accettazione dei presenti Termini.',
        },
      ],
    },
    {
      heading: "Descrizione dei servizi",
      blocks: [
        {
          kind: "p",
          text: "Loom Studio è uno studio creativo che offre servizi di web design, sviluppo web, progettazione di esperienze digitali, branding e attività correlate. Il Sito ha finalità informative e promozionali e consente di richiedere informazioni o preventivi tramite l'apposito modulo di contatto.",
        },
      ],
    },
    {
      heading: "Richieste e preventivi",
      blocks: [
        {
          kind: "p",
          text: "L'invio di una richiesta tramite il modulo di contatto non costituisce un ordine né un contratto vincolante, ma una semplice manifestazione di interesse. Ogni eventuale rapporto contrattuale sarà disciplinato da un accordo o preventivo separato e specifico, concordato per iscritto tra le parti.",
        },
      ],
    },
    {
      heading: "Utilizzo del Sito",
      blocks: [
        {
          kind: "p",
          text: "L'utente si impegna a utilizzare il Sito nel rispetto della legge, della buona fede e dei presenti Termini. In particolare, è vietato:",
        },
        {
          kind: "list",
          items: [
            "Utilizzare il Sito per finalità illecite o non autorizzate.",
            "Tentare di accedere senza autorizzazione ad aree riservate, sistemi o reti collegate al Sito.",
            "Interferire con il corretto funzionamento del Sito o comprometterne la sicurezza.",
            "Riprodurre, duplicare o sfruttare commercialmente i contenuti del Sito senza autorizzazione.",
          ],
        },
      ],
    },
    {
      heading: "Proprietà intellettuale",
      blocks: [
        {
          kind: "p",
          text: 'Tutti i contenuti presenti sul Sito — inclusi testi, grafiche, loghi, immagini, layout, codice e il marchio "Loom Studio" — sono di proprietà di Loom Studio o dei rispettivi titolari e sono protetti dalle normative vigenti in materia di proprietà intellettuale e industriale. Non è consentito alcun utilizzo non espressamente autorizzato per iscritto.',
        },
      ],
    },
    {
      heading: "Limitazione di responsabilità",
      blocks: [
        {
          kind: "p",
          text: "Loom Studio si impegna a mantenere i contenuti del Sito accurati e aggiornati, ma non garantisce l'assenza di errori, imprecisioni o interruzioni del servizio. Nei limiti consentiti dalla legge, Loom Studio non è responsabile per eventuali danni diretti o indiretti derivanti dall'accesso o dall'utilizzo del Sito, o dall'impossibilità di accedervi.",
        },
      ],
    },
    {
      heading: "Collegamenti a siti terzi",
      blocks: [
        {
          kind: "p",
          text: "Il Sito può contenere collegamenti a siti web di terzi. Loom Studio non esercita alcun controllo su tali siti e non è responsabile dei loro contenuti, delle loro politiche o dei loro servizi. L'accesso a siti terzi avviene a esclusivo rischio dell'utente.",
        },
      ],
    },
    {
      heading: "Modifiche ai Termini",
      blocks: [
        {
          kind: "p",
          text: "Loom Studio si riserva il diritto di modificare in qualsiasi momento i presenti Termini. Le modifiche avranno effetto dal momento della loro pubblicazione sul Sito. Si invita l'utente a consultare periodicamente questa pagina.",
        },
      ],
    },
    {
      heading: "Legge applicabile e foro competente",
      blocks: [
        {
          kind: "p",
          text: "I presenti Termini sono regolati dalla legge italiana. Per ogni controversia relativa alla loro interpretazione o esecuzione sarà competente il foro del luogo in cui ha sede Loom Studio, fatte salve le disposizioni inderogabili di legge a tutela del consumatore.",
        },
      ],
    },
    {
      heading: "Contatti",
      blocks: [
        {
          kind: "p",
          text: `Per qualsiasi informazione relativa ai presenti Termini è possibile contattarci all'indirizzo ${EMAIL}.`,
        },
      ],
    },
  ],
};

const cookie: LegalDocument = {
  key: "cookie",
  eyebrow: "Cookie Policy",
  title: "Cookie Policy",
  intro:
    "Questa Cookie Policy spiega cosa sono i cookie, quali cookie utilizziamo su questo sito, con quali finalità e come puoi gestire le tue preferenze.",
  updated: UPDATED,
  sections: [
    {
      heading: "Cosa sono i cookie",
      blocks: [
        {
          kind: "p",
          text: "I cookie sono piccoli file di testo che i siti web salvano sul dispositivo dell'utente durante la navigazione. Consentono al sito di funzionare correttamente, di ricordare le preferenze dell'utente e di raccogliere informazioni statistiche o di marketing. Tecnologie simili, come i pixel e il local storage, sono equiparate ai cookie e disciplinate dalla presente policy.",
        },
      ],
    },
    {
      heading: "Tipologie di cookie utilizzati",
      blocks: [
        { kind: "p", text: "Questo sito utilizza le seguenti categorie di cookie:" },
        {
          kind: "list",
          items: [
            "Cookie tecnici e necessari: indispensabili per il corretto funzionamento del sito e per erogare i servizi richiesti, ad esempio la gestione del modulo di contatto e delle preferenze sui cookie. Non richiedono il consenso dell'utente.",
            "Cookie analitici: utilizzati per raccogliere informazioni statistiche in forma aggregata sull'utilizzo del sito, ad esempio tramite Google Analytics. Vengono installati solo previo consenso.",
            "Cookie di profilazione e marketing: utilizzati per mostrare annunci in linea con gli interessi dell'utente e per attività di remarketing, ad esempio tramite Google Ads e Meta Pixel. Vengono installati solo previo consenso.",
          ],
        },
      ],
    },
    {
      heading: "Cookie di terze parti",
      blocks: [
        {
          kind: "p",
          text: "Alcuni cookie sono installati da soggetti terzi (ad esempio Google e Meta) che agiscono come autonomi titolari del trattamento. Per maggiori informazioni sul trattamento effettuato da questi soggetti e sulle relative modalità di opposizione, si rimanda alle rispettive informative:",
        },
        {
          kind: "list",
          items: [
            "Google: https://policies.google.com/privacy",
            "Meta: https://www.facebook.com/privacy/policy",
          ],
        },
      ],
    },
    {
      heading: "Gestione del consenso",
      blocks: [
        {
          kind: "p",
          text: "Al primo accesso al sito, un banner ti consente di accettare, rifiutare o personalizzare l'utilizzo dei cookie non necessari. I cookie analitici e di marketing vengono installati solo dopo aver ottenuto il tuo consenso. Puoi modificare o revocare le tue preferenze in qualsiasi momento tramite le impostazioni dei cookie del sito.",
        },
      ],
    },
    {
      heading: "Come gestire i cookie dal browser",
      blocks: [
        {
          kind: "p",
          text: "Oltre al banner, puoi gestire o disabilitare i cookie direttamente dalle impostazioni del tuo browser. Di seguito i link alle guide dei browser più diffusi:",
        },
        {
          kind: "list",
          items: [
            "Google Chrome: https://support.google.com/chrome/answer/95647",
            "Mozilla Firefox: https://support.mozilla.org/it/kb/Attivare%20e%20disattivare%20i%20cookie",
            "Safari: https://support.apple.com/it-it/guide/safari/sfri11471/mac",
            "Microsoft Edge: https://support.microsoft.com/it-it/microsoft-edge",
          ],
        },
        {
          kind: "p",
          text: "La disattivazione dei cookie tecnici potrebbe compromettere il corretto funzionamento del sito.",
        },
      ],
    },
    {
      heading: "Durata dei cookie",
      blocks: [
        {
          kind: "p",
          text: "I cookie possono essere di sessione, ed essere quindi eliminati alla chiusura del browser, oppure persistenti, e restare quindi memorizzati per un periodo determinato. La durata varia in base alla tipologia e al fornitore del cookie e viene definita nel rispetto del principio di minimizzazione.",
        },
      ],
    },
    {
      heading: "Titolare e contatti",
      blocks: [
        {
          kind: "p",
          text: `Il Titolare del trattamento dei dati raccolti tramite cookie è Loom Studio, contattabile all'indirizzo ${EMAIL}. Per maggiori informazioni sul trattamento dei tuoi dati personali consulta la nostra Privacy Policy.`,
        },
      ],
    },
    {
      heading: "Aggiornamenti",
      blocks: [
        {
          kind: "p",
          text: "La presente Cookie Policy può essere aggiornata periodicamente. Ti invitiamo a consultarla regolarmente; la data di ultimo aggiornamento è indicata in cima a questa pagina.",
        },
      ],
    },
  ],
};

export const LEGAL_DOCUMENTS: Record<LegalKey, LegalDocument> = {
  privacy,
  termini,
  cookie,
};
