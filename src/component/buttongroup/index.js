import React, {PropTypes, PureComponent} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';

class ButtonGroup extends PureComponent {
  constructor(props){
    super(props);
  }
  render() {
    let {activeIndex, items, size, wrapStyle, buttonStyle, textStyle, autoWidth, vertical, onPress} = this.props;
    return (
        <View
          style={[styles.buttonWrap, vertical||{flexDirection: 'row',}, wrapStyle]}
        >
          {
            items.map((item, i) => {
              return (
                <TouchableWithoutFeedback
                  key={i}
                  style={[vertical ? {width: '100%'} : {flex: 1}]}
                  onPress={onPress.bind(this, i, item)}
                >
                  <View
                    style={[
                      styles.button,
                      styles[size],
                      (autoWidth && !vertical) && {flex: 1},
                      activeIndex === i && styles.selected,
                      i !== 0 && (vertical ? styles.nextButtonsV : styles.nextButtonsH),
                      i === 0 && (vertical ? styles.firstButtonV : styles.firstButtonH),
                      (i === items.length - 1) && (vertical ? styles.lastButtonV : styles.lastButtonH),
                      buttonStyle
                    ]}
                  >
                    <Text style={[styles.text, activeIndex === i && styles.textSelected, textStyle]}>
                      {
                        item.text
                      }
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              )
            })
          }
        </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonWrap: {
    justifyContent: 'center'
  },
  button: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: '#38adff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  normal: {
    height: 38
  },
  large: {
    height: 42
  },
  small: {
    height: 26
  },
  nextButtonsH: {
    marginLeft: -2
  },
  nextButtonsV: {
    marginTop: -2
  },
  firstButtonH: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderTopRightRadius: 1.5,
    borderBottomRightRadius: 1.5
  },
  lastButtonH: {
    borderTopLeftRadius: 1.5,
    borderBottomLeftRadius: 1.5,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4
  },
  firstButtonV: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  lastButtonV: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4
  },
  disabled: {
    backgroundColor: '#ccc'
  },
  selected: {
    backgroundColor: '#38adff'
  },
  text: {
    color: '#38adff',
    fontSize: 14
  },
  textSelected: {
    color: "#fff"
  }
});

ButtonGroup.defaultProps = {
  activeIndex: 0,
  items: [],
  size: 'normal',
  wrapStyle: {},
  buttonStyle: {},
  textStyle: {},
  vertical: false,
  autoWidth: false,
  onPress: function () {}
};

ButtonGroup.propTypes = {
  activeIndex: PropTypes.number,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      handler: PropTypes.func
    })
  ),
  size: PropTypes.string,
  wrapStyle: PropTypes.object,
  buttonStyle: PropTypes.object,
  textStyle: PropTypes.object,
  vertical: PropTypes.bool,
  autoWidth: PropTypes.bool,
  onPress: PropTypes.func
};

export default ButtonGroup;