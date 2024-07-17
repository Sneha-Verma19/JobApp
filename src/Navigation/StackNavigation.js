// StackNavigation.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';  // Import the TabNavigator
import JobsScreen from '../Screens/JobsScreen';
import JobDetailsScreen from '../Screens/JobDetailsScreen';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeTabs" component={TabNavigator}     options={{ headerShown: false }}/>
      <Stack.Screen name="Jobs" component={JobsScreen} options={{ title: 'Jobs' }} />
      <Stack.Screen name="JobDetails" component={JobDetailsScreen} options={{ title: 'Job Details' }} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
