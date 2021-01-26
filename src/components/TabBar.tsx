import React, { memo, useEffect, useState } from 'react';
import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import getQualityIcon from '../utils/getQualityIcon';

const TAB_BAR_WIDTH: number = 30;

const TabBar = ({ state, navigation }) => (
  <View style={styles.list}>
    {state.routes.map((route, index) => (
      <Item
        key={route.key}
        navigation={navigation}
        routeName={route.name}
        routeIndex={index}
        stateIndex={state.index}
        iconProps={getQualityIcon(route.name)}
      />
    ))}
  </View>
);

const Item = ({ navigation, routeName, stateIndex, routeIndex, iconProps }) => {
  const isFocused = stateIndex === routeIndex;
  const [isFocus, setIsFocus] = useState(Platform.isTV ? isFocused : false);

  const onPress = (): void => {
    if (!isFocused) {
      navigation.navigate(routeName);
    }
  };

  useEffect(() => {}, [isFocused]);

  return (
    <TouchableNativeFeedback
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onPress={onPress}>
      <LinearGradient
        style={styles.item}
        colors={
          isFocused || isFocus
            ? ['transparent', '#5a5a5a', 'transparent']
            : ['transparent', 'transparent']
        }>
        <Icon
          {...iconProps}
          color={isFocused ? '#b7a742' : isFocus ? 'white' : '#3b3b3b'}
        />
      </LinearGradient>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  list: {
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
    width: TAB_BAR_WIDTH,
    height: Dimensions.get('window').height - StatusBar.currentHeight,
  },
  item: {
    flex: 1,
    maxHeight: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focus: {
    backgroundColor: 'rgba(255, 255, 255, .1)',
  },
});

export default memo(TabBar);
export { TAB_BAR_WIDTH };
