import React from 'react';
import {
  BookingCardWrapper, BOOKING_CARD_TITLE, BOOKING_CARD_TEXT, SWIPER_CONFIG,
} from '../features/booking';
import { MobileDecoration, InfoBlock } from '../widgets';
import { Clock } from '../shared';
import styles from './page.module.scss';

function Home() {
  return (
    <main className={styles.page}>

      <InfoBlock
        title="Cool session"
        description="Additional type"
        badgeText="30 min"
        badgeIcon={<Clock />}
        className={styles.infoBlock}
      />

      <MobileDecoration />

      <div className={styles.cardBlock}>
        <BookingCardWrapper
          title={BOOKING_CARD_TITLE}
          text={BOOKING_CARD_TEXT}
          daysSlidesPerView={SWIPER_CONFIG.desktop.days.slidesPerView}
          daysSlidesPerGroup={SWIPER_CONFIG.desktop.days.slidesPerGroup}
          timeSlidesPerView={SWIPER_CONFIG.desktop.time.slidesPerView}
          timeSlidesPerGroup={SWIPER_CONFIG.desktop.time.slidesPerGroup}
          mobileDaysSlidesPerView={SWIPER_CONFIG.mobile.days.slidesPerView}
          mobileDaysSlidesPerGroup={SWIPER_CONFIG.mobile.days.slidesPerGroup}
          mobileTimeSlidesPerView={SWIPER_CONFIG.mobile.time.slidesPerView}
          mobileTimeSlidesPerGroup={SWIPER_CONFIG.mobile.time.slidesPerGroup}
        />
      </div>
    </main>
  );
}

export default Home;
