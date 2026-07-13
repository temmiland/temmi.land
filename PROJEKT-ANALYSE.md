# 🔍 Projekt-Analyse: temmi.land

**Stand:** 2026-07-13 · Branch `main` (Commit `37d5219`) · ~13.900 Zeilen TS/TSX in 151 Dateien

Diese Analyse bewertet das Projekt gegen Best Practices für ein React/TypeScript/Vite-Projekt.
Gegliedert in: **Bugs**, **Sicherheit**, **Code-Qualität/Architektur**, **Performance & SEO**,
**Positives** und eine **priorisierte To-do-Liste**.

Legende: 🔴 hoch · 🟠 mittel · 🟡 niedrig

---

## 1. Bugs

> **Status 13.07.2026:** B1, B2, B4, B5, B6, B7, B8, B9 sind gefixt (verifiziert per
> `tsc`, ESLint, Production-Build und einem Headless-Browser-Durchlauf). **B3 hat sich in der
> Verifikation als False Positive herausgestellt** — Details unten.

### 🔴 B1: `--webkit-backdrop-filter` statt `-webkit-backdrop-filter` (8 Stellen) — ✅ GEFIXT

Der Vendor-Prefix ist mit **zwei** Bindestrichen geschrieben. CSS interpretiert `--webkit-…` als
Custom Property (Variable) — die Deklaration ist damit ein No-op. Auf älteren Safari-Versionen
(< 18), die den Prefix noch brauchen, fällt der komplette Glass-/Blur-Effekt aus.

Betroffen:
- `src/ui/Filter/Filter.tsx:48`
- `src/features/about/AboutSection/AboutSection.tsx:56, 285`
- `src/features/header/HeaderContent/HeaderContent.tsx:20, 44`
- `src/pages/Skills/Skills.tsx:417`
- `src/features/blog/BlogCard/BlogCard.tsx`
- `src/features/skills/SkillCard/SkillCard.tsx`

Interessant: In `ProjectGrid.tsx` (glassChip/glassPanel) ist es **richtig** geschrieben — der
Fehler ist also beim Kopieren entstanden und beim Refactoring auf gemeinsame Mixins nie
konsolidiert worden (siehe A3).

### 🔴 B2: `Link`-Komponente verwirft `target` und `rel` — ✅ GEFIXT

`src/ui/Link/Link.tsx` deklariert `target?: string` und `rel?: string` in den Props, destrukturiert
sie aber nicht und gibt sie nicht an das gerenderte Element weiter:

```tsx
export const Link = ({ children, href = '#', className, onClick }: LinkProps) => {
	return <A href={ href } className={ className } onClick={ onClick }>{ children }</A>;
};
```

Jeder Aufrufer, der `<Link target="_blank" rel="noopener">` übergibt, bekommt stillschweigend
einen normalen Link. Das ist eine klassische Falle: Das Interface verspricht etwas, das die
Implementierung nicht einhält.

### ✅ B3: `document.body.scrollTo` — VERIFIZIERT, KEIN BUG (False Positive)

`src/features/header/PageCardList/PageCardList.tsx:161` ruft `document.body.scrollTo(...)` auf.
Ich hatte angenommen, der Scroll-Container sei `html`/`window` und der Aufruf damit ein No-op.

**Ein Headless-Chrome-Test, der das exakte CSS aus `index.css` nachbaut, widerlegt das:**

```
scrollingElement: "html"
window.scrollTo(0, 800)        → body:0,   html:0,  window.scrollY:0   (No-op!)
document.body.scrollTo(0, 800) → body:800, html:0,  window.scrollY:0   (funktioniert)
```

Grund: `index.css` setzt `html, body, :root { height: 100%; overflow-y: auto }`. Damit ist der
`<body>` auf Viewport-Höhe fixiert und scrollt seinen überlaufenden Inhalt **selbst** — `html`
hat nichts zu scrollen. Der bestehende Code ist also **korrekt**; ein „Fix" auf `window.scrollTo`
hätte das funktionierende Scroll-to-Top zerstört. (Der einzige verbleibende Kritikpunkt ist die
Ungewöhnlichkeit dieses Scroll-Setups an sich — aber das ist kein Bug.)

### 🟠 B4: Breakpoint-Lücken und -Überlappungen in `media.ts` — ✅ GEFIXT

```ts
mobile: '@media (min-width: 320px) and (max-width: 600px)',
tablet: '@media (min-width: 600px) and (max-width: 1024px)',
```

- Bei **exakt 600px** (und 1024px) matchen *beide* Queries gleichzeitig — welche Styles gewinnen,
  hängt von der Deklarationsreihenfolge im jeweiligen Component ab. Best Practice:
  `(max-width: 599.98px)` oder mobile-first nur mit `min-width` arbeiten.
- Unter **320px** matcht *gar keine* Query — dort gelten die Desktop-Basiswerte (z. B. `font-size:
  0.9vw` ≈ 2–3px). Ein iPhone SE im Zoom-Modus oder alte Androids fallen durch das Raster.

### 🟠 B5: `ProjectGrid` — Widersprüchliche Breiten-Logik + toter Check — ✅ TEILWEISE GEFIXT

