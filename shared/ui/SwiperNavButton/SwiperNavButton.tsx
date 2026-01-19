import React from 'react';
import ArrowLeft from '../icons/ArrowLeft';
import ArrowRight from '../icons/ArrowRight';
import styles from './SwiperNavButton.module.scss';

type SwiperNavButtonProps = {
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled: boolean;
  className?: string;
};

function SwiperNavButton({
  direction,
  onClick,
  disabled,
  className = '',
}: SwiperNavButtonProps) {
  const isPrev = direction === 'prev';
  const ariaLabel = isPrev ? 'Scroll left' : 'Scroll right';
  const buttonClassName = className ? `${styles.button} ${className}` : styles.button;

  return (
    <button
      className={buttonClassName}
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
    >
      {isPrev ? <ArrowLeft /> : <ArrowRight />}
    </button>
  );
}

SwiperNavButton.defaultProps = {
  className: '',
};

export default SwiperNavButton;
