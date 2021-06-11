
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
Module['FS_createPath']("/resources/engine/font", "materialdesignicons", true, true);
Module['FS_createPath']("/resources/engine/font", "noto-emoji", true, true);
Module['FS_createPath']("/resources/engine/font", "mplus", true, true);
Module['FS_createPath']("/resources/engine/font", "noto-cjk", true, true);
Module['FS_createPath']("/resources/engine/font", "fontawesome", true, true);
Module['FS_createPath']("/resources/engine", "shader", true, true);
Module['FS_createPath']("/resources/engine/shader", "glsl", true, true);
Module['FS_createPath']("/resources/engine", "texture", true, true);
Module['FS_createPath']("/resources/engine/texture", "box-shadow", true, true);
Module['FS_createPath']("/resources/engine", "soundfont", true, true);
Module['FS_createPath']("/", "example", true, true);
Module['FS_createPath']("/example", "svg", true, true);
Module['FS_createPath']("/example", "font", true, true);
Module['FS_createPath']("/example/font", "DotGothic16", true, true);
Module['FS_createPath']("/example/font", "RocknRoll", true, true);
Module['FS_createPath']("/example", "shader", true, true);
Module['FS_createPath']("/example/shader", "glsl", true, true);
Module['FS_createPath']("/example/shader", "hlsl", true, true);
Module['FS_createPath']("/example/shader", "essl", true, true);
Module['FS_createPath']("/example", "spritesheet", true, true);
Module['FS_createPath']("/example", "json", true, true);
Module['FS_createPath']("/example", "zip", true, true);
Module['FS_createPath']("/example", "geojson", true, true);
Module['FS_createPath']("/example", "midi", true, true);
Module['FS_createPath']("/example", "objdetect", true, true);
Module['FS_createPath']("/example/objdetect", "haarcascade", true, true);
Module['FS_createPath']("/example", "gif", true, true);
Module['FS_createPath']("/example", "video", true, true);

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
   loadPackage({"files": [{"filename": "/resources/engine/font/materialdesignicons/LICENSE", "start": 0, "end": 992, "audio": 0}, {"filename": "/resources/engine/font/materialdesignicons/materialdesignicons-webfont.ttf.zstdcmp", "start": 992, "end": 411436, "audio": 0}, {"filename": "/resources/engine/font/noto-emoji/NotoEmoji-Regular.ttf.zstdcmp", "start": 411436, "end": 695162, "audio": 0}, {"filename": "/resources/engine/font/noto-emoji/NotoColorEmoji.ttf.zstdcmp", "start": 695162, "end": 10279560, "audio": 0}, {"filename": "/resources/engine/font/noto-emoji/LICENSE", "start": 10279560, "end": 10283861, "audio": 0}, {"filename": "/resources/engine/font/mplus/mplus-1p-bold.ttf.zstdcmp", "start": 10283861, "end": 11201064, "audio": 0}, {"filename": "/resources/engine/font/mplus/mplus-1p-heavy.ttf.zstdcmp", "start": 11201064, "end": 12133101, "audio": 0}, {"filename": "/resources/engine/font/mplus/LICENSE_E", "start": 12133101, "end": 12133448, "audio": 0}, {"filename": "/resources/engine/font/mplus/mplus-1p-light.ttf.zstdcmp", "start": 12133448, "end": 12988807, "audio": 0}, {"filename": "/resources/engine/font/mplus/mplus-1p-regular.ttf.zstdcmp", "start": 12988807, "end": 13857675, "audio": 0}, {"filename": "/resources/engine/font/mplus/mplus-1p-medium.ttf.zstdcmp", "start": 13857675, "end": 14725453, "audio": 0}, {"filename": "/resources/engine/font/mplus/mplus-1p-thin.ttf.zstdcmp", "start": 14725453, "end": 15462815, "audio": 0}, {"filename": "/resources/engine/font/mplus/mplus-1p-black.ttf.zstdcmp", "start": 15462815, "end": 16324010, "audio": 0}, {"filename": "/resources/engine/font/noto-cjk/NotoSansCJK-Regular.ttc.zstdcmp", "start": 16324010, "end": 28958106, "audio": 0}, {"filename": "/resources/engine/font/noto-cjk/LICENSE", "start": 28958106, "end": 28962407, "audio": 0}, {"filename": "/resources/engine/font/fontawesome/LICENSE.txt", "start": 28962407, "end": 28963955, "audio": 0}, {"filename": "/resources/engine/font/fontawesome/fontawesome-brands.otf.zstdcmp", "start": 28963955, "end": 29184687, "audio": 0}, {"filename": "/resources/engine/font/fontawesome/fontawesome-solid.otf.zstdcmp", "start": 29184687, "end": 29414368, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdffont_outline.frag", "start": 29414368, "end": 29415748, "audio": 0}, {"filename": "/resources/engine/shader/glsl/texture.frag", "start": 29415748, "end": 29416494, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sdffont.frag", "start": 29416494, "end": 29417328, "audio": 0}, {"filename": "/resources/engine/shader/glsl/round_dot.frag", "start": 29417328, "end": 29418207, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdffont.frag", "start": 29418207, "end": 29419324, "audio": 0}, {"filename": "/resources/engine/shader/glsl/fullscreen_triangle.frag", "start": 29419324, "end": 29419850, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sprite.vert", "start": 29419850, "end": 29420752, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sdffont_outline.frag", "start": 29420752, "end": 29421858, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdfprint.frag", "start": 29421858, "end": 29423226, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdffont_shadow.frag", "start": 29423226, "end": 29424839, "audio": 0}, {"filename": "/resources/engine/shader/glsl/shape.frag", "start": 29424839, "end": 29425471, "audio": 0}, {"filename": "/resources/engine/shader/glsl/square_dot.frag", "start": 29425471, "end": 29426286, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sdffont_outlineshadow.frag", "start": 29426286, "end": 29427898, "audio": 0}, {"filename": "/resources/engine/shader/glsl/fullscreen_triangle.vert", "start": 29427898, "end": 29428427, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdffont_outlineshadow.frag", "start": 29428427, "end": 29430367, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sdffont_shadow.frag", "start": 29430367, "end": 29431664, "audio": 0}, {"filename": "/resources/engine/shader/glsl/bitmapfont.frag", "start": 29431664, "end": 29432453, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/256.png", "start": 29432453, "end": 29438092, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/32.png", "start": 29438092, "end": 29438709, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/8.png", "start": 29438709, "end": 29438849, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/64.png", "start": 29438849, "end": 29440218, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/16.png", "start": 29440218, "end": 29440481, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/128.png", "start": 29440481, "end": 29443036, "audio": 0}, {"filename": "/resources/engine/soundfont/GMGSx.sf2.zstdcmp", "start": 29443036, "end": 33267319, "audio": 0}, {"filename": "/resources/engine/soundfont/GMGSx.sf2.txt", "start": 33267319, "end": 33267528, "audio": 0}, {"filename": "/example/test.mp3", "start": 33267528, "end": 35759964, "audio": 1}, {"filename": "/example/siv3d-kun.png", "start": 35759964, "end": 35854593, "audio": 0}, {"filename": "/example/windmill.png", "start": 35854593, "end": 36107879, "audio": 0}, {"filename": "/example/bay.jpg", "start": 36107879, "end": 37338913, "audio": 0}, {"filename": "/example/svg/README.txt", "start": 37338913, "end": 37350402, "audio": 0}, {"filename": "/example/svg/cat.svg", "start": 37350402, "end": 37355671, "audio": 0}, {"filename": "/example/svg/turtle.svg", "start": 37355671, "end": 37359092, "audio": 0}, {"filename": "/example/font/DotGothic16/README.md", "start": 37359092, "end": 37360705, "audio": 0}, {"filename": "/example/font/DotGothic16/OFL.txt", "start": 37360705, "end": 37365104, "audio": 0}, {"filename": "/example/font/DotGothic16/README-JP.md", "start": 37365104, "end": 37367571, "audio": 0}, {"filename": "/example/font/DotGothic16/DotGothic16-Regular.ttf", "start": 37367571, "end": 41788647, "audio": 0}, {"filename": "/example/font/RocknRoll/README.md", "start": 41788647, "end": 41790108, "audio": 0}, {"filename": "/example/font/RocknRoll/OFL.txt", "start": 41790108, "end": 41794503, "audio": 0}, {"filename": "/example/font/RocknRoll/README-JP.md", "start": 41794503, "end": 41796858, "audio": 0}, {"filename": "/example/font/RocknRoll/RocknRollOne-Regular.ttf", "start": 41796858, "end": 47284454, "audio": 0}, {"filename": "/example/shader/glsl/homography.frag", "start": 47284454, "end": 47285585, "audio": 0}, {"filename": "/example/shader/glsl/homography.vert", "start": 47285585, "end": 47286927, "audio": 0}, {"filename": "/example/shader/glsl/soft_shape.vert", "start": 47286927, "end": 47288337, "audio": 0}, {"filename": "/example/shader/hlsl/homography.hlsl", "start": 47288337, "end": 47290350, "audio": 0}, {"filename": "/example/shader/hlsl/soft_shape.hlsl", "start": 47290350, "end": 47291865, "audio": 0}, {"filename": "/example/shader/essl/homography.frag", "start": 47291865, "end": 47292983, "audio": 0}, {"filename": "/example/shader/essl/homography.vert", "start": 47292983, "end": 47294297, "audio": 0}, {"filename": "/example/shader/essl/soft_shape.vert", "start": 47294297, "end": 47295680, "audio": 0}, {"filename": "/example/spritesheet/siv3d-kun-16.txt", "start": 47295680, "end": 47295982, "audio": 0}, {"filename": "/example/spritesheet/siv3d-kun-16.png", "start": 47295982, "end": 47298528, "audio": 0}, {"filename": "/example/json/test.json", "start": 47298528, "end": 47298627, "audio": 0}, {"filename": "/example/json/invalid-syntax.json", "start": 47298627, "end": 47298632, "audio": 0}, {"filename": "/example/json/config.json", "start": 47298632, "end": 47299195, "audio": 0}, {"filename": "/example/json/empty.json", "start": 47299195, "end": 47299203, "audio": 0}, {"filename": "/example/json/invalid-blank.json", "start": 47299203, "end": 47299206, "audio": 0}, {"filename": "/example/zip/zip_test.zip", "start": 47299206, "end": 47648008, "audio": 0}, {"filename": "/example/geojson/countries.geojson", "start": 47648008, "end": 51500037, "audio": 0}, {"filename": "/example/midi/test.mid", "start": 51500037, "end": 51553574, "audio": 0}, {"filename": "/example/midi/test.txt", "start": 51553574, "end": 51553763, "audio": 0}, {"filename": "/example/objdetect/haarcascade/eye.xml", "start": 51553763, "end": 51895169, "audio": 0}, {"filename": "/example/objdetect/haarcascade/frontal_face_alt2.xml", "start": 51895169, "end": 52435785, "audio": 0}, {"filename": "/example/objdetect/haarcascade/face_anime.xml", "start": 52435785, "end": 52682730, "audio": 0}, {"filename": "/example/objdetect/haarcascade/frontal_catface.xml", "start": 52682730, "end": 53094118, "audio": 0}, {"filename": "/example/gif/test.gif", "start": 53094118, "end": 53106245, "audio": 0}, {"filename": "/example/video/river.mp4", "start": 53106245, "end": 62029997, "audio": 0}, {"filename": "/example/video/river.txt", "start": 62029997, "end": 62030070, "audio": 0}], "remote_package_size": 62030070, "package_uuid": "fae0599e-8f0d-4f90-bbb1-df6cd1d37ba5"});
  
  })();
  