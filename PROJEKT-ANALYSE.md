# 🔍 Projekt-Analyse: temmi.land

**Stand:** 2026-07-13 · Branch `main` (Commit `2491d67`) · ~14.000 Zeilen TS/TSX in 152 Dateien (davon 4
Test-Dateien)

Diese Analyse bewertet das Projekt gegen Best Practices für ein React/TypeScript/Vite-Projekt. Gegliedert in:
**Bugs**, **Sicherheit**, **Code-Qualität/Architektur**, **Performance & SEO**, **Positives** und eine
**priorisierte To-do-Liste**.

Legende: 🔴 hoch · 🟠 mittel · 🟡 niedrig

---

## 1. Bugs

> **Status 13.07.2026:** B1, B2, B4, B5, B6, B7, B8, B9 sind gefixt (verifiziert per `tsc`, ESLint,
> Production-Build und einem Headless-Browser-Durchlauf). **B3 hat sich in der Verifikation als False Positive
> herausgestellt** — Details unten.
>
> **Nachtrag (13.07.2026, dritte Runde):** Beim Umsetzen von A3/A7/A8/A9 wurde eine weitere, bis dahin
> unentdeckte Regression gefunden und gefixt — siehe **B10**. Sie hätte den nächsten Produktions-Deploy zum
> Scheitern gebracht.

### 🔴 B10: `docker/Dockerfile` kopierte gelöschte Pfade — Docker-Build war gebrochen — ✅ GEFIXT

```dockerfile
COPY --from=builder /app/dist/ /app/src/robots.txt /app/src/sitemap.xml /usr/share/nginx/html/
```

Regression aus dem P5/B8-Umbau: `robots.txt` liegt seitdem unter `public/robots.txt` und `sitemap.xml` wird
von `scripts/generate-sitemap.ts` nach `public/sitemap.xml` generiert — beide werden von Vite bereits
automatisch mit `dist/` mitkopiert. Die beiden zusätzlichen `COPY`-Quellen (`/app/src/robots.txt`,
`/app/src/sitemap.xml`) existierten nach dem Umbau schlicht nicht mehr. `COPY` mit einer fehlenden Quelle
bricht den Docker-Build komplett ab — der nächste Push auf `main` hätte das Deployment lahmgelegt. Kein CI-Job
führt `docker build` aus (der `verify`-Job prüft nur `lint`/`tsc`/`vite build`), daher blieb das unbemerkt.

**Gefixt:** Die beiden toten Pfade entfernt, `COPY --from=builder /app/dist/ /usr/share/nginx/html/` reicht —
per lokalem `bun run build` verifiziert, dass `dist/robots.txt` und `dist/sitemap.xml` bereits vorhanden sind.

### 🔴 B1: `--webkit-backdrop-filter` statt `-webkit-backdrop-filter` (8 Stellen) — ✅ GEFIXT

Der Vendor-Prefix ist mit **zwei** Bindestrichen geschrieben. CSS interpretiert `--webkit-…` als Custom
Property (Variable) — die Deklaration ist damit ein No-op. Auf älteren Safari-Versionen (< 18), die den Prefix
noch brauchen, fällt der komplette Glass-/Blur-Effekt aus.

Betroffen:

- `src/ui/Filter/Filter.tsx:48`
- `src/features/about/AboutSection/AboutSection.tsx:56, 285`
- `src/features/header/HeaderContent/HeaderContent.tsx:20, 44`
- `src/pages/Skills/Skills.tsx:417`
- `src/features/blog/BlogCard/BlogCard.tsx`
- `src/features/skills/SkillCard/SkillCard.tsx`

Interessant: In `ProjectGrid.tsx` (glassChip/glassPanel) ist es **richtig** geschrieben — der Fehler ist also
beim Kopieren entstanden und beim Refactoring auf gemeinsame Mixins nie konsolidiert worden (siehe A3).

### 🔴 B2: `Link`-Komponente verwirft `target` und `rel` — ✅ GEFIXT

`src/ui/Link/Link.tsx` deklariert `target?: string` und `rel?: string` in den Props, destrukturiert sie aber
nicht und gibt sie nicht an das gerenderte Element weiter:

```tsx
export const Link = ({ children, href = '#', className, onClick }: LinkProps) => {
	return (
		<A href={href} className={className} onClick={onClick}>
			{children}
		</A>
	);
};
```

Jeder Aufrufer, der `<Link target="_blank" rel="noopener">` übergibt, bekommt stillschweigend einen normalen
Link. Das ist eine klassische Falle: Das Interface verspricht etwas, das die Implementierung nicht einhält.

### ✅ B3: `document.body.scrollTo` — VERIFIZIERT, KEIN BUG (False Positive)

`src/features/header/PageCardList/PageCardList.tsx:161` ruft `document.body.scrollTo(...)` auf. Ich hatte
angenommen, der Scroll-Container sei `html`/`window` und der Aufruf damit ein No-op.

**Ein Headless-Chrome-Test, der das exakte CSS aus `index.css` nachbaut, widerlegt das:**

```
scrollingElement: "html"
window.scrollTo(0, 800)        → body:0,   html:0,  window.scrollY:0   (No-op!)
document.body.scrollTo(0, 800) → body:800, html:0,  window.scrollY:0   (funktioniert)
```

Grund: `index.css` setzt `html, body, :root { height: 100%; overflow-y: auto }`. Damit ist der `<body>` auf
Viewport-Höhe fixiert und scrollt seinen überlaufenden Inhalt **selbst** — `html` hat nichts zu scrollen. Der
bestehende Code ist also **korrekt**; ein „Fix" auf `window.scrollTo` hätte das funktionierende Scroll-to-Top
zerstört. (Der einzige verbleibende Kritikpunkt ist die Ungewöhnlichkeit dieses Scroll-Setups an sich — aber
das ist kein Bug.)

### 🟠 B4: Breakpoint-Lücken und -Überlappungen in `media.ts` — ✅ GEFIXT

```ts
mobile: '@media (min-width: 320px) and (max-width: 600px)',
tablet: '@media (min-width: 600px) and (max-width: 1024px)',
```

- Bei **exakt 600px** (und 1024px) matchen _beide_ Queries gleichzeitig — welche Styles gewinnen, hängt von
  der Deklarationsreihenfolge im jeweiligen Component ab. Best Practice: `(max-width: 599.98px)` oder
  mobile-first nur mit `min-width` arbeiten.
- Unter **320px** matcht _gar keine_ Query — dort gelten die Desktop-Basiswerte (z. B. `font-size: 0.9vw` ≈
  2–3px). Ein iPhone SE im Zoom-Modus oder alte Androids fallen durch das Raster.

### 🟠 B5: `ProjectGrid` — Widersprüchliche Breiten-Logik + toter Check — ✅ TEILWEISE GEFIXT

`src/features/projects/ProjectGrid/ProjectGrid.tsx:961-994`:

1. `calculateInitialElementWidth()` und `calculateElementWidth()` benutzen **unterschiedliche Formeln**
   (`size * 0.75 / columns` vs. `element[0].offsetWidth / columns`) und **unterschiedliche Magic Numbers** für
   Wide-Screens (`360` vs. `380`). Beim ersten Resize springt das Layout.
2. `element !== undefined` ist immer wahr — `getElementsByClassName` gibt nie `undefined` zurück. Der Check
   täuscht eine Absicherung vor, die nicht existiert.
3. Die Breakpoint-Grenzen (320/600/1024/2000) sind hier nochmal hart codiert und duplizieren `media.ts` —
   ändert man die Breakpoints dort, bricht die JS-Logik lautlos auseinander.
4. Layout-Messung über `document.getElementsByClassName('expandable-grid')` statt über eine React-Ref ist
   fragil (Klassennamen sind API einer fremden Library).

**Gefixt (13.07.):** toter `!== undefined`-Check entfernt (1+2), Wide-Wert auf `380` vereinheitlicht, und beim
Mount wird jetzt einmal gemessen (mit Null-Guard), sodass die Vor-Render-Schätzung nicht bis zum ersten Resize
hängen bleibt. **Offen:** Punkt 4 (Messung per Ref statt Klassenname) und die verbleibende
Breakpoint-Duplikation zwischen JS und `media.ts` (3) — beides gehört in den größeren `ProjectGrid`-Refactor
(A3).

### 🟠 B6: Suchfeld synchronisiert nicht zurück in die URL — ✅ GEFIXT

`Skills.tsx` und `Blog.tsx` lesen `?search=`/`?category=` nur einmalig im `useState`-Initializer. Tippt man
danach, ändert sich die URL nie — Reload/Teilen der URL verliert den Zustand. Das funktioniert aktuell nur
zufällig, weil interne Links als `<a href>` (Full Page Reload, siehe A7) gebaut sind. Sobald auf
Router-`<Link>` umgestellt wird, ist auch das Lesen des Params kaputt (State bleibt beim Client-Side-Routing
stehen). `useSearchParams` bietet den Setter direkt an — er wird nur nicht benutzt.

### 🟡 B7: Non-Null-Assertions an Datengrenzen — ✅ GEFIXT (BlogPost)

- `src/pages/BlogPost/BlogPost.tsx:721`: `blogPosts.find(...)!` — crasht mit weißer Seite, wenn die Komponente
  je ohne die Validierung in `main.tsx` gerendert wird (z. B. aus einer Story oder nach einem Refactoring).
  Sauber: `if (!post) return <Navigate …/>`.
