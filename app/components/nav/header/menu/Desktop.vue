<script lang="ts" setup>
import { SearchIcon, SparkleIcon } from 'lucide-vue-next';

import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

import { cn } from '@/lib/utils';

const localePath = useLocalePath();

const {
  exploreNavMenuAside,
  exploreNavMenuItems,
  createNavMenuAside,
  createNavMenuItems
} = useNavMenu();
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger class="bg-transparent">
          {{ $t('nav.explore') }}
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
          {{ $t('nav.create') }}
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
            :to="localePath('/about')"
            :title="$t('nav.about')"
            :class="cn(navigationMenuTriggerStyle(), 'bg-transparent')"
          >
            {{ $t('nav.about') }}
          </NuxtLink>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
