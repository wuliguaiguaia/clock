// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"main.js":[function(require,module,exports) {
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Clock =
/*#__PURE__*/
function () {
  function Clock(id, W) {
    _classCallCheck(this, Clock);

    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.W = W;
    this.init();
  }

  _createClass(Clock, [{
    key: "init",
    value: function init() {
      this.canvas.width = this.canvas.height = this.W;
      this.ctx.translate(this.W / 2, this.W / 2);
      window.requestAnimationFrame(this.render.bind(this));
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var time = this.getTime();

      var _time = _slicedToArray(time, 3),
          hour = _time[0],
          minute = _time[1],
          second = _time[2];

      this.ctx.clearRect(-this.W / 2, -this.W / 2, this.W, this.W); // 大边框

      this.drawArc(0, 0, this.W / 2, this.ctx); // 周围圆点

      for (var i = 0; i < 60; i++) {
        var color = void 0;

        if (i % 5) {
          color = "#ccc";
        } else {
          color = "black";
        }

        var x = (this.W / 2 - 15) * Math.cos(Math.PI * 2 / 60 * i);
        var y = (this.W / 2 - 15) * Math.sin(Math.PI * 2 / 60 * i);
        this.drawArc(x, y, 5, this.ctx, color);
      } // 数字


      var numArr = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
      numArr.forEach(function (num, i) {
        var x = (_this.W / 2 - 30) * Math.cos(Math.PI * 2 / 12 * i);
        var y = (_this.W / 2 - 30) * Math.sin(Math.PI * 2 / 12 * i);

        _this.drawText(num, x, y, '#333', _this.ctx);
      }); // 时针

      var hDeg = 2 * Math.PI / 12 * hour + 2 * Math.PI / 60 * minute / 12;
      this.drawLine(0, 20, hDeg, this.W / 5, 'red', 3, this.ctx); // 分针

      var mDeg = 2 * Math.PI / 60 * minute;
      this.drawLine(0, 20, mDeg, this.W / 3, 'blue', 2, this.ctx); // 秒针

      var sDeg = 2 * Math.PI / 60 * second;
      this.drawLine(0, 20, sDeg, this.W / 2 - 10, 'green', 2, this.ctx); // 圆心

      this.drawArc(0, 0, 5, this.ctx, '#fff');
      window.requestAnimationFrame(this.render.bind(this));
    }
  }, {
    key: "getTime",
    value: function getTime() {
      var date = new Date();
      var timeArr = date.toTimeString().split(":");

      if (timeArr[0] > 11) {
        timeArr[0] = timeArr[0] - 12;
      }

      timeArr[2] = timeArr[2].slice(0, 2);
      return timeArr;
    }
  }, {
    key: "drawLine",
    value: function drawLine(x, y, deg, len, color, lineWidth, ctx) {
      ctx.save();
      ctx.beginPath();
      ctx.rotate(deg);
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.moveTo(x, y);
      ctx.lineTo(x, -len);
      ctx.strokeStyle = color;
      ctx.stroke();
      ctx.restore();
    }
  }, {
    key: "drawArc",
    value: function drawArc(x, y, r, ctx, fillColor) {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);

      if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
      } else {
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'yellow';
        ctx.stroke();
      }

      ctx.closePath();
    }
  }, {
    key: "drawText",
    value: function drawText(text, x, y, color, ctx) {
      ctx.beginPath();
      ctx.font = "15px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = 'middle';
      ctx.fillStyle = color;
      ctx.fillText(text, x, y);
    }
  }]);

  return Clock;
}();

new Clock('canvas', 500);
},{}],"../../../../../../Program Files/Git/usr/local/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63309" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../../../Program Files/Git/usr/local/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.map