<script lang="ts" setup>
import { Settings2Icon } from 'lucide-vue-next';

import { useToast } from '@/components/ui/toast/use-toast';

const { isAuthenticated, authUser, deleteAuthUser } = useAuth();

const { isOpen } = useAuthSettings();

const localePath = useLocalePath();

const { alert } = useAlert();
const { toast } = useToast();

const isUpdateProfileOpen: Ref<boolean> = ref(false);
const isUpdateUsernameOpen: Ref<boolean> = ref(false);
const isUpdateEmailOpen: Ref<boolean> = ref(false);

const isLoadingDeleteAccount: Ref<boolean> = ref(false);

const deleteAccount = async () => {
  if (isLoadingDeleteAccount.value) return;

  isOpen.value = false;

  const response: boolean = await alert({
    title: 'Are you sure you want to delete your account?',
    description: 'A confirmation email will be sent.',
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
      title: 'Error deleting account',
      description: error.message,
      variant: 'destructive'
    });
  } else {
    toast({
      title: '✅ A confirmation email has been sent',
      description: 'Check your inbox to confirm the deletion of your account.'
    });
  }
};
</script>

<template>
  <Dialog v-if="isAuthenticated && authUser" v-model:open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="flex items-center gap-x-2.5">
          <Settings2Icon :size="20" />
          Settings
        </DialogTitle>
      </DialogHeader>

      <Separator />

      <div class="flex flex-col gap-y-4 text-sm">
        <section :class="{ 'border-b': !isUpdateProfileOpen }">
          <h3 class="py-4 font-bold">Profile</h3>

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
              <p>{{ authUser.name }}</p>
            </div>

            <Button variant="ghost" @click="isUpdateProfileOpen = true">
              Update profile
            </Button>
          </div>

          <AuthSettingsFormProfile
            v-else
            @close-update-profile="isUpdateProfileOpen = false"
          />
        </section>

        <section :class="{ 'border-b': !isUpdateUsernameOpen }">
          <h3 class="py-4 font-bold">Username</h3>

          <div
            v-if="!isUpdateUsernameOpen"
            class="flex flex-row items-center justify-between pb-4 pl-2.5"
          >
            <p>{{ authUser.username || 'Not defined' }}</p>

            <Button variant="ghost" @click="isUpdateUsernameOpen = true">
              {{ authUser.username ? 'Update username' : 'Set username' }}
            </Button>
          </div>

          <AuthSettingsFormUsername
            v-else
            @close-update-username="isUpdateUsernameOpen = false"
          />
        </section>

        <section>
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
        </section>

        <section>
          <Accordion type="single" collapsible>
            <AccordionItem value="delete-account" class="border-b-transparent">
              <AccordionTrigger>
                <h3 class="font-bold">Delete account</h3>
              </AccordionTrigger>
              <AccordionContent
                class="flex items-center justify-between pl-2.5"
              >
                <p>This action is irreversible</p>

                <Button variant="destructive" @click="deleteAccount">
                  Delete account
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
    </DialogContent>
  </Dialog>
</template>
