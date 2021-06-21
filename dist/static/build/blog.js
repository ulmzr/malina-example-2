import {
  $$eachBlock,
  $$htmlToFragment,
  $$ifBlock,
  $base,
  $onMount,
  bindAttribute,
  bindText,
  childNodes,
  current_component,
  eachDefaultKey,
  firstChild,
  makeComponent,
  noop
} from "./chunk.js";

// src/client/pages/blog.xht
var blog_default = makeComponent(($option, $$apply) => {
  const $component = current_component;
  let articles;
  async function onMount() {
    $$apply();
    const response = await fetch("http://localhost:3000/api/blogs");
    $$apply();
    const res = await response.json();
    $$apply();
    articles = res.data;
  }
  {
    let $cd = $component.$cd;
    const $parentElement = $$htmlToFragment(`  <h2>Blog</h2> <>`);
    let el3 = $parentElement[childNodes][3];
    document.title = `Blogs`;
    $$ifBlock($cd, el3, () => !!articles, $$htmlToFragment(` <ul></ul> `), ($cd2, $parentElement2) => {
      let el0 = $parentElement2[childNodes][1];
      $$eachBlock($cd2, el0, 1, () => articles, eachDefaultKey, $$htmlToFragment(`<li><a> </a></li>`), ($ctx, $parentElement3, article, $index) => {
        let $cd3 = $ctx.cd;
        let el1 = $parentElement3[firstChild][firstChild];
        let el2 = el1[firstChild];
        bindAttribute($cd3, el1, "href", () => `blog/${article.id}`);
        bindText($cd3, el2, () => article.title);
        $ctx.rebind = function(_$index, _article) {
          $index = _$index;
          article = _article;
        };
      });
    }, $$htmlToFragment(` <p>Loading</p> `), noop);
    $onMount(onMount);
    return $parentElement;
  }
}, $base);
export {
  blog_default as default
};
//# sourceMappingURL=blog.js.map
