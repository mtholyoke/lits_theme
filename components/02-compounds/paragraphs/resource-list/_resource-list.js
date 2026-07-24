window.addEventListener('load', () => {
  //if viewport is mobile, close all initially, else set height for active
  const viewportWidth = window.innerWidth;
  var setActive = false;
  if (viewportWidth > 1200) {
    setActive = true;
  }
  // Select all accordion headers or items and add listeners
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    //if active, show content. if not, hide content. 
    // need this here, to provide the initial state that the click will transition from
    // the css is not applied yet, so the listener we set below can't get that from content.style
    const content = item.querySelector('.accordion-content');
    if (item.classList.contains('active') && setActive) {
      // Set the max-height to the actual height of the content for the transition
      console.debug(content)
      content.style.maxHeight = content.scrollHeight + 'px';
      //content.style.maxHeight - 'none';
    } else {
      content.style.maxHeight = 0; // Collapse the content
      item.classList.remove('active');
    }
    // add listener for header
    const header = item.querySelector('.accordion-control button');
    header.addEventListener('click', () => {
      // on click, toggle class
      item.classList.toggle('active');
      //if now active, show content. if not, hide content.
      if (item.classList.contains('active')) {
        // Set the max-height to the actual height of the content for the transition
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = 0; // Collapse the content
      }
    });
  });
});
//listen for viewport changes and fix height (this is lame)
window.addEventListener('load', (event) => {
  //if viewport is mobile, close all initially, else set height for active
  const viewportWidth = window.innerWidth;
  var setActive = false;
  if (viewportWidth > 1200) {
    setActive = true;
  }
  window.addEventListener("resize", () => {
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
      const content = item.querySelector('.accordion-content');
      if (item.classList.contains('active') && setActive) {
        // Set the max-height to the actual height of the content for the transition
        content.style.maxHeight = content.scrollHeight + 'px';
      };
    });
  });
});
