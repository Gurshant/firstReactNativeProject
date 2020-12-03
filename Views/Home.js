import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Button } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ImageView from './components/ImageView';
import { useIsFocused } from '@react-navigation/native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

const Home = ({ navigation }) => {
  const [count, setCount] = useState(0);
  const [url, setUrl] = useState(null);
  const [images, setImages] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getPhotos();

    console.log("getphotos")
    // updateSomeFunction()
  }, [isFocused]);
  // useEffect(() => {
  // }, []);
  useEffect(() => {
    if (images.length != 0) {
      setUrl(images[count].node.image.uri);
    }
  }, [count]);

  const getPhotos = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'All'
    }).then(r => {
      setImages(r.edges)
      setUrl(r.edges[count].node.image.uri);
    });
  }
  const onSwipe = (gestureName) => {
    const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    if (SWIPE_LEFT == gestureName) {
      next();
    } else if (SWIPE_RIGHT == gestureName) {
      previous();
    }
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  const previous = () => {
    setCount((count === 0) ? images.length - 1 : count - 1);
  }
  const next = () => {
    setCount((count == images.length - 1) ? 0 : count + 1);
  }

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
              <ImageView url={url} />
              <View style={styles.buttons}>
                <Button
                  title="Previous"
                  onPress={previous}
                />
                <Button
                  title="Next"
                  onPress={next}
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

