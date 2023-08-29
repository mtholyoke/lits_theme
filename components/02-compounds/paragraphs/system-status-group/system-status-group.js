/**
 * @file
 * Functions and behaviors for the system status page
 */

(($, Drupal) => {
  Drupal.trehub = Drupal.trehub || {};

  /**
   * Prints out the page load time.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Print out the page load time.
   */
  Drupal.behaviors.trehubSystemStatusLoaded = {
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
        const llDate = lastLoaded.toLocaleDateString("en-US", dayOptions)
        const llTime = lastLoaded.toLocaleTimeString("en-US", timeOptions)
        $lastLoadedElement.append(`<span>${llDate} at ${llTime}</span>`);
      }
    }
  };
})(jQuery, Drupal);
