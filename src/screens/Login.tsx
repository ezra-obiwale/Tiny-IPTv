import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import LoginTvScreen from './Login.tv';
import LoginAndroidScreen from './Login.touch';
import { useTheme } from 'react-native-paper';

const LoginScreen: React.FC = () => {
  const { colors } = useTheme();

  return (
    <ScrollView>
      <View style={{ backgroundColor: colors.background }}>
        <View style={styles.container}>
          {Platform.isTV ? <LoginTvScreen /> : <LoginAndroidScreen />}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
    minHeight: Dimensions.get('window').height - StatusBar.currentHeight,
  },
});

export default LoginScreen;
