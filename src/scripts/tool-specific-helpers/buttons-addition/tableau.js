export default function() {
  const parentButtonStartNode = document.querySelector('.tab-toolbar-container .tab-nonVizItems');
  const firstChild = parentButtonStartNode.firstChild;
  const startGtButton = document.createElement('div');
  startGtButton.id = 'gt-edit-button-test';
  startGtButton.setAttribute('class', 'tabToolbarButton tab-widget customviews');
  startGtButton.setAttribute('role', 'button');
  startGtButton.setAttribute('aria-label', 'Custom views');
  startGtButton.setAttribute('tabindex', '0');
  startGtButton.setAttribute('style', 'position: relative; user-select: none; -webkit-tap-highlight-color: transparent; width: 115px !important');
  startGtButton.innerHTML = '<div gt-onclick="showConfigPopup" style="position: absolute; left: 0; top: 0; right: 0; bottom: 0;"></div><span class="tabToolbarButtonImg tab-icon-edit"></span><span class="tabToolbarButtonText">TEST Tour</span>';
  parentButtonStartNode.insertBefore(startGtButton, firstChild);
};


