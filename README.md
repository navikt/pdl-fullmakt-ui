[![CircleCI](https://circleci.com/gh/navikt/pdl-fullmakt-ui.svg?style=svg)](https://circleci.com/gh/navikt/pdl-fullmakt-ui)

# pdl-fullmakt-ui
Frontend for NAV ny [fullmakt](https://github.com/navikt/pdl-fullmakt-api)

## Komme i gang

Hent repoet fra github

```
git clone https://github.com/navikt/pdl-fullmakt-ui.git
```

Installer nødvendige pakker:

```
npm install
```

Start applikasjonen lokalt:

```
npm start
```


## Deployering

Applikasjonen bygges automatisk til dev / https://www-q0.nav.no/person/pdl-fullmakt-ui ved merge til master eller ved manuell godkjenning i [CircleCI](https://circleci.com/gh/navikt/workflows/pdl-fullmakt-ui). <br><br>
For å lansere applikasjonen til produksjon / https://www.nav.no/person/pdl-fullmakt-ui, benytt [npm version](https://docs.npmjs.com/cli/version) til å oppdatere package.json og lage samsvarende Git-tag. Eks:

```
npm version patch -m "Din melding"
```

Push deretter den nye versjonen til GitHub og merge til master.

```
git push && git push --tags
```

Godkjenn produksjonssettingen i [CircleCI](https://circleci.com/gh/navikt/workflows/pdl-fullmakt-ui).

## Logging

Feil ved API-kall blir logget via frontendlogger og vises i Kibana<br>
[https://logs.adeo.no](https://logs.adeo.no/app/kibana#/discover/ad01c200-4af4-11e9-a5a6-7fddb220bd0c)

## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/pdlfullmakt

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #pdl-fullmakt

