/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';


/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Базові стилі
import "../../scss/base/swiper.scss";
// Повний набір стилів з scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Повний набір стилів з node_modules
// import 'swiper/css';

const initSliders = () => {
	if (document.querySelector('.swiper')) { 
		new Swiper('.popup-campaign__slider', {
	
      modules: [Navigation],
			observer: true,
			observeParents: true,

			spaceBetween: 12,
			autoHeight: true,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Ефекти
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагінація
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "вліво/вправо"
			navigation: {
				prevEl: '.popup-campaign__slider > .swiper-button-prev',
				nextEl: '.popup-campaign__slider > .swiper-button-next',
			},
			
			// Брейкпоінти
			breakpoints: {
				640: {
          slidesPerView: 2,
          slidesPerGroup: 2,
					autoHeight: true,
				},
				768: {
          slidesPerView: 3,
          slidesPerGroup: 3,
				},
			},
		
			// Події
			on: {

			}
		});
	}
}

initSliders();
