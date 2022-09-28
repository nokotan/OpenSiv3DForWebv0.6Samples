
  if (!Module.expectedDataFileDownloads) {
    Module.expectedDataFileDownloads = 0;
  }

  Module.expectedDataFileDownloads++;
  (function() {
    // When running as a pthread, FS operations are proxied to the main thread, so we don't need to
    // fetch the .data bundle on the worker
    if (Module['ENVIRONMENT_IS_PTHREAD']) return;
    var loadPackage = function(metadata) {

      var PACKAGE_PATH = '';
      if (typeof window === 'object') {
        PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
      } else if (typeof process === 'undefined' && typeof location !== 'undefined') {
        // web worker
        PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
      }
      var PACKAGE_NAME = 'Siv3DApp.data';
      var REMOTE_PACKAGE_BASE = 'Siv3DApp.data';
      if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
        Module['locateFile'] = Module['locateFilePackage'];
        err('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
      }
      var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;
var REMOTE_PACKAGE_SIZE = metadata['remote_package_size'];

      function fetchRemotePackage(packageName, packageSize, callback, errback) {
        if (typeof process === 'object' && typeof process.versions === 'object' && typeof process.versions.node === 'string') {
          require('fs').readFile(packageName, function(err, contents) {
            if (err) {
              errback(err);
            } else {
              callback(contents.buffer);
            }
          });
          return;
        }
        var xhr = new XMLHttpRequest();
        xhr.open('GET', packageName, true);
        xhr.responseType = 'arraybuffer';
        xhr.onprogress = function(event) {
          var url = packageName;
          var size = packageSize;
          if (event.total) size = event.total;
          if (event.loaded) {
            if (!xhr.addedTotal) {
              xhr.addedTotal = true;
              if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
              Module.dataFileDownloads[url] = {
                loaded: event.loaded,
                total: size
              };
            } else {
              Module.dataFileDownloads[url].loaded = event.loaded;
            }
            var total = 0;
            var loaded = 0;
            var num = 0;
            for (var download in Module.dataFileDownloads) {
            var data = Module.dataFileDownloads[download];
              total += data.total;
              loaded += data.loaded;
              num++;
            }
            total = Math.ceil(total * Module.expectedDataFileDownloads/num);
            if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
          } else if (!Module.dataFileDownloads) {
            if (Module['setStatus']) Module['setStatus']('Downloading data...');
          }
        };
        xhr.onerror = function(event) {
          throw new Error("NetworkError for: " + packageName);
        }
        xhr.onload = function(event) {
          if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            var packageData = xhr.response;
            callback(packageData);
          } else {
            throw new Error(xhr.statusText + " : " + xhr.responseURL);
          }
        };
        xhr.send(null);
      };

      function handleError(error) {
        console.error('package error:', error);
      };

      var fetchedCallback = null;
      var fetched = Module['getPreloadedPackage'] ? Module['getPreloadedPackage'](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;

      if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);

    function runWithFS() {

      function assert(check, msg) {
        if (!check) throw msg + new Error().stack;
      }
Module['FS_createPath']("/", "resources", true, true);
Module['FS_createPath']("/resources", "engine", true, true);
Module['FS_createPath']("/resources/engine", "font", true, true);
Module['FS_createPath']("/resources/engine/font", "min", true, true);
Module['FS_createPath']("/resources/engine/font", "noto-emoji", true, true);
Module['FS_createPath']("/resources/engine", "shader", true, true);
Module['FS_createPath']("/resources/engine/shader", "essl", true, true);
Module['FS_createPath']("/resources/engine/shader", "wgsl", true, true);
Module['FS_createPath']("/resources/engine", "texture", true, true);
Module['FS_createPath']("/resources/engine/texture", "box-shadow", true, true);

      /** @constructor */
      function DataRequest(start, end, audio) {
        this.start = start;
        this.end = end;
        this.audio = audio;
      }
      DataRequest.prototype = {
        requests: {},
        open: function(mode, name) {
          this.name = name;
          this.requests[name] = this;
          Module['addRunDependency']('fp ' + this.name);
        },
        send: function() {},
        onload: function() {
          var byteArray = this.byteArray.subarray(this.start, this.end);
          this.finish(byteArray);
        },
        finish: function(byteArray) {
          var that = this;
          // canOwn this data in the filesystem, it is a slide into the heap that will never change
          Module['FS_createDataFile'](this.name, null, byteArray, true, true, true);
          Module['removeRunDependency']('fp ' + that.name);
          this.requests[this.name] = null;
        }
      };

      var files = metadata['files'];
      for (var i = 0; i < files.length; ++i) {
        new DataRequest(files[i]['start'], files[i]['end'], files[i]['audio'] || 0).open('GET', files[i]['filename']);
      }

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        // Reuse the bytearray from the XHR as the source for file reads.
          DataRequest.prototype.byteArray = byteArray;
          var files = metadata['files'];
          for (var i = 0; i < files.length; ++i) {
            DataRequest.prototype.requests[files[i].filename].onload();
          }          Module['removeRunDependency']('datafile_Siv3DApp.data');

      };
      Module['addRunDependency']('datafile_Siv3DApp.data');

      if (!Module.preloadResults) Module.preloadResults = {};

      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }

    }
    if (Module['calledRun']) {
      runWithFS();
    } else {
      if (!Module['preRun']) Module['preRun'] = [];
      Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
    }

    }
    loadPackage({"files": [{"filename": "/resources/engine/font/min/siv3d-min.woff", "start": 0, "end": 32292}, {"filename": "/resources/engine/font/noto-emoji/LICENSE", "start": 32292, "end": 36593}, {"filename": "/resources/engine/font/noto-emoji/NotoEmoji-Regular.ttf.zstdcmp", "start": 36593, "end": 566015}, {"filename": "/resources/engine/shader/essl/apply_srgb_curve.frag", "start": 566015, "end": 568375}, {"filename": "/resources/engine/shader/essl/bitmapfont.frag", "start": 568375, "end": 569012}, {"filename": "/resources/engine/shader/essl/copy.frag", "start": 569012, "end": 569599}, {"filename": "/resources/engine/shader/essl/forward3d.frag", "start": 569599, "end": 571641}, {"filename": "/resources/engine/shader/essl/forward3d.vert", "start": 571641, "end": 572507}, {"filename": "/resources/engine/shader/essl/fullscreen_triangle.frag", "start": 572507, "end": 572881}, {"filename": "/resources/engine/shader/essl/fullscreen_triangle.vert", "start": 572881, "end": 573258}, {"filename": "/resources/engine/shader/essl/gaussian_blur_9.frag", "start": 573258, "end": 574385}, {"filename": "/resources/engine/shader/essl/line3d.frag", "start": 574385, "end": 574721}, {"filename": "/resources/engine/shader/essl/line3d.vert", "start": 574721, "end": 575384}, {"filename": "/resources/engine/shader/essl/msdffont.frag", "start": 575384, "end": 576349}, {"filename": "/resources/engine/shader/essl/msdffont_outline.frag", "start": 576349, "end": 577577}, {"filename": "/resources/engine/shader/essl/msdffont_outlineshadow.frag", "start": 577577, "end": 579323}, {"filename": "/resources/engine/shader/essl/msdffont_shadow.frag", "start": 579323, "end": 580742}, {"filename": "/resources/engine/shader/essl/msdfprint.frag", "start": 580742, "end": 581958}, {"filename": "/resources/engine/shader/essl/round_dot.frag", "start": 581958, "end": 582685}, {"filename": "/resources/engine/shader/essl/sdffont.frag", "start": 582685, "end": 583367}, {"filename": "/resources/engine/shader/essl/sdffont_outline.frag", "start": 583367, "end": 584321}, {"filename": "/resources/engine/shader/essl/sdffont_outlineshadow.frag", "start": 584321, "end": 585787}, {"filename": "/resources/engine/shader/essl/sdffont_shadow.frag", "start": 585787, "end": 586938}, {"filename": "/resources/engine/shader/essl/shape.frag", "start": 586938, "end": 587418}, {"filename": "/resources/engine/shader/essl/sky.frag", "start": 587418, "end": 598977}, {"filename": "/resources/engine/shader/essl/sprite.vert", "start": 598977, "end": 599727}, {"filename": "/resources/engine/shader/essl/square_dot.frag", "start": 599727, "end": 600390}, {"filename": "/resources/engine/shader/essl/texture.frag", "start": 600390, "end": 600984}, {"filename": "/resources/engine/shader/wgsl/apply_srgb_curve.frag.wgsl", "start": 600984, "end": 603567}, {"filename": "/resources/engine/shader/wgsl/bitmapfont.frag.wgsl", "start": 603567, "end": 604402}, {"filename": "/resources/engine/shader/wgsl/copy.frag.wgsl", "start": 604402, "end": 604861}, {"filename": "/resources/engine/shader/wgsl/forward3d.frag.wgsl", "start": 604861, "end": 607537}, {"filename": "/resources/engine/shader/wgsl/forward3d.vert.wgsl", "start": 607537, "end": 608845}, {"filename": "/resources/engine/shader/wgsl/fullscreen_triangle.frag.wgsl", "start": 608845, "end": 609208}, {"filename": "/resources/engine/shader/wgsl/fullscreen_triangle.vert.wgsl", "start": 609208, "end": 609773}, {"filename": "/resources/engine/shader/wgsl/gaussian_blur_9.frag.wgsl", "start": 609773, "end": 611249}, {"filename": "/resources/engine/shader/wgsl/line3d.frag.wgsl", "start": 611249, "end": 611567}, {"filename": "/resources/engine/shader/wgsl/line3d.vert.wgsl", "start": 611567, "end": 612516}, {"filename": "/resources/engine/shader/wgsl/linear_to_screen.frag.wgsl", "start": 612516, "end": 613146}, {"filename": "/resources/engine/shader/wgsl/msdffont.frag.wgsl", "start": 613146, "end": 614373}, {"filename": "/resources/engine/shader/wgsl/msdffont_outline.frag.wgsl", "start": 614373, "end": 615915}, {"filename": "/resources/engine/shader/wgsl/msdffont_outlineshadow.frag.wgsl", "start": 615915, "end": 618093}, {"filename": "/resources/engine/shader/wgsl/msdffont_shadow.frag.wgsl", "start": 618093, "end": 619887}, {"filename": "/resources/engine/shader/wgsl/msdfprint.frag.wgsl", "start": 619887, "end": 621387}, {"filename": "/resources/engine/shader/wgsl/round_dot.frag.wgsl", "start": 621387, "end": 622249}, {"filename": "/resources/engine/shader/wgsl/sdffont.frag.wgsl", "start": 622249, "end": 623165}, {"filename": "/resources/engine/shader/wgsl/sdffont_outline.frag.wgsl", "start": 623165, "end": 624371}, {"filename": "/resources/engine/shader/wgsl/sdffont_outlineshadow.frag.wgsl", "start": 624371, "end": 626234}, {"filename": "/resources/engine/shader/wgsl/sdffont_shadow.frag.wgsl", "start": 626234, "end": 627715}, {"filename": "/resources/engine/shader/wgsl/shape.frag.wgsl", "start": 627715, "end": 628301}, {"filename": "/resources/engine/shader/wgsl/sky.frag.wgsl", "start": 628301, "end": 641199}, {"filename": "/resources/engine/shader/wgsl/sprite.vert.wgsl", "start": 641199, "end": 642255}, {"filename": "/resources/engine/shader/wgsl/square_dot.frag.wgsl", "start": 642255, "end": 643102}, {"filename": "/resources/engine/shader/wgsl/texture.frag.wgsl", "start": 643102, "end": 643845}, {"filename": "/resources/engine/texture/box-shadow/128.png", "start": 643845, "end": 646400}, {"filename": "/resources/engine/texture/box-shadow/16.png", "start": 646400, "end": 646663}, {"filename": "/resources/engine/texture/box-shadow/256.png", "start": 646663, "end": 652302}, {"filename": "/resources/engine/texture/box-shadow/32.png", "start": 652302, "end": 652919}, {"filename": "/resources/engine/texture/box-shadow/64.png", "start": 652919, "end": 654288}, {"filename": "/resources/engine/texture/box-shadow/8.png", "start": 654288, "end": 654428}], "remote_package_size": 654428});

  })();
