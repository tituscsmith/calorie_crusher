import React, {useState} from 'react';
import { StyleSheet, TextInput, Text, Button, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { render } from 'react-dom';
import CCHeader from './CCHeader';
import { Icon } from 'react-native-elements'

export default class NewMealScreen extends React.Component {

  constructor(props){
    super(props);
    var d = new Date();//get current date as initial date
    this.state = {mode: "time", message: "Switch to Date Mode", date: d, name: 'Example: Breakfast'}
    this.onChange = this.onChange.bind(this);
  }

  showDatepicker = () => {
    showMode('date');
  };

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

  onChange(event, selectedDate) {
    this.setState({date: selectedDate},  /*() => console.log(this.state.date.toLocaleString()), () => console.log(this.state.date)*/);
   
  };

  showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
handlePress(){
  if(this.state.name === ''){
    alert("Please address missing fields");
    return;
  }
  //Use Date String so it doesn't do weird time conversion
  this.props.createNewMeal(this.state.name, this.state.date.toString());
  var d = new Date();//get current date as initial date
  
  this.setState({mode: "time", message: "Switch to Date Mode", date: d, name: 'Example: Breakfast'}, () => this.props.navigation.navigate("Home"));
  // this.props.navigation.navigate("Home");
  this.nameInput.clear();
}
render(){
  return (//onDateChange={setDate}
    <React.Fragment>
    <CCHeader accessibilityLabel="Add Meal Screen"
    accessibilityRole = "header" navigation = {this.props.navigation} title = "Add a Meal" />
    <View style = {styles.container}  accessibilityActions={[
      { name: 'gohome', label: 'Return to Today Screen' }
    ]}
    onAccessibilityAction={(event) => {
      switch (event.nativeEvent.actionName) {
        case 'gohome':
          this.props.navigation.navigate("Home");
          break;
      }
    }}>
    <Icon
    reverse
    name='ios-pizza'
    type='ionicon'
    color= '#C400FF' 
    />
    <View style = {styles.spaceVertical}></View>

          <Text>Meal Name</Text><TextInput
          style = {styles.input}
          placeholderTextColor="#5EA9F4"
          accessibilityLabel="Meal name text entry"
          accessibilityHint="Enter name of meal"
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
          value={this.state.date}
          mode = {this.state.mode}
          is24Hour={true}
          display="default"
          onChange={this.onChange}
        />
        <Button color = '#C400FF'  onPress={() => this.togglePicker()} title={this.state.message} />

        <View style = {{flexDirection: 'row', marginTop: 10}}>
        <Button title = "Save Meal" accessibilityHint="Press to Save Meal"
        accessibleRole = "button" onPress = {() => this.handlePress()}></Button>  
        <View style = {styles.spaceHorizontal}></View>
        <Button title = "Go Back" accessibilityHint="Press to return to Today Screen"
        accessibleRole = "button" onPress = {() => this.props.navigation.navigate("Home")}></Button>
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