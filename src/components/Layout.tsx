import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { isMobile } from '../constants';
import Spacer from './Spacer';
import { TAB_BAR_WIDTH } from './TabBar';
import Title from './Title';

const Layout: React.FC = ({ title, rightRender, children }) => (
  <View style={styles.container}>
    <Spacer height={30} />
    <View style={styles.header}>
      <Title>{title}</Title>
      {rightRender && rightRender}
    </View>
    <ScrollView>{children}</ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: isMobile ? 0 : TAB_BAR_WIDTH * 1.8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: isMobile ? 20 : 60,
  },
});

export default memo(Layout);
