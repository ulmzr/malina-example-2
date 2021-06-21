import {
  $$htmlToFragment,
  $insertElementByOption
} from "./chunk.js";

// src/client/pages/about.xht
var about_default = ($element, $option = {}) => {
  {
    const $parentElement = $$htmlToFragment(` <h2>About this site</h2> <p>This is the 'about' page. There's not much here.</p> `);
    document.title = `About`;
    $insertElementByOption($element, $option, $parentElement);
  }
};
export {
  about_default as default
};
//# sourceMappingURL=about.js.map
