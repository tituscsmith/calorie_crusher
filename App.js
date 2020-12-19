//Author: Titus Smith
//Title: Calorie Crusher
//Course Number: CS639 Building User Interfaces
import React from 'react';
import LoginSignupTab from './components/LoginSignupTab';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from "./components/ProfileScreen";
import Home from "./components/Home";
import NewExerciseScreen from "./components/NewExerciseScreen";
import NewMealScreen from "./components/NewMealScreen";
import { createDrawerNavigator } from '@react-navigation/drawer';
import {DrawerContentScrollView,DrawerItemList,DrawerItem} from '@react-navigation/drawer';

import { LogBox } from 'react-native';
// Handle error
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Drawer = createDrawerNavigator();

const initialState = {
  isLoggedIn: false, username: "", token: "", activities: [], goalDailyCalories: 0.0,
    goalDailyProtein: 0.0, goalDailyCarbohydrates: 0.0, goalDailyFat: 0.0,
    goalDailyActivity: 0.0,activities: [],meals: [],todaysActivity: 0,
    todaysCalories: 0
};

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {isLoggedIn: false, username: "", token: "", activities: [], goalDailyCalories: 0.0,
      goalDailyProtein: 0.0,
      goalDailyCarbohydrates: 0.0,
      goalDailyFat: 0.0,
      goalDailyActivity: 0.0, 
    meals: [],
  todaysActivity:0,
todaysCalories:0}

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.updateDailyGoal = this.updateDailyGoal.bind(this);
    this.updateUserData = this.updateUserData.bind(this); 
    this.fetchTodayData = this.fetchTodayData.bind(this);
    this.createNewExercise = this.createNewExercise.bind(this);
    this.createNewMeal= this.createNewMeal.bind(this);
}

login(username, token){
  // console.log("LOGIN CALLED")
  this.setState({isLoggedIn: true, username: username, token: token}, () => this.fetchUserData(), () => console.log("done fetching user data"));
}
logout(){
  // console.log("LOGOUT CALLED")
this.setState(initialState);
}
async updateDailyGoal(type, value){

    if(type === 'calories'){
      await this.setState({goalDailyCalories: value});
    }
    if(type === 'carbs'){
      await this.setState({goalDailyCarbohydrates: value});
    }
    if(type === 'fat'){
      await this.setState({goalDailyFat: value});
    }
    if(type === 'protein'){
      await this.setState({goalDailyProtein: value});
    }
    if(type === 'activity'){
      await this.setState({goalDailyActivity: value});
    }
}
async updateUserData(){
  // console.log("updatingUserDataCalled");

          await fetch('https://mysqlcs639.cs.wisc.edu/users/' + this.state.username, { method: 'PUT', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'x-access-token': this.state.token
        },
        body: JSON.stringify({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          goalDailyCalories: this.state.goalDailyCalories,
          goalDailyProtein: this.state.goalDailyProtein,
          goalDailyCarbohydrates: this.state.goalDailyCarbohydrates,
          goalDailyFat: this.state.goalDailyFat,
          goalDailyActivity: this.state.goalDailyActivity
        })
        });
        // alert("All information saved!")
  this.fetchUserData();
}
fetchUserData(){
  // console.log("fetchUserData called: ");
  fetch('https://mysqlcs639.cs.wisc.edu/users/' + this.state.username, {method:'GET', 
  headers: {'x-access-token': this.state.token}}).then(
      res => res.json()
    ).then(data => this.setState({firstName: data.firstName, lastName: data.lastName, goalDailyCalories: data.goalDailyCalories, goalDailyProtein: data.goalDailyProtein,
      goalDailyCarbohydrates: data.goalDailyCarbohydrates,
      goalDailyFat: data.goalDailyFat,
      goalDailyActivity: data.goalDailyActivity}, () => this.fetchTodayData()));
}
fetchTodayData(){
  // console.log("fetchTodayDataCalled")
  fetch('https://mysqlcs639.cs.wisc.edu/activities/', {method:'GET', 
  headers: {'x-access-token': this.state.token}}).then(
      res => res.json()
    ).then(data => this.setState({activities:data}, () => this.calcProgress()));
    
    fetch('https://mysqlcs639.cs.wisc.edu/meals/', {method:'GET', 
    headers: {'x-access-token': this.state.token}}).then(
        res => res.json()
      ).then(data => this.setState({meals:data}, () => this.calcProgress(), () => console.log(this.state.meals)));
}
async calcProgress(){
  // console.log("calcProgressCalled");

  var arr = Object.values(this.state.activities)[0];
  var totalActivity = 0;
  var totalCalories = 0;
  var currentDate = new Date();
      for (var key in arr) {
        if (arr.hasOwnProperty(key)) {                
              var activityDate = new Date(arr[key].date);
              if(activityDate.toDateString()===currentDate.toDateString()){
                totalActivity+=arr[key].duration;
              }
        }
     }
     arr = Object.values(this.state.meals)[0];
         for (var key in arr) {
           if (arr.hasOwnProperty(key)) {                
                 var mealDate = new Date(arr[key].date);
                 if(mealDate.toDateString()===currentDate.toDateString()){
                   totalCalories+=arr[key].calories;
                 }
           }
        }  
     this.setState({todaysActivity: totalActivity, todaysCalories: totalCalories});

    }
    
