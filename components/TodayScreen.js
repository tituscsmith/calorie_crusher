import React from 'react';
import { StyleSheet, TextInput, Text, Button, View, ScrollView} from 'react-native';
import ExerciseCard from "./ExerciseCard";
import MealCard from "./MealCard";
import GoalCard from "./GoalCard";

// import { Header } from 'react-native-elements';
import CCHeader from './CCHeader';
import { Icon } from 'react-native-elements'

export default class TodayScreen extends React.Component {

constructor(props){
  super(props);
  this.state = {totalCalories: 0, totalCarbs: 0, totalProtein: 0, totalFat: 0, numMeals: 0, macroDetails: [], meals: []};
  this.updateExercise = this.updateExercise.bind(this);
  this.deleteExercise = this.deleteExercise.bind(this);
  this.updateMeal = this.updateMeal.bind(this);
  this.deleteMeal = this.deleteMeal.bind(this);
}

updateExercise(id, name, duration, calories, date){

  fetch('https://mysqlcs639.cs.wisc.edu/activities/' + id, { method: 'PUT', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'x-access-token': this.props.token
},
body: JSON.stringify({
  name: name,
  duration: duration,
  calories: calories,
  date: date,

})}).then(this.props.fetchTodayData()).catch(error => console.log(error));

}

async componentDidUpdate(){
  //Conditional statement to make sure infinite loops don't happen
  //Could also implement in shouldCOmponentUpdate
  if((this.props.meals===this.state.meals)){
    return;
  }
  var arr = Object.values(this.props.meals)[0];
  var currentDate = new Date();

  this.setState({meals: this.props.meals});
  var numMeals = 0;//see if there's no meals
  for (var key in arr) {

    if (arr.hasOwnProperty(key)) {     
          var mealDate = new Date(arr[key].date);

          if(mealDate.toDateString()===currentDate.toDateString()){
            numMeals++;
            this.fetchMealDetails(arr[key].id);
            
          }
    }
 }

 //EDGE Case: If there are no meals, reset counters to 0
 if(numMeals===0){
  await this.setState({totalCalories: 0, totalCarbs: 0, 
    totalFat: 0, totalProtein: 0, numMeals: 0});
 } 
 else{
   await this.setState({numMeals: numMeals})
 }
}
async fetchMealDetails(id){
  this.setState({totalCalories: 0, totalCarbs: 0, totalFat: 0, totalProtein: 0});

// console.log("fetchMealDetailsCalled");
  // console.log("Fetch foods called" + this.state.id);
  await fetch('https://mysqlcs639.cs.wisc.edu/meals/' + id + '/foods/', {method:'GET', 
  headers: {'x-access-token': this.props.token}}).then(
      res => res.json()
    // ).then(data => this.setState({foods:data}, this.calcMacroDetails()));
    ).then(data => this.updateArray(data, id).catch(error => console.log("error")));
    
    
}
async updateArray(data, id){
  // console.log("updatingArrayCalled")
  let a = this.state.macroDetails.slice(); //creates the clone of the state
var mealCalories = 0;
var mealCarbs = 0;
var mealFat = 0;
var mealProtein = 0;
var counter = 0;
//Itereate through foods/data array
    var arr = Object.values(data)[0];
        for (var key in arr) {
          
          if (arr.hasOwnProperty(key)) {     
                mealCalories += arr[key].calories;
                mealCarbs += arr[key].carbohydrates;
                mealFat += arr[key].fat;
                mealProtein += arr[key].protein;
              counter++;
          }
       } 
      
await this.setState({totalCalories: this.state.totalCalories+=mealCalories, totalCarbs: this.state.totalCarbs+=mealCarbs, 
  totalFat: this.state.totalFat+=mealFat, totalProtein: this.state.totalProtein+=mealProtein});
//Create json object of all things
var text = '{ "calories" : ' + mealCalories + ', "fat" : ' + mealFat + ', "protein" : ' + mealProtein + ', "carbs" : ' + mealCarbs + ', "numFoods" : ' + counter+ '}';

//Every meal gets their own spot in the macroDetails array
a[id] =  JSON.parse(text);

this.setState({macroDetails: a});
//Rerender screen
this.forceUpdate();
}
updateMeal(id, name, date){

  fetch('https://mysqlcs639.cs.wisc.edu/meals/' + id, { method: 'PUT', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'x-access-token': this.props.token
},
body: JSON.stringify({
  name: name,
  date: date

})}).then(this.props.fetchTodayData()).catch(error => console.log(error));

// alert("All information saved!")
}
// async deleteExercise(id){
//   await fetch('https://mysqlcs639.cs.wisc.edu/activities/' + id, { method: 'DELETE', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'x-access-token': this.props.token}})
//   .then(json => console.log(json["message"])).catch(error => console.log(error));

