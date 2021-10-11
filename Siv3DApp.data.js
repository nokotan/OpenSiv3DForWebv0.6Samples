
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

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        
            var compressedData = {"data":null,"cachedOffset":320357,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1447,2996,4463,5998,7996,10044,12092,14140,16188,18236,20284,22332,24380,26428,28476,30524,32572,34620,36668,38716,40764,42812,44860,46908,48956,51004,53052,55100,57148,59196,61244,63292,65340,67388,69436,71484,73532,75580,77628,79676,81724,83772,85820,87868,89916,91964,94012,96060,98108,100156,102204,104252,106300,108348,110396,112444,114492,116540,118588,120636,122684,124732,126780,128828,130876,132924,134972,137020,139068,141116,143164,145212,147260,149308,151356,153404,155452,157500,159548,161596,163644,165692,167740,169788,171836,173884,175932,177980,180028,182076,184124,186172,188220,190268,192316,194364,196412,198460,200508,202556,204604,206652,208700,210748,212796,214844,216892,218940,220988,223036,225084,227132,229180,231228,233276,235324,237372,239420,241468,243516,245564,247612,249660,251708,253756,255804,257852,259900,261948,263996,266044,268092,270140,272188,274236,276284,278332,280380,282428,284387,286435,288483,290382,291548,292649,293335,294243,295140,296188,297458,298943,300229,301499,303064,304534,305406,306473,307341,308363,309336,310616,311916,313182,315230,317148,318729,320120],"sizes":[1447,1549,1467,1535,1998,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,1959,2048,2048,1899,1166,1101,686,908,897,1048,1270,1485,1286,1270,1565,1470,872,1067,868,1022,973,1280,1300,1266,2048,1918,1581,1391,237],"successes":[1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with  -s LZ4=1  ?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, false);
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
   loadPackage({"files": [{"filename": "/resources/engine/font/noto-cjk/LICENSE", "start": 0, "end": 4301, "audio": 0}, {"filename": "/resources/engine/font/noto-emoji/LICENSE", "start": 4301, "end": 8602, "audio": 0}, {"filename": "/resources/engine/font/noto-emoji/NotoEmoji-Regular.ttf.zstdcmp", "start": 8602, "end": 292328, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdffont_shadow.frag", "start": 292328, "end": 293899, "audio": 0}, {"filename": "/resources/engine/shader/glsl/forward3d.vert", "start": 293899, "end": 294813, "audio": 0}, {"filename": "/resources/engine/shader/glsl/forward3d.frag", "start": 294813, "end": 297007, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sdffont.frag", "start": 297007, "end": 297841, "audio": 0}, {"filename": "/resources/engine/shader/glsl/bitmapfont.frag", "start": 297841, "end": 298630, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdfprint.frag", "start": 298630, "end": 299998, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdffont.frag", "start": 299998, "end": 301115, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sprite.vert", "start": 301115, "end": 302017, "audio": 0}, {"filename": "/resources/engine/shader/glsl/fullscreen_triangle.vert", "start": 302017, "end": 302546, "audio": 0}, {"filename": "/resources/engine/shader/glsl/square_dot.frag", "start": 302546, "end": 303361, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdffont_outline.frag", "start": 303361, "end": 304741, "audio": 0}, {"filename": "/resources/engine/shader/glsl/copy.frag", "start": 304741, "end": 305480, "audio": 0}, {"filename": "/resources/engine/shader/glsl/line3d.frag", "start": 305480, "end": 305968, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sky.frag", "start": 305968, "end": 317679, "audio": 0}, {"filename": "/resources/engine/shader/glsl/round_dot.frag", "start": 317679, "end": 318558, "audio": 0}, {"filename": "/resources/engine/shader/glsl/fullscreen_triangle.frag", "start": 318558, "end": 319084, "audio": 0}, {"filename": "/resources/engine/shader/glsl/texture.frag", "start": 319084, "end": 319830, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdffont_outlineshadow.frag", "start": 319830, "end": 321728, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sdffont_shadow.frag", "start": 321728, "end": 323031, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sdffont_outlineshadow.frag", "start": 323031, "end": 324649, "audio": 0}, {"filename": "/resources/engine/shader/glsl/linear_to_screen.frag", "start": 324649, "end": 325326, "audio": 0}, {"filename": "/resources/engine/shader/glsl/gaussian_blur_9.frag", "start": 325326, "end": 326605, "audio": 0}, {"filename": "/resources/engine/shader/glsl/line3d.vert", "start": 326605, "end": 327420, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sdffont_outline.frag", "start": 327420, "end": 328526, "audio": 0}, {"filename": "/resources/engine/shader/glsl/apply_srgb_curve.frag", "start": 328526, "end": 331038, "audio": 0}, {"filename": "/resources/engine/shader/glsl/shape.frag", "start": 331038, "end": 331670, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/16.png", "start": 331670, "end": 331933, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/8.png", "start": 331933, "end": 332073, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/256.png", "start": 332073, "end": 337712, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/128.png", "start": 337712, "end": 340267, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/32.png", "start": 340267, "end": 340884, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/64.png", "start": 340884, "end": 342253, "audio": 0}], "remote_package_size": 324453, "package_uuid": "da603769-d325-41c3-b67a-96ea0b390fe0"});
  
  })();
  