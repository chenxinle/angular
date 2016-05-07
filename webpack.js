/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _blur = __webpack_require__(5);
	
	var _blur2 = _interopRequireDefault(_blur);
	
	var _fetch = __webpack_require__(10);
	
	var _fetch2 = _interopRequireDefault(_fetch);
	
	var _qs = __webpack_require__(2);
	
	var _qs2 = _interopRequireDefault(_qs);
	
	var _activity = __webpack_require__(6);
	
	var _activity2 = _interopRequireDefault(_activity);
	
	var _detailHeader = __webpack_require__(32);
	
	var _detailHeader2 = _interopRequireDefault(_detailHeader);
	
	var _detailSection = __webpack_require__(34);
	
	var _detailSection2 = _interopRequireDefault(_detailSection);
	
	var _zepto = __webpack_require__(1);
	
	var _zepto2 = _interopRequireDefault(_zepto);
	
	var _share = __webpack_require__(35);
	
	var _share2 = _interopRequireDefault(_share);
	
	var _wxapi = __webpack_require__(24);
	
	var _wxapi2 = _interopRequireDefault(_wxapi);
	
	var _commonconfig = __webpack_require__(22);
	
	var _commonconfig2 = _interopRequireDefault(_commonconfig);
	
	var _progress = __webpack_require__(17);
	
	var _progress2 = _interopRequireDefault(_progress);
	
	var _overlay = __webpack_require__(27);
	
	var _overlay2 = _interopRequireDefault(_overlay);
	
	var _cookie = __webpack_require__(13);
	
	var _cookie2 = _interopRequireDefault(_cookie);
	
	var _user = __webpack_require__(30);
	
	var _user2 = _interopRequireDefault(_user);
	
	var _bottomBtn = __webpack_require__(38);
	
	var _bottomBtn2 = _interopRequireDefault(_bottomBtn);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var query = _qs2.default.query;
	
	_commonconfig2.default.get();
	var progress = new _progress2.default();
	var overlay = new _overlay2.default();
	overlay.hide();
	overlay.$el.off('click');
	
	var chooseTicket = function chooseTicket(activity, event) {
	  var activityParam = {
	    id: activity.id,
	    name: activity.name
	  };
	  activityParam.venue = {
	    name: activity.venue.name
	  };
	  var eventParam = {
	    id: event.id,
	    specification: event.specification,
	    start: event.start
	  };
	
	  location.href = "/activity/choose_ticket.html?" + _qs2.default.stringify({
	    "activity": JSON.stringify(activityParam),
	    "event": JSON.stringify(eventParam)
	  });
	};
	var render = function render(activity) {
	  var $body = (0, _zepto2.default)('body');
	  new _detailHeader2.default($body, activity);
	  new _detailSection2.default($body, activity);
	  var statusObj = {
	    2: '停售',
	    3: '已过期',
	    5: '退票中'
	  };
	
	  if (activity.status == 1) {
	    var creditItem = '<div class=\'content-item\'>\n                        <img class="credit-icon" src="./img/iconCredit.png" />\n                        <span class="text">保证有票</span>\n                        <span class="text-sub">所有在售演出保证有票</span>\n                      </div>';
	  } else {
	    var creditItem = '';
	  }
	  var $creditPop = '<div class="pop credit-pop" style="display: none;">\n                      <div class="title">票牛保障</div>\n                      <div class="content">\n                        ' + creditItem + '\n                        <div class=\'content-item\'>\n                            <img class="credit-icon" src="./img/iconCredit.png" />\n                            <span class="text">100%真票</span>\n                            <span class="text-sub">专业审核鉴定，平台担保</span>\n                        </div>\n                        <div class=\'content-item\'>\n                            <img class="credit-icon" src="./img/iconCredit.png" />\n                            <span class="text">担保交易</span>\n                            <span class="text-sub">全程消费保障，买得放心</span>\n                        </div>\n                      </div>\n                      <div class="close">关闭</div>\n                    </div>';
	  $body.append($creditPop);
	
	  if (!activity.lowPrice) {
	    (0, _zepto2.default)('.price-info').hide();
	  }
	};
	
	(0, _fetch2.default)({
	  url: '/v1/activities/' + query.id
	}).then(function (data) {
	  var activity = new _activity2.default(data);
	  _wxapi2.default.setTitle(activity.name);
	  _share2.default.init({
	    imgUrl: activity.poster,
	    title: activity.name,
	    desc: '我在票牛发现一部炒鸡棒的演出！'
	  });
	  render(activity);
	
	  var BottomBtn = new _bottomBtn2.default(activity);
	  BottomBtn.userFavor(true);
	
	  //inform
	  (0, _zepto2.default)('.bottom-concern').click(function () {
	    _user2.default.assureLogin('/activity/detail.html?id=' + query.id).then(function () {
	      (0, _zepto2.default)('.concern-icon').toggleClass('concern-select');
	      if ((0, _zepto2.default)('.concern-icon').hasClass('concern-select')) {
	        (0, _fetch2.default)({
	          method: 'POST',
	          url: '/v1/activity/favorite/' + query.id,
	          data: {
	            type: 2
	          }
	        }).then(function () {
	          progress.showMessage('关注成功', true);
	          setTimeout(function () {
	            progress.hide();
	          }, 1000);
	        });
	      } else {
	        (0, _fetch2.default)({
	          method: 'DELETE',
	          url: '/v1/activity/favorite/' + query.id + '?type=2'
	        });
	      }
	    });
	  });
	
	  (0, _zepto2.default)('.confirm-btn').click(function () {
	    overlay.hide();
	    (0, _zepto2.default)('.inform-success-pop').hide();
	  });
	
	  (0, _zepto2.default)('.venue').click(function () {
	    location.href = './venue.html?id=' + activity.venue.id;
	  });
	
	  // header animation
	  (0, _zepto2.default)(window).scroll(function () {
	    var top = (0, _zepto2.default)('body').scrollTop();
	    (0, _zepto2.default)('.nav').css('opacity', 1 - top * 0.01);
	    (0, _zepto2.default)('.navbar').css('opacity', (top - 80) * 0.01);
	  });
	
	  (0, _zepto2.default)('.introduction').click(function () {
	    location.href = './more-detail.html?id=' + query.id;
	  });
	
	  (0, _zepto2.default)('.navbar-back').click(function () {
	    location.href = "javascript:(history.length > 1 && document.referrer.indexOf('piaoniu') != -1)?history.back():'/'";
	  });
	
	  (0, _zepto2.default)('.reservation').click(function () {
	    overlay.show();
	    (0, _zepto2.default)('.reservation-pop').show();
	  });
	
	  (0, _zepto2.default)('.close, .overlay').click(function () {
	    overlay.hide();
	    (0, _zepto2.default)('.reservation-pop').hide();
	    (0, _zepto2.default)('.credit-pop').hide();
	  });
	
	  (0, _zepto2.default)('.credit').click(function () {
	    overlay.show();
	    (0, _zepto2.default)('.credit-pop').show();
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = Zepto;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	exports.parse = function (url) {
	    var query;
	    if (url) {
	        if (url.indexOf('?') == -1) {
	            query = url;
	        } else {
	            query = url.split('?')[1];
	        }
	    } else {
	        query = location.search.slice(1);
	    }
	    var ret = {};
	    query.split("&").forEach(function (pair) {
	        var splited = pair.split("=");
	        ret[splited[0]] = decodeURIComponent(splited[1]);
	    });
	    return ret;
	};
	
	exports.append = function (origin, obj) {
	    var splited = origin.split('?');
	    var base = splited[0];
	    var qs = '?' + splited[1];
	
	    var params = exports.parse(qs);
	    for (var k in obj) {
	        params[k] = obj[k];
	    }
	
	    return base + '?' + exports.stringify(params);
	};
	
	exports.stringify = function (data) {
	    var str = "";
	    var result = [];
	    for (var key in data) {
	        result.push(key + "=" + encodeURIComponent(data[key]));
	    }
	    return result.join("&");
	};
	
	exports.query = exports.parse(location.search);

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	module.exports = moment;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	/*
	
	StackBlur - a fast almost Gaussian Blur For Canvas
	
	Version:    0.5
	Author:     Mario Klingemann
	Contact:    mario@quasimondo.com
	Website:    http://www.quasimondo.com/StackBlurForCanvas
	Twitter:    @quasimondo
	
	In case you find this class useful - especially in commercial projects -
	I am not totally unhappy for a small donation to my PayPal account
	mario@quasimondo.de
	
	Or support me on flattr:
	https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript
	
	Copyright (c) 2010 Mario Klingemann
	
	Permission is hereby granted, free of charge, to any person
	obtaining a copy of this software and associated documentation
	files (the "Software"), to deal in the Software without
	restriction, including without limitation the rights to use,
	copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the
	Software is furnished to do so, subject to the following
	conditions:
	
	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	var mul_table = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];
	
	var shg_table = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
	
	function stackBlurImage(imageID, canvasID, radius, blurAlphaChannel, width, height) {
	
	    var img = document.getElementById(imageID);
	    var w = width || img.naturalWidth;
	    var h = height || img.naturalHeight;
	
	    var canvas = document.getElementById(canvasID);
	
	    canvas.style.width = w + "px";
	    canvas.style.height = h + "px";
	    canvas.width = w;
	    canvas.height = h;
	
	    var context = canvas.getContext("2d");
	    context.clearRect(0, 0, w, h);
	    context.drawImage(img, 0, 0, w, h);
	
	    if (isNaN(radius) || radius < 1) return;
	
	    if (blurAlphaChannel) stackBlurCanvasRGBA(canvasID, 0, 0, w, h, radius);else stackBlurCanvasRGB(canvasID, 0, 0, w, h, radius);
	}
	
	function stackBlurCanvasRGBA(id, top_x, top_y, width, height, radius) {
	    if (isNaN(radius) || radius < 1) return;
	    radius |= 0;
	
	    var canvas = document.getElementById(id);
	    var context = canvas.getContext("2d");
	    var imageData;
	
	    try {
	        try {
	            imageData = context.getImageData(top_x, top_y, width, height);
	        } catch (e) {
	            console.log(e);
	            // NOTE: this part is supposedly only needed if you want to work with local files
	            // so it might be okay to remove the whole try/catch block and just use
	            // imageData = context.getImageData( top_x, top_y, width, height );
	            try {
	                netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
	                imageData = context.getImageData(top_x, top_y, width, height);
	            } catch (e) {
	                throw new Error("unable to access local image data: " + e);
	                return;
	            }
	        }
	    } catch (e) {
	        throw new Error("unable to access image data: " + e);
	    }
	
	    var pixels = imageData.data;
	
	    var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum, r_out_sum, g_out_sum, b_out_sum, a_out_sum, r_in_sum, g_in_sum, b_in_sum, a_in_sum, pr, pg, pb, pa, rbs;
	
	    var div = radius + radius + 1;
	    var w4 = width << 2;
	    var widthMinus1 = width - 1;
	    var heightMinus1 = height - 1;
	    var radiusPlus1 = radius + 1;
	    var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;
	
	    var stackStart = new BlurStack();
	    var stack = stackStart;
	    for (i = 1; i < div; i++) {
	        stack = stack.next = new BlurStack();
	        if (i == radiusPlus1) var stackEnd = stack;
	    }
	    stack.next = stackStart;
	    var stackIn = null;
	    var stackOut = null;
	
	    yw = yi = 0;
	
	    var mul_sum = mul_table[radius];
	    var shg_sum = shg_table[radius];
	
	    for (y = 0; y < height; y++) {
	        r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;
	
	        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
	        g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
	        b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
	        a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);
	
	        r_sum += sumFactor * pr;
	        g_sum += sumFactor * pg;
	        b_sum += sumFactor * pb;
	        a_sum += sumFactor * pa;
	
	        stack = stackStart;
	
	        for (i = 0; i < radiusPlus1; i++) {
	            stack.r = pr;
	            stack.g = pg;
	            stack.b = pb;
	            stack.a = pa;
	            stack = stack.next;
	        }
	
	        for (i = 1; i < radiusPlus1; i++) {
	            p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
	            r_sum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - i);
	            g_sum += (stack.g = pg = pixels[p + 1]) * rbs;
	            b_sum += (stack.b = pb = pixels[p + 2]) * rbs;
	            a_sum += (stack.a = pa = pixels[p + 3]) * rbs;
	
	            r_in_sum += pr;
	            g_in_sum += pg;
	            b_in_sum += pb;
	            a_in_sum += pa;
	
	            stack = stack.next;
	        }
	
	        stackIn = stackStart;
	        stackOut = stackEnd;
	        for (x = 0; x < width; x++) {
	            pixels[yi + 3] = pa = a_sum * mul_sum >> shg_sum;
	            if (pa != 0) {
	                pa = 255 / pa;
	                pixels[yi] = (r_sum * mul_sum >> shg_sum) * pa;
	                pixels[yi + 1] = (g_sum * mul_sum >> shg_sum) * pa;
	                pixels[yi + 2] = (b_sum * mul_sum >> shg_sum) * pa;
	            } else {
	                pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
	            }
	
	            r_sum -= r_out_sum;
	            g_sum -= g_out_sum;
	            b_sum -= b_out_sum;
	            a_sum -= a_out_sum;
	
	            r_out_sum -= stackIn.r;
	            g_out_sum -= stackIn.g;
	            b_out_sum -= stackIn.b;
	            a_out_sum -= stackIn.a;
	
	            p = yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1) << 2;
	
	            r_in_sum += stackIn.r = pixels[p];
	            g_in_sum += stackIn.g = pixels[p + 1];
	            b_in_sum += stackIn.b = pixels[p + 2];
	            a_in_sum += stackIn.a = pixels[p + 3];
	
	            r_sum += r_in_sum;
	            g_sum += g_in_sum;
	            b_sum += b_in_sum;
	            a_sum += a_in_sum;
	
	            stackIn = stackIn.next;
	
	            r_out_sum += pr = stackOut.r;
	            g_out_sum += pg = stackOut.g;
	            b_out_sum += pb = stackOut.b;
	            a_out_sum += pa = stackOut.a;
	
	            r_in_sum -= pr;
	            g_in_sum -= pg;
	            b_in_sum -= pb;
	            a_in_sum -= pa;
	
	            stackOut = stackOut.next;
	
	            yi += 4;
	        }
	        yw += width;
	    }
	
	    for (x = 0; x < width; x++) {
	        g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;
	
	        yi = x << 2;
	        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
	        g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
	        b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
	        a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);
	
	        r_sum += sumFactor * pr;
	        g_sum += sumFactor * pg;
	        b_sum += sumFactor * pb;
	        a_sum += sumFactor * pa;
	
	        stack = stackStart;
	
	        for (i = 0; i < radiusPlus1; i++) {
	            stack.r = pr;
	            stack.g = pg;
	            stack.b = pb;
	            stack.a = pa;
	            stack = stack.next;
	        }
	
	        yp = width;
	
	        for (i = 1; i <= radius; i++) {
	            yi = yp + x << 2;
	
	            r_sum += (stack.r = pr = pixels[yi]) * (rbs = radiusPlus1 - i);
	            g_sum += (stack.g = pg = pixels[yi + 1]) * rbs;
	            b_sum += (stack.b = pb = pixels[yi + 2]) * rbs;
	            a_sum += (stack.a = pa = pixels[yi + 3]) * rbs;
	
	            r_in_sum += pr;
	            g_in_sum += pg;
	            b_in_sum += pb;
	            a_in_sum += pa;
	
	            stack = stack.next;
	
	            if (i < heightMinus1) {
	                yp += width;
	            }
	        }
	
	        yi = x;
	        stackIn = stackStart;
	        stackOut = stackEnd;
	        for (y = 0; y < height; y++) {
	            p = yi << 2;
	            pixels[p + 3] = pa = a_sum * mul_sum >> shg_sum;
	            if (pa > 0) {
	                pa = 255 / pa;
	                pixels[p] = (r_sum * mul_sum >> shg_sum) * pa;
	                pixels[p + 1] = (g_sum * mul_sum >> shg_sum) * pa;
	                pixels[p + 2] = (b_sum * mul_sum >> shg_sum) * pa;
	            } else {
	                pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
	            }
	
	            r_sum -= r_out_sum;
	            g_sum -= g_out_sum;
	            b_sum -= b_out_sum;
	            a_sum -= a_out_sum;
	
	            r_out_sum -= stackIn.r;
	            g_out_sum -= stackIn.g;
	            b_out_sum -= stackIn.b;
	            a_out_sum -= stackIn.a;
	
	            p = x + ((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width << 2;
	
	            r_sum += r_in_sum += stackIn.r = pixels[p];
	            g_sum += g_in_sum += stackIn.g = pixels[p + 1];
	            b_sum += b_in_sum += stackIn.b = pixels[p + 2];
	            a_sum += a_in_sum += stackIn.a = pixels[p + 3];
	
	            stackIn = stackIn.next;
	
	            r_out_sum += pr = stackOut.r;
	            g_out_sum += pg = stackOut.g;
	            b_out_sum += pb = stackOut.b;
	            a_out_sum += pa = stackOut.a;
	
	            r_in_sum -= pr;
	            g_in_sum -= pg;
	            b_in_sum -= pb;
	            a_in_sum -= pa;
	
	            stackOut = stackOut.next;
	
	            yi += width;
	        }
	    }
	
	    context.putImageData(imageData, top_x, top_y);
	}
	
	function stackBlurCanvasRGB(id, top_x, top_y, width, height, radius) {
	    if (isNaN(radius) || radius < 1) return;
	    radius |= 0;
	
	    var canvas = document.getElementById(id);
	    var context = canvas.getContext("2d");
	    var imageData;
	
	    try {
	        try {
	            imageData = context.getImageData(top_x, top_y, width, height);
	        } catch (e) {
	            console.log(e);
	            // NOTE: this part is supposedly only needed if you want to work with local files
	            // so it might be okay to remove the whole try/catch block and just use
	            // imageData = context.getImageData( top_x, top_y, width, height );
	            try {
	                netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
	                imageData = context.getImageData(top_x, top_y, width, height);
	            } catch (e) {
	                throw new Error("unable to access local image data: " + e);
	                return;
	            }
	        }
	    } catch (e) {
	        throw new Error("unable to access image data: " + e);
	    }
	
	    var pixels = imageData.data;
	
	    var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, r_out_sum, g_out_sum, b_out_sum, r_in_sum, g_in_sum, b_in_sum, pr, pg, pb, rbs;
	
	    var div = radius + radius + 1;
	    var w4 = width << 2;
	    var widthMinus1 = width - 1;
	    var heightMinus1 = height - 1;
	    var radiusPlus1 = radius + 1;
	    var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;
	
	    var stackStart = new BlurStack();
	    var stack = stackStart;
	    for (i = 1; i < div; i++) {
	        stack = stack.next = new BlurStack();
	        if (i == radiusPlus1) var stackEnd = stack;
	    }
	    stack.next = stackStart;
	    var stackIn = null;
	    var stackOut = null;
	
	    yw = yi = 0;
	
	    var mul_sum = mul_table[radius];
	    var shg_sum = shg_table[radius];
	
	    for (y = 0; y < height; y++) {
	        r_in_sum = g_in_sum = b_in_sum = r_sum = g_sum = b_sum = 0;
	
	        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
	        g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
	        b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
	
	        r_sum += sumFactor * pr;
	        g_sum += sumFactor * pg;
	        b_sum += sumFactor * pb;
	
	        stack = stackStart;
	
	        for (i = 0; i < radiusPlus1; i++) {
	            stack.r = pr;
	            stack.g = pg;
	            stack.b = pb;
	            stack = stack.next;
	        }
	
	        for (i = 1; i < radiusPlus1; i++) {
	            p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
	            r_sum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - i);
	            g_sum += (stack.g = pg = pixels[p + 1]) * rbs;
	            b_sum += (stack.b = pb = pixels[p + 2]) * rbs;
	
	            r_in_sum += pr;
	            g_in_sum += pg;
	            b_in_sum += pb;
	
	            stack = stack.next;
	        }
	
	        stackIn = stackStart;
	        stackOut = stackEnd;
	        for (x = 0; x < width; x++) {
	            pixels[yi] = r_sum * mul_sum >> shg_sum;
	            pixels[yi + 1] = g_sum * mul_sum >> shg_sum;
	            pixels[yi + 2] = b_sum * mul_sum >> shg_sum;
	
	            r_sum -= r_out_sum;
	            g_sum -= g_out_sum;
	            b_sum -= b_out_sum;
	
	            r_out_sum -= stackIn.r;
	            g_out_sum -= stackIn.g;
	            b_out_sum -= stackIn.b;
	
	            p = yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1) << 2;
	
	            r_in_sum += stackIn.r = pixels[p];
	            g_in_sum += stackIn.g = pixels[p + 1];
	            b_in_sum += stackIn.b = pixels[p + 2];
	
	            r_sum += r_in_sum;
	            g_sum += g_in_sum;
	            b_sum += b_in_sum;
	
	            stackIn = stackIn.next;
	
	            r_out_sum += pr = stackOut.r;
	            g_out_sum += pg = stackOut.g;
	            b_out_sum += pb = stackOut.b;
	
	            r_in_sum -= pr;
	            g_in_sum -= pg;
	            b_in_sum -= pb;
	
	            stackOut = stackOut.next;
	
	            yi += 4;
	        }
	        yw += width;
	    }
	
	    for (x = 0; x < width; x++) {
	        g_in_sum = b_in_sum = r_in_sum = g_sum = b_sum = r_sum = 0;
	
	        yi = x << 2;
	        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
	        g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
	        b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
	
	        r_sum += sumFactor * pr;
	        g_sum += sumFactor * pg;
	        b_sum += sumFactor * pb;
	
	        stack = stackStart;
	
	        for (i = 0; i < radiusPlus1; i++) {
	            stack.r = pr;
	            stack.g = pg;
	            stack.b = pb;
	            stack = stack.next;
	        }
	
	        yp = width;
	
	        for (i = 1; i <= radius; i++) {
	            yi = yp + x << 2;
	
	            r_sum += (stack.r = pr = pixels[yi]) * (rbs = radiusPlus1 - i);
	            g_sum += (stack.g = pg = pixels[yi + 1]) * rbs;
	            b_sum += (stack.b = pb = pixels[yi + 2]) * rbs;
	
	            r_in_sum += pr;
	            g_in_sum += pg;
	            b_in_sum += pb;
	
	            stack = stack.next;
	
	            if (i < heightMinus1) {
	                yp += width;
	            }
	        }
	
	        yi = x;
	        stackIn = stackStart;
	        stackOut = stackEnd;
	        for (y = 0; y < height; y++) {
	            p = yi << 2;
	            pixels[p] = r_sum * mul_sum >> shg_sum;
	            pixels[p + 1] = g_sum * mul_sum >> shg_sum;
	            pixels[p + 2] = b_sum * mul_sum >> shg_sum;
	
	            r_sum -= r_out_sum;
	            g_sum -= g_out_sum;
	            b_sum -= b_out_sum;
	
	            r_out_sum -= stackIn.r;
	            g_out_sum -= stackIn.g;
	            b_out_sum -= stackIn.b;
	
	            p = x + ((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width << 2;
	
	            r_sum += r_in_sum += stackIn.r = pixels[p];
	            g_sum += g_in_sum += stackIn.g = pixels[p + 1];
	            b_sum += b_in_sum += stackIn.b = pixels[p + 2];
	
	            stackIn = stackIn.next;
	
	            r_out_sum += pr = stackOut.r;
	            g_out_sum += pg = stackOut.g;
	            b_out_sum += pb = stackOut.b;
	
	            r_in_sum -= pr;
	            g_in_sum -= pg;
	            b_in_sum -= pb;
	
	            stackOut = stackOut.next;
	
	            yi += width;
	        }
	    }
	
	    context.putImageData(imageData, top_x, top_y);
	}
	
	function BlurStack() {
	    this.r = 0;
	    this.g = 0;
	    this.b = 0;
	    this.a = 0;
	    this.next = null;
	}
	
	module.exports = {
	    stackBlurImage: stackBlurImage,
	    stackBlurCanvasRGBA: stackBlurCanvasRGBA,
	    stackBlurCanvasRGB: stackBlurCanvasRGB
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _model = __webpack_require__(7);
	
	var _model2 = _interopRequireDefault(_model);
	
	var _dateutil = __webpack_require__(8);
	
	var _dateutil2 = _interopRequireDefault(_dateutil);
	
	var _moment = __webpack_require__(4);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Activity = function (_Model) {
	    _inherits(Activity, _Model);
	
	    function Activity(data) {
	        _classCallCheck(this, Activity);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Activity).call(this, data));
	
	        _this.getterMethods = {
	            duration: function duration() {
	                var event = this.events[0];
	                if (!event) {
	                    return "";
	                }
	
	                if (!event.end) {
	                    return "";
	                }
	
	                var seconds = event.end - event.start;
	
	                var minutes = Math.ceil(seconds / 60 / 1000);
	                var result = minutes + '分钟';
	                return result;
	            },
	            availableEvents: function availableEvents() {
	                var events = this.events;
	                if (!this._availableEvents) {
	                    this._availableEvents = events.filter(function (event) {
	                        return event.status == 1 && event.ticketsNumber;
	                    });
	                }
	                return this._availableEvents;
	            },
	            period: function period() {
	                var events = this.events;
	                var formatYMD = "YYYY年M月D日";
	                var formatMD = "M月D日";
	                var formatD = "D日";
	
	                if (!events.length) {
	                    return "";
	                } else if (events.length == 1) {
	                    return (0, _moment2.default)(events[0].start).format(formatYMD);
	                } else {
	                    var firstEvent = events[0];
	                    var lastEvent = events[events.length - 1];
	
	                    var from = (0, _moment2.default)(firstEvent.start).format(formatYMD);
	                    var to;
	
	                    if (_dateutil2.default.isSameDate(firstEvent.start, lastEvent.start)) {
	                        return from;
	                    }
	
	                    if (_dateutil2.default.isSameMonth(firstEvent.start, lastEvent.start)) {
	                        to = (0, _moment2.default)(lastEvent.start).format(formatD);
	                    } else if (_dateutil2.default.isSameYear) {
	                        to = (0, _moment2.default)(lastEvent.start).format(formatMD);
	                    } else {
	                        to = (0, _moment2.default)(lastEvent.start).format(formatYMD);
	                    }
	
	                    return from + ' - ' + to;
	                }
	            }
	        };
	        if (data.duration) delete _this.getterMethods.duration;
	        _this.setDataForInstance();
	        return _this;
	    }
	
	    return Activity;
	}(_model2.default);
	
	exports.default = Activity;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Model = function () {
		function Model(data) {
			_classCallCheck(this, Model);
	
			this.data = data;
		}
	
		_createClass(Model, [{
			key: "setDataForInstance",
			value: function setDataForInstance() {
				if (this.getterMethods) {
					for (var key in this.data) {
						if (!this.getterMethods[key]) {
							this[key] = this.data[key];
						}
					}
					for (var key in this.getterMethods) {
						Object.defineProperty(this, key, {
							get: this.getterMethods[key]
						});
					}
				} else {
					for (var key in this.data) {
						this[key] = this.data[key];
					}
				}
			}
		}]);
	
		return Model;
	}();
	
	exports.default = Model;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _moment = __webpack_require__(4);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var utils = {
	
	    isSameDate: function isSameDate(date1, date2) {
	        return utils.isSameMonth(date1, date2) && (0, _moment2.default)(date1).date() == (0, _moment2.default)(date2).date();
	    },
	    isSameMonth: function isSameMonth(date1, date2) {
	        return utils.isSameYear(date1, date2) && (0, _moment2.default)(date1).month() == (0, _moment2.default)(date2).month();
	    },
	    isSameYear: function isSameYear(date1, date2) {
	        return (0, _moment2.default)(date1).year() == (0, _moment2.default)(date2).year();
	    }
	
	};
	
	exports.default = utils;

/***/ },
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _zepto = __webpack_require__(1);
	
	var _zepto2 = _interopRequireDefault(_zepto);
	
	var _ua = __webpack_require__(11);
	
	var _ua2 = _interopRequireDefault(_ua);
	
	var _event = __webpack_require__(12);
	
	var _event2 = _interopRequireDefault(_event);
	
	var _cookie = __webpack_require__(13);
	
	var _cookie2 = _interopRequireDefault(_cookie);
	
	var _qs = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var channel = _qs.query.channel;
	if (channel && !_cookie2.default.get('channel')) {
	  _cookie2.default.set('channel', channel, 3 * 24);
	}
	
	module.exports = function (params) {
	  params = params || {};
	  var method = params.method || 'GET';
	  var data = params.data;
	  if (!method.match(/^get$/i)) {
	    data = JSON.stringify(params.data);
	  }
	  console.debug(method.toUpperCase() + ':', params.url);
	  var req = new Promise(function (resolve, reject) {
	    _zepto2.default.ajax({
	      type: method,
	      url: '/api' + params.url,
	      data: data,
	      contentType: 'application/json',
	      success: function success(data) {
	        var $loading = (0, _zepto2.default)('.loading');
	        $loading.each(function (i, el) {
	          var $el = (0, _zepto2.default)(el);
	          if (!$el.attr('data-id')) {
	            $el.hide();
	          }
	        });
	        req.emit('success', data);
	        req.emit('complete');
	        resolve(data);
	      },
	      error: function error(xhr, err) {
	        var errorText = '';
	        if (xhr.status === 502) {
	          errorText = '服务器开小差了';
	        } else if (xhr.status === 401) {
	          _cookie2.default.remove('pnid', '.piaoniu.com');
	          location.reload();
	        } else {
	          errorText = xhr.response || xhr.responseText || '系统错误';
	        }
	
	        req.emit('error', errorText, xhr);
	        req.emit('complete');
	        reject(err);
	      }
	    });
	  });
	
	  _event2.default.mixin(req);
	  return req;
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	var ua = navigator.userAgent;
	module.exports = {
	  isWechat: function isWechat() {
	    return (/micromessenger/.test(navigator.userAgent.toLowerCase())
	    );
	  },
	  isMobile: function isMobile() {
	    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)
	    );
	  },
	  isIOS: function isIOS() {
	    return ua.match('iPhone');
	  },
	  isAndroid: function isAndroid() {
	    return ua.match(/android/i);
	  },
	  isPiaoniu: function isPiaoniu() {
	    return ua.match('piaoniu');
	  },
	  isProduct: function isProduct() {
	    return location.host == 'm.piaoniu.com' || location.host == 'www.piaoniu.com';
	  },
	  isDebug: function isDebug() {
	    return !!location.search.match('debug');
	  }
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	function on() {
	  var args = arguments;
	  if (_typeof(args[0]) == "object") {
	    var obj = args[0];
	    for (var key in obj) {
	      this.on(key, obj[key]);
	    }
	  } else {
	    var name = args[0];
	    var func = args[1];
	
	    //this.events只是一个实例上的普通属性，它的name属性是一个数组
	    // 操作thisEvent就会对这个name属性产生影响（引用类型的复制），
	    // 所以on函数的作用是存储一些事件对应的函数，在emit的时候去调用。
	    var events = this.events = this.events || {};
	    var thisEvent = events[name] = events[name] || [];
	    thisEvent.push(func);
	  }
	  return this;
	}
	
	function once(name, cb) {
	  var _this = this;
	
	  this.on(name, function (data) {
	    _this.emitted = _this.emitted || {};
	    if (!_this.emitted[name]) {
	      cb(data);
	      _this.emitted[name] = true;
	    }
	  });
	  return this;
	}
	
	function off(name) {
	  if (!name) {
	    delete this.events;
	  }
	
	  if (this.events && this.events[name]) {
	    delete this.events[name];
	  }
	  return this;
	}
	
	function emit(name) {
	  for (var _len = arguments.length, eventArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    eventArgs[_key - 1] = arguments[_key];
	  }
	
	  var self = this;
	  var events = this.events && this.events[name] || [];
	  events.forEach(function (func) {
	    func.apply(self, eventArgs);
	  });
	}
	
	function mixin(target) {
	  if (typeof target == "function") {
	    target.prototype.on = on;
	    target.prototype.once = once;
	    target.prototype.off = off;
	    target.prototype.emit = emit;
	  } else {
	    target.on = on;
	    target.once = once;
	    target.off = off;
	    target.emit = emit;
	  }
	}
	
	module.exports = {
	  emit: emit,
	  mixin: mixin,
	  once: once,
	  on: on,
	  off: off
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Cookie = {
	    set: function set(name, value, expHour, domain, path) {
	        var cookie = name + "=" + encodeURIComponent(value == undefined ? "" : value) + (expHour ? "; expires=" + new Date(new Date().getTime() + (expHour - 0) * 3600000).toUTCString() : "") + "; domain=" + (domain ? domain : document.domain) + "; path=" + (path ? path : "/");
	        document.cookie = cookie;
	    },
	    get: function get(name) {
	        return document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)")) == null ? null : decodeURIComponent(RegExp.$2);
	    },
	    remove: function remove(name, domain, path) {
	        if (this.get(name) != null) {
	            this.set(name, null, -1, domain, path);
	        }
	    }
	};
	
	exports.default = Cookie;

/***/ },
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.shared = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _zepto = __webpack_require__(1);
	
	var _zepto2 = _interopRequireDefault(_zepto);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var uid = 1;
	
	var Progress = function () {
	  function Progress(config) {
	    _classCallCheck(this, Progress);
	
	    config = config || {};
	    var $overlay = (0, _zepto2.default)('<div class="overlay" />');
	    var $progress = (0, _zepto2.default)('<div class="loading">加载中...</div>');
	    var $spin = (0, _zepto2.default)('<div class="spin" />');
	    var $body = (0, _zepto2.default)('body');
	
	    if (config.hasOverlay) {
	      $overlay.hide().appendTo($body);
	      this.overlay = $overlay;
	    }
	    if (config.zIndex) {
	      $progress.css('z-index', config.zIndex);
	    }
	    $progress.hide().appendTo($body);
	    $progress.attr('data-id', uid);
	    this.spin = $spin;
	    this.progress = $progress;
	    uid++;
	    // $overlay.
	  }
	
	  _createClass(Progress, [{
	    key: 'showMessage',
	    value: function showMessage(message, stick) {
	      var _this = this;
	
	      if (message.constructor == Error) {
	        message = message.message;
	      }
	      this.progress.text(message);
	      this.progress.show();
	      if (!stick) {
	        setTimeout(function () {
	          _this.hide();
	        }, 750);
	      }
	      this.progress.css('margin-left', -this.progress.width() / 2);
	    }
	  }, {
	    key: 'showProgress',
	    value: function showProgress(message) {
	      this.overlay && this.overlay.show();
	      this.progress.text('加载中...');
	      this.progress.show();
	      this.progress.css('margin-left', -this.progress.width() / 2);
	    }
	  }, {
	    key: 'hide',
	    value: function hide() {
	      this.overlay && this.overlay.hide();
	      this.progress.hide();
	    }
	  }]);
	
	  return Progress;
	}();
	
	var shared = Progress.shared = new Progress();
	exports.default = Progress;
	exports.shared = shared;

/***/ },
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _fetch = __webpack_require__(10);
	
	var _fetch2 = _interopRequireDefault(_fetch);
	
	var _consts = __webpack_require__(23);
	
	var _consts2 = _interopRequireDefault(_consts);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var key = 'commonconfig';
	
	function isLocalStorageSupported() {
	  var testKey = 'test',
	      storage = window.sessionStorage;
	  try {
	    storage.setItem(testKey, 'testValue');
	    storage.removeItem(testKey);
	    return true;
	  } catch (error) {
	    return false;
	  }
	}
	
	module.exports = {
	  invalid: function invalid() {
	    sessionStorage.removeItem(key);
	  },
	  get: function get() {
	    return new Promise(function (resolve, reject) {
	      var storedData = sessionStorage.getItem(key);
	      var localSupported = isLocalStorageSupported();
	      if (storedData && localSupported) {
	        resolve(JSON.parse(storedData));
	      } else {
	        (0, _fetch2.default)({
	          url: '/v1/config',
	          data: {
	            ct: _consts2.default.clientType
	          }
	        }).on('success', function (data) {
	          if (localSupported) {
	            sessionStorage.setItem(key, JSON.stringify(data));
	          }
	          resolve(data);
	        }).on('error', function (err) {
	          reject(err);
	        });
	      }
	    });
	  }
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ua = __webpack_require__(11);
	
	var _ua2 = _interopRequireDefault(_ua);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var config = {
	  clientType: 12,
	  wechatAppId: 'wxac94f6f29c637242',
	  downloadURL: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.ipiaoniu.android&g_f=991653',
	  homePage: _ua2.default.isMobile() ? '/' : '//' + (_ua2.default.isProduct() ? 'www.piaoniu.com' : 'www.beta.piaoniu.com'),
	  isProduct: location.host == 'm.ipiaoniu.com' || location.host == 'm.piaoniu.com'
	};
	
	config.apiHost = config.isProduct ? 'api.ipiaoniu.com' : 'api.beta.ipiaoniu.com';
	
	module.exports = config;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _zepto = __webpack_require__(1);
	
	var _zepto2 = _interopRequireDefault(_zepto);
	
	var _consts = __webpack_require__(23);
	
	var _consts2 = _interopRequireDefault(_consts);
	
	var _qs = __webpack_require__(2);
	
	var _qs2 = _interopRequireDefault(_qs);
	
	var _url = __webpack_require__(25);
	
	var _url2 = _interopRequireDefault(_url);
	
	var _errortrack = __webpack_require__(26);
	
	var _errortrack2 = _interopRequireDefault(_errortrack);
	
	var _overlay = __webpack_require__(27);
	
	var _overlay2 = _interopRequireDefault(_overlay);
	
	var _popbox = __webpack_require__(28);
	
	var _popbox2 = _interopRequireDefault(_popbox);
	
	var _ua = __webpack_require__(11);
	
	var _ua2 = _interopRequireDefault(_ua);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var loaded = {};
	var $body = (0, _zepto2.default)('body');
	function _load(src, cb) {
	  return new Promise(function (resolve, reject) {
	    if (loaded[src]) {
	      return resolve();
	    }
	
	    var script = (0, _zepto2.default)('<script />');
	    script.appendTo($body);
	    script.on('load', function () {
	      loaded[src] = true;
	      resolve();
	    });
	    script.on('error', reject);
	    script.attr('src', src);
	  });
	}
	
	module.exports = {
	  load: function load(debug) {
	    return _load('http://res.wx.qq.com/open/js/jweixin-1.0.0.js').then(function () {
	      wx.error(function (res) {
	        _errortrack2.default.log(res);
	      });
	      return _load('http://' + _consts2.default.apiHost + '/wechat/wxconfig.js?debug=' + (debug ? 'true' : 'false') + '&apis=["onMenuShareTimeline","onMenuShareAppMessage","chooseWXPay"]');
	    }).catch(function () {
	      console.log('wxapi加载失败');
	    });
	  },
	  showShareHint: function showShareHint() {
	    if (_ua2.default.isWechat()) {
	      (function () {
	        var overlay = new _overlay2.default();
	        var hint = (0, _zepto2.default)('<img src="/ui/img/share-hint.png" />');
	        hint.css({
	          position: 'fixed',
	          top: 10,
	          right: 30,
	          width: 255,
	          zIndex: 99
	        });
	        hint.appendTo((0, _zepto2.default)('body'));
	        overlay.show();
	        hint.on('tap', function () {
	          overlay.remove();
	          hint.remove();
	        });
	        overlay.on('tap', function () {
	          overlay.remove();
	          hint.remove();
	        });
	      })();
	    } else {
	      _popbox2.default.show('复制以下链接，拉好友一起来砍价吧～<span class="link">' + location.href + '</span>', [{
	        text: '知道了'
	      }]);
	    }
	  },
	  login: function login(config) {
	    config = config || {};
	    var url = 'https://open.weixin.qq.com/connect/oauth2/authorize';
	    var info = {
	      appid: _consts2.default.wechatAppId,
	      redirect_uri: config.redir ? _url2.default.resolve(config.redir) : location.href,
	      response_type: 'code',
	      scope: 'snsapi_base',
	      state: 'm-piaoniu'
	    };
	    // info.redirect_uri = 'http://m.piaoniu.com/groupon/detail.html?id=1';
	    // console.log(info.redirect_uri);
	    // return;
	    location.href = url + '?' + _qs2.default.stringify(info) + '#wechat_redirect';
	  },
	  setTitle: function setTitle(title) {
	    (0, _zepto2.default)('.navbar .title').text(title);
	    document.title = title; // hack在微信等webview中无法修改document.title的情况
	    var $iframe = (0, _zepto2.default)('<iframe src="/favicon.ico" />').hide();
	    $iframe.on('load', function () {
	      setTimeout(function () {
	        $iframe.off('load').remove();
	      }, 0);
	    });
	    $iframe.appendTo($body);
	  }
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';
	
	function resolve(src) {
	  if (src.slice(0, 4) != 'http') {
	    var a = document.createElement('a');
	    a.href = src;
	    return a.href;
	  } else {
	    return src;
	  }
	}
	
	module.exports = {
	  resolve: resolve
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {
	  log: function log(err) {
	    console.error(err);
	  }
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(1);
	var $body = $('body');
	var event = __webpack_require__(12);
	
	function Overlay(opt) {
	  opt = opt || {};
	  var self = this;
	  this.$el = $('<div class=\'' + (opt.class || 'overlay') + '\'></div>');
	  this.$el.appendTo($body).hide();
	  this.$el.on('click', function () {
	    self.hide();
	    self.emit('tap');
	  });
	}
	
	Overlay.prototype.show = function () {
	  var self = this;
	  this.$el.show();
	  self.$el.css({
	    display: 'block'
	  });
	  self.$el.css({
	    opacity: 1
	  });
	};
	
	Overlay.prototype.remove = function () {
	  this.$el.remove();
	};
	
	Overlay.prototype.hide = function () {
	  var self = this;
	  this.$el.css({
	    opacity: 0
	  });
	  self.$el.hide();
	};
	
	event.mixin(Overlay);
	
	module.exports = Overlay;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _overlay = __webpack_require__(27);
	
	var _overlay2 = _interopRequireDefault(_overlay);
	
	var _zepto = __webpack_require__(1);
	
	var _zepto2 = _interopRequireDefault(_zepto);
	
	var _tapEvent = __webpack_require__(29);
	
	var _tapEvent2 = _interopRequireDefault(_tapEvent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var $body = (0, _zepto2.default)('body');
	
	var Popbox = function () {
	  function Popbox() {
	    var _this = this;
	
	    _classCallCheck(this, Popbox);
	
	    this.elem = (0, _zepto2.default)('<div class="popbox">\n      <div class="close"></div>\n      <div class="content">\n        <div class="text"></div>\n        <div class="btns"></div>\n      </div>\n    </div>');
	    this.overlay = new _overlay2.default();
	
	    this.overlay.on('tap', function () {
	      _this.hide();
	    });
	    this.elem.find('.close').on(_tapEvent2.default, function () {
	      _this.hide();
	    });
	    this.elem.appendTo($body);
	    this.hide();
	  }
	
	  _createClass(Popbox, [{
	    key: '_show',
	    value: function _show(text, btns) {
	      var _this2 = this;
	
	      var $btnsContainer = this.elem.find('.btns');
	      $btnsContainer.empty();
	      btns.forEach(function (btn) {
	        var $btn = (0, _zepto2.default)('<button>' + btn.text + '</button>');
	        if (btn.active) {
	          $btn.addClass('active');
	        }
	        $btn.css('width', 1 / btns.length * 100 + '%');
	        $btn.on(_tapEvent2.default, function () {
	          if (btn.fn) {
	            btn.fn();
	          } else {
	            _this2.hide();
	          }
	        });
	        $btn.appendTo($btnsContainer);
	      });
	      this.elem.find('.text').html(text);
	      this.overlay.show();
	      this.elem.show();
	    }
	  }, {
	    key: 'hide',
	    value: function hide() {
	      this.cb && this.cb(-1);
	      this.overlay.hide();
	      this.elem.hide();
	    }
	  }, {
	    key: 'show',
	    value: function show(text, btnTexts, cb) {
	      var _this3 = this;
	
	      this._show(text, btnTexts.map(function (text, i) {
	        return typeof text == 'string' ? {
	          text: text,
	          active: i == btnTexts.length - 1,
	          fn: function fn() {
	            _this3.hide();
	            cb && cb(i);
	          }
	        } : text;
	      }));
	    }
	  }, {
	    key: 'confirm',
	    value: function confirm(text, btnTexts, cb) {
	      var _this4 = this;
	
	      this.cb = cb;
	      this._show(text, btnTexts.map(function (text, i) {
	        return typeof text == 'string' ? {
	          text: text,
	          active: i == btnTexts.length - 1,
	          fn: function fn() {
	            _this4.hide();
	            cb && cb(i);
	          }
	        } : text;
	      }));
	    }
	  }, {
	    key: 'alert',
	    value: function alert(text, btnText) {}
	  }]);
	
	  return Popbox;
	}();
	
	exports.default = new Popbox();

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ua = __webpack_require__(11);
	
	var _ua2 = _interopRequireDefault(_ua);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _ua2.default.isMobile() ? 'tap' : 'click';

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _cookie = __webpack_require__(13);
	
	var _cookie2 = _interopRequireDefault(_cookie);
	
	var _fetch = __webpack_require__(10);
	
	var _fetch2 = _interopRequireDefault(_fetch);
	
	var _ua = __webpack_require__(11);
	
	var _ua2 = _interopRequireDefault(_ua);
	
	var _wxapi = __webpack_require__(24);
	
	var _wxapi2 = _interopRequireDefault(_wxapi);
	
	var _url = __webpack_require__(25);
	
	var _url2 = _interopRequireDefault(_url);
	
	var _qs = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var cachedUser;
	
	var assureLogin = function assureLogin(redir) {
	  if (!redir) {
	    redir = location.href;
	  } else {
	    redir = _url2.default.resolve(redir);
	  }
	
	  return new Promise(function (resolve, reject) {
	    isLogin().then(function (logged) {
	      if (!logged) {
	        login(redir);
	      } else {
	        resolve();
	      }
	    });
	  });
	};
	
	var assureWechatLogin = function assureWechatLogin(redir) {
	  return new Promise(function (resolve, reject) {
	    assureLogin(redir).then(function () {
	      if (_ua2.default.isWechat() && !_qs.query.code) {
	        _wxapi2.default.login({
	          redir: redir
	        });
	      } else {
	        resolve();
	      }
	    });
	  });
	};
	
	var isLoginSync = function isLoginSync() {
	  return !!_cookie2.default.get('pnid');
	};
	
	var isLogin = function isLogin() {
	  return new Promise(function (resolve, reject) {
	    var token = _cookie2.default.get('pnid');
	    resolve(!!token);
	  });
	};
	
	var get = function get() {
	  return new Promise(function (resolve, reject) {
	    if (!isLoginSync()) {
	      return resolve(null);
	    }
	    if (cachedUser) {
	      return resolve(cachedUser);
	    }
	    (0, _fetch2.default)({
	      url: '/v1/user'
	    }).on('success', function (user) {
	      cachedUser = user;
	      resolve(user);
	    }).on('error', function (err) {
	      logout();
	      reject(err);
	    });
	  });
	};
	
	var register = function register(redir) {
	  redir = redir || location.href;
	  location.href = '/user/register.html?redir=' + encodeURIComponent(redir);
	};
	
	var login = function login(redir) {
	  redir = redir || location.href;
	  location.href = '/user/login.html?redir=' + encodeURIComponent(redir);
	};
	
	var getToken = function getToken() {
	  return new Promise(function (resolve, reject) {
	    var token = _cookie2.default.get('pner');
	    resolve(_cookie2.default.get('pner'));
	  });
	};
	
	var logout = function logout() {
	  _cookie2.default.set('pnid', null, -1, '.ipiaoniu.com');
	  _cookie2.default.set('pnid', null, -1, '.piaoniu.com');
	};
	
	module.exports = {
	  get: get,
	  getToken: getToken,
	  login: login,
	  logout: logout,
	  register: register,
	  assureLogin: assureLogin,
	  assureWechatLogin: assureWechatLogin,
	  isLogin: isLogin,
	  isLoginSync: isLoginSync
	};

/***/ },
/* 31 */,
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _zepto = __webpack_require__(1);
	
	var _zepto2 = _interopRequireDefault(_zepto);
	
	var _blur = __webpack_require__(5);
	
	var _blur2 = _interopRequireDefault(_blur);
	
	var _store = __webpack_require__(33);
	
	var _store2 = _interopRequireDefault(_store);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DetailHeader = function () {
	    function DetailHeader(container, activity) {
	        _classCallCheck(this, DetailHeader);
	
	        container.append(this.render(activity));
	    }
	
	    _createClass(DetailHeader, [{
	        key: 'render',
	        value: function render(activity) {
	            var status = activity.status;
	            var statusText, credit, reservation;
	            var statusObj = {
	                2: '停售',
	                3: '已过期',
	                5: '退票中'
	            };
	
	            if (status == 1) {
	                statusText = '<span class="status">售票中</span>';
	                reservation = '';
	                credit = '<img class="credit-icon" src="./img/iconCredit.png" />\n                <span class="text">保证有票</span>';
	            }
	            if (status == 4) {
	                statusText = '<span class="status pre">预售中</span>';
	                reservation = '<div class="reservation">\n                          <div class=\'icon\'>预</div>\n                          <div class="name">预订/预售票品最终数量视项目主办方及场馆情况而定</div>\n                          <div class="arr-right"></div>\n                      </div>';
	                credit = '';
	            }
	            if (status == 3 || status == 2 || status == 5) {
	                statusText = '<span class="status expire">' + statusObj[status] + '</span>';
	                credit = '<img class="credit-icon" src="./img/iconCredit.png" />\n                  <span class="text">保证有票</span>';
	                reservation = '';
	            }
	
	            if (activity.canBuyEcard) {
	                var eticket = '<span class=eticket>电子票</span>';
	            } else {
	                var eticket = '';
	            }
	            var template = '\n            <div class="header">\n                <div class="header-main">\n                    <img crossorigin="anonymous" class="poster" id="poster" src="' + activity.poster + '" />\n                    <div class="info">\n                        <div class="title">' + activity.name + '</div>\n                        <div class="duration">' + activity.duration + '</div>\n                        <div class=\'saling-eticket\'>\n                          ' + statusText + '\n                          ' + eticket + '\n                        </div>\n                        <div class="bottom-info">\n                          <div class="price-info">\n                              <span class="unit">¥</span>\n                              <span class="price">' + activity.lowPrice + '</span>\n                              <span class="qi">起</span>\n                          </div>\n                        </div>\n                    </div>\n                    <div class=\'shadow\'></div>\n                </div>\n                <div class="time">\n                    <img class="icon" src="./img/icon-calendar.png" />\n                    ' + activity.period + '</div>\n                <div class="venue">\n                    <img class="icon" src="./img/detailVenueIcon.png" />\n                    <div class="name">' + activity.venue.name + '</div>\n                    <div class="arr-right"></div>\n                </div>\n                ' + reservation + '\n                <div class="postage-promotion">\n                    <span class=\'inner-icon\'>包</span>\n                    <span class="inner-text">全场顺丰包邮</span>\n                    <span class=\'inner-icon\'>促</span>\n                    <span class="inner-text">新用户立减30</span>\n                </div>\n                <div class="credit">\n                    ' + credit + '\n                    <img class="credit-icon" src="./img/iconCredit.png" />\n                    <span class="text">100%真票</span>\n                    <img class="credit-icon" src="./img/iconCredit.png" />\n                    <span class="text">担保交易</span>\n                    <div class="arr-right"></div>\n                </div>\n            </div>\n        ';
	            return template;
	        }
	    }]);
	
	    return DetailHeader;
	}();
	
	exports.default = DetailHeader;

/***/ },
/* 33 */
/***/ function(module, exports) {

	/*! store2 - v2.3.2 - 2015-10-27
	* Copyright (c) 2015 Nathan Bubna; Licensed MIT, GPL */
	;(function(window, define) {
	    var _ = {
	        version: "2.3.2",
	        areas: {},
	        apis: {},
	
	        // utilities
	        inherit: function(api, o) {
	            for (var p in api) {
	                if (!o.hasOwnProperty(p)) {
	                    o[p] = api[p];
	                }
	            }
	            return o;
	        },
	        stringify: function(d) {
	            return d === undefined || typeof d === "function" ? d+'' : JSON.stringify(d);
	        },
	        parse: function(s) {
	            // if it doesn't parse, return as is
	            try{ return JSON.parse(s); }catch(e){ return s; }
	        },
	
	        // extension hooks
	        fn: function(name, fn) {
	            _.storeAPI[name] = fn;
	            for (var api in _.apis) {
	                _.apis[api][name] = fn;
	            }
	        },
	        get: function(area, key){ return area.getItem(key); },
	        set: function(area, key, string){ area.setItem(key, string); },
	        remove: function(area, key){ area.removeItem(key); },
	        key: function(area, i){ return area.key(i); },
	        length: function(area){ return area.length; },
	        clear: function(area){ area.clear(); },
	
	        // core functions
	        Store: function(id, area, namespace) {
	            var store = _.inherit(_.storeAPI, function(key, data, overwrite) {
	                if (arguments.length === 0){ return store.getAll(); }
	                if (data !== undefined){ return store.set(key, data, overwrite); }
	                if (typeof key === "string" || typeof key === "number"){ return store.get(key); }
	                if (!key){ return store.clear(); }
	                return store.setAll(key, data);// overwrite=data, data=key
	            });
	            store._id = id;
	            try {
	                var testKey = '_safariPrivate_';
	                area.setItem(testKey, 'sucks');
	                store._area = area;
	                area.removeItem(testKey);
	            } catch (e) {}
	            if (!store._area) {
	                store._area = _.inherit(_.storageAPI, { items: {}, name: 'fake' });
	            }
	            store._ns = namespace || '';
	            if (!_.areas[id]) {
	                _.areas[id] = store._area;
	            }
	            if (!_.apis[store._ns+store._id]) {
	                _.apis[store._ns+store._id] = store;
	            }
	            return store;
	        },
	        storeAPI: {
	            // admin functions
	            area: function(id, area) {
	                var store = this[id];
	                if (!store || !store.area) {
	                    store = _.Store(id, area, this._ns);//new area-specific api in this namespace
	                    if (!this[id]){ this[id] = store; }
	                }
	                return store;
	            },
	            namespace: function(namespace, noSession) {
	                if (!namespace){
	                    return this._ns ? this._ns.substring(0,this._ns.length-1) : '';
	                }
	                var ns = namespace, store = this[ns];
	                if (!store || !store.namespace) {
	                    store = _.Store(this._id, this._area, this._ns+ns+'.');//new namespaced api
	                    if (!this[ns]){ this[ns] = store; }
	                    if (!noSession){ store.area('session', _.areas.session); }
	                }
	                return store;
	            },
	            isFake: function(){ return this._area.name === 'fake'; },
	            toString: function() {
	                return 'store'+(this._ns?'.'+this.namespace():'')+'['+this._id+']';
	            },
	
	            // storage functions
	            has: function(key) {
	                if (this._area.has) {
	                    return this._area.has(this._in(key));//extension hook
	                }
	                return !!(this._in(key) in this._area);
	            },
	            size: function(){ return this.keys().length; },
	            each: function(fn, and) {
	                for (var i=0, m=_.length(this._area); i<m; i++) {
	                    var key = this._out(_.key(this._area, i));
	                    if (key !== undefined) {
	                        if (fn.call(this, key, and || this.get(key)) === false) {
	                            break;
	                        }
	                    }
	                    if (m > _.length(this._area)) { m--; i--; }// in case of removeItem
	                }
	                return and || this;
	            },
	            keys: function() {
	                return this.each(function(k, list){ list.push(k); }, []);
	            },
	            get: function(key, alt) {
	                var s = _.get(this._area, this._in(key));
	                return s !== null ? _.parse(s) : alt || s;// support alt for easy default mgmt
	            },
	            getAll: function() {
	                return this.each(function(k, all){ all[k] = this.get(k); }, {});
	            },
	            set: function(key, data, overwrite) {
	                var d = this.get(key);
	                if (d != null && overwrite === false) {
	                    return data;
	                }
	                return _.set(this._area, this._in(key), _.stringify(data), overwrite) || d;
	            },
	            setAll: function(data, overwrite) {
	                var changed, val;
	                for (var key in data) {
	                    val = data[key];
	                    if (this.set(key, val, overwrite) !== val) {
	                        changed = true;
	                    }
	                }
	                return changed;
	            },
	            remove: function(key) {
	                var d = this.get(key);
	                _.remove(this._area, this._in(key));
	                return d;
	            },
	            clear: function() {
	                if (!this._ns) {
	                    _.clear(this._area);
	                } else {
	                    this.each(function(k){ _.remove(this._area, this._in(k)); }, 1);
	                }
	                return this;
	            },
	            clearAll: function() {
	                var area = this._area;
	                for (var id in _.areas) {
	                    if (_.areas.hasOwnProperty(id)) {
	                        this._area = _.areas[id];
	                        this.clear();
	                    }
	                }
	                this._area = area;
	                return this;
	            },
	
	            // internal use functions
	            _in: function(k) {
	                if (typeof k !== "string"){ k = _.stringify(k); }
	                return this._ns ? this._ns + k : k;
	            },
	            _out: function(k) {
	                return this._ns ?
	                    k && k.indexOf(this._ns) === 0 ?
	                        k.substring(this._ns.length) :
	                        undefined : // so each() knows to skip it
	                    k;
	            }
	        },// end _.storeAPI
	        storageAPI: {
	            length: 0,
	            has: function(k){ return this.items.hasOwnProperty(k); },
	            key: function(i) {
	                var c = 0;
	                for (var k in this.items){
	                    if (this.has(k) && i === c++) {
	                        return k;
	                    }
	                }
	            },
	            setItem: function(k, v) {
	                if (!this.has(k)) {
	                    this.length++;
	                }
	                this.items[k] = v;
	            },
	            removeItem: function(k) {
	                if (this.has(k)) {
	                    delete this.items[k];
	                    this.length--;
	                }
	            },
	            getItem: function(k){ return this.has(k) ? this.items[k] : null; },
	            clear: function(){ for (var k in this.list){ this.removeItem(k); } },
	            toString: function(){ return this.length+' items in '+this.name+'Storage'; }
	        }// end _.storageAPI
	    };
	
	    // setup the primary store fn
	    if (window.store){ _.conflict = window.store; }
	    var store =
	        // safely set this up (throws error in IE10/32bit mode for local files)
	        _.Store("local", (function(){try{ return localStorage; }catch(e){}})());
	    store.local = store;// for completeness
	    store._ = _;// for extenders and debuggers...
	    // safely setup store.session (throws exception in FF for file:/// urls)
	    store.area("session", (function(){try{ return sessionStorage; }catch(e){}})());
	
	    //Expose store to the global object
	    window.store = store;
	
	    if (typeof define === 'function' && define.amd !== undefined) {
	        define(function () {
	            return store;
	        });
	    } else if (typeof module !== 'undefined' && module.exports) {
	        module.exports = store;
	    }
	
	})(this, this.define);


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _zepto = __webpack_require__(1);
	
	var _zepto2 = _interopRequireDefault(_zepto);
	
	var _qs = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DetailSection = function () {
	  function DetailSection(container, activity) {
	    _classCallCheck(this, DetailSection);
	
	    container.append(this.render(activity));
	  }
	
	  _createClass(DetailSection, [{
	    key: 'convertItem',
	    value: function convertItem(detail) {
	      if (detail.type == 1) {
	        return {
	          title: '演出简介',
	          content: detail.detailDesc.replace(/\n/g, '<br />')
	        };
	      }
	      if (detail.type = 5) {
	        return {
	          title: '购买须知',
	          content: detail.detailDesc.replace(/\n/g, '<br />')
	        };
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render(activity) {
	      var _this = this;
	
	      var content = activity.activityDetails.filter(function (a) {
	        return a.detailDesc.trim();
	      }).sort(function (a, b) {
	        return a < b ? -1 : 1;
	      }).map(function (detail) {
	        var result = _this.convertItem(detail);
	        if (detail.type == 1) {
	          var titleContent = '<div class=\'text introduction\'>' + result.title + '</div>\n                              <div class=\'arr-right\'></div>';
	        } else {
	          var titleContent = '<div class=\'text\'>' + result.title + '</div>';
	        }
	        return '\n                <div class="section">\n                    <div class=section-title>\n                      ' + titleContent + '\n                    </div>\n                    <div class="content">' + result.content + '</div>\n                </div>\n            ';
	      }).join('');
	
	      var template = '\n            <div class="sections">\n              ' + content + '\n            </div>\n        ';
	      return template;
	    }
	  }]);
	
	  return DetailSection;
	}();
	
	exports.default = DetailSection;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _zepto = __webpack_require__(1);
	
	var _zepto2 = _interopRequireDefault(_zepto);
	
	var _wxapi = __webpack_require__(24);
	
	var _wxapi2 = _interopRequireDefault(_wxapi);
	
	var _url = __webpack_require__(25);
	
	var _url2 = _interopRequireDefault(_url);
	
	var _bridge = __webpack_require__(36);
	
	var _bridge2 = _interopRequireDefault(_bridge);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function load(src, cb) {
	  return new Promise(function (resolve, reject) {
	    var script = (0, _zepto2.default)('<script />');
	    script.appendTo((0, _zepto2.default)('body'));
	    script.on('load', resolve);
	    script.on('error', reject);
	    script.attr('src', src);
	  });
	}
	
	module.exports = {
	  pop: function pop(config) {
	    var call = _bridge2.default.exec('share', config);
	    call.on('done', function (result) {
	      call.emit(result.action, result);
	    });
	    return call;
	  },
	  init: function init(config) {
	    config.title = config.title || document.title;
	
	    console.debug('initShare:', JSON.stringify(config));
	    _wxapi2.default.load(config.debug).then(function () {
	      wx.ready(function () {
	        wx.onMenuShareTimeline({
	          title: config.title, // 分享标题
	          link: config.link || location.href, // 分享链接
	          imgUrl: config.imgUrl, // 分享图标
	          success: function success() {
	            config.success && config.success({
	              type: 'timeline'
	            });
	            // 用户确认分享后执行的回调函数
	          },
	          cancel: function cancel() {
	            config.cancel && config.cancel({
	              type: 'timeline'
	            });
	            // 用户取消分享后执行的回调函数
	          }
	        });
	
	        wx.onMenuShareAppMessage({
	          title: config.title, // 分享标题
	          desc: config.desc, // 分享描述
	          link: config.link, // 分享链接
	          imgUrl: config.imgUrl, // 分享图标
	          type: config.type, // 分享类型,music、video或link，不填默认为link
	          dataUrl: config.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
	          success: function success() {
	            config.success && config.success({
	              type: 'appmessage'
	            });
	            // 用户确认分享后执行的回调函数
	          },
	          cancel: function cancel() {
	            config.success && config.success({
	              type: 'appmessage'
	            });
	            // 用户取消分享后执行的回调函数
	          }
	        });
	      });
	    });
	  }
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var ua = __webpack_require__(11);
	var queue = __webpack_require__(37);
	var event = __webpack_require__(12);
	var q = queue(function (data) {
	  Bridge._exec(data.method, data.args, data.callback);
	});
	
	var dequeueTimeout = null;
	var dequeue = window.PNJSBridgeDequeue = function () {
	  var self = this;
	  clearTimeout(dequeueTimeout);
	  dequeueTimeout = null;
	  q.dequeue();
	};
	
	function callbackFunc1() {
	  console.log(123);
	}
	
	var Bridge = {
	  _exec: function _exec(method, params, callback) {
	    var callbackName = "LiangxinJSCallback_" + +new Date() + "_" + Math.floor(Math.random() * 50);
	    var iframe = document.createElement('iframe');
	    window[callbackName] = callback;
	    iframe.onload = iframe.onerror = removeNode;
	    iframe.src = "js://_?method=" + method + "&params=" + encodeURIComponent(JSON.stringify(params)) + "&callback=" + callbackName;
	    document.body.appendChild(iframe);
	    iframe.style.display = "none";
	
	    function removeNode() {
	      iframe.onload = iframe.onerror = null;
	      iframe.parentNode && iframe.parentNode.removeChild(iframe);
	    }
	    setTimeout(removeNode, 1000);
	  },
	  exec: function exec(method, params) {
	    for (var k in params) {
	      params[k] = typeof params[k] == 'number' ? new String(params[k]) : params[k];
	    }
	
	    console.log('<bridge>:', method, JSON.stringify(params));
	    if (ua.isDebug()) {
	      return new Promise(function (resolve, reject) {
	        $.ajax({
	          url: 'http://localhost:1943',
	          dataType: 'jsonp',
	          data: {
	            method: method,
	            params: JSON.stringify(params)
	          },
	          success: function success(data) {
	            return resolve(data);
	          },
	          error: function error(xhr, errorType, _error) {
	            reject(new Error(errorType));
	          }
	        });
	      });
	    } else {
	      var p = new Promise(function (resolve, reject) {
	        q.push({
	          method: method,
	          args: params,
	          callback: function callback(result) {
	            result = result || {};
	            var error;
	            if ('error' in result) {
	              error = new Error(result.error);
	              reject(error);
	              Bridge.onerror(error);
	              p.emit('error', error);
	            } else {
	              p.emit('done', result);
	              console.log(JSON.stringify(result));
	              resolve(result);
	            }
	          }
	        });
	        dequeueTimeout = setTimeout(function () {
	          dequeue();
	        }, 1000);
	      });
	
	      event.mixin(p);
	      return p;
	    }
	  }
	};
	
	Bridge.onerror = function (err) {
	  console.log('uncaughtPromiseError', err);
	};
	
	[
	// network
	"fetch",
	// info
	"info",
	// user
	"setUser", "getUser",
	// progress
	"showProgress", "hideProgress",
	// view
	"close", "back", "loginSuccess", "controllerMethod"].forEach(function (method) {
	  Bridge[method] = function (params) {
	    params = params || {};
	    return Bridge.exec(method, params);
	  };
	});
	
	Bridge.setTitle = function (title) {
	  return Bridge.exec("setTitle", {
	    title: title
	  });
	};
	
	Bridge.open = function (url) {
	  return Bridge.exec("open", {
	    url: url
	  });
	};
	
	Bridge.showMessage = function (message) {
	  return Bridge.exec("showMessage", {
	    message: message
	  });
	};
	
	// util
	Bridge.log = function (message) {
	  return Bridge.exec("log", {
	    message: message
	  });
	};
	
	// 获取固化数据
	Bridge.getLocalData = function (key) {
	  return Bridge.exec("getLocalData", {
	    key: key
	  });
	};
	
	Bridge.getData = function (key) {
	  return Bridge.exec("getData", {
	    key: key
	  });
	};
	
	Bridge.setData = function (key, value) {
	  return Bridge.exec("setData", {
	    key: key,
	    value: value
	  });
	};
	
	Bridge.publish = function (key, data) {
	  return Bridge.exec("publish", {
	    key: key,
	    data: data
	  });
	};
	
	Bridge.removeData = function (key) {
	  return Bridge.exec("removeData", {
	    key: key
	  });
	};
	
	module.exports = Bridge;

/***/ },
/* 37 */
/***/ function(module, exports) {

	"use strict";
	
	var queue = module.exports = function (worker) {
	    var currentData = null;
	    var currentCallback = null;
	    var q = {
	        timeout: null,
	        running: false,
	        tasks: [],
	        push: function push(data, cb) {
	            var callback = cb || function (data) {};
	            q.tasks.push({
	                data: data,
	                callback: callback
	            });
	            setTimeout(function () {
	                q.process();
	            }, 0);
	        },
	        dequeue: function dequeue() {
	            if (currentCallback) {
	                currentCallback();
	            } else {
	                q.running = false;
	            }
	        },
	        process: function process() {
	            if (q.tasks.length && !q.running) {
	                var task = q.tasks.shift();
	                q.running = true;
	                currentCallback = function currentCallback() {
	                    q.running = false;
	                    task.callback(task.data);
	                    q.process();
	                };
	                currentData = task.data;
	                worker(task.data, currentCallback);
	            }
	        }
	    };
	    return q;
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _fetch = __webpack_require__(10);
	
	var _fetch2 = _interopRequireDefault(_fetch);
	
	var _zepto = __webpack_require__(1);
	
	var _zepto2 = _interopRequireDefault(_zepto);
	
	var _user = __webpack_require__(30);
	
	var _user2 = _interopRequireDefault(_user);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var bottomBtn = function () {
	  function bottomBtn() {
	    _classCallCheck(this, bottomBtn);
	  }
	
	  _createClass(bottomBtn, [{
	    key: 'contructor',
	    value: function contructor(activity) {
	      var _this = this;
	
	      $btnBottom = this.$btnBottom = (0, _zepto2.default)('.bottom-btn');
	      this.enabled = true;
	      if (activity.status == 1) {
	        $btnBottom.text('立即购买');
	      }
	      if (activity.status == 4) {
	        $btnBottom.text('这就预订');
	      }
	
	      if (activity.soldOut) {
	        $btnBottom.css('backgroundColor', '#5fb7fc').text('暂时售空，有票通知我');
	      }
	
	      if (activity.status == 3 || activity.status == 5 || activity.status == 2) {
	        $btnBottom.css('backgroundColor', '#999').text('' + statusObj[activity.status]);
	        this.enabled = false;
	      }
	
	      if (!_user2.default.isLoginSync()) {
	        $btnBottom.show();
	      }
	
	      $btnBottom.on('tap', function () {
	        if (!_this.enabled) {
	          return;
	        }
	
	        if (activity.soldOut) {
	          _user2.default.assureLogin('/activity/detail.html?id=' + query.id).then(function () {
	            overlay.show();
	            (0, _zepto2.default)('.inform-success-pop').show();
	            $btnBottom.css('backgroundColor', '#999').text('已选有票通知');
	            _this.enabled = false;
	            (0, _fetch2.default)({
	              method: 'POST',
	              url: '/v1/activity/favorite/' + query.id,
	              data: {
	                type: 1
	              }
	            });
	          });
	          return;
	        }
	        chooseTicket(activity, activity.availableEvents[0]);
	      });
	    }
	  }, {
	    key: 'userFavor',
	    value: function userFavor(hasConcern) {
	      var _this2 = this;
	
	      if (_user2.default.isLoginSync()) {
	        (0, _fetch2.default)({
	          url: '/v1/activity/favorite/' + query.id,
	          data: {
	            type: 1
	          }
	        }).then(function (data) {
	          if (data.favored && activity.soldOut) {
	            _this2.$btnBottom.css('backgroundColor', '#999').text('已选有票通知');
	            _this2.enabled = false;
	          }
	          _this2.$btnBottom.show();
	          if (!hasConcern) return;
	          (0, _fetch2.default)({
	            url: '/v1/activity/favorite/' + query.id,
	            data: {
	              type: 2
	            }
	          }).then(function (data) {
	            if (data.favored) {
	              (0, _zepto2.default)('.concern-icon').addClass('concern-select');
	            }
	          });
	        });
	      }
	    }
	  }]);
	
	  return bottomBtn;
	}();
	
	exports.default = bottomBtn;

/***/ }
/******/ ]);
//# sourceMappingURL=detail.js.map