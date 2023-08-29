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
