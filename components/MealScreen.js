import React from 'react';
import { StyleSheet, TextInput, Text, Button, View, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { render } from 'react-dom';
import CCHeader from './CCHeader';
import { Icon } from 'react-native-elements'
import FoodCard from './FoodCard';

export default class MealScreen extends React.Component {

  constructor(props){
    super(props);
    var d = new Date();//get current date as initial date
    //props.route.params.date
    this.state = {foods: [], mode: "time", message: "Switch to Date Mode", 
    id: props.route.params.id, date: props.route.params.date, name: props.route.params.name,
    totalProtein: 0, totalCals: 0, totalFats: 0, totalCarbs: 0}
    this.onChange = this.onChange.bind(this);
    this.updateFood = this.updateFood.bind(this);
    this.createFood = this.createFood.bind(this);
    this.deleteFood = this.deleteFood.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    // this.supplementalFoodMessage = this.supplementalFoodMessage.bind(this);

    // this.fetchTodayData = this.fetchTodayData.bind(this);
  }

  showDatepicker = () => {
    showMode('date');
  };
  componentDidMount(){
    // console.log("Mounting: " + this.state.id);
    fetch('https://mysqlcs639.cs.wisc.edu/meals/' + this.state.id + '/foods/', {method:'GET', 
    headers: {'x-access-token': this.props.token}}).then(
        res => res.json()
      ).then(data => this.setState({foods:data},  () =>   this.calcMacroDetails()));
  }
  async fetchFoods(){
    // console.log("Fetch foods called" + this.state.id);
    await fetch('https://mysqlcs639.cs.wisc.edu/meals/' + this.state.id + '/foods/', {method:'GET', 
    headers: {'x-access-token': this.props.token}}).then(
        res => res.json()
      ).then(data => this.setState({foods:data}));
      this.calcMacroDetails();
  }
  showTimepicker = () => {
    showMode('time');
  };
  togglePicker(){
    if(this.state.mode==="date"){
      this.setState({mode: "time", message: "Switch to Date Mode"})
    }
    if(this.state.mode==="time"){
      this.setState({mode: "date", message: "Switch to Time Mode"})
    }
  }
  formattedDate(){
    var formattedDate = new Date(this.state.date);
    return formattedDate;
  }
  onChange(event, selectedDate) {
    this.setState({date: selectedDate},  /*() => console.log(this.state.date.toLocaleString()), () => console.log(this.state.date)*/);
   
  };

  showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

async handleSave(){
  if(this.state.name === ''){
    alert("Please address missing fields");
    return;
  }
  //Use Date String so it doesn't do weird time conversion
  await this.props.route.params.updateMeal(this.props.route.params.id, this.state.name, this.state.date.toString());
  this.props.navigation.navigate('Today');
}
async handleConfirmDelete(){
  console.log("handleConfirmDelete called");
  Alert.alert(
    "Confirm Meal Deletion",
    "This can not be undone.",
    [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Yes", onPress: this.handleDelete}
    ],
    { cancelable: false }
  );
  // await this.props.route.params.deleteMeal(this.props.route.params.id);
}
async handleDelete(){

  await this.props.route.params.deleteMeal(this.props.route.params.id);
  this.props.navigation.navigate('Today')
}
handleAddFood(){
  this.props.navigation.navigate('NewFood',  {mealid: this.props.route.params.id, token: this.props.token, updateFood: this.updateFood, deleteFood: this.props.deleteFood, createFood: this.createFood});
}
async createFood(name, calories, protein, carbs, fat){
  // console.log("creatFoodCalled" )

  // console.log("ID: " + this.state.id)
  await fetch('https://mysqlcs639.cs.wisc.edu/meals/' + this.state.id +'/foods/', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'x-access-token': this.props.token
},
body: JSON.stringify({
  name: name,
  calories: calories,
  protein: protein,
  carbohydrates: carbs,
  fat: fat
})}).catch(error => console.log(error));
this.fetchFoods();
this.forceUpdate();
// this.fetchFoods();
}
async updateFood(foodid, name, calories, protein, carbs, fat){

  await fetch('https://mysqlcs639.cs.wisc.edu/meals/' + this.state.id +'/foods/' + foodid, { method: 'PUT', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'x-access-token': this.props.token
},
body: JSON.stringify({
  name: name,
  calories: calories,
  protein: protein,
  carbohydrates: carbs,
  fat: fat
})}).catch(error => console.log(error));

this.fetchFoods();

}
async deleteFood(foodid){
  // console.log("deleteFood Called");
  // console.log(foodid);
  // console.log(this.props.route.params.id);
  await fetch('https://mysqlcs639.cs.wisc.edu/meals/' + this.state.id +'/foods/' + foodid, { method: 'DELETE', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'x-access-token': this.props.token}})
  .then(json => console.log(json["message"])).catch(error => console.log(error));
  
  this.fetchFoods();
}



