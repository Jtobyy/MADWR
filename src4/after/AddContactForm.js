import React from 'react'
import {Button, StyleSheet, TextInput, View} from 'react-native'
import {Constants} from 'expo'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    minWidth: 100,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
  },
})

export default class AddContactForm extends React.Component {
  state = {
    name: '',
    phone: '',
    isFormValid: false,
  }

  handleNameChange = name => {
    // this.setState({name}, this.validateForm)
    this.setState({name})
  }

  handlePhoneChange = phone => {
    // validating phone number is a number
    if (+phone >= 0 && phone.length <= 10) {
      // this.setState({phone}, this.validateForm)
      this.setState({phone})
    }
  }

  validateForm = () => {
    if (+this.state.phone >= 0 && this.state.phone.length === 10 && this.state.name.length >= 3) {
      this.setState({isFormValid: true})
    } else {
      this.setState({isFormValid: false})
    }
  }

  handleSubmit = () => {
    // this.props.onSubmit({name: this.state.name, phone: this.state.phone })
    // this.props.onSubmit({...this.state})
    this.props.onSubmit(this.state)
  }


  // we can use component lifecycle
  componentDidUpdate(prevProps, prevState) {
    this.validateForm()
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={this.state.name}
          onChangeText={this.handleNameChange}
          placeholder="Name"
        />
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          value={this.state.phone}
          onChangeText={this.handlePhoneChange}
          placeholder="Phone"
        />
        <Button title="Submit" onPress={this.handleSubmit} disabled={!this.state.isFormValid} />
      </View>
    )
  }
}
