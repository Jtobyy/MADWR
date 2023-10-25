import { SectionList, Text } from "react-native";
import PropTypes from 'prop-types';
import Row from "./Row";

// both not really used in this App, so we move them to ContactList, where they are
  // actually needed
const renderItem = obj => <Row name={obj.item.name} phone={obj.item.phone}/>
const renderSectionHeader = obj => <Text>{obj.section.title}</Text>// both not really used in this App, so we move them to ContactList, where they are

const ContactList = props => {
  const contactsByLetter = props.contacts.reduce((obj, contact) => {
    const firstLetter = contact.name[0].toUpperCase()
    return {
      ...obj, 
      [firstLetter]: [...(obj[firstLetter] || []), contact],
    }
  }, {})

  const sections = Object.keys(contactsByLetter).sort().map(letter => ({
    title: letter,
    data: contactsByLetter[letter],
  }))

  return (
        <SectionList
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            // sections={[{
            //   title: 'A',
            //   data: props.contacts
            // }]}
            sections = {sections}
          />
          )
    }

ContactList.propTypes = {
    renderItem: PropTypes.func,
    renderSectionHeader: PropTypes.func,
    contacts: PropTypes.array
}
export default ContactList