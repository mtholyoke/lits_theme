/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 1 */
/***/ (function() {

/**
 * @file
 * Functions and behaviors for the header of every page.
 */

(($, Drupal) => {
  Drupal.lits_theme = Drupal.lits_theme || {};
  const openAccordion = hash => {
    let element;
    if (hash.indexOf("button") >= 0) {
      element = document.getElementById(hash.toString().slice(1));
    } else {
      element = document.getElementById(`${hash.toString().slice(1)}-button`);
    }
    if (element && element.getAttribute("aria-expanded") === "false") {
      element.click();
    }
  };

  /**
   * Empowers the buttons to toggle visibility of expandable elements.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Listen for clicks on expandable elements and call the toggle function.
   */
  Drupal.behaviors.litsThemeExpandableHandler = {
    attach: context => {
      const $buttons = $(".expandable button", context);
      $buttons.click(event => {
        const $container = $(event.target).parents(".expandable").first();
        Drupal.lits_theme.toggleExpandable($container);
      });
    }
  };

  /**
   * Adds rel="noopener", a11y hidden text, and a CSS class to non-LITS links.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Adds rel="noopener", a11y hidden text, and a CSS class to non-LITS links.
   */
  Drupal.behaviors.litsThemeLinkManager = {
    attach: context => {
      $("a", context).each((index, a) => {
        // Grab links with a hostname that doesn't match the window location
        if (a.hostname && window.location.hostname.length && window.location.hostname !== a.hostname) {
          // just in case we want to automagically target these later for
          // some reason
          $(a).addClass("link--external");
        }
        // for links that open in new tabs
        if ($(a).attr("target") && $(a).attr("target") === "_blank") {
          // add rel="noopener" to external links to close security hole
          // @see https://developers.google.com/web/tools/lighthouse/audits/noopener
          if (!$(a).attr("rel") || $(a).attr("rel").length === 0) {
            $(a).attr("rel", "noopener");
          }
          // Add a11y text if missing
          if ($(a).find("span.visually-hidden").length === 0) {
            $('<span class="visually-hidden">opens in a new tab</span>').appendTo($(a));
          }
        }
      });
    }
  };

  /**
   * Fix focus for skip links and other within-page links.
   *
   * Adapted from https://github.com/selfthinker/dokuwiki_template_writr/blob/master/js/skip-link-focus-fix.js
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Focuses on element linked to/activated by id
   */
  Drupal.behaviors.litsThemeLinkFocusManager = {
    attach: context => {
      $(window).on("load", () => {
        // Extend the definition of :focusable to include more elements than the default (I think?)
        $.extend($.expr[":"], {
          focusable(el) {
            const $element = $(el, context);
            return $element.is(":input:enabled, a[href], area[href], object, [tabindex]") && !$element.is(":hidden");
          }
        });

        // if there is a '#' in the URL (someone linking directly to an anchor):
        if (window.location.hash) {
          openAccordion(window.location.hash);
          const scrollMore = !!navigator.userAgent.match(/Trident.*rv:11\./) || window.navigator.userAgent.indexOf("Edge") > -1; // IE 11 || Edge\
          Drupal.lits_theme.scrollToHash(context, $(window.location.hash), scrollMore);
        }
      });

      // on click, determine if an anchor and scroll to hash
      $(window).click(event => {
        // Determine if the clicked element is an anchor, and if so which.
        event = event || window.event;
        let clickTarget = event.target || event.srcElement;
        let $anchorTarget = null;
        while (clickTarget) {
          if (clickTarget instanceof HTMLAnchorElement) {
            let href = clickTarget.getAttribute("href");
            if (href && href.charAt(0) === "#" && href.length > 1) {
              $anchorTarget = $(href);
            }
            break;
          }
          clickTarget = clickTarget.parentNode;
        }
        if ($anchorTarget === null || $anchorTarget.length === 0) {
          return;
        }

        // Scroll to hash
        openAccordion(window.location.hash);
        Drupal.lits_theme.scrollToHash(context, $anchorTarget, false);
      });
      $(window).on("hashchange", () => {
        if (window.location.hash) {
          openAccordion(window.location.hash);
          Drupal.lits_theme.scrollToHash(context, $(window.location.hash), false);
        }
      });
    }
  };

  /**
   * Scrolls to hash
   *
   * @param {object} context
   *   The scoping context provided by Drupal.
   */
  Drupal.lits_theme.scrollToHash = (context, $anchorTarget, needsScrollDelay) => {
    if ($anchorTarget.attr("id").startsWith("s-lib")) {
      // This is LibGuides HTML and that means it's not worth trying to mess with it
      return;
    }
    // const $body = $("body", context);
    // // focus the element
    console.log($anchorTarget);
    Drupal.lits_theme.focusOnElement($anchorTarget);
    var scrollToElement = document.getElementById($anchorTarget.attr("id"));
    if (document.getElementById($anchorTarget.attr("id") + "-button")) {
      // Then this is an accordionish thing, and scrolling to the toggle is better
      scrollToElement = document.getElementById($anchorTarget.attr("id") + "-button");
    }
    console.log(scrollToElement);
    // offset().top doesn't seem to work reliably in IE11 on page load
    const scrollTop = scrollToElement.offsetTop;
    let scrollDelay = 0;
    if (needsScrollDelay) {
      scrollDelay = 1500;
    }
    setTimeout(() => {
      $("html, body").animate({
        // Need both html and body here for cross-browseriness
        scrollTop
      }, 100);
    }, scrollDelay);
  };

  /**
   * Toggles expandable elements of the DOM in response to button click.
   *
   * @param {object} $container
   *   The jQuery object that contains a button and a content element.
   * @param {string} action
   *   One of 'open', 'close', or (default) 'toggle'.
   */
  Drupal.lits_theme.toggleExpandable = ($container, action = "toggle") => {
    const isOpen = $container.hasClass("expandable--open");
    if (isOpen && action === "toggle") {
      action = "close";
    }
    const $button = $container.find("button");
    const $content = $container.find(`#${$button.attr("aria-controls")}`);
    let callback = null;
    if ($container.attr("id") === "search-toggle-container") {
      callback = Drupal.lits_theme.positionMenu;
    }
    if (action === "close") {
      $button.attr("aria-expanded", "false").attr("aria-pressed", "false");
      $("header").css("overflow", "hidden");
      $content.attr("aria-hidden", "true").slideUp(400, () => {
        $container.removeClass("expandable--open");
        $("header").css("overflow", "auto");
        if (callback != null) {
          callback.call($(document), false);
        }
      });
    } else {
      $button.attr("aria-expanded", "true").attr("aria-pressed", "true");
      $("header").css("overflow", "hidden");
      $content.attr("aria-hidden", "false").slideDown(400, () => {
        $("header").css("overflow", "auto");
        if (callback != null) {
          callback.call($(document), false);
        }
      });
      // Don't wait for it to finish sliding before assigning open
      // class/positioning to avoid the content visibly rearranging
      $container.addClass("expandable--open");
    }
  };

  /**
   * Fix focus for skip links and other within-page links.
   *
   * Adapted from https://github.com/selfthinker/dokuwiki_template_writr/blob/master/js/skip-link-focus-fix.js
   *
   * Focuses on an element
   *
   * @param {object} $element
   *   The jQuery object that should receive focus
   * @param {string} action
   *   One of 'open', 'close', or (default) 'toggle'.
   */
  Drupal.lits_theme.focusOnElement = $element => {
    if (!$element.length) {
      return;
    }
    if (!$element.is(":focusable")) {
      // Add tabindex to make focusable and remove again.
      $element.attr("tabindex", -1).on("blur focusout", () => {
        $(this).removeAttr("tabindex");
      });
    }
    $element.focus();
  };

  /**
   * Add returnTo to the Shib login link in the footer
   *   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Focuses on element linked to/activated by id
   */
  Drupal.behaviors.litsThemeShibLoginLink = {
    attach: context => {
      var shibLoginLinks = document.querySelectorAll("#block-lits-theme-shibloginlink a");
      var currentPath = location.pathname.substr(1);
      if (currentPath && currentPath != '') {
        shibLoginLinks.forEach(a => {
          a.href = a.href + '?returnTo=' + currentPath;
        });
      }
    }
  };

  /**
   * Expand study space filters if the window is desktop-sized
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Adjusts collapsiness of the filters
   */
  Drupal.behaviors.litsThemeStudySpaceFilterSize = {
    attach: context => {
      const $studySpaceFinderContainer = $(".study-space-finder", context);
      const windowWidth = $(window).width();
      if ($studySpaceFinderContainer.length > 0 && windowWidth >= 900) {
        $(window).on("load", () => {
          // Change toggle expandable
          $studySpaceFinderContainer.toggleClass("expandable--open");
          // Toggle aria-expanded and aria-pressed for button
          $(".filters-title button", context).attr("aria-expanded", "true");
          $(".filters-title button", context).attr("aria-pressed", "true");
          // Show options and toggle aria
          $(".filter-options", context).attr("style", "");
          $(".filter-options", context).attr("aria-hidden", "false");
        });
      }
    }
  };
})(jQuery, Drupal);

/***/ }),
/* 2 */
/***/ (() => {

/**
 * @file
 * Functions and behaviors for the header of every page.
 */

(($, Drupal) => {
  Drupal.lits_theme = Drupal.lits_theme || {};

  /**
   * Hides hours and main menu closables on click elsewhere.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Listen for clicks and close any non-accordions that are open.
   */
  Drupal.behaviors.litsThemeClosableHandler = {
    attach: context => {
      const $document = $(document, context);
      $document.click(event => {
        const $closest = $(event.target).closest(".expandable");
        const $expandables = $(".expandable--open").not(".accordion").not("#search-toggle-container") // don't close the search bar unless it's explicitly closed
        .not($closest);
        if ($expandables.length) {
          $expandables.each((i, element) => {
            Drupal.lits_theme.toggleExpandable($(element), "close");
          });
        }
      });
    }
  };
})(jQuery, Drupal);

/***/ }),
/* 3 */
/***/ (() => {

/**
 * @file
 * A JavaScript file containing the functionality for header elements.
 *
 * Adapted from http://simplyaccessible.com/article/danger-aria-tabs/
 */

(($, Drupal) => {
  /**
   * Controls tabs for the Tab Group paragraph type.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Listen for clicks and close any non-accordions that are open.
   */
  Drupal.behaviors.litsThemeTabGroupHandler = {
    attach: context => {
      const $tabLists = $(".tab-group ul.tabs__nav", context);
      const $tabLinks = $tabLists.find("a");
      $tabLinks.click(event => {
        const $target = $(event.target);
        const $tabGroup = $target.parents("div.tab-group").first();
        const $tabsList = $tabGroup.find("ul.tabs__nav");

        // Turn off the previous tab.
        $tabsList.find("li.tabs__item--open").removeClass("tabs__item--open").find("a").attr("aria-selected", "false").removeClass("is-active");
        $tabGroup.find(".tabs__content--open").removeClass("tabs__content--open").attr("aria-hidden", "true").children("h2").attr("tabindex", -1);

        // Turn on the new tab.
        $target.attr("aria-selected", "true").addClass("is-active");
        $target.parents(".tabs__item").first().addClass("tabs__item--open");
        $tabGroup.find(`${$target.attr("href")}__content`).attr("aria-hidden", "false").addClass("tabs__content--open").children("h2").attr("tabindex", 0).focus();

        // Don’t move the browser window.
        return false;
      });

      // Handle keyboard navigation through tabs.
      $tabLists.delegate("a", "keydown", event => {
        const $tab = $(event.target);
        const $tabs = $tab.parents(".tabs__nav").first();
        switch (event.key) {
          case "ArrowLeft":
            if ($tab.parent().prev().length !== 0) {
              $tab.parent().prev().find("> a").click();
            } else {
              $tabs.find("li:last > a").click();
            }
            break;
          case "ArrowRight":
            if ($tab.parent().next().length !== 0) {
              $tab.parent().next().find("> a").click();
            } else {
              $tabs.find("li:first > a").click();
            }
            break;
          default:
            break;
        }
      });
    }
  };
})(jQuery, Drupal);

/***/ }),
/* 4 */
/***/ (() => {

/**
 * @file
 * Functions and behaviors for the system status page
 */

(($, Drupal) => {
  Drupal.lits_theme = Drupal.lits_theme || {};

  /**
   * Prints out the page load time.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Print out the page load time.
   */
  Drupal.behaviors.litsThemeSystemStatusLoaded = {
    attach: context => {
      const $lastLoadedElement = $("#last-loaded", context);
      const dayOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      const timeOptions = {
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short"
      };
      if ($lastLoadedElement.length > 0) {
        const lastLoaded = new Date();
        const llDate = lastLoaded.toLocaleDateString("en-US", dayOptions);
        const llTime = lastLoaded.toLocaleTimeString("en-US", timeOptions);
        $lastLoadedElement.append(`<span>${llDate} at ${llTime}</span>`);
      }
    }
  };
})(jQuery, Drupal);

/***/ }),
/* 5 */
/***/ (() => {

/**
 * @file
 * Functions and behaviors for the system status page
 */

(($, Drupal) => {
  Drupal.lits_theme = Drupal.lits_theme || {};

  /**
   * Toggles the visibility of the main menu on mobile.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Calls the resize function on window resize.
   */
  Drupal.behaviors.litsThemeMainMenuMobile = {
    attach: context => {
      const $toggleExpand = $("#main-menu-toggle-expand", context);
      const $menuWrapper = $("#main-nav", context);
      $toggleExpand.click(() => {
        $toggleExpand.toggleClass("toggle-expand--open");
        $menuWrapper.toggleClass("main-nav--open").slideToggle();
      });
      $(window).resize(() => {
        if ($(window).width() >= 900) {
          $toggleExpand.removeClass("toggle-expand--open");
          $menuWrapper.removeClass("main-nav--open").attr("style", "");
        } else {
          numOpenMenus = document.querySelectorAll(".main-menu__item--root.expandable--open").length;
          if (numOpenMenus > 0) {
            $toggleExpand.addClass("toggle-expand--open");
            $menuWrapper.addClass("main-nav--open").show();
          }
        }
      });
    }
  };

  /**
   * Makes sure that the Research and Places submenus stay on the screen.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Calls the resize function on DOM ready and window resize.
   */
  Drupal.behaviors.litsThemeMainMenuDropdownPositioning = {
    attach: context => {
      Drupal.lits_theme.mainMenuDropdownPositioning(context);
      $(window).resize(() => {
        Drupal.lits_theme.mainMenuDropdownPositioning(context);
      });
    }
  };

  /**
   * Makes sure that the Research and Places submenus stay on the screen.
   *
   * @param {object} context
   *   The scoping context provided by Drupal.
   */
  Drupal.lits_theme.mainMenuDropdownPositioning = (context, event) => {
    // Position the submenus for the middle menu items in a centered location
    // below their parent
    const $body = $("body", context);
    if ($(window).width() < 900) {
      $("#main-nav .main-menu .main-menu__item--root.expandable", context).each((i, element) => {
        const $subMenu = $(element).find(".main-submenu--wrapper");
        $subMenu.css("margin-left", "");
      });
      return;
    }
    const mainMenuBarPoints = Drupal.lits_theme.mainMenuImportantPoints(context, document.querySelector("#block-lits-theme-mainnavigation"));
    document.querySelectorAll(".main-menu__item--root.expandable").forEach(menuContainer => {
      const button = menuContainer.querySelector(":scope button");
      const menu = menuContainer.querySelector(":scope .main-submenu--wrapper");

      // reset
      menu.style.marginLeft = 0;

      // positioning for display:none is terrible, so
      if (!menuContainer.classList.contains("expandable--open")) {
        // set to show but invisible because positioning is annoying
        menu.style.visibility = "hidden";
        menu.style.display = "block";
      }

      // Find the button and menu in space
      const buttonPoints = Drupal.lits_theme.mainMenuImportantPoints(context, button);
      var menuPoints = Drupal.lits_theme.mainMenuImportantPoints(context, menu);

      // Center below the button
      const buttonMidX = buttonPoints.left + buttonPoints.midpoint;
      const menuMidX = menuPoints.left + menuPoints.midpoint;
      var offset = buttonMidX - menuMidX;
      menu.style.marginLeft = `${offset}px`;

      // Assess whether offscreen and further adjust as needed
      menuPoints = Drupal.lits_theme.mainMenuImportantPoints(context, menu);
      if (menuPoints.left < mainMenuBarPoints.left) {
        offset = offset - menuPoints.left + mainMenuBarPoints.left;
        menu.style.marginLeft = `${offset}px`;
      }
      if (menuPoints.right > mainMenuBarPoints.right) {
        offset = offset - (menuPoints.right - mainMenuBarPoints.right);
        menu.style.marginLeft = `${offset}px`;
      }

      // positioning for display:none is terrible, so
      if (!menuContainer.classList.contains("expandable--open")) {
        // put it back
        menu.style.display = "none";
        menu.style.visibility = "visible";
      }
    });
  };

  /**
   * Finds important points for main menu elements.
   * 
   * This is in jQuery because it gives us sugar that adds a temporary copy of 
   * the element to the DOM so that it can find the real points for the element.
   *
   * @param {object} context
   *   The scoping context provided by Drupal.
   */
  Drupal.lits_theme.mainMenuImportantPoints = (context, element) => {
    return {
      "width": element.getBoundingClientRect().width,
      "left": element.getBoundingClientRect().x,
      "right": element.getBoundingClientRect().x + element.getBoundingClientRect().width,
      "midpoint": element.getBoundingClientRect().width / 2
    };
  };
})(jQuery, Drupal);

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_modules__[0](0, {}, __webpack_require__);
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_modules__[1](0, {}, __webpack_require__);
/******/ 	__webpack_modules__[2](0, {}, __webpack_require__);
/******/ 	__webpack_modules__[3](0, {}, __webpack_require__);
/******/ 	__webpack_modules__[4](0, {}, __webpack_require__);
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__[5](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=lits_theme.js.map