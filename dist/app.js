var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/derver/dist/derver.cjs.js
var require_derver_cjs = __commonJS({
  "node_modules/derver/dist/derver.cjs.js"(exports2) {
    var Ce = Object.create;
    var C = Object.defineProperty;
    var Re = Object.getOwnPropertyDescriptor;
    var Oe = Object.getOwnPropertyNames;
    var Te = Object.getPrototypeOf;
    var Ne = Object.prototype.hasOwnProperty;
    var z = (e) => C(e, "__esModule", { value: true });
    var j = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
    var Le = (e, t) => {
      z(e);
      for (var r in t)
        C(e, r, { get: t[r], enumerable: true });
    };
    var je = (e, t, r) => {
      if (t && typeof t == "object" || typeof t == "function")
        for (let i of Oe(t))
          !Ne.call(e, i) && i !== "default" && C(e, i, { get: () => t[i], enumerable: !(r = Re(t, i)) || r.enumerable });
      return e;
    };
    var h = (e) => je(z(C(e != null ? Ce(Te(e)) : {}, "default", e && e.__esModule && "default" in e ? { get: () => e.default, enumerable: true } : { value: e, enumerable: true })), e);
    var W = j((jt, ae) => {
      var R = require("fs"), oe = require("path"), tt = require("os");
      function P(e, t) {
        return Object.prototype.toString.call(e) === "[object " + t + "]";
      }
      function _(e, t) {
        try {
          return t(e);
        } catch (r) {
          if (/^(ENOENT|EPERM|EACCES)$/.test(r.code))
            return r.code !== "ENOENT" && console.warn("Warning: Cannot access %s", e), false;
          throw r;
        }
      }
      var rt = { nil: function(e) {
        return e == null;
      }, array: function(e) {
        return Array.isArray(e);
      }, emptyObject: function(e) {
        for (var t in e)
          return false;
        return true;
      }, buffer: function(e) {
        return Buffer.isBuffer(e);
      }, regExp: function(e) {
        return P(e, "RegExp");
      }, string: function(e) {
        return P(e, "String");
      }, func: function(e) {
        return typeof e == "function";
      }, number: function(e) {
        return P(e, "Number");
      }, exists: function(e) {
        return R.existsSync(e);
      }, file: function(e) {
        return _(e, function(t) {
          return R.statSync(t).isFile();
        });
      }, samePath: function(e, t) {
        return oe.resolve(e) === oe.resolve(t);
      }, directory: function(e) {
        return _(e, function(t) {
          return R.statSync(t).isDirectory();
        });
      }, symbolicLink: function(e) {
        return _(e, function(t) {
          return R.lstatSync(t).isSymbolicLink();
        });
      }, windows: function() {
        return tt.platform() === "win32";
      } };
      ae.exports = rt;
    });
    var fe = j((kt, ue) => {
      var b = require("fs"), ce = require("os"), A = require("path"), O = W(), E, nt = ce.tmpdir && ce.tmpdir() || process.env.TMPDIR || process.env.TEMP || process.cwd();
      function se() {
        this.stack = [];
      }
      se.prototype = { create: function(e, t) {
        var r = A.join(t, "node-watch-" + Math.random().toString(16).substr(2));
        return this.stack.push({ name: r, type: e }), r;
      }, write: function() {
        for (var e = 0; e < arguments.length; ++e)
          b.writeFileSync(arguments[e], " ");
      }, mkdir: function() {
        for (var e = 0; e < arguments.length; ++e)
          b.mkdirSync(arguments[e]);
      }, cleanup: function(e) {
        try {
          for (var t; t = this.stack.pop(); ) {
            var r = t.type, i = t.name;
            r === "file" && O.file(i) ? b.unlinkSync(i) : r === "dir" && O.directory(i) && b.rmdirSync(i);
          }
        } finally {
          O.func(e) && e();
        }
      } };
      var le = false;
      ue.exports = function e(t) {
        if (!O.func(t))
          return false;
        if (E !== void 0)
          return t(E);
        if (!le)
          le = true;
        else
          return setTimeout(function() {
            e(t);
          }, 300);
        var r = new se(), i = r.create("dir", nt), n = r.create("dir", i), o = r.create("file", n);
        r.mkdir(i, n);
        var a = { recursive: true }, c;
        try {
          c = b.watch(i, a);
        } catch (u) {
          if (u.code == "ERR_FEATURE_UNAVAILABLE_ON_PLATFORM")
            return t(E = false);
          throw u;
        }
        if (!c)
          return false;
        var s = setTimeout(function() {
          c.close(), r.cleanup(function() {
            t(E = false);
          });
        }, 200);
        c.on("change", function(u, d) {
          A.basename(o) === A.basename(d) && (c.close(), clearTimeout(s), r.cleanup(function() {
            t(E = true);
          }));
        }), r.write(o);
      };
    });
    var be = j((Mt, H) => {
      var I = require("fs"), S = require("path"), de = require("util"), me = require("events"), he = fe(), l = W(), it = "update", pe = "remove", T = Symbol("skip");
      function ot(e) {
        return e.some(function(t, r, i) {
          return i.indexOf(t) !== r;
        });
      }
      function F(e) {
        return e.filter(function(t, r, i) {
          return i.indexOf(t) === r;
        });
      }
      function at(e) {
        return e.reduce(function(t, r) {
          return t.concat(r);
        }, []);
      }
      function ct(e) {
        if (e && e !== "buffer" && !Buffer.isEncoding(e))
          throw new Error("Unknown encoding: " + e);
      }
      function st(e) {
        return function(t, r) {
          if (l.func(e)) {
            var i = e(t, T);
            i && i !== T && r();
          } else
            l.regExp(e) ? e.test(t) && r() : r();
        };
      }
      function lt(e) {
        return e.map(function(t) {
          return l.exists(t) ? [it, t] : [pe, t];
        });
      }
      function ut(e) {
        var t = F(e), r = /~$|^\.#|^##$/g, i = e.some(function(o) {
          return r.test(o);
        });
        if (i) {
          var n = ot(e.map(function(o) {
            return o.replace(r, "");
          }));
          n && (t = t.filter(function(o) {
            return l.exists(o);
          }));
        }
        return lt(t);
      }
      function ft(e, t) {
        var r, i = [], n = e.options.encoding, o = e.options.delay;
        l.number(o) || (o = 200);
        function a() {
          ut(i).forEach(function(c) {
            c[1] = Buffer.from(c[1]), n !== "buffer" && (c[1] = c[1].toString(n)), t.apply(null, c);
          }), r = null, i = [];
        }
        return function(c, s) {
          i.push(s), r || (r = setTimeout(a, o));
        };
      }
      function ve() {
        var e = {};
        return function(t) {
          return function(r, i) {
            e[r + i] = [r, i], setTimeout(function() {
              Object.keys(e).forEach(function(n) {
                t.apply(null, e[n]);
              }), e = {};
            });
          };
        };
      }
      function ge(e, t, r = function() {
      }) {
        l.directory(e) ? I.readdir(e, function(i, n) {
          if (i)
            if (/^(EPERM|EACCES)$/.test(i.code))
              console.warn("Warning: Cannot access %s.", e);
            else
              throw i;
          else
            n.forEach(function(o) {
              var a = S.join(e, o);
              l.directory(a) && t(a);
            }), r();
        }) : r();
      }
      function dt(e) {
        var t = 0;
        return function() {
          return t++, function() {
            t--, t === 0 && e();
          };
        };
      }
      function mt() {
        return function() {
        };
      }
      function we(e, t) {
        return !l.func(t) || t(e, T) !== T;
      }
      var ye = de.deprecate(function() {
      }, "(node-watch) First param in callback function  is replaced with event name since 0.5.0, use  `(evt, filename) => {}` if you want to get the filename");
      function v() {
        me.EventEmitter.call(this), this.watchers = {}, this._isReady = false, this._isClosed = false;
      }
      de.inherits(v, me.EventEmitter);
      v.prototype.expose = function() {
        var e = {}, t = this, r = ["on", "emit", "once", "close", "isClosed", "listeners", "setMaxListeners", "getMaxListeners", "getWatchedPaths"];
        return r.forEach(function(i) {
          e[i] = function() {
            return t[i].apply(t, arguments);
          };
        }), e;
      };
      v.prototype.isClosed = function() {
        return this._isClosed;
      };
      v.prototype.close = function(e) {
        var t = this;
        if (e) {
          var r = this.watchers[e];
          r && r.close && (r.close(), delete t.watchers[e]), ge(e, function(i) {
            t.close(i);
          });
        } else
          Object.keys(t.watchers).forEach(function(i) {
            var n = t.watchers[i];
            n && n.close && n.close();
          }), this.watchers = {};
        l.emptyObject(t.watchers) && (this._isClosed || (this._isClosed = true, process.nextTick(xe, this)));
      };
      v.prototype.getWatchedPaths = function(e) {
        if (l.func(e)) {
          var t = this;
          t._isReady ? e(Object.keys(t.watchers)) : t.on("ready", function() {
            e(Object.keys(t.watchers));
          });
        }
      };
      function U(e) {
        e._isReady || (e._isReady = true, process.nextTick(function() {
          e.emit("ready");
        }));
      }
      function xe(e) {
        e.emit("close");
      }
      v.prototype.add = function(e, t) {
        var r = this;
        t = t || { fpath: "" };
        var i = S.resolve(t.fpath);
        this.watchers[i] = e;
        var n = function(a, c) {
          if (!r.isClosed()) {
            var s = c;
            l.nil(s) && (s = ""), s = S.join(t.fpath, s), t.options.recursive && he(function(u) {
              if (!u) {
                var d = S.resolve(s);
                if (!l.exists(s))
                  r.close(d);
                else {
                  var w = l.directory(s) && !r.watchers[d] && we(s, t.options.filter);
                  w && r.watchDirectory(s, t.options);
                }
              }
            }), o(a, s);
          }
        }, o = ft(t, function(a, c) {
          if (t.compareName)
            t.compareName(c) && r.emit("change", a, c);
          else {
            var s = st(t.options.filter);
            s(c, function() {
              r.flag ? r.flag = "" : r.emit("change", a, c);
            });
          }
        });
        e.on("error", function(a) {
          r.isClosed() || (l.windows() && a.code === "EPERM" ? (e.emit("change", pe, t.fpath && ""), r.flag = "windows-error", r.close(i)) : r.emit("error", a));
        }), e.on("change", n);
      };
      v.prototype.watchFile = function(e, t, r) {
        var i = S.join(e, "../"), n = Object.assign({}, t, { filter: null, encoding: "utf8" });
        delete n.recursive;
        var o = I.watch(i, n);
        this.add(o, { type: "file", fpath: i, options: Object.assign({}, n, { encoding: t.encoding }), compareName: function(a) {
          return l.samePath(a, e);
        } }), l.func(r) && (r.length === 1 && ye(), this.on("change", r));
      };
      v.prototype.watchDirectory = function(e, t, r, i = mt) {
        var n = this, o = i();
        he(function(a) {
          t.recursive = !!t.recursive;
          var c = Object.assign({}, t, { encoding: "utf8" });
          if (a || delete c.recursive, n._isClosed)
            return o(), n.close();
          var s = I.watch(e, c);
          n.add(s, { type: "dir", fpath: e, options: t }), l.func(r) && (r.length === 1 && ye(), n.on("change", r)), t.recursive && !a && ge(e, function(u) {
            we(u, t.filter) && n.watchDirectory(u, t, null, i);
          }, i()), o();
        });
      };
      function ht(e) {
        var t = new v(), r = ve(), i = e.length;
        return e.forEach(function(n) {
          n.on("change", r(function(o, a) {
            t.emit("change", o, a);
          })), n.on("error", function(o) {
            t.emit("error", o);
          }), n.on("ready", function() {
            --i || U(t);
          });
        }), t.close = function() {
          e.forEach(function(n) {
            n.close();
          }), process.nextTick(xe, t);
        }, t.getWatchedPaths = function(n) {
          if (l.func(n)) {
            var o = e.map(function(a) {
              return new Promise(function(c) {
                a.getWatchedPaths(c);
              });
            });
            Promise.all(o).then(function(a) {
              var c = F(at(a));
              n(c);
            });
          }
        }, t.expose();
      }
      function N(e, t, r) {
        var i = new v();
        if (l.buffer(e) && (e = e.toString()), !l.array(e) && !l.exists(e) && i.emit("error", new Error(e + " does not exist.")), l.string(t) && (t = { encoding: t }), l.func(t) && (r = t, t = {}), arguments.length < 2 && (t = {}), t.encoding ? ct(t.encoding) : t.encoding = "utf8", l.array(e)) {
          if (e.length === 1)
            return N(e[0], t, r);
          var n = ve();
          return ht(F(e).map(function(a) {
            var c = N(a, t);
            return l.func(r) && c.on("change", n(r)), c;
          }));
        }
        if (l.file(e))
          i.watchFile(e, t, r), U(i);
        else if (l.directory(e)) {
          var o = dt(function() {
            U(i);
          });
          i.watchDirectory(e, t, r, o);
        }
        return i.expose();
      }
      H.exports = N;
      H.exports.default = N;
    });
    Le(exports2, { createRemote: () => Q, derver: () => vt });
    var ee = h(require("http"));
    var x = h(require("fs/promises"));
    var te = h(require("os"));
    var p = h(require("path"));
    var D = h(require("zlib"));
    var ke = "text/html";
    var Me = "text/html";
    var $e = "image/jpeg";
    var De = "image/jpeg";
    var Pe = "image/gif";
    var _e = "image/png";
    var We = "image/svg+xml";
    var Ae = "text/javascript";
    var Ie = "application/json";
    var Fe = "text/css";
    var Ue = "image/x-icon";
    var k = { ".htm": ke, ".html": Me, ".jpg": $e, ".jpeg": De, ".gif": Pe, ".png": _e, ".svg": We, ".js": Ae, ".json": Ie, ".css": Fe, ".ico": Ue };
    var g = (e, t, r) => `[${t}m${e}[${r}m`;
    var f = { blue: (e) => g(e, 34, 39), red: (e) => g(e, 31, 39), green: (e) => g(e, 32, 39), yellow: (e) => g(e, 33, 39), magenta: (e) => g(e, 35, 39), cyan: (e) => g(e, 36, 39), gray: (e) => g(e, 90, 39), bold: (e) => g(e, 1, 22), italic: (e) => g(e, 3, 23) };
    function B() {
      let e = 2, t = [], r = { line: (i = "", n, o) => {
        let a = i.length;
        return a + 2 > e && (e = a + 2), n && (i = f[n](i)), o && (i = f[o](i)), t.push([i, a]), r;
      }, print: (i = 0, n) => {
        let o = " ".repeat(i), a = `${o}\u2554${"\u2550".repeat(e)}\u2557`, c = `${o}\u255A${"\u2550".repeat(e)}\u255D`, s = `${o}\u2551`, u = "\u2551";
        n && (a = f[n](a), c = f[n](c), s = f[n](s), u = f[n](u)), console.log(a);
        for (let d of t) {
          let w = Math.floor((e - d[1]) / 2), L = e - d[1] - w;
          console.log(`${s}${" ".repeat(w)}${d[0]}${" ".repeat(L)}${u}`);
        }
        return console.log(c), r;
      } };
      return r;
    }
    var G = h(require("http"));
    var J = h(require("os"));
    var K = h(require("path"));
    var M = h(require("fs"));
    var V = "/derver-livereload-events";
    var Y = "/derver-livereload-remote";
    var $ = new Set();
    function y(e, t, r) {
      $.forEach((i) => {
        typeof i[e] == "function" && i[e](t, r);
      });
    }
    function Q(e) {
      let t = typeof e == "string" ? e : false, r = "localhost", i = 7e3;
      t || (e && e.host && (r = e.host), e && e.port && (i = e.port));
      function n(o, a) {
        return new Promise((c) => {
          let s = t && ze(t);
          s && s.host && (hostname = s.host), s && s.port && (i = s.port);
          let u = { hostname: s && s.host || r, port: s && s.port || i, path: Y, method: "POST", headers: { "Content-Type": "application/json" } }, d = G.default.request(u, (w) => {
            w.on("data", (L) => {
              L.toString() === "REMOTE OK" ? c("OK") : (console.log("[Derver remote]: Warning: wrong command " + o), c("WARNING"));
            });
          });
          d.on("error", (w) => {
            console.log("[Derver remote]: Warning:" + w.message), c("WARNING");
          }), d.write(JSON.stringify({ command: o, data: a || {} })), d.end();
        });
      }
      return { reload() {
        return n("reload");
      }, console(o) {
        return n("console", { text: o });
      }, error(o, a) {
        return n("error", { text: o, header: a });
      } };
    }
    function X(e) {
      return !e.watch && !e.remote ? null : function(t, r, i) {
        if (t.url == V) {
          let n = (a, c) => r.write(`event: ${a}
data: ${JSON.stringify(c || {})}

`), o = { reload: () => n("refresh"), console: (a) => n("console", { text: a }), error: (a, c) => n("srverror", { text: a, header: c || "Error" }) };
          $.add(o), r.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" }), r.on("close", function() {
            $.delete(o);
          }), r.write(`data: connected

`);
        } else if (e.remote && t.url == Y)
          if (t.method == "POST") {
            let n = "";
            t.on("data", (o) => {
              n += o.toString();
            }), t.on("end", () => {
              let o = JSON.parse(n || "{}");
              if (o.command == "reload")
                y("reload");
              else if (o.command == "console")
                y("console", o.data.text);
              else if (o.command == "error")
                y("error", o.data.text, o.data.header);
              else
                return r.end("REMOTE WRONG COMMAND");
              r.end("REMOTE OK");
            });
          } else
            i();
        else
          i();
      };
    }
    function He() {
      return function(e) {
        let t;
        function r() {
          if (window.EventSource) {
            let o = function(a) {
              return JSON.parse(a.data);
            };
            var n = new EventSource(e);
            n.addEventListener("refresh", function(a) {
              location.reload();
            }, false), n.addEventListener("console", function(a) {
              console.log(o(a).text);
            }, false), n.addEventListener("srverror", function(a) {
              let c = o(a);
              i(c.header, c.text);
            }, false), n.addEventListener("open", function(a) {
              t && location.reload(), console.log("[Livereload] Ready");
            }, false), n.addEventListener("error", function(a) {
              a.eventPhase == EventSource.CLOSED && n.close(), a.target.readyState == EventSource.CLOSED ? (console.log("[Livereload] Disconnected! Retry in 5s..."), !t && i("Disconnected!", "Connection with server was lost."), t = setTimeout(r, 5e3)) : a.target.readyState == EventSource.CONNECTING && console.log("[Livereload] Connecting...");
            }, false);
          } else
            console.error("[Livereload] Can't start Livereload! Your browser doesn't support SSE");
        }
        function i(n, o) {
          let a = document.createElement("div");
          a.innerHTML = `
                  <div class="lrmsg-bg">
                    <div class="lrmsg-modal">
                      <div class="lrmsg-close" onclick="this.parentNode.parentNode.remove()">\xD7</div>
                      <div class="lrmsg-header">${n}</div>
                      <div class="lrmsg-content">${o}</div>
                    </div>
                  </div>
                  <style>
                    .lrmsg-bg{
                      font-family: Verdana, Geneva, sans-serif;
                      font-size: 16px;
                      background: rgba(30, 30, 30, 0.6);
                      position: fixed;
                      top: 0;
                      right: 0;
                      bottom: 0;
                      left: 0;
                      z-index: 1;
                    }

                    .lrmsg-modal{
                      position: relative;
                      max-width: 600px;
                      max-height: 400px;
                      margin: 40px auto; 
                      margin-top: 0px;
                      background-color: #1e1e1e;
                      border-top: 3px solid red;
                      border-radius: 5px;
                      opacity: 0;
                      animation: slide 0.3s forwards;
                      color: #cccccc;
                    }

                    .lrmsg-header{
                      font-weight: bold;
                      font-size: 18px;
                      padding: 10px;
                    }

                    .lrmsg-close{
                      float: right;
                      font-weight: bold;
                      color: #cccccc;
                      font-size: 25px;
                      margin: 3px 10px;
                      cursor: pointer;
                    }

                    .lrmsg-close:hover{color:#9a9a9a}

                    .lrmsg-content{
                      padding: 10px;
                      border-top: 1px solid #363636;
                    }

                    @keyframes slide {
                      100% { margin-top: 40px; opacity: 1;}
                  }
                  </style>
                `, document.body.append(a);
        }
        r();
      }.toString();
    }
    function Z(e) {
      return !e.watch && !e.remote ? null : function(t, r, i) {
        [".html", ".htm"].includes(t.extname) && (r.body = Buffer.from(r.body.toString("utf-8").replace(/(<\/body>)/, `<script>(${He()})('${V}')<\/script>
$1`))), i();
      };
    }
    function ze(e) {
      let t = J.default.tmpdir(), r = K.default.join(t, "derver_" + e);
      return M.default.existsSync(r) ? JSON.parse(M.default.readFileSync(r, "utf-8")) : false;
    }
    var q = "0.4.16";
    function re(e) {
      let t = e.watch === false && e.cache && e.compress;
      return new Promise(async (r, i) => {
        let n = await et(e), o = ee.default.createServer(function(c, s) {
          Ge([Je(e), Ve(e), Ye(e), ...e.middlewares.list(), X(e), Ke(e), Qe(e), Z(e), Xe(e), Ze(e)], c, s);
        });
        o.on("listening", (c) => {
          r(o), B().line(t ? "Derver server started" : "Development server started", "bold").line("on").line(`http://${e.host}:${e.port}`, "blue").print(5, "green");
        }), o.on("error", (c) => {
          console.log(f.bold(`

Server starting error:`)), console.log("  " + f.red(c.toString()) + `

`), i(c.toString());
        }), o.listen(e.port, e.host);
        let a = async () => {
          await n(), o.close();
        };
        process.on("SIGTERM", a), process.on("exit", a);
      });
    }
    function ne() {
      let e = [];
      function t(n) {
        for (let o of n.middlewares)
          e.push(function(a, c, s) {
            if (n.method && n.method !== a.method)
              return s();
            if (n.pattern && n.pattern !== "") {
              let u = qe(n.pattern, a.path);
              if (!u || n.exact && !u.exact)
                return s();
              a.params = u.params;
            }
            o(a, c, s);
          });
      }
      function r(n, o, a) {
        n = Array.from(n);
        let c = n.length > 0 && typeof n[0] == "string" ? n.shift() : null;
        return c && !c.startsWith("/") && (c = "/" + c), { method: o == "use" ? null : o.toUpperCase(), pattern: (a || "") + (c || ""), exact: !(a && !c), middlewares: n.filter((s) => typeof s == "function") };
      }
      function i(n) {
        let o = new Proxy({}, { get(a, c) {
          return c == "list" ? () => e : c == "sub" ? function() {
            let s = Array.from(arguments), u = (n || "") + s.shift();
            s.forEach((d) => d(i(u)));
          } : function() {
            return t(r(arguments, c, n)), o;
          };
        } });
        return o;
      }
      return i();
    }
    function Ge(e, t, r) {
      e.push((n, o) => o.send(o.body || ""));
      let i = () => {
        let n;
        for (; !n && e.length > 0; )
          n = e.shift();
        n && n(t, r, i);
      };
      i();
    }
    function Je(e) {
      return function(t, r, i) {
        let n = new URL(t.url, "http://" + (t.headers.host || "derver.tld"));
        t.path = n.pathname, t.host = n.host, t.hostname = n.hostname, t.port = n.port, t.search = n.search, t.query = Array.from(n.searchParams).reduce((o, [a, c]) => (o[a] = c, o), {}), i();
      };
    }
    function Ke(e) {
      return async function(t, r, i) {
        if (t.file = p.default.join(e.dir, t.path), t.extname = p.default.extname(t.file), t.extname === "" && (t.file = p.default.join(t.file, e.index), t.extname = p.default.extname(t.file)), t.exists = await ie(t.file), e.spa && !t.exists && t.extname === p.default.extname(e.index)) {
          console.log();
          let n = p.default.dirname(t.file);
          do
            if (n = p.default.dirname(n), t.file = p.default.join(n, e.index), t.exists = await ie(t.file))
              break;
          while (n !== ".");
        }
        i();
      };
    }
    function Ve(e) {
      return function(t, r, i) {
        r.send = function(n) {
          r.writeHead(200), r.end(n);
        }, i();
      };
    }
    function Ye(e) {
      return function(t, r, i) {
        r.setHeader("Server", "Derver/" + q), i();
      };
    }
    function Qe(e) {
      return async function(t, r, i) {
        if (!t.exists)
          return console.log(f.gray("  [web] ") + t.url + " - " + f.red("404 Not Found")), r.writeHead(404, { "Content-Type": "text/plain" }), r.end("Not found");
        k[t.extname] && r.setHeader("Content-Type", k[t.extname]), r.body = await x.default.readFile(t.file), console.log(f.gray("  [web] ") + t.url + " - " + f.green("200 OK")), i();
      };
    }
    function Xe(e) {
      return e.compress ? function(t, r, i) {
        t.headers["accept-encoding"] && (t.headers["accept-encoding"].includes("br") ? (r.setHeader("Content-Encoding", "br"), r.body = D.default.brotliCompressSync(r.body)) : t.headers["accept-encoding"].includes("gzip") && (r.setHeader("Content-Encoding", "gzip"), r.body = D.default.gzipSync(r.body))), i();
      } : null;
    }
    function Ze(e) {
      return e.cache ? function(t, r, i) {
        typeof e.cache != "number" && (e.cache = 31536e3), r.setHeader("Cache-Control", "max-age=" + e.cache), i();
      } : null;
    }
    function qe(e, t) {
      e = e.endsWith("/") ? e : e + "/", t = t.endsWith("/") ? t : t + "/";
      let r = [], i = {}, n = true, o = e.split("/").map((c) => c.startsWith(":") ? (r.push(c.slice(1)), "([^\\/]+)") : c).join("\\/"), a = t.match(new RegExp(`^${o}$`));
      return a || (n = false, a = t.match(new RegExp(`^${o}`))), a ? (r.forEach((c, s) => i[c] = a[s + 1]), { exact: n, params: i, part: a[0].slice(0, -1) }) : null;
    }
    async function et(e) {
      let t = te.default.tmpdir();
      if (typeof e.remote != "string")
        return () => {
        };
      let r = p.default.join(t, "derver_" + e.remote);
      return await x.default.writeFile(r, JSON.stringify({ host: e.host, port: e.port })), async () => await x.default.unlink(r);
    }
    async function ie(e) {
      try {
        return await x.default.stat(e), true;
      } catch {
        return false;
      }
    }
    var Ee = h(be());
    function Se(e) {
      if (typeof e.watch == "string" && (e.watch = [e.watch]), e.watch) {
        console.log(f.yellow(`       Waiting for changes...

`));
        let t = [];
        process.on("SIGTERM", () => t.forEach((n) => n.close())), process.on("exit", () => t.forEach((n) => n.close()));
        let r = new Set(), i = (n, o) => {
          r.has(n) || (r.add(n), setTimeout(() => r.delete(n), 100), o());
        };
        for (let n of e.watch)
          t.push((0, Ee.default)(n, { recursive: true }, async function(o, a) {
            i(n, () => console.log(f.gray("[watch] ") + "Changes in " + f.blue(n)));
            let c = true;
            typeof e.onwatch == "function" && await e.onwatch({ prevent: () => c = false, reload: () => y("reload"), console: (s) => y("console", s), error: (s, u) => y("error", s, u) }, n, a, o), c && y("reload");
          }));
      }
    }
    var pt = { port: 7e3, host: "localhost", index: "index.html", dir: "public", compress: false, cache: false, spa: false, watch: null, onwatch: null, remote: false };
    function vt(e) {
      let t = Object.assign(pt, e, { middlewares: ne() });
      return (async () => {
        t.watch === null && (t.watch = t.dir);
        try {
          await re(t);
        } catch (r) {
          console.log(r.message), process.exit(1);
        }
        Se(t);
      })(), t.middlewares;
    }
  }
});

