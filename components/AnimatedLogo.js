import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Image, Dimensions, Easing } from 'react-native';

const { width, height } = Dimensions.get('window');

// Static map of logo paths
const logoPaths = [
  require('../assets/logos/beau-logo-1.png'),
  require('../assets/logos/beau-logo-2.png'),
  require('../assets/logos/beau-logo-3.png'),
  require('../assets/logos/beau-logo-4.png')
];

const AnimatedLogo = () => {
  const animationValues = useRef([
    new Animated.Value(0), // Initial position for the first logo
    new Animated.Value(0), // Initial position for the second logo
    new Animated.Value(0), // Initial position for the third logo
    new Animated.Value(0)  // Initial position for the fourth logo
  ]);

  useEffect(() => {
    const animations = animationValues.current.map((value, index) =>
      Animated.timing(value, {
        toValue: width + height, // Move to the bottom-right corner
        duration: 8000, // Duration of the animation
        useNativeDriver: false, // Use native driver for performance
        delay: index * 2000, // Staggered start for the wave effect
        easing: Easing.inOut(Easing.sin) // Apply easing function for smooth wave
      })
    );

    Animated.loop(
      Animated.stagger(2000, animations) // Apply stagger effect for wave
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      {animationValues.current.map((animatedValue, index) => (
        <Animated.Image
          key={index}
          source={logoPaths[index]} // Use the static logo paths
          style={[
            styles.logo,
            {
              transform: [
                { translateX: animatedValue },
                { translateY: animatedValue.interpolate({
                    inputRange: [0, width + height],
                    outputRange: [0, height] // Adjust this value for diagonal movement
                  })
                }
              ]
            }
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%', // Adjust to ensure full coverage
    overflow: 'hidden'
  },
  logo: {
    position: 'absolute',
    width: 80, // Adjust logo size
    height: 80, // Adjust logo size
    resizeMode: 'contain'
  }
});

export default AnimatedLogo;
