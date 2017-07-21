import {
  Platform
} from 'react-native';

import PickerIOS from './ios';
import PickerAndroid from './android';

export default (Platform.OS === 'ios' ? PickerIOS : PickerAndroid);