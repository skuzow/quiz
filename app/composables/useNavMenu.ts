export interface NavMenuItem {
  link: string;
  title: string;
  description: string;
}

export const useNavMenu = () => {
  const { t: $t } = useI18n();

  const exploreNavMenuAside = computed<NavMenuItem>(() => ({
    link: '/tests',
    title: $t('nav.header.explore.aside.title'),
    description: $t('nav.header.explore.aside.description')
  }));

  const exploreNavMenuItems = computed<NavMenuItem[]>(() => [
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
  ]);

  const createNavMenuAside = computed<NavMenuItem>(() => ({
    link: '/generate',
    title: $t('nav.header.create.aside.title'),
    description: $t('nav.header.create.aside.description')
  }));

  const createNavMenuItems = computed<NavMenuItem[]>(() => [
    {
      link: '/create',
      title: $t('nav.header.create.create.title'),
      description: $t('nav.header.create.create.description')
    },
    {
      link: '/generate',
      title: $t('nav.header.create.generate.title'),
      description: $t('nav.header.create.generate.description')
    }
  ]);

  const aboutNavMenuItems = computed<NavMenuItem[]>(() => [
    {
      link: '/about',
      title: $t('nav.header.about.title'),
      description: $t('nav.header.about.description')
    }
  ]);

  return {
    exploreNavMenuAside,
    exploreNavMenuItems,
    createNavMenuAside,
    createNavMenuItems,
    aboutNavMenuItems
  };
};
