document.addEventListener('DOMContentLoaded', () => {
  // подключаем свайпер на главный экран
  const swiper = new Swiper('.hero__swiper', {
    autoplay: {
      delay: 5000,
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
  });

  // подключаем свайпер в Галерею
  const gallerySwiper = new Swiper('.gallery__swiper', {
    slidesPerView: 1,
    spaceBetween: 50,
    breakpoints: {
      321: {
        slidesPerView: 1,
        spaceBetween: 0,
        slidesPerGroup: 1,
      },
      701: {
        slidesPerView: 2,
        spaceBetween: 38,
        slidesPerGroup: 2,
      },
      993: {
        slidesPerView: 2,
        spaceBetween: 34,
        slidesPerGroup: 2,
      },
      1241: {
        slidesPerView: 2,
        spaceBetween: 50,
        slidesPerGroup: 2,
      },
      1641: {
        slidesPerView: 3,
        spaceBetween: 50,
        slidesPerGroup: 3,
      },
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // подключаем свайпер в События
  const eventsSwiper = new Swiper('.events__swiper', {
    slidesPerView: 3,
    spaceBetween: 30,
    breakpoints: {
      319: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      701: {
        slidesPerView: 2,
        spaceBetween: 34,
      },
      993: {
        slidesPerView: 3,
        spaceBetween: 27,
      },
      1241: {
        slidesPerView: 3,
        spaceBetween: 27,
      },
      1641: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },
    pagination: {
      el: '.events__swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.events__swiper-button-next',
      prevEl: '.events__swiper-button-prev',
    },
  });

  // подключаем свайпер в Проекты
  const projectsSwiper = new Swiper('.projects__swiper', {
    slidesPerView: 3,
    spaceBetween: 50,
    breakpoints: {
      319: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      701: {
        slidesPerView: 2,
        spaceBetween: 34,
      },
      993: {
        slidesPerView: 2,
        spaceBetween: 50,
      },
      1241: {
        slidesPerView: 2,
        spaceBetween: 50,
      },
      1641: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },
    navigation: {
      nextEl: '.projects__swiper-button-next',
      prevEl: '.projects__swiper-button-prev',
    },
  });

  // Drop down
  const catalogSections = document.querySelectorAll('.header__catalog-section');

  // функция открывает и закрывает выпадающий список
  function openCloseDropdown() {
    catalogSections.forEach((el) => {
      if (el == this) {
        el.children[1].classList.toggle('drop-down_active');
        el.classList.toggle('header__catalog-section_open');
        el.blur();
        dropdownLinkFocus();
      } else {
        el.children[1].classList.remove('drop-down_active');
        el.classList.remove('header__catalog-section_open');
      }
    });
  }

  catalogSections.forEach((el) => {
    el.addEventListener('click', openCloseDropdown);
  });

  // функция даёт или убирает outline родителю ссылки при фокусе на неё или потере фокуса
  function dropdownLinkFocus() {
    const dropdownLinks = document.querySelectorAll('.drop-down__link');
    dropdownLinks.forEach((el) => {
      el.addEventListener('focusin', (e) => {
        if (el == e.target) {
          el.parentNode.classList.add('drop-down__item-focus');
        }
      });
      el.addEventListener('focusout', (e) => {
        if (el == e.target) {
          el.parentNode.classList.remove('drop-down__item-focus');
        }
      });
    });
  }

  // подключение скроллбара в выпадающих дропбоксах
  const scroll = document.querySelectorAll('.drop-down__scroll-aria');
  scroll.forEach((el) => {
    new SimpleBar(el);

    // убираем возможность фокусировки на контейнере скролл-бара
    const simplebarContentWrappers = document.querySelectorAll(
      '.simplebar-content-wrapper'
    );
    simplebarContentWrappers.forEach((el) => {
      el.tabIndex = -1;
    });
  });

  // раскрытие и закрытие бургер - меню
  const hamburger = document.querySelector('.hamburger'),
    menuClose = document.querySelector('.header__menu-close'),
    menu = document.querySelector('.header__nav-block');

  hamburger.addEventListener('click', moveHamburgerMenu);
  menuClose.addEventListener('click', moveHamburgerMenu);

  function moveHamburgerMenu() {
    menu.classList.toggle('header__nav-block-active');
    setTimeoutOpacity(menu);
  }

  // вызов и скрытие формы поиска в header на мобильных брекпоинтах
  const searchIcon = document.querySelector('.header__search-icon-mobile'),
    searchForm = document.querySelector('.header__search-form-mobile'),
    searchInput = searchForm.querySelector('.header__search-input-mobile'),
    searchClose = searchForm.querySelector('.header__search-close-mobile');

  searchIcon.addEventListener('click', searchFormVisible);
  searchClose.addEventListener('click', searchFormVisible);

  function searchFormVisible() {
    searchIcon.classList.toggle('header__search-icon-mobile_visible');
    searchForm.classList.toggle('header__search-form-mobile_active');
    searchInput.value = '';
    setTimeoutOpacity(searchForm);
  }

  function setTimeoutOpacity(item) {
    if (item.style.opacity === '1') {
      setTimeout(() => {
        item.style.removeProperty('opacity');
      }, 400);
    } else {
      item.style.opacity = '1';
    }
  }

  const gallerySelect = document.querySelector('.gallery__select-input');
  const choices = new Choices(gallerySelect, {
    items: [
      {
        value: '',
      },
    ],
    searchEnabled: false,
    allowHTML: false,
    itemSelectText: '',
    position: 'bottom',
  });

  // section gallery
  const galeryItems = document.querySelectorAll('.gallery__swiper-slide-part');
  const galleryModal = document.querySelector('.gallery-modal');
  const galleryModalCloseBtns = document.querySelectorAll(
    '.gallery-modal__descr-block-close'
  );

  // открытие модального окна в галерее
  galeryItems.forEach((item) =>
    item.addEventListener('click', () => {
      galleryModal.classList.add('gallery-modal_active-display');
      setTimeout(() => {
        galleryModal.classList.add('gallery-modal_active-opacity');
      }, 10);
    })
  );

  // закрытие модального окна в галерее
  galleryModalCloseBtns.forEach((item) => {
    item.addEventListener('click', () => {
      galleryModal.classList.remove('gallery-modal_active-opacity');
      setTimeout(() => {
        galleryModal.classList.remove('gallery-modal_active-display');
      }, 400);
    });
  });

  // подключение аккордиона в каталоге
  $('.js-accordion').accordion({
    collapsible: true,
    active: false,
    icons: false,
    heightStyle: 'catalog__select-item-content',
  });

  const startedElem = document.querySelector('.catalog__show');
  const articlesShow = document.querySelectorAll('.catalog__show');
  const emptyShow = document.querySelector('.catalog__show-empty');
  const artistLinks = document.querySelectorAll('.catalog__select-item-artist');
  const catalogLinks = document.querySelectorAll(
    '.catalog__select-item-descr-link'
  );

  // статья в каталоге по умолчанию(стартовая)
  startedElem.classList.remove('catalog__show_hidden');

  // переход с имени художника на статью о нём
  // или на заглушку, если статья отсутствует
  artistLinks.forEach((item) => {
    item.addEventListener('click', (e) => {
      if (e.currentTarget.getAttribute('data-artist') === 'empty') {
        articlesShow.forEach((item) => {
          item.classList.add('catalog__show_hidden');
        });
        emptyShow.classList.remove('catalog__show-empty_hidden');
        emptyShow.scrollIntoView();
      } else {
        emptyShow.classList.add('catalog__show-empty_hidden');

        articlesShow.forEach((item) => {
          if (
            e.currentTarget.getAttribute('data-artist') ===
            item.getAttribute('data-artist')
          ) {
            item.classList.remove('catalog__show_hidden');
            item.scrollIntoView();
          } else {
            item.classList.add('catalog__show_hidden');
          }
        });
      }
    });
  });

  // закрытие аккордиона при переходе в галерею по ссылкам из каталога
  catalogLinks.forEach((item) => {
    item.addEventListener('click', (e) => {
      $('.js-accordion').accordion('destroy');
      $('.js-accordion').accordion({
        collapsible: true,
        active: false,
        icons: false,
        heightStyle: 'catalog__select-item-content',
      });
      document
        .querySelector('.catalog__show')
        .classList.remove('catalog__show_hidden');
      emptyShow.classList.add('catalog__show-empty_hidden');
    });
  });

  // tooltips in section projects
  tippy('[data-tippy-content]');
});
