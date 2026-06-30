export interface NavigationItem {
  title: string;
  href: string;
  disabled?: boolean;
}

export const navigationConfig = {
  mainNav: [
    {
      title: 'Dashboard',
      href: '/',
    },
  ] as NavigationItem[],
};
