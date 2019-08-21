import * as React from 'react';
import './AboutPage.css';
import NorwegianTranslation from './AboutPage_no.html';
import EnglishTranslation from './AboutPage_en.html';

export const AboutPage = (props: any) => {
  const Translated =
    (props.language ? props.language : localStorage.getItem('language') || 'no') === 'no'
      ? NorwegianTranslation
      : EnglishTranslation;

  return (
    <div>
      <main>
        <div>
          <div className="row-centered">
            <div className="aboutPanel">
              <div>
                <Translated {...props} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
