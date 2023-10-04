
/**
 * @file
 * Functions and behaviors for the system status page
 */

(($, Drupal) => {
  Drupal.lits_theme = Drupal.lits_theme || {}


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
        console.log($(window).width())
        if ($(window).width() >= 900) {
          $toggleExpand.removeClass("toggle-expand--open");
          $menuWrapper.removeClass("main-nav--open").attr("style", "");
        }
        else {
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
      $("#main-nav .main-menu .main-menu__item--root.expandable", context).each(
        (i, element) => {
          const $subMenu = $(element).find(".main-submenu--wrapper");
          $subMenu.css("margin-left", "");
        }
      );
      return;
    }


    const mainMenuBarPoints = Drupal.lits_theme.mainMenuImportantPoints(context, document.querySelector("#block-lits-theme-mainnavigation"));
    document.querySelectorAll(".main-menu__item--root.expandable").forEach((menuContainer) => {
      const button = menuContainer.querySelector(":scope button");
      const menu = menuContainer.querySelector(":scope .main-submenu--wrapper");

      // reset
      menu.style.marginLeft = 0;
    
      // positioning for display:none is terrible, so
      if (! menuContainer.classList.contains("expandable--open")) {
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
      "width": element.getBoundingClientRect().width
      , "left": element.getBoundingClientRect().x
      , "right": element.getBoundingClientRect().x + element.getBoundingClientRect().width
      , "midpoint": element.getBoundingClientRect().width / 2
    };
  };

})(jQuery, Drupal);
