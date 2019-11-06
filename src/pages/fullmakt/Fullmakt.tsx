import React, { useState } from 'react';
import VeilederIcon from '../../assets/Veileder.svg';
import FullmaktIcon from '../../assets/Fullmakt.svg';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Tilbake from '../../components/tilbake/Tilbake';
import { useStore } from '../../providers/Provider';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Link, useHistory, useParams, useLocation } from 'react-router-dom';
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
import { nowDateFullmakt } from '../../components/felter/day-picker/utils';
import { Radio, Checkbox, SkjemaGruppe } from 'nav-frontend-skjema';
import { HjelpetekstHoyre } from 'nav-frontend-hjelpetekst';
import { addSubString, findSubString, removeSubString } from '../../utils/utils';
import { fullmaktSkjemaURL } from '../../utils/konstanter';

const Fullmakt = () => {
  document.title = 'Fullmakt service - www.nav.no';
  const { fullmaktId } = useParams();
  const history = useHistory();
  const location = useLocation();

  const [{ auth, fullmatsgiver, fodselsnr, omraade }, dispatch] = useStore();
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
        hvemOmraade:
          fullmaktData.omraade === '*' ? 'NAV_ALL_OMRAADE' : 'NAV_BEGRENSET_OMRAADE'
      }
    : {};

  const send = (e: FormContext) => {
    const { isValid, fields } = e;

    if (
      isValid &&
      fodselsnr &&
      auth.status === 'RESULT' &&
      auth.data.authenticated &&
      auth.data.name
    ) {
      const fullmaktPageData: FullmaktPageType = {
        fullmaktsgiverNavn: auth.data.name,
        fullmaktsgiver: fodselsnr,
        fullmektigNavn: fields.fullmektigNavn || 'Default navn',
        fullmektig: fields.fullmektigFodselsnr,
        omraade: fields.omraade,
        gyldigFraOgMed: fields.gyldigFraOgMed,
        gyldigTilOgMed: fields.gyldigTilOgMed
      };

      const sendData: FullmaktSendType = fullmaktId
        ? {
            fullmaktId: Number(fullmaktId),
            registrert: (fullmaktData && fullmaktData.registrert) || '',
            registrertAv: (fullmaktData && fullmaktData.registrertAv) || '',
            endret: nowDateFullmakt,
            endretAv: fodselsnr,
            ...fullmaktPageData
          }
        : {
            registrert: nowDateFullmakt,
            registrertAv: fodselsnr,
            ...fullmaktPageData
          };
      console.log('Data to send = ', JSON.stringify(sendData));
      settLoading(true);
      postFullmakt(sendData, !!fullmaktId)
        .then((response: any) => {
          fetchFullmaktsgiver(fodselsnr)
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
            history.push(`${location.pathname}/${response && response.fullmaktId}`);
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
      <div className='pagecontent'>
        {(fullmaktData || !fullmaktId) && (
          <FormValidation
            onSubmit={send}
            config={fullmaktFormConfig}
            initialValues={initialValues}>
            {({ errors, fields, submitted, setField, setError }) => {
              console.log('fields ', JSON.stringify(fields));
              console.log('errors ', JSON.stringify(errors));
              // console.log('fullmakt ', JSON.stringify(fullmaktData));
              console.log('omraade ', JSON.stringify(omraade));
              return (
                <>
                  <Tilbake to={''} />
                  <Veilederpanel svg={<img src={VeilederIcon} alt='Veileder' />}>
                    Se oversikt over dine fullmakter{' '}
                    <Link
                      to={`${baseUrl}${
                        auth.status === 'RESULT' && auth.data.authenticated
                          ? ''
                          : '/fullmakt/login'
                      }`}
                      className='lenke'>
                      her
                    </Link>
                    . Les mer om fullmakt og innsyn{' '}
                    <a className='lenke' href={fullmaktSkjemaURL}>
                      her.
                    </a>
                  </Veilederpanel>
                  <Box
                    id='fullmaktFrontPage'
                    tittel='Fullmakt'
                    beskrivelse=''
                    icon={FullmaktIcon}>
                    <div className='fullmakt__content'>
                      <div className='fullmakt__ekspandert'>
                        <div>
                          <div className='flex__rad'>Jeg ønsker å gi fullmakt til</div>
                          <br />
                          <div className='flex__rad'>
                            <div className='flex__kolonne-left'>
                              <Felt
                                label={'Navn'}
                                submitted={submitted}
                                value={fields.fullmektigNavn}
                                error={errors.fullmektigNavn}
                                onChange={v => setField({ fullmektigNavn: v })}
                                disabled={!!fullmaktId}
                                placeholder='Fornavn Etternavn'
                                hjelpetekst={
                                  'Folkeregistrert navn (slik det står i pass, førerkort etc).'
                                }
                              />
                            </div>
                            <div className='flex__kolonne-right'>
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
                          <SkjemaGruppe
                            feil={
                              submitted && errors.omraade
                                ? { feilmelding: errors.omraade }
                                : undefined
                            }>
                            <div>
                              <div className='ekf__header'>
                                <div className='skjemaelement__label'>
                                  <div>Fullmakten gjelder</div>
                                </div>
                                <HjelpetekstHoyre
                                  tittel={''}
                                  id={'hjelpetekst'}
                                  type='auto'>
                                  NAV områder for fullmakt.
                                </HjelpetekstHoyre>
                              </div>
                              <Radio
                                label='All informasjon'
                                name={'NAV_ALL_OMRAADE'}
                                checked={fields.hvemOmraade === 'NAV_ALL_OMRAADE'}
                                onChange={() =>
                                  setField({
                                    hvemOmraade: 'NAV_ALL_OMRAADE',
                                    omraade: '*'
                                  })
                                }
                              />
                              <Radio
                                label='Begrenset'
                                name={'NAV_BEGRENSET_OMRAADE'}
                                checked={fields.hvemOmraade === 'NAV_BEGRENSET_OMRAADE'}
                                onChange={() =>
                                  setField({
                                    hvemOmraade: 'NAV_BEGRENSET_OMRAADE',
                                    omraade: ''
                                  })
                                }
                              />
                              {fields.hvemOmraade === 'NAV_BEGRENSET_OMRAADE' &&
                                omraade &&
                                omraade.status === 'RESULT' &&
                                omraade.data.map(group => (
                                  <div key={group.kode}>
                                    <u>
                                      <div className='skjemaelement__label'>
                                        {group.termer.no + ' :'}
                                      </div>
                                    </u>
                                    <div className={'fullmakt__checkbox'}>
                                      {group.undernoder.map(n => (
                                        <Checkbox
                                          className={'fullmakt__checkbox-width'}
                                          key={n.kode}
                                          label={n.termer.no}
                                          checked={findSubString(n.kode, fields.omraade)}
                                          value={n.kode}
                                          onChange={e =>
                                            setField({
                                              omraade: e.target.checked
                                                ? addSubString(
                                                    e.target.value,
                                                    fields.omraade
                                                  )
                                                : removeSubString(
                                                    e.target.value,
                                                    fields.omraade
                                                  )
                                            })
                                          }
                                        />
                                      ))}
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </SkjemaGruppe>
                          <div className='flex__rad'>
                            <div className='flex__kolonne-left'>
                              <DayPicker
                                value={fields.gyldigFraOgMed}
                                label={'Fullmakten gjelder fra og med '}
                                submitted={submitted}
                                error={errors.gyldigFraOgMed}
                                onChange={value => setField({ gyldigFraOgMed: value })}
                                onErrors={error => setError({ gyldigFraOgMed: error })}
                              />
                            </div>
                            <div className='flex__kolonne-right'>
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
                        {submitted && errors && (
                          <div>
                            {submitted &&
                              errors &&
                              Object.values(errors).map((o: any, i) =>
                                o ? <AlertStripeFeil key={i}>{o} </AlertStripeFeil> : ''
                              )}
                          </div>
                        )}
                      </div>
                      <div className='navigasjon'>
                        <div className='tb__knapp'>
                          <Link to={baseUrl}>
                            <Knapp>Tilbake</Knapp>
                          </Link>
                        </div>
                        <div className='tb__knapp'>
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

export default Fullmakt;
