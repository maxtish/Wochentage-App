import React from 'react';
import { useBackHandler } from '@app/services/backHandler';

import { Theory } from '../components/Theory';
import { View, StyleSheet } from 'react-native';

const TheoryScreen: React.ComponentType = () => {
  useBackHandler();
  return <Theory />;
};

export default TheoryScreen;
