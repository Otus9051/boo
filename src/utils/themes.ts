  import { skyeLight, skyeDark } from '~/renderer/constants/themes';

export const getTheme = (name: string) => {
  if (name === 'skye-light') return skyeLight;
  else if (name === 'skye-dark') return skyeDark;
  return skyeDark;
};
