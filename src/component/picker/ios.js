import React, {PropTypes, Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import ModalPicker from './ModalPicker';
import Icon from '../../component/icon';

export default class PickerIOS extends Component{

  static defaultProps = {
    items: [],
    style: {}
  };

  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
          ])
        })
    ),
    style: PropTypes.object
  };

  constructor(props){
    super(props);
    this.state = {
      selectedValue: this.props.selectedValue === undefined ? this.props.items[0].value : this.props.selectedValue
    };
  }

  _getValueLabel(value){
    let item = this.props.items.find(item => item.value === value);
    return item.label;
  }

  componentWillReceiveProps(nextProps){
    if( nextProps.selectedValue !== this.props.selectedValue ){
      this.setState({
        selectedValue: nextProps.selectedValue
      });
    }
  }

  renderPicker(items){
    let options = items.map(item => item.value);
    let labels = items.map(item => item.label);

    let {selectedValue} = this.state;
    let {onValueChange, style} = this.props;

    return (
      <View style={[styles.pickerWrap, style]}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.pickerInner}
          onPress={() => {
            this.refs.picker.show();
          }}
        >
          <Text style={styles.pickerText}>
            {
              this._getValueLabel(selectedValue)
            }
          </Text>
          <Icon name="angle-down-black" size="small" iconStyle={{width: 14, height: 14, opacity: .6}} />
        </TouchableOpacity>
        <ModalPicker
          ref="picker"
          options={options}
          labels={labels}
          selectedValue={this.props.selectedValue}
          cancelText="取消"
          confirmText="确定"
          onSubmit={(value) => {
            this.setState({
              selectedValue: value,
            });
            onValueChange(value);
          }}
        />
      </View>
    )
  }

  render(){
    return this.renderPicker(this.props.items);
  }
}

const styles = StyleSheet.create({
  pickerWrap: {
    flex: 1
  },
  pickerInner: {
    flexDirection: 'row',
    height: 36,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pickerText: {
    fontSize: 14
  }
});