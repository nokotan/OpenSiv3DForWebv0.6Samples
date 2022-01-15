
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
        
            var compressedData = {"data":null,"cachedOffset":372500,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,2036,4084,6132,8180,10228,12276,14324,16372,18420,20468,22516,24564,26612,28665,30713,32647,34079,35772,37820,39868,41916,43964,46012,48060,50108,52156,54204,56252,58300,60348,62396,64444,66492,68540,70588,72636,74684,76732,78780,80828,82876,84924,86972,89020,91068,93116,95164,97212,99260,101308,103356,105404,107452,109500,111548,113596,115644,117692,119740,121788,123836,125884,127932,129980,132028,134076,136124,138172,140220,142268,144316,146364,148412,150460,152508,154556,156604,158652,160700,162748,164796,166844,168892,170940,172988,175036,177084,179132,181180,183228,185276,187324,189372,191420,193477,195525,197573,199621,201669,203717,205765,207813,209861,211909,213957,216005,218053,220101,222149,224197,226245,228293,230341,232389,234437,236485,238533,240581,242629,244677,246725,248773,250821,252869,254917,256965,259013,261061,263109,265157,267205,269253,271301,273349,275397,277445,279493,281541,283589,285637,287685,289733,291781,293829,295877,297925,299973,302021,304069,306117,308165,310213,312261,314216,316264,318312,319986,320895,321808,322782,323825,325116,326123,327080,328142,329259,330231,331552,333068,334441,335801,337221,338840,340077,340754,341817,342829,344002,344972,345802,346869,347963,349120,350659,352024,353237,354378,355981,357379,358419,359446,360540,362031,363109,364198,365425,367473,369521,370620,372487],"sizes":[2036,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2053,2048,1934,1432,1693,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2057,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,1955,2048,2048,1674,909,913,974,1043,1291,1007,957,1062,1117,972,1321,1516,1373,1360,1420,1619,1237,677,1063,1012,1173,970,830,1067,1094,1157,1539,1365,1213,1141,1603,1398,1040,1027,1094,1491,1078,1089,1227,2048,2048,1099,1867,13],"successes":[1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,0]}
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
   loadPackage({"files": [{"filename": "/resources/engine/font/min/siv3d-min.woff", "start": 0, "end": 32292, "audio": 0}, {"filename": "/resources/engine/font/noto-emoji/LICENSE", "start": 32292, "end": 36593, "audio": 0}, {"filename": "/resources/engine/font/noto-emoji/NotoEmoji-Regular.ttf.zstdcmp", "start": 36593, "end": 320319, "audio": 0}, {"filename": "/resources/engine/shader/essl/msdfprint.frag", "start": 320319, "end": 321535, "audio": 0}, {"filename": "/resources/engine/shader/essl/sdffont_outlineshadow.frag", "start": 321535, "end": 323001, "audio": 0}, {"filename": "/resources/engine/shader/essl/sdffont_outline.frag", "start": 323001, "end": 323955, "audio": 0}, {"filename": "/resources/engine/shader/essl/gaussian_blur_9.frag", "start": 323955, "end": 325082, "audio": 0}, {"filename": "/resources/engine/shader/essl/texture.frag", "start": 325082, "end": 325676, "audio": 0}, {"filename": "/resources/engine/shader/essl/line3d.vert", "start": 325676, "end": 326339, "audio": 0}, {"filename": "/resources/engine/shader/essl/sprite.vert", "start": 326339, "end": 327089, "audio": 0}, {"filename": "/resources/engine/shader/essl/bitmapfont.frag", "start": 327089, "end": 327726, "audio": 0}, {"filename": "/resources/engine/shader/essl/shape.frag", "start": 327726, "end": 328206, "audio": 0}, {"filename": "/resources/engine/shader/essl/sdffont.frag", "start": 328206, "end": 328888, "audio": 0}, {"filename": "/resources/engine/shader/essl/apply_srgb_curve.frag", "start": 328888, "end": 331248, "audio": 0}, {"filename": "/resources/engine/shader/essl/line3d.frag", "start": 331248, "end": 331584, "audio": 0}, {"filename": "/resources/engine/shader/essl/sdffont_shadow.frag", "start": 331584, "end": 332735, "audio": 0}, {"filename": "/resources/engine/shader/essl/square_dot.frag", "start": 332735, "end": 333398, "audio": 0}, {"filename": "/resources/engine/shader/essl/forward3d.vert", "start": 333398, "end": 334160, "audio": 0}, {"filename": "/resources/engine/shader/essl/fullscreen_triangle.vert", "start": 334160, "end": 334537, "audio": 0}, {"filename": "/resources/engine/shader/essl/copy.frag", "start": 334537, "end": 335124, "audio": 0}, {"filename": "/resources/engine/shader/essl/msdffont_outline.frag", "start": 335124, "end": 336352, "audio": 0}, {"filename": "/resources/engine/shader/essl/msdffont_shadow.frag", "start": 336352, "end": 337771, "audio": 0}, {"filename": "/resources/engine/shader/essl/forward3d.frag", "start": 337771, "end": 339813, "audio": 0}, {"filename": "/resources/engine/shader/essl/round_dot.frag", "start": 339813, "end": 340540, "audio": 0}, {"filename": "/resources/engine/shader/essl/fullscreen_triangle.frag", "start": 340540, "end": 340914, "audio": 0}, {"filename": "/resources/engine/shader/essl/msdffont.frag", "start": 340914, "end": 341879, "audio": 0}, {"filename": "/resources/engine/shader/essl/msdffont_outlineshadow.frag", "start": 341879, "end": 343625, "audio": 0}, {"filename": "/resources/engine/shader/essl/sky.frag", "start": 343625, "end": 355184, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/sprite.vert.wgsl", "start": 355184, "end": 356281, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/bitmapfont.frag.wgsl", "start": 356281, "end": 357157, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/line3d.frag.wgsl", "start": 357157, "end": 357497, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/texture.frag.wgsl", "start": 357497, "end": 358281, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/msdffont_outlineshadow.frag.wgsl", "start": 358281, "end": 360500, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/forward3d.vert.wgsl", "start": 360500, "end": 361673, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/msdffont_shadow.frag.wgsl", "start": 361673, "end": 363508, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/gaussian_blur_9.frag.wgsl", "start": 363508, "end": 365025, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/line3d.vert.wgsl", "start": 365025, "end": 366025, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/linear_to_screen.frag.wgsl", "start": 366025, "end": 366835, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/copy.frag.wgsl", "start": 366835, "end": 367322, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/round_dot.frag.wgsl", "start": 367322, "end": 368219, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/square_dot.frag.wgsl", "start": 368219, "end": 369100, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/sdffont_outlineshadow.frag.wgsl", "start": 369100, "end": 371004, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/msdffont_outline.frag.wgsl", "start": 371004, "end": 372587, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/fullscreen_triangle.vert.wgsl", "start": 372587, "end": 373171, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/msdfprint.frag.wgsl", "start": 373171, "end": 374712, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/sky.frag.wgsl", "start": 374712, "end": 387673, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/fullscreen_triangle.frag.wgsl", "start": 387673, "end": 388058, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/sdffont_shadow.frag.wgsl", "start": 388058, "end": 389580, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/shape.frag.wgsl", "start": 389580, "end": 390201, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/forward3d.frag.wgsl", "start": 390201, "end": 392947, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/sdffont.frag.wgsl", "start": 392947, "end": 393904, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/apply_srgb_curve.frag.wgsl", "start": 393904, "end": 396515, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/msdffont.frag.wgsl", "start": 396515, "end": 397783, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/sdffont_outline.frag.wgsl", "start": 397783, "end": 399030, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/32.png", "start": 399030, "end": 399647, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/16.png", "start": 399647, "end": 399910, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/256.png", "start": 399910, "end": 405549, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/8.png", "start": 405549, "end": 405689, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/64.png", "start": 405689, "end": 407058, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/128.png", "start": 407058, "end": 409613, "audio": 0}], "remote_package_size": 376596, "package_uuid": "cfbfea29-75db-4b64-afbb-e2604f80abc3"});
  
  })();
  