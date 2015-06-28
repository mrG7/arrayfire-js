"use strict";
"use strict";
var assert = require("better-assert");
var _ = require("lodash");
var ref = require("ref");
var Bluebird = require("bluebird");
var async = Bluebird.coroutine;
var int = ref.types.int;
var float = ref.types.float;
function testPlatform(id) {
  if (process.env["TEST_" + id] === "1") {
    describe(id + " platform", function() {
      var af = require("../..")(id);
      describe("randu", function() {
        it("should yield uniform random int array with 2 dimensions", function(done) {
          var f = async($traceurRuntime.initGeneratorFunction(function $__0() {
            var array,
                data,
                i,
                v;
            return $traceurRuntime.createGeneratorInstance(function($ctx) {
              while (true)
                switch ($ctx.state) {
                  case 0:
                    array = af.randu(2, 4, af.types.dtype.s32);
                    $ctx.state = 6;
                    break;
                  case 6:
                    $ctx.state = 2;
                    return array.copyToHostAsync();
                  case 2:
                    data = $ctx.sent;
                    $ctx.state = 4;
                    break;
                  case 4:
                    assert(data instanceof Buffer);
                    assert(data.length == 2 * 4 * int.size);
                    for (i = 0; i < data.length / int.size; i++) {
                      v = int.get(data, i * int.size);
                      assert(v >= Number.MIN_SAFE_INTEGER && v <= Number.MAX_SAFE_INTEGER);
                      assert(Math.floor(v) === v);
                    }
                    $ctx.state = -2;
                    break;
                  default:
                    return $ctx.end();
                }
            }, $__0, this);
          }));
          f().nodeify(done);
        });
        it("should yield uniform random float array with 2 dimensions", function(done) {
          var f = async($traceurRuntime.initGeneratorFunction(function $__0() {
            var array,
                data,
                i,
                v;
            return $traceurRuntime.createGeneratorInstance(function($ctx) {
              while (true)
                switch ($ctx.state) {
                  case 0:
                    array = af.randu([2, 4], af.types.dtype.f32);
                    $ctx.state = 6;
                    break;
                  case 6:
                    $ctx.state = 2;
                    return array.copyToHostAsync();
                  case 2:
                    data = $ctx.sent;
                    $ctx.state = 4;
                    break;
                  case 4:
                    assert(data instanceof Buffer);
                    assert(data.length == 2 * 4 * float.size);
                    for (i = 0; i < data.length / float.size; i++) {
                      v = float.get(data, i * float.size);
                      assert(v === 0 || v === 1.0 || (v > 0 && v < 1.0 && v % 1));
                    }
                    $ctx.state = -2;
                    break;
                  default:
                    return $ctx.end();
                }
            }, $__0, this);
          }));
          f().nodeify(done);
        });
      });
      describe("randf", function() {
        it("should throw error when invoking normal random int array with 2 dimensions", function() {
          try {
            var array = af.randn(2, 4, af.types.dtype.s32);
            return;
          } catch (e) {
            if (/invalid dtype argument/ig.test(e.message)) {
              return;
            } else {
              throw new Error("This should throw appropriate error.");
            }
          }
          throw new Error("This should throw.");
        });
        it("should yield normal random float array with 2 dimensions", function(done) {
          var f = async($traceurRuntime.initGeneratorFunction(function $__0() {
            var array,
                data,
                i,
                v;
            return $traceurRuntime.createGeneratorInstance(function($ctx) {
              while (true)
                switch ($ctx.state) {
                  case 0:
                    array = af.randn([2, 4], af.types.dtype.f32);
                    $ctx.state = 6;
                    break;
                  case 6:
                    $ctx.state = 2;
                    return array.copyToHostAsync();
                  case 2:
                    data = $ctx.sent;
                    $ctx.state = 4;
                    break;
                  case 4:
                    assert(data instanceof Buffer);
                    assert(data.length == 2 * 4 * float.size);
                    for (i = 0; i < data.length / float.size; i++) {
                      v = float.get(data, i * float.size);
                      assert(v === 0 || (v > -4.0 && v < 4.0 && v % 1));
                    }
                    $ctx.state = -2;
                    break;
                  default:
                    return $ctx.end();
                }
            }, $__0, this);
          }));
          f().nodeify(done);
        });
      });
      describe("identity", function() {
        it("should be implemented", function() {
          console.log(("TODO: implement identity test for " + id + "\n"));
        });
      });
      describe("range", function() {
        it("should be implemented", function() {
          console.log(("TODO: implement range test for " + id + "\n"));
        });
      });
      describe("iota", function() {
        it("should be implemented", function() {
          console.log(("TODO: implement iota test for " + id + "\n"));
        });
      });
      describe("diag", function() {
        it("should be implemented", function() {
          console.log(("TODO: implement diag test for " + id + "\n"));
        });
      });
      describe("constant", function() {
        it("should be implemented", function() {
          console.log(("TODO: implement constant test for " + id + "\n"));
        });
      });
    });
  }
}
describe("Functions to create arrays", function() {
  testPlatform("CPU");
  testPlatform("OpenCL");
  testPlatform("CUDA");
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUFycmF5RnVuY3Rpb25UZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUErQkE7QUFBQSxXQUFXLENBQUM7QUFFWixBQUFJLEVBQUEsQ0FBQSxNQUFLLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxlQUFjLENBQUMsQ0FBQztBQUNyQyxBQUFJLEVBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxRQUFPLENBQUMsQ0FBQztBQUN6QixBQUFJLEVBQUEsQ0FBQSxHQUFFLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxLQUFJLENBQUMsQ0FBQztBQUN4QixBQUFJLEVBQUEsQ0FBQSxRQUFPLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxVQUFTLENBQUMsQ0FBQztBQUNsQyxBQUFJLEVBQUEsQ0FBQSxLQUFJLEVBQUksQ0FBQSxRQUFPLFVBQVUsQ0FBQztBQUM5QixBQUFJLEVBQUEsQ0FBQSxHQUFFLEVBQUksQ0FBQSxHQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3ZCLEFBQUksRUFBQSxDQUFBLEtBQUksRUFBSSxDQUFBLEdBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0IsT0FBUyxhQUFXLENBQUcsRUFBQztBQUNwQixLQUFJLE9BQU0sSUFBSSxDQUFFLE9BQU0sRUFBSSxHQUFDLENBQUMsSUFBTSxJQUFFLENBQUc7QUFDbkMsV0FBTyxBQUFDLENBQUMsRUFBQyxFQUFJLFlBQVUsQ0FBRyxVQUFVLEFBQUQ7QUFDaEMsQUFBSSxRQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsT0FBTSxDQUFDLEFBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztBQUU3QixhQUFPLEFBQUMsQ0FBQyxPQUFNLENBQUcsVUFBVSxBQUFEO0FBQ3ZCLFNBQUMsQUFBQyxDQUFDLHlEQUF3RCxDQUFHLFVBQVUsSUFBRztBQUN2RSxBQUFJLFlBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxLQUFJLEFBQUMsQ0FoRGpDLGVBQWMsc0JBQXNCLEFB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QixhQUFXLEFBQUMsQ0FBQyxRQUFPLENBQUMsQ0FBQztBQUN0QixhQUFXLEFBQUMsQ0FBQyxNQUFLLENBQUMsQ0FBQztBQUN4QixDQUFDLENBQUM7QUFBQSIsImZpbGUiOiJjcmVhdGVBcnJheUZ1bmN0aW9uVGVzdHMuanMiLCJzb3VyY2VSb290IjoidGVzdHMvZXM2Iiwic291cmNlc0NvbnRlbnQiOlsiLypcbkNvcHlyaWdodCAoYykgMjAxNC0yMDE1LCBBcnJheUZpcmVcbkNvcHlyaWdodCAoYykgMjAxNSBHw6Fib3IgTWV6xZEgYWthIHVuYm9ybmNoaWtrZW4gKGdhYm9yLm1lem9Ab3V0bG9vay5jb20pXG5BbGwgcmlnaHRzIHJlc2VydmVkLlxuXG5SZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXQgbW9kaWZpY2F0aW9uLFxuYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuXG4gKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbiAgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG5cbiAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xuICBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBhbmQvb3JcbiAgb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cblxuICogTmVpdGhlciB0aGUgbmFtZSBvZiB0aGUgQXJyYXlGaXJlIG5vciB0aGUgbmFtZXMgb2YgaXRzXG4gIGNvbnRyaWJ1dG9ycyBtYXkgYmUgdXNlZCB0byBlbmRvcnNlIG9yIHByb21vdGUgcHJvZHVjdHMgZGVyaXZlZCBmcm9tXG4gIHRoaXMgc29mdHdhcmUgd2l0aG91dCBzcGVjaWZpYyBwcmlvciB3cml0dGVuIHBlcm1pc3Npb24uXG5cblRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiIEFORFxuQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbldBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkVcbkRJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SXG5BTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcbihJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUztcbkxPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTlxuQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcbihJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTXG5TT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiovXG5cblwidXNlIHN0cmljdFwiO1xuXG5sZXQgYXNzZXJ0ID0gcmVxdWlyZShcImJldHRlci1hc3NlcnRcIik7XG5sZXQgXyA9IHJlcXVpcmUoXCJsb2Rhc2hcIik7XG5sZXQgcmVmID0gcmVxdWlyZShcInJlZlwiKTtcbmxldCBCbHVlYmlyZCA9IHJlcXVpcmUoXCJibHVlYmlyZFwiKTtcbmxldCBhc3luYyA9IEJsdWViaXJkLmNvcm91dGluZTtcbmxldCBpbnQgPSByZWYudHlwZXMuaW50O1xubGV0IGZsb2F0ID0gcmVmLnR5cGVzLmZsb2F0O1xuXG5mdW5jdGlvbiB0ZXN0UGxhdGZvcm0gKGlkKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52W1wiVEVTVF9cIiArIGlkXSA9PT0gXCIxXCIpIHtcbiAgICAgICAgZGVzY3JpYmUoaWQgKyBcIiBwbGF0Zm9ybVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgYWYgPSByZXF1aXJlKFwiLi4vLi5cIikoaWQpO1xuXG4gICAgICAgICAgICBkZXNjcmliZShcInJhbmR1XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpdChcInNob3VsZCB5aWVsZCB1bmlmb3JtIHJhbmRvbSBpbnQgYXJyYXkgd2l0aCAyIGRpbWVuc2lvbnNcIiwgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGYgPSBhc3luYyhmdW5jdGlvbiooKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXJyYXkgPSBhZi5yYW5kdSgyLCA0LCBhZi50eXBlcy5kdHlwZS5zMzIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB5aWVsZCBhcnJheS5jb3B5VG9Ib3N0QXN5bmMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydChkYXRhIGluc3RhbmNlb2YgQnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydChkYXRhLmxlbmd0aCA9PSAyICogNCAqIGludC5zaXplKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aCAvIGludC5zaXplOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2ID0gaW50LmdldChkYXRhLCBpICogaW50LnNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydCh2ID49IE51bWJlci5NSU5fU0FGRV9JTlRFR0VSICYmIHYgPD0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydChNYXRoLmZsb29yKHYpID09PSB2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGYoKS5ub2RlaWZ5KGRvbmUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGl0KFwic2hvdWxkIHlpZWxkIHVuaWZvcm0gcmFuZG9tIGZsb2F0IGFycmF5IHdpdGggMiBkaW1lbnNpb25zXCIsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmID0gYXN5bmMoZnVuY3Rpb24qKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFycmF5ID0gYWYucmFuZHUoWzIsIDRdLCBhZi50eXBlcy5kdHlwZS5mMzIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB5aWVsZCBhcnJheS5jb3B5VG9Ib3N0QXN5bmMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydChkYXRhIGluc3RhbmNlb2YgQnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydChkYXRhLmxlbmd0aCA9PSAyICogNCAqIGZsb2F0LnNpemUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoIC8gZmxvYXQuc2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdiA9IGZsb2F0LmdldChkYXRhLCBpICogZmxvYXQuc2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0KHYgPT09IDAgfHwgdiA9PT0gMS4wIHx8ICh2ID4gMCAmJiB2IDwgMS4wICYmIHYgJSAxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBmKCkubm9kZWlmeShkb25lKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkZXNjcmliZShcInJhbmRmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpdChcInNob3VsZCB0aHJvdyBlcnJvciB3aGVuIGludm9raW5nIG5vcm1hbCByYW5kb20gaW50IGFycmF5IHdpdGggMiBkaW1lbnNpb25zXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhcnJheSA9IGFmLnJhbmRuKDIsIDQsIGFmLnR5cGVzLmR0eXBlLnMzMik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2goZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC9pbnZhbGlkIGR0eXBlIGFyZ3VtZW50L2lnLnRlc3QoZS5tZXNzYWdlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgc2hvdWxkIHRocm93IGFwcHJvcHJpYXRlIGVycm9yLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIHNob3VsZCB0aHJvdy5cIik7XG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpdChcInNob3VsZCB5aWVsZCBub3JtYWwgcmFuZG9tIGZsb2F0IGFycmF5IHdpdGggMiBkaW1lbnNpb25zXCIsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmID0gYXN5bmMoZnVuY3Rpb24qKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFycmF5ID0gYWYucmFuZG4oWzIsIDRdLCBhZi50eXBlcy5kdHlwZS5mMzIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB5aWVsZCBhcnJheS5jb3B5VG9Ib3N0QXN5bmMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydChkYXRhIGluc3RhbmNlb2YgQnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydChkYXRhLmxlbmd0aCA9PSAyICogNCAqIGZsb2F0LnNpemUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoIC8gZmxvYXQuc2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdiA9IGZsb2F0LmdldChkYXRhLCBpICogZmxvYXQuc2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0KHYgPT09IDAgfHwgKHYgPiAtNC4wICYmIHYgPCA0LjAgJiYgdiAlIDEpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGYoKS5ub2RlaWZ5KGRvbmUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRlc2NyaWJlKFwiaWRlbnRpdHlcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGl0KFwic2hvdWxkIGJlIGltcGxlbWVudGVkXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVE9ETzogaW1wbGVtZW50IGlkZW50aXR5IHRlc3QgZm9yICR7aWR9XFxuYCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZGVzY3JpYmUoXCJyYW5nZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaXQoXCJzaG91bGQgYmUgaW1wbGVtZW50ZWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBUT0RPOiBpbXBsZW1lbnQgcmFuZ2UgdGVzdCBmb3IgJHtpZH1cXG5gKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkZXNjcmliZShcImlvdGFcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGl0KFwic2hvdWxkIGJlIGltcGxlbWVudGVkXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVE9ETzogaW1wbGVtZW50IGlvdGEgdGVzdCBmb3IgJHtpZH1cXG5gKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkZXNjcmliZShcImRpYWdcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGl0KFwic2hvdWxkIGJlIGltcGxlbWVudGVkXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVE9ETzogaW1wbGVtZW50IGRpYWcgdGVzdCBmb3IgJHtpZH1cXG5gKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkZXNjcmliZShcImNvbnN0YW50XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpdChcInNob3VsZCBiZSBpbXBsZW1lbnRlZFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFRPRE86IGltcGxlbWVudCBjb25zdGFudCB0ZXN0IGZvciAke2lkfVxcbmApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZGVzY3JpYmUoXCJGdW5jdGlvbnMgdG8gY3JlYXRlIGFycmF5c1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgdGVzdFBsYXRmb3JtKFwiQ1BVXCIpO1xuICAgIHRlc3RQbGF0Zm9ybShcIk9wZW5DTFwiKTtcbiAgICB0ZXN0UGxhdGZvcm0oXCJDVURBXCIpO1xufSk7Il19
