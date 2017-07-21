import React, {PropTypes, PureComponent} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform
} from 'react-native';

class Header extends PureComponent {
  render() {
    let {style, left, right, children, textStyle} = this.props;
    return (
      <View style={[styles.header, style]}>
        {
          typeof children === 'string' ?
            <Text style={styles.center}>
              {
                children
              }
            </Text> :
            <View>
              {children}
            </View>
        }
        <View style={styles.left}>
          {
            typeof left === 'string' ?
              <Text style={[styles.text, textStyle]}>{left}</Text> :
              left
          }
        </View>
        <View style={styles.right}>
          {
            typeof right === 'string' ?
              <Text style={[styles.text, textStyle]}>{right}</Text> :
              right
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingLeft: 12,
    paddingRight: 12,
    height: Platform.OS === 'ios' ? 70 : 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0090ff',
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOpacity: 0.25,
    elevation: 6,
    shadowOffset: {width: 0, height: 0}
  },
  center: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    textAlign: 'center',
    fontSize: 16,
    color: '#fff'
  },
  text: {
    color: "#fff"
  },
  left: {
    position: 'absolute',
    left: 8,
    top: Platform.OS === 'ios' ? 20 : 0,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center'
  },
  right: {
    position: 'absolute',
    right: 10,
    top: Platform.OS === 'ios' ? 20 : 0,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

Header.defaultProps = {
  left: "",
  right: "",
  style: {},
  textStyle: {}
};

Header.propTypes = {
  left: PropTypes.any,
  right: PropTypes.any,
  style: PropTypes.any,
  textStyle: PropTypes.any
};

export default Header;