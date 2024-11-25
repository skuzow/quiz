<script setup lang="ts">
import { MenuIcon } from 'lucide-vue-next';

const localePath = useLocalePath();

const { exploreNavMenuItems, createNavMenuItems, aboutNavMenuItems } =
  useNavMenu();

const sessionStore = useSessionStore();
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="ghost" size="icon" class="md:hidden">
        <MenuIcon :size="18" />
        <span class="sr-only">{{ $t('nav.header.menu.button') }}</span>
      </Button>
    </SheetTrigger>
    <SheetContent class="overflow-y-auto">
      <SheetHeader>
        <SheetTitle>
          <SheetClose as-child>
            <NuxtLink :to="localePath('/')" :title="$t('nav.home')">
              <NavLogo />
              <span class="sr-only">{{ $t('nav.header.menu.title') }}</span>
            </NuxtLink>
          </SheetClose>
        </SheetTitle>
      </SheetHeader>

      <div v-if="sessionStore.isAuthenticated" class="mt-6">
        <SheetMenuContentSeparator
          :nav-menu-title="$t('nav.explore')"
          :nav-menu-items="exploreNavMenuItems"
        />

        <SheetMenuContentSeparator
          :nav-menu-title="$t('nav.create')"
          :nav-menu-items="createNavMenuItems"
        />

        <SheetMenuContentSeparator
          :nav-menu-title="$t('nav.about')"
          :nav-menu-items="aboutNavMenuItems"
        />
      </div>

      <div v-else class="mt-6 flex flex-col gap-y-6">
        <SheetMenuContent
          :nav-menu-title="$t('nav.explore')"
          :nav-menu-items="exploreNavMenuItems"
        />

        <SheetMenuContent
          :nav-menu-title="$t('nav.create')"
          :nav-menu-items="createNavMenuItems"
        />

        <SheetMenuContent
          :nav-menu-title="$t('nav.about')"
          :nav-menu-items="aboutNavMenuItems"
        />
      </div>

      <div
        v-if="!sessionStore.isAuthenticated"
        class="mt-8 flex flex-col gap-y-3"
      >
        <SheetClose as-child>
          <NuxtLink :to="localePath('/login')" :title="$t('nav.header.login')">
            <Button variant="secondary" class="w-full">
              {{ $t('nav.header.login') }}
            </Button>
          </NuxtLink>
        </SheetClose>

        <SheetClose as-child>
          <NuxtLink
            :to="localePath('/signup')"
            :title="$t('nav.header.signup')"
          >
            <Button class="w-full">
              {{ $t('nav.header.signup') }}
            </Button>
          </NuxtLink>
        </SheetClose>
      </div>
    </SheetContent>
  </Sheet>
</template>
