
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
   loadPackage({"files": [{"filename": "/resources/engine/font/noto-cjk/LICENSE", "start": 0, "end": 4301, "audio": 0}, {"filename": "/resources/engine/font/noto-cjk/NotoSansCJK-Regular.ttc.zstdcmp", "start": 4301, "end": 12638397, "audio": 0}, {"filename": "/resources/engine/font/noto-emoji/LICENSE", "start": 12638397, "end": 12642698, "audio": 0}, {"filename": "/resources/engine/font/noto-emoji/NotoEmoji-Regular.ttf.zstdcmp", "start": 12642698, "end": 12926424, "audio": 0}, {"filename": "/resources/engine/font/noto-emoji/NotoColorEmoji.ttf.zstdcmp", "start": 12926424, "end": 22510822, "audio": 0}, {"filename": "/resources/engine/shader/glsl/gaussian_blur_9.frag", "start": 22510822, "end": 22512101, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdffont_outline.frag", "start": 22512101, "end": 22513481, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdffont_shadow.frag", "start": 22513481, "end": 22515052, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sdffont_outline.frag", "start": 22515052, "end": 22516158, "audio": 0}, {"filename": "/resources/engine/shader/glsl/shape.frag", "start": 22516158, "end": 22516790, "audio": 0}, {"filename": "/resources/engine/shader/glsl/texture.frag", "start": 22516790, "end": 22517536, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sdffont_outlineshadow.frag", "start": 22517536, "end": 22519154, "audio": 0}, {"filename": "/resources/engine/shader/glsl/round_dot.frag", "start": 22519154, "end": 22520033, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sdffont.frag", "start": 22520033, "end": 22520867, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdfprint.frag", "start": 22520867, "end": 22522235, "audio": 0}, {"filename": "/resources/engine/shader/glsl/copy.frag", "start": 22522235, "end": 22522974, "audio": 0}, {"filename": "/resources/engine/shader/glsl/bitmapfont.frag", "start": 22522974, "end": 22523763, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdffont_outlineshadow.frag", "start": 22523763, "end": 22525661, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdffont.frag", "start": 22525661, "end": 22526778, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sdffont_shadow.frag", "start": 22526778, "end": 22528081, "audio": 0}, {"filename": "/resources/engine/shader/glsl/forward3d_shape.frag", "start": 22528081, "end": 22528685, "audio": 0}, {"filename": "/resources/engine/shader/glsl/forward3d.vert", "start": 22528685, "end": 22529619, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sprite.vert", "start": 22529619, "end": 22530521, "audio": 0}, {"filename": "/resources/engine/shader/glsl/forward3d_texture.frag", "start": 22530521, "end": 22531226, "audio": 0}, {"filename": "/resources/engine/shader/glsl/fullscreen_triangle.vert", "start": 22531226, "end": 22531755, "audio": 0}, {"filename": "/resources/engine/shader/glsl/square_dot.frag", "start": 22531755, "end": 22532570, "audio": 0}, {"filename": "/resources/engine/shader/glsl/fullscreen_triangle.frag", "start": 22532570, "end": 22533096, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/32.png", "start": 22533096, "end": 22533713, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/256.png", "start": 22533713, "end": 22539352, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/128.png", "start": 22539352, "end": 22541907, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/64.png", "start": 22541907, "end": 22543276, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/8.png", "start": 22543276, "end": 22543416, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/16.png", "start": 22543416, "end": 22543679, "audio": 0}], "remote_package_size": 22543679, "package_uuid": "f48f3bbf-efd4-434a-b9e4-be78bb0e36a4"});
  
  })();
  