async createNewExercise(name, duration, calories, date){
      await fetch('https://mysqlcs639.cs.wisc.edu/activities/', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'x-access-token': this.state.token
   },
   body: JSON.stringify({
     name: name,
     duration: duration,
     calories: calories,
     date: date,
   
   })}).catch(error => console.log(error));

   this.fetchTodayData();
}

async createNewMeal(name, date){
        await fetch('https://mysqlcs639.cs.wisc.edu/meals/' , { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'x-access-token': this.state.token
      },
      body: JSON.stringify({ 
      name: name, date: date

      })}).catch(error => console.log(error));
      this.fetchTodayData();

}

  render(){//                
    return (

      <NavigationContainer>
       
            {this.state.isLoggedIn && <Drawer.Navigator drawerContent={props => <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Log-out" onPress={() => this.logout()} />
          </DrawerContentScrollView>}>
                  <Drawer.Screen name="Home"   >{props => <Home {...props} meals = {this.state.meals} todaysCalories = {this.state.todaysCalories} fetchTodayData = {() => this.fetchTodayData()} todaysActivity = {this.state.todaysActivity}  activities = {this.state.activities} meals = {this.state.meals} updateUserData = {this.updateUserData} token = {this.state.token} updateDailyGoal = {this.updateDailyGoal} logout ={ this.logout} username = {this.state.username} token = {this.state.token} goalDailyCalories ={ this.state.goalDailyCalories} goalDailyProtein ={this.state.goalDailyProtein} goalDailyFat ={this.state.goalDailyFat} goalDailyCarbohydrates ={this.state.goalDailyCarbohydrates} goalDailyActivity ={this.state.goalDailyActivity} fetchUserData ={this.fetchUserData} firstName = {this.state.firstName} lastName = {this.state.lastName} />}</Drawer.Screen> 
                  <Drawer.Screen name="Log an Activity">{props => <NewExerciseScreen {...props} createNewExercise = {this.createNewExercise}/>}</Drawer.Screen> 
                  <Drawer.Screen name="Log a Meal">{props => <NewMealScreen {...props} createNewMeal = {this.createNewMeal}/>}</Drawer.Screen> 
                  <Drawer.Screen name="Profile">{props => <ProfileScreen {...props}  todaysCalories = {this.state.todaysCalories} 
                  todaysActivity = {this.state.todaysActivity} activities = {this.state.activities} updateUserData = {this.updateUserData} 
                  updateDailyGoal = {this.updateDailyGoal} logout ={ this.logout} username = {this.state.username} token = {this.state.token} 
                  goalDailyCalories ={ this.state.goalDailyCalories} goalDailyProtein ={this.state.goalDailyProtein} goalDailyFat ={this.state.goalDailyFat} 
                  goalDailyCarbohydrates ={this.state.goalDailyCarbohydrates} goalDailyActivity ={this.state.goalDailyActivity} 
                  fetchUserData ={this.fetchUserData} firstName = {this.state.firstName} lastName = {this.state.lastName} />}</Drawer.Screen> 


              </Drawer.Navigator>}
            {!this.state.isLoggedIn && <LoginSignupTab login = {this.login}/>}
  
      </NavigationContainer>
    );
  }
  
}
