<script lang="ts" setup>
import { Settings2Icon } from 'lucide-vue-next';

import { useToast } from '@/components/ui/toast/use-toast';

const { authUser, deleteAuthUser } = useAuth();

const { isOpen } = useAuthSettings();

const localePath = useLocalePath();
const { t: $t } = useI18n();

const { alert } = useAlert();
const { toast } = useToast();

const isUpdateProfileOpen: Ref<boolean> = ref(false);
const isUpdateUsernameOpen: Ref<boolean> = ref(false);
// const isUpdateEmailOpen: Ref<boolean> = ref(false);

const isLoadingDeleteAccount: Ref<boolean> = ref(false);

const deleteAccount = async () => {
  if (isLoadingDeleteAccount.value) return;

  isOpen.value = false;

  const response: boolean = await alert({
    title: $t('alert.auth.settings.deleteAccount.title'),
    description: $t('alert.auth.settings.deleteAccount.description'),
    danger: true
  });

  if (!response) return;

  isLoadingDeleteAccount.value = true;

  const { error } = await deleteAuthUser({
    callbackURL: localePath('/')
  });

  isLoadingDeleteAccount.value = false;

  if (error) {
    toast({
      title: $t('toast.auth.settings.deleteAccount.error'),
      description: error.message,
      variant: 'destructive'
    });
  } else {
    toast({
      title: $t('toast.auth.settings.deleteAccount.title'),
      description: $t('toast.auth.settings.deleteAccount.description')
    });
  }
};
</script>

<template>
  <DialogContent>
    <DialogHeader>
      <DialogTitle class="flex items-center gap-x-2.5">
        <Settings2Icon :size="20" />
        {{ $t('nav.header.user.settings') }}
      </DialogTitle>
    </DialogHeader>

    <Separator />

    <div class="flex flex-col gap-y-4 text-sm">
      <section :class="{ 'border-b': !isUpdateProfileOpen }">
        <h3 class="py-4 font-bold">
          {{ $t('auth.settings.profile.title') }}
        </h3>

        <div
          v-if="!isUpdateProfileOpen"
          class="flex flex-row items-center justify-between pb-4 pl-2.5"
        >
          <div class="flex flex-row items-center gap-x-3">
            <CommonAvatar
              size="sm"
              :height="40"
              :width="40"
              :pointer="false"
              :user="authUser"
            />
            <p>{{ authUser?.name }}</p>
          </div>

          <Button variant="ghost" @click="isUpdateProfileOpen = true">
            {{ $t('auth.settings.profile.button') }}
          </Button>
        </div>

        <AuthSettingsFormProfile
          v-else
          @close-update-profile="isUpdateProfileOpen = false"
        />
      </section>

      <section :class="{ 'border-b': !isUpdateUsernameOpen }">
        <h3 class="py-4 font-bold">
          {{ $t('auth.settings.username.title') }}
        </h3>

        <div
          v-if="!isUpdateUsernameOpen"
          class="flex flex-row items-center justify-between pb-4 pl-2.5"
        >
          <p>
            {{ authUser?.username || $t('auth.settings.username.notDefined') }}
          </p>

          <Button variant="ghost" @click="isUpdateUsernameOpen = true">
            {{
              authUser?.username
                ? $t('auth.settings.username.button')
                : $t('auth.settings.username.buttonSet')
            }}
          </Button>
        </div>

        <AuthSettingsFormUsername
          v-else
          @close-update-username="isUpdateUsernameOpen = false"
        />
      </section>

      <!-- <section>
          <Accordion type="single" collapsible>
            <AccordionItem
              value="update-email"
              :class="{ 'border-none': isUpdateEmailOpen }"
            >
              <AccordionTrigger>
                <h3 class="font-bold">Email</h3>
              </AccordionTrigger>
              <AccordionContent :class="{ 'p-0': isUpdateEmailOpen }">
                <div
                  v-if="!isUpdateEmailOpen"
                  class="flex flex-row items-center justify-between pl-2.5"
                >
                  <p>{{ authUser.email }}</p>

                  <Button variant="ghost" @click="isUpdateEmailOpen = true">
                    Update email
                  </Button>
                </div>

                <AuthSettingsFormEmail
                  v-else
                  @close-update-email="isUpdateEmailOpen = false"
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section> -->

      <section>
        <Accordion type="single" collapsible>
          <AccordionItem value="delete-account" class="border-b-transparent">
            <AccordionTrigger>
              <h3 class="font-bold">
                {{ $t('auth.settings.deleteAccount.title') }}
              </h3>
            </AccordionTrigger>
            <AccordionContent class="flex items-center justify-between pl-2.5">
              <p>{{ $t('auth.settings.deleteAccount.description') }}</p>

              <Button variant="destructive" @click="deleteAccount">
                {{ $t('auth.settings.deleteAccount.title') }}
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  </DialogContent>
</template>