`src/features/projects/ProjectGrid/ProjectGrid.tsx:961-994`:

1. `calculateInitialElementWidth()` und `calculateElementWidth()` benutzen **unterschiedliche
   Formeln** (`size * 0.75 / columns` vs. `element[0].offsetWidth / columns`) und
   **unterschiedliche Magic Numbers** für Wide-Screens (`360` vs. `380`). Beim ersten Resize
   springt das Layout.
2. `element !== undefined` ist immer wahr — `getElementsByClassName` gibt nie `undefined` zurück.
   Der Check täuscht eine Absicherung vor, die nicht existiert.
3. Die Breakpoint-Grenzen (320/600/1024/2000) sind hier nochmal hart codiert und duplizieren
   `media.ts` — ändert man die Breakpoints dort, bricht die JS-Logik lautlos auseinander.
4. Layout-Messung über `document.getElementsByClassName('expandable-grid')` statt über eine
   React-Ref ist fragil (Klassennamen sind API einer fremden Library).

**Gefixt (13.07.):** toter `!== undefined`-Check entfernt (1+2), Wide-Wert auf `380` vereinheitlicht,
und beim Mount wird jetzt einmal gemessen (mit Null-Guard), sodass die Vor-Render-Schätzung nicht
bis zum ersten Resize hängen bleibt. **Offen:** Punkt 4 (Messung per Ref statt Klassenname) und die
verbleibende Breakpoint-Duplikation zwischen JS und `media.ts` (3) — beides gehört in den größeren
`ProjectGrid`-Refactor (A3).

### 🟠 B6: Suchfeld synchronisiert nicht zurück in die URL — ✅ GEFIXT

`Skills.tsx` und `Blog.tsx` lesen `?search=`/`?category=` nur einmalig im `useState`-Initializer.
Tippt man danach, ändert sich die URL nie — Reload/Teilen der URL verliert den Zustand. Das
funktioniert aktuell nur zufällig, weil interne Links als `<a href>` (Full Page Reload, siehe A7)
gebaut sind. Sobald auf Router-`<Link>` umgestellt wird, ist auch das Lesen des Params kaputt
(State bleibt beim Client-Side-Routing stehen). `useSearchParams` bietet den Setter direkt an —
er wird nur nicht benutzt.

### 🟡 B7: Non-Null-Assertions an Datengrenzen — ✅ GEFIXT (BlogPost)

- `src/pages/BlogPost/BlogPost.tsx:721`: `blogPosts.find(...)!` — crasht mit weißer Seite, wenn
  die Komponente je ohne die Validierung in `main.tsx` gerendert wird (z. B. aus einer Story oder
  nach einem Refactoring). Sauber: `if (!post) return <Navigate …/>`.
- `ProjectGrid.tsx:1048`: `filteredProjects[currentIndex! - 1]` — das `- 1` codiert
  undokumentiertes Wissen über die 1-Basiertheit der Grid-Library. Ein Off-by-One hier zeigt
  das falsche Projekt an, statt zu crashen.

### 🟡 B8: `robots.txt` ist syntaktisch ungültig — ✅ GEFIXT

```
User-agent: *
Disallow: me.png
```

`Disallow`-Pfade müssen mit `/` beginnen; `me.png` wird von Crawlern ignoriert. Abgesehen davon:
robots.txt ist **kein** Zugriffsschutz — `https://temmi.land/me.png` bleibt für jeden abrufbar
(siehe S8). Außerdem fehlt der `Sitemap:`-Eintrag.

### 🟡 B9: `renderBlock` ist nicht exhaustiv — ✅ GEFIXT

`BlogPost.tsx:660-717`: Der `default`-Fall rendert `<p>{ block.text }</p>`. Kommt ein neuer
Block-Typ ohne `text`-Feld dazu (wie schon `gallery`), rendert ein vergessener Case kommentarlos
`undefined`. Mit einem `never`-Exhaustiveness-Check würde TypeScript den fehlenden Case beim
Kompilieren melden.

---

## 2. Sicherheit

> **Status 13.07.2026:** S1–S9 sind vollständig gefixt (Client, Server und der Webhook-Container-
> Restart sind live) und verifiziert. **S10 bleibt offen** — Lizenzfrage ist eine Entscheidung
> des Autors, keine Code-Änderung.

### 🔴 S1: CI-Deploy-Webhook mit Secret als Query-Parameter — ✅ GEFIXT (Server live neu gestartet)

`.github/workflows/deploy.yml`:

```yaml
curl -s -X POST "https://ci.temmi.land/hooks/deploy-project?key=${{ secrets.CI_KEY }}&repo=…"
```

Query-Strings landen in Access-Logs des Webservers, in Reverse-Proxy-Logs (Traefik/Cloudflare)
und ggf. in Fehlermeldungen. Best Practice: Secret als Header (`Authorization`/`X-Hub-Signature`)
oder besser ein HMAC-signierter Payload (das Webhook-Tool [adnanh/webhook] unterstützt
`payload-hmac-sha256`-Trigger-Regeln).

**Gefixt, Client und Server:**
- Client: `CI_KEY` wird jetzt per `X-Api-Key`-Header statt Query-Parameter gesendet
  (`.github/workflows/deploy.yml`).
