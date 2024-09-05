import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <Image source={require('../assets/icons/bow.png')} style={styles.iconLeft} />
      <Text style={styles.heading}>
        Beau is an app Helping MUAs connect with Makeup Lovers around the world.
      </Text>
      <Image source={require('../assets/icons/bow.png')} style={styles.iconRight} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    textTransform: 'uppercase',
    fontFamily: 'Koulen',
    fontWeight: 'bold',
    textAlign: 'center',
    width: 941,
    height: 40,
    fontSize: 32,
    lineHeight: 40,
  },
  iconLeft: {
    width: 30,
    height: 30,
  },
  iconRight: {
    width: 30,
    height: 30,
  },
});
