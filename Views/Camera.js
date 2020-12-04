import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, PermissionsAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';
import CameraRoll from '@react-native-community/cameraroll';


const Camera = ({ navigation }) => {
  let cameraRef = useRef(null)

  const takePicture = async () => {
    if (cameraRef) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      await handleDownload(data.uri);
      navigation.navigate('Home');
    }
  };

  const handleDownload = async (imageUri) => {
    if (Platform.OS === 'android') {
      await checkAndroidPermission();
    }
    CameraRoll.save(imageUri, { type: "photo" })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
  const checkAndroidPermission = async () => {
    try {
      const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
      await PermissionsAndroid.request(permission);
      Promise.resolve();
    } catch (error) {
      Promise.reject(error);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        captureAudio={false}
        style={{ flex: 1 }}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
      <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity onPress={takePicture} style={styles.capture}>
          <Text style={{ fontSize: 14 }}> SNAP </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default Camera;

