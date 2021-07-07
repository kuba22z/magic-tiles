# magic tiles - back to street

###  In diesem Repository wird die Spielidee magic tiles umgesetzt.
### Programmiert von Pierre Dahmani und Jakub Naumowicz.

# Systemdokumentation

## Technologien

- Vue.js bzw. Nuxt.js als Framework für Vue.js
- Tailwindcss als Styling Library mit einem utility-first Approach.
- Typescript, wodurch wir Fehlerquellen durch falsche Datentypen schon beim
  Entwickeln entdecken können.
- Prettier und Eslint für Formatting und Linting.
- Cypress zum Testen.
- .gitlab-ci.yml zur Durchführung von automatisiertem Bauen, Testen und
  Deployen der Anwendung.

## Git Workflow

- [feature branch workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)
- jedes Feature wird auf einem eigenen Branch entwickelt. Beispiel:
  feature/TILES-nummerDesFeatures-beschreibungDesFeatures
- Merge Requests sind benötigt um feature Branches in den development oder
  master Branch zu pushen.

## Architektur

### Startseite
- ![Bild der Startseite](/abschlussbericht/systemDocumentation/indexDiagram.png)
### Spieleseite
- ![Bild der Spieleseite](/abschlussbericht/systemDocumentation/gamingScreenDiagram.png)

## Styleguide

- [Hier](https://git.fh-aachen.de/backtostreet/magic-tiles-back-to-street/-/blob/master/styleguide.md)

## Spieleansichten

### Mobile Ansicht
- ![Mobile Ansicht](/abschlussbericht/mobileAnsicht.png)

### Desktop Ansicht
- ![Desktop Ansicht](/abschlussbericht/desktopAnsicht.png)
