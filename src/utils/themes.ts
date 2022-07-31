  import { booLight, booDark } from '~/renderer/constants/themes';

export const getTheme = (name: string) => {
  if (name === 'boo-light') return booLight;
  else if (name === 'boo-dark') return booDark;
  return booDark;
};
