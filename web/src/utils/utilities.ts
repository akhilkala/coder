import codeforces from '../assets/logos/codeforces.png';

export const lottieOptions = (animation: any, loop = true) => ({
  loop,
  autoplay: true,
  animationData: animation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
});

//TODO: unimplemented
export const logos = (site: string) => {
  return codeforces;
};
