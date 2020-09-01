import * as React from 'react';
import {NavigationActions, StackActions} from '@react-navigation/native';

export const navigationRef = React.createRef();

function navigate(routeName, params) {
  navigationRef.current?.navigate(routeName, params);
}

function push(routeName, params) {
  navigationRef.current?.dispatch(StackActions.push(routeName, params));
}

function reset(route, params) {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName: route,
        params: params,
      }),
    ],
  });
  navigationRef.current?.dispatch(resetAction);
}

function getCurrentRoute() {
  let route = navigationRef.current?.state.nav;
  while (route.routes) {
    route = route.routes[route.index];
  }
  return route;
}

// add other navigation functions that you need and export them
function restack(routes = [], index = 0) {
  let routeStack = routes.map((obj) =>
    NavigationActions.navigate({routeName: obj.route, params: obj.params}),
  );
  let resetAction = StackActions.reset({
    index: index,
    actions: routeStack,
  });
  navigationRef.current?.dispatch(resetAction);
}

function pop(n = 1) {
  let popAction = StackActions.pop({
    n: n,
  });
  navigationRef.current?.dispatch(popAction);
}

function popToTop() {
  navigationRef.current?.dispatch(StackActions.popToTop());
}
export default {
  navigate,
  reset,
  getCurrentRoute,
  restack,
  pop,
  popToTop,
  push,
};
//NavigationService.navigate('ChatScreen', { userName: 'Lucy' });
