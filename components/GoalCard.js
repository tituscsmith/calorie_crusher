import React from 'react';
import { StyleSheet, TextInput, Text, Button, View } from 'react-native';

export default class GoalCard extends React.Component {
  constructor(props){
    super(props);
    this.state = {foods: [], totalProtein:0, totalCals: 0, totalFat: 0, totalCarbs: 0};
  }

render(){
  return (

  <View accessibilityLabel="Hold to see your goals" style={{width: 400, alignItems: 'center', maxWidth: 350, paddingTop: 10, paddingBottom: 10, marginBottom: 7, marginTop: 7, borderWidth: 2}} onStartShouldSetResponder= {() =>
        this.props.navigation.navigate('Goals', {totalCalories: this.props.totalCalories, goalCalories: this.props.goalCalories, totalActivity: this.props.totalActivity, goalActivity: this.props.goalActivity,
        totalCarbs: this.props.totalCarbs, goalCarbs: this.props.goalCarbs, totalFat: this.props.totalFat, goalFat: this.props.goalFat, totalProtein: this.props.totalProtein, goalProtein: this.props.goalProtein})}>
  
        <Text style = {{fontWeight: "300", fontSize: 30, fontStyle: 'italic', color: "#C400FF"}}>See Your Goal Progress!</Text>
  </View>
  );
}  
}

