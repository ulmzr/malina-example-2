// node_modules/malinajs/runtime.js
var __app_onerror = console.error;
var isFunction = (fn) => typeof fn == "function";
var safeCall = (fn) => {
  try {
    return isFunction(fn) && fn();
  } catch (e) {
    __app_onerror(e);
  }
};
function $watch(cd, fn, callback, w) {
  if (!w)
    w = {};
  w.fn = fn;
  w.cb = callback;
  if (!("value" in w))
    w.value = NaN;
  cd.watchers.push(w);
  return w;
}
function $watchReadOnly(cd, fn, callback) {
  return $watch(cd, fn, callback, { ro: true });
}
function cd_onDestroy(cd, fn) {
  if (fn)
    cd._d.push(fn);
}
function $$removeItem(array, item) {
  let i = array.indexOf(item);
  if (i >= 0)
    array.splice(i, 1);
}
function $ChangeDetector(parent) {
  this.parent = parent;
  this.children = [];
  this.watchers = [];
  this._d = [];
  this.prefix = [];
  this.$$ = parent?.$$;
}
$ChangeDetector.prototype.new = function() {
  var cd = new $ChangeDetector(this);
  this.children.push(cd);
  return cd;
};
$ChangeDetector.prototype.destroy = function(option) {
  if (option !== false && this.parent)
    $$removeItem(this.parent.children, this);
  this.watchers.length = 0;
  this.prefix.length = 0;
  this._d.map(safeCall);
  this._d.length = 0;
  this.children.map((cd) => cd.destroy(false));
  this.children.length = 0;
};
var isArray = (a) => Array.isArray(a);
var compareArray = (a, b) => {
  let a0 = isArray(a);
  let a1 = isArray(b);
  if (a0 !== a1)
    return true;
  if (!a0)
    return a !== b;
  if (a.length !== b.length)
    return true;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i])
      return true;
  }
  return false;
};
function $$compareArray(w, value) {
  if (!compareArray(w.value, value))
    return 0;
  if (isArray(value))
    w.value = value.slice();
  else
    w.value = value;
  w.cb(w.value);
  return w.ro ? 0 : 1;
}
var compareDeep = (a, b, lvl) => {
  if (lvl < 0 || !a || !b)
    return a !== b;
  if (a === b)
    return false;
  let o0 = typeof a == "object";
  let o1 = typeof b == "object";
  if (!(o0 && o1))
    return a !== b;
  let a0 = isArray(a);
  let a1 = isArray(b);
  if (a0 !== a1)
    return true;
  if (a0) {
    if (a.length !== b.length)
      return true;
    for (let i = 0; i < a.length; i++) {
      if (compareDeep(a[i], b[i], lvl - 1))
        return true;
    }
  } else {
    let set = {};
    for (let k in a) {
      if (compareDeep(a[k], b[k], lvl - 1))
        return true;
      set[k] = true;
    }
    for (let k in b) {
      if (set[k])
        continue;
      return true;
    }
  }
  return false;
};
function cloneDeep(d, lvl) {
  if (lvl < 0 || !d)
    return d;
  if (typeof d == "object") {
    if (d instanceof Date)
      return d;
    if (d instanceof Element)
      return d;
    if (isArray(d))
      return d.map((i) => cloneDeep(i, lvl - 1));
    let r = {};
    for (let k in d)
      r[k] = cloneDeep(d[k], lvl - 1);
    return r;
  }
  return d;
}
function $$deepComparator(depth) {
  return function(w, value) {
    if (!compareDeep(w.value, value, depth))
      return 0;
    w.value = cloneDeep(value, depth);
    w.cb(value);
    return w.ro ? 0 : 1;
  };
}
var $$compareDeep = $$deepComparator(10);
var fire = (w) => {
  if (w.cmp)
    w.cmp(w, w.fn());
  else {
    w.value = w.fn();
    w.cb(w.value);
  }
};
function $digest($cd) {
  let loop = 10;
  let w;
  while (loop >= 0) {
    let changes = 0;
    let index = 0;
    let queue = [];
    let i, value, cd = $cd;
    while (cd) {
      for (i = 0; i < cd.prefix.length; i++)
        cd.prefix[i]();
      for (i = 0; i < cd.watchers.length; i++) {
        w = cd.watchers[i];
        value = w.fn();
        if (w.value !== value) {
          if (w.cmp) {
            changes += w.cmp(w, value);
          } else {
            w.value = value;
            if (!w.ro)
              changes++;
            w.cb(w.value);
          }
        }
      }
      if (cd.children.length)
        queue.push.apply(queue, cd.children);
      cd = queue[index++];
    }
    loop--;
    if (!changes)
      break;
  }
  if (loop < 0)
    __app_onerror("Infinity changes: ", w);
}
var templatecache = {};
var templatecacheSvg = {};
var $$uniqIndex = 1;
var childNodes = "childNodes";
var firstChild = "firstChild";
var noop = (a) => a;
var insertAfter = (label, node) => {
  label.parentNode.insertBefore(node, label.nextSibling);
};
var createTextNode = (text) => {
  let f = document.createDocumentFragment();
  f.append(text);
  return f;
};
var $$htmlToFragment = (html) => {
  if (templatecache[html])
    return templatecache[html].cloneNode(true);
  let t = document.createElement("template");
  t.innerHTML = html.replace(/<>/g, "<!---->");
  let result = t.content;
  templatecache[html] = result.cloneNode(true);
  return result;
};
function svgToFragment(content) {
  if (templatecacheSvg[content])
    return templatecacheSvg[content].cloneNode(true);
  let t = document.createElement("template");
  t.innerHTML = "<svg>" + content + "</svg>";
  let result = document.createDocumentFragment();
  let svg = t.content[firstChild];
  while (svg[firstChild])
    result.appendChild(svg[firstChild]);
  templatecacheSvg[content] = result.cloneNode(true);
  return result;
}
function $$removeElements(el, last) {
  let next;
  while (el) {
    next = el.nextSibling;
    el.remove();
    if (el == last)
      break;
    el = next;
  }
}
function removeElementsBetween(el, stop) {
  let next;
  el = el.nextSibling;
  while (el) {
    next = el.nextSibling;
    if (el == stop)
      break;
    el.remove();
    el = next;
  }
}
var getFinalLabel = (n) => {
  if (n.nextSibling)
    return n.nextSibling;
  let e = document.createTextNode("");
  n.parentNode.appendChild(e);
  return e;
};
var _tick_list = [];
var _tick_planned = {};
function $tick(fn, uniq) {
  if (uniq) {
    if (_tick_planned[uniq])
      return;
    _tick_planned[uniq] = true;
  }
  _tick_list.push(fn);
  if (_tick_planned.$tick)
    return;
  _tick_planned.$tick = true;
  setTimeout(() => {
    _tick_planned = {};
    let list = _tick_list;
    _tick_list = [];
    list.map(safeCall);
  }, 0);
}
var current_component;
var $context;
var $onDestroy = (fn) => current_component._d.push(fn);
var $onMount = (fn) => current_component._m.push(fn);
var $insertElementByOption = ($label, $option, $element) => {
  if ($option.afterElement) {
    insertAfter($label, $element);
  } else {
    $label.innerHTML = "";
    $label.appendChild($element);
  }
};
var $base = {
  a: ($component) => {
    let $cd = new $ChangeDetector();
    $cd.$$ = $component;
    $onDestroy(() => $cd.destroy());
    let id = `a${$$uniqIndex++}`;
    let process;
    let apply = (r) => {
      if (process)
        return r;
      $tick(() => {
        try {
          process = true;
          $digest($cd);
        } finally {
          process = false;
        }
      }, id);
      return r;
    };
    $component.$cd = $cd;
    $component.apply = apply;
    $component.push = apply;
  },
  b: ($component) => {
    $component.apply();
  }
};
var makeComponent = (init, $base2) => {
  return ($element, $option = {}) => {
    let prev = current_component;
    $context = $option.context || {};
    let $component = current_component = {
      $option,
      destroy: () => $component._d.map(safeCall),
      context: $context,
      exported: {},
      _d: [],
      _m: []
    };
    $base2.a($component);
    try {
      $insertElementByOption($element, $option, init($option, $component.apply));
      $base2.b($component);
    } finally {
      current_component = prev;
      $context = null;
    }
    $component._d.push(...$component._m.map(safeCall));
    return $component;
  };
};
var callComponent = (cd, context, component, el, option) => {
  option.afterElement = true;
  option.context = { ...context };
  let $component = safeCall(() => component(el, option));
  if ($component && $component.destroy)
    cd_onDestroy(cd, $component.destroy);
  return $component;
};
var setClassToElement = (element, value) => {
  if (typeof element.className == "string")
    element.className = value;
  else
    element.className.baseVal = value;
};
var bindText = (cd, element, fn) => {
  $watchReadOnly(cd, () => "" + fn(), (value) => {
    element.textContent = value;
  });
};
var bindAttributeBase = (element, name, value) => {
  if (value != null)
    element.setAttribute(name, value);
  else
    element.removeAttribute(name);
};
var bindAttribute = (cd, element, name, fn) => {
  $watchReadOnly(cd, () => "" + fn(), (value) => bindAttributeBase(element, name, value));
};
var makeClassResolver = ($option, classMap, metaClass, mainName) => {
  if (!$option.$class)
    $option.$class = {};
  if (!mainName && metaClass.main)
    mainName = "main";
  return (line, defaults) => {
    let result = [];
    if (defaults)
      result.push(defaults);
    line.trim().split(/\s+/).forEach((name) => {
      let meta;
      if (name[0] == "$") {
        name = name.substring(1);
        meta = true;
      }
      let h = metaClass[name] || meta;
      if (h) {
        let className = ($option.$class[name === mainName ? "$$main" : name] || "").trim();
        if (className) {
          result.push(className);
        } else if (h !== true) {
          result.push(name, h);
        }
      }
      let h2 = classMap[name];
      if (h2) {
        result.push(name, h2);
      } else if (!h) {
        result.push(name);
      }
    });
    return result.join(" ");
  };
};
var eachDefaultKey = (item, index, array) => typeof array[0] === "object" ? item : index;
function $$htmlBlock($cd, tag, fn) {
  let lastElement;
  let create = (html) => {
    let fr;
    if (tag.parentElement instanceof SVGElement)
      fr = svgToFragment(html);
    else
      fr = $$htmlToFragment(html);
    lastElement = fr.lastChild;
    insertAfter(tag, fr);
  };
  let destroy = () => {
    if (!lastElement)
      return;
    let next, el = tag.nextSibling;
    while (el) {
      next = el.nextSibling;
      el.remove();
      if (el == lastElement)
        break;
      el = next;
    }
    lastElement = null;
  };
  $watch($cd, fn, (html) => {
    destroy();
    if (html)
      create(html);
  }, { ro: true });
}
function $$ifBlock($cd, $parentElement, fn, tpl, build, tplElse, buildElse) {
  let childCD;
  let first, last;
  function create(fr, builder) {
    childCD = $cd.new();
    let tpl2 = fr.cloneNode(true);
    builder(childCD, tpl2);
    first = tpl2[firstChild];
    last = tpl2.lastChild;
    insertAfter($parentElement, tpl2);
  }
  function destroy() {
    if (!childCD)
      return;
    childCD.destroy();
    childCD = null;
    $$removeElements(first, last);
    first = last = null;
  }
  $watch($cd, fn, (value) => {
    if (value) {
      destroy();
      create(tpl, build);
    } else {
      destroy();
      if (buildElse)
        create(tplElse, buildElse);
    }
  });
}
function $$eachBlock($parentCD, label, onlyChild, fn, getKey, itemTemplate, bind) {
  let $cd = $parentCD.new();
  let mapping = new Map();
  let lastNode;
  let tplLength = itemTemplate[childNodes].length;
  $watch($cd, fn, (array) => {
    if (!array)
      array = [];
    if (typeof array == "number")
      array = [...Array(array)].map((_, i2) => i2 + 1);
    else if (!isArray(array))
      array = [];
    let newMapping = new Map();
    let prevNode, parentNode;
    if (onlyChild) {
      prevNode = null;
      parentNode = label;
    } else {
      prevNode = label;
      parentNode = label.parentNode;
    }
    if (mapping.size) {
      let ctx2, count = 0;
      for (let i2 = 0; i2 < array.length; i2++) {
        ctx2 = mapping.get(getKey(array[i2], i2, array));
        if (ctx2) {
          ctx2.a = true;
          count++;
        }
      }
      if (!count && lastNode) {
        if (onlyChild)
          label.textContent = "";
        else
          $$removeElements(label.nextSibling, lastNode);
        $cd.children.forEach((cd) => cd.destroy(false));
        $cd.children.length = 0;
        mapping.clear();
      } else {
        $cd.children = [];
        mapping.forEach((ctx3) => {
          if (ctx3.a) {
            ctx3.a = false;
            $cd.children.push(ctx3.cd);
            return;
          }
          $$removeElements(ctx3.first, ctx3.last);
          ctx3.cd.destroy(false);
        });
      }
    }
    let i, item, next_ctx, ctx, nextEl;
    for (i = 0; i < array.length; i++) {
      item = array[i];
      if (next_ctx) {
        ctx = next_ctx;
        next_ctx = null;
      } else
        ctx = mapping.get(getKey(item, i, array));
      if (ctx) {
        nextEl = i == 0 && onlyChild ? parentNode[firstChild] : prevNode.nextSibling;
        if (nextEl != ctx.first) {
          let insert = true;
          if (tplLength == 1 && i + 1 < array.length && prevNode && prevNode.nextSibling) {
            next_ctx = mapping.get(getKey(array[i + 1], i + 1, array));
            if (prevNode.nextSibling.nextSibling === next_ctx.first) {
              parentNode.replaceChild(ctx.first, prevNode.nextSibling);
              insert = false;
            }
          }
          if (insert) {
            let insertBefore = prevNode && prevNode.nextSibling;
            let next, el = ctx.first;
            while (el) {
              next = el.nextSibling;
              parentNode.insertBefore(el, insertBefore);
              if (el == ctx.last)
                break;
              el = next;
            }
          }
        }
        ctx.rebind(i, item);
      } else {
        let tpl = itemTemplate.cloneNode(true);
        let childCD = $cd.new();
        ctx = { cd: childCD };
        bind(ctx, tpl, item, i);
        ctx.first = tpl[firstChild];
        ctx.last = tpl.lastChild;
        parentNode.insertBefore(tpl, prevNode && prevNode.nextSibling);
      }
      prevNode = ctx.last;
      newMapping.set(getKey(item, i, array), ctx);
    }
    lastNode = prevNode;
    mapping.clear();
    mapping = newMapping;
  }, { ro: true, cmp: $$compareArray });
}

export {
  $watch,
  $watchReadOnly,
  $$compareDeep,
  fire,
  childNodes,
  firstChild,
  noop,
  createTextNode,
  $$htmlToFragment,
  removeElementsBetween,
  getFinalLabel,
  current_component,
  $context,
  $onDestroy,
  $onMount,
  $insertElementByOption,
  $base,
  makeComponent,
  callComponent,
  setClassToElement,
  bindText,
  bindAttribute,
  makeClassResolver,
  eachDefaultKey,
  $$htmlBlock,
  $$ifBlock,
  $$eachBlock
};
//# sourceMappingURL=chunk.js.map
