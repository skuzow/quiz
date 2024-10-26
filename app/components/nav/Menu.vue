<script lang="ts" setup>
import { SearchIcon, SparkleIcon } from 'lucide-vue-next';

import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

import { exploreNavMenuItems, createNavMenuItems } from '@/constants/navMenu';
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
              v-for="{ link, title, description } in exploreNavMenuItems"
              :key="title"
            >
              <NavigationMenuLink as-child>
                <NuxtLink :to="link" :title="title">
                  <NavigationMenuContentItemButton>
                    <NavigationMenuContentItemButtonTitle>
                      {{ title }}
                    </NavigationMenuContentItemButtonTitle>
                    <NavigationMenuContentItemButtonDescription>
                      {{ description }}
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
              v-for="{ link, title, description } in createNavMenuItems"
              :key="title"
            >
              <NavigationMenuLink as-child>
                <NuxtLink :to="link" :title="title">
                  <NavigationMenuContentItemButton>
                    <NavigationMenuContentItemButtonTitle>
                      {{ title }}
                    </NavigationMenuContentItemButtonTitle>
                    <NavigationMenuContentItemButtonDescription>
                      {{ description }}
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
