# Feedback template — ce qui a été développé ici et mérite de remonter

Ce document liste tout ce qui a été construit ou corrigé pendant ce projet et qui est assez générique
pour rejoindre la template de base, indépendamment du fait qu'un projet dérivé soit un salon de
coiffure ou toute autre activité. Référence : diff entre le commit `6056b49` (état de la template au
moment du fork) et l'état actuel du dépôt.

## 1. Système de "reveal" au scroll, en CSS pur

**Fichiers concernés :** `src/styles/globals.css`, `src/declarations/ui/tokens.ts` (registre `MOTION`)

Un jeu complet de classes de révélation au scroll — `reveal`, `reveal-soft`, `reveal-left`,
`reveal-right`, `reveal-zoom`, `reveal-wipe`, `reveal-stagger`, `reveal-picture` — piloté par
`animation-timeline: view()`. Aucune dépendance JS, aucun `IntersectionObserver`, repli automatique et
propre sous `prefers-reduced-motion`. Le registre `MOTION` dans `tokens.ts` expose ces classes comme
tokens, au lieu de les écrire en dur dans les composants.

À faire : porter tel quel dans `globals.css` et `tokens.ts` de la template, avec le bloc `@keyframes`
associé (`reveal-rise`, `reveal-side`, `reveal-scale`, `reveal-fade`, `reveal-wipe`, `reveal-picture`).

## 2. Consentement cookies par catégorie (RGPD)

**Fichiers concernés :** `src/services/ConsentService.ts`, `src/components/structures/feedback/ConsentManager.tsx` (remplace `ConsentBanner.tsx`), `src/types/consent.ts`, `src/declarations/analytics.ts` (`CONSENT_CATEGORIES`)

Le bandeau accepter/refuser binaire est remplacé par un vrai système de préférences :

- des catégories déclarées (`necessary`, `analytics`) avec un flag `isRequired` et un gating optionnel
  par feature flag (`feature: 'analytics'`)
- une bulle flottante persistante (au lieu d'un bandeau qu'on ne revoit jamais une fois fermé) qui
  ouvre une modale de préférences avec un switch par catégorie
- un état structuré `{ status, preferences }` stocké et lu au lieu d'un simple `'granted' | 'denied'`

À faire : porter `ConsentService`, `ConsentManager`, les types associés et l'icône `public/cookies/cookie.png`
dans la template, à la place de l'actuel `ConsentBanner`. Documenter le point d'extension pour ajouter
une catégorie (`marketing`, par exemple) dans un projet dérivé.

## 3. `HttpService` : support des corps `form`-encoded

**Fichiers concernés :** `src/services/HttpService.ts`, `src/types/api.ts`

Ajout d'une option `form?: Record<string, string>` à côté de `body`, qui bascule le `Content-Type` sur
`application/x-www-form-urlencoded`. Nécessaire pour tout endpoint OAuth / token classique (beaucoup
de fournisseurs refusent le JSON sur leur endpoint de token). Le monopole HTTP reste unique, l'API
s'enrichit sans se complexifier.

À faire : porter le paramètre `form` et la logique d'encodage dans le `HttpService` de la template.

## 4. `LanguageSwitcher` repensé en sélecteur

**Fichiers concernés :** `src/services/I18nService.ts` (`flagOf`, `languageNameOf`), `src/components/structures/navigation/LanguageSwitcher.tsx`, `LANGUAGE_SWITCHER_STYLES`

L'ancienne version affichait un lien par langue alternative, ce qui ne passe pas à l'échelle au-delà de
deux langues. La nouvelle version :

- lit le nom natif de chaque langue via `Intl.DisplayNames`
- calcule l'emoji drapeau à partir d'un code région (`I18nService.flagOf`)
- rend un vrai `<select>` avec drapeau + `router.replace` pour rester sur la même route en changeant de
  langue

À faire : porter `flagOf`/`languageNameOf` dans `I18nService`, le composant `LanguageSwitcher` et son
registre de styles. Nécessite un champ `regions` dans `configurations/localization.json` (mapping
locale → code région ISO).

## 5. Catalogue de prix déplacé en configuration

**Fichiers concernés :** `src/configurations/pricing.json` (nouveau), `src/services/ConfigurationService.ts`, `src/types/content.ts` (`PricingCatalogue`)

Dans la template actuelle, `PRICING` vit dans `declarations/content.ts`, un registre TypeScript — alors
que c'est une donnée qui décrit le projet, pas un registre structurel. Elle a été déplacée vers
`configurations/pricing.json` et exposée via `ConfigurationService.pricing`, conformément à la règle
architecturale du dépôt (une donnée de projet vit dans `configurations/`).

À faire : appliquer le même déplacement dans la template — sortir `PRICING` de `declarations/content.ts`
vers `configurations/pricing.json`, et adapter `PricingSection` en conséquence.

