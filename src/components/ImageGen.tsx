import { imagesURLs } from "@app/imagesURLs";
import React from "react";
import { Image } from "react-native";

interface ImageGenProps {
  name: string;
}

export const ImageGen: React.FC<ImageGenProps> = ({ name }) => {
  return (
    <Image source={imagesURLs[`${name}`]} style={{ width: 200, height: 200 }} />
  );
};
