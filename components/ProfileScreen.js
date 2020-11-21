import React from 'react';
import { StyleSheet, TextInput, Text, Button, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from 'react-native-elements';
import CCHeader from './CCHeader';

export default class ProfileScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {firstName: "",
                  lastName: "",
                  goalDailyCalories: 0.0,
                  goalDailyProtein: 0.0,
                  goalDailyCarbohydrates: 0.0,
                  goalDailyFat: 0.0,
                  goalDailyActivity: 0.0}
}

async handleSave(){
  await this.props.updateUserData();
  this.props.navigation.navigate('Today')
}
render(){
  return (
    <React.Fragment>
    <CCHeader navigation = {this.props.navigation} accessibilityLabel="Profile Screen"
    accessibilityRole = "header"
    title = "My Profile" />
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

  <Text style = {{fontWeight: "700", fontSize: 40}}>About Me</Text>
  <Text style = {{fontSize: 20}}>Update Your Account Info Below</Text>
  <View style = {{height: 50}}></View>

       <Text>First Name</Text><TextInput
       placeholderTextColor="#5EA9F4"
            style={styles.input}
            onChangeText={text => this.setState({firstName: text})}
            placeholder={this.props.firstName}
            accessibilityLabel="First name text entry"
          accessibilityHint="Update your first name"
          accessibleValue = {this.props.firstName}
          />
      
      
            <Text>Last Name</Text><TextInput
            placeholderTextColor="#5EA9F4"
            style={styles.input}
            onChangeText={text => this.setState({lastName: text})}
            placeholder={this.props.lastName}
            accessibilityLabel="Last name text entry"
          accessibilityHint="Update your last name"
          accessibleValue = {this.props.lastName}
          />
      
    
        <Text>Daily Calorie Goal</Text><TextInput
        style={styles.input}
        placeholderTextColor="#5EA9F4"
        onChangeText={text => this.props.updateDailyGoal('calories', text)}
        placeholder={this.props.goalDailyCalories.toString()}
        accessibilityLabel="Daily Calorie Goal entry"
          accessibilityHint="Update daily calorie goal"
          accessibleValue = {this.props.goalDailyCalories.toString()}
        />

        <Text>Daily Protein Goal (grams)</Text><TextInput
        style={styles.input}
        placeholderTextColor="#5EA9F4"
        onChangeText={text => this.props.updateDailyGoal('protein', text)}
        placeholder={this.props.goalDailyProtein.toString()}
        accessibilityLabel="Daily Protein Goal entry"
        accessibilityHint="Update daily protein goal"
        accessibleValue = {this.props.goalDailyProtein.toString()}
        />

        <Text>Daily Fats Goal (grams)</Text><TextInput
        style={styles.input}
        placeholderTextColor="#5EA9F4"
        onChangeText={text => this.props.updateDailyGoal('fat', text)}
        placeholder={this.props.goalDailyFat.toString()}
        accessibilityLabel="Daily Fat Goal entry"
        accessibilityHint="Update daily fat goal"
        accessibleValue = {this.props.goalDailyFat.toString()}
        />

        <Text>Daily Carbs Goal (grams)</Text><TextInput
        style={styles.input}
        placeholderTextColor="#5EA9F4"
        onChangeText={text => this.props.updateDailyGoal('carbs', text)}
        placeholder={this.props.goalDailyCarbohydrates.toString()}
        accessibilityLabel="Daily Carbs Goal entry"
        accessibilityHint="Update daily carbs goal"
        accessibleValue = {this.props.goalDailyCarbohydrates.toString()}
        />

        <Text>Daily Activity Goal (minutes)</Text><TextInput
        style={styles.input}
        placeholderTextColor="#5EA9F4"
        onChangeText={text => this.props.updateDailyGoal('activity', text)}
        placeholder={this.props.goalDailyActivity.toString()}
        accessibilityLabel="Daily Activity Goal entry"
        accessibilityHint="Update daily activity minutes goal "
        accessibleValue = {this.props.goalDailyActivity.toString()}
        />

        <View style = {{flexDirection: 'row', marginTop: 10}}>
        <Button title = "Save Information" accessibilityHint="Press to Save Profile Information"
        accessibleRole = "button"
        onPress = {() => this.handleSave()}></Button>  
        <View style = {styles.spaceHorizontal}></View>
        <Button title = "Go Back" accessibilityHint="Press to return to Today Screen"
        accessibleRole = "button" onPress = {() =>   this.props.navigation.navigate('Today')}></Button>
  
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