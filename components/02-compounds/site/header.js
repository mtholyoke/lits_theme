/**
 * @file
 * Functions and behaviors for the header of every page.
 */

(($, Drupal) => {
  Drupal.lits_theme = Drupal.lits_theme || {};

  // /**
  //  * Hides hours and main menu closables on click elsewhere.
  //  *
  //  * @type {Drupal~behavior}
  //  *
  //  * @prop {Drupal~behaviorAttach} attach
  //  *   Listen for clicks and close any non-accordions that are open.
  //  */
  // Drupal.behaviors.litsThemeClosableHandler = {
  //   attach: context => {
  //     const $document = $(document, context);
  //     $document.click(event => {
  //       const $closest = $(event.target).closest(".expandable");
  //       const $expandables = $(".expandable--open")
  //         .not(".accordion")
  //         .not("#search-toggle-container")
  //         .not($closest);
  //       if ($expandables.length) {
  //         $expandables.each((i, element) => {
  //           Drupal.lits_theme.toggleExpandable($(element), "close");
  //         });
  //       }
  //     });
  //   }
  // };

  // /**
  //  * Makes sure that the Research and Places submenus stay on the screen.
  //  *
  //  * @type {Drupal~behavior}
  //  *
  //  * @prop {Drupal~behaviorAttach} attach
  //  *   Calls the resize function on DOM ready and window resize.
  //  */
  // Drupal.behaviors.litsThemeMainMenuDropdownPositioning = {
  //   attach: context => {
  //     // attach() is fired by drupal.js inside a $(document).ready()
  //     Drupal.lits_theme.mainMenuDropdownPositioning(context);

  //     $(window).resize(() => {
  //       Drupal.lits_theme.mainMenuDropdownPositioning(context);
  //     });
  //   }
  // };

  // /**
  //  * Toggles the visibility of the main menu on mobile.
  //  *
  //  * @type {Drupal~behavior}
  //  *
  //  * @prop {Drupal~behaviorAttach} attach
  //  *   Calls the resize function on window resize.
  //  */
  // Drupal.behaviors.litsThemeMainMenuMobile = {
  //   attach: context => {
  //     const $toggleExpand = $("#main-menu-toggle-expand", context);
  //     const $menuWrapper = $("#main-nav", context);
  //     $toggleExpand.click(() => {
  //       $toggleExpand.toggleClass("toggle-expand--open");
  //       $menuWrapper.toggleClass("main-nav--open").slideToggle();
  //     });
  //     $(window).resize(() => {
  //       if ($(window).width() >= 900) {
  //         $toggleExpand.removeClass("toggle-expand--open");
  //         $menuWrapper.removeClass("main-nav--open").attr("style", "");
  //       }
  //     });
  //   }
  // };

  // /**
  //  * Makes the menubar sticky on scroll.
  //  *
  //  * @type {Drupal~behavior}
  //  *
  //  * @prop {Drupal~behaviorAttach} attach
  //  *   Tests the current amount of scroll and assigns a sticky class.
  //  */
  // Drupal.behaviors.litsThemeStickyHeader = {
  //   attach: context => {
  //     Drupal.lits_theme.positionMenu(context, false);

  //     $(document).scroll(() => {
  //       Drupal.lits_theme.positionMenu(context, false);
  //     });

  //     $(window).resize(() => {
  //       Drupal.lits_theme.positionMenu(context, false);
  //     });
  //   }
  // };

  // /**
  //  * Makes sure that the Research and Places submenus stay on the screen.
  //  *
  //  * @param {object} context
  //  *   The scoping context provided by Drupal.
  //  */
  // Drupal.lits_theme.mainMenuDropdownPositioning = context => {
  //   // Position the submenus for the middle menu items in a centered location
  //   // below their parent
  //   const $body = $("body", context);
  //   if ($(window).width() < 900) {
  //     $("#main-nav .main-menu .main-menu__item--root.expandable", context).each(
  //       (i, element) => {
  //         const $subMenu = $(element).find(".main-submenu--wrapper");
  //         $subMenu.css("margin-left", "");
  //         if ($body.hasClass("alert-active") && false) {
  //           $subMenu.css("position", "static").css("z-index", "0");
  //         }
  //       }
  //     );
  //     return;
  //   }

  //   // Gather main (parent) menu statistics.
  //   const menuWidth = $("#main-nav .main-menu", context).width();
  //   const numMenuItems = $(
  //     "#main-nav .main-menu .main-menu__item--root.expandable",
  //     context
  //   ).length;

  //   // Iterate over the main (parent) menu containers.
  //   $("#main-nav .main-menu .main-menu__item--root.expandable", context).each(
  //     (i, element) => {
  //       // each() is zero indexed, but for mathy purposes we need to be one indexed
  //       const index = i + 1;

  //       // Calculate the positions of the center and corner of the main (parent) menu item.
  //       const menuItemRight = (index / numMenuItems) * menuWidth;

  //       // Grab the sub menu and find its corners so we can make sure it stays on screen.
  //       const buttonWidth = $(element).width();
  //       const $subMenu = $(element).find(".main-submenu--wrapper");
  //       const subMenuCenter = $subMenu.width() / 2;
  //       const subMenuLeftMargin = -1 * subMenuCenter + buttonWidth / 2;
  //       const subMenuLeft = menuItemRight - buttonWidth + subMenuLeftMargin;
  //       const subMenuRight = subMenuLeft + $subMenu.width();

  //       // Reset before recalculating position.
  //       $subMenu.css("margin-left", "");
  //       if ($body.hasClass("alert-active") && false) {
  //         $subMenu.css("position", "absolute").css("z-index", "2"); // z-index to lift above the control on the select box on LITS search on the homepage
  //       } else {
  //         $subMenu.css("position", "").css("z-index", "");
  //       }

  //       // Decide if either side of the menu would be offscreen by default,
  //       // and if so, place it on the appropriate edge.
  //       if (subMenuLeft < 0) {
  //         // TODO: instead try to figure out offset between 0 and the window left edge?
  //         $subMenu.css("margin-left", 0);
  //         return;
  //       }
  //       if (subMenuRight > menuWidth) {
  //         const overflow = -1 * (subMenuRight - menuWidth);
  //         $subMenu.css("margin-left", overflow + subMenuLeftMargin);
  //         return;
  //       }

  //       // Otherwise, put the submenu in the default centered position.
  //       $subMenu.css("margin-left", subMenuLeftMargin);
  //     }
  //   );
  // };

  // /**
  //  * Positions the main menu according to the current position of main (or
  //  * sticks it to the logobar).
  //  *
  //  * @param {object} context
  //  *   The scoping context provided by Drupal.
  //  * @param {boolean} collapsed
  //  *   Whether the imagebar should just be collapsed or not (relevant for anchor scrolling)
  //  */
  // Drupal.lits_theme.positionMenu = (context, collapsed) => {
  //   const $body = $("body", context);
  //   if (!$body.hasClass("alert-active")) {
  //     // searchbar should have a height equal to the distance to main, with a max of 208px
  //     let top = 0;
  //     if ($("#main-content", context).offset()) {
  //       top = $("#main-content", context).offset().top; //not always defined (eg search result page?)
  //     }
  //     top =
  //       top -
  //       $(window).scrollTop() -
  //       $("#logobar", context).height() -
  //       $("#menu-background", context).height();

  //     if ($(window).width() < 900 || collapsed) {
  //       top = 0;
  //     }
  //     // Drupal toolbar if logged in:
  //     let toolbarheight = 0;
  //     if ($body.hasClass("toolbar-fixed")) {
  //       toolbarheight = 39;
  //       if (
  //         $body.hasClass("toolbar-horizontal") &&
  //         $body.hasClass("toolbar-tray-open")
  //       ) {
  //         toolbarheight = 79;
  //       }

  //       if ($body.hasClass("node-preview-enabled")) {
  //         toolbarheight += $(".node-preview-container", context).height();
  //       }
  //     }
  //     top -= toolbarheight;

  //     if (top < $("#searchbar-background", context).height()) {
  //       top = $("#searchbar-background", context).height();
  //     }

  //     $("#searchbar", context).css("min-height", top);
  //   }
  // };
})(jQuery, Drupal);
