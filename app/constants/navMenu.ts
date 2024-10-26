export interface NavMenuItem {
  link: string;
  title: string;
  description: string;
}

export const exploreNavMenuItems: NavMenuItem[] = [
  {
    link: '/tests',
    title: 'Most Popular',
    description: 'Best selection of most popular tests.'
  },
  {
    link: '/tests',
    title: 'Top Rated',
    description: 'Most rated tests by our users.'
  },
  {
    link: '/tests',
    title: 'Most Difficult',
    description: 'Difficultest tests that will challenge you.'
  }
];

export const createNavMenuItems: NavMenuItem[] = [
  {
    link: '/create',
    title: 'Create with Blocks',
    description: 'Start creating your own test with our easy to use interface.'
  },
  {
    link: '/createai',
    title: 'Create with AI',
    description: 'Use AI to create your own test fast and easy.'
  }
];

export const aboutNavMenuItems: NavMenuItem[] = [
  {
    link: '/about',
    title: 'About the Project',
    description: 'Learn more about the project and the people behind it.'
  }
];