- Server: `ci-webhooks`-Projekt (`/Volumes/Data/Eingang/###/Projekte/ci-webhooks/ci-webhooks`,
  separates Repo) — `ci/hooks.tpl.json` prüft für `deploy-project` und `status-project` jetzt
  ebenfalls den `X-Api-Key`-Header statt `?key=`.

Der Webhook-Container wurde neu gestartet, `hooks.json` ist mit der Header-Regel neu gerendert —
der Fix ist live.

### 🔴 S2: Third-Party-Action mit Cloudflare-API-Token, nicht SHA-gepinnt — ✅ GEFIXT

Ebenfalls `deploy.yml`: `xiaotianxt/bypass-cloudflare-for-github-action@v1.1.1` bekommt
`CF_ZONE_ID` und `CF_API_TOKEN`. Ein Tag (`v1.1.1`) ist **mutabel** — der Autor (oder ein
Angreifer mit Zugriff auf dessen Repo) kann den Tag jederzeit auf bösartigen Code umbiegen und
damit dein Cloudflare-Token exfiltrieren. Genau so lief der `tj-actions/changed-files`-Angriff
2025. Maßnahmen:
- Action auf einen **Commit-SHA** pinnen (`uses: xiaotianxt/…@<sha>`),
- Token auf minimale Berechtigung scopen (nur die eine Zone, nur die nötige Permission),
- `actions/checkout@v3` ist zudem veraltet (aktuell v4/v5).

**Gefixt:** Action auf den verifizierten Commit-SHA von `v1.1.1`
(`a87c9ac0348806058904e62e5c8e70d8e37b4a65`) gepinnt, `actions/checkout` auf `v4` angehoben.
**Offen:** Token-Scoping auf Cloudflare-Seite (außerhalb des Repos).

### 🔴 S3: nginx liefert keinerlei Security-Header — ✅ GEFIXT

`docker/nginx.conf` setzt keine Header. Für eine statische Seite Minimum:

```nginx
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
add_header Content-Security-Policy "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'" always;
```

(styled-components braucht `style-src 'unsafe-inline'`, oder Nonces.) HSTS wird auch nirgends
gesetzt — weder in Traefik-Labels noch in nginx. Die Privacy-Seite verweist auf Cloudflare; wenn
Cloudflare davor hängt, relativieren sich einzelne Punkte, aber Defense-in-Depth kostet hier
sechs Zeilen.

**Gefixt:** Alle fünf Header + gzip (`docker/nginx.conf`) und `Cache-Control` (No-cache für
`index.html`, `immutable` für `/assets/`) ergänzt. HSTS via Traefik-Labels in `docker-compose.yml`
gesetzt (dort terminiert TLS, nicht in nginx).

### 🟠 S4: `window.open(url)` ohne `noopener` (Reverse Tabnabbing) — ✅ GEFIXT

`ProjectGrid.tsx:772, 834, 851` öffnen externe Links per `window.open(project.licenseHref)` etc.
Die geöffnete Seite erhält damit eine `window.opener`-Referenz und kann die Ursprungsseite per
`opener.location = 'https://phishing…'` umleiten. Die Ziele sind aktuell eigene Daten (geringe
Ausnutzbarkeit), aber der Fix ist trivial:

```ts
window.open(href, '_blank', 'noopener,noreferrer');
```

Grundsätzlicher: Das sind **Links**, keine Buttons — semantisch korrekt wäre ein `<a href
target="_blank" rel="noopener noreferrer">` (löst auch A8 mit: Tastatur, Mittelklick,
Statusleiste, SEO).

**Gefixt (minimal):** Alle drei `window.open`-Aufrufe in `ProjectGrid.tsx` bekommen jetzt
`'_blank', 'noopener,noreferrer'`. **Offen:** Die semantisch korrekte Umstellung auf echte
`<a>`-Tags gehört zu A8 (größerer Umbau) und wurde hier bewusst nicht mitgemacht.

### 🟠 S5: Docker-Build ohne `.dockerignore` und ohne frozen Lockfile — ✅ GEFIXT

`docker/Dockerfile`:
- `COPY . /app` ohne `.dockerignore` kopiert `node_modules` (macOS-Binaries!), `.git` (komplette
  Historie inkl. `private`-Branch), `dist`, `storybook-static` in den Build-Kontext. Das ist
  langsam, cache-feindlich und leakt bei einem Fehler in der Stage-Trennung Interna.
- `bun i` statt `bun install --frozen-lockfile`: Der Produktions-Build kann andere Versionen
  auflösen als lokal getestet — nicht reproduzierbar und ein Einfallstor für kompromittierte
  Patch-Releases.
- Der nginx-Container läuft als root und `bun pm cache rm` vor `bun i` ist wirkungslos
  (leert einen Cache, der im frischen Layer ohnehin leer ist). Kandidat: `nginx:stable-alpine`
  → `nginxinc/nginx-unprivileged`.

**Gefixt:** `.dockerignore` ergänzt (`.git`, `node_modules`, `dist`, `.afphoto` u. a.),
`bun i` → `bun install --frozen-lockfile`, wirkungsloses `bun pm cache rm` entfernt, Image auf
`nginxinc/nginx-unprivileged:stable-alpine` umgestellt.

