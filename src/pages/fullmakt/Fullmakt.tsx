import React, { useState } from 'react';
import VeilederIcon from '../../assets/Veileder.svg';
import FullmaktIcon from '../../assets/Fullmakt.svg';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Tilbake from '../../components/tilbake/Tilbake';
import { useStore } from '../../providers/Provider';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { baseUrl } from '../../App';
import { postFullmakt } from '../../clients/apiClient';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { HTTPError } from '../../components/error/Error';
import { FormContext, Form, Validation } from 'calidation';
import { FullmaktType, FullmaktViewType } from '../../types/fullmakt';
import { fullmaktFormConfig, baseFormConfig } from './config/form';
import Header from '../../components/header/Header';
import Box from '../../components/box/Box';
import DayPicker from '../../components/felter/day-picker/DayPicker';
import EndreKontonummerFelt from '../../components/felter/input-med-hjelpetekst/InputMedHjelpetekst';

interface Routes {
  fullmaktId: string;
}
const Fullmakt = (props: FullmaktType & RouteComponentProps<Routes>) => {
  document.title = 'Fullmakt service - www.nav.no';

  const { fullmaktId } = props.match.params;

  const [{ auth, fullmatsgiver }] = useStore();
  const [loading, settLoading] = useState(false);
  const [error, settError] = useState();
  const fullmakt =
    fullmatsgiver &&
    fullmatsgiver.status === 'RESULT' &&
    fullmatsgiver.data &&
    fullmatsgiver.data.filter(d => d.fullmaktId === Number(fullmaktId)).shift();
  const initialValues = {
    omraade: (fullmaktId && fullmakt && fullmakt.omraade && fullmakt.omraade) || ''
  };

  const send = (e: FormContext) => {
    const { isValid, fields } = e;

    if (isValid) {
      const fullmaktData: FullmaktViewType = {
        fullmaktsgiverNavn: auth.authenticated ? auth.name : '',
        fullmaktsgiverFodselsnr: auth.authenticated ? auth.fodselsnr : '',
        fullmektigNavn: fields.fullmektigNavn,
        fullmektigFodselsnr: fields.fullmektigFodselsnr,
        omraade: fields.omraade,
        gyldigFraOgMed: fields.gyldigFraOgMed,
        gyldigTilOgMed: fields.gyldigTilOgMed
      };

      settLoading(true);
      postFullmakt(fullmaktData)
        .then(() => {
          props.history.push(`${props.location.pathname}/pdl-fullmakt-ui`);
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
          <Validation config={baseFormConfig} initialValues={initialValues}>
            {({ errors, fields, submitted, setField, setError }) => {
              console.log('fields ', JSON.stringify(fields));
              console.log('errors ', JSON.stringify(errors));
              return (
                <>
                  <Tilbake to={auth.authenticated ? '' : '/fullmakt/login'} />
                  <Veilederpanel svg={<img src={VeilederIcon} alt="Veileder" />}>
                    Fullmakt
                    <br />
                    Legge til/endre/vise fullmakt
                  </Veilederpanel>
                  <Box
                    id="fullmaktFrontPage"
                    tittel="NAV Fullmakter"
                    beskrivelse=""
                    icon={FullmaktIcon}
                  >
                    <div className="fullmakt__content">
                      <div className="fullmakt__ekspandert">
                        <Validation key="fullmakt" config={fullmaktFormConfig}>
                          {() => (
                            <div>
                              <div>
                                <div className="flex__rad mellomrom">
                                  <div className="flex__kolonne-left">
                                    <EndreKontonummerFelt
                                      disabled={true}
                                      value={auth.authenticated ? auth.name : ''}
                                      label={'Fullmaktsgivers navn'}
                                      submitted={false}
                                      onChange={e => e}
                                      error={''}
                                    />
                                  </div>
                                  <div className="flex__kolonne-right">
                                    <EndreKontonummerFelt
                                      disabled={true}
                                      value={auth.authenticated ? auth.fodselsnr : ''}
                                      label={'Fullmaktsgivers fødselsnummer'}
                                      submitted={false}
                                      onChange={e => e}
                                      error={''}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="divider" />
                              <div className="flex__rad">
                                <div className="flex__kolonne-left">
                                  <EndreKontonummerFelt
                                    label={'Fullmektigens navn'}
                                    submitted={submitted}
                                    value={fields.fullmektigNavn}
                                    error={errors.fullmektigNavn}
                                    onChange={v => setField({ fullmektigNavn: v })}
                                  />
                                </div>
                                <div className="flex__kolonne-right">
                                  <EndreKontonummerFelt
                                    label={'Fullmektigens fødselsnummer'}
                                    submitted={submitted}
                                    value={fields.fullmektigFodselsnr}
                                    error={errors.fullmektigFodselsnr}
                                    onChange={v => setField({ fullmektigFodselsnr: v })}
                                  />
                                </div>
                              </div>

                              <div className="flex__rad">
                                <div className="flex__kolonne-left">
                                  <EndreKontonummerFelt
                                    label={'Område'}
                                    submitted={submitted}
                                    value={fields.omraade}
                                    error={errors.omraade}
                                    onChange={v => setField({ omraade: v })}
                                    hjelpetekst={'NAV områder for fullmakt.'}
                                  />
                                </div>
                              </div>
                              <div className="flex__rad">
                                <div className="flex__kolonne-left">
                                  <DayPicker
                                    value={fields.gyldigFraOgMed}
                                    label={'Gyldig fra og med dato? (dd.mm.åååå)'}
                                    submitted={submitted}
                                    error={errors.gyldigFraOgMed}
                                    onChange={value =>
                                      setField({ gyldigFraOgMed: value })
                                    }
                                    onErrors={error =>
                                      setError({ gyldigFraOgMed: error })
                                    }
                                  />
                                </div>
                                <div className="flex__kolonne-right">
                                  <DayPicker
                                    value={fields.gyldigTilOgMed}
                                    label={'Gyldig til og med dato? (dd.mm.åååå)'}
                                    submitted={submitted}
                                    error={errors.gyldigTilOgMed}
                                    onChange={value =>
                                      setField({ gyldigTilOgMed: value })
                                    }
                                    onErrors={error =>
                                      setError({ gyldigTilOgMed: error })
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </Validation>
                      </div>
                      <div>
                        {error && (
                          <AlertStripeFeil>Oi! Noe gikk galt: {error}</AlertStripeFeil>
                        )}
                      </div>
                      <div className="navigasjon">
                        <div className="tb__knapp">
                          <Link to={baseUrl}>
                            <Knapp>Tilbake</Knapp>
                          </Link>
                        </div>
                        <div className="tb__knapp">
                          <Hovedknapp disabled={loading}>
                            {loading ? (
                              <NavFrontendSpinner type={'S'} />
                            ) : (
                              'Lagre og avslutt'
                            )}
                          </Hovedknapp>
                        </div>
                      </div>
                    </div>
                  </Box>
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
