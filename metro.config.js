const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

// Obtenha a configuração padrão do Metro
const config = getDefaultConfig(__dirname);

// Adicione suporte ao react-native-svg-transformer
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

config.resolver = {
  ...config.resolver,
  assetExts: config.resolver.assetExts.filter((ext) => ext !== 'svg'), // Remova 'svg' de assetExts
  sourceExts: [...config.resolver.sourceExts, 'svg'], // Adicione 'svg' a sourceExts
};

// Exporte a configuração com suporte ao NativeWind
module.exports = withNativeWind(config, { input: './global.css' });