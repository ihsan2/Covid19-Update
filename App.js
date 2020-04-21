import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import Icon from 'react-native-vector-icons/Fontisto';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

import Home from './src/Home';
import Local from './src/Local';
const color3 = '#1A222F';

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          inactiveColor="rgba(153,153,153,0.6)"
          activeColor="rgba(181,61,64,0.8)"
          labelStyle={{fontWeight: 'bold'}}
          barStyle={{backgroundColor: color3}}>
          <Tab.Screen
            options={{
              tabBarLabel: 'World',
              tabBarIcon: ({color}) => (
                <Icon name="world" color={color} size={24} />
              ),
            }}
            name="Home"
            component={Home}
          />
          <Tab.Screen
            name="Local"
            component={Local}
            options={{
              tabBarLabel: 'Provinsi',

              tabBarIcon: ({color}) => (
                <Icon name="map-marker-alt" color={color} size={24} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
