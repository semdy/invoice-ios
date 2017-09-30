import React, {PureComponent} from 'react';
import {
  View,
  StatusBar,
  ToastAndroid,
  DeviceEventEmitter
} from "react-native";

import {StackNavigator, NavigationActions} from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

import Login from './scene/Login';
import Home from './scene/Home';
import ScanCamera from './scene/ScanCamera';
import MyInfo from './scene/MyInfo';
import InvoiceList from './scene/InvoiceList';
import Detail from './scene/Detail';
import ImageViewer from './scene/Detail/ImageViewer';

import Orientation from 'react-native-orientation';

//屏蔽发行版的console
if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    error: () => {}
  };
}

let lastBackPressed = 0;

class RootScene extends PureComponent {
  constructor() {
    super();
  }

  componentDidMount() {
    Orientation.lockToPortrait();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor="#0090ff"
          barStyle="light-content"
        />
        <Navigator/>
      </View>
    );
  }
}

const StackOptions = ({navigation}) => {
  return {
    gesturesEnabled: true
  }
};

const Navigator = StackNavigator(
  {
    Home: {
      screen: Home
    },
    InvoiceList: {
      screen: InvoiceList,
      navigationOptions: ({navigation}) => StackOptions({navigation})
    },
    Login: {
      screen: Login
    },
    MyInfo: {
      screen: MyInfo,
      navigationOptions: ({navigation}) => StackOptions({navigation})
    },
    Detail: {
      screen: Detail,
      navigationOptions: ({navigation}) => StackOptions({navigation})
    },
    ImageViewer: {
      screen: ImageViewer,
      navigationOptions: ({navigation}) => StackOptions({navigation})
    },
    ScanCamera: {
      screen: ScanCamera,
      navigationOptions: ({navigation}) => StackOptions({navigation})
    }
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home',
    transitionConfig: () => ({
      screenInterpolator: CardStackStyleInterpolator.forHorizontal
    })
  }
);

/**
 * 处理安卓返回键
 */
const defaultStateAction = Navigator.router.getStateForAction;
Navigator.router.getStateForAction = (action, state) => {
  if(state && action.type === NavigationActions.BACK) {
    if(state.routes.length === 1) {
      if (lastBackPressed + 2000 < Date.now()) {
        ToastAndroid.show("再按一次退出应用", ToastAndroid.SHORT);
        lastBackPressed = Date.now();
        const routes = [...state.routes];
        return {
          ...state,
          ...state.routes,
          index: routes.length - 1,
        };
      }
    } else if(state.routes.length === 2){
      DeviceEventEmitter.emit('homeRefresh');
    }
  }
  return defaultStateAction(action, state);
};

export default RootScene;