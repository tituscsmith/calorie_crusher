import React from 'react';
import {Text, View } from 'react-native';

export default class ExerciseCard extends React.Component {

formatDate(date){
  // console.log("Exercise Date" + date);
  var formattedDate = new Date(date).toLocaleTimeString();
  return formattedDate;
}
render(){
  return (

    <View accessibilityLabel="Hold activity to modify" 
    style={{width: 400, alignItems: 'center', maxWidth: 300, marginBottom: 7, marginTop: 7, borderColor: '#5EA9F4', borderWidth: 2}} 
    onStartShouldSetResponder= {() =>
        this.props.navigation.navigate('Exercise', {id: this.props.id, name: this.props.name, 
          duration: this.props.duration, updateExercise: this.props.updateExercise, 
          deleteExercise: this.props.deleteExercise, date: this.props.date.toLocaleString(), calories: this.props.calories})}>
    <Text style = {{fontWeight: "500"}}>{this.props.name} - {this.formatDate(this.props.date)}</Text>
      <Text>{this.props.duration} minutes, {this.props.calories} calories </Text>
  </View>
  );
}  

}
 

// const styles = StyleSheet.create({
//   container: {
//     flex: 5,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   Button: {
//     flex: 4,
//   }
// });
