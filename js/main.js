(function() {
"use strict";

/*------------------------------------------------------------------

  01. Custom easings

-------------------------------------------------------------------*/

// GSAP: turn off console warnings
gsap.config({
	nullTargetWarn: true
});

window.App = {};

App.config = {
  headroom: {
    enabled: true,
    options: {
      classes : {
        initial : "headroom",
        pinned : "is-pinned",
        unpinned : "is-unpinned",
        top : "is-top",
        notTop : "is-not-top",
        bottom : "is-bottom",
        notBottom : "is-not-bottom",
        frozen: "is-frozen",
      },
    }
  },
  ajax: {
    enabled: true,
  },
  cursorFollower: {
    enabled: true,
    disableBreakpoint: '992', // cursor will be disabled on this device width
  },
}

App.html = document.querySelector('html');
App.body = document.querySelector('body');
App.SMcontroller = new ScrollMagic.Controller();

window.onload = function () {
  customEasingsInit();
  Preloader.init();
  
  document.fonts.ready.then(function () {
    initComponents()
    initialReveal()
  });
}


// Reloads all scripts when navigating through pages
function initComponents() {
  lazyLoading();
  SectionSlider();
  Header.init();

  splitTextIntoLines();
  parallaxInit();
  Accordion.init();
  Tabs.init();
  feather.replace();

  masonryFilterInit();
  masonryGridInit();

  Cursor.init();
  mapInit();
  pinOnScroll();
  galleryInit();
  inputCounter();

  Header.headerSticky();
  customSelect();
  shopSlider();
  home1MastheadParticles();
  particlesLayer();
  atroposInit();
  rellaxInit();
  menuPinOnScroll();
  scrollToIdInit();
  shopDropDown();
  loadMore();
  switchContent();

  //
	// your custom plugins init here
  //
}


function switchContent() {
  const target = document.querySelectorAll('[data-switch]')
  if (!target) return;

  target.forEach(el => {
    el.addEventListener('click', () => {
      const trigger = el.getAttribute('data-switch')
      
      document.querySelectorAll(trigger).forEach(el => {
        el.classList.toggle('is-active');
      });
    })
  });
}

function loadMore() {
  const target = document.querySelectorAll('[data-loadmore-trigger]')
  if (!target) return;

  target.forEach(el => {
    el.addEventListener('click', () => {
      const trigger = el.getAttribute('data-loadmore-trigger')
      document.querySelector(trigger).classList.add('is-active');
      el.classList.add('d-none');
    })
  });
}

function shopDropDown() {
  const target = document.querySelector('.js-shop-dropdown')
  if (!target) return;
  
  const items = target.querySelectorAll('.js-dropdown-list .js-dropdown-link')
  const title = target.querySelector('.js-dropdown-title')

  items.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault()
      title.innerHTML = el.innerHTML
    })
  });
}


function rellaxInit() {
  const target = document.querySelectorAll('.js-rellax')
  if (!target) return;

  var rellax = new Rellax('.js-rellax', {
    breakpoints: [576, 768, 1025]
  });
}


function atroposInit() {
  const target = document.querySelectorAll('.js-atropos')
  if (!target) return;

  target.forEach(el => {
    const myAtropos = Atropos({
      el: el,
      // alwaysActive: true,
    });
  });
}

function menuPinOnScroll() {
  const target = document.querySelector('.js-pin-menu');
  if (!target) return;

  const sceneDuration = '100%';
  const sceneOffset = document.querySelector('.js-header').offsetHeight;
  let trHook = "onLeave";
  
  const scene = new ScrollMagic.Scene({
    duration: sceneDuration - sceneOffset,
    offset: '-' + sceneOffset + 'px',
    triggerElement: target,
    triggerHook: trHook,
  })
  .setPin(".js-pin-menu")
  .addTo(App.SMcontroller)
  
  window.addEventListener('resize', () => {
    const sceneOffset = document.querySelector('.js-header').offsetHeight;
    scene.duration(sceneDuration - sceneOffset);
    scene.offset('-' + sceneOffset + 'px');
    scene.refresh();
  })
}

