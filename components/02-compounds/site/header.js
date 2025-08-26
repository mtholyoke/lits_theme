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
        const $expandables = $(".expandable--open")
          .not(".accordion")
          .not($closest);
        if ($expandables.length) {
          $expandables.each((i, element) => {
            Drupal.lits_theme.toggleExpandable($(element), "close");
          });
        }
      });
    }
  };


  // TODO: should only one be open at a time? Unclear.
  Drupal.behaviors.litsThemeTopnavContainerToggleHandler = {
    attach: context => {
      $('.toggle', context).each(function(index, toggle) {
        $(toggle).click(event => {
          containerId = `#${$(toggle).attr("aria-controls")}`;
          $container = $(containerId);
          $container.slideToggle(400, function() {
            $container.toggleClass("open");
            $(toggle).attr("aria-expanded", function (i, attr) {
              return attr == 'true' ? 'false' : 'true'
            });
            $(toggle).attr("aria-pressed", function (i, attr) {
              return attr == 'true' ? 'false' : 'true'
            });
          });
        });
      });
    }
  };
})(jQuery, Drupal);
