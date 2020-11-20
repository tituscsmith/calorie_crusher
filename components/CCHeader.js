import React from 'react';
import { Header } from 'react-native-elements';
import { Icon } from 'react-native-elements'

// const navigation = this.props.navigation; // <-- add this line

export default function CCHeader(props){

  return (

     <Header
    leftComponent={{ icon: 'menu', color: '#fff', onPress: () => props.navigation.openDrawer()}}
    centerComponent={{ text: props.title, style: { color: '#fff' } }}
  />
  );

}

