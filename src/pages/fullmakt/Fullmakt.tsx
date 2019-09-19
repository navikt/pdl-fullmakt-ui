import React, { useState } from 'react';
import VeilederIcon from '../../assets/Veileder.svg';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Tilbake from '../../components/tilbake/Tilbake';
import { useStore } from '../../providers/Provider';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { baseUrl } from '../../App';
import { postFullmakt } from '../../clients/apiClient';
import InputField from '../../components/input-fields/InputField';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { HTTPError } from '../../components/error/Error';
import { FormContext, Form, Validation } from 'calidation';
import InputNavn from '../../components/input-fields/InputNavn';
import InputMelding from '../../components/input-fields/InputMelding';
import { ON_BEHALF_OF, OutboundFullmaktExtend } from '../../types/fullmakt';
import { annenPersFormConfig, baseFormConfig } from './config/form';
import Header from '../../components/header/Header';

export type OutboundFullmakt = OutboundFullmaktExtend;

const Fullmakt = (props: RouteComponentProps) => {
  document.title = 'Fullmakt service - www.nav.no';

  const [{ auth }] = useStore();
  const [loading, settLoading] = useState(false);
  const [error, settError] = useState();

  const send = (e: FormContext) => {
    const { isValid, fields } = e;
    const hvemFra: ON_BEHALF_OF = fields.hvemFra;

    if (isValid) {
      const outboundExtend: {
        [key in ON_BEHALF_OF]: OutboundFullmaktExtend;
      } = {
        ANNEN_PERSON: {
          paaVegneAv: 'ANNEN_PERSON',
          innmelder: {
            navn: fields.innmelderNavn,
            telefonnummer: fields.innmelderTlfnr,
            harFullmakt: fields.innmelderHarFullmakt === 'true' ? true : false,
            rolle: fields.innmelderRolle
          },
          paaVegneAvPerson: {
            navn: fields.paaVegneAvNavn,
            personnummer: fields.paaVegneAvFodselsnr
          }
        }
      };

      const outbound = {
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
              {
                console.log('fields ', JSON.stringify(fields));
              }
              {
                console.log('errors ', JSON.stringify(errors));
              }
              const hvemFra: ON_BEHALF_OF = fields.hvemFra;
              return (
                <>
                  <Tilbake to={auth.authenticated ? '' : '/fullmakt/login'} />
                  <Veilederpanel svg={<img src={VeilederIcon} alt="Veileder" />}>
                    Fullmakt
                    <br />
                    Lag/endre/vise fullmakt
                  </Veilederpanel>
                  <div className="fullmakt__content">
                    <div className="fullmakt__ekspandert">
                      <Validation key={hvemFra} config={annenPersFormConfig}>
                        {() => (
                          <div>
                            <div>
                              <div className="flex__rad">
                                <div className="flex__kolonne-left">
                                  <InputNavn
                                    submitted={submitted}
                                    value={fields.innmelderNavn}
                                    error={errors.innmelderNavn}
                                    onChange={v => setField({ innmelderNavn: v })}
                                  />
                                </div>
                                <div className="flex__kolonne-right">
                                  <InputField
                                    submitted={submitted}
                                    label={'Din rolle (nær pårørende, behandler e.l.)'}
                                    required={true}
                                    value={fields.innmelderRolle}
                                    error={errors.innmelderRolle}
                                    onChange={v => setField({ innmelderRolle: v })}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="divider" />
                            <div className="flex__rad">
                              <div className="flex__kolonne-left">
                                <InputField
                                  label={'På vegne av'}
                                  submitted={submitted}
                                  value={fields.paaVegneAvNavn}
                                  error={errors.paaVegneAvNavn}
                                  onChange={v => setField({ paaVegneAvNavn: v })}
                                />
                              </div>
                              <div className="flex__kolonne-right">
                                <InputField
                                  label={'Fødselsnummer'}
                                  submitted={submitted}
                                  value={fields.paaVegneAvFodselsnr}
                                  error={errors.paaVegneAvFodselsnr}
                                  onChange={v => setField({ paaVegneAvFodselsnr: v })}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </Validation>
                    </div>
                    <div className="fullmakt__melding">
                      <InputMelding
                        label={'Melding til NAV'}
                        submitted={submitted}
                        value={fields.melding}
                        error={errors.melding}
                        onChange={v => setField({ melding: v })}
                      />
                    </div>
                    <div>
                      {error && (
                        <AlertStripeFeil>Oi! Noe gikk galt: {error}</AlertStripeFeil>
                      )}
                    </div>
                    <div className="tb__knapper">
                      <div className="tb__knapp">
                        <Hovedknapp disabled={loading}>
                          {loading ? <NavFrontendSpinner type={'S'} /> : 'Send'}
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
