const CracoLessPlugin = require("craco-less");

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        // check documentation
                        // https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
                        modifyVars: { 
                            "@primary-color": "#AD72B7" 
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
