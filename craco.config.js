const CracoEnvPlugin = require('craco-plugin-env')

module.exports = {
    webpack: {
        configure: {
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        resolve: {
                            fullySpecified: false,
                        },
                    },
                ],
            },
        },
    },
    plugins: [
        {
          plugin: CracoEnvPlugin,
          options: {
            variables: {}
          }
        }
    ]
};