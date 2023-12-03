import React from 'react';
import { ImageAndText } from '../components/ImageAndText';
import { useBackHandler } from '@app/services/backHandler';

const ImagesAndWords: React.ComponentType = () => {
  useBackHandler();
  return <ImageAndText />;
};

export default ImagesAndWords;
