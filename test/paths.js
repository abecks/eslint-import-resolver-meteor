var expect = require('chai').expect

var path = require('path')
var meteorResolver = require('../index.js')

describe('paths', function () {
  it('handles base path relative to CWD', function () {
    expect(meteorResolver.resolve('./another-file', './test/imports/test-file.js'))
      .to.have.property('path')
      .equal(path.resolve(__dirname, './imports/another-file.js'))
  })

  it('handles root (/) paths relative to CWD', function () {
    expect(meteorResolver.resolve('/imports/another-file', './test/imports/test-file.js'))
      .to.have.property('path')
      .equal(path.resolve(__dirname, './imports/another-file.js'))
  })

  it('should not resolve a client file in a server file', function () {
    expect(meteorResolver.resolve('/imports/client/client-test', './test/imports/server/server-test.js'))
      .to.deep.equal({found: false})
  })

  it('should not resolve a server file in a client file', function () {
    expect(meteorResolver.resolve('/imports/server/server-test', './test/imports/client/client-test.js'))
      .to.deep.equal({found: false})
  })

  it('should resolve a custom Meteor package if it is in the packages file', function () {
    expect(meteorResolver.resolve('meteor/test:package', './test/imports/client/client-test.js'))
      .to.deep.equal({
        found: true,
        path: null
      })
  })

  it('should not resolve a custom Meteor package if it is not in the packages file', function () {
    expect(meteorResolver.resolve('meteor/fake:package', './test/imports/client/client-test.js'))
      .to.deep.equal({found: false})
  })

  it('should resolve a built-in Meteor package if it is in the versions file', function () {
    expect(meteorResolver.resolve('meteor/meteor', './test/imports/client/client-test.js'))
      .to.deep.equal({
        found: true,
        path: null
      })
  })

  it('should not resolve a built-in Meteor package if it is not in the versions file', function () {
    expect(meteorResolver.resolve('meteor/email', './test/imports/client/client-test.js'))
      .to.deep.equal({found: false})
  })
})
