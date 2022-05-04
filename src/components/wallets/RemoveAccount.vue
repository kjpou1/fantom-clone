<script setup lang="ts">
import { useModalsStore } from "@/stores/modals";
import type { WalletAccount } from "@/types/StateTypes";
import IconExclamation from "../icons/IconExclamation.vue";
import ButtonSecondary from "../ui/ButtonSecondary.vue";
import ButtonPrimary from "../ui/ButtonPrimary.vue";

const props = defineProps<{
  wallet: WalletAccount;
}>();

const useModals = useModalsStore();
</script>

<template>
  <div class="pt-8 pb-12 text-dark_primary dark:text-light_primary">
    <div id="text-body">
      <p class="text-center pb-6 text-base">
        Are you sure you want to remove wallet {{ props.wallet.account }}?
      </p>
      <div class="px-6">
        <div class="flex content-center items-center text-[#997021]">
          <span>
            <IconExclamation />
          </span>
          <span class="ml-4 text-left font-normal text-base">
            Removing a wallet clears it from local storage. You will not be able
            to access it again unless you restore via mnemonic phrase, keystore
            file or private key. This action is irreversible.
          </span>
        </div>
      </div>
    </div>
    <div
      class="flex flex-shrink-0 gap-2 flex-wrap items-center justify-center p-4"
    >
      <ButtonSecondary
        type="button"
        @click="useModals.showRemoveConfirmation = false"
      >
        Cancel
      </ButtonSecondary>
      <ButtonPrimary
        type="submit"
        @click.prevent="(e:unknown) => $emit('remove-account', e)"
      >
        Remove
      </ButtonPrimary>
    </div>
  </div>
</template>
