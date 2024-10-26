<script setup lang="ts">
import { MenuIcon } from 'lucide-vue-next';

import {
  exploreNavMenuItems,
  createNavMenuItems,
  aboutNavMenuItems
} from '@/constants/navMenu';
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="ghost" size="icon" class="md:hidden">
        <MenuIcon :size="18" />
      </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>
          <NavLogo />
          <span class="sr-only">Menu</span>
        </SheetTitle>
      </SheetHeader>
      <SheetMenu>
        <SheetMenuContent
          nav-menu-title="Explore"
          :nav-menu-items="exploreNavMenuItems"
        />

        <SheetMenuContent
          nav-menu-title="Create"
          :nav-menu-items="createNavMenuItems"
        />

        <SheetMenuContent
          nav-menu-title="About"
          :nav-menu-items="aboutNavMenuItems"
        />
      </SheetMenu>
    </SheetContent>
  </Sheet>
</template>
