import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Button, Text } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ImageView from './components/ImageView';
import { useIsFocused } from '@react-navigation/native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Share from 'react-native-share';


const Home = ({ navigation, route }) => {
  const [count, setCount] = useState(0);
  const [url, setUrl] = useState(null);
  const [date, setDate] = useState(null);

  const [images, setImages] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    console.log(route);
    // const { itemId, otherParam } = route.params;
    if (typeof startDate !== 'undefined') {
      console.log(startDate);
    }
    if (typeof endDate !== 'undefined') {
      console.log(endDate);
    }
    getPhotos();
  }, [isFocused]);

  useEffect(() => {
    if (images.length != 0) {
      setUrl(images[count].node.image.uri);
      let time = new Date(1970, 0, 1);
      time.setSeconds(images[count].node.timestamp)
      setDate(time);
    }
  }, [count]);

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  const getPhotos = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'All'
    }).then(r => {
      setImages(r.edges)
      setUrl(r.edges[count].node.image.uri);
      let time = new Date(1970, 0, 1);
      time.setSeconds(r.edges[count].node.timestamp)
      setDate(time);
    });
  }

  const onSwipe = (gestureName) => {
    const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    if (SWIPE_LEFT == gestureName) {
      previous();
    } else if (SWIPE_RIGHT == gestureName) {
      next();
    }
  };


  const shareImage = async () => {
    try {
      await Share.open({ url: url });
    } catch (error) {
      console.log('error', error);
    }
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
          <View style={styles.body}>

            <GestureRecognizer
              onSwipe={(direction) => onSwipe(direction)}
              config={config}>
              <ImageView url={url} />
            </GestureRecognizer>
            <Text style={{ fontSize: 14 }}> {date === null ? 'N/A' : date.toString()} </Text>

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

            <Button
              title="Search"
              onPress={() => navigation.navigate('Search')}
            />
            <Button
              title="Camera"
              onPress={() => navigation.navigate('Camera')}
            />
            <Button
              title="Share"
              onPress={shareImage}
            />
          </View>

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

