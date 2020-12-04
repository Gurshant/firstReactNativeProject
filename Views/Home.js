import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Button, Text } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useIsFocused } from '@react-navigation/native';
import Share from 'react-native-share';
import ImageController from './components/ImageController'


const Home = ({ navigation, route }) => {
  const [count, setCount] = useState(0);
  const [url, setUrl] = useState(null);
  const [date, setDate] = useState(null);
  const [images, setImages] = useState([]);
  const isFocused = useIsFocused();
  const [filterStart, setFilterStart] = useState(null);
  const [filterEnd, setFilterEnd] = useState(null);


  useEffect(() => {
    if (route.params !== undefined) {
      console.log("focus")

      const { startDate, endDate } = route.params;
      begin = new Date(startDate)
      end = new Date(endDate)
      setFilterStart(begin);
      setFilterEnd(end);
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

  useEffect(() => {
    getPhotos();
  }, [filterEnd]);
  useEffect(() => {
    console.log(images);
  }, [images]);


  const getPhotos = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'All'
    }).then(r => {
      // console.log("focus")

      if (filterStart !== null && filterEnd !== null) {
        console.log("filt")
        let imgs = [];
        r.edges.forEach((item) => {
          let imgDate = new Date(1970, 0, 1);
          imgDate.setSeconds(item.node.timestamp)
          if (filterStart < imgDate && imgDate < filterEnd) {
            imgs.push(item);
          }
          // console.log(imgs);
          setImages(imgs);
          setCount(0);
          setUrl(imgs[0].node.image.uri);
          let time = new Date(1970, 0, 1);
          time.setSeconds(imgs[0].node.timestamp)
          setDate(time);
        })
      } else {
        console.log("non-filt")

        setImages(r.edges)
        setUrl(r.edges[count].node.image.uri);
        let time = new Date(1970, 0, 1);
        time.setSeconds(r.edges[count].node.timestamp)
        setDate(time);
      }
    });
  }



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

            <ImageController
              previous={previous}
              next={next}
              url={url}
              date={date}
            />

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

