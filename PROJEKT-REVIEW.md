# 🔎 Projekt-Review: Nachkontrolle der drei Fix-Runden

**Stand:** 2026-07-13 · Branch `main` (Commit `4f22217`) · Review der in
[PROJEKT-ANALYSE.md](PROJEKT-ANALYSE.md) dokumentierten Änderungen

Dieses Dokument ist eine unabhängige Nachkontrolle: Statt der Analyse zu glauben, wurden die umgebauten
Stellen stichprobenartig gegengeprüft — per Code-Review, `bun run test`/`lint`/`build` (alle grün, 24/24
Tests) und zwei empirischen Verifikationen (Playwright gegen `vite preview`, Docker-Container mit der echten
`nginx.conf`).

Legende: 🔴 hoch · 🟠 mittel · 🟡 niedrig

---

## 1. Gesamturteil

Die drei Runden sind **überdurchschnittlich sauber** gearbeitet:

- Die Fixes sind nicht nur behauptet, sondern fast durchgehend mit Playwright/`tsc`/ESLint verifiziert, teils
  mit Vorher/Nachher-Messung (`getComputedStyle` bei A5).
- Der Umgang mit B3 (False Positive erkannt und **nicht** „gefixt", was das funktionierende Scroll-to-Top
  zerstört hätte) und mit A4/Prettier (bewusst zurückgestellt statt blind durchgezogen) zeigt genau die
  richtige Zurückhaltung.
- Die Nebenfunde (B10-Deploy-Blocker, `url(./footer.svg)`-404, 0×0-Clear-Button) sind echte Bugs, die ohne die
  Umbauten unentdeckt geblieben wären.
- Bundle 755 → 209 KB gzip, Blog-Bilder 10,4 MB → 150 KB, Fonts 9 MB → 118 KB — die Performance-Arbeit ist
  messbar und substanziell.

**Aber:** Die Nachkontrolle hat **zwei echte Regressionen/Lücken gefunden, die in der Analyse fehlen** — eine
davon hebelt einen als „✅ GEFIXT" markierten Security-Fix (S3) faktisch aus. Details in Abschnitt 2.

---

## 2. Neue Funde (nicht in PROJEKT-ANALYSE.md)

### 🔴 R1: nginx-Security-Header fehlen ausgerechnet auf `index.html` — S3 ist faktisch wirkungslos

**Empirisch verifiziert** (Container mit `nginxinc/nginx-unprivileged:stable-alpine` + der echten
[`docker/nginx.conf`](docker/nginx.conf) + dem echten `dist/`):

```
GET /                     → nur "Cache-Control: no-cache"           (KEINE Security-Header!)
GET /assets/<fingerprint> → nur "Cache-Control: … immutable"        (KEINE Security-Header!)
GET /robots.txt           → alle 5 Security-Header vorhanden
```

Ursache ist eine dokumentierte, aber notorisch übersehene nginx-Semantik: `add_header` wird von der
`server`-Ebene **nur dann** in einen `location`-Block vererbt, wenn der Block **kein eigenes** `add_header`
definiert. `location = /index.html` und `location /assets/` setzen jeweils ihr `Cache-Control` — und verlieren
damit **alle fünf** auf Server-Ebene definierten Security-Header. CSP, `X-Frame-Options` & Co. wirken aber
praktisch nur auf dem **HTML-Dokument** — genau der Response, der sie jetzt nicht bekommt. Der S3-Fix schützt
aktuell im Wesentlichen `robots.txt`.

**Fix (klein):** Die fünf `add_header`-Zeilen in eine Datei auslagern und per `include` in den `server`-Block
**und** in die beiden Location-Blöcke mit eigenem `add_header` ziehen (oder die fünf Zeilen dort schlicht
wiederholen). Danach erneut mit `curl -I` gegen einen lokalen Container verifizieren — der Testaufbau aus
diesem Review ist ein Einzeiler.

### 🔴 R2: Scroll-Position bleibt bei Client-Side-Navigation hängen (Regression aus A7)

