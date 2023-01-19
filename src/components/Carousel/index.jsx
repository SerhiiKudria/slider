import { useEffect, useState, createContext } from 'react';
import PropTypes from 'prop-types';
import Slide from './SlideH';
import styles from './Carousel.module.sass';
import { UserContext } from './../contexts';

function Carousel({ slides }) {
  const [delay, setDelay] = useState(1000);
  const [isPaused, setIsPaused] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const incSlideIndex = () => {
    setCurrentIndex((currentIndex) => (currentIndex + 1) % slides.length);
  };

  const decSlideIndex = () => {
    setCurrentIndex(
      (currentIndex) => (currentIndex - 1 + slides.length) % slides.length
    );
  };

  const play = () => {
    setIsPaused((isPaused) => !isPaused);
  };

  const fullScreen = () => {
    setIsFullScreen((isFullScreen) => !isFullScreen);
  };

  const prevIndex = (currentIndex - 1 + slides.length) % slides.length;

  const nextIndex = (currentIndex + 1) % slides.length;

  useEffect(() => {
    let timerId = null;
    if (!isPaused && !timerId) {
      timerId = setTimeout(() => {
        incSlideIndex();
      }, delay);
    }
    return () => {
      clearTimeout(timerId);
      timerId = null;
    };
  }, [isPaused, delay, currentIndex]);

  const leftButtonClassName = isFullScreen ? styles.buttonLeft : '';
  const rightButtonClassName = isFullScreen ? styles.buttonRight : '';
  const fullScreenButtonClassName = isFullScreen ? styles.buttonFullScreen : '';
  const containerClassName = isFullScreen
    ? styles.fullScreenContainer
    : styles.container;

  return (
    <>
      <UserContext.Provider value={isFullScreen}>
        <article className={containerClassName}>
          <Slide slide={slides[prevIndex]} />
          <Slide slide={slides[currentIndex]} isCurrent></Slide>
          <Slide slide={slides[nextIndex]} />
          <div className={styles.buttonContainer}>
            <button className={leftButtonClassName} onClick={incSlideIndex}>
              {'<'}
            </button>
            <button className={rightButtonClassName} onClick={decSlideIndex}>
              {'>'}
            </button>
            <button onClick={play}>{isPaused ? 'Play' : 'Pause'}</button>
            <button className={fullScreenButtonClassName} onClick={fullScreen}>
              {isFullScreen ? 'Close FullScreen' : 'FullScreen'}
            </button>
          </div>
        </article>
      </UserContext.Provider>
    </>
  );
}

Carousel.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      src: PropTypes.string,
    })
  ).isRequired,
};

export default Carousel;
