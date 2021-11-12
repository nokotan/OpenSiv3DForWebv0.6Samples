
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
Module['FS_createPath']("/resources/engine/font", "min", true, true);
Module['FS_createPath']("/resources/engine/font", "noto-emoji", true, true);
Module['FS_createPath']("/resources/engine", "shader", true, true);
Module['FS_createPath']("/resources/engine/shader", "essl", true, true);
Module['FS_createPath']("/resources/engine/shader", "wgsl", true, true);
Module['FS_createPath']("/resources/engine", "texture", true, true);
Module['FS_createPath']("/resources/engine/texture", "box-shadow", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        
            var compressedData = {"data":null,"cachedOffset":363572,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,2036,4084,6132,8180,10228,12276,14324,16372,18420,20468,22516,24564,26612,28665,30713,32647,34079,35772,37820,39868,41916,43964,46012,48060,50108,52156,54204,56252,58300,60348,62396,64444,66492,68540,70588,72636,74684,76732,78780,80828,82876,84924,86972,89020,91068,93116,95164,97212,99260,101308,103356,105404,107452,109500,111548,113596,115644,117692,119740,121788,123836,125884,127932,129980,132028,134076,136124,138172,140220,142268,144316,146364,148412,150460,152508,154556,156604,158652,160700,162748,164796,166844,168892,170940,172988,175036,177084,179132,181180,183228,185276,187324,189372,191420,193477,195525,197573,199621,201669,203717,205765,207813,209861,211909,213957,216005,218053,220101,222149,224197,226245,228293,230341,232389,234437,236485,238533,240581,242629,244677,246725,248773,250821,252869,254917,256965,259013,261061,263109,265157,267205,269253,271301,273349,275397,277445,279493,281541,283589,285637,287685,289733,291781,293829,295877,297925,299973,302021,304069,306117,308165,310213,312261,314216,316264,318312,319945,321068,321967,323552,324996,326249,327510,329178,330439,331594,333068,333986,334946,335920,336816,337679,338862,339999,341152,342175,343109,344083,344969,345980,347064,348085,349472,350719,351567,352387,353393,354534,355663,356980,359028,361018,362530],"sizes":[2036,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2053,2048,1934,1432,1693,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2057,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,1955,2048,2048,1633,1123,899,1585,1444,1253,1261,1668,1261,1155,1474,918,960,974,896,863,1183,1137,1153,1023,934,974,886,1011,1084,1021,1387,1247,848,820,1006,1141,1129,1317,2048,1990,1512,1042],"successes":[1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1]}
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
   loadPackage({"files": [{"filename": "/resources/engine/font/min/siv3d-min.woff", "start": 0, "end": 32292, "audio": 0}, {"filename": "/resources/engine/font/noto-emoji/LICENSE", "start": 32292, "end": 36593, "audio": 0}, {"filename": "/resources/engine/font/noto-emoji/NotoEmoji-Regular.ttf.zstdcmp", "start": 36593, "end": 320319, "audio": 0}, {"filename": "/resources/engine/shader/essl/sdffont_shadow.frag", "start": 320319, "end": 321470, "audio": 0}, {"filename": "/resources/engine/shader/essl/msdfprint.frag", "start": 321470, "end": 322686, "audio": 0}, {"filename": "/resources/engine/shader/essl/forward3d.vert", "start": 322686, "end": 323448, "audio": 0}, {"filename": "/resources/engine/shader/essl/fullscreen_triangle.frag", "start": 323448, "end": 323822, "audio": 0}, {"filename": "/resources/engine/shader/essl/shape.frag", "start": 323822, "end": 324302, "audio": 0}, {"filename": "/resources/engine/shader/essl/sdffont_outlineshadow.frag", "start": 324302, "end": 325768, "audio": 0}, {"filename": "/resources/engine/shader/essl/sky.frag", "start": 325768, "end": 337327, "audio": 0}, {"filename": "/resources/engine/shader/essl/line3d.frag", "start": 337327, "end": 337663, "audio": 0}, {"filename": "/resources/engine/shader/essl/msdffont_shadow.frag", "start": 337663, "end": 339082, "audio": 0}, {"filename": "/resources/engine/shader/essl/line3d.vert", "start": 339082, "end": 339745, "audio": 0}, {"filename": "/resources/engine/shader/essl/apply_srgb_curve.frag", "start": 339745, "end": 342105, "audio": 0}, {"filename": "/resources/engine/shader/essl/msdffont_outline.frag", "start": 342105, "end": 343333, "audio": 0}, {"filename": "/resources/engine/shader/essl/sdffont_outline.frag", "start": 343333, "end": 344287, "audio": 0}, {"filename": "/resources/engine/shader/essl/gaussian_blur_9.frag", "start": 344287, "end": 345414, "audio": 0}, {"filename": "/resources/engine/shader/essl/msdffont_outlineshadow.frag", "start": 345414, "end": 347160, "audio": 0}, {"filename": "/resources/engine/shader/essl/copy.frag", "start": 347160, "end": 347747, "audio": 0}, {"filename": "/resources/engine/shader/essl/msdffont.frag", "start": 347747, "end": 348712, "audio": 0}, {"filename": "/resources/engine/shader/essl/bitmapfont.frag", "start": 348712, "end": 349349, "audio": 0}, {"filename": "/resources/engine/shader/essl/texture.frag", "start": 349349, "end": 349943, "audio": 0}, {"filename": "/resources/engine/shader/essl/fullscreen_triangle.vert", "start": 349943, "end": 350320, "audio": 0}, {"filename": "/resources/engine/shader/essl/sdffont.frag", "start": 350320, "end": 351002, "audio": 0}, {"filename": "/resources/engine/shader/essl/round_dot.frag", "start": 351002, "end": 351729, "audio": 0}, {"filename": "/resources/engine/shader/essl/square_dot.frag", "start": 351729, "end": 352392, "audio": 0}, {"filename": "/resources/engine/shader/essl/forward3d.frag", "start": 352392, "end": 354434, "audio": 0}, {"filename": "/resources/engine/shader/essl/sprite.vert", "start": 354434, "end": 355184, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/linear_to_screen.frag.wgsl", "start": 355184, "end": 355994, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/sprite.vert.wgsl", "start": 355994, "end": 357091, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/msdfprint.frag.wgsl", "start": 357091, "end": 358632, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/fullscreen_triangle.frag.wgsl", "start": 358632, "end": 359017, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/msdffont.frag.wgsl", "start": 359017, "end": 360285, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/sdffont.frag.wgsl", "start": 360285, "end": 361242, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/msdffont_shadow.frag.wgsl", "start": 361242, "end": 363077, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/shape.frag.wgsl", "start": 363077, "end": 363698, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/line3d.frag.wgsl", "start": 363698, "end": 364038, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/forward3d.vert.wgsl", "start": 364038, "end": 365211, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/bitmapfont.frag.wgsl", "start": 365211, "end": 366087, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/msdffont_outline.frag.wgsl", "start": 366087, "end": 367670, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/sdffont_shadow.frag.wgsl", "start": 367670, "end": 369192, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/round_dot.frag.wgsl", "start": 369192, "end": 370089, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/forward3d.frag.wgsl", "start": 370089, "end": 372835, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/square_dot.frag.wgsl", "start": 372835, "end": 373716, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/apply_srgb_curve.frag.wgsl", "start": 373716, "end": 376327, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/fullscreen_triangle.vert.wgsl", "start": 376327, "end": 376911, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/sdffont_outline.frag.wgsl", "start": 376911, "end": 378158, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/copy.frag.wgsl", "start": 378158, "end": 378645, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/texture.frag.wgsl", "start": 378645, "end": 379429, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/gaussian_blur_9.frag.wgsl", "start": 379429, "end": 380946, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/line3d.vert.wgsl", "start": 380946, "end": 381946, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/sdffont_outlineshadow.frag.wgsl", "start": 381946, "end": 383850, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/msdffont_outlineshadow.frag.wgsl", "start": 383850, "end": 386069, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/64.png", "start": 386069, "end": 387438, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/256.png", "start": 387438, "end": 393077, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/128.png", "start": 393077, "end": 395632, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/8.png", "start": 395632, "end": 395772, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/32.png", "start": 395772, "end": 396389, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/16.png", "start": 396389, "end": 396652, "audio": 0}], "remote_package_size": 367668, "package_uuid": "0f00f3f7-245f-4f0c-ae44-8a1eca9a39fe"});
  
  })();
  