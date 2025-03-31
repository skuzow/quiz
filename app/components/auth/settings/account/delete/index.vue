<script lang="ts" setup>
import { useToast } from '@/components/ui/toast/use-toast';

const localePath = useLocalePath();
const { t: $t } = useI18n();

const { deleteAuthUser } = useAuth();

const { alert } = useAlert();
const { toast } = useToast();

const isLoadingDeleteAccount: Ref<boolean> = ref(false);

const deleteAccount = async () => {
  if (isLoadingDeleteAccount.value) return;

  const response: boolean = await alert({
    title: $t('alert.auth.settings.account.delete.title'),
    description: $t('alert.auth.settings.account.delete.description'),
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
      title: $t('toast.auth.settings.account.delete.error'),
      description: error.message,
      variant: 'destructive'
    });
  } else {
    toast({
      title: $t('toast.auth.settings.account.delete.title'),
      description: $t('toast.auth.settings.account.delete.description')
    });
  }
};
</script>

<template>
  <section>
    <Accordion type="single" collapsible>
      <AccordionItem value="delete-account" class="border-b-transparent">
        <AccordionTrigger>
          <h3 class="font-bold">
            {{ $t('auth.settings.account.delete.title') }}
          </h3>
        </AccordionTrigger>
        <AccordionContent class="flex items-center justify-between pl-2.5">
          <p>{{ $t('auth.settings.account.delete.description') }}</p>

          <Button variant="destructive" @click="deleteAccount">
            <IconLoader v-if="isLoadingDeleteAccount" class="mr-2" />
            {{ $t('auth.settings.account.delete.title') }}
          </Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </section>
</template>
