
  if (!Module.expectedDataFileDownloads) {
    Module.expectedDataFileDownloads = 0;
  }
  Module.expectedDataFileDownloads++;
  (function() {
   var loadPackage = function(metadata) {
  
      var PACKAGE_PATH;
      if (typeof window === 'object') {
        PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
      } else if (typeof location !== 'undefined') {
        // worker
        PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
      } else {
        throw 'using preloaded data can only be done on a web page or in a web worker';
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
Module['FS_createPath']("/resources/engine/font", "noto-cjk", true, true);
Module['FS_createPath']("/resources/engine/font", "noto-emoji", true, true);
Module['FS_createPath']("/resources/engine", "shader", true, true);
Module['FS_createPath']("/resources/engine/shader", "glsl", true, true);
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
      
          Module['FS_createDataFile'](this.name, null, byteArray, true, true, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
          Module['removeRunDependency']('fp ' + that.name);
  
              this.requests[this.name] = null;
            }
          };
      
              var files = metadata['files'];
              for (var i = 0; i < files.length; ++i) {
                new DataRequest(files[i]['start'], files[i]['end'], files[i]['audio']).open('GET', files[i]['filename']);
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
            }
                Module['removeRunDependency']('datafile_Siv3DApp.data');

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
   loadPackage({"files": [{"filename": "/resources/engine/font/noto-cjk/LICENSE", "start": 0, "end": 4301, "audio": 0}, {"filename": "/resources/engine/font/noto-cjk/NotoSansJP-Regular.otf.zstdcmp", "start": 4301, "end": 3759800, "audio": 0}, {"filename": "/resources/engine/font/noto-emoji/LICENSE", "start": 3759800, "end": 3764101, "audio": 0}, {"filename": "/resources/engine/font/noto-emoji/NotoEmoji-Regular.ttf.zstdcmp", "start": 3764101, "end": 4047827, "audio": 0}, {"filename": "/resources/engine/font/noto-emoji/NotoColorEmoji.ttf.zstdcmp", "start": 4047827, "end": 13632225, "audio": 0}, {"filename": "/resources/engine/shader/glsl/forward3d.frag", "start": 13632225, "end": 13634421, "audio": 0}, {"filename": "/resources/engine/shader/glsl/gaussian_blur_9.frag", "start": 13634421, "end": 13635700, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdffont_outline.frag", "start": 13635700, "end": 13637080, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdffont_shadow.frag", "start": 13637080, "end": 13638651, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sdffont_outline.frag", "start": 13638651, "end": 13639757, "audio": 0}, {"filename": "/resources/engine/shader/glsl/shape.frag", "start": 13639757, "end": 13640389, "audio": 0}, {"filename": "/resources/engine/shader/glsl/texture.frag", "start": 13640389, "end": 13641135, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sdffont_outlineshadow.frag", "start": 13641135, "end": 13642753, "audio": 0}, {"filename": "/resources/engine/shader/glsl/round_dot.frag", "start": 13642753, "end": 13643632, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sky.frag", "start": 13643632, "end": 13655343, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sdffont.frag", "start": 13655343, "end": 13656177, "audio": 0}, {"filename": "/resources/engine/shader/glsl/line3d.frag", "start": 13656177, "end": 13656665, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdfprint.frag", "start": 13656665, "end": 13658033, "audio": 0}, {"filename": "/resources/engine/shader/glsl/copy.frag", "start": 13658033, "end": 13658772, "audio": 0}, {"filename": "/resources/engine/shader/glsl/bitmapfont.frag", "start": 13658772, "end": 13659561, "audio": 0}, {"filename": "/resources/engine/shader/glsl/linear_to_screen.frag", "start": 13659561, "end": 13660238, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdffont_outlineshadow.frag", "start": 13660238, "end": 13662136, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdffont.frag", "start": 13662136, "end": 13663253, "audio": 0}, {"filename": "/resources/engine/shader/glsl/apply_srgb_curve.frag", "start": 13663253, "end": 13665765, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sdffont_shadow.frag", "start": 13665765, "end": 13667068, "audio": 0}, {"filename": "/resources/engine/shader/glsl/line3d.vert", "start": 13667068, "end": 13667866, "audio": 0}, {"filename": "/resources/engine/shader/glsl/forward3d.vert", "start": 13667866, "end": 13668780, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sprite.vert", "start": 13668780, "end": 13669682, "audio": 0}, {"filename": "/resources/engine/shader/glsl/fullscreen_triangle.vert", "start": 13669682, "end": 13670211, "audio": 0}, {"filename": "/resources/engine/shader/glsl/square_dot.frag", "start": 13670211, "end": 13671026, "audio": 0}, {"filename": "/resources/engine/shader/glsl/fullscreen_triangle.frag", "start": 13671026, "end": 13671552, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/32.png", "start": 13671552, "end": 13672169, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/256.png", "start": 13672169, "end": 13677808, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/128.png", "start": 13677808, "end": 13680363, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/64.png", "start": 13680363, "end": 13681732, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/8.png", "start": 13681732, "end": 13681872, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/16.png", "start": 13681872, "end": 13682135, "audio": 0}], "remote_package_size": 13682135, "package_uuid": "342734dc-50d0-407f-b216-21fcbd86965c"});
  
  })();
  