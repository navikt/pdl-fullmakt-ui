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
import { FullmaktPostType, FullmaktSendType, FullmaktType } from '../../types/fullmakt';
import { fullmaktFormConfig } from './config/form';
import Box from '../../components/box/Box';
import DayPicker from '../../components/felter/day-picker/DayPicker';
import Felt from '../../components/felter/input-med-hjelpetekst/InputMedHjelpetekst';
import { Radio, Checkbox, SkjemaGruppe } from 'nav-frontend-skjema';
import { HjelpetekstHoyre } from 'nav-frontend-hjelpetekst';
import {
  addSubString,
  findSubString,
  formatNavn,
  removeSubString
} from '../../utils/utils';
import { fullmaktSkjemaURL } from '../../utils/konstanter';
import { Element } from 'nav-frontend-typografi';
import InfoModal from '../../components/Knapper/infoModal/InfoModal';
import moment from 'moment';

const nowDateFullmakt: string = moment(moment().toISOString()).format('YYYY-MM-DD');

const Fullmakt = () => {
  document.title = 'Fullmakt service - www.nav.no';
  const { fullmaktId } = useParams();
  const history = useHistory();
  const location = useLocation();

  const [{ auth, fullmatsgiver, fodselsnr, omraade }, dispatch] = useStore();
  const [loading, settLoading] = useState(false);
  const [error] = useState();
  const [showHide, setShowHide] = useState(false);
  const fullmaktsgiverNavn =
    auth.status === 'RESULT' && auth.data.authenticated ? auth.data.name : '';

  const fullmaktData =
    fullmatsgiver &&
    fullmatsgiver.status === 'RESULT' &&
    fullmatsgiver.data &&
    fullmatsgiver.data.filter(d => d.fullmaktId === Number(fullmaktId)).shift();

  const initialValues = fullmaktData
    ? {
        fullmektigsNavn: fullmaktData.fullmektigsNavn || 'Default navn ',
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
    // setShowHide(true);
    if (
      isValid &&
      fodselsnr &&
      fullmaktsgiverNavn &&
      fields.gyldigFraOgMed &&
      fields.gyldigTilOgMed &&
      fields.gyldigFraOgMed <= fields.gyldigTilOgMed &&
      fields.gyldigFraOgMed >= nowDateFullmakt &&
      fields.gyldigTilOgMed >= nowDateFullmakt
    ) {
      const fullmaktPageData: FullmaktPostType = {
        fullmaktsgiverNavn: fullmaktsgiverNavn,
        fullmektigsNavn: fields.fullmektigsNavn || 'Default navn',
        fullmektig: fields.fullmektigFodselsnr,
        omraade: fields.omraade,
        gyldigFraOgMed: fields.gyldigFraOgMed,
        gyldigTilOgMed: fields.gyldigTilOgMed
      };

      const sendData: FullmaktSendType = fullmaktId
        ? {
            fullmaktId: Number(fullmaktId),
            ...fullmaktPageData
          }
        : {
            ...fullmaktPageData
          };
      console.log('Data to send = ', JSON.stringify(sendData));
      settLoading(true);
      postFullmakt(sendData, !!fullmaktId)
        .then((response: any) => {
          fetchFullmaktsgiver()
            .then((fullmaktsgiver: FullmaktType[]) => {
              dispatch({
                type: 'SETT_FULLMAKTSGIVER',
                payload: fullmaktsgiver
              });
              setShowHide(true);
            })
            .catch((error: HTTPError) => {
              dispatch({ type: 'SETT_FULLMAKTSGIVER_ERROR', payload: error });
            });
          !fullmaktId &&
            history.push(`${location.pathname}/${response && response.fullmaktId}`);
        })
        /*.catch((error: HTTPError) => {
          settError(`${error.text} (${error.code})`);
        })*/
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
            initialValues={initialValues}
          >
            {({ errors, fields, submitted, setField, setError }) => {
              // console.log('fields ', JSON.stringify(fields));
              // console.log('errors ', JSON.stringify(errors));
              // console.log('fullmakt ', JSON.stringify(fullmaktData));
              // console.log('omraade ', JSON.stringify(omraade));
              return (
                <>
                  <Tilbake to={''} />
                  <Veilederpanel svg={<img src={VeilederIcon} alt='Veileder' />}>
                    Her kan du opprette en ny fullmakt. Du kan også se{' '}
                    <Link
                      to={`${baseUrl}${
                        auth.status === 'RESULT' && auth.data.authenticated
                          ? ''
                          : '/fullmakt/login'
                      }`}
                      className='lenke'
                    >
                      oversikt over fullmaktene dine,
                    </Link>{' '}
                    eller{' '}
                    <a className='lenke' href={fullmaktSkjemaURL}>
                      lese mer om fullmakt.
                    </a>
                  </Veilederpanel>
                  <Box
                    id='fullmaktFrontPage'
                    tittel={fullmaktId ? 'Endre fullmakt' : 'Ny fullmakt'}
                    beskrivelse=''
                    icon={FullmaktIcon}
                  >
                    <div className='fullmakt__content'>
                      <div className='fullmakt__ekspandert'>
                        <div>
                          <div className='flex__rad'>{`Jeg, ${formatNavn(
                            fullmaktsgiverNavn
                          )}, ønsker å gi fullmakt til:`}</div>
                          <br />
                          <div style={{ marginBottom: '10px' }}>
                            <div className='flex__rad'>
                              <div className='flex__kolonne-left'>
                                <Felt
                                  label={'Navn'}
                                  submitted={submitted}
                                  value={fields.fullmektigsNavn}
                                  error={errors.fullmektigsNavn}
                                  onChange={v => setField({ fullmektigsNavn: v })}
                                  disabled={!!fullmaktId}
                                  placeholder='Fornavn Etternavn'
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
                          </div>
                          <div style={{ marginBottom: '20px' }}>
                            <SkjemaGruppe
                              feil={
                                submitted && errors.omraade
                                  ? { feilmelding: errors.omraade }
                                  : undefined
                              }
                            >
                              <div>
                                <div className='ekf__header'>
                                  <div className='skjemaelement__label'>
                                    <div>Fullmakten gjelder:</div>
                                  </div>
                                  <HjelpetekstHoyre
                                    tittel={''}
                                    id={'hjelpetekst'}
                                    type='auto'
                                  >
                                    Velg om fullmakten skal gjelde for alle eller bare
                                    noen områder. Et område er for eksempel dagpenger
                                    eller foreldrepenger.
                                  </HjelpetekstHoyre>
                                </div>
                                <div style={{ paddingLeft: '10px' }}>
                                  <Radio
                                    label='Alle områder'
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
                                    label='Avgrenset til bestemte områder'
                                    name={'NAV_BEGRENSET_OMRAADE'}
                                    checked={
                                      fields.hvemOmraade === 'NAV_BEGRENSET_OMRAADE'
                                    }
                                    onChange={() =>
                                      setField({
                                        hvemOmraade: 'NAV_BEGRENSET_OMRAADE',
                                        omraade: ''
                                      })
                                    }
                                  />
                                  <div style={{ paddingLeft: '30px' }}>
                                    {fields.hvemOmraade === 'NAV_BEGRENSET_OMRAADE' &&
                                      omraade &&
                                      omraade.status === 'RESULT' &&
                                      omraade.data.map(group => (
                                        <div key={group.kode}>
                                          <div>
                                            <Element className='skjemaelement__label'>
                                              {group.termer.no}
                                            </Element>
                                          </div>
                                          <div className={'fullmakt__checkbox'}>
                                            {group.undernoder.map(n => (
                                              <Checkbox
                                                className={'fullmakt__checkbox-width'}
                                                key={n.kode}
                                                label={n.termer.no}
                                                checked={findSubString(
                                                  n.kode,
                                                  fields.omraade
                                                )}
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
                                </div>
                              </div>
                            </SkjemaGruppe>
                          </div>
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
                        {submitted &&
                          fields.gyldigFraOgMed &&
                          fields.gyldigTilOgMed &&
                          fields.gyldigFraOgMed > fields.gyldigTilOgMed && (
                            <AlertStripeFeil>
                              Fra-dato kan ikke være før Til-dato.
                            </AlertStripeFeil>
                          )}
                        {submitted &&
                          fields.gyldigFraOgMed &&
                          fields.gyldigTilOgMed &&
                          (fields.gyldigFraOgMed < nowDateFullmakt ||
                            fields.gyldigTilOgMed < nowDateFullmakt) && (
                            <AlertStripeFeil>
                              Dato kan ikke være tilbake i tid.
                            </AlertStripeFeil>
                          )}
                        {error && (
                          <AlertStripeFeil>Noe gikk galt: {error}</AlertStripeFeil>
                        )}
                        {fullmatsgiver && fullmatsgiver.status === 'ERROR' && (
                          <AlertStripeFeil>
                            Noe gikk galt:{' '}
                            {`${fullmatsgiver.error.text} (${fullmatsgiver.error.code})`}
                          </AlertStripeFeil>
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
                        <InfoModal
                          showHide={showHide}
                          setShowHide={setShowHide}
                          message={
                            <div>
                              <p>
                                Fullmakten er lagret. Personen du har gitt fullmakt til
                                kan nå snakke med NAV på dine vegne og hjelpe deg i
                                kontakten din med NAV. Du kan når som helst endre eller
                                stoppe fullmakten.
                              </p>
                              <p>
                                <Link
                                  to={`${baseUrl}${
                                    auth.status === 'RESULT' && auth.data.authenticated
                                      ? ''
                                      : '/fullmakt/login'
                                  }`}
                                  className='lenke'
                                >
                                  Se oversikt over fullmaktene dine
                                </Link>{' '}
                                og{' '}
                                <a className='lenke' href={fullmaktSkjemaURL}>
                                  les mer om fullmakt
                                </a>
                              </p>
                            </div>
                          }
                        />
                      </div>
                      <div className='navigasjonLess'>
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
                              'Lagre fullmakt'
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
