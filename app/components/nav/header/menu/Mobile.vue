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
    <SheetContent class="overflow-y-auto">
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

      <div class="mt-8 flex flex-col gap-y-3">
        <SheetClose as-child>
          <NuxtLink to="/login" title="Log In">
            <Button variant="secondary" class="w-full">Log In</Button>
          </NuxtLink>
        </SheetClose>

        <SheetClose as-child>
          <NuxtLink to="/signup" title="Sign Up">
            <Button class="w-full">Sign Up</Button>
          </NuxtLink>
        </SheetClose>
      </div>
    </SheetContent>
  </Sheet>
</template>
