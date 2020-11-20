import React, {useState} from 'react';
import { StyleSheet, TextInput, Text, Button, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Header } from 'react-native-elements';
import { Icon } from 'react-native-elements'

export default class ExerciseScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {mode: "time", message: "Switch to Date Mode", id: props.route.params.id, date: props.route.params.date, 
    duration: props.route.params.duration, calories: props.route.params.calories, name: props.route.params.name}
    this.onChange = this.onChange.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

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

formattedDate(){
  var formattedDate = new Date(this.state.date);
  return formattedDate;
}
handleSave(){
  if(this.state.name === '' || this.state.duration === 0){
    Alert.alert(
      "Missing Fields",
      'Please address missing fields and try again'
    );
    return;
  }
  //Use Date String so it doesn't do weird time conversion
  this.props.route.params.updateExercise(this.props.route.params.id, this.state.name, this.state.duration, this.state.calories, this.state.date.toString());
  this.props.navigation.navigate('Today');
}
// handleDelete(){
//   this.props.route.params.deleteExercise(this.props.route.params.id);
//   this.props.navigation.navigate('Today');
// }
async handleConfirmDelete(){
  console.log("handleConfirmDelete called");
  Alert.alert(
    "Confirm Exercise Deletion",
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

  this.props.route.params.deleteExercise(this.props.route.params.id);
  this.props.navigation.navigate('Today');
}
render(){
  return (//onDateChange={setDate}
    <React.Fragment>
    <Header
    centerComponent={{ text: "Edit An Activity", style: { color: '#fff' } }}
    accessibilityLabel="Exercise Activity Screen"
  accessibilityRole = "header"
  />
    <View style = {styles.container}
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
 
  <Icon reverse name='ios-bicycle' type='ionicon'     color='#C400FF'/>
  <View style = {styles.spaceVertical}></View>

          <Text>Activity Name</Text><TextInput
          style = {styles.input}
          accessibilityLabel="Activity name text entry"
          accessibilityHint="Update name of activity"
          placeholderTextColor="#5EA9F4"
          accessibleValue = {this.props.route.params.name}
          onChangeText={text => this.setState({name: text})}
          placeholder = {this.props.route.params.name}
          />
  
          <Text>Activity Duration (minutes)</Text><TextInput
          style = {styles.input}
          placeholderTextColor="#5EA9F4"
          accessibilityLabel="Activity duration text entry"
          accessibilityHint="Update number of minutes for activity"
          accessibleValue = {this.props.route.params.duration}
          onChangeText={text => this.setState({duration: text})}
          placeholder = {this.props.route.params.duration.toString()  + " minutes"}/>
          
          <Text>Calories Burned</Text><TextInput
          style = {styles.input}
          placeholderTextColor="#5EA9F4"
          accessibilityLabel="Activity calories text entry"
          accessibilityHint="Update number of calories burned for activity"
          accessibleValue = {this.props.route.params.duration}
          onChangeText={text => this.setState({calories: text})}
          placeholder = {this.props.route.params.calories.toString()  + " minutes"}
          />
          <Text>Activity Date</Text><DateTimePicker
          style = {styles.timeinput}
          accessibilityLabel="Activity Time and Date Selection"
          accessibilityHint={"Slide up or down to change the " + this.state.mode + " of activity"}
          accessibleValue = {this.formattedDate()}
          accessibleRole = "adjustable"
          testID="dateTimePicker" value={this.formattedDate()} mode = {this.state.mode}
          is24Hour={true} display="default" onChange={this.onChange}/>
          <View style = {styles.spaceVertical}></View>

          <Button color = '#C400FF' accessibilityLabel="Toggle Mode"
          accessibilityLabel={"Press to change from " + this.state.mode + " mode"}
          accessibleRole = "button" onPress={() => this.togglePicker()} title={this.state.message} />
          
          <Button title = "Delete Activity" 
          accessibilityHint="Press to Delete Activity"
          accessibleRole = "button" onPress = {this.handleConfirmDelete}></Button>

 
          <View style = {{flexDirection: 'row', marginTop: 10}}>
        
        <Button title = "Save Activity" accessibilityHint="Press to Save Activity"
        accessibleRole = "button" onPress = {() => this.handleSave()}></Button>  
        <View style = {styles.spaceHorizontal}></View>
      
        <Button title = "Go Back" accessibilityHint="Press to return to Today Screen"
        accessibleRole = "button" onPress = {() =>   this.props.navigation.navigate('Today')      }></Button>  
  
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