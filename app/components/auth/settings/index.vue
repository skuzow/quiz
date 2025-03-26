<script lang="ts" setup>
const { isAuthenticated, authUser } = useAuth();

const { isOpen } = useAuthSettings();

const isUpdateProfileOpen: Ref<boolean> = ref(false);
const isUpdateUsernameOpen: Ref<boolean> = ref(false);
const isUpdateEmailOpen: Ref<boolean> = ref(false);
</script>

<template>
  <Dialog v-if="isAuthenticated && authUser" v-model:open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Settings</DialogTitle>
      </DialogHeader>

      <Separator />

      <div class="flex flex-col gap-y-4 text-sm">
        <section :class="{ 'border-b': !isUpdateProfileOpen }">
          <h3 class="py-4 font-bold">Profile</h3>

          <div :class="{ 'pb-4': !isUpdateProfileOpen }">
            <div
              v-if="!isUpdateProfileOpen"
              class="flex flex-row items-center justify-between pl-2.5"
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
              v-if="isUpdateProfileOpen"
              @close-update-profile="isUpdateProfileOpen = false"
            />
          </div>
        </section>

        <section :class="{ 'border-b': !isUpdateUsernameOpen }">
          <h3 class="py-4 font-bold">Username</h3>

          <div :class="{ 'pb-4': !isUpdateUsernameOpen }">
            <div
              v-if="!isUpdateUsernameOpen"
              class="flex flex-row items-center justify-between pl-2.5"
            >
              <p>{{ authUser.username || 'Not defined' }}</p>

              <Button variant="ghost" @click="isUpdateUsernameOpen = true">
                {{ authUser.username ? 'Update username' : 'Set username' }}
              </Button>
            </div>

            <AuthSettingsFormUsername
              v-if="isUpdateUsernameOpen"
              @close-update-username="isUpdateUsernameOpen = false"
            />
          </div>
        </section>

        <section>
          <Accordion type="single" collapsible>
            <AccordionItem
              value="change-email"
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
                  v-if="isUpdateEmailOpen"
                  @close-update-email="isUpdateEmailOpen = false"
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <DialogFooter>
          <Button variant="destructive" class="mt-4">Delete account</Button>
        </DialogFooter>
      </div>
    </DialogContent>
  </Dialog>
</template>
