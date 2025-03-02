module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ["./src/assets/fonts/"], // Keep your fonts asset path
  reactNativePath: './node_modules/react-native',
  hermes: true,
  dependencies: {
    'react-native-document-picker': {
      platforms: {
        ios: null,  // If you're using CocoaPods
        android: null, // If you're using the standard Android integration
      },
    },
  },
};
