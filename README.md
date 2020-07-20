# pdl-fullmakt-ui

![Deploy-to-prod](https://github.com/navikt/pdl-fullmakt-ui/workflows/Deploy-to-prod/badge.svg) <br>
![Deploy-to-q0](https://github.com/navikt/pdl-fullmakt-ui/workflows/Deploy-to-q0/badge.svg)

Frontend for NAV ny [fullmakt](https://github.com/navikt/pdl-fullmakt-api). <br> React applikasjon som skal gi brukeren innsikt i fullmakt NAV har lagret.

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

- Q0: Commit på master
- PROD: Tag på formatet `vX.X.X`.

## Logging

Feil ved API-kall blir logget via frontendlogger og vises i Kibana<br>
[https://logs.adeo.no](https://logs.adeo.no/app/kibana#/discover/ad01c200-4af4-11e9-a5a6-7fddb220bd0c)

## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/pdlfullmakt

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #pdl-fullmakt  / #mfn

