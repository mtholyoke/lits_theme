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
  Drupal.behaviors.trehubTabGroupHandler = {
    attach: context => {
      const $tabLists = $(".tab-group ul.tabs__nav", context);
      const $tabLinks = $tabLists.find("a");
      $tabLinks.click(event => {
        const $target = $(event.target);
        const $tabGroup = $target.parents("div.tab-group").first();
        const $tabsList = $tabGroup.find("ul.tabs__nav");

        // Turn off the previous tab.
        $tabsList
          .find("li.tabs__item--open")
          .removeClass("tabs__item--open")
          .find("a")
          .attr("aria-selected", "false")
          .removeClass("is-active");
        $tabGroup
          .find(".tabs__content--open")
          .removeClass("tabs__content--open")
          .attr("aria-hidden", "true")
          .children("h2")
          .attr("tabindex", -1);

        // Turn on the new tab.
        $target.attr("aria-selected", "true").addClass("is-active");
        $target
          .parents(".tabs__item")
          .first()
          .addClass("tabs__item--open");
        $tabGroup
          .find(`${$target.attr("href")}__content`)
          .attr("aria-hidden", "false")
          .addClass("tabs__content--open")
          .children("h2")
          .attr("tabindex", 0)
          .focus();

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
              $tab
                .parent()
                .prev()
                .find("> a")
                .click();
            } else {
              $tabs.find("li:last > a").click();
            }
            break;

          case "ArrowRight":
            if ($tab.parent().next().length !== 0) {
              $tab
                .parent()
                .next()
                .find("> a")
                .click();
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
