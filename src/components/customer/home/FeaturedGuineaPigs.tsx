import { onCleanup, onMount } from "solid-js";
import Swiper from "swiper";
import type { Swiper as SwiperType } from "swiper/types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

Swiper.use([Navigation, Pagination, Autoplay]);

const FeaturedGuineaPigs = () => {
  let swiperEl: HTMLDivElement | null = null;
  let swiper: SwiperType | null = null;

  onMount(() => {
    swiper = new Swiper(swiperEl!, {
      direction: "horizontal",
      loop: true,

      pagination: {
        el: ".swiper-pagination",
      },

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    });
  });

  onCleanup(() => {
    swiper?.destroy();
    swiper = null;
  });

  return (
    <div class="swiper" ref={el => swiperEl = el}>
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img
            src="/images/guinea_pig_1.jpeg"
            alt="Guinea pig 1"
            class="w-60 h-60 mx-auto border object-cover"
          />
        </div>
        <div class="swiper-slide">
          <img
            src="/images/guinea_pig_2.jpeg"
            alt="Guinea pig 2"
            class="w-60 h-60 mx-auto border object-cover"
          />
        </div>
        <div class="swiper-slide">
          <img
            src="/images/guinea_pig_3.jpeg"
            alt="Guinea pig 3"
            class="w-60 h-60 mx-auto border object-cover"
          />
        </div>
      </div>

      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>

      <div class="swiper-pagination"></div>
    </div>
  );
};

export default FeaturedGuineaPigs;