- `ProjectGrid.tsx:1048`: `filteredProjects[currentIndex! - 1]` — das `- 1` codiert undokumentiertes Wissen
  über die 1-Basiertheit der Grid-Library. Ein Off-by-One hier zeigt das falsche Projekt an, statt zu crashen.

### 🟡 B8: `robots.txt` ist syntaktisch ungültig — ✅ GEFIXT

```
User-agent: *
Disallow: me.png
```

`Disallow`-Pfade müssen mit `/` beginnen; `me.png` wird von Crawlern ignoriert. Abgesehen davon: robots.txt
ist **kein** Zugriffsschutz — `https://temmi.land/me.png` bleibt für jeden abrufbar (siehe S8). Außerdem fehlt
der `Sitemap:`-Eintrag.

**Nachtrag (13.07.2026, im Rahmen von P5):** Der obige Fix hat nie etwas bewirkt — die Datei lag unter
`src/robots.txt`, und Vite kopiert nur `public/` unverändert nach `dist/`; ein Build-Check
(`find dist -iname "robots*"`) zeigte, dass weder `robots.txt` noch `sitemap.xml` je im Produktions-Output
existierten. `https://temmi.land/robots.txt` hat also durchgehend 404 geliefert. Nach `public/robots.txt`
verschoben — siehe P5 für Details und den Sitemap-Fix.

### 🟡 B9: `renderBlock` ist nicht exhaustiv — ✅ GEFIXT

`BlogPost.tsx:660-717`: Der `default`-Fall rendert `<p>{ block.text }</p>`. Kommt ein neuer Block-Typ ohne
`text`-Feld dazu (wie schon `gallery`), rendert ein vergessener Case kommentarlos `undefined`. Mit einem
`never`-Exhaustiveness-Check würde TypeScript den fehlenden Case beim Kompilieren melden.

---

## 2. Sicherheit

> **Status 13.07.2026:** S1–S9 sind vollständig gefixt (Client, Server und der Webhook-Container- Restart sind
> live) und verifiziert. **S10 bleibt offen** — Lizenzfrage ist eine Entscheidung des Autors, keine
> Code-Änderung.

### 🔴 S1: CI-Deploy-Webhook mit Secret als Query-Parameter — ✅ GEFIXT (Server live neu gestartet)

`.github/workflows/deploy.yml`:

```yaml
curl -s -X POST "https://ci.temmi.land/hooks/deploy-project?key=${{ secrets.CI_KEY }}&repo=…"
```

Query-Strings landen in Access-Logs des Webservers, in Reverse-Proxy-Logs (Traefik/Cloudflare) und ggf. in
Fehlermeldungen. Best Practice: Secret als Header (`Authorization`/`X-Hub-Signature`) oder besser ein
HMAC-signierter Payload (das Webhook-Tool [adnanh/webhook] unterstützt `payload-hmac-sha256`-Trigger-Regeln).

**Gefixt, Client und Server:**

- Client: `CI_KEY` wird jetzt per `X-Api-Key`-Header statt Query-Parameter gesendet
  (`.github/workflows/deploy.yml`).
- Server: `ci-webhooks`-Projekt (`/Volumes/Data/Eingang/###/Projekte/ci-webhooks/ci-webhooks`, separates Repo)
  — `ci/hooks.tpl.json` prüft für `deploy-project` und `status-project` jetzt ebenfalls den `X-Api-Key`-Header
  statt `?key=`.

Der Webhook-Container wurde neu gestartet, `hooks.json` ist mit der Header-Regel neu gerendert — der Fix ist
live.

### 🔴 S2: Third-Party-Action mit Cloudflare-API-Token, nicht SHA-gepinnt — ✅ GEFIXT

Ebenfalls `deploy.yml`: `xiaotianxt/bypass-cloudflare-for-github-action@v1.1.1` bekommt `CF_ZONE_ID` und
`CF_API_TOKEN`. Ein Tag (`v1.1.1`) ist **mutabel** — der Autor (oder ein Angreifer mit Zugriff auf dessen
Repo) kann den Tag jederzeit auf bösartigen Code umbiegen und damit dein Cloudflare-Token exfiltrieren. Genau
so lief der `tj-actions/changed-files`-Angriff 2025. Maßnahmen:

- Action auf einen **Commit-SHA** pinnen (`uses: xiaotianxt/…@<sha>`),
- Token auf minimale Berechtigung scopen (nur die eine Zone, nur die nötige Permission),
- `actions/checkout@v3` ist zudem veraltet (aktuell v4/v5).

**Gefixt:** Action auf den verifizierten Commit-SHA von `v1.1.1` (`a87c9ac0348806058904e62e5c8e70d8e37b4a65`)
gepinnt, `actions/checkout` auf `v4` angehoben. **Offen:** Token-Scoping auf Cloudflare-Seite (außerhalb des
Repos).

### 🔴 S3: nginx liefert keinerlei Security-Header — ✅ GEFIXT

`docker/nginx.conf` setzt keine Header. Für eine statische Seite Minimum:

```nginx
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
add_header Content-Security-Policy "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'" always;
```

(styled-components braucht `style-src 'unsafe-inline'`, oder Nonces.) HSTS wird auch nirgends gesetzt — weder
in Traefik-Labels noch in nginx. Die Privacy-Seite verweist auf Cloudflare; wenn Cloudflare davor hängt,
relativieren sich einzelne Punkte, aber Defense-in-Depth kostet hier sechs Zeilen.

**Gefixt:** Alle fünf Header + gzip (`docker/nginx.conf`) und `Cache-Control` (No-cache für `index.html`,
`immutable` für `/assets/`) ergänzt. HSTS via Traefik-Labels in `docker-compose.yml` gesetzt (dort terminiert
TLS, nicht in nginx).

### 🟠 S4: `window.open(url)` ohne `noopener` (Reverse Tabnabbing) — ✅ GEFIXT

`ProjectGrid.tsx:772, 834, 851` öffnen externe Links per `window.open(project.licenseHref)` etc. Die geöffnete
Seite erhält damit eine `window.opener`-Referenz und kann die Ursprungsseite per
`opener.location = 'https://phishing…'` umleiten. Die Ziele sind aktuell eigene Daten (geringe
Ausnutzbarkeit), aber der Fix ist trivial:

```ts
window.open(href, '_blank', 'noopener,noreferrer');
```

Grundsätzlicher: Das sind **Links**, keine Buttons — semantisch korrekt wäre ein
`<a href target="_blank" rel="noopener noreferrer">` (löst auch A8 mit: Tastatur, Mittelklick, Statusleiste,
SEO).

**Gefixt (minimal):** Alle drei `window.open`-Aufrufe in `ProjectGrid.tsx` bekommen jetzt
`'_blank', 'noopener,noreferrer'`. **Offen:** Die semantisch korrekte Umstellung auf echte `<a>`-Tags gehört
zu A8 (größerer Umbau) und wurde hier bewusst nicht mitgemacht.

### 🟠 S5: Docker-Build ohne `.dockerignore` und ohne frozen Lockfile — ✅ GEFIXT

`docker/Dockerfile`:

- `COPY . /app` ohne `.dockerignore` kopiert `node_modules` (macOS-Binaries!), `.git` (komplette Historie
  inkl. `private`-Branch), `dist`, `storybook-static` in den Build-Kontext. Das ist langsam, cache-feindlich
  und leakt bei einem Fehler in der Stage-Trennung Interna.
- `bun i` statt `bun install --frozen-lockfile`: Der Produktions-Build kann andere Versionen auflösen als
  lokal getestet — nicht reproduzierbar und ein Einfallstor für kompromittierte Patch-Releases.
- Der nginx-Container läuft als root und `bun pm cache rm` vor `bun i` ist wirkungslos (leert einen Cache, der
  im frischen Layer ohnehin leer ist). Kandidat: `nginx:stable-alpine` → `nginxinc/nginx-unprivileged`.

**Gefixt:** `.dockerignore` ergänzt (`.git`, `node_modules`, `dist`, `.afphoto` u. a.), `bun i` →
`bun install --frozen-lockfile`, wirkungsloses `bun pm cache rm` entfernt, Image auf
`nginxinc/nginx-unprivileged:stable-alpine` umgestellt.

### 🟠 S6: Kein Qualitäts-Gate vor dem Deploy — ✅ GEFIXT

Der einzige Workflow deployt bei jedem Push auf `main` — es gibt keinen CI-Job für `tsc`, `lint` oder `build`.
Ein Commit mit Syntaxfehler wird erst beim Docker-Build auf dem Server bemerkt (oder schlimmer: `bun i` zieht
dort etwas anderes und es fällt gar nicht auf).

**Gefixt:** Neuer `verify`-Job (`bun install --frozen-lockfile && bun run lint && bun run build`) läuft vor
`deploy` und blockiert ihn per `needs: verify` bei Fehlern.

### 🟡 S7: Vite-Dev-Server für das ganze Netzwerk offen — ✅ GEFIXT

