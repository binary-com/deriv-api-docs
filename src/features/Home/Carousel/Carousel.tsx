import React from 'react';
import { Text } from '@deriv/ui';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { SlideContent } from './SlideContent/SlideContent';
import styles from './Carousel.module.scss';
import './swiper-custom.scss';

export const Carousel = () => {
  const swiper = useSwiper();

  return (
    <div data-testid='carousel-component' className={`${styles.carouselComponent} carousel`}>
      <Text
        type='heading-2'
        as='h1'
        align='center'
        bold
        css={{
          'margin-bottom': '5rem',
        }}
      >
        See what our clients say
      </Text>
      <div className={styles.carouselContainer}>
        <div
          className={`${styles.prev} ${styles.control}`}
          onClick={() => swiper.slidePrev()}
          style={{ background: 'url(/img/arrow_left.svg) no-repeat' }}
          data-testid='carousel-arrow-prev'
        />
        <Swiper spaceBetween={50} slidesPerView={1} loop>
          <SwiperSlide>
            <SlideContent
              name='Alessandro'
              name_info='CEO | Italy'
              content='To be honest, Deriv&lsquo;s API is one of the best APIs in the trading market.'
            />
          </SwiperSlide>
          <SwiperSlide>
            <SlideContent
              name='Thiago'
              name_info='Entrepreneur | Brazil'
              content='Probably the best API for making your business successful in trading derivatives out there.'
            />
          </SwiperSlide>
          <SwiperSlide>
            <SlideContent
              name='Josh'
              name_info='Trader | Australia'
              content='I have been using the Deriv API for 13 years to build successful apps in and I
                  find the support I get from Deriv as a business partner second to none. I look
                  forward to 13 more successful years to come.'
            />
          </SwiperSlide>
        </Swiper>
        <div
          className={`${styles.next} ${styles.control}`}
          onClick={() => swiper.slideNext()}
          style={{ background: 'url(/img/arrow_right.svg) no-repeat' }}
          data-testid='carousel-arrow-next'
        />
      </div>
    </div>
  );
};
