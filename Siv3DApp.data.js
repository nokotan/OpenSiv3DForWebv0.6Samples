
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
        
            var compressedData = {"data":null,"cachedOffset":372741,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,2036,4084,6132,8180,10228,12276,14324,16372,18420,20468,22516,24564,26612,28665,30713,32647,34079,35772,37820,39868,41916,43964,46012,48060,50108,52156,54204,56252,58300,60348,62396,64444,66492,68540,70588,72636,74684,76732,78780,80828,82876,84924,86972,89020,91068,93116,95164,97212,99260,101308,103356,105404,107452,109500,111548,113596,115644,117692,119740,121788,123836,125884,127932,129980,132028,134076,136124,138172,140220,142268,144316,146364,148412,150460,152508,154556,156604,158652,160700,162748,164796,166844,168892,170940,172988,175036,177084,179132,181180,183228,185276,187324,189372,191420,193477,195525,197573,199621,201669,203717,205765,207813,209861,211909,213957,216005,218053,220101,222149,224197,226245,228293,230341,232389,234437,236485,238533,240581,242629,244677,246725,248773,250821,252869,254917,256965,259013,261061,263109,265157,267205,269253,271301,273349,275397,277445,279493,281541,283589,285637,287685,289733,291781,293829,295877,297925,299973,302021,304069,306117,308165,310213,312261,314216,316264,318312,319783,320896,321966,323002,324128,325793,326821,327960,329517,330915,332200,333463,335115,336549,337431,338382,339199,340356,341265,342576,343858,344939,345886,346769,347612,348509,350028,351391,352565,353734,355333,356752,357813,358920,359960,361157,362261,363287,364336,366039,367354,369402,371372,372728],"sizes":[2036,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2053,2048,1934,1432,1693,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2057,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,1955,2048,2048,1471,1113,1070,1036,1126,1665,1028,1139,1557,1398,1285,1263,1652,1434,882,951,817,1157,909,1311,1282,1081,947,883,843,897,1519,1363,1174,1169,1599,1419,1061,1107,1040,1197,1104,1026,1049,1703,1315,2048,1970,1356,13],"successes":[1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0]}
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
   loadPackage({"files": [{"filename": "/resources/engine/font/min/siv3d-min.woff", "start": 0, "end": 32292, "audio": 0}, {"filename": "/resources/engine/font/noto-emoji/LICENSE", "start": 32292, "end": 36593, "audio": 0}, {"filename": "/resources/engine/font/noto-emoji/NotoEmoji-Regular.ttf.zstdcmp", "start": 36593, "end": 320319, "audio": 0}, {"filename": "/resources/engine/shader/essl/round_dot.frag", "start": 320319, "end": 321046, "audio": 0}, {"filename": "/resources/engine/shader/essl/sdffont_outlineshadow.frag", "start": 321046, "end": 322512, "audio": 0}, {"filename": "/resources/engine/shader/essl/sdffont.frag", "start": 322512, "end": 323194, "audio": 0}, {"filename": "/resources/engine/shader/essl/fullscreen_triangle.vert", "start": 323194, "end": 323571, "audio": 0}, {"filename": "/resources/engine/shader/essl/msdffont_outlineshadow.frag", "start": 323571, "end": 325317, "audio": 0}, {"filename": "/resources/engine/shader/essl/sdffont_shadow.frag", "start": 325317, "end": 326468, "audio": 0}, {"filename": "/resources/engine/shader/essl/line3d.vert", "start": 326468, "end": 327131, "audio": 0}, {"filename": "/resources/engine/shader/essl/fullscreen_triangle.frag", "start": 327131, "end": 327505, "audio": 0}, {"filename": "/resources/engine/shader/essl/msdfprint.frag", "start": 327505, "end": 328721, "audio": 0}, {"filename": "/resources/engine/shader/essl/sprite.vert", "start": 328721, "end": 329471, "audio": 0}, {"filename": "/resources/engine/shader/essl/square_dot.frag", "start": 329471, "end": 330134, "audio": 0}, {"filename": "/resources/engine/shader/essl/apply_srgb_curve.frag", "start": 330134, "end": 332494, "audio": 0}, {"filename": "/resources/engine/shader/essl/gaussian_blur_9.frag", "start": 332494, "end": 333621, "audio": 0}, {"filename": "/resources/engine/shader/essl/bitmapfont.frag", "start": 333621, "end": 334258, "audio": 0}, {"filename": "/resources/engine/shader/essl/forward3d.frag", "start": 334258, "end": 336300, "audio": 0}, {"filename": "/resources/engine/shader/essl/sky.frag", "start": 336300, "end": 347859, "audio": 0}, {"filename": "/resources/engine/shader/essl/texture.frag", "start": 347859, "end": 348453, "audio": 0}, {"filename": "/resources/engine/shader/essl/sdffont_outline.frag", "start": 348453, "end": 349407, "audio": 0}, {"filename": "/resources/engine/shader/essl/msdffont_outline.frag", "start": 349407, "end": 350635, "audio": 0}, {"filename": "/resources/engine/shader/essl/copy.frag", "start": 350635, "end": 351222, "audio": 0}, {"filename": "/resources/engine/shader/essl/line3d.frag", "start": 351222, "end": 351558, "audio": 0}, {"filename": "/resources/engine/shader/essl/forward3d.vert", "start": 351558, "end": 352320, "audio": 0}, {"filename": "/resources/engine/shader/essl/shape.frag", "start": 352320, "end": 352800, "audio": 0}, {"filename": "/resources/engine/shader/essl/msdffont.frag", "start": 352800, "end": 353765, "audio": 0}, {"filename": "/resources/engine/shader/essl/msdffont_shadow.frag", "start": 353765, "end": 355184, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/round_dot.frag.wgsl", "start": 355184, "end": 356081, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/sdffont_shadow.frag.wgsl", "start": 356081, "end": 357603, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/sdffont_outlineshadow.frag.wgsl", "start": 357603, "end": 359507, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/apply_srgb_curve.frag.wgsl", "start": 359507, "end": 362118, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/forward3d.vert.wgsl", "start": 362118, "end": 363291, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/linear_to_screen.frag.wgsl", "start": 363291, "end": 364101, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/msdfprint.frag.wgsl", "start": 364101, "end": 365642, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/shape.frag.wgsl", "start": 365642, "end": 366263, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/texture.frag.wgsl", "start": 366263, "end": 367047, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/msdffont.frag.wgsl", "start": 367047, "end": 368315, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/square_dot.frag.wgsl", "start": 368315, "end": 369196, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/copy.frag.wgsl", "start": 369196, "end": 369683, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/sdffont.frag.wgsl", "start": 369683, "end": 370640, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/fullscreen_triangle.frag.wgsl", "start": 370640, "end": 371025, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/gaussian_blur_9.frag.wgsl", "start": 371025, "end": 372542, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/sky.frag.wgsl", "start": 372542, "end": 385503, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/sprite.vert.wgsl", "start": 385503, "end": 386600, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/msdffont_shadow.frag.wgsl", "start": 386600, "end": 388435, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/fullscreen_triangle.vert.wgsl", "start": 388435, "end": 389019, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/forward3d.frag.wgsl", "start": 389019, "end": 391765, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/msdffont_outlineshadow.frag.wgsl", "start": 391765, "end": 393984, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/bitmapfont.frag.wgsl", "start": 393984, "end": 394860, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/line3d.vert.wgsl", "start": 394860, "end": 395860, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/sdffont_outline.frag.wgsl", "start": 395860, "end": 397107, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/line3d.frag.wgsl", "start": 397107, "end": 397447, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/msdffont_outline.frag.wgsl", "start": 397447, "end": 399030, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/128.png", "start": 399030, "end": 401585, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/256.png", "start": 401585, "end": 407224, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/16.png", "start": 407224, "end": 407487, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/8.png", "start": 407487, "end": 407627, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/32.png", "start": 407627, "end": 408244, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/64.png", "start": 408244, "end": 409613, "audio": 0}], "remote_package_size": 376837, "package_uuid": "bbf39387-e569-4b6e-87b8-f1d3fc825718"});
  
  })();
  