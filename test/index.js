// https://github.com/ttaubert/node-arraybuffer-slice
// (c) 2014 Tim Taubert <tim@timtaubert.de>
// arraybuffer-slice may be freely distributed under the MIT license.

"use strict";

var test = require("tape");
var ArrayBufferSlice = require("../");

function create(bytes) {
  var buffer = new ArrayBuffer(bytes.length);
  var array = new Uint8Array(buffer);

  for (var i = 0; i < bytes.length; i++) {
    array[i] = bytes[i];
  }

  return buffer;
}

function deepEqual(t, xs, ys, msg) {
  function conv(data) {
    if (Array.isArray(data)) {
      return data;
    }

    var vals = [];
    var array = new Uint8Array(data);

    for (var i = 0; i < array.length; i++) {
      vals.push(array[i]);
    }

    return vals;
  }

  t.deepEqual(conv(xs), conv(ys), msg);
}

test("slice", function (t) {
  var buf = create([0,1,2,3,4,5,6,7,8,9]);
  t.equal(buf.byteLength, 10);
  t.equal(buf.slice(5).byteLength, 5);

  t.equal(buf.slice(-2).byteLength, 2);
  t.equal(buf.slice(-4, -2).byteLength, 2);
  t.equal(buf.slice(-1000, 5).byteLength, 5);

  deepEqual(t, buf.slice(5), [5,6,7,8,9]);
  deepEqual(t, buf.slice(0, 5), [0,1,2,3,4]);
  deepEqual(t, buf.slice(5, 7), [5,6]);
  deepEqual(t, buf.slice(-4, -2), [6,7]);
  deepEqual(t, buf.slice(2, -2), [2,3,4,5,6,7]);

  t.end();
});
