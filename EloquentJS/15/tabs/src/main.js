document.body.onload = () => {
  function asTabs(node, config) {
    const tabsContent = Array.from(node.children);
    for (const child of tabsContent) {
      const tab = document.createElement(`button`);
      tab.textContent = child.dataset.tabname;
      child.style.display = `none`;
      tab.addEventListener(`click`, (event) => {
        const tabContent = findTabContent(event.target);

        for (const child of tabsContent) {
          child.style.display = `none`;
        }
        tabContent.style.display = `block`;

        event.stopPropagation;
      });
      node.insertBefore(tab, tabsContent[0]);
    }

    function findTabContent(node) {
      for (const child of tabsContent) {
        if (child.dataset.tabname === node.textContent) {
          return child;
        }
      }
    }
  }

  asTabs(document.querySelector(`tab-panel`));
};
