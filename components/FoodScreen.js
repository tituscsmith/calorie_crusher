import React from 'react';
import { StyleSheet, TextInput, Text, Button, View, Alert } from 'react-native';
import CCHeader from './CCHeader';
import { Icon } from 'react-native-elements'

export default class FoodScreen extends React.Component {

  constructor(props){
    super(props);
    var d = new Date();//get current date as initial date
    //props.route.params.date
    // console.log("MealConstructor:"  + props.route.params.date);
    this.state = {mealid: props.route.params.mealid, id: props.route.params.id, 
    carbs: props.route.params.carbs, fat: props.route.params.fat, calories: props.route.params.calories, 
    protein: props.route.params.protein, name: props.route.params.name}
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

handleSave(){
  this.props.route.params.updateFood(this.props.route.params.id, this.state.name, this.state.calories, 
    this.state.protein, this.state.carbs, this.state.fat);

  this.props.navigation.navigate('Meal', {id: this.props.route.params.mealid});
}
// handleDelete(){

//   this.props.route.params.deleteFood(this.props.route.params.id);
//   this.props.navigation.navigate('Meal', {id: this.props.route.params.id});
// }
async handleConfirmDelete(){
  console.log("handleConfirmDelete called");
  Alert.alert(
    "Confirm Food Deletion",
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

  this.props.route.params.deleteFood(this.props.route.params.id);
  this.props.navigation.navigate('Meal', {id: this.props.route.params.id});
}
render(){
  return (//onDateChange={setDate}
    <React.Fragment>
    <CCHeader navigation = {this.props.navigation} accessibilityLabel="Edit Food Screen"
    accessibilityRole = "header" navigation = {this.props.navigation} title = "Edit a Food" />
    <View style = {styles.container} accessibilityActions={[
      { name: 'goback', label: 'Return to Meal Screen' }
    ]}
    onAccessibilityAction={(event) => {
      switch (event.nativeEvent.actionName) {
        case 'goback':
          this.props.navigation.navigate('Meal', {id: this.props.route.params.mealid});
          break;
      }
    }}>
    <Icon
    reverse
    name='ios-pizza'
    type='ionicon'
   color='#C400FF'

    />
    <View style = {styles.spaceVertical}></View>

          <Text>Food Name</Text><TextInput
          placeholderTextColor="#5EA9F4"
          style = {styles.input}
          accessibilityLabel="Food name text entry"
          accessibilityHint="Update name of food"
          accessibleValue = {this.state.name}
          onChangeText={text => this.setState({name: text})}
          placeholder = {this.state.name}
          ref={input => { this.nameInput = input }}
          />

          <Text>Calories</Text><TextInput
          
          placeholderTextColor="#5EA9F4"
          style = {styles.input}
          accessibilityLabel="Calories text entry"
          accessibilityHint="Update number of calories"
          accessibleValue = {this.state.calories.toString()}
          onChangeText={text => this.setState({calories: text})}
          placeholder = {this.state.calories.toString()}
          ref={input => { this.calorieInput = input }}
          />

          <Text>Proteins (grams)</Text><TextInput
          placeholderTextColor="#5EA9F4"
          style = {styles.input}
          accessibilityLabel="Protein text entry"
          accessibilityHint="Update amount of protein in grams"
          accessibleValue = {this.state.protein.toString()}
          onChangeText={text => this.setState({protein: text})}
          placeholder = {this.state.protein.toString()}
          ref={input => { this.proteinInput = input }}
          />

          <Text>Carbohydrates (grams)</Text><TextInput
          placeholderTextColor="#5EA9F4"
          style = {styles.input}
          accessibilityLabel="Carbohydrates text entry"
          accessibilityHint="Update amount of carbs in grams"
          accessibleValue = {this.state.carbs.toString()}
          onChangeText={text => this.setState({carbs: text})}
          placeholder = {this.state.carbs.toString()}
          ref={input => { this.carbsInput = input }}
          />

          <Text>Fat (grams)</Text><TextInput
          style = {styles.input}
          placeholderTextColor="#5EA9F4"
          accessibilityLabel="Fat text entry"
          accessibilityHint="Update amount of fat in grams"
          accessibleValue = {this.state.fat.toString()}
          onChangeText={text => this.setState({fat: text})}
          placeholder = {this.state.fat.toString()}
          ref={input => { this.fatInput = input }}
          />

          <View style = {styles.spaceVertical}></View>

        <View style={{alignItems: 'center'}}><Button title = "Delete Food" 

        accessibilityHint="Press to Delete Food item"
        accessibleRole = "button"
        onPress = {this.handleConfirmDelete}></Button>
        <View style = {{flexDirection: 'row', marginTop: 10}}>

        <Button title = "Save Food" accessibilityHint="Press to Save Food item"
        accessibleRole = "button" onPress = {() => this.handleSave()}></Button>  
        <View style = {styles.spaceHorizontal}></View>
        <Button title = "Go Back" accessibilityHint="Press to return to Today Screen"
        accessibleRole = "button"  onPress = {() => this.props.navigation.navigate('Meal', {id: this.props.route.params.mealid})}></Button>  
        </View>
        </View>
  
  </View>
  </React.Fragment>
    );
}
  //  this.props.navigation.navigate('Meal', {id: this.props.route.params.mealid});


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