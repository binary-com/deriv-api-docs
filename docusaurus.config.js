// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const dev = process.env.NODE_ENV !== 'production';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Deriv API',
  tagline: 'Create your own apps',
  url: 'https://binary-com.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'binary-com', // Usually your GitHub org/user name.
  projectName: 'deriv-api-docs', // Usually your repo name.
  trailingSlash: false,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    function LinariaPlugin(context, options) {
      return {
        name: 'linaria-plugin',
        configureWebpack(config, isServer) {
          return {
            module: {
              rules: [
                {
                  test: /\.tsx$/,
                  exclude: /node_modules/,
                  use: [
                    { loader: 'babel-loader' },
                    {
                      loader: '@linaria/webpack-loader',
                      options: { sourceMap: dev },
                    },
                  ],
                },
              ],
            },
          };
        },
      };
    },
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false,
        theme: {
          customCss: [require.resolve('./src/css/custom.css'), './src/css/index.css'],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Deriv API',
        logo: {
          alt: 'Deriv API logo',
          src: 'img/deriv-logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Documentation',
          },
          { to: 'https://tech.deriv.com/', label: 'Blog', position: 'left' },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
