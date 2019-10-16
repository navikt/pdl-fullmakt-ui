import React, { useState } from 'react';
import VeilederIcon from '../../assets/Veileder.svg';
import FullmaktIcon from '../../assets/Fullmakt.svg';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Tilbake from '../../components/tilbake/Tilbake';
import { useStore } from '../../providers/Provider';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { baseUrl } from '../../App';
import { fetchFullmaktsgiver, postFullmakt } from '../../clients/apiClient';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { HTTPError } from '../../components/error/Error';
import { FormContext, FormValidation } from 'calidation';
import { FullmaktPageType, FullmaktSendType, FullmaktType } from '../../types/fullmakt';
import { fullmaktFormConfig } from './config/form';
import Box from '../../components/box/Box';
import DayPicker from '../../components/felter/day-picker/DayPicker';
import Felt from '../../components/felter/input-med-hjelpetekst/InputMedHjelpetekst';
import SelectOmraade from '../../components/felter/omraade/SelectOmraade';
import { nowDateFullmakt } from '../../components/felter/day-picker/utils';

interface Routes {
  fullmaktId: string;
}
const Fullmakt = (props: FullmaktType & RouteComponentProps<Routes>) => {
  document.title = 'Fullmakt service - www.nav.no';

  const { fullmaktId } = props.match.params;

  const [{ auth, fullmatsgiver }, dispatch] = useStore();
  const [loading, settLoading] = useState(false);
  const [error, settError] = useState();

  const fullmaktData =
    fullmatsgiver &&
    fullmatsgiver.status === 'RESULT' &&
    fullmatsgiver.data &&
    fullmatsgiver.data.filter(d => d.fullmaktId === Number(fullmaktId)).shift();

  const initialValues = fullmaktData
    ? {
        fullmektigNavn: fullmaktData.fullmektigNavn || 'Default navn ',
        fullmektigFodselsnr: fullmaktData.fullmektig || '',
        omraade: fullmaktData.omraade,
        gyldigFraOgMed: fullmaktData.gyldigFraOgMed || '',
        gyldigTilOgMed: fullmaktData.gyldigTilOgMed || '',
        registrert: fullmaktData.registrert || '',
        registrertAv: fullmaktData.registrertAv || '',
        endret: fullmaktData.endret || '',
        endretAv: fullmaktData.endretAv || ''
      }
    : {};

  const send = (e: FormContext) => {
    const { isValid, fields } = e;

    if (isValid) {
      const fullmaktData: FullmaktPageType = {
        fullmaktsgiverNavn:
          auth.status === 'RESULT' && auth.data.authenticated ? auth.data.name : '',
        fullmaktsgiver:
          auth.status === 'RESULT' && auth.data.authenticated
            ? auth.data.fodselsnr || '12345678901'
            : '',
        fullmektigNavn: fields.fullmektigNavn || 'Default navn',
        fullmektig: fields.fullmektigFodselsnr,
        omraade: fields.omraade,
        gyldigFraOgMed: fields.gyldigFraOgMed,
        gyldigTilOgMed: fields.gyldigTilOgMed
      };

      const sendData: FullmaktSendType = fullmaktId
        ? {
            fullmaktId: Number(fullmaktId),
            registrert: fields.registrert,
            registrertAv: fields.registrertAv,
            endret: nowDateFullmakt,
            endretAv: fullmaktData.fullmaktsgiver,
            ...fullmaktData
          }
        : {
            registrert: nowDateFullmakt,
            registrertAv: fullmaktData.fullmaktsgiver,
            ...fullmaktData
          };
      console.log('Data to send = ', JSON.stringify(sendData));
      settLoading(true);
      postFullmakt(sendData, !!fullmaktId)
        .then((response: any) => {
          fetchFullmaktsgiver('12345678901')
            .then((fullmaktsgiver: FullmaktType[]) =>
              dispatch({
                type: 'SETT_FULLMAKTSGIVER',
                payload: fullmaktsgiver
              })
            )
            .catch((error: HTTPError) => {
              dispatch({ type: 'SETT_FULLMAKTSGIVER_ERROR', payload: error });
            });
          !fullmaktId &&
            props.history.push(
              `${props.location.pathname}/${response && response.fullmaktId}`
            );
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
      <div className="pagecontent">
        {(fullmaktData || !fullmaktId) && (
          <FormValidation
            onSubmit={send}
            config={fullmaktFormConfig}
            initialValues={initialValues}
          >
            {({ errors, fields, submitted, setField, setError }) => {
              console.log('fields ', JSON.stringify(fields));
              console.log('errors ', JSON.stringify(errors));
              // console.log('fullmakt ', JSON.stringify(fullmaktData));
              //  console.log('auth ', JSON.stringify(auth));
              return (
                <>
                  <Tilbake to={''} />
                  <Veilederpanel svg={<img src={VeilederIcon} alt="Veileder" />}>
                    Se oversikt over dine fullmakter{' '}
                    <Link
                      to={`${baseUrl}${
                        auth.status === 'RESULT' && auth.data.authenticated
                          ? ''
                          : '/fullmakt/login'
                      }`}
                      className="lenke"
                    >
                      her
                    </Link>
                    . Les mer om fullmakt og innsyn{' '}
                    <a
                      className="lenke"
                      href="https://www.nav.no/no/NAV+og+samfunn/Samarbeid/Leger+og+andre+behandlere/annen-behandler/fullmakt-og-innsyn"
                    >
                      her.
                    </a>
                  </Veilederpanel>
                  <Box
                    id="fullmaktFrontPage"
                    tittel="Fullmakt"
                    beskrivelse=""
                    icon={FullmaktIcon}
                  >
                    <div className="fullmakt__content">
                      <div className="fullmakt__ekspandert">
                        <div>
                          <div className="flex__rad">Jeg ønsker å gi fullmakt til</div>
                          <br />
                          <div className="flex__rad">
                            <div className="flex__kolonne-left">
                              <Felt
                                label={'Navn'}
                                submitted={submitted}
                                value={fields.fullmektigNavn}
                                error={errors.fullmektigNavn}
                                onChange={v => setField({ fullmektigNavn: v })}
                                disabled={!!fullmaktId}
                              />
                            </div>
                            <div className="flex__kolonne-right">
                              <Felt
                                label={'Fødselsnummer (11 siffer)'}
                                submitted={submitted}
                                value={fields.fullmektigFodselsnr}
                                error={errors.fullmektigFodselsnr}
                                onChange={v => setField({ fullmektigFodselsnr: v })}
                                disabled={!!fullmaktId}
                              />
                            </div>
                          </div>

                          <div className="flex__rad">
                            <div className="flex__kolonne-left">
                              <SelectOmraade
                                label={'Fullmakten gjelder'}
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
                                label={'Fullmakten gjelder fra og med '}
                                submitted={submitted}
                                error={errors.gyldigFraOgMed}
                                onChange={value => setField({ gyldigFraOgMed: value })}
                                onErrors={error => setError({ gyldigFraOgMed: error })}
                              />
                            </div>
                            <div className="flex__kolonne-right">
                              <DayPicker
                                value={fields.gyldigTilOgMed}
                                label={'Fullmakten gjelder til og med   '}
                                submitted={submitted}
                                error={errors.gyldigTilOgMed}
                                onChange={value => setField({ gyldigTilOgMed: value })}
                                onErrors={error => setError({ gyldigTilOgMed: error })}
                              />
                            </div>
                          </div>
                        </div>
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
          </FormValidation>
        )}
      </div>
    </>
  );
};

export default withRouter(Fullmakt);
