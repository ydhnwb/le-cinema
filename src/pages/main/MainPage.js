import React,  { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProfileTab } from './tabs/ProfileTab';
import { ReviewTab } from './tabs/ReviewTab';
import { HomeTabAlt } from './tabs/HomeTabAlt';
import { useDispatch, useSelector } from 'react-redux';
import BottomTabBar from '../../components/BottomTabBar';
import * as SharedPref from './../../utils/SharedPref';
import * as actions from './../../redux/action_types';

const Tab = createBottomTabNavigator();

export default function MainPage() {
  const dispatch = useDispatch()

  const checkIsLoggedIn = async () => {
      const token = await SharedPref.getToken()
      const user = await SharedPref.getUser()
      dispatch({ type: actions.FETCH_TOKEN , payload: { token:token, user:user }})
  }

  useEffect(() => {
      checkIsLoggedIn()
  }, [])


  return (
    <Tab.Navigator lazy={true} initialRouteName="Movie"
      tabBar={props => <BottomTabBar {...props} />}

    >
      <Tab.Screen name="Movie" component={HomeTabAlt} />
      <Tab.Screen name="Review" component={ReviewTab} />
      <Tab.Screen name="Profile" component={ProfileTab} />
    </Tab.Navigator>
  )
}