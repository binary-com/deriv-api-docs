import React from 'react';
import styles from './SlideContent.module.scss';

type TSlideContent = {
  name: string;
  name_info: string;
  content: string;
};

export const SlideContent = ({ name, name_info, content }: TSlideContent) => (
  <React.Fragment>
    <blockquote className={styles.sliderContent}>
      <span>{content}</span>
    </blockquote>
    <p className='blockquote-author'>
      <span>
        <b>{name}</b>, {name_info}
      </span>
    </p>
  </React.Fragment>
);
