import React from 'react';
import { StyleSheet, Text, Button, View, ScrollView} from 'react-native';
import { Header } from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar'

export default class GoalScreen extends React.Component {

constructor(props){
  super(props);
  this.state = {percentage: []}
}

async componentDidMount(){
  var newPercentage = this.state.percentage.slice();
  newPercentage[0] = this.props.route.params.totalActivity/this.props.route.params.goalActivity;
  newPercentage[1] = this.props.route.params.totalCalories/this.props.route.params.goalCalories;
  newPercentage[2] = this.props.route.params.totalProtein/this.props.route.params.goalProtein;
  newPercentage[3] = this.props.route.params.totalFat/this.props.route.params.goalFat;
  newPercentage[4] = this.props.route.params.totalCarbs/this.props.route.params.goalCarbs;
  await this.setState({percentage: newPercentage})

}

  render(){
  return (  // {this.getActivities()}
  <ScrollView>
  <Header
  centerComponent={{ text: "Goals", style: { color: '#fff' } }}
  accessibilityLabel="Goal Screen"
accessibilityRole = "header"
/> 
 <View style={{padding: 10, alignItems: 'center', 'textAlign': 'center'}}>
 <Text style = {{fontWeight: "500", fontSize: 40}}>Today</Text>

 <Text style = {{fontWeight: "500", fontSize: 26, color: '#C400FF'}}>Food</Text>
 <View style = {styles.spaceVerticalSmall}></View>
 
      <Text>{this.props.route.params.totalCarbs} grams of carbohydrates</Text>
      <ProgressBar progress={this.state.percentage[4]} width={200} />
      <View style = {styles.spaceVerticalSmall}></View>

      <Text>{this.props.route.params.totalProtein} grams of protein</Text>
      <ProgressBar progress={this.state.percentage[2]} width={200} />
      <View style = {styles.spaceVerticalSmall}></View>

      <Text>{this.props.route.params.totalFat} grams of fat</Text>
      <ProgressBar progress={this.state.percentage[3]} width={200} />
      <View style = {styles.spaceVerticalSmall}></View>

      <Text>{this.props.route.params.totalCalories} calories</Text>
      <ProgressBar progress={this.state.percentage[1]} width={200} />
      <View style = {styles.spaceVerticalLarge}></View>

 <Text style = {{fontWeight: "500", fontSize: 26, color: '#C400FF'}}>Exercise</Text>
 <View style = {styles.spaceVerticalSmall}></View>

      <Text>{this.props.route.params.totalActivity} minutes</Text>
      <ProgressBar progress={this.state.percentage[0]} width={200} />

      <View style = {styles.spaceVerticalLarge}></View>

        <Button title = "Go Back" accessibilityHint="Press to return to Today Screen"
        accessibleRole = "button" onPress = {() =>   this.props.navigation.navigate('Today')}></Button>
        </View>
  </ScrollView>
  );
}
 }

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spaceVerticalLarge: {
    height: 30
  },
  spaceVerticalSmall: {
    height: 15
  },
});