### 🟠 S6: Kein Qualitäts-Gate vor dem Deploy — ✅ GEFIXT

Der einzige Workflow deployt bei jedem Push auf `main` — es gibt keinen CI-Job für `tsc`, `lint`
oder `build`. Ein Commit mit Syntaxfehler wird erst beim Docker-Build auf dem Server bemerkt
(oder schlimmer: `bun i` zieht dort etwas anderes und es fällt gar nicht auf).

**Gefixt:** Neuer `verify`-Job (`bun install --frozen-lockfile && bun run lint && bun run build`)
läuft vor `deploy` und blockiert ihn per `needs: verify` bei Fehlern.

### 🟡 S7: Vite-Dev-Server für das ganze Netzwerk offen — ✅ GEFIXT

`vite.config.ts` setzt `server.host: true` — der Dev-Server lauscht auf allen Interfaces. In
fremden WLANs (Café, Zug) kann jeder im Netz auf den Dev-Server zugreifen; ältere Vite-5-Versionen
hatten hier mehrfach File-Read-CVEs. Wenn das nur für Handy-Tests gebraucht wird: in eine lokale
`vite.config.local.ts` bzw. per `--host`-Flag bei Bedarf.

**Gefixt:** `server.host: true` aus `vite.config.ts` entfernt. Für Handy-Tests im selben Netz:
`bun run dev --host` bei Bedarf.

### 🟡 S8: `me.afphoto` (2,4 MB Affinity-Photo-Quelldatei) wird öffentlich deployed — ✅ GEFIXT

Alles in `public/` landet 1:1 im Web-Root. Die `.afphoto`-Datei enthält ggf. Ebenen/Metadaten des
Originalfotos und hat auf einem Produktions-Server nichts verloren. Gleiches Muster:
`src/features/me/Signature/Signature.afphoto` liegt im Quellbaum. Quelldateien gehören in einen
Assets-Ordner außerhalb von `public/` (oder LFS).

**Gefixt:** Beide Dateien aus dem Repo entfernt und nach
`../private.temmi.land-source-assets/` (außerhalb des Projekts) verschoben.

### 🟡 S9: CSV-Export ohne Formula-Escaping — ✅ GEFIXT

`skillExport.ts` escapt Quotes/Kommas korrekt, aber nicht führende `=`, `+`, `-`, `@`. Öffnet
jemand die exportierte CSV in Excel, würde eine Zelle wie `=HYPERLINK(...)` ausgeführt
(CSV/Formula Injection). Da die Daten aus deiner eigenen statischen Datei kommen, ist das Risiko
heute minimal — aber die Escape-Funktion sieht „fertig" aus und ist es nicht. Fix: Zellen, die
mit `=+-@` beginnen, mit `'` prefixen.

**Gefixt:** `escapeCsv` in `skillExport.ts` prefixt Zellen, die mit `=+-@` beginnen, jetzt mit `'`.

### ⚖️ S10: „TRIAL"-Fonts in Produktion (Rechtsrisiko) — ✅ GEFIXT

