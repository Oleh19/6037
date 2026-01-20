'use client';

import React from 'react';
import Image from 'next/image';
import {
  HorizontalSwiper,
  formatDateKey,
  formatDay2Digit,
  formatWeekdayShort,
  Button,
} from '../../../../shared';
import useBookingCard from '../../model/useBookingCard';
import { kaiseiTokumin, AVATAR_PATH, BUTTON_WIDTH } from '../../lib/constants';
import type { BookingCardBaseProps } from '../../lib/types';
import styles from './BookingCard.module.scss';

type BookingCardProps = BookingCardBaseProps;

function BookingCard({
  title,
  text,
  daysSlidesPerView,
  daysSlidesPerGroup,
  timeSlidesPerView,
  timeSlidesPerGroup,
}: BookingCardProps) {
  const {
    dates,
    selectedIndex,
    selectedTimeIndex,
    selectedDate,
    timeSlots,
    isDaysSwiperEnd,
    isDaysSwiperBeginning,
    isTimeSwiperEnd,
    isTimeSwiperBeginning,
    swiperContainerRef,
    monthLabelsWrapperRef,
    monthLabels,
    updateMonthLabels,
    handleLabelRef,
    handleSelect,
    handleDaysSwiperReachEnd,
    handleDaysSwiperReachBeginning,
    handleTimeSelect,
    handleTimeSwiperReachEnd,
    handleTimeSwiperReachBeginning,
    handleSwiperReady,
    handleDayRef,
    isButtonDisabled,
    handleConfirm,
  } = useBookingCard();

  const daysBlockClassName = [
    styles.daysBlock,
    isDaysSwiperEnd ? styles.daysBlockEnd : '',
    isDaysSwiperBeginning ? styles.daysBlockBeginning : '',
  ].filter(Boolean).join(' ');

  const timeBlockClassName = selectedDate ? [
    styles.timeBlock,
    isTimeSwiperEnd ? styles.timeBlockEnd : '',
    isTimeSwiperBeginning ? styles.timeBlockBeginning : '',
  ].filter(Boolean).join(' ') : '';

  return (
    <section className={styles.card}>
      <div className={styles.infoRow}>
        <Image
          className={styles.avatar}
          src={AVATAR_PATH}
          alt="Session"
          width={120}
          height={120}
          priority
        />
        <div className={styles.infoText}>
          <h2 className={`${styles.infoTitle} ${kaiseiTokumin.className}`}>
            {title}
          </h2>
          <p className={styles.infoDescription}>
            {text}
          </p>
        </div>
      </div>
      <section className={daysBlockClassName}>
        <div ref={swiperContainerRef} className={styles.swiperContainer}>
          <div ref={monthLabelsWrapperRef} className={styles.monthLabelsWrapper}>
            {monthLabels.map(({
              dayIndex, monthName, position, isFixed,
            }) => (
              <div
                ref={handleLabelRef(dayIndex)}
                key={`month-${dayIndex}`}
                className={isFixed ? `${styles.monthLabel} ${styles.monthLabelFixed}` : styles.monthLabel}
                style={{
                  left: `${position}px`,
                  transition: 'left 0.2s ease-out',
                }}
              >
                {monthName}
              </div>
            ))}
          </div>
          <HorizontalSwiper
            onSelect={handleSelect}
            onSlideChange={updateMonthLabels}
            onSwiperReady={handleSwiperReady}
            onReachEnd={handleDaysSwiperReachEnd}
            onReachBeginning={handleDaysSwiperReachBeginning}
            slidesPerView={daysSlidesPerView}
            slidesPerGroup={daysSlidesPerGroup}
            allowTouchMove={false}
          >
            {dates.map((date, index) => {
              const dateKey = formatDateKey(date);
              const isSelected = selectedIndex === index;

              return (
                <button
                  ref={handleDayRef(index)}
                  className={isSelected ? `${styles.dayChip} ${styles.dayChipSelected}` : styles.dayChip}
                  type="button"
                  key={dateKey}
                  data-day-index={index}
                >
                  <span className={styles.dayWeek}>
                    {formatWeekdayShort(date)}
                  </span>
                  <span className={styles.dayDate}>
                    {formatDay2Digit(date)}
                  </span>
                </button>
              );
            })}
          </HorizontalSwiper>
        </div>
      </section>
      {selectedDate && (
        <section className={timeBlockClassName}>
          <HorizontalSwiper
            onSelect={handleTimeSelect}
            onReachEnd={handleTimeSwiperReachEnd}
            onReachBeginning={handleTimeSwiperReachBeginning}
            slidesPerView={timeSlidesPerView}
            slidesPerGroup={timeSlidesPerGroup}
            allowTouchMove={false}
          >
            {timeSlots.map((slot, index) => {
              const isSelected = selectedTimeIndex === index;
              const isPast = slot.date.getTime() <= Date.now();

              return (
                <button
                  className={isSelected ? `${styles.timeChip} ${styles.timeChipSelected}` : styles.timeChip}
                  type="button"
                  key={`${slot.date.getTime()}`}
                  disabled={isPast}
                >
                  {slot.time}
                </button>
              );
            })}
          </HorizontalSwiper>
        </section>
      )}

      <div className={styles.buttonWrapper}>
        <Button
          width={BUTTON_WIDTH}
          disabled={isButtonDisabled}
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      </div>
    </section>
  );
}

export default BookingCard;
