<script lang="ts" setup>
import { SearchIcon, SparkleIcon } from 'lucide-vue-next';

import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

import { cn } from '@/lib/utils';

const localePath = useLocalePath();

const {
  exploreNavMenuAside,
  exploreNavMenuItems,
  createNavMenuAside,
  createNavMenuItems,
  aboutNavMenuItems
} = useNavMenu();
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger
          :class="
            $route.path.startsWith(localePath(exploreNavMenuAside.link)) &&
            'bg-accent text-accent-foreground'
          "
        >
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
        <NavigationMenuTrigger
          :class="
            ($route.path.startsWith(localePath(createNavMenuItems[0]!.link)) ||
              $route.path.startsWith(
                localePath(createNavMenuItems[1]!.link)
              )) &&
            'bg-accent text-accent-foreground'
          "
        >
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
          <NuxtLinkLocale
            :to="aboutNavMenuItems[0]!.link"
            :title="$t('nav.about')"
            :class="
              cn(
                navigationMenuTriggerStyle(),
                $route.path.startsWith(
                  localePath(aboutNavMenuItems[0]!.link)
                ) && 'bg-accent text-accent-foreground'
              )
            "
          >
            {{ $t('nav.about') }}
          </NuxtLinkLocale>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
