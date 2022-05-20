
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
      var PACKAGE_UUID = metadata['package_uuid'];

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
    loadPackage({"files": [{"filename": "/resources/engine/font/min/siv3d-min.woff", "start": 0, "end": 32292}, {"filename": "/resources/engine/font/noto-emoji/LICENSE", "start": 32292, "end": 36593}, {"filename": "/resources/engine/font/noto-emoji/NotoEmoji-Regular.ttf.zstdcmp", "start": 36593, "end": 320319}, {"filename": "/resources/engine/shader/essl/square_dot.frag", "start": 320319, "end": 320982}, {"filename": "/resources/engine/shader/essl/gaussian_blur_9.frag", "start": 320982, "end": 322109}, {"filename": "/resources/engine/shader/essl/bitmapfont.frag", "start": 322109, "end": 322746}, {"filename": "/resources/engine/shader/essl/texture.frag", "start": 322746, "end": 323340}, {"filename": "/resources/engine/shader/essl/line3d.frag", "start": 323340, "end": 323676}, {"filename": "/resources/engine/shader/essl/sdffont_shadow.frag", "start": 323676, "end": 324827}, {"filename": "/resources/engine/shader/essl/msdfprint.frag", "start": 324827, "end": 326043}, {"filename": "/resources/engine/shader/essl/round_dot.frag", "start": 326043, "end": 326770}, {"filename": "/resources/engine/shader/essl/shape.frag", "start": 326770, "end": 327250}, {"filename": "/resources/engine/shader/essl/fullscreen_triangle.frag", "start": 327250, "end": 327624}, {"filename": "/resources/engine/shader/essl/forward3d.frag", "start": 327624, "end": 329666}, {"filename": "/resources/engine/shader/essl/sprite.vert", "start": 329666, "end": 330416}, {"filename": "/resources/engine/shader/essl/line3d.vert", "start": 330416, "end": 331079}, {"filename": "/resources/engine/shader/essl/forward3d.vert", "start": 331079, "end": 331945}, {"filename": "/resources/engine/shader/essl/copy.frag", "start": 331945, "end": 332532}, {"filename": "/resources/engine/shader/essl/sdffont_outlineshadow.frag", "start": 332532, "end": 333998}, {"filename": "/resources/engine/shader/essl/sdffont.frag", "start": 333998, "end": 334680}, {"filename": "/resources/engine/shader/essl/sky.frag", "start": 334680, "end": 346239}, {"filename": "/resources/engine/shader/essl/apply_srgb_curve.frag", "start": 346239, "end": 348599}, {"filename": "/resources/engine/shader/essl/fullscreen_triangle.vert", "start": 348599, "end": 348976}, {"filename": "/resources/engine/shader/essl/msdffont.frag", "start": 348976, "end": 349941}, {"filename": "/resources/engine/shader/essl/msdffont_shadow.frag", "start": 349941, "end": 351360}, {"filename": "/resources/engine/shader/essl/msdffont_outlineshadow.frag", "start": 351360, "end": 353106}, {"filename": "/resources/engine/shader/essl/sdffont_outline.frag", "start": 353106, "end": 354060}, {"filename": "/resources/engine/shader/essl/msdffont_outline.frag", "start": 354060, "end": 355288}, {"filename": "/resources/engine/shader/wgsl/msdffont_shadow.frag.wgsl", "start": 355288, "end": 357089}, {"filename": "/resources/engine/shader/wgsl/msdffont.frag.wgsl", "start": 357089, "end": 358323}, {"filename": "/resources/engine/shader/wgsl/gaussian_blur_9.frag.wgsl", "start": 358323, "end": 359806}, {"filename": "/resources/engine/shader/wgsl/sprite.vert.wgsl", "start": 359806, "end": 360869}, {"filename": "/resources/engine/shader/wgsl/forward3d.vert.wgsl", "start": 360869, "end": 362184}, {"filename": "/resources/engine/shader/wgsl/sdffont_shadow.frag.wgsl", "start": 362184, "end": 363672}, {"filename": "/resources/engine/shader/wgsl/bitmapfont.frag.wgsl", "start": 363672, "end": 364514}, {"filename": "/resources/engine/shader/wgsl/forward3d.frag.wgsl", "start": 364514, "end": 367197}, {"filename": "/resources/engine/shader/wgsl/sky.frag.wgsl", "start": 367197, "end": 380102}, {"filename": "/resources/engine/shader/wgsl/texture.frag.wgsl", "start": 380102, "end": 380852}, {"filename": "/resources/engine/shader/wgsl/sdffont_outlineshadow.frag.wgsl", "start": 380852, "end": 382722}, {"filename": "/resources/engine/shader/wgsl/apply_srgb_curve.frag.wgsl", "start": 382722, "end": 385312}, {"filename": "/resources/engine/shader/wgsl/fullscreen_triangle.frag.wgsl", "start": 385312, "end": 385682}, {"filename": "/resources/engine/shader/wgsl/round_dot.frag.wgsl", "start": 385682, "end": 386551}, {"filename": "/resources/engine/shader/wgsl/line3d.vert.wgsl", "start": 386551, "end": 387507}, {"filename": "/resources/engine/shader/wgsl/copy.frag.wgsl", "start": 387507, "end": 387973}, {"filename": "/resources/engine/shader/wgsl/msdfprint.frag.wgsl", "start": 387973, "end": 389480}, {"filename": "/resources/engine/shader/wgsl/sdffont.frag.wgsl", "start": 389480, "end": 390403}, {"filename": "/resources/engine/shader/wgsl/line3d.frag.wgsl", "start": 390403, "end": 390728}, {"filename": "/resources/engine/shader/wgsl/shape.frag.wgsl", "start": 390728, "end": 391321}, {"filename": "/resources/engine/shader/wgsl/square_dot.frag.wgsl", "start": 391321, "end": 392175}, {"filename": "/resources/engine/shader/wgsl/fullscreen_triangle.vert.wgsl", "start": 392175, "end": 392747}, {"filename": "/resources/engine/shader/wgsl/linear_to_screen.frag.wgsl", "start": 392747, "end": 393384}, {"filename": "/resources/engine/shader/wgsl/msdffont_outline.frag.wgsl", "start": 393384, "end": 394933}, {"filename": "/resources/engine/shader/wgsl/sdffont_outline.frag.wgsl", "start": 394933, "end": 396146}, {"filename": "/resources/engine/shader/wgsl/msdffont_outlineshadow.frag.wgsl", "start": 396146, "end": 398331}, {"filename": "/resources/engine/texture/box-shadow/16.png", "start": 398331, "end": 398594}, {"filename": "/resources/engine/texture/box-shadow/8.png", "start": 398594, "end": 398734}, {"filename": "/resources/engine/texture/box-shadow/64.png", "start": 398734, "end": 400103}, {"filename": "/resources/engine/texture/box-shadow/256.png", "start": 400103, "end": 405742}, {"filename": "/resources/engine/texture/box-shadow/128.png", "start": 405742, "end": 408297}, {"filename": "/resources/engine/texture/box-shadow/32.png", "start": 408297, "end": 408914}], "remote_package_size": 408914, "package_uuid": "5c2f72a2-9206-44e1-8486-dc63c831491e"});

  })();
