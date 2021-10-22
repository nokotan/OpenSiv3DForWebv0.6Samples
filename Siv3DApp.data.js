
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
Module['FS_createPath']("/resources/engine/shader", "glsl", true, true);
Module['FS_createPath']("/resources/engine/shader", "wgsl", true, true);
Module['FS_createPath']("/resources/engine", "texture", true, true);
Module['FS_createPath']("/resources/engine/texture", "box-shadow", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        
            var compressedData = {"data":null,"cachedOffset":367189,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,2036,4084,6132,8180,10228,12276,14324,16372,18420,20468,22516,24564,26612,28665,30713,32647,34079,35772,37820,39868,41916,43964,46012,48060,50108,52156,54204,56252,58300,60348,62396,64444,66492,68540,70588,72636,74684,76732,78780,80828,82876,84924,86972,89020,91068,93116,95164,97212,99260,101308,103356,105404,107452,109500,111548,113596,115644,117692,119740,121788,123836,125884,127932,129980,132028,134076,136124,138172,140220,142268,144316,146364,148412,150460,152508,154556,156604,158652,160700,162748,164796,166844,168892,170940,172988,175036,177084,179132,181180,183228,185276,187324,189372,191420,193477,195525,197573,199621,201669,203717,205765,207813,209861,211909,213957,216005,218053,220101,222149,224197,226245,228293,230341,232389,234437,236485,238533,240581,242629,244677,246725,248773,250821,252869,254917,256965,259013,261061,263109,265157,267205,269253,271301,273349,275397,277445,279493,281541,283589,285637,287685,289733,291781,293829,295877,297925,299973,302021,304069,306117,308165,310213,312261,314216,316264,318312,319977,321013,322148,322999,324092,324997,325933,327452,328879,330162,331410,333089,334452,335200,336327,337326,338355,339279,340878,341830,342898,343841,344768,345768,346716,347817,348931,350054,350917,351884,352679,353738,354811,355594,356596,358169,359045,360944,362992,364412,366271],"sizes":[2036,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2053,2048,1934,1432,1693,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2057,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,1955,2048,2048,1665,1036,1135,851,1093,905,936,1519,1427,1283,1248,1679,1363,748,1127,999,1029,924,1599,952,1068,943,927,1000,948,1101,1114,1123,863,967,795,1059,1073,783,1002,1573,876,1899,2048,1420,1859,918],"successes":[1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1]}
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
   loadPackage({"files": [{"filename": "/resources/engine/font/min/siv3d-min.woff", "start": 0, "end": 32292, "audio": 0}, {"filename": "/resources/engine/font/noto-emoji/LICENSE", "start": 32292, "end": 36593, "audio": 0}, {"filename": "/resources/engine/font/noto-emoji/NotoEmoji-Regular.ttf.zstdcmp", "start": 36593, "end": 320319, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdffont_shadow.frag", "start": 320319, "end": 321890, "audio": 0}, {"filename": "/resources/engine/shader/glsl/forward3d.vert", "start": 321890, "end": 322804, "audio": 0}, {"filename": "/resources/engine/shader/glsl/forward3d.frag", "start": 322804, "end": 324998, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sdffont.frag", "start": 324998, "end": 325832, "audio": 0}, {"filename": "/resources/engine/shader/glsl/bitmapfont.frag", "start": 325832, "end": 326621, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdfprint.frag", "start": 326621, "end": 327989, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdffont.frag", "start": 327989, "end": 329106, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sprite.vert", "start": 329106, "end": 330008, "audio": 0}, {"filename": "/resources/engine/shader/glsl/fullscreen_triangle.vert", "start": 330008, "end": 330537, "audio": 0}, {"filename": "/resources/engine/shader/glsl/square_dot.frag", "start": 330537, "end": 331352, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdffont_outline.frag", "start": 331352, "end": 332732, "audio": 0}, {"filename": "/resources/engine/shader/glsl/copy.frag", "start": 332732, "end": 333471, "audio": 0}, {"filename": "/resources/engine/shader/glsl/line3d.frag", "start": 333471, "end": 333959, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sky.frag", "start": 333959, "end": 345670, "audio": 0}, {"filename": "/resources/engine/shader/glsl/round_dot.frag", "start": 345670, "end": 346549, "audio": 0}, {"filename": "/resources/engine/shader/glsl/fullscreen_triangle.frag", "start": 346549, "end": 347075, "audio": 0}, {"filename": "/resources/engine/shader/glsl/texture.frag", "start": 347075, "end": 347821, "audio": 0}, {"filename": "/resources/engine/shader/glsl/msdffont_outlineshadow.frag", "start": 347821, "end": 349719, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sdffont_shadow.frag", "start": 349719, "end": 351022, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sdffont_outlineshadow.frag", "start": 351022, "end": 352640, "audio": 0}, {"filename": "/resources/engine/shader/glsl/linear_to_screen.frag", "start": 352640, "end": 353317, "audio": 0}, {"filename": "/resources/engine/shader/glsl/gaussian_blur_9.frag", "start": 353317, "end": 354596, "audio": 0}, {"filename": "/resources/engine/shader/glsl/line3d.vert", "start": 354596, "end": 355411, "audio": 0}, {"filename": "/resources/engine/shader/glsl/sdffont_outline.frag", "start": 355411, "end": 356517, "audio": 0}, {"filename": "/resources/engine/shader/glsl/apply_srgb_curve.frag", "start": 356517, "end": 359029, "audio": 0}, {"filename": "/resources/engine/shader/glsl/shape.frag", "start": 359029, "end": 359661, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/copy.frag.wgsl", "start": 359661, "end": 360300, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/sdffont_outlineshadow.frag.wgsl", "start": 360300, "end": 362356, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/gaussian_blur_9.frag.wgsl", "start": 362356, "end": 364025, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/sprite.vert.wgsl", "start": 364025, "end": 365274, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/line3d.vert.wgsl", "start": 365274, "end": 366426, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/msdfprint.frag.wgsl", "start": 366426, "end": 368119, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/sdffont_shadow.frag.wgsl", "start": 368119, "end": 369793, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/sdffont.frag.wgsl", "start": 369793, "end": 370902, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/forward3d.frag.wgsl", "start": 370902, "end": 373800, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/round_dot.frag.wgsl", "start": 373800, "end": 374849, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/msdffont_shadow.frag.wgsl", "start": 374849, "end": 376836, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/fullscreen_triangle.frag.wgsl", "start": 376836, "end": 377373, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/sdffont_outline.frag.wgsl", "start": 377373, "end": 378772, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/msdffont.frag.wgsl", "start": 378772, "end": 380192, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/line3d.frag.wgsl", "start": 380192, "end": 380684, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/square_dot.frag.wgsl", "start": 380684, "end": 381717, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/texture.frag.wgsl", "start": 381717, "end": 382653, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/msdffont_outlineshadow.frag.wgsl", "start": 382653, "end": 385024, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/fullscreen_triangle.vert.wgsl", "start": 385024, "end": 385760, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/msdffont_outline.frag.wgsl", "start": 385760, "end": 387495, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/shape.frag.wgsl", "start": 387495, "end": 388268, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/bitmapfont.frag.wgsl", "start": 388268, "end": 389296, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/forward3d.vert.wgsl", "start": 389296, "end": 390621, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/linear_to_screen.frag.wgsl", "start": 390621, "end": 391431, "audio": 0}, {"filename": "/resources/engine/shader/wgsl/apply_srgb_curve.frag.wgsl", "start": 391431, "end": 394233, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/16.png", "start": 394233, "end": 394496, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/8.png", "start": 394496, "end": 394636, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/256.png", "start": 394636, "end": 400275, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/128.png", "start": 400275, "end": 402830, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/32.png", "start": 402830, "end": 403447, "audio": 0}, {"filename": "/resources/engine/texture/box-shadow/64.png", "start": 403447, "end": 404816, "audio": 0}], "remote_package_size": 371285, "package_uuid": "747d0d3d-c265-4a14-8baa-bbf45b1ab7e1"});
  
  })();
  