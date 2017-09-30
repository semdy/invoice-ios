import { NavigationActions } from 'react-navigation';

const navigateAction = (routeName, params = {}, subRouteName, subRouteParams = {}) => {
  return NavigationActions.navigate({
    routeName,
    params,
    action: subRouteName ? NavigationActions.navigate({ routeName: subRouteName, params: subRouteParams}) : {}
  });
};

const resetAction = (routeName, params = {}) => {
  return NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName, params})
    ]
  });
};

const backAction = (key = null) => {
  return NavigationActions.back({
    key: key
  });
};

const setParamsAction = (params = {}, key) => {
  return NavigationActions.setParams({
    params: params,
    key: key,
  });
};

export {
  navigateAction,
  resetAction,
  backAction,
  setParamsAction
}