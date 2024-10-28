const {
  $i18n: { t }
} = useNuxtApp();

const $t = t;

export interface NavMenuItem {
  link: string;
  title: string;
  description: string;
}

export const exploreNavMenuAside: NavMenuItem = {
  link: '/tests',
  title: $t('nav.header.explore.aside.title'),
  description: $t('nav.header.explore.aside.description')
};

export const exploreNavMenuItems: NavMenuItem[] = [
  {
    link: '/tests',
    title: $t('nav.header.explore.popular.title'),
    description: $t('nav.header.explore.popular.description')
  },
  {
    link: '/tests',
    title: $t('nav.header.explore.rated.title'),
    description: $t('nav.header.explore.rated.description')
  },
  {
    link: '/tests',
    title: $t('nav.header.explore.difficult.title'),
    description: $t('nav.header.explore.difficult.description')
  }
];

export const createNavMenuAside: NavMenuItem = {
  link: '/createai',
  title: $t('nav.header.create.aside.title'),
  description: $t('nav.header.create.aside.description')
};

export const createNavMenuItems: NavMenuItem[] = [
  {
    link: '/create',
    title: $t('nav.header.create.create.title'),
    description: $t('nav.header.create.create.description')
  },
  {
    link: '/createai',
    title: $t('nav.header.create.createai.title'),
    description: $t('nav.header.create.createai.description')
  }
];

export const aboutNavMenuItems: NavMenuItem[] = [
  {
    link: '/about',
    title: $t('nav.header.about.title'),
    description: $t('nav.header.about.description')
  }
];
