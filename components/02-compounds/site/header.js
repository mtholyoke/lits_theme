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
          .not("#search-toggle-container") // don't close the search bar unless it's explicitly closed
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
