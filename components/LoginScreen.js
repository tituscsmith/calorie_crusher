import React from 'react';
import { StyleSheet, TextInput, Text, Button, Image, View, Alert } from 'react-native';
import base64 from 'base-64';
import { Header } from 'react-native-elements';


export default class LoginScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {username: "Username",
                  password: "Password",
                  errors: false}
}
onAccessibilityAction = (event) => {
  const { actionName } = event.nativeEvent;

  const { step, value } = this.state;

  if (actionName === 'increment') {
    this.setState({ value: value + step })
  } else if (actionName === 'decrement') {
    this.setState({ value: value - step })
  }
};
  //Check if login and user exist in the system
  validateLogin(password, user){
    // console.log("validate login");
    // console.log(password);
    // console.log(user);

      fetch('https://mysqlcs639.cs.wisc.edu/login/', {method:'GET', 
      headers: {'Authorization': 'Basic ' + base64.encode(user+ ":" + password)}})
      .then(response => response.json())
      .then(json => this.errorCheck(json))
      .catch((error) => {
        // console.log("ERROR:")
        console.log(error)
        // alert("Username or password is incorrect")
        Alert.alert(
          "Incorrect Username or Password",
            'Fix username or password and try again.'
        );
      });
  }
  errorCheck(json){
    if(json["message"]=="No auth found!" || json["message"]=="Could not verify"){
      this.setState({errors: true});
      // console.log("error");
      // console.log(json["message"]);
      // alert("Username or password is incorrect!")
      Alert.alert(
        "Incorrect Username or Password",
        'Fix username or password and try again'
      );
    }
    else{
      this.setState({errors: false});
      var token = json["token"];
      // console.log(this.state.username);
      this.props.route.params.login(this.state.username, token);
    }
  }
          // <TextInput style = {styles.input} accessibilityLabel="Password text entry"
          // accessibilityHint="Enter your password" 
          // secureTextEntry = {true}
          // autoCapitalize = "none" autoCorrect = {false}
          //      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          //      onChangeText={text => this.setState({password:text})}
          //      placeholder = "Password"
          
          //    />-
  render() {
  return (
    <React.Fragment>
    <Header
    accessibilityActions={[
      { name: 'signup', label: 'Switch to Signup Screen' }
    ]}
    onAccessibilityAction={(event) => {
      switch (event.nativeEvent.actionName) {
        case 'signup':
          this.props.navigation.navigate("Sign-up");
          // alert("sign up");
          break;
      }
    }}
    centerComponent={{ text: 'Calorie Crusher!', style: { color: '#fff' } }}
    accessibilityLabel="Login Screen"
    accessibilityRole = "header"
   />
    <View style={styles.container} accessibilityActions={[
          { name: 'signup', label: 'Switch to Signup Screen' }
        ]}
        onAccessibilityAction={(event) => {
          switch (event.nativeEvent.actionName) {
            case 'signup':
              this.props.navigation.navigate("Sign-up");
              // alert("sign up");
              break;
          }
        }}>
        <View 
        style={{width: '90%',height: '30%'}}>
                <Image source={require('./CCTall.png')} style={{
                    flex: 1,
                    height: undefined,
                    width: undefined,
                    resizeMode: 'contain'
                  }} resizeMode={'cover'}/>
      </View>
      <View style = {{height: 60}}></View>
        <Text style = {{textAlign: 'center',  color: '#C400FF', fontWeight: "700", fontSize: 20}} accessible = {false} >Please login or signup to continue.</Text>
        <View style={styles.space} />
        <TextInput style={styles.input}
          placeholder="Username"
          accessibilityLabel="Username text entry"
          accessibilityHint="Enter your username" 
          autoCapitalize = "none" autoCorrect = {false}
          placeholderTextColor="#5EA9F4"
          onChangeText={(username) => this.setState({ username: username })}
          // value={this.state.username}
          autoCapitalize="none" />
        
          <TextInput style={styles.input}
          accessibilityLabel="Password text entry"
          accessibilityHint="Enter your password" 
          autoCapitalize = "none" autoCorrect = {false}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor="#5EA9F4"
          onChangeText={(password) => this.setState({ password: password })}
          // value={this.state.password}
          autoCapitalize="none" />

        <View style={styles.space} />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <Button color="#5EA9F4" style={styles.buttonInline} title="Login!" onPress = {() => this.validateLogin(this.state.password, this.state.username)} />
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
  },
  space: {
    width: 20,
    height: 20,
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
  }
});
