import React from 'react';
import { StyleSheet, TextInput, Text, Button, View, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CCHeader from './CCHeader';
import { Icon } from 'react-native-elements'

export default class NewExerciseScreen extends React.Component {

  constructor(props){
    super(props);
    var d = new Date();//get current date as initial date
    this.state = {mode: "time", message: "Switch to Date Mode", date: d, duration: 0, calories: 0, name: 'Example: Walking'}
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
  if(this.state.name === '' || this.state.duration === 0){
    Alert.alert(
      "Missing Fields",
      'Please address missing fields and try again'
    );
    return;
  }
  //Use Date String so it doesn't do weird time conversion
  this.props.createNewExercise(this.state.name, this.state.duration, this.state.calories, this.state.date.toString());
  var d = new Date();//get current date as initial date
  
  this.setState({mode: "time", message: "Switch to Date Mode", date: d, duration: 0, calories: 0, name: 'Example: Walking'}, () => this.props.navigation.navigate("Home"));
  this.nameInput.clear();
  this.durationInput.clear();
  this.calorieInput.clear();

}
render(){
  return (//onDateChange={setDate}
    <React.Fragment>
    <CCHeader />
    <View style = {styles.container}
    accessibilityActions={[
      { name: 'gohome', label: 'Return to Today Screen' }
    ]}
    onAccessibilityAction={(event) => {
      switch (event.nativeEvent.actionName) {
        case 'gohome':
          this.props.navigation.navigate("Home");
          break;
      }
    }}>

  <Icon reverse name='ios-bicycle' type='ionicon'     color='#C400FF'
  />
  <View style = {styles.spaceVertical}></View>

          <Text accessibleRole = "text">Activity Name</Text><TextInput style = {styles.input}
          accessibilityLabel="Activity name text entry"
          accessibilityHint="Enter name of activity"
          accessibleValue = {this.state.name}
          placeholderTextColor="#5EA9F4"
          // style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => this.setState({name: text})}
          placeholder = {this.state.name}
          ref={input => { this.nameInput = input }}
          />
          <View style = {styles.spaceVertical}></View>

          <Text accessibleRole = "text">Activity Duration (minutes)</Text><TextInput style = {styles.input}
          accessibilityLabel="Activity duration text entry"
          accessibilityHint="Enter number of minutes for activity" 
          accessibleValue = {this.state.duration}
          placeholderTextColor="#5EA9F4"
          // style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => this.setState({duration: text})}
          placeholder = {this.state.duration.toString() + " minutes"}
          ref={input => { this.durationInput = input }}
          />
          <View style = {styles.spaceVertical}></View>

          <Text accessibleRole = "text">Calories Burned</Text><TextInput
          style = {styles.input}
          placeholderTextColor="#5EA9F4"
          accessibilityLabel="Activity Calories text entry"
          accessibilityHint="Enter number of calories burned for activity" 
          accessibleValue = {this.state.calories}
          // style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => this.setState({calories: text})}
          placeholder = {this.state.calories.toString() + " minutes"}
          ref={input => { this.calorieInput = input }}
          />
          <View style = {styles.spaceVertical}></View>

          <Text accessibleRole = "text">Activity Date</Text><DateTimePicker
          style = {styles.timeinput}

          accessibilityLabel="Activity Time and Date Selection"
          accessibilityHint={"Slide up or down to change the " + this.state.mode + " of activity"}
          accessibleValue = {this.state.date}
          accessibleRole = "adjustable"
          testID="dateTimePicker"
          value={this.state.date}
          mode = {this.state.mode}
          is24Hour={true}
          display="default"
          onChange={this.onChange}
        />
        <Button color = '#C400FF' style = {{marginTop: 5}} accessibilityLabel="Toggle Mode"
          accessibilityLabel={"Press to change from " + this.state.mode + " mode"}
          accessibleRole = "button"
          onPress={() => this.togglePicker()} title={this.state.message} />
        <View style = {{flexDirection: 'row', marginTop: 10}}>
        <Button  title = "Save Activity" 
        accessibilityHint="Press to Save Activity"
        accessibleRole = "button"
        onPress = {() => this.handlePress()}></Button>  
        <View style = {styles.spaceHorizontal}></View>
        <Button title = "Go Back"         accessibleRole = "button"
        accessibilityHint="Return to Today View" onPress = {() => this.props.navigation.navigate("Today")}></Button>  
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

