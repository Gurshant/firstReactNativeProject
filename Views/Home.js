import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import ImageView from './components/ImageView';
import Camera from './Camera';

import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';


const Home = ({ navigation }) => {
  const [count, setCount] = useState(0);

  const onSwipe = (gestureName) => {
    const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    if (SWIPE_LEFT == gestureName) {
      setCount((count == 8) ? 0 : count + 1);
    } else if (SWIPE_RIGHT == gestureName) {
      setCount((count == 0) ? 8 : count - 1);
    }
  };
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <GestureRecognizer
            onSwipe={(direction) => onSwipe(direction)}
            config={config}
          >
            <View style={styles.body}>
              <ImageView count={count} />
              <View style={styles.buttons}>
                <Button
                  title="Previous"
                  onPress={() => setCount((count == 0) ? 8 : count - 1)}
                />
                <Button
                  title="Next"
                  onPress={() => setCount((count == 8) ? 0 : count + 1)}
                />
              </View>
            </View>
          </GestureRecognizer>
          <Button
            title="Camera"
            onPress={() => navigation.navigate('Camera')}
          />

        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  buttons: {
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Home;