//   this.props.fetchTodayData();
// }
deleteExercise(id){
  fetch('https://mysqlcs639.cs.wisc.edu/activities/' + id, { method: 'DELETE', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'x-access-token': this.props.token}})
  .then(json => console.log(json["message"])).then(this.props.fetchTodayData()).catch(error => console.log(error));

  
}
deleteMeal(id){
  fetch('https://mysqlcs639.cs.wisc.edu/meals/' + id, { method: 'DELETE', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'x-access-token': this.props.token}})
  .then(json => console.log(json["message"])).then(this.props.fetchTodayData()).catch(error => console.log(error));
  // this.props.fetchTodayData();
}
// async deleteMeal(id){
//   await fetch('https://mysqlcs639.cs.wisc.edu/meals/' + id, { method: 'DELETE', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'x-access-token': this.props.token}})
//   .then(json => console.log(json["message"])).catch(error => console.log(error));
//   this.props.fetchTodayData();
// }

  getActivities(){
    // console.log("getActivitiesCalled");

    let activities = [];
    var arr = Object.values(this.props.activities)[0];
  
    // console.log(arr);
        var counter = 1;
        var currentDate = new Date();
        for (var key in arr) {
          if (arr.hasOwnProperty(key)) {     
                var activityDate = new Date(arr[key].date);
                if(activityDate.toDateString()===currentDate.toDateString()){
                  activities.push(<ExerciseCard key = {counter} navigation = {this.props.navigation} deleteExercise = {(id) => this.deleteExercise(id)} updateExercise = {(id, name, duration, calories, date) => this.updateExercise(id, name, duration, calories, date)} name = {arr[key].name} id = {arr[key].id} duration = {arr[key].duration} date = {arr[key].date} calories = {arr[key].calories}  /> )
                }
                counter++;
          }
       } 
    // console.log(activities);
      //  this.calcProgress();
    return activities;
  }
  getMeals(){
    // console.log("getMealsCalled");
    
    var meals = [];
    var arr = Object.values(this.props.meals)[0];
        var counter = 1;
        var currentDate = new Date();
        for (var key in arr) {
          if (arr.hasOwnProperty(key)) {     
          //  var macroDetails = this.fetchMealDetails(arr[key].id);
            // console.log("MacroDetails" + macroDetails);
                var mealDate = new Date(arr[key].date);
                if(mealDate.toDateString()===currentDate.toDateString()){
                  meals.push(<MealCard key = {counter} macroDetails = {this.state.macroDetails[arr[key].id]} token = {this.props.token} navigation = {this.props.navigation} deleteMeal = {(id) => this.deleteMeal(id)} updateMeal = {(id, name, date) => this.updateMeal(id, name, date)} name = {arr[key].name} id = {arr[key].id} date = {arr[key].date}/> )
                  
                }
                counter++;
          }
       } 
      //  this.calcProgress();
    return meals;
  }

  calculatePercentage(progress, goal){

    //Edge Case
    if(goal===0 || progress === 0){
      return "0";
    }
    let percentage = (progress/ goal) *100;
    let formatted = percentage.toString().substring(0,4)
    return formatted;
  }//  <ion-icon ios="bicycle-outline" md="bicycle-sharp"></ion-icon>
supplementalExerciseMessage(){
  if(this.props.todaysActivity===0){
    return "You have no activities entered today"
  }
  else{
    return "(Click to Edit)"
  }
}
supplementalMealMessage(){
  if(this.state.numMeals===0){
    return "You have no meals entered today"
  }
  else{
    return "(Click to Edit)"
  }
}
  render(){
  return (  // {this.getActivities()}
  <ScrollView>

  <CCHeader navigation = {this.props.navigation} title = {"Home"} />
  <View style={{padding: 10, alignItems: 'center', 'textAlign': 'center'}}>
  <Icon reverse name='ios-bicycle' type='ionicon' color= '#C400FF' />
  </View>
  <View style = {styles.spaceVertical}></View>

        <View  style = {{alignItems: 'center',
        justifyContent: 'center'}}><Text style = {{fontWeight: "500", fontSize: 16}}>Today's Exercise Sessions:</Text>
        <Text style = {{fontStyle: 'italic'}}>{this.supplementalExerciseMessage()}</Text>

        {this.getActivities()}</View>

        
        <View style={{padding: 10, alignItems: 'center', 'textAlign': 'center'}}>
        <GoalCard navigation = {this.props.navigation} totalCalories = {this.state.totalCalories} goalCalories = {this.props.goalDailyCalories} totalActivity = {this.props.todaysActivity} goalActivity = {this.props.goalDailyActivity}
        totalCarbs = {this.state.totalCarbs} goalCarbs = {this.props.goalDailyCarbohydrates} totalFat = {this.state.totalFat} goalFat = {this.props.goalDailyFat} totalProtein = {this.state.totalProtein} goalProtein = {this.props.goalDailyProtein}></GoalCard>
        
          <Icon reverse name='ios-pizza' type='ionicon' color= '#C400FF'/>
        </View>
        
        <View style={{padding: 10, alignItems: 'center', 'textAlign': 'center'}}>
        <View  style = {{marginTop: 20, alignItems: 'center',
        justifyContent: 'center'}}><Text style = {{fontWeight: "500", fontSize: 16}}>Today's Meals:</Text>
        <Text style = {{fontStyle: 'italic'}}>{this.supplementalMealMessage()}</Text>

        {this.getMeals()}</View>
        </View>
  </ScrollView>
  );
}
 }

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  space: {
    width: 20,
    height: 20,
  },
  spaceHorizontal: {
    // display: "flex",
    width: 50
  },
  spaceVertical: {
    height: 15
  },
  buttonInline: {
    display: "flex"
  }
});