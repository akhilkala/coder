export const lottieOptions = (animation: any, loop = true) => ({
  loop,
  autoplay: true,
  animationData: animation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
});
