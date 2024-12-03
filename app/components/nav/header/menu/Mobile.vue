<script setup lang="ts">
import { MenuIcon, UserRoundIcon, Settings2Icon } from 'lucide-vue-next';

const { user, isAuthenticated, nameAbbreviation, userURL, signOut } = useAuth();

const localePath = useLocalePath();

const { exploreNavMenuItems, createNavMenuItems, aboutNavMenuItems } =
  useNavMenu();
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
              <div v-if="isAuthenticated" class="flex justify-start gap-x-2">
                <Avatar class="cursor-pointer">
                  <AvatarImage
                    v-if="user?.image"
                    :src="user?.image"
                    width="36"
                    height="36"
                    loading="lazy"
                    title="Avatar"
                    alt="Avatar"
                  />
                  <AvatarFallback>
                    {{ nameAbbreviation }}
                  </AvatarFallback>
                </Avatar>

                <div class="flex flex-col items-start">
                  <h3 class="text-sm">{{ user?.name }}</h3>

                  <p class="text-xs font-medium">
                    {{ user?.username ? `@${user?.username}` : user?.email }}
                  </p>
                </div>
              </div>

              <NavLogo v-else />

              <span class="sr-only">{{ $t('nav.header.menu.title') }}</span>
            </NuxtLink>
          </SheetClose>
        </SheetTitle>
        <SheetDescription class="sr-only">
          {{ $t('nav.header.menu.title') }}
        </SheetDescription>
      </SheetHeader>

      <div v-if="isAuthenticated" class="mt-2">
        <ul class="flex items-start py-2">
          <li>
            <SheetClose as-child>
              <NuxtLink :to="userURL" :title="$t('nav.header.user.profile')">
                <Button variant="link" class="gap-2 pl-0">
                  <UserRoundIcon :size="16" />
                  <span>{{ $t('nav.header.user.profile') }}</span>
                </Button>
              </NuxtLink>
            </SheetClose>
          </li>

          <li>
            <Button variant="link" class="gap-2 pl-0">
              <Settings2Icon :size="16" />
              <span>{{ $t('nav.header.user.settings') }}</span>
            </Button>
          </li>
        </ul>

        <Accordion type="single" collapsible default-value="explore">
          <SheetMenuContentAccordionItem
            item-value="explore"
            :nav-menu-title="$t('nav.explore')"
            :nav-menu-items="exploreNavMenuItems"
          />

          <SheetMenuContentAccordionItem
            item-value="create"
            :nav-menu-title="$t('nav.create')"
            :nav-menu-items="createNavMenuItems"
          />

          <SheetMenuContentAccordionItem
            item-value="about"
            :nav-menu-title="$t('nav.about')"
            :nav-menu-items="aboutNavMenuItems"
          />
        </Accordion>
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

      <div class="mt-8 flex flex-col gap-y-3">
        <SheetClose v-if="isAuthenticated" as-child>
          <Button class="w-full" @click="signOut">
            {{ $t('nav.header.user.logout') }}
          </Button>
        </SheetClose>

        <template v-else>
          <SheetClose as-child>
            <NuxtLink
              :to="localePath('/login')"
              :title="$t('nav.header.login')"
            >
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
        </template>
      </div>
    </SheetContent>
  </Sheet>
</template>
