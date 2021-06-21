import {
  $$htmlBlock,
  $$htmlToFragment,
  $$ifBlock,
  $base,
  $onMount,
  bindText,
  childNodes,
  current_component,
  firstChild,
  makeComponent,
  noop
} from "./chunk.js";

// src/client/pages/articles.xht
var articles_default = makeComponent(($option, $$apply) => {
  const $component = current_component;
  const $props = $option.props || {};
  let { params } = $props;
  current_component.push = () => {
    ({ params = params } = $props);
    $$apply();
  };
  current_component.exportedProps = { params: () => params };
  let id = params.postid;
  let article;
  async function onMount() {
    $$apply();
    const response = await fetch(`http://localhost:3000/api/blogs/${id}`);
    $$apply();
    const res = await response.json();
    $$apply();
    article = res.data;
  }
  {
    let $cd = $component.$cd;
    const $parentElement = $$htmlToFragment(`  <>`);
    let el3 = $parentElement[childNodes][1];
    document.title = `Article`;
    $$ifBlock($cd, el3, () => !!article, $$htmlToFragment(` <h2> </h2> <h4> </h4> <hr/> <> `), ($cd2, $parentElement2) => {
      let el0 = $parentElement2[childNodes][1][firstChild];
      let el1 = $parentElement2[childNodes][3][firstChild];
      let el2 = $parentElement2[childNodes][7];
      bindText($cd2, el0, () => article.title);
      bindText($cd2, el1, () => article.subtitle);
      $$htmlBlock($cd2, el2, () => article.content);
    }, $$htmlToFragment(` <p>Loading...</p> `), noop);
    $onMount(onMount);
    return $parentElement;
  }
}, $base);
export {
  articles_default as default
};
//# sourceMappingURL=articles.js.map
