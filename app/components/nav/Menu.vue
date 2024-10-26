<script lang="ts" setup>
import { SearchIcon, SparkleIcon } from 'lucide-vue-next';

import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

import {
  exploreNavMenuAside,
  exploreNavMenuItems,
  createNavMenuAside,
  createNavMenuItems
} from '@/constants/navMenu';
import { cn } from '@/lib/utils';
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
            <NavigationMenuContentAside :nav-menu-aside="exploreNavMenuAside">
              <SearchIcon :size="30" stroke="url(#gradient-svg)" />
            </NavigationMenuContentAside>

            <NavigationMenuContentButtons
              :nav-menu-items="exploreNavMenuItems"
            />
          </NavigationMenuContentList>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuTrigger class="bg-transparent">
          Create
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuContentList>
            <NavigationMenuContentAside :nav-menu-aside="createNavMenuAside">
              <SparkleIcon :size="30" stroke="url(#gradient-svg)" />
            </NavigationMenuContentAside>

            <NavigationMenuContentButtons
              :nav-menu-items="createNavMenuItems"
            />
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