getFoods(){
  // console.log("Get Foods Called");

  let foods = [];
  if(this.state.foods.length === 0){
    return foods;
  }
  var arr = Object.values(this.state.foods)[0];
      var counter = 1;
      for (var key in arr) {
        //Don't need to consider date
        if (arr.hasOwnProperty(key)) {     
                foods.push(<FoodCard key = {counter} navigation = {this.props.navigation} deleteFood = {(id) => this.deleteFood(id)} 
                updateFood = {(foodid, name, calories, protein, carbs, fat) => this.updateFood(foodid, name, calories, protein, carbs, fat)} 
                name = {arr[key].name} foodid = {arr[key].id} calories = {arr[key].calories} mealid = {this.props.route.params.id} protein = 
                {arr[key].protein} fat = {arr[key].fat} carbs = {arr[key].carbohydrates} /> )
              counter++;
        }
     } 
    //  this.setState({totalProtein:currentProtein, totalCals: currentCals, totalFat: currentFat, totalCarbs: currentCarbs})
    //  this.calcProgress();
  return foods;
}


calcMacroDetails(){
  // console.log("calcMacroDetails");

  var arr = Object.values(this.state.foods)[0];

  var currentFat = 0;
  var currentProtein = 0;
  var currentCals = 0;
  var currentCarbs = 0;
      for (var key in arr) {
        //Don't need to consider date
        if (arr.hasOwnProperty(key)) {     
              currentFat += arr[key].fat;
              currentProtein += arr[key].protein;
              currentCals += arr[key].calories;
              currentCarbs += arr[key].carbohydrates;
        }
     } 
   
      this.setState({totalProtein:currentProtein, totalCals: currentCals, totalFat: currentFat, totalCarbs: currentCarbs});
    //  this.calcProgress();
    //  this.forceUpdate();
    return;
}
// supplementalFoodMessage(){
//   // console.log("MEALs: " + this.state.numMeals);

//   // console.log(this.props.meals.length);
//   // console.log(this.state.meals);
//   if(this.state.foods.length===0){
//     return "Add foods to this meal!"
//   }
//   else{
//     return "(Click to Edit Foods)"
//   }
// }
render(){
  return (//onDateChange={setDate}
    <React.Fragment>
    <CCHeader navigation = {this.props.navigation} accessibilityLabel="Edit Meal Screen"
    accessibilityRole = "header" navigation = {this.props.navigation} title = "Edit a Meal" />
    <ScrollView contentContainerStyle = {styles.contentContainer} 
    accessibilityActions={[
      { name: 'gohome', label: 'Return to Today Screen' }
    ]}
    onAccessibilityAction={(event) => {
      switch (event.nativeEvent.actionName) {
        case 'gohome':
          this.props.navigation.navigate('Today');
          break;
      }
    }}>
   
    <Icon reverse name='ios-pizza' type='ionicon'     color='#C400FF'/>
    <View style = {styles.spaceVertical}></View>

          <Text>Meal Name</Text><TextInput 
          style = {styles.input}
          placeholderTextColor="#5EA9F4"
          accessibilityLabel="Meal name text entry"
          accessibilityHint="Update name of meal"
          accessibleValue = {this.state.name}
          onChangeText={text => this.setState({name: text})}
          placeholder = {this.state.name}
          ref={input => { this.nameInput = input }}
          />
          <View style = {styles.spaceVertical}></View>
          <Text>Meal Date</Text><DateTimePicker
          style = {styles.timeinput}

          accessibilityLabel="Meal Time and Date entry"
          accessibilityHint={"Slide up or down to change the " + this.state.mode + " of meal"}
          accessibleValue = {this.state.name}
          testID="dateTimePicker"
          value={this.formattedDate()}
          mode = {this.state.mode}
          is24Hour={true}
          display="default"
          onChange={this.onChange}
          />
          <Button color = '#C400FF'  accessibilityLabel="Toggle Mode"
          accessibilityHint={"Press to change from " + this.state.mode + " mode"}
          accessibleRole = "button"
          onPress={() => this.togglePicker()} title={this.state.message} />
          <View style = {styles.spaceVertical}></View>

          <Text style = {{fontWeight: "500"}} >Meal Nutritional Details:</Text>
          <Text >{this.state.totalCals} Calories</Text>
          <Text>Carbs: {this.state.totalCarbs} (g), Fat: {this.state.totalFat} (g), Protein: {this.state.totalProtein} (g)</Text>
        <View style = {styles.spaceVertical}></View>
          <View>{this.getFoods()}</View>
            
        <View style = {{flexDirection: 'row', marginTop: 10}}>
        <Button title = "Add a Food" onPress = {() => this.handleAddFood()}></Button>
        <View style = {styles.spaceHorizontal}></View>
        <Button title = "Save Meal" accessibilityHint="Press to Save Meal"
        accessibleRole = "button" onPress = {() => this.handleSave()}></Button>
        </View>
        <View style = {{flexDirection: 'row', marginTop: 10}}>
        <Button title = "Delete Meal" 
        accessibilityHint="Press to Delete Meal"
        accessibleRole = "button"
        onPress = {this.handleConfirmDelete}></Button>
        <View style = {styles.spaceHorizontal}></View>

        <Button title = "Go Back" accessibilityHint="Press to return to Today Screen"
        accessibleRole = "button" onPress = {() =>   this.props.navigation.navigate('Today')}></Button>
        </View>
       
  
  </ScrollView>
  </React.Fragment>
    );
}
 }

 const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue'
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
  },
  input: {
    width: 200,
    padding: 10,
    margin: 5,
    height: 40,
    borderColor: '#5EA9F4',
    borderWidth: 1
  },
  timeinput: {
    width: 300,
    padding: 10,
    margin: 5,
    height: 100,
    borderColor: '#5EA9F4',
    borderWidth: 1
  }
});