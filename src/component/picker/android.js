import React, {PropTypes, Component } from 'react'
import {
  View,
  Text,
  Image,
  Picker,
  StyleSheet,
} from 'react-native';

export default class PickerAndroid extends Component{

  static defaultProps = {
    items: [],
    style: {}
  };

  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string
        })
    ),
    style: PropTypes.object
  };

  constructor(props){
    super(props);
    this.state = {
    };
  }

  renderPicker(items){
    let {onValueChange, selectedValue, style} = this.props;
    return (
      <Picker
        style={[styles.picker, style]}
        selectedValue={selectedValue}
        onValueChange={onValueChange}>
        {
          items.map((item, i) => {
            return (
              <Picker.Item key={i} label={item.label} value={item.value} />
            )
          })
        }
      </Picker>
    )
  }

  render(){
    return this.renderPicker(this.props.items);
  }
}

const styles = StyleSheet.create({
  picker: {
    height: 36
  },
});