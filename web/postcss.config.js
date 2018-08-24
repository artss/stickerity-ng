const autoprefixer = require('autoprefixer');
const nested = require('postcss-nested');
const atImport = require('postcss-import');
const customMedia = require('postcss-custom-media');
const customProperties = require('postcss-custom-properties');
const url = require('postcss-url');

const browsers = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 20',
  'Firefox >= 24',
  'Explorer >= 10',
  'iOS >= 6',
  'Opera >= 12',
  'Safari >= 6',
];

const urlOptions = {
  url: 'inline',
  filter: /\.(svg|png)$/,
  maxSize: 4,
  // from: '.',
};

module.exports = {
  plugins: [
    autoprefixer({ browsers }),
    atImport(),
    nested,
    customMedia({
      extensions: {
        '--phone': '(min-width: 544px)',
        '--tablet': '(min-width: 768px)',
        '--desktop': '(min-width: 992px)',
        '--large-desktop': '(min-width: 1200px)',

        '--res1x': '(min-resolution: 1.0dppx)',
        '--res15x': '(min-resolution: 1.5dppx)',
        '--res2x': '(min-resolution: 2.0dppx)',
        '--res3x': '(min-resolution: 3.0dppx)',
      },
    }),
    customProperties(),
    url(urlOptions),
  ],
};