`vite.config.ts` setzt `server.host: true` — der Dev-Server lauscht auf allen Interfaces. In fremden WLANs
(Café, Zug) kann jeder im Netz auf den Dev-Server zugreifen; ältere Vite-5-Versionen hatten hier mehrfach
File-Read-CVEs. Wenn das nur für Handy-Tests gebraucht wird: in eine lokale `vite.config.local.ts` bzw. per
`--host`-Flag bei Bedarf.

**Gefixt:** `server.host: true` aus `vite.config.ts` entfernt. Für Handy-Tests im selben Netz:
`bun run dev --host` bei Bedarf.

### 🟡 S8: `me.afphoto` (2,4 MB Affinity-Photo-Quelldatei) wird öffentlich deployed — ✅ GEFIXT

Alles in `public/` landet 1:1 im Web-Root. Die `.afphoto`-Datei enthält ggf. Ebenen/Metadaten des
Originalfotos und hat auf einem Produktions-Server nichts verloren. Gleiches Muster:
`src/features/me/Signature/Signature.afphoto` liegt im Quellbaum. Quelldateien gehören in einen Assets-Ordner
außerhalb von `public/` (oder LFS).

**Gefixt:** Beide Dateien aus dem Repo entfernt und nach `../private.temmi.land-source-assets/` (außerhalb des
Projekts) verschoben.

### 🟡 S9: CSV-Export ohne Formula-Escaping — ✅ GEFIXT

`skillExport.ts` escapt Quotes/Kommas korrekt, aber nicht führende `=`, `+`, `-`, `@`. Öffnet jemand die
exportierte CSV in Excel, würde eine Zelle wie `=HYPERLINK(...)` ausgeführt (CSV/Formula Injection). Da die
Daten aus deiner eigenen statischen Datei kommen, ist das Risiko heute minimal — aber die Escape-Funktion
sieht „fertig" aus und ist es nicht. Fix: Zellen, die mit `=+-@` beginnen, mit `'` prefixen.

**Gefixt:** `escapeCsv` in `skillExport.ts` prefixt Zellen, die mit `=+-@` beginnen, jetzt mit `'`.

### ⚖️ S10: „TRIAL"-Fonts in Produktion (Rechtsrisiko) — ✅ GEFIXT

