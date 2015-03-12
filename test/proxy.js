"use strict";

var Nemo = require('../index');
var assert = require('assert');
var path = require('path');

describe("@proxy@ ", function () {

  var nemo;
  before(function (done) {
    process.env.nemoBaseDir = path.join(process.cwd(), 'test');
    done();
  });
  after(function (done) {
    nemo.driver.quit();
    done()
  });
  it("should load problem loading page error", function (done) {
    nemo = Nemo({
      "driver": {
        "local": false,
        "browser": "phantomjs",
        "proxyDetails": {
          method: "manual",
          args: [{"http": "host:1234", "ftp": "host:1234", "https": "host:1234"}]
        }
      }
    }, function () {
      console.log(nemo.data.baseUrl);
      nemo.driver.getCapabilities().then(function (name) {
        var proxy = name.caps_.proxy;
        assert.equal(proxy.proxyType, 'manual');
        assert.equal(proxy.ftpProxy, 'host:1234');
        assert.equal(proxy.httpProxy, 'host:1234');
        assert.equal(proxy.sslProxy, 'host:1234');
        done();

      });

    });
  });
});