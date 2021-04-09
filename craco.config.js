const CracoLessPlugin = require('craco-less');

// 自定义主题
module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#e67e22' },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
