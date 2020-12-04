import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import ImageView from './ImageView';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';



const styles = StyleSheet.create({
  buttons: {
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const ImageController = (props) => {


  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  const onSwipe = (gestureName) => {
    const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    if (SWIPE_LEFT == gestureName) {
      props.previous();
    } else if (SWIPE_RIGHT == gestureName) {
      props.next();
    }
  };
  return (
    <>
      <GestureRecognizer
        onSwipe={(direction) => onSwipe(direction)}
        config={config}>
        <ImageView url={props.url} />
      </GestureRecognizer>
      <Text style={{ fontSize: 14 }}>
        {props.date === null ? 'N/A' : props.date.toLocaleDateString("en-US")}
      </Text>

      <View style={styles.buttons}>
        <Button
          title="Previous"
          onPress={props.previous}
        />
        <Button
          title="Next"
          onPress={props.next}
        />
      </View>
    </>
  );
};

export default ImageController;