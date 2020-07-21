# pdl-fullmakt-ui

Frontend for NAV ny [fullmakt](https://github.com/navikt/pdl-fullmakt-api). <br> 
Selvbetjeningsløsning for lage/endre/slette fullmakter.

## Se appen på nav.no:
https://www.nav.no/person/pdl-fullmakt-ui/fullmakt <br> 
Logg deg inn via ID-porten. Merk at appen har level 4 sikkerhet.

## Se appen i dev-sbs:
Q0: https://www-q0.nav.no/person/pdl-fullmakt-ui/

## Komme i gang

Hent repoet fra github

```
git clone https://github.com/navikt/pdl-fullmakt-ui.git
```

Installer nødvendige pakker:

```
npm install
```

Start dekoratøren og mocks

```
docker-compose up -d
```

Start applikasjonen lokalt:

```
npm start
```

## Feature toggles

Unleash er brukes til å skru av og på applikasjonen.<br>
https://unleash.nais.adeo.no/#/features/strategies/pdl-fullmakt <br>
Obs: Unleash er kun tilgjengelig i fagsystemsonen.

## Deployering

- Q0: Commit dev/* branch
- PROD: Commit på master

## Logging

Feil ved API-kall blir logget via frontendlogger og vises i Kibana<br>
[https://logs.adeo.no](https://logs.adeo.no/app/kibana#/discover/ad01c200-4af4-11e9-a5a6-7fddb220bd0c)

## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/pdlfullmakt

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #pdl-fullmakt  / #mfn

