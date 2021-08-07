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

export const getFormatedDate = (date: string) => {
  const formated = new Date(date).toString();
  const year = formated.split(' ').slice(1, 4)[2];

  return formated.split(' ').slice(1, 3).reverse().join(' ') + ' ' + year;
};
