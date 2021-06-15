import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from 'swiper/core';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Autoplay]);

function Homepage() {
    return (
        <div>
            <Swiper
                navigation
                autoplay
            >
                <SwiperSlide>

                </SwiperSlide>

            </Swiper>
        </div>
    )
}

export default Homepage