`public/bogart/BOGARTBOLDTRIAL.TTF` & Co. — die Bogart-Familie (Zetafonts) lag als **Trial-Version** vor.
Trial-Lizenzen von Zetafonts erlauben ausdrücklich **keine** kommerzielle Nutzung und kein Self-Hosting als
Webfont. Für eine Portfolio-Seite, die aktiv Freelance-Aufträge akquiriert („Open for new projects!"), ist das
abmahnfähig.

**Gefixt (13.07.2026):** Auf [Fraunces](https://fonts.google.com/specimen/Fraunces) (Undercase Type, SIL OFL,
frei kommerziell nutzbar) gewechselt — final bestätigt, keine Trial-Lizenz mehr im Projekt.

- Self-hosted als **eine** variable WOFF2-Datei (`public/fonts/Fraunces-Variable.woff2`, ~118 KB) statt der 26
  Bogart-TTF-Dateien (~9 MB) — löst nebenbei einen Teil von P2.
- Gewichts-Mapping in `index.css` (pro Bogart-Cut ein `@font-face` mit fixiertem `wght`, gleiche Datei): Light
  → 300, Regular → 400, Medium → 500, Bold → 700. Kein Component-Code musste angefasst werden, da `theme.ts`
  weiterhin vier Font-Family-Namen exportiert.
- `font-variation-settings: 'SOFT' 100, 'WONK' 0` global auf `html, body` — maximal gerundete, aber nicht
  "wonky"/exzentrische Formen, am nächsten an Bogarts kontrolliertem Look.
- Per Playwright-Screenshot auf Home- und Skills-Seite verifiziert (Chromium, `vite preview`).
- Alle 24 Bogart-TRIAL-Dateien aus `public/bogart/` entfernt und nach
  `../private.temmi.land-source-assets/bogart-trial-fonts/` verschoben (außerhalb des Repos).

---

## 3. Code-Qualität & Architektur (die „Senior-Dev-Headshakes")

> **Pfad-Hinweis (13.07.2026):** Die Struktur wurde inzwischen von `components/layouts|widgets` nach
> `pages/` + `features/<feature>/<Komponente>` + `ui/` umgebaut. Alle Fundstellen unten sind gegen den
> aktuellen Working Tree neu verifiziert.
>
> **Status 13.07.2026 (zweite Runde):** A1, A2, A5, A6, A10 (teilweise) sind gefixt und mit Playwright
> verifiziert (Details in den jeweiligen Einträgen). **A3, A4, A7, A8, A9, A11, A12 bleiben offen** — das ist
> bewusst: A3/A4 sind laufende Refactoring-Arbeit (siehe Memory „Styles-Token-Migration"), A7–A9/A11/A12 waren
> nicht Teil des beauftragten Umfangs („Großer Rundumschlag": Quick-Wins + A1/A2 + A5/A6/P4/P5) und wurden
> bewusst nicht mit angefasst, um den Umfang nicht eigenmächtig zu sprengen.
>
> **Status 13.07.2026 (dritte Runde, „fix alles was geht"):** A3, A7, A8, A9, A11, A12 sind jetzt ebenfalls
> gefixt; A10 bis auf einen bewusst zurückgestellten Punkt (`prettier/prettier`). Mit `tsc`, ESLint, der neuen
> Vitest-Suite, `vite build` und einem Playwright-Durchlauf (Desktop-/Mobile-Nav, Projekt-Detailseite,
> Blog-Galerie, Konsolen-Fehler-Check) verifiziert. **A4 bleibt offen** — siehe Begründung dort. **P3 ist
> ebenfalls in dieser Runde gefixt** (siehe Abschnitt 4).
>
> **Status 14.07.2026 (vierte Runde):** A4 ist jetzt vollständig gefixt — Basis+`wide` per `fluid()`, und die
> `mobile`/`tablet`-Skalierung auf reines per-Band-`vw` mit einem Tablet-Content-Faktor von 0.75. Ein
> zwischenzeitlicher `fluidRange()`-Versuch wurde verworfen (verzog die Proportionen — kleine Werte flach,
> Container steil → Drift; Details im A4-Eintrag). Zusätzlich ist die Tablet-Grenze jetzt inklusiv (1024px =
> Tablet, iPad Pro hochkant).

### 🔴 A1: Seiten-Chrome ist 7-fach copy-gepastet — ✅ GEFIXT

`HeaderSection`, `FooterSection`, `PageGradient`, `PageMountains` (~130 Zeilen styled-components) existieren
nahezu identisch in [`pages/Home/Home.tsx`](src/pages/Home/Home.tsx),
[`pages/Blog/Blog.tsx`](src/pages/Blog/Blog.tsx),
[`pages/BlogPost/BlogPost.tsx`](src/pages/BlogPost/BlogPost.tsx),
[`pages/Skills/Skills.tsx`](src/pages/Skills/Skills.tsx),
[`pages/Project/Project.tsx`](src/pages/Project/Project.tsx),
[`pages/Privacy/Privacy.tsx`](src/pages/Privacy/Privacy.tsx) und
[`pages/Imprint/Imprint.tsx`](src/pages/Imprint/Imprint.tsx) — inklusive divergierender Kopien: `Home.tsx`
nutzt `z-index: 3` für die Mountains, alle anderen `300`; mal `url(/footer.svg)`, mal `url(./footer.svg)`. Das
ist die teuerste Duplikation im Projekt: Jede Layout-Änderung muss an 7 Stellen nachgezogen werden und driftet
nachweislich bereits auseinander.

**Fix:** Eine `PageLayout`-Komponente (`<PageLayout><Header/>{children}<Footer/></PageLayout>`), die
Gradient + Mountains einmal definiert. Reduziert jede Page um ~150 Zeilen.

**Gefixt (13.07.2026):** [`ui/PageLayout/PageLayout.tsx`](src/ui/PageLayout/PageLayout.tsx) erstellt
(`<PageLayout header={...}>{children}</PageLayout>`, Footer/Gradient/Mountains einmal definiert); alle 7 Pages
migriert, `z-index` auf `300` und `url(/footer.svg)` (absolut) vereinheitlicht. Das war kein reiner
Stilfehler: Da styled-components ein `<style>`-Tag ins Dokument injiziert, löst der Browser eine relative
`url(./footer.svg)` gegen die **aktuelle Route** auf, nicht gegen eine Stylesheet-Datei. Auf `/project/:id`
(zwei Pfadsegmente) ergab das `/project/footer.svg` → 404 → das Bergpanorama fehlte auf jeder
Projekt-Detailseite, unbemerkt. Mit Playwright verifiziert (alle 7 Seiten + `/project/:id` + `/blog/:id`):
`footer.svg` liefert jetzt überall 200/304 statt 404 auf den Projektseiten; Screenshot von `/project/alimonia`
zeigt das Panorama korrekt.

### 🔴 A2: Identische Such-/Dropdown-Styles doppelt und dreifach — ✅ GEFIXT

- `SearchRow` + `SearchInputWrapper` (~130 Zeilen) sind **byte-identisch** in
  [`pages/Blog/Blog.tsx`](src/pages/Blog/Blog.tsx) und
  [`pages/Skills/Skills.tsx`](src/pages/Skills/Skills.tsx).
- `DropdownTrigger`/`DropdownPanel` existieren einmal in
  [`pages/Skills/Skills.tsx`](src/pages/Skills/Skills.tsx) und einmal (leicht anders) in
  [`ui/Filter/Filter.tsx`](src/ui/Filter/Filter.tsx).

Das gehört als `ui/SearchInput` und `ui/Dropdown` neben `Filter` — genau dafür gibt es den `ui/`-Ordner
bereits.

**Gefixt (13.07.2026):** `ui/SearchInput` extrahiert (Blog + Skills nutzen es jetzt identisch). Für Dropdown:
statt die beiden _visuell_ unterschiedlichen Dropdown-Patterns (Filter's Mobile-Vollbreite-Menü vs. Skills'
kompakte Ecken-Menüs für Sort/Export) in eine gemeinsame visuelle Komponente zu zwingen — das hätte eine der
beiden Ansichten verschlechtert —, wurde nur die **Verhaltenslogik** (Open-State + Klick-außerhalb-schließt)
als `ui/Dropdown`-Hook (`useDropdown()`) extrahiert und in `Filter.tsx` sowie zweimal unabhängig in
`Skills.tsx` (Sort, Export) verwendet; Skills.tsx hatte zuvor einen einzigen kombinierten Effekt, der beide
Refs gleichzeitig prüfte. Nebenbei beim Konsolidieren gefunden: Der Clear-Button (das „×" im Suchfeld) hatte
eine 0×0-Box (Shrink-to-fit griff im echten Layout-Kontext nicht, reproduziert auch am Alt-Code) — das Icon
wurde nur durch Overflow sichtbar gemalt, der Button selbst war nicht zuverlässig klickbar/fokussierbar. Fix:
explizite `width/height: 1em`. Mit Playwright verifiziert (Suche + Clear auf Blog/Skills, beide
Skills-Dropdowns unabhängig, Mobile-Filter-Dropdown).

### 🔴 A3: `ProjectGrid.tsx` — fünf fast identische Panel-Container — ✅ TEILWEISE GEFIXT

Die fünf Panel-Container (`ProjectDescriptionContainer`, `ProjectTechStackContainer`,
`ProjectSidebarTopContainer`, `ProjectDocsContainer`, `ProjectBlogContainer` in
[`features/projects/ProjectGrid/ProjectGrid.tsx`](src/features/projects/ProjectGrid/ProjectGrid.tsx))
unterschieden sich **nur** in `grid-area` (+ 1× `min-width`) und teils der `z-index`. Vier davon trugen sogar
denselben kopierten JSDoc-Kommentar „Container for the ProjectTechStack."

**Gefixt (13.07.2026):** Zu einer parametrisierten `GlassPanel`-Komponente zusammengefasst (`area`,
`areaMobile`, optional `zIndex`/`minWidth`/`minWidthWide` als Props) — exakt das Muster, das oben als Zielbild
skizziert war. Fünf ~35-Zeilen-Blöcke wurden zu einem gemeinsamen Styled-Component plus fünf
Ein-Zeilen-Aufrufen. Mit `tsc`, ESLint und Playwright (Projekt-Detailseite, Grid-Layout aller fünf Panels
korrekt positioniert) verifiziert. **Offen:** `ExpandedProject` (200 Zeilen JSX) und die Blog-Post-Card-Styles
in eigene Dateien splitten — die Datei ist durch den Dedupe zwar deutlich kürzer, aber ein Split in mehrere
Dateien war nicht Teil dieser Runde.

### 🔴 A4: Das 4-Breakpoints-pro-Regel-Muster (der strukturelle Kern des CSS-Problems) — ✅ GEFIXT

Praktisch jede Style-Regel im Projekt wird viermal geschrieben (Basis + mobile + tablet + wide):

```css
font-size: 0.95vw;
${media.mobile} { font-size: 3.8vw; }
${media.tablet} { font-size: 2.1vw; }
${media.wide}   { font-size: 19px; }
```

Der `wide`-Wert ist dabei fast immer exakt `vw × 20` — genau das, was `fluid()` in
[`src/styles/media.ts`](src/styles/media.ts) bereits in einer Deklaration abbildet (`fluid(0.95)` ⇒
`min(0.95vw, 19px)`). Nur [`ui/Typography/Typography.tsx`](src/ui/Typography/Typography.tsx) nutzt es; **31
weitere Dateien** mit `.tsx`-Endung enthalten noch manuelle `media.mobile`-Blöcke. Die konsequente Migration
auf `fluid()` (+ ggf. `clamp()` mit Untergrenze statt der mobile/tablet-Blöcke) würde das CSS-Volumen grob
halbieren und Drift zwischen den vier Varianten unmöglich machen. Das ist die wirksamste Antwort auf „lange
styled-components-Funktionen".

**Teilweise gefixt (14.07.2026):** Der risikolose Teil der Migration ist durchgezogen — überall dort, wo der
`wide`-Wert exakt `vw × 20` war, ersetzt jetzt `fluid()` das Basis-`vw` **und** die zugehörige
`media.wide`-Deklaration (107 Ersetzungen über 18 Dateien). Automatisiert per Skript erkannt und angewendet,
dabei zwei echte Fälle gefunden und von Hand korrigiert, in denen ein `media.wide`-Block eine verschachtelte
Selector-Regel enthielt (z. B. `.signature { height: 42px; }` in `HeaderContent.tsx`), die beim naiven Löschen
des ganzen Blocks mitgerissen worden wäre. Verifiziert mit `tsc`/ESLint/Vitest (24/24) sowie einem
Playwright-Vorher/Nachher-Vergleich von `getComputedStyle` + `getBoundingClientRect` für **jedes Element** auf
5 Routen × 2 Viewportbreiten (1500px kontinuierliche Zone, 2200px oberhalb des 2000px-Caps): identisch bis auf
Subpixel-Rauschen (≤0.02px, Federungs-Timing der `Trail`-Animation) und die live tickende Uhr in
`AboutSection`. Rendering ist damit nachweislich pixel-identisch geblieben.

**`mobile`/`tablet`-Teil (14.07.2026): `fluidRange()` versucht und wieder verworfen.** Zuerst wurden die
Stufenwerte auf einen `fluidRange(fromPx, toPx)`-Helper migriert (`clamp()`-Gerade 320px→1024px, nicht durch
den Ursprung). Das war **konzeptionell falsch** und wurde komplett zurückgerollt: `fluidRange` skaliert die
kleinen Werte (Font, Padding) auf einer flachen Geraden, während die großen Layout-Werte (`45vw`-Breiten,
Ränder) bewusst `vw` blieben. Innerhalb **einer** Komponente skalierte der Container dann steil (`vw`) und die
Schrift flach (`clamp`) — ihr Verhältnis **driftete** mit der Viewportbreite, die Komposition sah sichtbar
verzogen aus (genau das Gegenteil der lockstep-proportionalen Skalierung, die den Desktop sauber aussehen
lässt). Der Nutzer hat das Drift sofort erkannt.

**Der richtige Ansatz: reines per-Band-`vw` + Tablet-Content ×0.75.** Alle Komponenten sind auf reines
per-Band-`vw` zurückgesetzt (wie Desktop, wie ursprünglich): **jede** Eigenschaft skaliert mit derselben Rate,
Element-Verhältnisse bleiben bei jeder Breite konstant — kein Drift. Das ursprüngliche „auf Tablet zu
groß"-Problem (reines `vw` wächst steil: Blog-Titel 33px bei 1023px vs. 15px auf Desktop) wird
**proportionserhaltend** gelöst: alle _Content_-`vw`-Werte in `${media.tablet}`-Blöcken (font-size,
line-height, padding, margin, gap, border-radius, …) sind per Skript mit **0.75** multipliziert (229
Deklarationen). Weil jeder Wert `vw` bleibt, bleiben die Verhältnisse innerhalb einer Komponente exakt
erhalten (alles schrumpft um denselben Faktor); nur das Verhältnis Content-zu-Kachel ändert sich bewusst — die
`45vw`-Kacheln und das 2-Spalten-Grid behalten ihre Größe (strukturelle `width`/`height`/Position
unangetastet), nur der Text darin „zoomt" eine Stufe raus. **Behalten** aus dem verworfenen Versuch: die
verhaltensneutrale Basis+`wide`→`fluid()`-Verdichtung und die **inklusive 1024px-Tablet-Grenze**
(`media.tablet` bis `max-width: 1024px`, Desktop ab 1024.02px, `columnsForWidth(1024) = 2` — iPad Pro 12.9"
hochkant bleibt Tablet). Verifiziert: 390px-Mobile-Snapshot **byte-identisch** zur Baseline (nur Tablet-Blöcke
angefasst), Spaltenzahl bleibt 2 über 615–800px, Beschreibungs-Panels fassen ihren Text, Screenshots bei
834/1023px sauber, ESLint/Vitest (24/24) grün.

**Faustregel (bestätigt):** Unterhalb Desktop wird **proportional** skaliert (reines `vw`, alles im
Gleichschritt) — das ist der einzige Ansatz, der Element-Verhältnisse erhält. Größen-Kontrolle passiert über
**Bänder** (mobile < 600, tablet 600–1024) und einen **einheitlichen Faktor pro Band** (Tablet ×0.75), nie
über pro-Property-Kurven wie `fluidRange` (die driften). Der Preis: der Größensprung bei 600px bleibt (fällt
mit dem 1→2-Spalten-Layoutwechsel zusammen, daher unauffällig), und ein einheitlicher Faktor kann nicht beide
Bandenden unabhängig steuern. Wer den Tablet-Faktor nachjustieren will: es ist ein einzelner Multiplikator auf
alle `${media.tablet}`-Content-`vw` (Skript `shrink_tablet.py`).

### 🟠 A5: antd als Dependency für Paragraph, Link und einen Button — ✅ GEFIXT

`antd` (eine der größten UI-Libraries überhaupt) wird nur für `Typography.Paragraph`
([`ui/Typography/Typography.tsx`](src/ui/Typography/Typography.tsx)), `Typography.Link`
([`ui/Link/Link.tsx`](src/ui/Link/Link.tsx)) und `Button` in
[`features/projects/ProjectTile/ProjectTile.tsx`](src/features/projects/ProjectTile/ProjectTile.tsx) sowie
[`features/me/Chip/Chip.tsx`](src/features/me/Chip/Chip.tsx) und
[`features/footer/BattleOfNationsMonument/BattleOfNationsMonument.tsx`](src/features/footer/BattleOfNationsMonument/BattleOfNationsMonument.tsx)
importiert — und dann per styled-components ohnehin komplett überstylt (inkl.
`.ant-typography { margin-bottom: 0 !important; }`-Kämpfen gegen die Library). Native Elemente (`<p>`, `<a>`,
`<button>`) ersetzen das vollständig und entfernen eine schwere Dependency samt ihrer CSS-Runtime aus dem
Bundle.

**Gefixt (13.07.2026):** Alle fünf Stellen auf native Elemente umgestellt. Nebenbefund beim Umbau:
`Typography.Paragraph` rendert (trotz des Namens) tatsächlich ein `<div>`, kein `<p>` — der komplette
Fließtext auf Privacy/Imprint war die ganze Zeit semantisch ein `<div>`. Jetzt ein echtes `<p>`. Margins
wurden vor dem Fix per `getComputedStyle` gemessen und danach exakt reproduziert (`p`/`footer`/`copyright`
behalten ihr `1em`-Bottom-Margin, `header`/`navigation`/ `trademark` bekommen `margin:0`, deckungsgleich mit
den `!important`-Overrides, die ihre Consumer ohnehin schon hatten). Mit Playwright verifiziert: Computed
Styles vor/nach identisch auf jedem betroffenen Element (Link-Hover-Farbe, Privacy-Absatzabstände,
Footer/Nav/Trademark- Abstände, Monument-Bild, Projekt-Tile-Button, Skill-Chip) plus Screenshots. Bundle: −113
KB gzip.

### 🟠 A6: FontAwesome: alle drei kompletten Icon-Packs registriert — ✅ GEFIXT

[`main.tsx:32`](src/main.tsx#L32): `library.add(fas, fab, far)` lädt **jedes** Solid-, Brand- und Regular-Icon
ins Bundle (mehrere hundert KB), weil Icons als Strings (`icon={'scale-balanced'}`) referenziert werden. Best
Practice: benannte Icon-Importe (`import { faScaleBalanced } from …`), dann tree-shaked der Bundler alles
Ungenutzte. Nebeneffekt der String-Variante: überall `as IconName`-Casts, die Tippfehler erst zur Laufzeit
(leeres Icon) zeigen.

**Gefixt (13.07.2026):** Alle tatsächlich referenzierten Icon-Namen extrahiert (JSX-Usages +
`icon`/`tileIcon`/`repoIcon`-Felder in `data/*.ts`, 91 Stück), gegen die installierten Pakete verifiziert und
nur diese per benanntem Import registriert. `free-regular-svg-icons` war **komplett ungenutzt** (0
`far:`-Referenzen) und wurde als Dependency entfernt. Die Callsites selbst (`icon={['fas', 'dragon']}`)
bleiben unverändert — der String-Lookup funktioniert unabhängig davon, ob die Library aus einem benannten
Import oder einem Komplett-Pack befüllt wurde. Bundle: 755 KB → 209 KB gzip (größter Einzel-Fix im ganzen
Rundumschlag). Mit Playwright verifiziert (Icon-Anzahl pro Seite, Screenshots inkl. Brand-Logos).

### 🟠 A7: Interne Navigation per `<a href>` statt Router-`<Link>` — ✅ GEFIXT

[`BlogCard.tsx:298`](src/features/blog/BlogCard/BlogCard.tsx#L298),
[`SkillChip.tsx:216`](src/features/projects/SkillChip/SkillChip.tsx#L216), `BackLink` in
[`BlogPost.tsx:141,748,787`](src/pages/BlogPost/BlogPost.tsx#L141) und der (seit A5 native) `<a>`-Button in
[`ProjectTile.tsx`](src/features/projects/ProjectTile/ProjectTile.tsx) navigieren intern mit rohen `<a href>`
— jede Navigation ist ein **Full Page Reload**: React bootet neu, Fonts/Daten werden neu geparst, der
SPA-Vorteil ist weg. `react-router-dom` ist installiert und liefert `<Link to>`. (Danach muss B6 gefixt sein,
sonst bricht die Suchparam-Übergabe.) B6 ist seit A10 verifiziert robust (funktionale
`setSearchParams`-Updater-Form).

**Gefixt (13.07.2026):** [`ui/Link/Link.tsx`](src/ui/Link/Link.tsx) entscheidet jetzt selbst: Hrefs, die mit
`/` beginnen und kein `#` enthalten, werden über `react-router-dom`s `Link` client-seitig navigiert; alles
andere (externe URLs, `mailto:`, `/#anchor`-Sprungmarken) bleibt ein echtes `<a>`. Die `/#anchor`-Ausnahme ist
bewusst: Bei einem Wechsel von einer Unterseite zu `/#about` muss der Browser die Seite neu laden, damit das
native Hash-Scrolling zum Element greift — client-seitiges Routing hätte das stillschweigend kaputt gemacht.
Alle Komponenten mit garantiert internem Ziel (`BlogCard`, `BlogPost`s `BackLink`/`RelatedProject`,
`ProjectTile`, `ProjectGrid`s `ProjectBlogPostCard`) wurden von `styled.a` auf `styled(Link)` von
`react-router-dom` umgestellt; `SkillChip`s `Chip` (Link nur wenn ein Skill gematcht wird) auf zwei Varianten
(`ChipAnchor`/`ChipRouterLink`) mit geteiltem CSS aufgeteilt, da `to` bei React-Router nicht `undefined` sein
darf. Nebenbefund: [`ImprintContent.tsx`](src/features/imprint/ImprintContent/ImprintContent.tsx) verlinkte
Privacy mit dem _relativen_ Pfad `./privacy` statt `/privacy` — funktionierte nur, weil die Seite zufällig
immer unter `/imprint` (ohne weiteres Pfadsegment) läuft; auf absolut umgestellt. Mit `tsc`, ESLint und
Playwright (Klick-Navigation auf Blog-/Projekt-/Skill-Links, keine Full-Page-Reloads mehr, keine
Konsolenfehler) verifiziert.

### 🟠 A8: Klickbare `<div>`s + gezielt deaktivierte A11y-Regeln — ✅ GEFIXT

[`LicenseHandle` (L203), `LinkHandle` (L281), `CloseHandle` (L251)](src/features/projects/ProjectGrid/ProjectGrid.tsx#L203)
in `ProjectGrid.tsx` sind `<div onClick>` — ohne `href`, ohne Tab-Fokus, ohne Enter/Space, unsichtbar für
Screenreader. In [`eslint.config.js:85-87`](eslint.config.js#L85) sind genau die drei Regeln abgeschaltet, die
davor warnen würden (`jsx-a11y/click-events-have-key-events`, `no-static-element-interactions`,
`no-noninteractive-element-interactions`). Regeln zu deaktivieren, statt `<a>`/`<button>` zu verwenden, ist
das Muster, bei dem Senior-Reviewer den Kopf schütteln — zumal die Seite mit Storybook-a11y-Addon ausgestattet
ist.

**Gefixt (13.07.2026):** `LicenseHandle` und `LinkHandle` (beide Navigation zu einer URL) sind jetzt
`styled.a` mit echtem `href`/`target="_blank"`/`rel="noopener noreferrer"` statt
`onClick={() => window.open(...)}`; `CloseHandle` (schließt das Panel, keine Navigation) ist `styled.button`
mit `type="button"` und einem kleinen Style-Reset (`appearance:none; padding:0; font:inherit`) gegen
abweichende Browser-Defaults. Das war der einzige Fundort im gesamten Repo — ein projektweiter Scan nach
`<div onClick>` fand sonst nur bereits-semantische `<button>`-Elemente. Die drei `jsx-a11y`-Regeln in
[`eslint.config.js`](eslint.config.js) sind wieder aktiv und laufen sauber durch (0 neue Verstöße). Mit `tsc`,
ESLint und Playwright (Tab-Fokus, `noopener` auf allen externen Links, Konsolen-Check) verifiziert.

### 🟠 A9: Invalides HTML in der Navigation — ✅ GEFIXT

[`PageCardList.tsx:193-208`](src/features/header/PageCardList/PageCardList.tsx#L193) rendert `<Ul>` → `<Link>`
(`<a>`) → `<Typography>` (seit A5 ein echtes `<p>`, vorher antd-`<div>` — die falsche Verschachtelung ändert
das nicht) → `<li>`. Erlaubte Kinder von `<ul>` sind nur `<li>`; ein `<li>` in einem `<p>` in einem `<a>` ist
doppelt invalide. Browser reparieren das still, aber Screenreader-Semantik („Liste mit 5 Einträgen") geht
kaputt. Richtig: `<ul><li><Link>…</Link></li></ul>`. Verwandt: Mehrere `<h1>` pro Seite (Seitentitel-H1 +
`project_header`-H1 je Panel in `Typography.tsx:133`) — Überschriften-Hierarchie für SEO/A11y aufräumen.

**Gefixt (13.07.2026):** Auf `<ul><li><Link><Typography>…</Typography></Link></li></ul>` umgestellt. Der
Clear-Button-artige Tap-Bereich musste dabei mitwandern: Das Mobile-Padding lag vorher auf dem innersten
`<li>` (das immer noch innerhalb des `<a>` lag, also Teil der klickbaren Fläche war); jetzt, wo `<li>` das
äußere Element ist, würde dieselbe Padding-Regel die Klickfläche sonst kleinschrumpfen. Padding daher von `li`
auf `a { display: block; padding: … }` verschoben, sodass die Ankerfläche weiterhin die volle gepolsterte Box
abdeckt — per Playwright verifiziert (Bounding-Box des Mobile-Menüpunkts 214×41px statt nur der Textzeile).
`H1_ProjectHeader` (Typography-Variante `project_header`, ein `<h1>` pro Projekt-Kachel/-Panel) auf `<h2>`
umgestellt und in `H2_ProjectHeader` umbenannt, damit der Name nicht länger lügt; die Komponente wird auf
Home/Projects potenziell mehrfach gerendert, was vorher mehrere `<h1>` pro Seite erzeugte. Mit Playwright
verifiziert: genau ein `<h1>` pro Seite (vorher mehrere), Nav-DOM-Struktur `ul > li > a

> p` bestätigt, keine Konsolenfehler.

### 🟠 A10: ESLint-Konfiguration mit toten Enden — teilweise ✅ GEFIXT

- `eslint-plugin-react-hooks` ist installiert, aber **nicht in** [`eslint.config.js`](eslint.config.js)
  **registriert** — weder `rules-of-hooks` noch `exhaustive-deps` laufen. Genau die Fehlerklasse, die z. B.
  die fehlende `calculateElementWidth`-Dependency in `ProjectGrid` unentdeckt lässt.
- `eslint-plugin-prettier` wird als Plugin geladen, aber die Regel `prettier/prettier` ist nie aktiviert —
  Prettier prüft effektiv nichts.
- Diverse Airbnb-Altlasten (`no-plusplus`, `class-methods-use-this`, `func-names`) werden deaktiviert, obwohl
  sie in keinem der geerbten Configs aktiv sind — totes Gewicht.

**Gefixt (13.07.2026, Punkt 1):** `react-hooks/rules-of-hooks` (error) und `exhaustive-deps` (warn) aktiviert.
`eslint-plugin-react-hooks` musste dafür von 4.6.0 auf 7.1.1 angehoben werden — 4.x ruft intern
`context.getSource()` auf, das in ESLint 9 entfernt wurde und `exhaustive-deps` mit einem Crash statt
Ergebnissen quittierte. Deckte zwei echte Verstöße auf (Blog.tsx, Skills.tsx: der
`?search=`/`?category=`-URL-Sync-Effekt schloss über das äußere `searchParams`-Objekt statt es über
`setSearchParams(prev => …)` aus dem Updater zu lesen) — auf die funktionale Setter-Form umgestellt, dadurch
hängt der Effekt jetzt nur noch von lokalem State ab.

**Gefixt (13.07.2026, Punkt 3):** Die toten Airbnb-Regeln (`func-names`, `no-plusplus`,
`class-methods-use-this`) entfernt sowie die drei `jsx-a11y`-Regeln aus A8 wieder aktiviert — `bun run lint`
bleibt dabei sauber (0 neue Verstöße).

**Versucht und bewusst zurückgenommen (13.07.2026, Punkt 2):** `prettier/prettier` aktiviert und
`bun run lint` laufen lassen — Ergebnis: **2.263 Fehler** quer durchs gesamte Repo. Ohne eigene `.prettierrc`
greift Prettiers Default-Stil (u. a. Trailing Commas, andere Objekt-Umbruchregeln), der mit den bereits
**manuell** in `eslint.config.js` gepflegten Formatierungsregeln dieses Projekts (Tabs,
`object-curly-newline`, `array-element-newline`, kein Trailing Comma) kollidiert. Ein sauberer Fix wäre
entweder eine auf das Projekt abgestimmte `.prettierrc` **plus** Bereinigung der überlappenden manuellen
Regeln, oder ein bewusst akzeptierter Ein-Zeit-Reformat von praktisch jeder Datei im Repo — beides eine
Design-Entscheidung für den Projekt-Stil, kein Bugfix. Zurückgesetzt auf den Ursprungszustand (Plugin geladen,
Regel inaktiv); bleibt offen.

### 🟡 A11: Keine Tests — ✅ GEFIXT

Kein `test`-Script in [`package.json`](package.json), kein Test-Runner, keine `*.test.*`-Datei im gesamten
Repo. Für reine Präsentationslogik vertretbar, aber `skillSort.ts`, `skillExport.ts` (CSV-Escaping!),
`blogFormat.ts` und die `getTimezoneOffsetMinutes`-Arithmetik in `AboutSection.tsx` sind pure Funktionen —
ideale, billige Unit-Test-Kandidaten (Vitest liegt mit Vite quasi bei).

**Gefixt (13.07.2026):** Vitest installiert und in [`vite.config.ts`](vite.config.ts) über einen `test`-Block
verdrahtet (dieselbe Alias-/Plugin-Konfiguration wie der App-Build, kein separates Config-File nötig);
`bun run test` in [`package.json`](package.json) ergänzt. Tests für `skillSort.ts`, `skillExport.ts` (inkl.
gezieltem Test des CSV-Formula-Injection-Escapings aus S9) und `blogFormat.ts` geschrieben.
`getTimezoneOffsetMinutes` war als nicht-exportierte lokale Funktion in `AboutSection.tsx` nicht direkt
testbar — nach [`utils/timezone.ts`](src/utils/timezone.ts) extrahiert (reine Funktionsverschiebung, keine
Verhaltensänderung) und dort getestet (u. a. Winter-/Sommerzeit-Sprung für Berlin, Halbstunden-Zone Indien).
24 Tests in 4 Dateien, alle grün; mit `tsc`/ESLint verifiziert, dass die Extraktion `AboutSection.tsx` nicht
bricht.

### 🟡 A12: Kleinkram, der in Reviews auffällt — ✅ GEFIXT (Auswahl)

- ~~[`pages/Project/Project.tsx:10`](src/pages/Project/Project.tsx#L10): auskommentierter Import
  (`//import LProject from '@/components/layouts/Project';`) als toter Code~~ Bereits verschwunden — beim
  Nachprüfen (13.07.2026) fand sich kein `components/layouts`-Verweis mehr im Repo, war wohl Nebeneffekt einer
  früheren Änderung.
- ~~[`features/me/Signature/Signature.tsx:25`](src/features/me/Signature/Signature.tsx#L25):
  Leerzeichen-Einrückung in einer Tab-Codebasis~~ **Gefixt:** auf Tab korrigiert.
- ~~`Typography`-Default-Variante ist `'footer'`~~ **Gefixt:** `variant` ist jetzt ein Pflicht-Prop (kein
  Default mehr) — ein projektweiter Scan zeigte, dass **kein** einziger Call-Site je auf den Default vertraut
  hat (`<Typography>` ohne `variant` kommt im Repo nicht vor), der Fix ist also ohne Verhaltensänderung
  durchgelaufen und macht ein zukünftiges Vergessen jetzt zu einem `tsc`-Fehler statt einem stillen
  Footer-Style.
- `projectTechOptions` in `Project.tsx` hart codiert — die Casing-Inkonsistenz (`'Java'` vs. lowercase)
  **gefixt** (kosmetisch, der Filter-Vergleich normalisiert ohnehin beide Seiten). Die volle Ableitung aus
  `projects[].techStack` **bewusst nicht gemacht**: Die Liste ist eine kuratierte Auswahl von 7
  Kern-Technologien; eine Ableitung aus allen `techStack`-Einträgen würde auch Build-Tools/CI-Provider (Maven,
  GitLab CI, Docker, …) ins Filter-Dropdown spülen — eine UX-Entscheidung, kein Bugfix.
- ~~`blog`-Assets heißen `screnn_1_en.png` (Tippfehler „screnn")~~ **Gefixt:** alle 8 Dateien auf `screen_*`
  umbenannt (`git mv`), `data/blog.ts` mitgezogen.
- `formatBlogDate` fix auf `en-GB`: **dokumentiert** (Kommentar ergänzt, warum — Tag-Monat-Jahr- Reihenfolge,
  nicht die Locale selbst, da die Blog-UI-Sprache immer Englisch ist).
- Storybook-Coverage-Lücken (`Blog`, `BlogPost`, `Skills`, `SkillCard` ohne Stories) — **bewusst offen
  gelassen**: neue Stories zu schreiben ist Feature-Arbeit (Testabdeckung erweitern), kein Bugfix, und damit
  außerhalb dessen, was in dieser Runde als „Fix" behandelt wurde.

**Nebenbefund beim Umsetzen (13.07.2026):** 12 Bilder in
[`AboutSection.tsx`](src/features/about/AboutSection/AboutSection.tsx) (Firmenlogos) und eines in
[`MeImage.tsx`](src/features/me/MeImage/MeImage.tsx) (Profilbild) luden per _relativem_ `src` (`./logos/…`,
`./me.png`) — dieselbe Bug-Klasse wie A1s `url(./footer.svg)`: Funktioniert nur, weil beide Komponenten heute
ausschließlich auf der Home-Route (`/`) gerendert werden. Vorsorglich auf absolute Pfade (`/logos/…`,
`/me.png`) umgestellt, bevor eine künftige Wiederverwendung auf einer Unterseite denselben 404 reproduziert,
der A1 bereits einmal live verursacht hat.

---

## 4. Performance & SEO

### 🔴 P1: nginx ohne gzip/brotli und ohne Cache-Header — 🟠 TEILWEISE GEFIXT

`docker/nginx.conf` aktivierte weder Kompression noch `Cache-Control`. Vite fingerprintet alle Assets
(`index-a1b2c3.js`) — die dürfen `Cache-Control: public, max-age=31536000, immutable` bekommen; `index.html`
dagegen `no-cache`. Ohne gzip gehen JS-Bundle + Fonts unkomprimiert über die Leitung. (Falls Cloudflare davor
komprimiert/cached, ist es abgemildert — Origin sollte es trotzdem können.)

**Bereits mit S3 gefixt:** `gzip`, `Cache-Control` (no-cache für `index.html`, immutable für `/assets/`) in
[`docker/nginx.conf`](docker/nginx.conf). **Noch offen:** Brotli (bräuchte ein nginx-Image mit
`ngx_brotli`-Modul, nicht in `nginxinc/nginx-unprivileged:stable-alpine` enthalten).

**Bewusst nicht angegangen (13.07.2026, dritte Runde):** Kein offiziell gepflegtes `nginx-unprivileged`-Image
mit vorkompiliertem `ngx_brotli` verfügbar — die Alternative wäre ein selbst kompiliertes nginx im
Docker-Build. Das ist eine Produktions-Infrastruktur-Änderung ohne Staging-Umgebung zum Testen vor dem echten
Deploy, und Cloudflare (laut Privacy-Seite bereits vorgeschaltet) komprimiert am Edge ohnehin per Brotli,
unabhängig vom Origin-Server — der Grenznutzen ist gering, das Risiko eines blind gebauten, ungetesteten
Server-Images nicht. Dafür wurde stattdessen kein Code geändert.

### 🔴 P2: Fonts — ✅ GEFIXT

- ~~Es werden 4 Schnitte als **TTF** geladen — als WOFF2 wären es ~30 % der Größe.~~ Erledigt:
  [`public/fonts/Fraunces-Variable.woff2`](public/fonts/Fraunces-Variable.woff2) ist eine einzige
  ~118-KB-WOFF2-Datei statt 26 TTF-Dateien (~9 MB).
- ~~`@font-face` in [`src/index.css`](src/index.css) hat weiterhin **kein** `font-display: swap`~~ Ergänzt an
  allen vier `@font-face`-Regeln.
- ~~Kein `<link rel="preload">` für die Fraunces-Datei in [`index.html`](index.html)~~ Ergänzt.
- ~~Der `body`-Font `Domine` ist weiterhin in `fonts.body` (`theme.ts`) deklariert, aber nirgends per
  `@font-face`/Import geladen~~ Rückfrage an den User: Domine als echten Webfont laden (sichtbare
  Design-Änderung) oder toten Verweis entfernen? Antwort: entfernen — `fonts.body` wurde nirgends referenziert
  (keine Typography-Variante nutzte es), Root-`font-family` fällt jetzt explizit auf `system-ui, …` zurück (=
  exakt das, was durch den fehlenden Font-Load ohnehin schon gerendert wurde). Keine visuelle Änderung, nur
  eine ehrliche Deklaration.

**Gefixt (13.07.2026).**

### 🟠 P3: Blog-Bilder bis 2,1 MB PNG — ✅ GEFIXT

[`public/blog/ios_screnn_1_en.png`](public/blog/ios_screnn_1_en.png) (2,1 MB) und weitere
`ios_screnn_*`/`screnn_*`-Dateien (1–1,8 MB) werden in einer 4-Spalten-Galerie-Thumbnail-Ansicht geladen, kein
`loading="lazy"` im Blog-Code gefunden. Screenshots als WebP/AVIF in angemessener Auflösung wären je ~100–200
KB; dazu `loading="lazy"` und `srcset`. Aktuell lädt ein Blog-Artikel ~7 MB Bilder.

**Gefixt (13.07.2026):** Alle 9 Blog-Bilder (die 8 Screenshot-Galerien + `google_presentation.png`) mit `sips`
auf max. 700px Kantenlänge herunterskaliert (deutlich großzügiger als die ~230–280px-CSS-Breite in der
4-Spalten-Galerie, damit es auf Retina-Displays weiterhin scharf bleibt) und mit `cwebp -q 82` nach WebP
konvertiert — von zusammen ~10,4 MB auf ~150 KB (die einzelnen Dateien: 2,1 MB → 12–37 KB). Kein
`srcset`/AVIF, da WebP bei diesem Kompressionsgrad bereits mehr als ausreichend ist und ein zusätzliches
Format-Set an dieser Stelle Overhead ohne spürbaren Nutzen wäre. `loading="lazy"` auf den Galerie- und
Einzelbild-Blöcken in [`BlogPost.tsx`](src/pages/BlogPost/BlogPost.tsx) ergänzt (Store-Badges bewusst
ausgenommen — die sind klein und sitzen meist direkt im sichtbaren Bereich). Per Playwright verifiziert: alle
WebP-Bilder laden fehlerfrei mit korrekten Maßen, keine 404s, `loading="lazy"` korrekt gesetzt.

### 🟠 P4: Kein Code-Splitting — ✅ GEFIXT

Alle Routen, alle Daten (`skills.ts` 1.260 Zeilen, `projects.ts` 758, `blog.ts` 240) und antd +
FontAwesome-Komplettpacks landen in einem Bundle. Kein `React.lazy`/`lazy(` in [`src/main.tsx`](src/main.tsx)
gefunden. `React.lazy()` pro Route plus A5/A6 würden den Initial-Load drastisch senken.

**Gefixt (13.07.2026):** Alle sieben Pages auf `lazy(() => import(...))` umgestellt, geroutetes Element in
`<Suspense fallback={null}>` (Fallback bewusst leer — nach A5/A6 sind die Chunks klein genug, dass ein
Ladezustand nicht nötig ist). Mit Playwright verifiziert: Direktaufruf jeder Route lädt nur ihren eigenen
Chunk plus tatsächliche Abhängigkeiten (z. B. `/privacy` lädt nichts außer dem eigenen Mini-Chunk + dem
geteilten `PageLayout`-Chunk, kein `ProjectTile`/ `Filter`); ein Client-seitiger Wechsel zwischen zwei bereits
gemounteten Routen (Blog → Skills) lädt den neuen Chunk korrekt nach.

### 🟠 P5: SEO-Basics fehlen — ✅ GEFIXT

- [`index.html:11-22`](index.html#L11): `og:title`/`og:type` sind statisch gesetzt, aber weiterhin keine
  `meta description`, kein `og:description`/`og:image`/`og:url`, kein canonical. Der Helmet-Einsatz setzt nur
  `<title>`.
- Blog-Posts haben keine per-Post-Metadaten (Titel/Description/OG) — beim Teilen eines Artikels zeigt jede
  Plattform nur „Temmi Pietsch - Blog".
- [`src/sitemap.xml`](src/sitemap.xml) wird manuell gepflegt und enthält **keinen einzigen Blog-Post** (15
  URLs, alle Projekte/Statics). Da Posts in `data/blog.ts` liegen, ließe sich die Sitemap im Build generieren.
- SPA ohne Prerendering: Crawler ohne JS sehen eine leere Seite. Für ein Portfolio wäre Prerendering (z. B.
  `vite-plugin-ssr`/statisches Snapshotting) oder mittelfristig ein SSG-Framework die robustere Basis.
  **Bleibt offen** — größerer Architektur-Umbau, kein Quick-Fix, explizit außerhalb des beauftragten Umfangs.

**Gefixt (13.07.2026):** `index.html` auf minimale statische Tags reduziert (Charset, Viewport, Theme-Color,
Font-Preload, Favicons — Dinge, die sich nie pro Seite ändern); `og:title`/`og:type` raus, da sie sonst mit
den Helmet-injizierten Tags dupliziert hätten (Helmet ersetzt nur Tags, die es selbst vorher gerendert hat,
nicht beliebige statische HTML-Tags — zwei `<meta property="og:title">` im finalen DOM wären die Folge
gewesen). Stattdessen: ein Root-`<Helmet>` in `main.tsx` für Tags, die nicht variieren (`og:type`, `og:image`,
`twitter:card`), plus eine `PageMeta`-Komponente, die pro Route
`title`/`description`/`og:title`/`og:description`/ `og:url`/`canonical` setzt — die URL kommt aus
`useLocation()`, nicht aus dem Route-Pattern, damit `/project/:id` als `canonical` die echte URL
(`/project/alimonia`) bekommt statt des rohen Patterns. `BlogPost.tsx` und `Project.tsx` (bei Deep-Link auf
ein Projekt) überschreiben das zusätzlich mit dem spezifischen Post-/Projekt-Titel und der jeweiligen
Beschreibung (`post.excerpt` bzw. `project.description`), `og:type` wird für Posts zu `article`.

Sitemap: `src/sitemap.xml` lag nie in `public/`, sondern in `src/` — Vite kopiert aber nur `public/`
unverändert nach `dist/`. Ein Build-Check zeigte: **weder `robots.txt` noch `sitemap.xml` existierten je im
Produktions-Output**, beide 404en live durchgehend (siehe Nachtrag zu B8). `robots.txt` nach `public/`
verschoben; `sitemap.xml` durch [`scripts/generate-sitemap.ts`](scripts/generate-sitemap.ts) ersetzt, das vor
jedem `vite build` aus `data/projects.ts` + `data/blog.ts` frisch generiert (21 URLs statt der alten 15, inkl.
beider Blog-Posts, mit aktuellen statt längst gelöschter Projekt-IDs). Verifiziert: Build-Output enthält jetzt
beide Dateien mit korrektem Inhalt; jede Seite zeigt per Playwright genau ein Exemplar jedes Meta-Tags (keine
Duplikate durch die Root+Page-Helmet-Aufteilung).

---

## 5. Was gut ist 👍

Damit die Liste oben nicht das Bild verzerrt — vieles ist überdurchschnittlich sauber:

- **TypeScript strict** und `tsc --noEmit` läuft fehlerfrei durch; keine `any`-Casts, keine `@ts-ignore` im
  ganzen Projekt.
- **Modelle** (`models/*.ts`) sind sauber getypt, `BlogBlock` als Discriminated Union ist genau richtig für
  den Anwendungsfall.
- **Design-Tokens** (`styles/theme.ts`, `whiteAlpha()`, `fluid()`) existieren und sind gut dokumentiert — das
  Fundament für A4 liegt schon da.
- Konsequente **JSDoc-Kommentare** mit „Warum"-Erklärungen (z. B. der Dedupe-Kommentar in `vite.config.ts`,
  der `threshold: 0`-Kommentar in `Trail.tsx`).
- **IntersectionObserver** statt Scroll-Pixel-Hacks für Header/Trail-Reveal.
- **Routen-Validierung** in `main.tsx` (unbekannte Projekt-/Blog-IDs → Redirect statt Crash).
- CSV-Quote-Escaping, `encodeURIComponent` beim SkillChip-Link, `rel` auf allen `target="_blank"`-JSX-Anchors
  — an vielen Stellen wurde mitgedacht.
- Multi-Stage-Dockerfile (Build-Artefakte sauber vom Runtime-Image getrennt).
- Storybook mit a11y-Addon eingerichtet.

---

## 6. Priorisierte To-do-Liste

| #   | Aufwand     | Wirkung                                | Maßnahme                                                                                                                                                                                                         |
| --- | ----------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Minuten     | Rechtsrisiko weg                       | Trial-Fonts durch Fraunces ersetzt (S10 ✅); `me.afphoto` entfernt (S8 ✅); WOFF2/`font-display`/Preload für Fraunces (P2) — ✅                                                                                  |
| 2   | Minuten     | Bugfix sichtbar                        | `--webkit-` → `-webkit-backdrop-filter` an 8 Stellen (B1) — ✅                                                                                                                                                   |
| 3   | Minuten     | Security                               | `window.open(href, '_blank', 'noopener,noreferrer')` (S4) — ✅                                                                                                                                                   |
| 4   | Minuten     | Security                               | Deploy-Key aus der URL in einen Header; Actions auf SHA gepinnt (S1, S2) — ✅ komplett (Client + Server + Restart)                                                                                               |
| 5   | ~1 h        | Security + Speed                       | nginx: Security-Header, gzip, Cache-Control (S3, P1 gzip-Teil) — ✅; `.dockerignore` + `--frozen-lockfile` (S5) — ✅                                                                                             |
| 6   | ~1 h        | Qualität dauerhaft                     | CI-Job `tsc && lint && build` vor Deploy (S6) — ✅; `react-hooks`-Plugin in ESLint aktivieren (A10) — ✅                                                                                                         |
| 7   | ~2 h        | −50 % Page-Code                        | `PageLayout`-Komponente extrahieren (A1) — ✅; `SearchInput`/`Dropdown` nach `ui/` (A2) — ✅                                                                                                                     |
| 8   | ~2 h        | Bundle ↓↓                              | antd durch native Elemente ersetzen (A5) — ✅; FontAwesome auf benannte Imports (A6) — ✅; `React.lazy` pro Route (P4) — ✅                                                                                      |
| 9   | laufend     | CSS ↓ ~50 %                            | A4 ✅ komplett: Basis+`wide`→`fluid()`, `mobile`/`tablet` auf per-Band-`vw` + Tablet-Content ×0.75 (14.07., `fluidRange`-Versuch verworfen); `ProjectGrid`-Panels dedupliziert (A3) — ✅                         |
| 10  | ~1 h        | SEO                                    | meta/OG-Tags via Helmet pro Seite, Sitemap aus `data/` generieren (P5) — ✅; dabei entdeckt: `robots.txt`/`sitemap.xml` lagen in `src/` statt `public/` und wurden **nie deployed** (B8-Nachtrag) — ✅ mitgefixt |
| 11  | ~3 h        | SPA-Geschwindigkeit, A11y, Wartbarkeit | Interne Navigation auf Router-`<Link>` (A7) — ✅; klickbare `<div>`s → `<a>`/`<button>` + a11y-Regeln reaktiviert (A8) — ✅; invalides Nav-HTML + doppelte `<h1>`s (A9) — ✅                                     |
| 12  | ~1 h        | Qualität dauerhaft                     | Tote ESLint-Regeln raus, a11y-Regeln an (A10) — ✅; `prettier/prettier` geprüft und bewusst zurückgestellt (2.263 Diffs ohne `.prettierrc`)                                                                      |
| 13  | ~2 h        | Regressions-Schutz                     | Vitest + 24 Tests für `skillSort`/`skillExport`/`blogFormat`/`timezone` (A11) — ✅                                                                                                                               |
| 14  | Minuten–1 h | Kleinkram + Bildgröße                  | `Typography`-Pflicht-Prop, Signature-Einrückung, `screnn`→`screen`-Rename, relative Asset-Pfade (A12) — ✅; Blog-Bilder 10,4 MB → 150 KB per WebP + Lazy-Loading (P3) — ✅                                       |
| 15  | Minuten     | **Deploy-Blocker behoben**             | `docker/Dockerfile` kopierte gelöschte `src/robots.txt`/`src/sitemap.xml` — Docker-Build wäre beim nächsten Push gescheitert (B10, Regression aus B8/P5) — ✅                                                    |

**Noch offen nach diesem dritten Rundumschlag:**

- ~~**A4** (`fluid()`-Migration)~~ — ✅ inzwischen komplett gefixt (14.07.2026): Basis+`wide` per `fluid()`,
  `mobile`/`tablet` auf reines per-Band-`vw` + Tablet-Content ×0.75 (`fluidRange`-Versuch verworfen), Details
  im A4-Eintrag.
- **Prerendering/SSG** (Teil von P5) — größerer Architektur-Umbau, kein Quick-Fix.
- **P1 (Brotli)** — kein offizielles `nginx-unprivileged`-Image mit `ngx_brotli`; Cloudflare komprimiert am
  Edge vermutlich ohnehin schon. Ungetestetes Server-Image-Risiko gegen geringen Grenznutzen abgewogen und
  bewusst nicht gebaut.
- **A10, Punkt 2** (`prettier/prettier`) — würde ohne passende `.prettierrc` 2.263 Zeilen quer durchs Repo
  anfassen; das ist eine Stil-Entscheidung, kein Bugfix.
- **S2-Rest** (Cloudflare-Token-Scoping) — liegt im Cloudflare-Dashboard, außerhalb des Repos.
- **A12** (Storybook-Coverage-Lücken, volle Ableitung von `projectTechOptions`) — Feature-/ UX-Arbeit, kein
  Bugfix.

Alle anderen zuvor offenen Punkte (A3, A7, A8, A9, A11, A12-Auswahl, P3) sind mit diesem Rundumschlag gefixt.

---

_Erstellt am 13.07.2026 durch automatisierte Code-Analyse (Claude Code), fortgeschrieben am 13.07.2026 nach
einem zweiten Durchlauf (A1, A2, A5, A6, A10, P2, P4, P5) und einem dritten Durchlauf (A3, A7, A8, A9,
A10-Rest, A11, A12, P3, plus der B10-Deploy-Blocker-Fund). Alle Zeilenangaben beziehen sich auf den Working
Tree zum jeweiligen Analysezeitpunkt._
