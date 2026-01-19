import { Kaisei_Tokumin } from 'next/font/google';
import type { SwiperConfig } from './types';

export const WEEKS_TO_GENERATE = 6 as const;

export const kaiseiTokumin = Kaisei_Tokumin({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
});

export const BUTTON_WIDTH = 370 as const;
export const AVATAR_PATH = '/avatar.jpg' as const;

export const BOOKING_CARD_TITLE = 'Book a Session' as const;
export const BOOKING_CARD_TEXT = 'Choose a date and time that is convenient for you to e-meet your stylist' as const;

export const SWIPER_CONFIG = {
  desktop: {
    days: {
      slidesPerView: 6,
      slidesPerGroup: 1,
    },
    time: {
      slidesPerView: 5,
      slidesPerGroup: 1,
    },
  },
  mobile: {
    days: {
      slidesPerView: 5,
      slidesPerGroup: 1,
    },
    time: {
      slidesPerView: 4,
      slidesPerGroup: 1,
    },
  },
} as const satisfies SwiperConfig;
