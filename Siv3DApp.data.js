
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
   loadPackage({"files": [{"filename": "/resources/engine/font/noto-cjk/LICENSE", "start": 0, "end": 4301, "audio": 0}, {"filename": "/resources/engine/font/noto-cjk/NotoSansCJK-Regular.ttc.zstdcmp", "start": 4301, "end": 12638397, "audio": 0}, {"filename": "/resources/engine/font/noto-emoji/LICENSE", "start": 12638397, "end": 12642698, "audio": 0}, {"filename": "/resources/engine/font/noto-emoji/NotoEmoji-Regular.ttf.zstdcmp", "start": 12642698, "end": 12926424, "audio": 0}, {"filename": "/resources/engine/font/noto-emoji/NotoColorEmoji.ttf.zstdcmp", "start": 12926424, "end": 22510822, "audio": 0}, {"filename": "/resources/engine/shader/glsl/forward3d.frag", "start": 22510822, "end": 22513018, "audio": 0}, {"filename": "/resources/engine/shader/glsl/gaussian_blur_9.frag", "start": 22513018, "end": 22514297, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdffont_outline.frag", "start": 22514297, "end": 22515677, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdffont_shadow.frag", "start": 22515677, "end": 22517248, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sdffont_outline.frag", "start": 22517248, "end": 22518354, "audio": 0}, {"filename": "/resources/engine/shader/glsl/shape.frag", "start": 22518354, "end": 22518986, "audio": 0}, {"filename": "/resources/engine/shader/glsl/texture.frag", "start": 22518986, "end": 22519732, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sdffont_outlineshadow.frag", "start": 22519732, "end": 22521350, "audio": 0}, {"filename": "/resources/engine/shader/glsl/round_dot.frag", "start": 22521350, "end": 22522229, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sky.frag", "start": 22522229, "end": 22533940, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sdffont.frag", "start": 22533940, "end": 22534774, "audio": 0}, {"filename": "/resources/engine/shader/glsl/line3d.frag", "start": 22534774, "end": 22535262, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdfprint.frag", "start": 22535262, "end": 22536630, "audio": 0}, {"filename": "/resources/engine/shader/glsl/copy.frag", "start": 22536630, "end": 22537369, "audio": 0}, {"filename": "/resources/engine/shader/glsl/bitmapfont.frag", "start": 22537369, "end": 22538158, "audio": 0}, {"filename": "/resources/engine/shader/glsl/linear_to_screen.frag", "start": 22538158, "end": 22538835, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdffont_outlineshadow.frag", "start": 22538835, "end": 22540733, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdffont.frag", "start": 22540733, "end": 22541850, "audio": 0}, {"filename": "/resources/engine/shader/glsl/apply_srgb_curve.frag", "start": 22541850, "end": 22544362, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sdffont_shadow.frag", "start": 22544362, "end": 22545665, "audio": 0}, {"filename": "/resources/engine/shader/glsl/line3d.vert", "start": 22545665, "end": 22546463, "audio": 0}, {"filename": "/resources/engine/shader/glsl/forward3d.vert", "start": 22546463, "end": 22547377, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sprite.vert", "start": 22547377, "end": 22548279, "audio": 0}, {"filename": "/resources/engine/shader/glsl/fullscreen_triangle.vert", "start": 22548279, "end": 22548808, "audio": 0}, {"filename": "/resources/engine/shader/glsl/square_dot.frag", "start": 22548808, "end": 22549623, "audio": 0}, {"filename": "/resources/engine/shader/glsl/fullscreen_triangle.frag", "start": 22549623, "end": 22550149, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/32.png", "start": 22550149, "end": 22550766, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/256.png", "start": 22550766, "end": 22556405, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/128.png", "start": 22556405, "end": 22558960, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/64.png", "start": 22558960, "end": 22560329, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/8.png", "start": 22560329, "end": 22560469, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/16.png", "start": 22560469, "end": 22560732, "audio": 0}], "remote_package_size": 22560732, "package_uuid": "dd365632-7834-45c4-a484-1f14bf6af2d1"});
  
  })();
  