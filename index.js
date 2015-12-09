'use strict';

var Config = require('./lib/config'),
    ConfigEnvironment = require('./lib/configEnvironment'),
    ConfigNameResolver = require('./lib/configNameResolver'),
    ConfigPathResolver = require('./lib/configPathResolver'),
    DefaultConfigFactory = require('./lib/defaultConfigFactory'),
    ConfigLoader = require('./lib/configLoader'),
    ConfigFinder = require('./lib/configFinder'),
    ConfigVisitor = require('./lib/configVisitor');

var configEnvironment = new ConfigEnvironment(),
    configFactory = DefaultConfigFactory.INSTANCE,
    configNameResolver = new ConfigNameResolver(configEnvironment),
    configPathResolver = new ConfigPathResolver(configNameResolver),
    configLoader = new ConfigLoader(configFactory, configPathResolver),
    configVisitor = new ConfigVisitor(configLoader, configPathResolver),
    configFinder = new ConfigFinder(configLoader, configPathResolver);

/**
 * @property {ConfigEnvironment}
 * @static
 */
Config.environment = configEnvironment;

/**
 * @property {ConfigNameResolver}
 * @static
 */
Config.nameResolver = configNameResolver;

/**
 * @property {ConfigFactory}
 * @static
 */
Config.factory = configFactory;

/**
 * @property {ConfigLoader}
 * @static
 */
Config.loader = configLoader;

/**
 * @property {ConfigFinder}
 * @static
 */
Config.finder = configFinder;

/**
 * @property {ConfigVisitor}
 * @static
 */
Config.visitor = configVisitor;

/**
 * @property {ConfigPathResolver}
 * @static
 */
Config.pathResolver = configPathResolver;

/**
 * @const {String} - `webpack.config.js`
 */
Config.FILENAME = 'webpack.config.js';

/**
 * @module webpack-config
 * @returns {Config}
 */
module.exports = Config;
