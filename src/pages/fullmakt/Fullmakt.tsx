import React, { useState } from "react";
import VeilederIcon from "../../assets/Veileder.svg";
import Veilederpanel from "nav-frontend-veilederpanel";
import Tilbake from "../../components/tilbake/Tilbake";
import { useStore } from "../../providers/Provider";
import RadioPanelGruppe from "../../components/input-fields/RadioPanelGruppe";
import { Hovedknapp, Knapp } from "nav-frontend-knapper";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { baseUrl } from "../../App";
import InputFodselsnr from "../../components/input-fields/InputFodselsnr";
import { postFullmakt } from "../../clients/apiClient";
import InputField from "../../components/input-fields/InputField";
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import NavFrontendSpinner from "nav-frontend-spinner";
import { HTTPError } from "../../components/error/Error";
import { FormContext, Form, Validation } from "calidation";
import InputNavn from "../../components/input-fields/InputNavn";
import InputMelding from "../../components/input-fields/InputMelding";
import InputTelefon from "../../components/input-fields/InputTelefon";
import {
  ON_BEHALF_OF,
  OutboundFullmaktBase,
  OutboundFullmaktType,
  OutboundFullmaktExtend
} from "../../types/fullmakt";
import {
  annenPersFormConfig,
  baseFormConfig,
  bedriftFormConfig,
  privPersFormConfig,
  tlfFormConfig,
  ytelseTjenesteFormConfig
} from "./config/form";
import Header from "../../components/header/Header";

export type OutboundFullmakt = OutboundFullmaktBase &
  OutboundFullmaktType &
  OutboundFullmaktExtend;