## 6. Moteur de prise de rendez-vous, à généraliser en module optionnel

**Fichiers concernés :** `src/services/AppointmentService.ts`, `src/services/CalendarService.ts`, `src/configurations/booking.json`, `src/types/booking.ts`, `BOOKING_STYLES`

Un module complet et solide :

- calcul des créneaux disponibles à partir des horaires d'ouverture (`ConfigurationService.identity.openingHours`),
  du fuseau horaire, d'un délai de prévenance minimum et d'un horizon de réservation
- grille de calendrier mensuel, gestion des jours fermés/aujourd'hui/sélectionné
- synchronisation avec Google Calendar côté serveur, authentification par compte de service (JWT
  signé, `node:crypto`), lecture des plages occupées (`freeBusy`) et écriture d'un événement à la
  réservation
- rien dans la logique n'est spécifique à la coiffure : ça sert tout métier qui vend des créneaux
  (praticien, coach, artisan, photographe...)

À faire : porter le module dans la template, mais le documenter et le brancher comme fonctionnalité
optionnelle activable par feature flag (`ConfigurationService.isEnabled('booking')` ou équivalent),
avec les credentials Google Calendar en variables d'environnement vides par défaut — pas activé tant
qu'un projet dérivé n'en a pas besoin.

## 7. Carrousel de comparaison avant/après, à renommer

**Fichiers concernés :** `src/components/sections/TransformationSection.tsx`, `TRANSFORMATION_STYLES`

Le mécanisme est générique : paire d'images comparées côte à côte, défilement tactile, pastilles de
navigation, défilement automatique pausable au survol/focus, respect de `prefers-reduced-motion`. Sert
autant la rénovation, l'esthétique, le fitness, l'immobilier que la coiffure.

À faire : porter le composant en le renommant en quelque chose de neutre (`ComparisonSection` par
exemple), avec des clés de traduction et un contenu placeholder génériques plutôt que "avant/après
coiffure".

## 8. Fond de page texturé procédural, à documenter comme pattern

**Fichiers concernés :** `src/components/layout/MarbleBackdrop.tsx`, `public/images/marble.svg`, classes `.marble-frame`/`.marble-grain` dans `globals.css`

La technique est réutilisable même si le rendu (marbre doré) ne l'est pas : un fond décoratif généré
entièrement en SVG par filtres (`feTurbulence`, `feColorMatrix`, `feDisplacementMap`), superposé à une
texture de grain légère en `data:` URI, sans aucune image bitmap.

À faire : garder la technique comme pattern documenté dans la template (un composant
`TexturePageBackdrop` générique acceptant un SVG de fond en paramètre, plutôt qu'un composant qui
suppose un marbre doré).

## 9. Petites corrections et tokens génériques

- **`Tabs.tsx`** : ajout de `key={active.id}` sur le panneau actif pour rejouer l'animation de fade-in
  à chaque changement d'onglet — corrige un vrai bug (l'animation ne se rejouait pas).
- **`globals.css`** : `scroll-padding-top` calé sur la hauteur du header sticky (corrige le scroll vers
  une ancre qui se retrouvait cachée sous le header) ; ascenseur personnalisé (`::-webkit-scrollbar-*`) ;
  `:focus-visible` et `::selection` retouchés ; utilitaire `.marquee`/`.marquee-track` pour un bandeau
  défilant en boucle (logos clients, avis), en pause au survol/focus, avec repli `overflow-x: auto` en
  `prefers-reduced-motion: reduce`.
- **`tokens.ts`** : `SURFACES.glass` (variante glassmorphism), `UNDERLINE`/`UNDERLINE_ACTIVE`
  (soulignement animé au survol, `scale-x` sur pseudo-élément), `CONTAINER_WIDTHS.wide`.
- **`tailwind.config.ts`** : `height`/`minHeight` génèrent maintenant aussi depuis `theme.layout` (pas
  seulement `maxWidth`), animations `rise`/`shine`/`drift`/`marquee` ajoutées au registre Tailwind.
- **`Modal.tsx`, `ScrollToTop.tsx`, `NavigationList.tsx`** : nettoyages de variantes et de tokens de
  style, sans logique nouvelle — à reporter tels quels.

## 10. Skills à recommitter dans le dépôt template

Deux skills ont été ajoutés dans `.claude/skills/` après le fork du projet (13/08, contre le 12/08 pour
les skills déjà présents dans la template) et sont entièrement génériques :

- **`commits`** — convention de message de commit (emoji + verbe anglais au passé + phrase courte,
  liste d'émojis de référence, règle de découpage par fonctionnalité). Rien de spécifique au projet.
- **`frontend-design`** — guidance de design distinctif (palette, typographie, layout), sous licence
  Apache 2.0, conçue pour être partagée telle quelle.

À faire : copier ces deux dossiers dans `.claude/skills/` du dépôt template.
