<script setup lang="ts">
import { MenuIcon, UserRoundIcon, Settings2Icon } from 'lucide-vue-next';

const { authUser, isAuthenticated, authUserURL, signOut } = useAuth();

const { openAuthSettings } = useAuthSettings();

const { exploreNavMenuItems, createNavMenuItems, aboutNavMenuItems } =
  useNavMenu();

const isOpen: Ref<boolean> = ref(false);
</script>

<template>
  <Sheet v-model:open="isOpen">
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
            <NuxtLinkLocale
              :to="isAuthenticated ? '/tests' : '/'"
              :title="isAuthenticated ? $t('tests.title') : $t('nav.home')"
            >
              <div v-if="isAuthenticated" class="flex justify-start gap-x-2">
                <CommonAvatar loading="eager" :user="authUser" />

                <div class="flex flex-col items-start justify-center">
                  <h3 class="text-left text-sm">{{ authUser?.name }}</h3>

                  <p
                    v-if="authUser?.displayUsername"
                    class="text-xs font-medium"
                  >
                    {{ `@${authUser.displayUsername}` }}
                  </p>
                </div>
              </div>

              <NavLogo v-else />

              <span class="sr-only">{{ $t('nav.header.menu.title') }}</span>
            </NuxtLinkLocale>
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
              <NuxtLink
                :to="authUserURL"
                :title="$t('nav.header.user.profile')"
              >
                <Button variant="link" class="gap-2 pl-0">
                  <UserRoundIcon :size="16" />
                  <span>{{ $t('nav.header.user.profile') }}</span>
                </Button>
              </NuxtLink>
            </SheetClose>
          </li>

          <li>
            <Button
              variant="link"
              class="gap-2 pl-0"
              @click="
                () => {
                  isOpen = false;
                  openAuthSettings();
                }
              "
            >
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
            <NuxtLinkLocale to="/login" :title="$t('nav.header.login')">
              <Button variant="secondary" class="w-full">
                {{ $t('nav.header.login') }}
              </Button>
            </NuxtLinkLocale>
          </SheetClose>

          <SheetClose as-child>
            <NuxtLinkLocale to="/signup" :title="$t('nav.header.signup')">
              <Button class="w-full">
                {{ $t('nav.header.signup') }}
              </Button>
            </NuxtLinkLocale>
          </SheetClose>
        </template>
      </div>
    </SheetContent>
  </Sheet>
</template>
