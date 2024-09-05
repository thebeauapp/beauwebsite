import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function Loading() {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