`public/bogart/BOGARTBOLDTRIAL.TTF` & Co. — die Bogart-Familie (Zetafonts) lag als
**Trial-Version** vor. Trial-Lizenzen von Zetafonts erlauben ausdrücklich **keine** kommerzielle
Nutzung und kein Self-Hosting als Webfont. Für eine Portfolio-Seite, die aktiv Freelance-Aufträge
akquiriert („Open for new projects!"), ist das abmahnfähig.

**Gefixt (13.07.2026):** Auf [Fraunces](https://fonts.google.com/specimen/Fraunces) (Undercase
Type, SIL OFL, frei kommerziell nutzbar) gewechselt — final bestätigt, keine Trial-Lizenz mehr
im Projekt.
- Self-hosted als **eine** variable WOFF2-Datei (`public/fonts/Fraunces-Variable.woff2`,
  ~118 KB) statt der 26 Bogart-TTF-Dateien (~9 MB) — löst nebenbei einen Teil von P2.
- Gewichts-Mapping in `index.css` (pro Bogart-Cut ein `@font-face` mit fixiertem `wght`, gleiche
  Datei): Light → 300, Regular → 400, Medium → 500, Bold → 700. Kein Component-Code musste
  angefasst werden, da `theme.ts` weiterhin vier Font-Family-Namen exportiert.
- `font-variation-settings: 'SOFT' 100, 'WONK' 0` global auf `html, body` — maximal gerundete,
  aber nicht "wonky"/exzentrische Formen, am nächsten an Bogarts kontrolliertem Look.
- Per Playwright-Screenshot auf Home- und Skills-Seite verifiziert (Chromium, `vite preview`).
- Alle 24 Bogart-TRIAL-Dateien aus `public/bogart/` entfernt und nach
  `../private.temmi.land-source-assets/bogart-trial-fonts/` verschoben (außerhalb des Repos).

---

## 3. Code-Qualität & Architektur (die „Senior-Dev-Headshakes")

> **Pfad-Hinweis (13.07.2026):** Die Struktur wurde inzwischen von `components/layouts|widgets`
> nach `pages/` + `features/<feature>/<Komponente>` + `ui/` umgebaut. Alle Fundstellen unten sind
> gegen den aktuellen Working Tree neu verifiziert — die Befunde selbst sind **alle noch offen**,
> nur die Pfade haben sich verschoben.

### 🔴 A1: Seiten-Chrome ist 7-fach copy-gepastet

`HeaderSection`, `FooterSection`, `PageGradient`, `PageMountains` (~130 Zeilen styled-components)
existieren nahezu identisch in [`pages/Home/Home.tsx`](src/pages/Home/Home.tsx),
[`pages/Blog/Blog.tsx`](src/pages/Blog/Blog.tsx),
[`pages/BlogPost/BlogPost.tsx`](src/pages/BlogPost/BlogPost.tsx),
[`pages/Skills/Skills.tsx`](src/pages/Skills/Skills.tsx),
[`pages/Project/Project.tsx`](src/pages/Project/Project.tsx),
[`pages/Privacy/Privacy.tsx`](src/pages/Privacy/Privacy.tsx) und
[`pages/Imprint/Imprint.tsx`](src/pages/Imprint/Imprint.tsx) — inklusive divergierender Kopien:
`Home.tsx` nutzt `z-index: 3` für die Mountains, alle anderen `300`; mal `url(/footer.svg)`, mal
`url(./footer.svg)`. Das ist die teuerste Duplikation im Projekt: Jede Layout-Änderung muss an
7 Stellen nachgezogen werden und driftet nachweislich bereits auseinander.

**Fix:** Eine `PageLayout`-Komponente (`<PageLayout><Header/>{children}<Footer/></PageLayout>`),
die Gradient + Mountains einmal definiert. Reduziert jede Page um ~150 Zeilen.

### 🔴 A2: Identische Such-/Dropdown-Styles doppelt und dreifach

- `SearchRow` + `SearchInputWrapper` (~130 Zeilen) sind **byte-identisch** in
  [`pages/Blog/Blog.tsx`](src/pages/Blog/Blog.tsx) und
  [`pages/Skills/Skills.tsx`](src/pages/Skills/Skills.tsx).
- `DropdownTrigger`/`DropdownPanel` existieren einmal in
  [`pages/Skills/Skills.tsx`](src/pages/Skills/Skills.tsx) und einmal (leicht anders) in
  [`ui/Filter/Filter.tsx`](src/ui/Filter/Filter.tsx).

Das gehört als `ui/SearchInput` und `ui/Dropdown` neben `Filter` — genau dafür gibt es den
`ui/`-Ordner bereits.

### 🔴 A3: `ProjectGrid.tsx` — jetzt 1.075 Zeilen (war 1.062), davon ~700 Zeilen fast identisches CSS

Die fünf Panel-Container ([`ProjectDescriptionContainer`](src/features/projects/ProjectGrid/ProjectGrid.tsx#L351),
`ProjectTechStackContainer` (L384), `ProjectSidebarTopContainer` (L418), `ProjectDocsContainer`
(L451), `ProjectBlogContainer` (L486) in
[`features/projects/ProjectGrid/ProjectGrid.tsx`](src/features/projects/ProjectGrid/ProjectGrid.tsx))
unterscheiden sich **nur** in `grid-area` (+ 1× `min-width`). Vier davon tragen sogar denselben
kopierten JSDoc-Kommentar „Container for the ProjectTechStack." Statt fünf 65-Zeilen-Blöcke:

```tsx
const GlassPanel = styled.div<{ area: string; areaMobile: string }>`
	grid-area: ${p => p.area};
	/* … ein Block … */
	${media.mobile} { grid-area: ${p => p.areaMobile}; }
`;
```

Außerdem gehören `ExpandedProject` (200 Zeilen JSX) und die Blog-Post-Card-Styles in eigene
Dateien. Als Faustregel: eine styled-components-Datei > 300 Zeilen ist ein Split-Kandidat;
> 1.000 ist ein Wartbarkeitsproblem.

### 🔴 A4: Das 4-Breakpoints-pro-Regel-Muster (der strukturelle Kern des CSS-Problems)

Praktisch jede Style-Regel im Projekt wird viermal geschrieben (Basis + mobile + tablet + wide):

```css
font-size: 0.95vw;
${media.mobile} { font-size: 3.8vw; }
${media.tablet} { font-size: 2.1vw; }
${media.wide}   { font-size: 19px; }
```

Der `wide`-Wert ist dabei fast immer exakt `vw × 20` — genau das, was `fluid()` in
[`src/styles/media.ts`](src/styles/media.ts) bereits in einer Deklaration abbildet
(`fluid(0.95)` ⇒ `min(0.95vw, 19px)`). Nur [`ui/Typography/Typography.tsx`](src/ui/Typography/Typography.tsx)
nutzt es; **29 weitere Dateien** mit `.tsx`-Endung enthalten noch manuelle `media.mobile`-Blöcke.
Die konsequente Migration auf `fluid()` (+ ggf. `clamp()` mit Untergrenze statt der
mobile/tablet-Blöcke) würde das CSS-Volumen grob halbieren und Drift zwischen den vier Varianten
unmöglich machen. Das ist die wirksamste Antwort auf „lange styled-components-Funktionen".

### 🟠 A5: antd als Dependency für Paragraph, Link und einen Button

`antd` (eine der größten UI-Libraries überhaupt) wird nur für `Typography.Paragraph`
([`ui/Typography/Typography.tsx`](src/ui/Typography/Typography.tsx)), `Typography.Link`
([`ui/Link/Link.tsx`](src/ui/Link/Link.tsx)) und `Button` in
[`features/projects/ProjectTile/ProjectTile.tsx`](src/features/projects/ProjectTile/ProjectTile.tsx)
sowie [`features/me/Chip/Chip.tsx`](src/features/me/Chip/Chip.tsx) und
[`features/footer/BattleOfNationsMonument/BattleOfNationsMonument.tsx`](src/features/footer/BattleOfNationsMonument/BattleOfNationsMonument.tsx)
importiert — und dann per styled-components ohnehin komplett überstylt (inkl.
`.ant-typography { margin-bottom: 0 !important; }`-Kämpfen gegen die Library). Native Elemente
(`<p>`, `<a>`, `<button>`) ersetzen das vollständig und entfernen eine schwere Dependency samt
ihrer CSS-Runtime aus dem Bundle.

### 🟠 A6: FontAwesome: alle drei kompletten Icon-Packs registriert

[`main.tsx:32`](src/main.tsx#L32): `library.add(fas, fab, far)` lädt **jedes** Solid-, Brand- und
Regular-Icon ins Bundle (mehrere hundert KB), weil Icons als Strings (`icon={'scale-balanced'}`)
referenziert werden. Best Practice: benannte Icon-Importe (`import { faScaleBalanced } from …`),
dann tree-shaked der Bundler alles Ungenutzte. Nebeneffekt der String-Variante: überall
`as IconName`-Casts, die Tippfehler erst zur Laufzeit (leeres Icon) zeigen.

### 🟠 A7: Interne Navigation per `<a href>` statt Router-`<Link>`

[`BlogCard.tsx:298`](src/features/blog/BlogCard/BlogCard.tsx#L298),
[`SkillChip.tsx:216`](src/features/projects/SkillChip/SkillChip.tsx#L216), `BackLink` in
[`BlogPost.tsx:141,748,787`](src/pages/BlogPost/BlogPost.tsx#L141) und der antd-`Button` in
[`ProjectTile.tsx:285`](src/features/projects/ProjectTile/ProjectTile.tsx#L285) navigieren intern
mit rohen `<a href>` — jede Navigation ist ein **Full Page Reload**: React bootet neu,
Fonts/Daten werden neu geparst, der SPA-Vorteil ist weg. `react-router-dom` ist installiert und
liefert `<Link to>`. (Danach muss B6 gefixt sein, sonst bricht die Suchparam-Übergabe.)

### 🟠 A8: Klickbare `<div>`s + gezielt deaktivierte A11y-Regeln

[`LicenseHandle` (L203), `LinkHandle` (L281), `CloseHandle` (L251)](src/features/projects/ProjectGrid/ProjectGrid.tsx#L203)
in `ProjectGrid.tsx` sind `<div onClick>` — ohne `href`, ohne Tab-Fokus, ohne Enter/Space,
unsichtbar für Screenreader. In [`eslint.config.js:85-87`](eslint.config.js#L85) sind genau die
drei Regeln abgeschaltet, die davor warnen würden (`jsx-a11y/click-events-have-key-events`,
`no-static-element-interactions`, `no-noninteractive-element-interactions`). Regeln zu
deaktivieren, statt `<a>`/`<button>` zu verwenden, ist das Muster, bei dem Senior-Reviewer den
Kopf schütteln — zumal die Seite mit Storybook-a11y-Addon ausgestattet ist.

### 🟠 A9: Invalides HTML in der Navigation

[`PageCardList.tsx:193-208`](src/features/header/PageCardList/PageCardList.tsx#L193) rendert
`<Ul>` → `<Link>` (`<a>`) → `<Typography>` (antd-`<p>`!) → `<li>`. Erlaubte Kinder von `<ul>` sind
nur `<li>`; ein `<li>` in einem `<p>` in einem `<a>` ist doppelt invalide. Browser reparieren das
still, aber Screenreader-Semantik („Liste mit 5 Einträgen") geht kaputt. Richtig:
`<ul><li><Link>…</Link></li></ul>`.
Verwandt: Mehrere `<h1>` pro Seite (Seitentitel-H1 + `project_header`-H1 je Panel in
`Typography.tsx:133`) — Überschriften-Hierarchie für SEO/A11y aufräumen.

### 🟠 A10: ESLint-Konfiguration mit toten Enden

- `eslint-plugin-react-hooks` ist installiert, aber **nicht in** [`eslint.config.js`](eslint.config.js)
  **registriert** — weder `rules-of-hooks` noch `exhaustive-deps` laufen. Genau die Fehlerklasse,
  die z. B. die fehlende `calculateElementWidth`-Dependency in `ProjectGrid` unentdeckt lässt.
- `eslint-plugin-prettier` wird als Plugin geladen, aber die Regel `prettier/prettier` ist nie
  aktiviert — Prettier prüft effektiv nichts.
- Diverse Airbnb-Altlasten (`no-plusplus`, `class-methods-use-this`, `func-names`) werden
  deaktiviert, obwohl sie in keinem der geerbten Configs aktiv sind — totes Gewicht.

### 🟡 A11: Keine Tests

Kein `test`-Script in [`package.json`](package.json), kein Test-Runner, keine `*.test.*`-Datei
im gesamten Repo. Für reine Präsentationslogik vertretbar, aber `skillSort.ts`, `skillExport.ts`
(CSV-Escaping!), `blogFormat.ts` und die `getTimezoneOffsetMinutes`-Arithmetik in
`AboutSection.tsx` sind pure Funktionen — ideale, billige Unit-Test-Kandidaten (Vitest liegt mit
Vite quasi bei).

### 🟡 A12: Kleinkram, der in Reviews auffällt

- [`pages/Project/Project.tsx:10`](src/pages/Project/Project.tsx#L10): auskommentierter Import
  (`//import LProject from '@/components/layouts/Project';`) als toter Code — Referenziert sogar
  noch den alten `components/layouts`-Pfad von vor dem Umbau.
- [`features/me/Signature/Signature.tsx:25`](src/features/me/Signature/Signature.tsx#L25):
  Leerzeichen-Einrückung in einer Tab-Codebasis (`no-mixed-spaces-and-tabs` greift nur bei
  *gemischten* Zeilen).
- `Typography`-Default-Variante ist `'footer'` — wer die Prop vergisst, bekommt kommentarlos
  zentrierten Footer-Text. Ein Pflicht-Prop (oder Default `'p'`) wäre am wenigsten überraschend.
- `projectTechOptions` in `Project.tsx` hart codiert (inkl. Inkonsistenz `'Java'` vs. lowercase) —
  ließe sich aus `projects[].techStack` ableiten, dann kann der Filter nie veralten.
- `blog`-Assets heißen `screnn_1_en.png` (Tippfehler „screnn") — durch alle Blog-Posts kopiert.
- Datum `formatBlogDate` fix auf `en-GB`, UI-Sprache Englisch, `robots`/Privacy deutsch —
  bewusste Entscheidung dokumentieren.
- Storybook-Coverage inkonsistent: `Blog`, `BlogPost`, `Skills`, `SkillCard` u. a. haben keine
  Stories, andere Trivial-Komponenten schon.

---

## 4. Performance & SEO

### 🔴 P1: nginx ohne gzip/brotli und ohne Cache-Header — 🟠 TEILWEISE GEFIXT

`docker/nginx.conf` aktivierte weder Kompression noch `Cache-Control`. Vite fingerprintet alle
Assets (`index-a1b2c3.js`) — die dürfen `Cache-Control: public, max-age=31536000, immutable`
bekommen; `index.html` dagegen `no-cache`. Ohne gzip gehen JS-Bundle + Fonts unkomprimiert über
die Leitung. (Falls Cloudflare davor komprimiert/cached, ist es abgemildert — Origin sollte es
trotzdem können.)

**Bereits mit S3 gefixt:** `gzip`, `Cache-Control` (no-cache für `index.html`, immutable für
`/assets/`) in [`docker/nginx.conf`](docker/nginx.conf). **Noch offen:** Brotli (bräuchte ein
nginx-Image mit `ngx_brotli`-Modul, nicht in `nginxinc/nginx-unprivileged:stable-alpine`
enthalten).

### 🔴 P2: Fonts — 🟠 TEILWEISE GEFIXT durch Fraunces-Wechsel (S10)

- ~~Es werden 4 Schnitte als **TTF** geladen — als WOFF2 wären es ~30 % der Größe.~~ Erledigt:
  [`public/fonts/Fraunces-Variable.woff2`](public/fonts/Fraunces-Variable.woff2) ist eine einzige
  ~118-KB-WOFF2-Datei statt 26 TTF-Dateien (~9 MB).
- `@font-face` in [`src/index.css`](src/index.css) hat weiterhin **kein** `font-display: swap` ⇒
  unsichtbarer Text bis zum Font-Load (FOIT) — offen.
- Kein `<link rel="preload">` für die Fraunces-Datei in [`index.html`](index.html) — offen.
- Der `body`-Font `Domine` ist weiterhin in `fonts.body` (`theme.ts`) deklariert, aber nirgends
  per `@font-face`/Import geladen — offen, unverändert.

### 🟠 P3: Blog-Bilder bis 2,1 MB PNG

[`public/blog/ios_screnn_1_en.png`](public/blog/ios_screnn_1_en.png) (2,1 MB) und weitere
`ios_screnn_*`/`screnn_*`-Dateien (1–1,8 MB) werden in einer 4-Spalten-Galerie-Thumbnail-Ansicht
geladen, kein `loading="lazy"` im Blog-Code gefunden. Screenshots als WebP/AVIF in angemessener
Auflösung wären je ~100–200 KB; dazu `loading="lazy"` und `srcset`. Aktuell lädt ein
Blog-Artikel ~7 MB Bilder. Offen, unverändert.

### 🟠 P4: Kein Code-Splitting

Alle Routen, alle Daten (`skills.ts` 1.260 Zeilen, `projects.ts` 758, `blog.ts` 240) und antd +
FontAwesome-Komplettpacks landen in einem Bundle. Kein `React.lazy`/`lazy(` in
[`src/main.tsx`](src/main.tsx) gefunden. `React.lazy()` pro Route plus A5/A6 würden den
Initial-Load drastisch senken. Offen, unverändert.

### 🟠 P5: SEO-Basics fehlen

- [`index.html:11-22`](index.html#L11): `og:title`/`og:type` sind statisch gesetzt, aber
  weiterhin keine `meta description`, kein `og:description`/`og:image`/`og:url`, kein canonical.
  Der Helmet-Einsatz setzt nur `<title>`.
- Blog-Posts haben keine per-Post-Metadaten (Titel/Description/OG) — beim Teilen eines Artikels
  zeigt jede Plattform nur „Temmi Pietsch - Blog".
- [`src/sitemap.xml`](src/sitemap.xml) wird manuell gepflegt und enthält **keinen einzigen
  Blog-Post** (15 URLs, alle Projekte/Statics). Da Posts in `data/blog.ts` liegen, ließe sich die
  Sitemap im Build generieren.
- SPA ohne Prerendering: Crawler ohne JS sehen eine leere Seite. Für ein Portfolio wäre
  Prerendering (z. B. `vite-plugin-ssr`/statisches Snapshotting) oder mittelfristig ein
  SSG-Framework die robustere Basis.
- Alle Punkte offen, unverändert.

---

## 5. Was gut ist 👍

Damit die Liste oben nicht das Bild verzerrt — vieles ist überdurchschnittlich sauber:

- **TypeScript strict** und `tsc --noEmit` läuft fehlerfrei durch; keine `any`-Casts,
  keine `@ts-ignore` im ganzen Projekt.
- **Modelle** (`models/*.ts`) sind sauber getypt, `BlogBlock` als Discriminated Union ist genau
  richtig für den Anwendungsfall.
- **Design-Tokens** (`styles/theme.ts`, `whiteAlpha()`, `fluid()`) existieren und sind gut
  dokumentiert — das Fundament für A4 liegt schon da.
- Konsequente **JSDoc-Kommentare** mit „Warum"-Erklärungen (z. B. der Dedupe-Kommentar in
  `vite.config.ts`, der `threshold: 0`-Kommentar in `Trail.tsx`).
- **IntersectionObserver** statt Scroll-Pixel-Hacks für Header/Trail-Reveal.
- **Routen-Validierung** in `main.tsx` (unbekannte Projekt-/Blog-IDs → Redirect statt Crash).
- CSV-Quote-Escaping, `encodeURIComponent` beim SkillChip-Link, `rel` auf allen
  `target="_blank"`-JSX-Anchors — an vielen Stellen wurde mitgedacht.
- Multi-Stage-Dockerfile (Build-Artefakte sauber vom Runtime-Image getrennt).
- Storybook mit a11y-Addon eingerichtet.

---

## 6. Priorisierte To-do-Liste

| # | Aufwand | Wirkung | Maßnahme |
|---|---------|---------|----------|
| 1 | Minuten | Rechtsrisiko weg | Trial-Fonts durch Fraunces ersetzt (S10 ✅); `me.afphoto` entfernt (S8 ✅); WOFF2/`font-display`/Preload für Fraunces noch offen (P2) |
| 2 | Minuten | Bugfix sichtbar | `--webkit-` → `-webkit-backdrop-filter` an 8 Stellen (B1) — ✅ |
| 3 | Minuten | Security | `window.open(href, '_blank', 'noopener,noreferrer')` (S4) — ✅ |
| 4 | Minuten | Security | Deploy-Key aus der URL in einen Header; Actions auf SHA gepinnt (S1, S2) — ✅ komplett (Client + Server + Restart) |
| 5 | ~1 h | Security + Speed | nginx: Security-Header, gzip, Cache-Control (S3, P1 gzip-Teil) — ✅; `.dockerignore` + `--frozen-lockfile` (S5) — ✅ |
| 6 | ~1 h | Qualität dauerhaft | CI-Job `tsc && lint && build` vor Deploy (S6) — ✅; `react-hooks`-Plugin in ESLint aktivieren (A10) — offen |
| 7 | ~2 h | −50 % Page-Code | `PageLayout`-Komponente extrahieren (A1); `SearchInput`/`Dropdown` nach `ui/` (A2) |
| 8 | ~2 h | Bundle ↓↓ | antd durch native Elemente ersetzen (A5); FontAwesome auf benannte Imports (A6); `React.lazy` pro Route (P4) |
| 9 | laufend | CSS ↓ ~50 % | `fluid()`-Migration fortsetzen, `ProjectGrid` in Teilkomponenten splitten (A3, A4) |
| 10 | ~1 h | SEO | meta/OG-Tags via Helmet pro Seite, Sitemap aus `data/` generieren (P5) — `robots.txt` bereits gefixt (B8 ✅) |

---

*Erstellt am 13.07.2026 durch automatisierte Code-Analyse (Claude Code). Alle Zeilenangaben
beziehen sich auf den Working Tree zum Analysezeitpunkt.*
