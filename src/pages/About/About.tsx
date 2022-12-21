import { FC } from 'react';

import style from './About.module.scss';

const AboutPage: FC = () => {
  return (
    <div className={style.container_text}>
      <h1 className={style.about}>About</h1>
      <p className={style.about_text_title}>Kraud Donate is an app that serves to help volunteers.</p>
      <p className={style.about_text}>Our task is crowdfunding to help against the Russian invasion of Ukraine.</p>
      <p className={style.about_text}>The main development area of our team is a forum for communication between volunteers 
        and a fund to raise money for the Ukrainian army and all people in need who are affected by the war.
      </p>
      <p className={style.about_text}>Thanks to the forum volunteers can communicate with each other and discuss new problems. You can communicate directly with people and find out their needs.</p>
      <p className={style.about_text}>In the forum section, everyone can donate money to help Ukraine.
       We will donate it to help the Ukrainian Military Forces. For example, you can join the collection for the drone army. 
      </p>
      <p className={style.about_text_end}>No war! Glory to Ukraine!</p>
    </div>
  );
}

export default AboutPage;