
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
    loadPackage({"files": [{"filename": "/resources/engine/font/min/siv3d-min.woff", "start": 0, "end": 32292}, {"filename": "/resources/engine/font/noto-emoji/LICENSE", "start": 32292, "end": 36593}, {"filename": "/resources/engine/font/noto-emoji/NotoEmoji-Regular.ttf.zstdcmp", "start": 36593, "end": 566015}, {"filename": "/resources/engine/shader/essl/fullscreen_triangle.frag", "start": 566015, "end": 566389}, {"filename": "/resources/engine/shader/essl/sdffont.frag", "start": 566389, "end": 567071}, {"filename": "/resources/engine/shader/essl/msdffont_shadow.frag", "start": 567071, "end": 568490}, {"filename": "/resources/engine/shader/essl/line3d.frag", "start": 568490, "end": 568826}, {"filename": "/resources/engine/shader/essl/msdffont_outlineshadow.frag", "start": 568826, "end": 570572}, {"filename": "/resources/engine/shader/essl/apply_srgb_curve.frag", "start": 570572, "end": 572932}, {"filename": "/resources/engine/shader/essl/sprite.vert", "start": 572932, "end": 573682}, {"filename": "/resources/engine/shader/essl/square_dot.frag", "start": 573682, "end": 574345}, {"filename": "/resources/engine/shader/essl/msdffont.frag", "start": 574345, "end": 575310}, {"filename": "/resources/engine/shader/essl/fullscreen_triangle.vert", "start": 575310, "end": 575687}, {"filename": "/resources/engine/shader/essl/sky.frag", "start": 575687, "end": 587246}, {"filename": "/resources/engine/shader/essl/gaussian_blur_9.frag", "start": 587246, "end": 588373}, {"filename": "/resources/engine/shader/essl/forward3d.frag", "start": 588373, "end": 590415}, {"filename": "/resources/engine/shader/essl/sdffont_outlineshadow.frag", "start": 590415, "end": 591881}, {"filename": "/resources/engine/shader/essl/sdffont_outline.frag", "start": 591881, "end": 592835}, {"filename": "/resources/engine/shader/essl/texture.frag", "start": 592835, "end": 593429}, {"filename": "/resources/engine/shader/essl/bitmapfont.frag", "start": 593429, "end": 594066}, {"filename": "/resources/engine/shader/essl/shape.frag", "start": 594066, "end": 594546}, {"filename": "/resources/engine/shader/essl/msdfprint.frag", "start": 594546, "end": 595762}, {"filename": "/resources/engine/shader/essl/sdffont_shadow.frag", "start": 595762, "end": 596913}, {"filename": "/resources/engine/shader/essl/forward3d.vert", "start": 596913, "end": 597779}, {"filename": "/resources/engine/shader/essl/round_dot.frag", "start": 597779, "end": 598506}, {"filename": "/resources/engine/shader/essl/copy.frag", "start": 598506, "end": 599093}, {"filename": "/resources/engine/shader/essl/line3d.vert", "start": 599093, "end": 599756}, {"filename": "/resources/engine/shader/essl/msdffont_outline.frag", "start": 599756, "end": 600984}, {"filename": "/resources/engine/shader/wgsl/sprite.vert.wgsl", "start": 600984, "end": 602047}, {"filename": "/resources/engine/shader/wgsl/sdffont_shadow.frag.wgsl", "start": 602047, "end": 603535}, {"filename": "/resources/engine/shader/wgsl/gaussian_blur_9.frag.wgsl", "start": 603535, "end": 605018}, {"filename": "/resources/engine/shader/wgsl/line3d.vert.wgsl", "start": 605018, "end": 605974}, {"filename": "/resources/engine/shader/wgsl/linear_to_screen.frag.wgsl", "start": 605974, "end": 606611}, {"filename": "/resources/engine/shader/wgsl/square_dot.frag.wgsl", "start": 606611, "end": 607465}, {"filename": "/resources/engine/shader/wgsl/sdffont.frag.wgsl", "start": 607465, "end": 608388}, {"filename": "/resources/engine/shader/wgsl/line3d.frag.wgsl", "start": 608388, "end": 608713}, {"filename": "/resources/engine/shader/wgsl/shape.frag.wgsl", "start": 608713, "end": 609306}, {"filename": "/resources/engine/shader/wgsl/fullscreen_triangle.frag.wgsl", "start": 609306, "end": 609676}, {"filename": "/resources/engine/shader/wgsl/fullscreen_triangle.vert.wgsl", "start": 609676, "end": 610248}, {"filename": "/resources/engine/shader/wgsl/bitmapfont.frag.wgsl", "start": 610248, "end": 611090}, {"filename": "/resources/engine/shader/wgsl/forward3d.frag.wgsl", "start": 611090, "end": 613773}, {"filename": "/resources/engine/shader/wgsl/apply_srgb_curve.frag.wgsl", "start": 613773, "end": 616363}, {"filename": "/resources/engine/shader/wgsl/sky.frag.wgsl", "start": 616363, "end": 629268}, {"filename": "/resources/engine/shader/wgsl/sdffont_outlineshadow.frag.wgsl", "start": 629268, "end": 631138}, {"filename": "/resources/engine/shader/wgsl/msdffont_shadow.frag.wgsl", "start": 631138, "end": 632939}, {"filename": "/resources/engine/shader/wgsl/msdffont.frag.wgsl", "start": 632939, "end": 634173}, {"filename": "/resources/engine/shader/wgsl/round_dot.frag.wgsl", "start": 634173, "end": 635042}, {"filename": "/resources/engine/shader/wgsl/forward3d.vert.wgsl", "start": 635042, "end": 636357}, {"filename": "/resources/engine/shader/wgsl/copy.frag.wgsl", "start": 636357, "end": 636823}, {"filename": "/resources/engine/shader/wgsl/msdffont_outline.frag.wgsl", "start": 636823, "end": 638372}, {"filename": "/resources/engine/shader/wgsl/msdfprint.frag.wgsl", "start": 638372, "end": 639879}, {"filename": "/resources/engine/shader/wgsl/msdffont_outlineshadow.frag.wgsl", "start": 639879, "end": 642064}, {"filename": "/resources/engine/shader/wgsl/sdffont_outline.frag.wgsl", "start": 642064, "end": 643277}, {"filename": "/resources/engine/shader/wgsl/texture.frag.wgsl", "start": 643277, "end": 644027}, {"filename": "/resources/engine/texture/box-shadow/8.png", "start": 644027, "end": 644167}, {"filename": "/resources/engine/texture/box-shadow/128.png", "start": 644167, "end": 646722}, {"filename": "/resources/engine/texture/box-shadow/32.png", "start": 646722, "end": 647339}, {"filename": "/resources/engine/texture/box-shadow/64.png", "start": 647339, "end": 648708}, {"filename": "/resources/engine/texture/box-shadow/256.png", "start": 648708, "end": 654347}, {"filename": "/resources/engine/texture/box-shadow/16.png", "start": 654347, "end": 654610}], "remote_package_size": 654610, "package_uuid": "31c5346b-aa9b-4693-bba4-84c65814df75"});

  })();
