import React from 'react';
import { StyleSheet, TextInput, Text, Button, View } from 'react-native';

export default class MealCard extends React.Component {
  // const { navigation } = props.naviation;
  constructor(props){
    super(props);
    this.state = {foods: [], totalProtein:0, totalCals: 0, totalFat: 0, totalCarbs: 0};
    // this.calcMacroDetails = this.calcMacroDetails.bind(this);
    this.foodDetails = this.foodDetails.bind(this);
  }
formatDate(date){
  var formattedDate = new Date(date).toLocaleTimeString();
  return formattedDate;
}

getCalories(){
  if(this.props.macroDetails!== undefined){
    return this.props.macroDetails.calories.toString();
  }
}
getProtein(){
  if(this.props.macroDetails!== undefined){
    return this.props.macroDetails.protein.toString();
  }
}
getFat(){
  if(this.props.macroDetails!== undefined){
    return this.props.macroDetails.fat.toString();
  }
}
getCarbs(){
  if(this.props.macroDetails!== undefined){
    return this.props.macroDetails.carbs.toString();
  }
}
foodDetails(){
  // console.log("foodDetails called")
  // console.log(this.props.macroDetails.numFoods)
  if(this.props.macroDetails && this.props.macroDetails.numFoods===0){
    // console.log("0 foods");
    return <Text>No foods entered yet.</Text>
  }
  else{
    // console.log("more than 0 foods");
    return <React.Fragment><Text>{this.getCalories()} calories</Text>
  <Text>{this.getCarbs()} grams of carbs, {this.getFat()} grams of fat, {this.getProtein()} grams of protein</Text></React.Fragment>
  }

}

render(){
  return (

  <View accessibilityLabel="Hold meal to modify" style={{width: 400, alignItems: 'center', marginBottom: 7, marginTop: 7, borderColor: '#5EA9F4', borderWidth: 2}} onStartShouldSetResponder= {() =>
        this.props.navigation.navigate('Meal', {id: this.props.id, name: this.props.name, updateMeal: this.props.updateMeal, 
          deleteMeal: this.props.deleteMeal, date: this.props.date.toLocaleString()})}>
      <Text style = {{fontWeight: "500"}}>{this.props.name} - {this.formatDate(this.props.date)}</Text>

      <React.Fragment>{this.foodDetails()}</React.Fragment>
  </View>
  );
}  

}
       // <Text>Calories: {this.props.macroDetails.toString}</Text>

