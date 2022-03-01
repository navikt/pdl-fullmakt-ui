import React, { useState, useEffect } from 'react';
import VeilederIcon from '../../assets/Veileder.svg';
import FullmaktIcon from '../../assets/Fullmakt.svg';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { useStore } from '../../providers/Provider';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Link, useHistory, useParams, useLocation } from 'react-router-dom';
import { baseUrl } from '../../App';
import { fetchFullmaktsgiver, postFullmakt } from '../../clients/apiClient';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { HTTPError } from '../../components/error/Error';
import { FullmaktPostType, FullmaktSendType, FullmaktType } from '../../types/fullmakt';
import Box from '../../components/box/Box';
import DayPicker from '../../components/felter/day-picker/DayPicker';
import Felt from '../../components/felter/input-med-hjelpetekst/InputMedHjelpetekst';
import { Radio, Checkbox } from 'nav-frontend-skjema';
import Hjelpetekst from '../../components/hjelpetekst/Hjelpetekst';
import { validationSchema } from './config/form';
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
import { dateOneYearAhead, formatDate } from '../../components/felter/day-picker/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

const nowDateFullmakt: string = moment(moment().toISOString()).format('YYYY-MM-DD');
const dateOneYearAheadCompare: string = formatDate(dateOneYearAhead, 'YYYY-MM-DD', 'nb');

