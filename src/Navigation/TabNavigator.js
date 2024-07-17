// TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure you import the Icon component

import JobsScreen from '../Screens/JobsScreen';
import BookmarksScreen from '../Screens/BookmarksScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Jobs" 
        component={JobsScreen}   
        options={{
          title: 'Jobs',
          headerStyle: {
            backgroundColor: 'white', // Change header background color
          },
          headerTintColor:  "#000000", // Change header text color
          headerTitleStyle: {
            fontWeight: '500',
          },
          tabBarIcon: ({ color, size }) => (
            <Icon name="work-outline" size={20} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Bookmarks" 
        component={BookmarksScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="bookmark-outline" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
