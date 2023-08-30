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
        const $container = $(event.target)
          .parents(".expandable")
          .first();
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
      $("a", context)
        .once("Drupal.behaviors.litsThemeLinkManager")
        .each((index, a) => {
          // Grab links with a hostname that doesn't match the window location
          if (
            a.hostname &&
            window.location.hostname.length &&
            window.location.hostname !== a.hostname
          ) {
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
              $(
                '<span class="visually-hidden">opens in a new tab</span>'
              ).appendTo($(a));
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
            return (
              $element.is(
                ":input:enabled, a[href], area[href], object, [tabindex]"
              ) && !$element.is(":hidden")
            );
          }
        });

        // if there is a '#' in the URL (someone linking directly to an anchor):
        if (window.location.hash) {
          openAccordion(window.location.hash);
          const scrollMore =
            !!navigator.userAgent.match(/Trident.*rv:11\./) ||
            window.navigator.userAgent.indexOf("Edge") > -1; // IE 11 || Edge
          Drupal.lits_theme.scrollToHash(
            context,
            $(window.location.hash),
            scrollMore
          );
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
    if (!$body.hasClass("alert-active") && false) {
      // focus the element
      Drupal.lits_theme.focusOnElement($anchorTarget);

      // position menu, collapsing the imagebar if needed to prepare to scroll to hash
      Drupal.lits_theme.positionMenu(context, true);

      // now set up the final scroll now that the menu is/should be at an appropriate level of collapsiness for the final anchor position
      let menuHeight = $("#search-toggle-container", context).height();
      // Menubar has different height markers at different page sizes
      if ($(window).width() < 900) {
        menuHeight += $("#menubar", context).height();
      } else {
        menuHeight += $("#menu-background", context).height();
      }

      let toolbarheight = 0;
      if ($body.hasClass("toolbar-fixed")) {
        toolbarheight = 39;
        if (
          $body.hasClass("toolbar-horizontal") &&
          $body.hasClass("toolbar-tray-open")
        ) {
          toolbarheight = 79;
        }
      }
      menuHeight += toolbarheight;

      // offset().top doesn't seem to work reliably in IE11 on page load
      const scrollTop =
        document.getElementById($anchorTarget.attr("id")).offsetTop -
        menuHeight;
      let scrollDelay = 0;
      if (needsScrollDelay) {
        scrollDelay = 1500;
      }
      setTimeout(() => {
        $("html, body").animate(
          {
            // Need both html and body here for cross-browseriness
            scrollTop
          },
          100
        );
      }, scrollDelay);
    }
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
          shibLoginLinks.forEach((a) => {
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
