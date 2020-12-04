import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tinyLogo: {
    width: 250,
    height: 250,
  },
});

const ImageView = (props) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={{ uri: props.url }} />

    </View>
  );
};

export default ImageView;