function home1MastheadParticles() {
  const target = document.querySelector('#js-masthead-1-particles');
  if (!target) return;

  particlesJS("js-masthead-1-particles", {
    "particles": {
      "number": {
        "value": 15,
        "density": {
          "enable": false,
          "value_area": 200
        }
      },
      "color": {
        "value": ["#00ff96", "#0044EB", "#1A3454"]
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 6,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 20,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "bounce",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "repulse"
        },
        "onclick": {
          "enable": false,
          "mode": "push"
        },
        "resize": false
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });
}

function particlesLayer() {
  const target = document.querySelectorAll('[data-particles-image]');
  if (!target) return;

  const makeParticlesLayer = (layerId, imagePath, number = 2, size = 10, width = 100, height = 100) => {
    let shapes = {
      "type": "image",
      "image": {
        "src": imagePath,
        "width": width,
        "height": height
      },
    }

    if (!imagePath) {
      shapes = {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
      }
    }

    particlesJS(layerId, {
      "particles": {
        "number": {
          "value": number,
          "density": {
            "enable": false,
            "value_area": 200
          }
        },
        "color": {
          "value": ["#00ff96", "#0044EB", "#1A3454"]
        },
        "shape": shapes,
        "opacity": {
          "value": 0.7,
          "random": false,
        },
        "size": {
          "value": size,
          "random": false,
        },
        "line_linked": {
          "enable": false,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "bounce",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": false,
            "mode": "repulse"
          },
          "onclick": {
            "enable": false,
            "mode": "push"
          },
          "resize": false
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  }

  target.forEach(el => {
    const imagePath = el.getAttribute('data-particles-image')
    const id = el.id
    let width = 100
    let height = 100
    let number = 2
    let size = 10

    if (el.getAttribute("data-particles-image-width"))
      width = el.getAttribute("data-particles-image-width")

    if (el.getAttribute("data-particles-image-height"))
      height = el.getAttribute("data-particles-image-height")

    if (el.getAttribute("data-particles-image-number"))
      number = el.getAttribute("data-particles-image-number")

    if (el.getAttribute("data-particles-image-size"))
      size = el.getAttribute("data-particles-image-size")

    makeParticlesLayer(id, imagePath, number, size, width, height)
  });
}

function shopSlider() {
  const slider = document.querySelector('.js-shop-slider .js-slider-slider');

  const sliderInstance = new Swiper(slider, {
    spaceBetween: 0,
    speed: 1000,
    parallax: true,
    lazy: {
      loadPrevNext: true,
    },
    breakpoints: {
      575: {
        parallax: false,
      },
    },
  });

  const sliderPaginationItems = document.querySelectorAll('.js-shop-slider .js-slider-pagination > *');

  sliderInstance.on('slideChangeTransitionStart', function () {
    sliderPaginationItems[sliderInstance.activeIndex].classList.add('is-active');
  });

  for (let i = 0; i < sliderPaginationItems.length; i++) {
    const el = sliderPaginationItems[i];
    
    el.addEventListener('click', (e) => {
      sliderInstance.slideTo(i)
    })
  }
}

function customSelect() {
  const target = document.querySelectorAll(".js-selectize");
  if (!target) return;
  target.forEach(function(select) {
    NiceSelect.bind(select);
  });

  const target2 = document.querySelectorAll(".js-selectize-seachable");
  if (!target2) return;
  target2.forEach(function(select) {
    NiceSelect.bind(select, { searchable: true });
  });
}

function inputCounter() {
  const target = document.querySelectorAll('.js-input-counter');
  if (!target) return;

  target.forEach(el => {
    const input = el.querySelector('input')
    var value = input.value;

    el.querySelector('.js-up').addEventListener('click', () => {
      input.focus();
      value = parseInt(value) + 1;
      input.value = value;
    })

    el.querySelector('.js-down').addEventListener('click', () => {
      input.focus();
      value = parseInt(value) - 1;
      value = value < 0 ? 0 : value;
      input.value = value;
    })
  });
}

function galleryInit() {
  GLightbox({
    selector: '.js-gallery',
    touchNavigation: true,
    loop: false,
    autoplayVideos: true,
  });
}

function pinOnScroll() {
  const target = document.querySelectorAll('.js-pin-container');
  if (!target) return;

  target.forEach(el => {
    const sceneDuration = el.offsetHeight;
    const sceneOffset = el.querySelector('.js-pin-content').offsetHeight + 20;
    let trHook = "onEnter";

    if (el.hasAttribute('data-pin')) {
      trHook = el.getAttribute('data-pin');
    }

    const scene = new ScrollMagic.Scene({
      duration: sceneDuration - sceneOffset,
      offset: sceneOffset,
      triggerElement: el,
      triggerHook: trHook,
    })
    .setPin(".js-pin-content")
    .addTo(App.SMcontroller)

    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

    if (width < 992) {
      scene.duration('1px');
      scene.refresh();
    } else {
      scene.duration(sceneDuration - sceneOffset);
      scene.refresh();
    }

    window.addEventListener('resize', () => {
      let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

      if (width < 992) {
        scene.duration('1px');
        scene.refresh();
      } else {
        scene.duration(sceneDuration - sceneOffset);
        scene.refresh();
      }
    })
  });
}

function mapInit() {
  const target = document.querySelector("#map");
  if (!target) return;

  const map = L.map(target).setView([51.505, -0.09], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker([51.5, -0.09]).addTo(map)
    .openPopup();
}

const Accordion = (function() {
  function init() {
    const targets = document.querySelectorAll(".js-accordion");

    if (!targets) return;

    for (let i = 0; i < targets.length; i++) {
      const items = targets[i].querySelectorAll('.accordion__item');

      for (let l = 0; l < items.length; l++) {
        items[l].addEventListener("click", (e) => {
          items[l].classList.toggle('is-active');
          const content = items[l].querySelector('.accordion__content');
  
          if (content.style.maxHeight) {
            content.style.maxHeight = null;
          } else {
            content.style.maxHeight = content.scrollHeight + "px";
          }
        });
      }
    }
  }

  return {
    init: init,
  }
})();
/*--------------------------------------------------
  05. Custom cursor
---------------------------------------------------*/

const Cursor = (function() {

  const cursor = document.querySelector(".js-cursor");
  let follower;
  let label;
  let icon;

  let clientX;
  let clientY;
  let cursorWidth;
  let cursorHeight;
  let cursorTriggers;
  let state;

  function variables() {

    follower = cursor.querySelector(".js-follower");
    label = cursor.querySelector(".js-label");
    icon = cursor.querySelector(".js-icon");

    clientX = -100;
    clientY = -100;
    cursorWidth = cursor.offsetWidth / 2;
    cursorHeight = cursor.offsetHeight / 2;
    cursorTriggers;
    state = false;

  }

  function init() {

    if (!cursor) return;

    variables();
    state = true;
    cursor.classList.add('is-enabled');

    document.addEventListener("mousedown", e => {
      cursor.classList.add('is-mouse-down');
    });

    document.addEventListener("mouseup", e => {
      cursor.classList.remove('is-mouse-down');
    });

    document.addEventListener("mousemove", (event) => {
      clientX = event.clientX;
      clientY = event.clientY;
    });

    const render = () => {
      cursor.style.transform = `translate(${clientX - cursorWidth}px, ${clientY - cursorHeight}px)`;
      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);

    update();
    breakpoint();

  }

  function enterHandler({ target }) {

    cursor.classList.add('is-active');

    if (target.getAttribute('data-cursor-label')) {
      App.body.classList.add('is-cursor-active');
      cursor.classList.add('has-label');
      label.innerHTML = target.getAttribute('data-cursor-label');
    }

    if (target.getAttribute('data-cursor-label-light')) {
      App.body.classList.add('is-cursor-active');
      cursor.classList.add('has-label-light');
      label.innerHTML = target.getAttribute('data-cursor-label-light');
    }

    if (target.getAttribute('data-cursor-icon')) {
      App.body.classList.add('is-cursor-active');
      cursor.classList.add('has-icon');
      const iconAttr = target.getAttribute('data-cursor-icon');
      icon.innerHTML = feather.icons[iconAttr].toSvg();
    }

    if (target.getAttribute('data-cursor-slider')) {
      App.body.classList.add('is-cursor-active');
      cursor.classList.add('has-slider-icon');
    }

  }
  
  function leaveHandler() {

    App.body.classList.remove('is-cursor-active');
    cursor.classList.remove('is-active');
    cursor.classList.remove('has-label');
    cursor.classList.remove('has-label-light');
    cursor.classList.remove('has-icon');
    cursor.classList.remove('has-slider-icon');
    label.innerHTML = '';
    icon.innerHTML = '';

  }

  function update() {

    if (!cursor) return;

    cursorTriggers = document.querySelectorAll([
      "button",
      "a",
      "input",
      "[data-cursor]",
      "[data-cursor-label]",
      "[data-cursor-label-light]",
      "[data-cursor-icon]",
      "[data-cursor-slider]",
      "textarea"
    ]);
    
    cursorTriggers.forEach(el => {
      el.addEventListener("mouseenter", enterHandler);
      el.addEventListener("mouseleave", leaveHandler);
    });

  }

  function clear() {

    if (!cursor) return;
    
    cursorTriggers.forEach(el => {
      el.removeEventListener("mouseenter", enterHandler);
      el.removeEventListener("mouseleave", leaveHandler);
    });

  }

  function hide() {

    if (!cursor) return;
    cursor.classList.add('is-hidden');

  }

  function show() {

    if (!cursor) return;
    cursor.classList.remove('is-hidden');

  }

  function breakpoint() {

    if (!state) return;
    if (!App.config.cursorFollower.disableBreakpoint) return;

    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

    if (width < App.config.cursorFollower.disableBreakpoint) {
      state = false;
      cursor.classList.remove('is-enabled');
      clear();
    } else {
      state = true;
      cursor.classList.add('is-enabled');
      update();
    }

    window.addEventListener('resize', () => {
      let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

      if (width < App.config.cursorFollower.disableBreakpoint) {
        state = false;
        cursor.classList.remove('is-enabled');
        clear();
      } else {
        state = true;
        cursor.classList.add('is-enabled');
        update();
      }
    })

  }

  return {
    init: init,
    leaveHandler: leaveHandler,
    update: update,
    clear: clear,
    hide: hide,
    show: show,
  };

})();

/*--------------------------------------------------
  01. Custom easings
---------------------------------------------------*/

function customEasingsInit() {
  CustomEase.create("quart.out", "0.25, 1, 0.5, 1");
  CustomEase.create("quart.inOut", "0.76, 0, 0.24, 1");
}

/*--------------------------------------------------
	10. Isotope grids
---------------------------------------------------*/

function masonryFilterInit() {

  const filterGrids = document.querySelectorAll('.section-filter');

  if (!filterGrids.length) {
    return;
  }

  for (let i = 0; i < filterGrids.length; i++) {
    const el = filterGrids[i];

    let iso = new Isotope(el.querySelector('.masonry'), {
      itemSelector: '.masonry__item',
      percentPosition: true,
      layoutMode: 'packery',
      packery: {
        columnWidth: '.masonry__sizer',
      },
    });

    const filterButtons = el.querySelectorAll(".filter-button-group button");
  
    for (let i = 0; i < filterButtons.length; i++) {
      const el = filterButtons[i];

      el.addEventListener("click", () => {
        let someom = iso.getItemElements();
        someom.forEach(el => {
          el.classList.remove('is-active');
        });

        filterButtons.forEach(button => button.classList.remove('btn-active'));
        el.classList.add('btn-active');

        let filterValue = el.getAttribute('data-filter');
        iso.arrange({ filter: filterValue });
      });
    }
  }

}


function masonryGridInit() {

  const grids = document.querySelectorAll('.js-masonry.js-masonry-no-filter');

  if (!grids.length) {
    return;
  }

  for (let i = 0; i < grids.length; i++) {
    new Isotope(grids[i], {
      itemSelector: '.masonry__item',
      percentPosition: true,

      layoutMode: 'packery',
      packery: {
        columnWidth: '.masonry__sizer',
      },
    })
  }
  
}
/*--------------------------------------------------
  11. Lazy loading
---------------------------------------------------*/

function lazyLoading() {
  if (!document.querySelector('.js-lazy')) {
    return;
  }

  new LazyLoad({
    elements_selector: ".js-lazy",
  });
}

/*--------------------------------------------------
  03. Header
---------------------------------------------------*/

const Header = (function() {

  let menu;
  let mobileBg;
  let navList;
  let mobileFooter;
  let navListLinks;
  
  let navBtnOpen;
  let navBtnClose;
  let navBtnListBack;

  let menuDeepLevel;
  let timeline = gsap.timeline();

  function updateVars() {
    menu = document.querySelector('.js-menu');
    mobileBg = menu.querySelector('.js-mobile-bg');
    mobileFooter = menu.querySelector('.js-mobile-footer');
    navList = document.querySelector('.js-navList');
    navListLinks = document.querySelectorAll('.js-navList > li > a');

    navBtnOpen = document.querySelector('.js-nav-open');
    navBtnClose = document.querySelector('.js-nav-close');
    navBtnListBack = document.querySelector('.js-nav-list-back');
    menuDeepLevel = 0;
  }

  
  function init() {
    if (!document.querySelector('.js-menu')) return
    
    updateVars();
    menuListBindEvents();
    menuAnimBindEvents();
  }

  function deepLevelCheck(level) {
    return level;
  }

  function menuListBindEvents() {
    const listItems = document.querySelectorAll('.js-navList .menu-item-has-children');
    if (!listItems.length) return;

    navBtnListBack.addEventListener('click', () => {
      const visibleList = navList.querySelector('ul.is-active');
      const parentList = visibleList.parentElement.parentElement;

      menuDeepLevel--;
      menuListStepAnimate(visibleList, parentList, menuDeepLevel, parentList.parentElement.querySelector('li > a').innerHTML);
    });

    listItems.forEach(el => {
      const parentLink = el.querySelector('li > a');
      parentLink.removeAttribute('href');

      parentLink.addEventListener('click', () => {
        const parent = el.parentElement;
        const subnavList = el.lastElementChild;

        menuDeepLevel++;
        menuListStepAnimate(parent, subnavList, menuDeepLevel, parentLink.innerHTML);
      });
    });
  }

  function menuListStepAnimate(hideList, showList, level, htmlText = '') {
    const navBtnClose = document.querySelector('.js-nav-close');
    
    let hideListItems = hideList.children;
    hideListItems = Array.from(hideListItems);
    const hideListLinks = hideListItems.map(item => item.querySelector('li > a'));
    
    let showListItems = showList.children;
    showListItems = Array.from(showListItems);
    const showListLinks = showListItems.map(item => item.querySelector('li > a'));

    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

    if (width < 992) {
      timeline
        .clear()

      if (!deepLevelCheck(level)) {
        gsap.to(navBtnListBack, {
          ease: "quart.inOut",
          duration: 0.6,
          opacity: 0,
          onStart: () => {
            navBtnListBack.classList.add('pointer-events-none');
          },
        })
      }
      
      timeline.to(hideListLinks, {
        ease: 'quart.out',
        stagger: -0.04,
        duration: 0.8,
        y: '100%',
        onStart: () => {
          showList.classList.add('is-active');
          showList.classList.add('is-list-displayed');
          navBtnClose.classList.add('pointer-events-none');
        },
        onComplete: () => {
          if (!deepLevelCheck(level)) {
            hideList.classList.remove('is-list-displayed');
          }
          hideList.classList.remove('is-active');
        },
      })

      if (deepLevelCheck(level)) {
        timeline.to(navBtnListBack, {
          ease: "quart.inOut",
          duration: 0.6,
          y: '0px',
          opacity: 1,
          onStart: () => {
            navBtnListBack.classList.add('-is-active');
            navBtnListBack.classList.remove('pointer-events-none');
            navBtnListBack.querySelector('a').innerHTML = htmlText;
          },
        }, '>-0.5')
      }

      timeline.to(showListLinks, {
        ease: 'quart.out',
        stagger: 0.08,
        duration: 0.9,
        y: '0%',
        onStart: () => {
          if (!deepLevelCheck(level)) {
            navBtnListBack.classList.remove('-is-active');
          }
        },
        onComplete: () => {
          navBtnClose.classList.remove('pointer-events-none');
        },
      }, '>-0.6')
    }
  }

  function menuAnimBindEvents() {
    if (!navBtnOpen) return;

    navBtnOpen.addEventListener('click', () => {
      App.html.classList.add('html-overflow-hidden');
      showMenu();
    });

    navBtnClose.addEventListener('click', () => {
      App.html.classList.remove('html-overflow-hidden');
      hideMenu();
    })
  }

  function showMenu() {

    document.querySelector('.js-header').classList.add('menu-open');
    menu.classList.add('is-active');

    gsap.timeline()
      .set(navListLinks, { opacity: 1, })
      .set(navBtnListBack, { opacity: 0, })

      .fromTo(mobileBg, {
        scaleY: 0,
      }, {
        scaleY: 1,
        duration: 0.8,
        ease: "quart.inOut",
        onStart: () => {
          navBtnOpen.classList.add('pointer-events-none');
        }
      })

      .fromTo(navBtnOpen, {
        y: '0px',
        opacity: 1,
      }, {
        ease: "quart.out",
        duration: 0.8,
        y: '-16px',
        opacity: 0,
      }, '>-0.2')
      .fromTo(navBtnClose, {
        y: '16px',
        opacity: 0,
      }, {
        ease: "quart.out",
        duration: 0.8,
        y: '0px',
        opacity: 1,
      }, '<0.2')

      .fromTo(navListLinks, {
        y: '100%',
      }, {
        ease: 'quart.out',
        stagger: 0.08,
        duration: 1.2,
        y: '0%',
      }, '>-0.7')
      .fromTo(mobileFooter, {
        y: '30px',
        opacity: 0,
      }, {
        ease: 'quart.out',
        duration: 1.2,
        y: '0px',
        opacity: 1,
        onComplete: () => {
          navList.classList.add('is-active');
          navBtnClose.classList.remove('pointer-events-none');
        }
      }, '>-0.5')

  }

  function hideMenu() {
    const navVisibleList = menu.querySelector('.is-active');
    const navActiveListLinks = menu.querySelectorAll('.is-active > li > a');
    menuDeepLevel = 0;
    document.querySelector('.js-header').classList.remove('menu-open');

    gsap.timeline()
      .to([navBtnClose, navBtnListBack, mobileFooter], {
        ease: "quart.out",
        duration: 0.6,
        opacity: 0,
        y: '-16px',
        onStart: () => {
          navBtnClose.classList.add('pointer-events-none');
          navVisibleList.classList.remove('is-active');
          mobileBg.classList.add('origin-top');
        },
      })

      .fromTo(navBtnOpen, {
        y: '16px',
        opacity: 0,
      }, {
        ease: "quart.out",
        duration: 0.7,
        y: '0px',
        opacity: 1,
      }, '<0.1')

      .to(navActiveListLinks, {
        ease: "quart.out",
        duration: 0.8,
        y: '-100%',
      }, '>-0.6')

      .to(mobileBg, {
        ease: "quart.inOut",
        duration: 0.8,
        scaleY: 0,
        onComplete: () => {
          navBtnOpen.classList.remove('pointer-events-none');
          mobileBg.classList.remove('origin-top');
          menu.classList.remove('is-active');
        },
      }, '>-0.6')

  }

  function headerSticky() {
    const header = document.querySelector('.js-header');
    if (!header) return;
  
    new ScrollMagic.Scene({
      offset: '6px',
    })
      .setClassToggle(header, 'is-sticky')
      .addTo(App.SMcontroller);
  }
  

  return {
    headerSticky: headerSticky,
    init: init,
  }

})();

/*--------------------------------------------------
  04. Page reveals
---------------------------------------------------*/

const PageReveal = (function() {
  function base(tl) {
    tl.add(() => {
      RevealAnim.init();
    })
  }

  function init(tl) {
    base(tl);
    return tl;
  }

  return {
    init: init,
  }
})();


function initialReveal(callback) {
  let tl = gsap.timeline();
  tl.preloaderInitial();
  tl = PageReveal.init(tl);
}

/*--------------------------------------------------
  12. Parallax
---------------------------------------------------*/

function parallaxInit() {
  if (!document.querySelector('[data-parallax]')) {
    return;
  }
  
  const target = document.querySelectorAll('[data-parallax]');

  target.forEach(el => {
    const value = el.getAttribute('data-parallax');

    jarallax(el, {
      speed: value,
      imgElement: '[data-parallax-target]',
    });
  });
}

/*--------------------------------------------------
  17. PJAX
---------------------------------------------------*/

const PJAX = (function() {
  function initNewPage(data) {
    return new Promise((resolve) => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;

      App.SMcontroller.destroy(true);
      App.SMcontroller = new ScrollMagic.Controller();

      if (App.config.cursorFollower.enabled) {
        Cursor.leaveHandler();
        Cursor.clear();
        Cursor.update();
      }

      initComponents();
      resolve(true);
    });
  }

  const generalTransition = {
    name: 'generalTransition',

    leave: (data) => {
      return new Promise((resolve) => {
        gsap.timeline()
          .preloaderShow()
          .add(() => {
            resolve(true);
          })
      });
    },

    enter: (data) => {
      return new Promise((resolve) => {
        initNewPage(data).then(() => resolve(true));
      });
    },

    afterEnter: (data) => {
      return new Promise((resolve) => {
        let tl = gsap.timeline();
        tl.preloaderHide();
        tl = PageReveal.init(tl);
        tl.add(() => {
          resolve(true);
        });
      });
    }
  }

  function init() {
    if (!document.body.hasAttribute('data-barba')) return;

    barba.init({
      sync: true,
      timeout: 10000,
      prevent: ({ el }) => {

				// element doesn't has attribute
        if (!el.hasAttribute('data-barba')) return true;

				// element is anchor
				if (el.getAttribute('href').indexOf('#') > -1) return true;

				// elementor preview
				if (typeof elementor === 'object') return true;

      },
      transitions: [
        generalTransition,
      ],
    });
  }

  return {
    init: init,
  }
})();

/*--------------------------------------------------
  02. Preloader
---------------------------------------------------*/

const Preloader = (function() {

  const preloader = document.querySelector('.js-preloader');
  const bg = preloader.querySelector('.preloader__bg');
  const progress = preloader.querySelector('.preloader__progress');
  const progressInner = preloader.querySelector('.preloader__progress__inner');

  function initial() {

    gsap.registerEffect({
      name: 'preloaderInitial',
      effect: (target, config) => {

        document.documentElement.classList.add('html-overflow-hidden');
        const tl = gsap.timeline();

        if (!document.body.classList.contains('preloader-visible')) {
          document.documentElement.classList.remove('html-overflow-hidden');
          return tl;
        }
        
        return tl
          .fromTo(progressInner, {
            scaleY: 0,
          }, {
            scaleY: 1,
            ease: 'none',
            duration: 1,
            delay: 0.3,
            onStart: () => {
              bg.classList.add('origin-top');
            }
          })
          .to(progress, {
            duration: 0.5,
            ease: 'quart.inOut',
            opacity: 0,
            scale: 0.75,
          }, '>-0.1')
          .to(bg, {
            ease: 'quart.inOut',
            duration: 0.6,
            scaleY: 0,
            onComplete: () => {
              document.documentElement.classList.remove('html-overflow-hidden');
            },
          }, '>-0.5')

      },
      extendTimeline: true,
    });

  }

  function show() {

    gsap.registerEffect({
      name: 'preloaderShow',
      effect: (target, config) => {
    
        const tl = gsap.timeline();

        if (!preloader) {
          return tl;
        }
    
        tl
          .set(progress, {
            opacity: 0,
            scale: 0.75,
          })
          .set(progressInner, {
            scaleY: 0,
          })
    
          .to(bg, {
            ease: 'quart.inOut',
            duration: 0.6,
            scaleY: 1,
            onStart: () => {
              bg.classList.remove('origin-top');
              document.documentElement.classList.add('html-overflow-hidden');
            },
          })
          .to(progress, {
            delay: 0.1,
            duration: 0.6,
            ease: 'quart.out',
            opacity: 1,
            scale: 1,
          })
          .to(progressInner, {
            scaleY: 1,
            duration: 1,
            ease: 'none',
          }, '>-0.3')
    
    
        return tl;
    
      },
      extendTimeline: true,
    });

  }
  
  function hide() {

    gsap.registerEffect({
      name: 'preloaderHide',
      effect: (target, config) => {
    
        const tl = gsap.timeline();

        return tl
          .to(progress, {
            delay: 0.15,
            duration: 0.5,
            ease: 'quart.inOut',
            opacity: 0,
            scale: 0.75,
            onStart: () => {
              bg.classList.add('origin-top');
            }
          })
          .to(bg, {
            ease: 'quart.inOut',
            duration: 0.6,
            scaleY: 0,
            onComplete: () => {
              document.documentElement.classList.remove('html-overflow-hidden');
              document.documentElement.classList.remove('overflow-hidden');
              document.body.classList.remove('overflow-hidden');
            },
          }, '>-0.5')
    
      },
      extendTimeline: true,
    });

  }

  function init() {

    if (!preloader) return;

    initial();
    show();
    hide();

  }

  return {
    init: init,
  }

})();

/*--------------------------------------------------
  06. Elements reveal
---------------------------------------------------*/

const RevealAnim = (function() {
  function single() {
    const animationTarget = document.querySelectorAll('[data-anim]');
    if (!animationTarget.length) return;

    for (let i = 0; i < animationTarget.length; i++) {
      const el = animationTarget[i];
    
      new ScrollMagic.Scene({
        offset: '200px',
        triggerElement: el,
        triggerHook: "onEnter",
        reverse: false,
      })
      .on('enter', function (event) {
        animateElement(el);
      })
      .addTo(App.SMcontroller)
    }
  }
  
  function container() {
  
    const animationContainer = document.querySelectorAll('[data-anim-wrap]');
  
    if (!animationContainer.length) {
      return;
    }
    
    for (let i = 0; i < animationContainer.length; i++) {
      const el = animationContainer[i];
    
      new ScrollMagic.Scene({
        offset: '200px',
        triggerElement: el,
        triggerHook: "onEnter",
        reverse: false,
      })
      .on('enter', function (event) {
        
        const animChilds = el.querySelectorAll('[data-anim-child]');
        el.classList.add('animated');
        animChilds.forEach(el => animateElement(el));
        
      })
      .addTo(App.SMcontroller)
    }
  
  }
  

  function animateElement(target) {
    
    let attrVal;
    let animDelay;
    let attrDelayPart;
  
    if (target.getAttribute('data-anim')) {
      attrVal = target.getAttribute('data-anim');
    } else {
      attrVal = target.getAttribute('data-anim-child');
    }
    
    if (attrVal.includes('delay-')) {
      attrDelayPart = attrVal.split(' ').pop();
      animDelay = attrDelayPart.substr(attrDelayPart.indexOf('-') + 1) / 10;
    }
  
    if (attrVal.includes('counter')) {
      counter(target, animDelay);
    }
    else if (attrVal.includes('line-chart')) {
      lineChart(target, animDelay);
    }
    else if (attrVal.includes('pie-chart')) {
      pieChart(target, animDelay);
    }
    else if (attrVal.includes('split-lines')) {
      splitLines(target, animDelay);
    }
    else {
      target.classList.add('is-in-view');
    }

  }

  function pieChart(target, animDelay = 0) {
  
    const counterVal = target.getAttribute('data-percent');
    const chartBar = target.querySelector('.js-chart-bar');
    
    if (counterVal < 0) { counterVal = 0;}
    if (counterVal > 100) { counterVal = 100;}
    
    gsap.fromTo(chartBar, {
      drawSVG: `0%`,
    }, {
      delay: 0.3 + animDelay,
      duration: 1.4,
      ease: 'power3.inOut',
      drawSVG: `${counterVal}%`,
  
      onStart: () => {
        chartBar.classList.remove('bar-stroke-hidden');
      }
    });
  
  
    let object = { count: 0 };
    const barPercent = target.querySelector('.js-chart-percent');
  
    gsap.to(object, {
      count: counterVal,
      delay: 0.45 + animDelay,
      duration: 1,
      ease: 'power3.inOut',
      
      onUpdate: function() {
        barPercent.innerHTML = Math.round(object.count) + '%';
      },
    });
  
  }
  
  function lineChart(target, animDelay = 0) {
  
    const counterVal = target.getAttribute('data-percent');
  
    gsap.fromTo(target.querySelector('.js-bar'), {
      scaleX: 0,
    }, {
      delay: 0.45 + animDelay,
      duration: 1,
      ease: 'power3.inOut',
      scaleX: counterVal / 100,
    })
  
  
    let object = { count: 0 };
    const barPercent = target.querySelector('.js-number');
  
    gsap.to(object, {
      count: counterVal,
      delay: 0.45 + animDelay,
      duration: 1,
      ease: 'power3.inOut',
      
      onUpdate: function() {
        barPercent.innerHTML = Math.round(object.count);
      },
    });
  
  }
  
  function counter(target, animDelay = 0) {
  
    const counterVal = target.getAttribute('data-counter');
    const counterAdd = target.getAttribute('data-counter-add');
    const totalDelay = animDelay;
    let symbols = '';
    
    let object = { count: 0 };
    const counterNum = target.querySelector('.js-counter-num');

    if (counterAdd) {
      symbols = counterAdd;
    }
  
    gsap.to(object, {
      count: counterVal,
      delay: totalDelay,
      duration: 1.8,
      ease: 'power3.inOut',
      
      onUpdate: function() {
        counterNum.innerHTML = Math.round(object.count) + symbols;
      },
    });
  
  }
  
  function splitLines(target, animDelay = 0) {
  
    const lines = target.querySelectorAll('.split__line');

    gsap.to(lines, {
      delay: animDelay,
      stagger: 0.05,
      duration: 1.2,
      ease: 'power2.out',
      y: '0%',
    });
  
  }


  function init() {

    single();
    container();

  }


  return {
    init: init,
  }
})();


function splitTextIntoLines() {
  
  let target;

  if (App.body.classList.contains('page-reveal-off')) {
    target = document.querySelectorAll("[data-split='lines']:not([data-split-page-reveal])");
  } else {
    target = document.querySelectorAll("[data-split='lines']");
  }

  if (!target.length) return;

  target.forEach(el => {
    let content;
    let test = el.querySelectorAll('* > *:not(br):not(span)');

    if (test.length > 0) {
      content = el.querySelectorAll('* > *:not(br):not(span)');
    }

    new SplitText(content, {
      type: 'lines',
      linesClass: 'overflow-hidden',
    });

    content.forEach(el => {
      const lines = el.querySelectorAll('.overflow-hidden');

      new SplitText(lines, {
        type: 'lines',
        linesClass: 'split__line',
      });
    });

    gsap.set(el.querySelectorAll('.split__line'), {
      y: '100%',
    })
  });

}


function splitIntoLines(target) {
  if (!target) return;

  let content;
  let test = target.querySelectorAll('* > *:not(br):not(span)');

  if (test.length > 0) {
    content = target.querySelectorAll('* > *:not(br):not(span)');
  }

  new SplitText(content, {
    type: 'lines',
    linesClass: 'overflow-hidden',
  });

  content.forEach(el => {
    const lines = el.querySelectorAll('.overflow-hidden');

    new SplitText(lines, {
      type: 'lines',
      linesClass: 'split__line',
    });
  });

  gsap.set(target.querySelectorAll('.split__line'), {
    y: '100%',
  })
}

/*--------------------------------------------------
  16. Scroll to id
---------------------------------------------------*/

function scrollToIdInit() {
  const targets = document.querySelectorAll('.js-scroll-to-id');
  if (!targets.length) return;

  targets.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const id = el.getAttribute('href');
      const destination = document.querySelector(`#${id.slice(1)}`);

      if (document.querySelector('.is-pin-active'))
        document.querySelector('.is-pin-active').classList.remove('is-pin-active')
        el.classList.add('is-pin-active')

      gsap.to(window.document.documentElement, {
        duration: 0.8,
        ease: 'power2.out',
        scrollTo: destination.offsetTop - 150,
      });
    })
  });
}

