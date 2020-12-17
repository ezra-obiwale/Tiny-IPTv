/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Video from 'react-native-video';
import { useAnimation } from 'react-native-animation-hooks';
import { useApp } from '../states/app';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';

const Player = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [playerStyles, setPlayerStyles] = useState(styles.playerSmall);
  const player = useRef();
  const app = useApp();
  const opacity = useAnimation({
    toValue: app.source ? 1 : 0.5,
    type: 'spring',
    useNativeDriver: true,
  });
  const translateY = useAnimation({
    toValue: app.source ? 0 : 500,
    type: 'spring',
    useNativeDriver: true,
  });

  const isPipSize = playerStyles.width === styles.playerSmall.width;

  const togglePlayerStyles = () => {
    if (isPipSize) {
      return setPlayerStyles(styles.playerFull);
    }

    return setPlayerStyles(styles.playerSmall);
  };

  return (
    <Animated.View
      style={[
        styles.playerContainer,
        {
          transform: [
            {
              translateY: translateY,
            },
          ],
          opacity,
          right: isPipSize ? 50 : 0,
          bottom: isPipSize ? 50 : 0,
        },
      ]}>
      {isLoading && (
        <View style={styles.activityIndicator}>
          <ActivityIndicator color="white" size="large" />
        </View>
      )}
      {app.source ? (
        <TouchableNativeFeedback onPress={togglePlayerStyles}>
          <Video
            ref={player}
            style={playerStyles}
            paused={false}
            autoplay={true}
            resizeMode="contain"
            source={{
              uri: app.source,
              type: 'mpeg',
            }}
            onLoadStart={() => setIsLoading(true)}
            onLoad={() => setIsLoading(false)}
          />
        </TouchableNativeFeedback>
      ) : null}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  playerContainer: {
    position: 'absolute',
    zIndex: 2,
    backgroundColor: 'black',
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerSmall: {
    width: 480,
    height: 270,
  },
  playerFull: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - StatusBar.currentHeight,
  },
});

export default Player;
