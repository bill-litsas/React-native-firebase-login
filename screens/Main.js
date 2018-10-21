import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native'
import firebase from 'react-native-firebase'
import Loader from '../components/Loader';

export default class Main extends React.Component {

  state = {
    currentUser: null,
    errorMessage: '',
    loading: false
  }

  componentDidMount() {

    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }

  signout = () => {
    this.setState({ loading: true })

    firebase.auth().signOut()
      .then(() => {
        // Sign-out successful.
        this.setState({ loading: false })
        this.props.navigation.navigate('Login')
      }).catch((error) => {
        // An error happened.
        this.setState({
          loading: false,
          errorMessage: error.message
        })
      });
  }

  render() {
    const { currentUser } = this.state
    return (
      <View style={styles.container}>
        <Loader
          loading={this.state.loading} />
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