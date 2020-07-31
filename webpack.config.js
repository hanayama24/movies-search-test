const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack/common");

module.exports = (_env, { mode }) => {
    const envConfig = require(`./webpack/${mode}`);
    const mergedConfig = webpackMerge(commonConfig, envConfig);
    return mergedConfig;
};
