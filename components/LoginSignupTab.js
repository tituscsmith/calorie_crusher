import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignupScreen from './SignupScreen';
import LoginScreen from './LoginScreen'
import { StyleSheet} from 'react-native';

const TabNavigation = createBottomTabNavigator();

export default class LoginSignupTab extends React.Component{
    // console.log(this.props.updateToken());
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
    }
    login(username, token){
        this.props.login(username, token);
    }
    render(){
        return (
            <TabNavigation.Navigator>
            <TabNavigation.Screen name="Login" component={LoginScreen} initialParams={{ login: this.login}}/>
            <TabNavigation.Screen name="Sign-up" component={SignupScreen} />
            </TabNavigation.Navigator>
        );

    }
           
}


const styles = StyleSheet.create({
    container: {
      flex: 10,
      backgroundColor: '#fff',

    },
  });