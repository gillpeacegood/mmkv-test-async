/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import { MMKV } from "react-native-mmkv"
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  Switch,
  Text
} from 'react-native';

import {spawnThread} from "react-native-multithreading";


const App: () => Node = () => {
  const [userName, setUserName] = React.useState('Bob');
  const [useWorkingCode, setUseWorkingCode] = React.useState(true);
  React.useEffect (async () => {
    if (useWorkingCode) {
      setUserName(MMKV.getString('user.name'));
    } else {
      //Causes App Crash
      const username = await spawnThread( () => {
        'worklet';
        const result = mmkvGetString('user.name');
        return result;
      });
      setUserName(username);
    }
  });


  return (
    <SafeAreaView>
      <Text>Let me know your name?</Text>
      <TextInput style={styles.input} onChangeText={(text) => {setUserName(text); MMKV.set('user.name', text)}} value={userName}/>
      <Text>Press to crash!</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={useWorkingCode ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => setUseWorkingCode(!useWorkingCode)}
        value={useWorkingCode}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  }
});

export default App;
