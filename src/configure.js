var merge = require('merge');

module.exports = function(defaults, config) {

    // If no configuration values were provided, return and use the default values
    if(!config) return;

    merge.recursive(defaults, config);
}
