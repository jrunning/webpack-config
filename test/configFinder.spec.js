'use strict';

var path = require('path'),
    Config = require('../lib/config'),
    ConfigLoader = require('../lib/configLoader'),
    ConfigEnvironment = require('../lib/configEnvironment'),
    DefaultConfigFactory = require('../lib/defaultConfigFactory'),
    DefaultConfigNameResolver = require('../lib/defaultConfigNameResolver'),
    ConfigPathResolver = require('../lib/configPathResolver'),
    ConfigFinder = require('../lib/configFinder');

describe('ConfigFinder', function () {
    var configFactory = new DefaultConfigFactory(),
        configEnvironment = new ConfigEnvironment(),
        configNameResolver = new DefaultConfigNameResolver(configEnvironment),
        configPathResolver = new ConfigPathResolver(configNameResolver),
        configLoader = new ConfigLoader(configFactory, configPathResolver),
        configFinder = new ConfigFinder(configLoader, configPathResolver);

    describe('#closest()', function() {
        it('should find config', function() {
            var config = configFinder.closest('./test/fixtures/dir1/dir2/dir3/webpack.1.config.js');

            expect(config).toEqual(jasmine.any(Config));
            expect(config.toObject()).toEqual({
                filename: path.resolve('./test/fixtures/webpack.1.config.js'),
                foo: 'foo1'
            });
        });

        it('should return `null` when config does not exist', function() {
            var config = configFinder.closest('./webpack.config.js');

            expect(config).toEqual(null);
        });
    });
});
