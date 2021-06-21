import {
  $$compareDeep,
  $$htmlToFragment,
  $$ifBlock,
  $base,
  $context,
  $onDestroy,
  $watch,
  $watchReadOnly,
  callComponent,
  childNodes,
  createTextNode,
  current_component,
  fire,
  firstChild,
  getFinalLabel,
  makeClassResolver,
  makeComponent,
  noop,
  removeElementsBetween,
  setClassToElement
} from "./chunk.js";

// node_modules/regexparam/dist/regexparam.mjs
function regexparam_default(str, loose) {
  if (str instanceof RegExp)
    return { keys: false, pattern: str };
  var c, o, tmp, ext, keys = [], pattern = "", arr = str.split("/");
  arr[0] || arr.shift();
  while (tmp = arr.shift()) {
    c = tmp[0];
    if (c === "*") {
      keys.push("wild");
      pattern += "/(.*)";
    } else if (c === ":") {
      o = tmp.indexOf("?", 1);
      ext = tmp.indexOf(".", 1);
      keys.push(tmp.substring(1, !!~o ? o : !!~ext ? ext : tmp.length));
      pattern += !!~o && !~ext ? "(?:/([^/]+?))?" : "/([^/]+?)";
      if (!!~ext)
        pattern += (!!~o ? "?" : "") + "\\" + tmp.substring(ext);
    } else {
      pattern += "/" + tmp;
    }
  }
  return {
    keys,
    pattern: new RegExp("^" + pattern + (loose ? "(?=$|/)" : "/?$"), "i")
  };
}

