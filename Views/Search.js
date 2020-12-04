import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Button, TextInput } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';



const Search = ({ navigation }) => {
  const [start, setStart] = useState('1970-01-01');
  const [end, setEnd] = useState('2030-12-31');


  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.container}>
          <TextInput
            style={{ height: 40 }}
            placeholder="Start Date"
            onChangeText={begin => setStart(begin)}
            defaultValue={start}
          />
          <TextInput
            style={{ height: 40 }}
            placeholder="Last Date"
            onChangeText={end => setEnd(end)}
            defaultValue={end}
          />
          <Button
            title="Search"
            onPress={() => navigation.navigate('Home', { startDate: start, endDate: end })}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
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

export default Search;

