/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function() {

// UNCOMMENT IF DRUPAL - see components/_meta/_01-foot.twig for attachBehaviors
// Drupal.behaviors.accordion = {
//   attach: function (context, settings) {

(() => {
  // REMOVE IF DRUPAL

  // Set 'document' to 'context' if Drupal
  const accordionTerm = document.querySelectorAll(".accordion-term");
  const accordionDef = document.querySelectorAll(".accordion-def");

  // If javascript, hide accordion definition on load
  function jsCheck() {
    for (let i = 0; i < accordionDef.length; i++) {
      if (accordionDef[i].classList) {
        accordionDef[i].classList.add("active");
        accordionDef[0].previousElementSibling.classList.add("is-active");
      } else {
        accordionDef[i].className += " active";
        accordionDef[0].previousElementSibling.classList.add("is-active");
      }
    }
  }
  jsCheck();

  // Accordion Toggle
  // Mobile Click Menu Transition
  for (let i = 0; i < accordionTerm.length; i++) {
    accordionTerm[i].addEventListener("click", e => {
      const className = "is-active";
      // Add is-active class
      if (this.classList) {
        this.classList.toggle(className);
      } else {
        const classes = this.className.split(" ");
        const existingIndex = classes.indexOf(className);
        if (existingIndex >= 0) {
          classes.splice(existingIndex, 1);
        } else {
          classes.push(className);
        }
        this.className = classes.join(" ");
      }
      e.preventDefault();
    });
  }
})(); // REMOVE IF DRUPAL

// UNCOMMENT IF DRUPAL
//   }
// };

/***/ }),
/* 1 */
/***/ (() => {

(() => {
  const el = document.querySelectorAll(".tabs");
  const tabNavigationLinks = document.querySelectorAll(".tabs__link");
  const tabContentContainers = document.querySelectorAll(".tabs__tab");
  let activeIndex = 0;

  /**
   * goToTab
   * @description Goes to a specific tab based on index. Returns nothing.
   * @param {Number} index The index of the tab to go to
   */
  const goToTab = index => {
    if (index !== activeIndex && index >= 0 && index <= tabNavigationLinks.length) {
      tabNavigationLinks[activeIndex].classList.remove("is-active");
      tabNavigationLinks[index].classList.add("is-active");
      tabContentContainers[activeIndex].classList.remove("is-active");
      tabContentContainers[index].classList.add("is-active");
      activeIndex = index;
    }
  };

  /**
   * handleClick
   * @description Handles click event listeners on each of the links in the
   *   tab navigation. Returns nothing.
   * @param {HTMLElement} link The link to listen for events on
   * @param {Number} index The index of that link
   */
  const handleClick = (link, index) => {
    link.addEventListener("click", e => {
      e.preventDefault();
      goToTab(index);
    });
  };

  /**
   * init
   * @description Initializes the component by removing the no-js class from
   *   the component, and attaching event listeners to each of the nav items.
   *   Returns nothing.
   */
  for (let e = 0; e < el.length; e++) {
    el[e].classList.remove("no-js");
  }
  for (let i = 0; i < tabNavigationLinks.length; i++) {
    const link = tabNavigationLinks[i];
    handleClick(link, i);
  }
})();

/***/ }),
/* 2 */
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
        const $expandables = $(".expandable--open").not(".accordion").not("#search-toggle-container").not($closest);
        if ($expandables.length) {
          $expandables.each((i, element) => {
            Drupal.lits_theme.toggleExpandable($(element), "close");
          });
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
      // attach() is fired by drupal.js inside a $(document).ready()
      Drupal.lits_theme.mainMenuDropdownPositioning(context);
      $(window).resize(() => {
        Drupal.lits_theme.mainMenuDropdownPositioning(context);
      });
    }
  };

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
        }
      });
    }
  };

  /**
   * Makes the menubar sticky on scroll.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Tests the current amount of scroll and assigns a sticky class.
   */
  Drupal.behaviors.litsThemeStickyHeader = {
    attach: context => {
      Drupal.lits_theme.positionMenu(context, false);
      $(document).scroll(() => {
        Drupal.lits_theme.positionMenu(context, false);
      });
      $(window).resize(() => {
        Drupal.lits_theme.positionMenu(context, false);
      });
    }
  };

  /**
   * Makes sure that the Research and Places submenus stay on the screen.
   *
   * @param {object} context
   *   The scoping context provided by Drupal.
   */
  Drupal.lits_theme.mainMenuDropdownPositioning = context => {
    // Position the submenus for the middle menu items in a centered location
    // below their parent
    const $body = $("body", context);
    if ($(window).width() < 900) {
      $("#main-nav .main-menu .main-menu__item--root.expandable", context).each((i, element) => {
        const $subMenu = $(element).find(".main-submenu--wrapper");
        $subMenu.css("margin-left", "");
        if ($body.hasClass("alert-active") && false) {}
      });
      return;
    }

    // Gather main (parent) menu statistics.
    const menuWidth = $("#main-nav .main-menu", context).width();
    const numMenuItems = $("#main-nav .main-menu .main-menu__item--root.expandable", context).length;

    // Iterate over the main (parent) menu containers.
    $("#main-nav .main-menu .main-menu__item--root.expandable", context).each((i, element) => {
      // each() is zero indexed, but for mathy purposes we need to be one indexed
      const index = i + 1;

      // Calculate the positions of the center and corner of the main (parent) menu item.
      const menuItemRight = index / numMenuItems * menuWidth;

      // Grab the sub menu and find its corners so we can make sure it stays on screen.
      const buttonWidth = $(element).width();
      const $subMenu = $(element).find(".main-submenu--wrapper");
      const subMenuCenter = $subMenu.width() / 2;
      const subMenuLeftMargin = -1 * subMenuCenter + buttonWidth / 2;
      const subMenuLeft = menuItemRight - buttonWidth + subMenuLeftMargin;
      const subMenuRight = subMenuLeft + $subMenu.width();

      // Reset before recalculating position.
      $subMenu.css("margin-left", "");
      if ($body.hasClass("alert-active") && false) {} else {
        $subMenu.css("position", "").css("z-index", "");
      }

      // Decide if either side of the menu would be offscreen by default,
      // and if so, place it on the appropriate edge.
      if (subMenuLeft < 0) {
        // TODO: instead try to figure out offset between 0 and the window left edge?
        $subMenu.css("margin-left", 0);
        return;
      }
      if (subMenuRight > menuWidth) {
        const overflow = -1 * (subMenuRight - menuWidth);
        $subMenu.css("margin-left", overflow + subMenuLeftMargin);
        return;
      }

      // Otherwise, put the submenu in the default centered position.
      $subMenu.css("margin-left", subMenuLeftMargin);
    });
  };

  /**
   * Positions the main menu according to the current position of main (or
   * sticks it to the logobar).
   *
   * @param {object} context
   *   The scoping context provided by Drupal.
   * @param {boolean} collapsed
   *   Whether the imagebar should just be collapsed or not (relevant for anchor scrolling)
   */
  Drupal.lits_theme.positionMenu = (context, collapsed) => {
    const $body = $("body", context);
    if (!$body.hasClass("alert-active")) {
      // searchbar should have a height equal to the distance to main, with a max of 208px
      let top = 0;
      if ($("#main-content", context).offset()) {
        top = $("#main-content", context).offset().top; //not always defined (eg search result page?)
      }

      top = top - $(window).scrollTop() - $("#logobar", context).height() - $("#menu-background", context).height();
      if ($(window).width() < 900 || collapsed) {
        top = 0;
      }
      // Drupal toolbar if logged in:
      let toolbarheight = 0;
      if ($body.hasClass("toolbar-fixed")) {
        toolbarheight = 39;
        if ($body.hasClass("toolbar-horizontal") && $body.hasClass("toolbar-tray-open")) {
          toolbarheight = 79;
        }
        if ($body.hasClass("node-preview-enabled")) {
          toolbarheight += $(".node-preview-container", context).height();
        }
      }
      top -= toolbarheight;
      if (top < $("#searchbar-background", context).height()) {
        top = $("#searchbar-background", context).height();
      }
      $("#searchbar", context).css("min-height", top);
    }
  };
})(jQuery, Drupal);

/***/ }),
/* 5 */
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
      $("a", context).once("Drupal.behaviors.litsThemeLinkManager").each((index, a) => {
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
          const scrollMore = !!navigator.userAgent.match(/Trident.*rv:11\./) || window.navigator.userAgent.indexOf("Edge") > -1; // IE 11 || Edge
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
    const $body = $("body", context);
    if (!$body.hasClass("alert-active") && false) {}
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

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_modules__[0]();
/******/ 	__webpack_modules__[1]();
/******/ 	__webpack_modules__[2]();
/******/ 	__webpack_modules__[3]();
/******/ 	__webpack_modules__[4]();
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__[5]();
/******/ 	
/******/ })()
;
//# sourceMappingURL=lits_theme_scripts.js.map