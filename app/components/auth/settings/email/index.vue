<script lang="ts" setup>
import { MailIcon, BadgeCheckIcon, BadgeXIcon } from 'lucide-vue-next';

import { useToast } from '@/components/ui/toast/use-toast';

const { t: $t } = useI18n();

const { authUser, authUserURL, verifyEmail } = useAuth();

const { toast } = useToast();

const isUpdateEmailOpen: Ref<boolean> = ref(false);
const isLoadingVerifyEmail: Ref<boolean> = ref(false);

const clickVerifyEmail = async () => {
  if (isLoadingVerifyEmail.value) return;

  isLoadingVerifyEmail.value = true;

  const { error } = await verifyEmail({
    email: authUser.value!.email,
    callbackURL: authUserURL.value
  });

  isLoadingVerifyEmail.value = false;

  if (error) {
    toast({
      title: $t('toast.auth.settings.email.verify.error'),
      description: error.message,
      variant: 'destructive'
    });
  } else {
    toast({
      title: $t('toast.auth.settings.email.verify.title'),
      description: $t('toast.auth.settings.email.verify.description')
    });
  }
};
</script>

<template>
  <section>
    <Accordion type="single" collapsible>
      <AccordionItem
        value="update-email"
        :class="{ 'border-none': isUpdateEmailOpen }"
      >
        <AccordionTrigger>
          <h3 class="font-bold">
            {{ $t('auth.settings.email.title') }}
          </h3>
        </AccordionTrigger>
        <AccordionContent :class="cn('pl-2.5', isUpdateEmailOpen && 'p-0')">
          <div
            v-if="!isUpdateEmailOpen"
            class="flex flex-col justify-between gap-y-2 sm:flex-row sm:items-start sm:gap-y-0"
          >
            <div>
              <p class="flex items-center gap-x-2">
                <BadgeCheckIcon
                  v-if="authUser?.emailVerified"
                  :size="16"
                  class="stroke-green-700"
                />
                <BadgeXIcon v-else :size="16" class="stroke-destructive" />

                <span
                  :class="
                    authUser?.emailVerified
                      ? 'text-green-700'
                      : 'text-destructive'
                  "
                >
                  {{
                    authUser?.emailVerified
                      ? $t('auth.settings.email.verified')
                      : $t('auth.settings.email.unverified')
                  }}
                </span>
              </p>

              <p class="flex items-center gap-x-2">
                <MailIcon :size="16" />
                {{ authUser?.email }}
              </p>
            </div>

            <div class="flex flex-col gap-y-2">
              <div class="text-end">
                <Button variant="ghost" @click="isUpdateEmailOpen = true">
                  {{ $t('auth.settings.email.button') }}
                </Button>
              </div>

              <div v-if="!authUser?.emailVerified" class="text-end">
                <Button
                  variant="ghost"
                  class="gap-x-2"
                  @click="clickVerifyEmail"
                >
                  <IconLoader v-if="isLoadingVerifyEmail" />
                  <BadgeCheckIcon v-else :size="16" />
                  {{ $t('auth.settings.email.buttonVerify') }}
                </Button>
              </div>
            </div>
          </div>

          <AuthSettingsEmailForm
            v-else
            @close-update-email="isUpdateEmailOpen = false"
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </section>
</template>
