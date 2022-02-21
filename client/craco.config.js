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
                            "@primary-color": "#AD72B7",
                            "@layout-body-background": "#F4F4F4",
                            "@layout-header-background": "#5E3964",
                            "@menu-inline-submenu-bg": "#AD72B7"
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
