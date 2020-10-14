import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { IndexReducer } from './src/redux/index'
import RootApp from './src/app/RootApp';
import {SafeAreaProvider} from 'react-native-safe-area-context';


const App = () => {
  const configureStore = createStore(IndexReducer)

  return (
    <SafeAreaProvider>
      <Provider store={configureStore}>
        <NavigationContainer>
          <RootApp/>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>

  );
};

export default App;
