import {
  $$htmlToFragment,
  $insertElementByOption
} from "./chunk.js";

// src/client/pages/home.xht
var home_default = ($element, $option = {}) => {
  {
    const $parentElement = $$htmlToFragment(` <h1 class="mcsiy2t">HOMEPAGE</h1> <figure class="mcsiy2t"> <img alt="Malina" src="/malinajs.svg" class="mcsiy2t"/> <figcaption class="mcsiy2t">Malina Web UI-Framework</figcaption> </figure> <p class="mcsiy2t"><strong>Try editing this file (pages/home.xht) to test hot module reloading.</strong></p> `);
    document.title = `Home`;
    $insertElementByOption($element, $option, $parentElement);
  }
};
export {
  home_default as default
};
//# sourceMappingURL=home.js.map
