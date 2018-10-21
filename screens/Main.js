import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native'
import firebase from 'react-native-firebase'

export default class Main extends React.Component {

  state = {
    currentUser: null,
    errorMessage: ''
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }

  signout = () => {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
      this.props.navigation.navigate('Login')
    }).catch(function (error) {
      // An error happened.
      // this.setState({ errorMessage: error.message })
    });
  }

  render() {
    const { currentUser } = this.state
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red' }} >
          {this.state.errorMessage}
        </Text>
        <Text>
          Hi {currentUser && currentUser.email}!
        </Text>

        <Button title="Sign out" onPress={this.signout} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})