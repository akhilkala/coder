import React, { ReactElement } from 'react';
import animation from '../assets/animations/loading.json';
import { lottieOptions } from '../utils/utilities';
import Lottie from 'react-lottie';

interface Props {
  width?: number;
  height?: number;
}

export default function Loading({
  width = 250,
  height = 250,
}: Props): ReactElement {
  return (
    <Lottie options={lottieOptions(animation)} height={height} width={width} />
  );
}
