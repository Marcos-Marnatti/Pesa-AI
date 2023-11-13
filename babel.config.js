module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@config': './src/config',
            '@context': './src/context',
            '@lib': './src/lib',
            '@routes': './src/routes',
            '@screens': './src/screens',
            '@services': './src/services',
            '@types': './src/@types/',
          }
        }
      ]
    ]
  };
};