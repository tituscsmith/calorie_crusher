import React, {useState} from 'react';
import { StyleSheet, TextInput, Text, Button, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { render } from 'react-dom';
import CCHeader from './CCHeader';
import { Icon } from 'react-native-elements'

export default class NewFoodScreen extends React.Component {

  constructor(props){
    super(props);
    var d = new Date();//get current date as initial date
    this.state = {mealid: props.route.params.mealid, 
    carbs: 0, fat: 0, calories: 0, protein: 0, name: 'Apple'}    
  }
  
handlePress(){
  if(this.state.name === '' || this.state.duration === 0){
    alert("Please address missing fields");
    return;
  }
  //Use Date String so it doesn't do weird time conversion
  // this.props.createNewMeal(this.state.name, this.state.date.toString());
  this.props.route.params.createFood(this.state.name, this.state.calories, 
    this.state.protein, this.state.carbs, this.state.fat);
  var d = new Date();//get current date as initial date
  
  this.setState({mode: "time", message: "Switch to Date Mode", date: d, name: 'Example: Breakfast'}, () => this.props.navigation.navigate("Meal"));
  // this.props.navigation.navigate("Home");
  this.nameInput.clear();
  this.calorieInput.clear();
  this.proteinInput.clear();
  this.fatInput.clear();
  this.carbsInput.clear();

}
render(){
  return (//onDateChange={setDate}
    <React.Fragment>
    <CCHeader accessibilityLabel="Add Food Screen"
    accessibilityRole = "header" navigation = {this.props.navigation} title = "Add a Food" />
    <View style = {styles.container} accessibilityActions={[
      { name: 'goback', label: 'Return to Meal Screen' }
    ]}
    onAccessibilityAction={(event) => {
      switch (event.nativeEvent.actionName) {
        case 'goback':
          this.props.navigation.navigate('Meal', {id: this.props.route.params.mealid});
          break;
      }
    }}
   >
  
    <Icon
    reverse
    name='ios-pizza'
    type='ionicon'
    color='#C400FF'
    />
    <View style = {styles.spaceVertical}></View>

    <Text>Food Name</Text><TextInput
    style = {styles.input}
    placeholderTextColor="#5EA9F4"
    accessibilityLabel="Food name text entry"
    accessibilityHint="Enter name of food"
    accessibleValue = {this.state.name}
    onChangeText={text => this.setState({name: text})}
    placeholder = {this.state.name}
    ref={input => { this.nameInput = input }}
    />

    <Text>Calories</Text><TextInput
    style = {styles.input}
    placeholderTextColor="#5EA9F4"
    accessibilityLabel="Calories text entry"
    accessibilityHint="Enter number of calories"
    accessibleValue = {this.state.calories.toString()}
    onChangeText={text => this.setState({calories: text})}
    placeholder = {this.state.calories.toString()}
    ref={input => { this.calorieInput = input }}
    />

    <Text>Proteins (grams)</Text><TextInput
    style = {styles.input}
    placeholderTextColor="#5EA9F4"
    accessibilityLabel="Protein text entry"
    accessibilityHint="Enter amount of protein in grams"
    accessibleValue = {this.state.protein.toString()}
    onChangeText={text => this.setState({protein: text})}
    placeholder = {this.state.protein.toString()}
    ref={input => { this.proteinInput = input }}
    />

    <Text>Carbohydrates (grams)</Text><TextInput
    style = {styles.input}
    placeholderTextColor="#5EA9F4"
    placeholderTextColor="#5EA9F4"
    accessibilityLabel="Carbohydrates text entry"
    accessibilityHint="Enter amount of carbs in grams"
    accessibleValue = {this.state.carbs.toString()}
    onChangeText={text => this.setState({carbs: text})}
    placeholder = {this.state.carbs.toString()}
    ref={input => { this.carbsInput = input }}
    />

    <Text>Fat (grams)</Text><TextInput
    style = {styles.input}
    accessibilityLabel="Fat text entry"
    placeholderTextColor="#5EA9F4"
    accessibilityHint="Enter amount of fat in grams"
    accessibleValue = {this.state.fat.toString()}
    onChangeText={text => this.setState({fat: text})}
    placeholder = {this.state.fat.toString()}
    ref={input => { this.fatInput = input }}
    />
    <View style = {{flexDirection: 'row', marginTop: 10}}>

        <Button title = "Save Food" accessibilityHint="Press to Save Food item"
        accessibleRole = "button" onPress = {() => this.handlePress()}></Button>  
        <Button title = "Go Back" accessibilityHint="Press to return to Today Screen"
        accessibleRole = "button" onPress = {() => this.props.navigation.navigate('Meal', {id: this.props.route.params.mealid})}></Button>  
    </View>
  
  </View>
  </React.Fragment>
    );
}
  

 }

 const styles = StyleSheet.create({
  container: {
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