Vor A7 war jede interne Navigation ein Full Page Reload — Scroll-Reset auf 0 gab es gratis. Seit der
Umstellung auf Router-`<Link>` gibt es **keinerlei Scroll-Handling** beim Routenwechsel (projektweit existiert
kein `ScrollRestoration`/`ScrollToTop`; das einzige `scrollTo` in
[`PageCardList.tsx:161`](src/features/header/PageCardList/PageCardList.tsx#L161) greift nur bei Nav-Klicks
**auf der Home-Seite**).

**Empirisch verifiziert** (Playwright gegen `vite preview`, Production-Build):

```
/skills (auf 1588px gescrollt) → Nav-Klick auf "Blog"
→ /blog landet bei body.scrollTop = 187 (Maximum der Seite) statt 0
```

Der Nutzer klickt unten auf Skills einen Link und landet **mitten in** der Blog-Seite. Betroffen sind alle
internen Navigationen (BlogCard, ProjectTile, BackLink, Nav auf Unterseiten, SkillChip). Dass es im Alltag oft
_zufällig_ gut geht, liegt nur daran, dass `<Suspense fallback={null}>` beim ersten Laden eines Chunks die
Seitenhöhe kurz auf 0 kollabieren lässt und `scrollTop` dadurch geklemmt wird — sobald der Chunk gecacht ist,
bleibt die Position stehen. Ein Scroll-Reset, der vom Chunk-Cache-Zustand abhängt, ist kein Verhalten, sondern
ein Zufall.

**Fix (klein), mit einer Besonderheit:** React-Routers eingebaute `<ScrollRestoration />` nützt hier
**nichts** — sie arbeitet auf `window`, und in diesem Projekt scrollt der `<body>` selbst (siehe B3 in der
Analyse: `html, body { height: 100%; overflow-y: auto }`). Richtig ist eine kleine eigene Komponente:

```tsx
const ScrollToTop = () => {
	const { pathname } = useLocation();
	useEffect(() => {
		document.body.scrollTo(0, 0);
	}, [pathname]);
	return null;
};
```

einmal neben `<PageMeta>` in die Route-Elements gehängt. (Mittelfristig wäre zu überlegen, das ungewöhnliche
Body-Scroll-Setup aufzugeben, damit Browser-Standardverhalten — inklusive Scroll-Restoration beim Back-Button
— wieder von selbst funktioniert; das ist aber ein eigenes Vorhaben mit Risiko, kein Quick-Fix.)

### 🟠 R3: `og:image` zeigt auf `/me.png` — das per `robots.txt` gesperrt ist

[`main.tsx`](src/main.tsx) setzt `og:image = https://temmi.land/me.png` +
`twitter:card = summary_large_image`. Gleichzeitig steht in [`public/robots.txt`](public/robots.txt):
`User-agent: * → Disallow: /me.png`.

Die Crawler von Facebook, X/Twitter, LinkedIn und Slack **respektieren robots.txt** beim Abruf von
Preview-Bildern — die Link-Vorschau bleibt auf diesen Plattformen also voraussichtlich bildlos, der
P5-OG-Ausbau verpufft teilweise. Dazu passt das Bild auch inhaltlich nicht:

- 816×1088 **Hochformat** — `summary_large_image` erwartet ~1200×630 Querformat; Plattformen schneiden das
  Porträt willkürlich zu.
- 650 KB PNG — unnötig groß für ein Preview-Bild.
- Und konzeptionell: S8 hat sich bemüht, `me.png` vor Crawlern zu verstecken — dieselbe Datei als OG-Bild
  aktiv an jede Social-Plattform zu verteilen, widerspricht dieser Absicht direkt.

**Fix:** Auf lange Frist ein dediziertes OG-Bild bauen (1200×630, z. B. Name + Claim im Site-Design, als
JPEG/WebP < 200 KB), unter z. B. `/og.jpg` ablegen, in `main.tsx` referenzieren — und **nicht** per robots.txt
sperren. Die `Disallow: /me.png`-Zeile bleibt konsistent bestehen. Die Datei wird irgendwann nachgeliefert.
Bis dahin gibts kein og:image.

### 🟠 R4: `ports: "93:93"` in docker-compose veröffentlicht den Origin am Proxy vorbei

[`docker-compose.yml`](docker-compose.yml) bindet Port 93 auf den **Host**, obwohl Traefik den Container
ohnehin über das gemeinsame `proxy`-Netzwerk erreicht (`loadbalancer.server.port=93`). Das Host-Binding ist
funktional unnötig und öffnet — sofern die Host-Firewall Port 93 nicht blockt — einen direkten,
unverschlüsselten Weg zum Origin, der Cloudflare, TLS, HSTS und die HTTPS-Redirect-Middleware komplett umgeht
(und nebenbei die echte Origin-IP verifizierbar macht). Docker schreibt seine `ports:`-Regeln zudem direkt in
iptables und umgeht damit auf vielen Setups die Host-Firewall (ufw).

**Fix:** Die `ports:`-Sektion ersatzlos streichen; Traefik braucht sie nicht.

### 🟡 R5: SHA-Pinning aus S2 inkonsequent — nur eine von drei Actions gepinnt

Der S2-Fix pinnt `xiaotianxt/bypass-cloudflare-for-github-action` auf einen Commit-SHA — mit der Begründung,
mutable Tags seien ein Supply-Chain-Risiko. `actions/checkout@v4` und `oven-sh/setup-bun@v2` in derselben
Datei laufen aber weiter auf mutablen Tags. Beide laufen im selben Job-Kontext, in dem später `CI_KEY` (und im
Deploy-Job `CF_API_TOKEN`) verwendet werden — die S2-Begründung gilt für sie genauso. Analog: das
Builder-Image `FROM oven/bun` im [`docker/Dockerfile`](docker/Dockerfile) ist komplett ungepinnt (= `latest`)
— jeder Server-Build kann auf einer anderen Bun-Major-Version laufen als lokal getestet.

**Fix:** `actions/checkout` und `oven-sh/setup-bun` ebenfalls auf Commit-SHAs pinnen (Kommentar mit dem Tag
daneben, wie bei der Cloudflare-Action schon vorbildlich gemacht); `oven/bun` auf einen Versions-Tag oder
Digest (`oven/bun:1.2@sha256:…`) festnageln.

### 🟡 R6: Kleinkram

- **`Link.tsx` tote Defaults:** `href` ist inzwischen ein Pflicht-Prop, aber der Default `href = '#'` steht
  noch da (toter Code); `children = 'This is a link.'` ist ein Platzhaltertext, der bei einem Fehler **in
  Produktion** rendern würde statt eines `tsc`-Fehlers. Beide Defaults streichen (`children` ist ohnehin
  Pflicht-Prop).
- **`nginx.conf`-Kommentare sprechen vom „alimonia website"** (2×) — Copy-Paste-Rest aus einem anderen
  Projekt, irritiert beim nächsten Lesen.
- **`<Suspense fallback={null}>`:** Auf langsamen Verbindungen ist die Seite beim ersten Klick auf eine neue
  Route sichtbar leer, ohne jedes Feedback. Bewusste Entscheidung laut Analyse, aber ein minimaler zentrierter
  Spinner/Fade wäre ehrlicher als „nichts". Niedrige Priorität.
- **Sitemap ohne `lastmod`:** `changefreq`/`priority` ignoriert Google seit Jahren, `lastmod` ist das einzige
  Feld, das tatsächlich ausgewertet wird — und gerade das fehlt. `scripts/generate-sitemap.ts` könnte es für
  Blog-Posts aus `data/blog.ts` (Datum vorhanden) ableiten.
- **Port 93 (< 1024) im unprivilegierten Image:** Funktioniert unter Docker ≥ 20.10 nur, weil Docker
  `ip_unprivileged_port_start=0` setzt. Auf Kubernetes/Podman/anderen Runtimes würde `nginx-unprivileged` als
  uid 101 den Bind auf 93 verweigern. Kein akuter Bug, aber eine versteckte Portabilitäts-Annahme — der
  Image-Standardport 8080 wäre robuster.

---

## 3. Offene Posten (konsolidiert)

Die „Noch offen"-Liste am Ende von PROJEKT-ANALYSE.md ist **unvollständig** — sie nennt die großen Posten,
lässt aber die in den Einzeleinträgen dokumentierten Reste weg. Hier die vollständige Liste:

### Neu aus diesem Review

| #   | Prio | Aufwand | Posten                                                                                       |
| --- | ---- | ------- | -------------------------------------------------------------------------------------------- |
| R1  | 🔴   | Minuten | nginx: Security-Header per `include` in die Cache-Control-Locations (S3 real wirksam machen) |
| R2  | 🔴   | Minuten | `ScrollToTop`-Komponente (auf `document.body`!) für Client-Side-Navigation                   |
| R3  | 🟠   | ~1 h    | Dediziertes OG-Bild 1200×630 statt robots-gesperrtem `me.png`                                |
| R4  | 🟠   | Minuten | `ports: "93:93"` aus docker-compose streichen (Traefik-Netz reicht)                          |
| R5  | 🟡   | Minuten | `checkout`/`setup-bun` auf SHA pinnen, `oven/bun` auf Version/Digest                         |
| R6  | 🟡   | Minuten | Kleinkram: Link-Defaults, „alimonia"-Kommentare, Sitemap-`lastmod`                           |

### Übernommen aus PROJEKT-ANALYSE.md (bereits dokumentiert)

- **A4** — ✅ **Teilweise gefixt (14.07.2026).** Der Basis-vw+`media.wide`-Teil ist über alle 18 Dateien
  migriert, in denen der `wide`-Wert exakt `vw × 20` war (107 Ersetzungen). Mit Playwright verifiziert:
  `getComputedStyle`/`getBoundingClientRect` für jedes Element auf 5 Routen × 2 Viewportbreiten
  vorher/nachher identisch. **Weiterhin bewusst offen:** die `mobile`/`tablet`-Stufenwerte auf stetige
  Skalierung umzustellen ändert das tatsächliche Verhalten — das bleibt eine Design-Entscheidung, keine
  Codepflege. Laufende Arbeit, siehe Memory „Styles-Token-Migration".
- **A3-Rest** — ✅ **GEFIXT (13.07.2026).** `ExpandedProject` (~200 Zeilen JSX inkl. aller zugehörigen
  Styled-Components) aus `ProjectGrid.tsx` nach
  [`features/projects/ExpandedProject/ExpandedProject.tsx`](src/features/projects/ExpandedProject/ExpandedProject.tsx)
  ausgelagert (eigener Ordner + `index.ts`, wie beim Rest des Projekts üblich). `ProjectGrid.tsx` schrumpft
  von 979 auf ~170 Zeilen. Mit `tsc`/ESLint/Vitest sowie Playwright (Expand/Close bei sechs Viewport-Breiten
  von 320–2200px, keine Konsolenfehler) verifiziert.
- **B5-Rest** — ✅ **GEFIXT (13.07.2026).** Layout-Messung in `ProjectGrid.tsx` läuft jetzt über einen
  React-Ref (`gridRef`) statt `document.getElementsByClassName('expandable-grid')`. Die Breakpoint-Duplikation
  zwischen JS und `media.ts` ist aufgelöst: `media.ts` exportiert jetzt `breakpoints` (600/1024/2000, einzige
  Quelle für die `media`-Query-Strings) und `columnsForWidth()`, das `ProjectGrid` für die Spaltenzahl nutzt —
  inklusive Seiteneffekt, dass sehr schmale Viewports (<320px) jetzt korrekt 1 statt 4 Spalten bekommen (alter
  Code hatte hier eine Lücke). Mit Playwright verifiziert: sechs Viewport-Breiten plus Live-Resize
  (800→1600→500px), keine Konsolenfehler, Tile-Breite reagiert korrekt.
- **P5-Rest** — Prerendering/SSG für Crawler ohne JS. Größerer Architektur-Umbau; wenn er je kommt, löst er R3
  gleich mit.
- **P1-Rest** — Brotli am Origin. Bewusst verworfen (kein offizielles Image, Cloudflare komprimiert am Edge) —
  kann als „entschieden, nicht offen" geführt werden.
- **A10-Rest** — ✅ **GEFIXT (13.07.2026), vollständiger Reformat.** Aktivieren von `prettier/prettier` zeigte
  2.316 Fehler (mit der schon vorhandenen `.prettierrc.yml`, nicht wie angenommen 0) — Hauptursache war kein
  Config-Detail, sondern ein echter Widerspruch: Prettier kennt keine Option, um Leerzeichen in JSX-Ausdrücken
  (`{ value }`) zu erzwingen, das Projekt nutzte das aber konsequent via `react/jsx-curly-spacing`.
  Nutzer-Entscheidung eingeholt: vollständiger Reformat statt Plugin-Entfernung. `.prettierrc.yml` an den
  Projektstil angepasst (`trailingComma: none`, `printWidth: 110`), die mit Prettier kollidierenden manuellen
  ESLint-Regeln entfernt (per `npx eslint-config-prettier` ermittelt: `comma-dangle`, `indent`,
  `object-curly-newline`, `array-element-newline`, `object-curly-spacing`, `brace-style`, `jsx-curly-newline`,
  `jsx-curly-spacing`, `jsx-one-expression-per-line`, dazu `max-len`/`quotes` als jetzt redundant), dann
  `eslint --fix` über die 108 betroffenen Dateien laufen lassen. Rein mechanisch (Bundle-Output
  byte-identisch), mit `tsc`/ESLint/Vitest (24/24) und Playwright (6 Routen, keine Konsolenfehler)
  verifiziert.
- **S2-Rest** — Cloudflare-API-Token auf die eine Zone/Permission scopen (Cloudflare-Dashboard, außerhalb des
  Repos).
- **A12-Rest** — ✅ **GEFIXT (13.07.2026).** Stories für `Blog`, `BlogPost`, `Skills` und `SkillCard` ergänzt.
  Dabei einen bislang unentdeckten Bug gefunden: **jede** Page-Story, die `Link` oder `<Helmet>` verwendet
  (`Home`, `Privacy`, `Imprint`, `Project`, `ProjectGrid` sowie jetzt `Blog`/`BlogPost`/`Skills`), crashte
  beim tatsächlichen Rendern in Storybook (`storybook-static` + Playwright dagegen, nicht nur `tsc`/Lint) — es
  gab nirgends einen Router- oder `HelmetProvider`-Kontext für die Stories. Nur `Home`/`Blog`/`Skills` liefen
  zufällig durch, weil sie kein eigenes `<Helmet>` rendern; `Project` und jetzt `BlogPost` taten das und
  crashten mit „Cannot read properties of undefined (reading 'add')". Gefixt in
  [`.storybook/preview.tsx`](.storybook/preview.tsx) (von `.ts` umbenannt): globaler Decorator mit
  `HelmetProvider` + `MemoryRouter`. Damit rendern jetzt alle zehn betroffenen Stories fehlerfrei — auch die
  vorher schon vorhandenen, aber nie tatsächlich gegen einen echten Storybook-Build verifizierten.
  `projectTechOptions`-Ableitung bleibt als UX-Entscheidung verworfen.

### Weitere manuell gefundene Punkte:

1. Einige Icons werden nicht angezeigt. Bspw. das bei dem Chip Senior Developer oder den Working Pills in der
   erweiteren Projekt Ansicht.
2. In der erweiterten Projektansicht sind die Pills (Lizenz und co) deutlich höher als das Close Pill. Das
   sollte gleich hoch sein.
3. Links sind immer blau unterstrichen, mega nervig. Im Nav sehen Links halt anders aus, als im Footer oder im
   Fließtext. Das sollte die Komponente irgendwie nicht einschränken. Das Design kommt vom Use Case.

### Empfohlene Reihenfolge

R1, R2 und R4 zuerst — alle drei sind Minuten-Fixes, und R1/R2 sind Regressionen bzw. Scheinfixes aus den
letzten Runden, die live wirken. Danach R3/R5/R6 als Sammel-Commit. A3-Rest + B5-Rest als nächster gemeinsamer
`ProjectGrid`-Umbau, A4 weiter als laufende Arbeit. Bei A10 eine Entscheidung treffen statt weiter
aufzuschieben.

---

_Erstellt am 13.07.2026 als unabhängige Nachkontrolle (Claude Code). Verifikation: `bun run test` (24/24
grün), `bun run lint` (sauber), `bun run build` (erfolgreich), Playwright gegen `vite preview`
(Scroll-Verhalten R2), Docker-Container mit Original-`nginx.conf` gegen das echte `dist/` (Header-Vererbung
R1)._
