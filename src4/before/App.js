import React from 'react';
import { Button, ScrollView, StyleSheet, Text, View, FlatList, SectionList } from 'react-native';
import {Constants} from 'expo'

import contacts from './contacts'
import Row from './Row'

import contacts, {compareNames} from './contacts';
import ContactList from './ContactList';


export default class App extends React.Component {
  state = {
    showContacts: false,
  }

  toggleContacts = () => {
    this.setState(prevState => ({showContacts: !prevState.showContacts}))
  }

  // Immutability is important, so sort2 is better
  sort1 = () => {
    this.setState(prevState => ({contacts: prevState.contacts.sort(compareNames)}))
  }

  sort2 = () => {
    this.setState(prevState => ({contacts: [...prevState.contacts].sort(compareNames)}))
  }

  renderItem = (obj) => <Row {...(obj.item)} />

  // we pull up the item from the obj (shortcut)
  // item: {name: String, phone: String, key: Number}

  // both not really used in this App, so we move them to ContactList, where they are
  // actually needed
  renderItem = ({item}) => <Row {...item} />
  renderSectionHeader = obj => <Text>{obj.section.title}</Text>

  render() {
    return (
      <View style={styles.container}>
        <Button title="toggle contacts" onPress={this.toggleContacts} />
        <Button title="title" onPress={this.sort2} />
        {this.state.showContacts ? (
          <ScrollView>
            {/* key gets passed automatically */}
            {contacts.map(contact => <Row {...contact} />)}
          </ScrollView>
          ): null
        }

        {/* best approact */}
        {this.state.showContacts && (
          <ScrollView>
            {/* key gets passed automatically */}
            {contacts.map(contact => <Row {...contact} />)}
          </ScrollView>
          )
        }

        {/* using flat list */}
        {this.state.showContacts && (
          <FlatList
            renderItem={this.renderItem}
            data={contacts}
          />
          )
        }

        {/* using section list */}
        {this.state.showContacts && <ContactList renderItem={this.renderItem}       
        renderSectionHeader={this.renderSectionHeader}
        contacts={this.state.contacts}
        />
        }
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
});
