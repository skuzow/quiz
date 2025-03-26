<script lang="ts" setup>
const { isAuthenticated, authUser } = useAuth();

const { isOpen } = useAuthSettings();

const isProfileFormOpen: Ref<boolean> = ref(false);
const isUsernameFormOpen: Ref<boolean> = ref(false);
const isEmailFormOpen: Ref<boolean> = ref(false);
</script>

<template>
  <Dialog v-if="isAuthenticated && authUser" v-model:open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Settings</DialogTitle>
      </DialogHeader>

      <Separator />

      <div class="flex flex-col gap-y-4 text-sm">
        <section :class="{ 'border-b': !isProfileFormOpen }">
          <h3 class="py-4 font-bold">Profile</h3>

          <div :class="{ 'pb-4': !isProfileFormOpen }">
            <div
              v-if="!isProfileFormOpen"
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

              <Button variant="ghost" @click="isProfileFormOpen = true">
                Update profile
              </Button>
            </div>

            <AuthSettingsFormProfile
              v-if="isProfileFormOpen"
              @close-profile-form="isProfileFormOpen = false"
            />
          </div>
        </section>

        <section :class="{ 'border-b': !isUsernameFormOpen }">
          <h3 class="py-4 font-bold">Username</h3>

          <div :class="{ 'pb-4': !isUsernameFormOpen }">
            <div
              v-if="!isUsernameFormOpen"
              class="flex flex-row items-center justify-between pl-2.5"
            >
              <p>{{ authUser.username || 'Not defined' }}</p>

              <Button variant="ghost" @click="isUsernameFormOpen = true">
                Update username
              </Button>
            </div>

            <AuthSettingsFormUsername
              v-if="isUsernameFormOpen"
              @close-username-form="isUsernameFormOpen = false"
            />
          </div>
        </section>

        <section>
          <Accordion type="single" collapsible>
            <AccordionItem
              value="change-email"
              :class="{ 'border-none': isEmailFormOpen }"
            >
              <AccordionTrigger>
                <h3 class="font-bold">Email</h3>
              </AccordionTrigger>
              <AccordionContent :class="{ 'p-0': isEmailFormOpen }">
                <div
                  v-if="!isEmailFormOpen"
                  class="flex flex-row items-center justify-between pl-2.5"
                >
                  <p>{{ authUser.email }}</p>

                  <Button variant="ghost" @click="isEmailFormOpen = true">
                    Update email
                  </Button>
                </div>

                <AuthSettingsFormEmail
                  v-if="isEmailFormOpen"
                  @close-email-form="isEmailFormOpen = false"
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
