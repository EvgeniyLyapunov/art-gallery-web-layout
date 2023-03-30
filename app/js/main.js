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
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
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

  galeryItems.forEach((item) =>
    item.addEventListener('click', () => {
      galleryModal.classList.add('gallery-modal_active-display');
      setTimeout(() => {
        galleryModal.classList.add('gallery-modal_active-opacity');
      }, 10);
    })
  );

  galleryModalCloseBtns.forEach((item) => {
    item.addEventListener('click', () => {
      galleryModal.classList.remove('gallery-modal_active-opacity');
      setTimeout(() => {
        galleryModal.classList.remove('gallery-modal_active-display');
      }, 400);
    });
  });
});
