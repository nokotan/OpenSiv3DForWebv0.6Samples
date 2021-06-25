
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
   loadPackage({"files": [{"filename": "/resources/engine/font/noto-cjk/LICENSE", "start": 0, "end": 4301, "audio": 0}, {"filename": "/resources/engine/font/noto-cjk/NotoSansCJK-Regular.ttc.zstdcmp", "start": 4301, "end": 12638397, "audio": 0}, {"filename": "/resources/engine/font/noto-emoji/LICENSE", "start": 12638397, "end": 12642698, "audio": 0}, {"filename": "/resources/engine/font/noto-emoji/NotoEmoji-Regular.ttf.zstdcmp", "start": 12642698, "end": 12926424, "audio": 0}, {"filename": "/resources/engine/font/noto-emoji/NotoColorEmoji.ttf.zstdcmp", "start": 12926424, "end": 22510822, "audio": 0}, {"filename": "/resources/engine/shader/glsl/square_dot.frag", "start": 22510822, "end": 22511637, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sdffont_outlineshadow.frag", "start": 22511637, "end": 22513255, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sdffont_shadow.frag", "start": 22513255, "end": 22514558, "audio": 0}, {"filename": "/resources/engine/shader/glsl/fullscreen_triangle.frag", "start": 22514558, "end": 22515084, "audio": 0}, {"filename": "/resources/engine/shader/glsl/bitmapfont.frag", "start": 22515084, "end": 22515873, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdffont_outline.frag", "start": 22515873, "end": 22517253, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sprite.vert", "start": 22517253, "end": 22518155, "audio": 0}, {"filename": "/resources/engine/shader/glsl/shape.frag", "start": 22518155, "end": 22518787, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdffont.frag", "start": 22518787, "end": 22519904, "audio": 0}, {"filename": "/resources/engine/shader/glsl/fullscreen_triangle.vert", "start": 22519904, "end": 22520433, "audio": 0}, {"filename": "/resources/engine/shader/glsl/copy.frag", "start": 22520433, "end": 22521172, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sdffont.frag", "start": 22521172, "end": 22522006, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdfprint.frag", "start": 22522006, "end": 22523374, "audio": 0}, {"filename": "/resources/engine/shader/glsl/round_dot.frag", "start": 22523374, "end": 22524253, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdffont_shadow.frag", "start": 22524253, "end": 22525824, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sdffont_outline.frag", "start": 22525824, "end": 22526930, "audio": 0}, {"filename": "/resources/engine/shader/glsl/texture.frag", "start": 22526930, "end": 22527676, "audio": 0}, {"filename": "/resources/engine/shader/glsl/gaussian_blur_9.frag", "start": 22527676, "end": 22528955, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdffont_outlineshadow.frag", "start": 22528955, "end": 22530853, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/64.png", "start": 22530853, "end": 22532222, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/8.png", "start": 22532222, "end": 22532362, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/16.png", "start": 22532362, "end": 22532625, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/32.png", "start": 22532625, "end": 22533242, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/128.png", "start": 22533242, "end": 22535797, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/256.png", "start": 22535797, "end": 22541436, "audio": 0}], "remote_package_size": 22541436, "package_uuid": "93b2dc40-c13a-481b-829d-d86a3d76a377"});
  
  })();
  