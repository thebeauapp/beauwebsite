import React from 'react';
import { Image, StyleSheet, View, Dimensions } from 'react-native';

export default function BackgroundImage({ topMargin }) {
  const { width, height } = Dimensions.get('window');
  const imageWidth = 1100; // Width of the image
  const imageHeight = 563; // Height of the image

  // Calculate margins to center the image
  const horizontalMargin = (width - imageWidth) / 2;
  const verticalMargin = (height - imageHeight) / 2;

  return (
    <View style={[styles.container, { marginHorizontal: horizontalMargin, marginVertical: verticalMargin, marginTop: topMargin }]}>
      <Image
        source={require('../assets/backgroundImage.png')}
        style={styles.backgroundImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: 1100, // Set width to 1100
    height: 563, // Set height to 563
    resizeMode: 'cover', // Ensure the image covers the container
  },
});
