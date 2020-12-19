import React from 'react';
import TodayScreen from './TodayScreen';
import ExerciseScreen from './ExerciseScreen';
import FoodScreen from './FoodScreen';
import MealScreen from './MealScreen';
import NewFoodScreen from './NewFoodScreen';
import GoalScreen from './GoalScreen';

import { createStackNavigator } from '@react-navigation/stack';
import {
  StackItemList,
  StackContentScrollView
} from '@react-navigation/stack';
const Stack = createStackNavigator();

export default class Home extends React.Component{//<Tab.Screen name="Today" component={TodayScreen} />
constructor(props){
    super(props);
}
//drawerContent={props => <DrawerContentScrollView {...props}
  render(){
  return (//Can't seem to pass access props from inner screen
  <Stack.Navigator screenOptions={{
    headerShown: false}} stackContent={props => <StackContentScrollView {...props}>
    <StackItemList {...props} />
    </StackContentScrollView>}>

          <Stack.Screen name="Today">{props => <TodayScreen {...props} meals = {this.props.meals} fetchTodayData = {() => this.props.fetchTodayData} 
          todaysActivity = {this.props.todaysActivity} todaysCalories = {this.props.todaysCalories} activities = {this.props.activities} 
          updateUserData = {this.props.updateUserData} updateDailyGoal = {this.props.updateDailyGoal} 
          logout ={ this.props.logout} username = {this.props.username} token = {this.props.token} 
          goalDailyCalories ={ this.props.goalDailyCalories} goalDailyProtein ={this.props.goalDailyProtein} 
          goalDailyFat ={this.props.goalDailyFat} goalDailyCarbohydrates ={this.props.goalDailyCarbohydrates} 
          goalDailyActivity ={this.props.goalDailyActivity} fetchUserData ={this.props.fetchUserData} 
          firstName = {this.props.firstName} lastName = {this.props.lastName} />}</Stack.Screen> 

        <Stack.Screen name="Exercise">{props => <ExerciseScreen {...props}/>}</Stack.Screen> 
        <Stack.Screen name="Meal">{props => <MealScreen {...props} token = {this.props.token}/>}</Stack.Screen> 
        <Stack.Screen name="ExistingFood">{props => <FoodScreen {...props}/>}</Stack.Screen> 
        <Stack.Screen name="NewFood">{props => <NewFoodScreen {...props}/>}</Stack.Screen> 
        <Stack.Screen name="Goals">{props => <GoalScreen {...props}/>}</Stack.Screen> 

        </Stack.Navigator>
  );
}

  // return (//Can't seem to pass forward props?
  //   <Stack.Navigator screenProps = {{todaysActivity: props.todaysActivity, todaysCalories: props.todaysCalories, activities: props.activities, updateUserData: props.updateUserData, updateDailyGoal: props.updateDailyGoal, logout: props.logout}}>
  //    <Stack.Screen name="Today">{props => <TodayScreen {...props} todaysActivity = {props.todaysActivity} />}</Stack.Screen> 
  //   <Stack.Screen name="Exercise">{props => <ExerciseScreen {...props} Stack = {Stack} />}</Stack.Screen> 
  //   </Stack.Navigator>
  // );
  // return(
  //   <StackNavigator screenProps = {{todaysActivity: props.todaysActivity, todaysCalories: props.todaysCalories, activities: props.activities, updateUserData: props.updateUserData, updateDailyGoal: props.updateDailyGoal, logout: props.logout}} />

  //   );
}
