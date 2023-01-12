import React from 'react';
import { Text } from '@deriv/ui';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SlideContent } from './SlideContent/SlideContent';
import styles from './Carousel.module.scss';
import './swiper-custom.scss';

export const Carousel = () => {
  const swiperRef = React.useRef(null);
  const slideNext = () => swiperRef?.current?.children[0]?.swiper.slideNext();
  const slidePrev = () => swiperRef?.current?.children[0]?.swiper.slidePrev();

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
          onClick={() => slidePrev()}
          style={{ background: 'url(/img/arrow_left.svg) no-repeat' }}
          data-testid='carousel-arrow-prev'
        />
        <div ref={swiperRef}>
          <Swiper spaceBetween={50} slidesPerView={1} loop>
            <SwiperSlide>
              <SlideContent
                name={
                  <Text as='span' type='paragraph-1'>
                    Alessandro
                  </Text>
                }
                name_info={
                  <Text as='span' type='paragraph-1'>
                    CEO | Italy
                  </Text>
                }
                content={
                  <Text type='paragraph-1'>
                    To be honest, Deriv&lsquo;s API is one of the best APIs in the trading market.
                  </Text>
                }
              />
            </SwiperSlide>
            <SwiperSlide>
              <SlideContent
                name={
                  <Text as='span' type='paragraph-1'>
                    Thiago
                  </Text>
                }
                name_info={
                  <Text as='span' type='paragraph-1'>
                    Entrepreneur | Brazil
                  </Text>
                }
                content={
                  <Text type='paragraph-1'>
                    Probably the best API for making your business successful in trading derivatives
                    out there.
                  </Text>
                }
              />
            </SwiperSlide>
            <SwiperSlide>
              <SlideContent
                name={
                  <Text as='span' type='paragraph-1'>
                    Josh
                  </Text>
                }
                name_info={
                  <Text as='span' type='paragraph-1'>
                    Trader | Australia
                  </Text>
                }
                content={
                  <Text type='paragraph-1'>
                    I have been using the Deriv API for 13 years to build successful apps in and I
                    find the support I get from Deriv as a business partner second to none. I look
                    forward to 13 more successful years to come.
                  </Text>
                }
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div
          className={`${styles.next} ${styles.control}`}
          onClick={() => slideNext()}
          style={{ background: 'url(/img/arrow_right.svg) no-repeat' }}
          data-testid='carousel-arrow-next'
        />
      </div>
    </div>
  );
};
