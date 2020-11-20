import React from 'react';
import { StyleSheet, TextInput, Text, Button, View, Alert, Image } from 'react-native';
import { Header } from 'react-native-elements';

export default class SignupScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {username: "Username",
                  password: "Password",
                  errors: false}
}

      //Check if login and user exist in the system
  validateLogin(password, user){

      fetch('https://mysqlcs639.cs.wisc.edu/users/', { method: 'POST', headers: { 'Accept': 'application/json', 'Connection': 'Keep-Alive', 'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: user, password: password})
      })
            .then(response => response.json())
            .then(json => this.errorCheck(json))
            .catch((error) => {
              console.log(error)
            });
  }

  errorCheck(json){
    if(json["message"]=="Field password must be 5 characters or longer." || json["message"]=="Username already taken!"){
        this.setState({errors: true});
        // alert(json["message"]);
        Alert.alert(
          json["message"],
          'Fix username or password and try again.'
        );
    }
    else{
      this.setState({errors: false});
      Alert.alert(
        "Account created!",
        'Going to Login Screen'
      );
      this.props.navigation.navigate('Login')
    }
  }

  render() {
  return (
    <React.Fragment>
    <Header
    centerComponent={{ text: 'Calorie Crusher!', style: { color: '#fff' } }}
    accessibilityRole = "header"
    accessibilityLabel="Signup Screen"
    />
        <View style = {styles.container}
        accessibilityActions={[
          { name: 'login', label: 'Switch to Login Screen' }
        ]}
        onAccessibilityAction={(event) => {
          switch (event.nativeEvent.actionName) {
            case 'login':
              this.props.navigation.navigate("Login");
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
        <Text style = {{textAlign: 'center', color: '#C400FF', fontWeight: "700", fontSize: 20}} accessible = {false} >Sign-up for an account!</Text>
        <View style={styles.space} />
        <TextInput style = {styles.input}
        autoCapitalize = "none" autoCorrect = {false}
        accessibilityLabel="Username text entry"
            accessibilityHint="Enter your username" 
        onChangeText={text => this.setState({username:text})}
        placeholder = {"Username"}
        placeholderTextColor="#5EA9F4"

      />
      <TextInput  style = {styles.input} autoCapitalize = "none" autoCorrect = {false}
      accessibilityLabel="Password text entry"
            accessibilityHint="Enter your password" 
            onChangeText={text => this.setState({password:text})}
                  placeholder = {"Password"}
                  placeholderTextColor="#5EA9F4"


          />
          <View style={styles.space} />

            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <Button color="#5EA9F4" style = {styles.buttonInline} title = "Sign-up!" accessibilityLabel="Signup for an Account" 
                onPress = {() => this.validateLogin(this.state.password, this.state.username)}></Button>
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
  // spaceHorizontal: {
  //   display: "flex",
  //   width: 20
  // },
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