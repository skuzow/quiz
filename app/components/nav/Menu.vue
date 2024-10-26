<script lang="ts" setup>
import { SearchIcon, SparkleIcon } from 'lucide-vue-next';

import {
  type NavigationMenuContentItem,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';

import { cn } from '@/lib/utils';

const exploreItems: NavigationMenuContentItem[] = [
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

const createItems: NavigationMenuContentItem[] = [
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
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger class="bg-transparent">
          Explore
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuContentList>
            <NavigationMenuContentItem class="row-span-3">
              <NavigationMenuLink as-child>
                <NuxtLink to="/tests" title="Search tests">
                  <NavigationMenuContentItemAside>
                    <SearchIcon :size="30" stroke="url(#gradient-svg)" />
                    <NavigationMenuContentItemAsideTitle>
                      Search Tests
                    </NavigationMenuContentItemAsideTitle>
                    <NavigationMenuContentItemAsideDescription>
                      Search in our large and varied collection of tests.
                    </NavigationMenuContentItemAsideDescription>
                  </NavigationMenuContentItemAside>
                </NuxtLink>
              </NavigationMenuLink>
            </NavigationMenuContentItem>

            <NavigationMenuContentItem
              v-for="exploreItem in exploreItems"
              :key="exploreItem.title"
            >
              <NavigationMenuLink as-child>
                <NuxtLink :to="exploreItem.link" :title="exploreItem.title">
                  <NavigationMenuContentItemButton>
                    <NavigationMenuContentItemButtonTitle>
                      {{ exploreItem.title }}
                    </NavigationMenuContentItemButtonTitle>
                    <NavigationMenuContentItemButtonDescription>
                      {{ exploreItem.description }}
                    </NavigationMenuContentItemButtonDescription>
                  </NavigationMenuContentItemButton>
                </NuxtLink>
              </NavigationMenuLink>
            </NavigationMenuContentItem>
          </NavigationMenuContentList>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuTrigger class="bg-transparent">
          Create
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuContentList>
            <NavigationMenuContentItem class="row-span-3">
              <NavigationMenuLink as-child>
                <NuxtLink to="/createai" title="Create AI">
                  <NavigationMenuContentItemAside>
                    <SparkleIcon :size="30" stroke="url(#gradient-svg)" />
                    <NavigationMenuContentItemAsideTitle>
                      AI Creation
                    </NavigationMenuContentItemAsideTitle>
                    <NavigationMenuContentItemAsideDescription>
                      Take the advantage of AI to create your own tests.
                    </NavigationMenuContentItemAsideDescription>
                  </NavigationMenuContentItemAside>
                </NuxtLink>
              </NavigationMenuLink>
            </NavigationMenuContentItem>

            <NavigationMenuContentItem
              v-for="createItem in createItems"
              :key="createItem.title"
            >
              <NavigationMenuLink as-child>
                <NuxtLink :to="createItem.link" :title="createItem.title">
                  <NavigationMenuContentItemButton>
                    <NavigationMenuContentItemButtonTitle>
                      {{ createItem.title }}
                    </NavigationMenuContentItemButtonTitle>
                    <NavigationMenuContentItemButtonDescription>
                      {{ createItem.description }}
                    </NavigationMenuContentItemButtonDescription>
                  </NavigationMenuContentItemButton>
                </NuxtLink>
              </NavigationMenuLink>
            </NavigationMenuContentItem>
          </NavigationMenuContentList>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink as-child>
          <NuxtLink
            to="/about"
            title="About"
            :class="cn(navigationMenuTriggerStyle(), 'bg-transparent')"
          >
            About
          </NuxtLink>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
