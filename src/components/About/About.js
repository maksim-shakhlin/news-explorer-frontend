import { memo } from 'react';
import maksim from '../../images/maksim.jpg';

const About = memo(() => {
  return (
    <section className="about unit">
      <img alt="Максим Шахлин" src={maksim} className="about__image" />
      <div className="about__about">
        <h2 className="title about__title">Об авторе</h2>
        <p className="about__text">
          Привет! Я&nbsp;Максим Шахлин. Рекламный дизайнер в&nbsp;прошлом{' '}
          <nobr>и веб-разработчик</nobr> в&nbsp;настоящем &#128522; Люблю
          хорошие интерфейсы и адаптивно их&nbsp;верстаю: HTML, CSS, SASS. Затем
          превращаю их в&nbsp;приложения с&nbsp;помощью JavaScript и&nbsp;React.
          Могу и&nbsp;бэк запилить, на&nbsp;Express или&nbsp;Django.
        </p>
        <p className="about__text">
          Разработке я&nbsp;научился в&nbsp;Яндекс.Практикуме. Рекомендую.
          Этот&nbsp;сайт&nbsp;— моя дипломная работа. Всем&nbsp;REST&nbsp;API!
        </p>
      </div>
    </section>
  );
});

export default About;