const Fullmakt = () => {
  document.title = 'Fullmakt service - www.nav.no';
  const { fullmaktId } = useParams<{ fullmaktId: string }>();
  const history = useHistory();
  const location = useLocation();

  const [{ auth, fullmatsgiver, fodselsnr, omraade }, dispatch] = useStore();
  const [loading, settLoading] = useState(false);
  const [error, settError] = useState('');
  const [showHide, setShowHide] = useState(false);

  const fullmaktsgiverNavn =
    auth.status === 'RESULT' && auth.data.authenticated ? auth.data.name : '';

  const fullmaktData =
    fullmatsgiver &&
    fullmatsgiver.status === 'RESULT' &&
    fullmatsgiver.data &&
    fullmatsgiver.data.filter((d) => d.fullmaktId === Number(fullmaktId)).shift();

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { control, handleSubmit, formState, reset, setValue, clearErrors, setError } =
    useForm(formOptions);
  const { errors, isSubmitted } = formState;

  const [hvemOmraade, setHvemOmraade] = useState('');
  const [selectableOmraade, setSelectableOmraade] = useState('');
  const [gyldigFraOgMed, setGyldigFraOgMed] = useState('');
  const [gyldigTilOgMed, setGyldigTilOgMed] = useState('');

  useEffect(() => {
    if (fullmaktData) {
      reset({
        fullmektigsNavn: fullmaktData.fullmektigsNavn || 'Default navn ',
        fullmektigFodselsnr: fullmaktData.fullmektig || '',
        gyldigFraOgMed: fullmaktData.gyldigFraOgMed || '',
        gyldigTilOgMed: fullmaktData.gyldigTilOgMed || ''
      });
      setSelectableOmraade(fullmaktData.omraade);
      setHvemOmraade(
        fullmaktData.omraade === '*' ? 'NAV_ALL_OMRAADE' : 'NAV_BEGRENSET_OMRAADE'
      );
      setGyldigFraOgMed(fullmaktData.gyldigFraOgMed || '');
      setGyldigTilOgMed(fullmaktData.gyldigTilOgMed || '');
      setValue('omraade', true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullmaktData, reset]);

  const changeAlleOmraade = () => {
    setHvemOmraade('NAV_ALL_OMRAADE');
    setSelectableOmraade('*');
  };
  const changeBegrensetOmraade = () => {
    setHvemOmraade('NAV_BEGRENSET_OMRAADE');
    setSelectableOmraade('');
  };
  const changeOmraadeCheckbox = (e: { target: { checked: any; value: string } }) => {
    setSelectableOmraade(
      e.target.checked
        ? addSubString(e.target.value, selectableOmraade)
        : removeSubString(e.target.value, selectableOmraade)
    );
    if (e.target.checked) {
      setValue('omraade', true);
      clearErrors('omraade');
    } else {
      if (selectableOmraade.includes(';') === false) {
        setError('omraade', { type: 'manual', message: 'Område er påkrevd' });
        setValue('omraade', false);
      }
    }
  };
  const changeGyldigFraOgMed = (e: string) => {
    setGyldigFraOgMed(e);
  };
  const changeGyldigTilOgMed = (e: string) => setGyldigTilOgMed(e);

  const onSubmit = handleSubmit((data) => {
    //console.log('form data = ', JSON.stringify(data));
    if (
      fodselsnr &&
      fullmaktsgiverNavn &&
      gyldigFraOgMed &&
      gyldigTilOgMed &&
      gyldigFraOgMed <= gyldigTilOgMed &&
      gyldigFraOgMed >= nowDateFullmakt &&
      gyldigTilOgMed >= nowDateFullmakt &&
      gyldigTilOgMed <= dateOneYearAheadCompare
    ) {
      const fullmaktPageData: FullmaktPostType = {
        fullmaktsgiverNavn: fullmaktsgiverNavn,
        fullmektigsNavn: data.fullmektigsNavn || 'Default navn',
        fullmektig: data.fullmektigFodselsnr,
        omraade: selectableOmraade,
        gyldigFraOgMed: gyldigFraOgMed,
        gyldigTilOgMed: gyldigTilOgMed
      };

      const sendData: FullmaktSendType = fullmaktId
        ? {
            fullmaktId: Number(fullmaktId),
            ...fullmaktPageData
          }
        : {
            ...fullmaktPageData
          };
      // console.log('Data to send = ', JSON.stringify(sendData));
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
        .catch((error: HTTPError) => {
          settError(`${error.text}`);
        })
        .then(() => {
          settLoading(false);
        });
    }
  });
  const fullmaktHjelpetekst =
    'Velg om fullmakten skal gjelde for alle eller bare noen områder. Et område er for eksempel dagpenger eller foreldrepenger.';

  return (
    <>
      <div className='pagecontent'>
        <Veilederpanel svg={<img src={VeilederIcon} alt='Veileder' />}>
          Her kan du opprette en ny fullmakt. Du kan også se{' '}
          <Link
            to={`${baseUrl}${
              auth.status === 'RESULT' && auth.data.authenticated ? '' : '/fullmakt/login'
            }`}
            className='lenke'
          >
            oversikt over fullmaktene dine,
          </Link>{' '}
          eller{' '}
          <a className='lenke' href={fullmaktSkjemaURL}>
            lese mer om fullmakt.
          </a>
          <br />
          <br />
          Den digitale fullmaktsløsningen omfatter ikke sosiale tjenester. En fullmakt som
          gjelder sosiale tjenester må leveres/sendes på papir til NAV-kontoret og
          arkiveres der.
        </Veilederpanel>
        <Box
          id='fullmaktFrontPage'
          tittel={fullmaktId ? 'Endre fullmakt' : 'Ny fullmakt'}
          beskrivelse=''
          icon={FullmaktIcon}
        >
          <form onSubmit={onSubmit}>
            <div className='fullmakt__content'>
              <div className='fullmakt__ekspandert'>
                <div>
                  <div className='flex__rad'>{`Jeg, ${formatNavn(
                    fullmaktsgiverNavn
                  )}, ønsker å gi fullmakt til:`}</div>
                  <br />
                  <div style={{ marginBottom: '10px' }}>
                    <div className='flex__rad' style={{ marginBottom: '20px' }}>
                      <div className='flex__kolonne-left'>
                        <Felt
                          label={'Navn'}
                          name={'fullmektigsNavn'}
                          control={control}
                          placeholder={'Fornavn Etternavn'}
                          disabled={!!fullmaktId}
                        />
                        <div className='skjemaelement__feilmelding'>
                          {errors.fullmektigsNavn?.message}
                        </div>
                      </div>
                      <div className='flex__kolonne-right'>
                        <Felt
                          label={'Fødselsnummer (11 siffer)'}
                          name={'fullmektigFodselsnr'}
                          control={control}
                          disabled={!!fullmaktId}
                        />
                        <div className='skjemaelement__feilmelding'>
                          {errors.fullmektigFodselsnr?.message}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <div>
                      <div className='ekf__header'>
                        <div className='skjemaelement__label'>
                          <div>Fullmakten gjelder:</div>
                        </div>
                        <Hjelpetekst tekst={fullmaktHjelpetekst} />
                      </div>
                      <div style={{ paddingLeft: '10px' }}>
                        <Controller
                          name='omraade'
                          control={control}
                          render={({ field }) => {
                            return (
                              <Radio
                                className='skjemaelement--horisontal'
                                label='Alle områder'
                                checked={hvemOmraade === 'NAV_ALL_OMRAADE'}
                                onChange={() => {
                                  field.onChange(true);
                                  changeAlleOmraade();
                                }}
                                name={field.name}
                              />
                            );
                          }}
                          defaultValue={hvemOmraade === 'NAV_ALL_OMRAADE'}
                        />
                        <Controller
                          name='omraade'
                          control={control}
                          render={({ field }) => {
                            return (
                              <Radio
                                className='skjemaelement--horisontal'
                                label='Avgrenset til bestemte områder'
                                checked={hvemOmraade === 'NAV_BEGRENSET_OMRAADE'}
                                onChange={() => {
                                  field.onChange(false);
                                  changeBegrensetOmraade();
                                }}
                                name={field.name}
                              />
                            );
                          }}
                          defaultValue={hvemOmraade === 'NAV_BEGRENSET_OMRAADE'}
                        />

                        <div style={{ paddingLeft: '30px' }}>
                          {hvemOmraade === 'NAV_BEGRENSET_OMRAADE' &&
                            omraade &&
                            omraade.status === 'RESULT' &&
                            omraade.data.map((group) => (
                              <div key={group.kode}>
                                <div>
                                  <Element className='skjemaelement__label bold'>
                                    {group.termer.nb}
                                  </Element>
                                </div>
                                <div className={'fullmakt__checkbox'}>
                                  {group.undernoder.map((n) => (
                                    <Checkbox
                                      className={
                                        'fullmakt__checkbox-width skjemaelement--horisontal'
                                      }
                                      key={n.kode}
                                      label={n.termer.nb}
                                      checked={findSubString(n.kode, selectableOmraade)}
                                      value={n.kode}
                                      onChange={(e) => changeOmraadeCheckbox(e)}
                                    />
                                  ))}
                                </div>
                              </div>
                            ))}
                        </div>
                        <div className='skjemaelement__feilmelding'>
                          {errors.omraade?.message}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex__rad'>
                    <div className='flex__kolonne-left'>
                      <Controller
                        name='gyldigFraOgMed'
                        control={control}
                        render={({ field }) => {
                          return (
                            <DayPicker
                              label='Fullmakten gjelder fra og med '
                              error={errors.gyldigFraOgMed?.message}
                              value={gyldigFraOgMed}
                              onChange={(value) => {
                                field.onChange(value);
                                changeGyldigFraOgMed(value);
                              }}
                              onErrors={(error) => field.onChange(error)}
                            />
                          );
                        }}
                        defaultValue={gyldigFraOgMed}
                      />
                      <div className='skjemaelement__feilmelding'>
                        {errors.gyldigFraOgMed?.message}
                      </div>
                    </div>
                    <div className='flex__kolonne-right'>
                      <Controller
                        name='gyldigTilOgMed'
                        control={control}
                        render={({ field }) => {
                          return (
                            <DayPicker
                              label='Fullmakten gjelder til og med '
                              error={errors.gyldigTilOgMed?.message}
                              value={gyldigTilOgMed}
                              onChange={(value) => {
                                field.onChange(value);
                                changeGyldigTilOgMed(value);
                              }}
                              onErrors={(error) => field.onChange(error)}
                            />
                          );
                        }}
                        defaultValue={gyldigTilOgMed}
                      />
                      <div className='skjemaelement__feilmelding'>
                        {errors.gyldigTilOgMed?.message}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {isSubmitted &&
                  gyldigFraOgMed &&
                  gyldigTilOgMed &&
                  gyldigFraOgMed > gyldigTilOgMed && (
                    <AlertStripeFeil>
                      Fra-dato kan ikke være før Til-datos.
                    </AlertStripeFeil>
                  )}
                {isSubmitted &&
                  gyldigFraOgMed &&
                  gyldigTilOgMed &&
                  (gyldigFraOgMed < nowDateFullmakt ||
                    gyldigTilOgMed < nowDateFullmakt) && (
                    <AlertStripeFeil>Dato kan ikke være tilbake i tid.</AlertStripeFeil>
                  )}
                {isSubmitted &&
                  gyldigFraOgMed &&
                  gyldigTilOgMed &&
                  dateOneYearAheadCompare < gyldigTilOgMed && (
                    <AlertStripeFeil>
                      Fullmakten gjelder til og med dato kan ikke bli mer enn et år.
                    </AlertStripeFeil>
                  )}
                {error && <AlertStripeFeil>Noe gikk galt: {error}</AlertStripeFeil>}
                {!error && fullmatsgiver && fullmatsgiver.status === 'ERROR' && (
                  <AlertStripeFeil>
                    Noe gikk galt: {`${fullmatsgiver.error.text}`}
                  </AlertStripeFeil>
                )}
                {isSubmitted && errors && (
                  <div>
                    {isSubmitted &&
                      errors &&
                      Object.values(errors).map((o: any, i) =>
                        o ? <AlertStripeFeil key={i}>{o.message} </AlertStripeFeil> : ''
                      )}
                  </div>
                )}
                <InfoModal
                  showHide={showHide}
                  setShowHide={setShowHide}
                  message={
                    <div>
                      <p>
                        Fullmakten er lagret. Personen du har gitt fullmakt til kan nå
                        snakke med NAV på dine vegne og hjelpe deg i kontakten din med
                        NAV. Du kan når som helst endre eller stoppe fullmakten.
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
                    {loading ? <NavFrontendSpinner type={'S'} /> : 'Lagre fullmakt'}
                  </Hovedknapp>
                </div>
              </div>
            </div>
          </form>
        </Box>
      </div>
    </>
  );
};

export default Fullmakt;
