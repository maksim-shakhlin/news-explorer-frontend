import { memo } from 'react';
import maksim from '../../images/maksim.jpg';
import { CONTENT } from '../../configs/ru';

const About = memo(() => {
  return (
    <section className="about unit">
      <img alt="Максим Шахлин" src={maksim} className="about__image" />
      <div className="about__about">
        <h2 className="title about__title">Об авторе</h2>
        {CONTENT.ABOUT.map((paragraph, i) => {
          return (
            <p className="about__text" key={i}>
              {paragraph}
            </p>
          );
        })}
      </div>
    </section>
  );
});

export default About;