// node_modules/navaid/dist/navaid.mjs
function Navaid(base, on404) {
  var rgx, curr, routes = [], $ = {};
  var fmt = $.format = function(uri) {
    if (!uri)
      return uri;
    uri = "/" + uri.replace(/^\/|\/$/g, "");
    return rgx.test(uri) && uri.replace(rgx, "/");
  };
  base = "/" + (base || "").replace(/^\/|\/$/g, "");
  rgx = base == "/" ? /^\/+/ : new RegExp("^\\" + base + "(?=\\/|$)\\/?", "i");
  $.route = function(uri, replace) {
    if (uri[0] == "/" && !rgx.test(uri))
      uri = base + uri;
    history[(uri === curr || replace ? "replace" : "push") + "State"](uri, null, uri);
  };
  $.on = function(pat, fn) {
    (pat = regexparam_default(pat)).fn = fn;
    routes.push(pat);
    return $;
  };
  $.run = function(uri) {
    var i = 0, params = {}, arr, obj;
    if (uri = fmt(uri || location.pathname)) {
      uri = uri.match(/[^\?#]*/)[0];
      for (curr = uri; i < routes.length; i++) {
        if (arr = (obj = routes[i]).pattern.exec(uri)) {
          for (i = 0; i < obj.keys.length; ) {
            params[obj.keys[i]] = arr[++i] || null;
          }
          obj.fn(params);
          return $;
        }
      }
      if (on404)
        on404(uri);
    }
    return $;
  };
  $.listen = function(u) {
    wrap("push");
    wrap("replace");
    function run(e) {
      $.run();
    }
    function click(e) {
      var x = e.target.closest("a"), y = x && x.getAttribute("href");
      if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button || e.defaultPrevented)
        return;
      if (!y || x.target || x.host !== location.host || y[0] == "#")
        return;
      if (y[0] != "/" || rgx.test(y)) {
        e.preventDefault();
        $.route(y);
      }
    }
    addEventListener("popstate", run);
    addEventListener("replacestate", run);
    addEventListener("pushstate", run);
    addEventListener("click", click);
    $.unlisten = function() {
      removeEventListener("popstate", run);
      removeEventListener("replacestate", run);
      removeEventListener("pushstate", run);
      removeEventListener("click", click);
    };
    return $.run(u);
  };
  return $;
}
function wrap(type, fn) {
  if (history[type])
    return;
  history[type] = type;
  fn = history[type += "State"];
  history[type] = function(uri) {
    var ev = new Event(type.toLowerCase());
    ev.uri = uri;
    fn.apply(this, arguments);
    return dispatchEvent(ev);
  };
}

// src/client/components/Nav.xht
var Nav_default = makeComponent(($option, $$apply) => {
  const $component = current_component;
  const $props = $option.props || {};
  const $$resolveClass = makeClassResolver($option, { "selected": "mju0rbo" }, {}, null);
  let { active } = $props;
  current_component.push = () => {
    ({ active = active } = $props);
    $$apply();
  };
  current_component.exportedProps = { active: () => active };
  function isActive(str) {
    $$apply();
    return active === str ? "selected" : "";
  }
  {
    let $cd = $component.$cd;
    const $parentElement = $$htmlToFragment(` <nav class="mpnx5fx"> <ul class="mpnx5fx"><li class="mpnx5fx"><a href="/">home</a></li><li class="mpnx5fx"><a href="/about">about</a></li><li class="mpnx5fx"><a href="/blog">blog</a></li></ul> </nav> `);
    let el0 = $parentElement[childNodes][1][childNodes][1][firstChild][firstChild];
    let el1 = $parentElement[childNodes][1][childNodes][1][childNodes][1][firstChild];
    let el2 = $parentElement[childNodes][1][childNodes][1][childNodes][2][firstChild];
    $watchReadOnly($cd, () => $$resolveClass(isActive("home"), "mpnx5fx"), (value) => setClassToElement(el0, value));
    $watchReadOnly($cd, () => $$resolveClass(isActive("about"), "mpnx5fx"), (value) => setClassToElement(el1, value));
    $watchReadOnly($cd, () => $$resolveClass(isActive("blog"), "mpnx5fx"), (value) => setClassToElement(el2, value));
    return $parentElement;
  }
}, $base);

// src/client/App.xht
var App_default = makeComponent(($option, $$apply) => {
  const $component = current_component;
  const $context2 = $context;
  let Route, params = {}, active, uri;
  const router = Navaid("/").on("/", () => {
    $$apply();
    return run(import("./home.js"));
  }).on("/about", () => {
    $$apply();
    return run(import("./about.js"));
  }).on("/blog", () => {
    $$apply();
    return run(import("./blog.js"));
  }).on("/blog/:postid", (obj) => {
    $$apply();
    return run(import("./articles.js"), obj);
  }).listen();
  function run(thunk, obj) {
    $$apply();
    uri = location.pathname;
    active = uri.split("/")[1] || "home";
    const target = uri;
    thunk.then((m) => {
      $$apply();
      if (target !== uri)
        return;
      params = obj || {};
      if (m.preload) {
        m.preload({
          params
        }).then(() => {
          $$apply();
          if (target !== uri)
            return;
          Route = m.default;
          window.scrollTo(0, 0);
        });
      } else {
        Route = m.default;
        window.scrollTo(0, 0);
      }
    });
  }
  function onDestroy() {
    $$apply();
    router.unlisten;
  }
  ;
  {
    let $cd = $component.$cd;
    const $parentElement = $$htmlToFragment(` <> <main class="mefqip6"> <> </main> `);
    let el0 = $parentElement[childNodes][1];
    let el2 = $parentElement[childNodes][3][childNodes][1];
    {
      let $$push = noop;
      let props = {};
      fire($watch($cd, () => active, (_active) => {
        props.active = _active;
        $$push();
      }, { ro: true, cmp: $$compareDeep }));
      let $child = callComponent($cd, $context2, Nav_default, el0, { props });
      if ($child?.push) {
        $$push = $child.push;
      }
    }
    $$ifBlock($cd, el2, () => !!Route, $$htmlToFragment(` <> `), ($cd2, $parentElement2) => {
      let el1 = $parentElement2[childNodes][1];
      {
        let childCD, finalLabel = getFinalLabel(el1);
        $watch($cd2, () => Route, ($ComponentConstructor) => {
          if (childCD) {
            childCD.destroy();
            removeElementsBetween(el1, finalLabel);
          }
          childCD = null;
          if ($ComponentConstructor) {
            childCD = $cd2.new();
            let $$push = noop;
            let props = {};
            fire($watch($cd2, () => params, (_params) => {
              props.params = _params;
              $$push();
            }, { ro: true, cmp: $$compareDeep }));
            let $child = callComponent(childCD, $context2, $ComponentConstructor, el1, { props });
            if ($child?.push) {
              $$push = $child.push;
            }
          }
        });
      }
    }, createTextNode(` Loading.... `), noop);
    $onDestroy(onDestroy);
    return $parentElement;
  }
}, $base);

// src/client/main.js
App_default(document.body);
//# sourceMappingURL=main.js.map