const Fullmakt = (props: RouteComponentProps) => {
  document.title = "Fullmakt service - www.nav.no";

  const [{ auth }] = useStore();
  const [loading, settLoading] = useState(false);
  const [error, settError] = useState();

  const send = (e: FormContext) => {
    const { isValid, fields } = e;
    const hvemFra: ON_BEHALF_OF = fields.hvemFra;

    if (isValid) {
      const outboundBase: OutboundFullmaktBase = {
        klagetekst: fields.melding,
        oenskerAaKontaktes: fields.onskerKontakt === "true" ? true : false
      };

      const outboundType: OutboundFullmaktType =
        fields.klageType === "SAKSBEHANDLING"
          ? {
              klagetype: fields.klageType,
              ytelseTjeneste: fields.ytelseTjeneste
            }
          : {
              klagetype: fields.klageType
            };

      const outboundExtend: {
        [key in ON_BEHALF_OF]: OutboundFullmaktExtend;
      } = {
        PRIVATPERSON: {
          paaVegneAv: "PRIVATPERSON",
          innmelder: {
            navn: fields.innmelderNavn,
            telefonnummer: fields.innmelderTlfnr,
            personnummer: fields.innmelderFnr
          }
        },
        ANNEN_PERSON: {
          paaVegneAv: "ANNEN_PERSON",
          innmelder: {
            navn: fields.innmelderNavn,
            telefonnummer: fields.innmelderTlfnr,
            harFullmakt: fields.innmelderHarFullmakt === "true" ? true : false,
            rolle: fields.innmelderRolle
          },
          paaVegneAvPerson: {
            navn: fields.paaVegneAvNavn,
            personnummer: fields.paaVegneAvFodselsnr
          }
        },
        BEDRIFT: {
          paaVegneAv: "BEDRIFT",
          innmelder: {
            navn: fields.innmelderNavn,
            telefonnummer: fields.innmelderTlfnr,
            rolle: fields.innmelderRolle
          },
          paaVegneAvBedrift: {
            navn: fields.orgNavn,
            postadresse: fields.orgPostadr,
            organisasjonsnummer: fields.orgNummer,
            telefonnummer: fields.orgTlfNr
          }
        }
      };

      const outbound = {
        ...outboundBase,
        ...outboundType,
        ...outboundExtend[hvemFra]
      };

      console.log(outbound);
      settLoading(true);
      postFullmakt(outbound)
        .then(() => {
          props.history.push(`${props.location.pathname}/takk`);
        })
        .catch((error: HTTPError) => {
          settError(`${error.code} - ${error.text}`);
        })
        .then(() => {
          settLoading(false);
        });
    }
  };

  return (
    <>
      <Header title="Fullmakt" />
      <div className="pagecontent">
        <Form onSubmit={send}>
          <Validation config={baseFormConfig}>
            {({ errors, fields, submitted, setField }) => {
              const hvemFra: ON_BEHALF_OF = fields.hvemFra;
              return (
                <>
                  <Tilbake
                    to={auth.authenticated ? "" : "/fullmakt/login"}
                  />
                  <Veilederpanel
                    svg={<img src={VeilederIcon} alt="Veileder" />}
                  >
                    Velg det alternativet som passer best.
                    <br />
                    Vi vil uansett sørge for at tilbakemeldingen kommer fram til
                    riktig person.
                  </Veilederpanel>
                  <div className="fullmakt__content">
                    <RadioPanelGruppe
                      legend={"Hva gjelder tilbakemeldingen?"}
                      radios={[
                        {
                          label: "Saksbehandling av søknad",
                          value: "SAKSBEHANDLING"
                        },
                        { label: "NAV-kontor", value: "NAV_KONTOR" },
                        { label: "Telefon", value: "TELEFON" },
                        { label: "nav.no", value: "NAVNO" },
                        { label: "Annet", value: "ANNET" }
                      ]}
                      name={"hva-gjelder-tilbakemeldingen"}
                      error={errors.klageType}
                      checked={fields.klageType}
                      onChange={v => setField({ klageType: v })}
                      submitted={submitted}
                    />
                    {fields.klageType === "SAKSBEHANDLING" && (
                      <Validation key="yt" config={ytelseTjenesteFormConfig}>
                        {() => (
                          <div className="fullmakt__ekspandert">
                            <InputField
                              label={"Ytelse eller tjeneste (valgfritt)"}
                              value={fields.ytelseTjeneste}
                              error={errors.ytelseTjeneste}
                              onChange={v => setField({ ytelseTjeneste: v })}
                              submitted={submitted}
                            />
                          </div>
                        )}
                      </Validation>
                    )}
                    <RadioPanelGruppe
                      legend={"Hvem skriver du på vegne av?"}
                      radios={[
                        {
                          label: "Meg selv som privatperson",
                          value: "PRIVATPERSON" as ON_BEHALF_OF
                        },
                        {
                          label: "På vegne av en annen privatperson",
                          value: "ANNEN_PERSON" as ON_BEHALF_OF
                        },
                        {
                          label: "På vegne av en bedrift",
                          value: "BEDRIFT" as ON_BEHALF_OF
                        }
                      ]}
                      name={"hvem-fra"}
                      error={errors.hvemFra}
                      checked={fields.hvemFra}
                      onChange={v => setField({ hvemFra: v })}
                      submitted={submitted}
                    />
                    {hvemFra && (
                      <div className="fullmakt__ekspandert">
                        {
                          {
                            PRIVATPERSON: (
                              <Validation
                                key={hvemFra}
                                config={privPersFormConfig}
                              >
                                {() => (
                                  <>
                                    <div className="flex__rad">
                                      <div className="flex__kolonne-left">
                                        <InputNavn
                                          submitted={submitted}
                                          value={fields.innmelderNavn}
                                          error={errors.innmelderNavn}
                                          onChange={v =>
                                            setField({ innmelderNavn: v })
                                          }
                                        />
                                      </div>
                                      <div className="flex__kolonne-right">
                                        <InputFodselsnr
                                          submitted={submitted}
                                          error={errors.innmelderFnr}
                                          value={fields.innmelderFnr}
                                          onChange={v =>
                                            setField({ innmelderFnr: v })
                                          }
                                        />
                                      </div>
                                    </div>
                                  </>
                                )}
                              </Validation>
                            ),
                            ANNEN_PERSON: (
                              <Validation
                                key={hvemFra}
                                config={annenPersFormConfig}
                              >
                                {() => (
                                  <div>
                                    <div>
                                      <div className="flex__rad">
                                        <div className="flex__kolonne-left">
                                          <InputNavn
                                            submitted={submitted}
                                            value={fields.innmelderNavn}
                                            error={errors.innmelderNavn}
                                            onChange={v =>
                                              setField({ innmelderNavn: v })
                                            }
                                          />
                                        </div>
                                        <div className="flex__kolonne-right">
                                          <InputField
                                            submitted={submitted}
                                            label={
                                              "Din rolle (nær pårørende, behandler e.l.)"
                                            }
                                            required={true}
                                            value={fields.innmelderRolle}
                                            error={errors.innmelderRolle}
                                            onChange={v =>
                                              setField({ innmelderRolle: v })
                                            }
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="divider" />
                                    <div className="flex__rad">
                                      <div className="flex__kolonne-left">
                                        <InputField
                                          label={"På vegne av"}
                                          submitted={submitted}
                                          value={fields.paaVegneAvNavn}
                                          error={errors.paaVegneAvNavn}
                                          onChange={v =>
                                            setField({ paaVegneAvNavn: v })
                                          }
                                        />
                                      </div>
                                      <div className="flex__kolonne-right">
                                        <InputField
                                          label={"Fødselsnummer"}
                                          submitted={submitted}
                                          value={fields.paaVegneAvFodselsnr}
                                          error={errors.paaVegneAvFodselsnr}
                                          onChange={v =>
                                            setField({ paaVegneAvFodselsnr: v })
                                          }
                                        />
                                      </div>
                                    </div>
                                    <RadioPanelGruppe
                                      legend={"Har du fullmakt?"}
                                      className="radioPanel__bool"
                                      radios={[
                                        {
                                          label: "Ja, jeg har fullmakt",
                                          value: "true"
                                        },
                                        {
                                          label: "Nei, jeg har ikke fullmakt",
                                          value: "false"
                                        }
                                      ]}
                                      name={"fullmakt"}
                                      submitted={submitted}
                                      checked={fields.innmelderHarFullmakt}
                                      error={errors.innmelderHarFullmakt}
                                      onChange={v =>
                                        setField({ innmelderHarFullmakt: v })
                                      }
                                    />
                                  </div>
                                )}
                              </Validation>
                            ),
                            BEDRIFT: (
                              <Validation
                                key={hvemFra}
                                config={bedriftFormConfig}
                              >
                                {() => (
                                  <>
                                    <div>
                                      <div className="flex__rad">
                                        <div className="flex__kolonne-left">
                                          <InputNavn
                                            submitted={submitted}
                                            value={fields.innmelderNavn}
                                            error={errors.innmelderNavn}
                                            onChange={v =>
                                              setField({ innmelderNavn: v })
                                            }
                                          />
                                        </div>
                                        <div className="flex__kolonne-right">
                                          <InputField
                                            label={
                                              "Din rolle (leder, HR-ansvarlig, tillitsvalgt osv.)"
                                            }
                                            submitted={submitted}
                                            value={fields.innmelderRolle}
                                            error={errors.innmelderRolle}
                                            onChange={v =>
                                              setField({ innmelderRolle: v })
                                            }
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="divider" />
                                    <div className="flex__rad">
                                      <div className="flex__kolonne-left ">
                                        <InputField
                                          label={"Organisasjonsnavn"}
                                          submitted={submitted}
                                          value={fields.orgNavn}
                                          error={errors.orgNavn}
                                          onChange={v =>
                                            setField({ orgNavn: v })
                                          }
                                        />
                                      </div>
                                      <div className="flex__kolonne-right">
                                        <InputField
                                          label={"Organisasjonsnummer"}
                                          submitted={submitted}
                                          value={fields.orgNummer}
                                          error={errors.orgNummer}
                                          onChange={v =>
                                            setField({ orgNummer: v })
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="flex__rad">
                                      <div className="flex__kolonne-left">
                                        <InputField
                                          label={"Bedriftens postadresse"}
                                          submitted={submitted}
                                          value={fields.orgPostadr}
                                          error={errors.orgPostadr}
                                          onChange={v =>
                                            setField({ orgPostadr: v })
                                          }
                                        />
                                      </div>
                                      <div className="flex__kolonne-right">
                                        <InputField
                                          label={"Bedriftens telefonnummer"}
                                          submitted={submitted}
                                          value={fields.orgTlfNr}
                                          error={errors.orgTlfNr}
                                          onChange={v =>
                                            setField({ orgTlfNr: v })
                                          }
                                        />
                                      </div>
                                    </div>
                                  </>
                                )}
                              </Validation>
                            )
                          }[hvemFra]
                        }
                      </div>
                    )}
                    <div className="fullmakt__melding">
                      <InputMelding
                        label={"Melding til NAV"}
                        submitted={submitted}
                        value={fields.melding}
                        error={errors.melding}
                        onChange={v => setField({ melding: v })}
                      />
                    </div>
                    <RadioPanelGruppe
                      legend={"Ønsker du at vi kontakter deg?"}
                      className="radioPanel__bool"
                      radios={[
                        {
                          label: "Ja, jeg ønsker å kontaktes",
                          value: "true"
                        },
                        {
                          label: "Nei, jeg ville bare si ifra",
                          value: "false"
                        }
                      ]}
                      name={"onsker-kontakt"}
                      submitted={submitted}
                      error={errors.onskerKontakt}
                      checked={fields.onskerKontakt}
                      onChange={v => setField({ onskerKontakt: v })}
                    />
                    {fields.onskerKontakt === "true" && (
                      <Validation key="kontakt" config={tlfFormConfig}>
                        {() => (
                          <div className="fullmakt__ekspandert">
                            <InputTelefon
                              value={fields.innmelderTlfnr}
                              error={errors.innmelderTlfnr}
                              onChange={v => setField({ innmelderTlfnr: v })}
                              submitted={submitted}
                            />
                          </div>
                        )}
                      </Validation>
                    )}
                    <div>
                      {error && (
                        <AlertStripeFeil>
                          Oi! Noe gikk galt: {error}
                        </AlertStripeFeil>
                      )}
                    </div>
                    <div className="tb__knapper">
                      <div className="tb__knapp">
                        <Hovedknapp disabled={loading}>
                          {loading ? <NavFrontendSpinner type={"S"} /> : "Send"}
                        </Hovedknapp>
                      </div>
                      <div className="tb__knapp">
                        <Link to={baseUrl}>
                          <Knapp>Tilbake</Knapp>
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              );
            }}
          </Validation>
        </Form>
      </div>
    </>
  );
};

export default withRouter(Fullmakt);
