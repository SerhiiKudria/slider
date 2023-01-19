import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
//import styles from './../Slide/Slide.module.scss';
import styles from './SlideH.module.sass';
import defaultImage from './../SlideH/question-mark.jpg';
import { UserContext } from './../../contexts/index';

function Slide({ slide: { title, description, src }, isCurrent }) {
  const isFullScreen = useContext(UserContext);

  const figureClassName = isCurrent
    ? isFullScreen
      ? styles.fullScreenCurrentSlide
      : styles.currentSlide
    : styles.slide;

  const imgClassName = isFullScreen ? styles.fullScreenImg : styles.img;
  const titleClassName = isFullScreen ? styles.fullScreenTitle : styles.title;
  const descriptionClassName = isFullScreen
    ? styles.fullScreenDescription
    : styles.description;

  return (
    <>
      <figure className={figureClassName}>
        <img className={imgClassName} src={src ?? defaultImage} alt="Space" />
        <figcaption>
          <h3 className={titleClassName}>{title}</h3>
          <p className={descriptionClassName}>{description}</p>
        </figcaption>
      </figure>
    </>
  );
}

export default Slide;
