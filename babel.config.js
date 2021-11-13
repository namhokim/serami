module.exports = function(api) {
    api.cache(true);

    const presets = [
      [
        "@babel/preset-env",
        {
          targets: {
            "chrome": "73"
          },
          useBuiltIns: "usage",
          corejs: 3,
          debug: false,
          shippedProposals: true
        }
      ],
      "@babel/preset-react"
    ];

    const plugins = [
        "@babel/plugin-transform-runtime",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-class-properties",
    ];

    const env = {
        production: {
          only: ["src"],
          plugins: [
            [
              "transform-react-remove-prop-types",
              { removeImport: true } // import PropTypes from 'prop-types' 제거
            ],
            "@babel/plugin-transform-react-inline-elements",
            "@babel/plugin-transform-react-constant-elements"
          ]
        }
      }
  
    return {
      presets,
      plugins,
      env
    };
  };