const { addBabelInclude } = require('customize-cra');
const path = require('path');

module.exports = function override(config, env) {
    addBabelInclude([path.resolve("node_modules/react-icons")])(config);
    return config;
};
