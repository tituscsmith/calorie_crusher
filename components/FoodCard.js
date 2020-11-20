import React from 'react';
import { StyleSheet, TextInput, Text, Button, View } from 'react-native';

export default class MealCard extends React.Component {
  // const { navigation } = props.naviation;

render(){
  return (

  <View accessibilityLabel="Hold food to modify" style={{width: 400, alignItems: 'center', marginBottom: 7, marginTop: 7, borderColor: '#5EA9F4', borderWidth: 2}} onStartShouldSetResponder= {() =>
        this.props.navigation.navigate('ExistingFood', {mealid: this.props.mealid, id: this.props.foodid, 
          name: this.props.name, calories: this.props.calories, protein: this.props.protein, carbs: this.props.carbs, fat: this.props.fat, updateFood: this.props.updateFood, 
          deleteFood: this.props.deleteFood})}>
      <Text style = {{fontWeight: "500"}}>{this.props.name}</Text>
      <Text>Calories: {this.props.calories}</Text>
      <Text>{this.props.carbs} grams of carbs, {this.props.fat} grams of fat, {this.props.protein} grams of protein</Text>
  </View>
  );
}  

}