/*--------------------------------------------------
  08. Section sliders
---------------------------------------------------*/

function SectionSlider() {
  const sectionSlider = document.querySelectorAll('.js-sectionSlider');

  if (!sectionSlider.length) return;

  for (let i = 0; i < sectionSlider.length; i++) {
    const el = sectionSlider[i];
    
    let gap = 0;
    let loop = false;
    let centered = false;
    let pagination = false;
    let scrollbar = false;

    if (el.getAttribute('data-gap'))    gap = el.getAttribute('data-gap');
    if (el.hasAttribute('data-loop'))   loop = true;
    if (el.hasAttribute('data-center')) centered = true;

    if (el.hasAttribute('data-pagination')) {
      pagination = {
        el: el.querySelector('.js-pagination'),
        bulletClass: 'pagination__item',
        bulletActiveClass: 'is-active',
        bulletElement: 'div',
        clickable: true
      };
    }

    if (el.hasAttribute('data-scrollbar')) {
      scrollbar = {
        el: '.js-scrollbar',
        draggable: false,
      }
    }
   
    const colsArray = el.getAttribute('data-slider-col').split(' ');

    let cols_base = 1;
    let cols_lg = 1;
    let cols_md = 1;
    let cols_sm = 1;

    colsArray.forEach(el => {
      if (el.includes('base')) cols_base = el.slice(-1);
      if (el.includes('lg')) cols_lg = el.slice(-1);
      if (el.includes('md')) cols_md = el.slice(-1);
      if (el.includes('sm')) cols_sm = el.slice(-1);
    });

    new Swiper(el, {
      speed: 800,
      autoHeight: true,
      spaceBetween: parseInt(gap),
      centeredSlides: centered,
      parallax: true,
      watchSlidesVisibility: true,
      loop: loop,
      loopAdditionalSlides: 1,
      preloadImages: false,
      lazy: true,
      
      scrollbar: scrollbar,
      pagination: pagination,

      slidesPerView: parseInt(cols_base),
      breakpoints: {
        1199: { slidesPerView: parseInt(cols_lg) },
        991:  { slidesPerView: parseInt(cols_md) },
        767:  { slidesPerView: parseInt(cols_sm) },
      },
      lazy: {
        loadPrevNext: true,
      },
      navigation: {
        prevEl: el.querySelector('.js-prev'),
        nextEl: el.querySelector('.js-next'),
      },
    });
  }
}

/*--------------------------------------------------
  11. Lazy loading
---------------------------------------------------*/

function lazyLoading() {
  if (!document.querySelector('.js-lazy')) {
    return;
  }

  new LazyLoad({
    elements_selector: ".js-lazy",
  });
}

const Tabs = (function() {
  function init() {
    const targets = document.querySelectorAll(".js-tabs");
    if (!targets) return;

    targets.forEach(el => {
      singleTab(el)
    })
  }

  function singleTab(target) {
    const controls = target.querySelector('.js-tabs-controls');
    const controlsItems = target.querySelectorAll('.js-tabs-controls .js-tabs-button');
    const content = target.querySelector('.js-tabs-content');

    for (let l = 0; l < controlsItems.length; l++) {
      const el = controlsItems[l];
      
      el.addEventListener("click", (e) => {
        const selector = el.getAttribute('data-tab-target');

        controls.querySelector('.is-active').classList.remove('is-active')
        content.querySelector('.is-active').classList.remove('is-active')

        el.classList.add('is-active')
        content.querySelector(selector).classList.add('is-active')
      });
    }
  }

  return {
    init: init,
  }
})();

})();
