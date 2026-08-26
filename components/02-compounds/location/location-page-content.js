
/**
 * @file
 * Functions and behaviors for the service desk pages
 */

(($, Drupal) => {
  Drupal.lits_theme = Drupal.lits_theme || {}


  /**
   * Sets the aspect ratio for banner images on service desk pages
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Calls the resize function on window resize.
   */
  Drupal.behaviors.litsThemeLocationBannerImage = {
    attach: context => {
      const banners = context.querySelectorAll(".service-desk-banner");
      banners.forEach(banner => {
        const images = banner.querySelectorAll(":scope .location-images img");
        images.forEach((image) => {
          const width = image.getAttribute("width");
          const height = image.getAttribute("height");
          banner.style.cssText = `--aspect-ratio: ${width} / ${height}`;
        });
      });
    }
  };

})(jQuery, Drupal);
