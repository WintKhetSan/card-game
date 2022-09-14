import React from 'react';
import MainScreen from './src/screens/MainScreen';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store/store';

export default function App() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Provider store={store}>
        <StatusBar hidden />
        <MainScreen />
      </Provider>      
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#202020',
    flex: 1,
  },
});
