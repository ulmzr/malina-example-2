import {
  $$htmlToFragment,
  $insertElementByOption
} from "./chunk.js";

// src/client/pages/home.xht
var home_default = ($element, $option = {}) => {
  {
    const $parentElement = $$htmlToFragment(` <h1 class="m6zcctc">HOMEPAGE</h1> <figure class="m6zcctc"> <img alt="Malina" src="/malinajs.svg" class="m6zcctc"/> <figcaption class="m6zcctc">Malina Web UI-Framework</figcaption> </figure> <p class="m6zcctc"><strong>Try editing this file (pages/home.xht) to test hot module reloading.</strong></p> `);
    document.title = `Home`;
    $insertElementByOption($element, $option, $parentElement);
  }
};
export {
  home_default as default
};
//# sourceMappingURL=home.js.map