// server:server_development.js
var import_derver = __toModule(require_derver_cjs());
var import_path = __toModule(require("path"));
var DIR = import_path.default.join(__dirname, "static");
function server_development_default(options) {
  return (0, import_derver.derver)({
    dir: import_path.default.join(__dirname, "static"),
    ...options,
    remote: "malina_fullstack_template"
  });
}

// src/server/main.js
var app = server_development_default({
  port: 3e3,
  spa: true
});
var articles = [
  {
    id: 1,
    title: `Write Less Code`,
    subtitle: `The most important metric you're not paying attention to`,
    content: `
   <p>All code is buggy. It stands to reason, therefore, that the more code you have to write the buggier your apps will be.</p>
   <p>Writing more code also takes more time, leaving less time for other things like optimisation, nice-to-have features, or being outdoors instead of hunched over a laptop.</p>
   <p>In fact it's widely acknowledged that  and  grow quadratically, not linearly, with the size of a codebase. That tracks with our intuitions: a ten-line pull request will get a level of scrutiny rarely applied to a 100-line one. And once a given module becomes too big to fit on a single screen, the cognitive effort required to understand it increases significantly. We compensate by refactoring and adding comments \u2014 activities that almost always result in more code. It's a vicious cycle.</p>
   <p>Yet while we obsess \u2014 rightly! \u2014 over performance numbers, bundle size and anything else we can measure, we rarely pay attention to the amount of code we're writing.</p>
`
  },
  {
    id: 2,
    title: `Virtual DOM is pure overhead`,
    subtitle: `Let's retire the 'virtual DOM is fast' myth once and for all`,
    content: `
   <p>If you've used JavaScript frameworks in the last few years, you've probably heard the phrase 'the virtual DOM is fast', often said to mean that it's faster than the real DOM. It's a surprisingly resilient meme \u2014 for example people have asked how Svelte can be fast when it doesn't use a virtual DOM.</p>
   `
  },
  {
    id: 3,
    title: `Rethinking reactivity`,
    subtitle: `It's finally here`,
    content: `
   <p>Malina.js builds your web-application to use it without framework on frontend side. Therefore your web-app becomes thinner and faster, and the application itself consist of vanilla JavaScript, look at examples. TodoMVC example 2.7kb (gzipped) and source code</p>
   `
  }
];
app.use("/posts", async (req, resp, next) => {
  resp.send(JSON.stringify(articles));
});
app.use("/post/:id", async (req, resp, next) => {
  let postId = req.params.id;
  resp.send(JSON.stringify(articles[postId]));
});
//# sourceMappingURL=app.js.map
