<script setup lang="ts">
import IconEdit from "../icons/IconEdit.vue";
import IconCopy from "../icons/IconCopy.vue";
import ButtonWithRoundImage from "../ui/ButtonWithRoundImage.vue";

import ViewCard from "../ui/ViewCard.vue";
import BalanceColumn from "../ui/BalanceColumn.vue";
import type { WalletAccount } from "@/types/StateTypes";
import { useModalsStore } from "@/stores/modals";
import { useClipboard } from "@/composables/clipboard";

const props = defineProps<{
  wallet: WalletAccount;
  index: number;
}>();

const toHref = `/wallet/${props.wallet.account}/`;
const useModals = useModalsStore();
const editMe = (evt: Event) => {
  evt.preventDefault();
  evt.stopPropagation();
  useModals.editWallet(props.wallet);
};

const copyMe = async (evt: Event) => {
  evt.preventDefault();
  evt.stopPropagation();
  const { copyTextToClipboard } = useClipboard();
  await copyTextToClipboard(props.wallet?.account ?? "");
  console.log("Address copied to clipboard.");
};
</script>
<template>
  <div>
    <ViewCard>
      <template #body>
        <div>
          <a :href="toHref" class="">
            <div class="flex flex-row flex-wrap text-xl font-normal">
              <div class="flex-grow basis-1/2">
                <span class="flex flex-col flex-wrap">
                  <span>{{ wallet.name }}</span>
                  <span class="text-sm text-neutral_text">{{
                    wallet.account
                  }}</span>
                </span>
              </div>
              <div class="flex flex-grow basis-1/2">
                <div class="flex-grow basis-1/2">
                  <BalanceColumn
                    :account="props.wallet.account"
                    type="available"
                    level="2"
                  >
                    <template #title>Available</template>
                  </BalanceColumn>
                </div>
                <div class="flex-grow basis-1/2">
                  <span class="flex">
                    <BalanceColumn
                      :account="props.wallet.account"
                      type="total"
                      level="2"
                    >
                      <template #title>Total</template>
                    </BalanceColumn>
                    <div class="flex flex-col justify-items-end text-light_btn">
                      <ButtonWithRoundImage
                        title=""
                        size="btn-sm"
                        text_class=""
                        icon_class="bg-transparent hover:bg-light_btn_hover"
                        @click="editMe"
                      >
                        <IconEdit />
                      </ButtonWithRoundImage>
                      <span class="-my-4">
                        <ButtonWithRoundImage
                          title=""
                          size="btn-sm"
                          text_class=""
                          icon_class="bg-transparent hover:bg-light_btn_hover"
                          @click="copyMe"
                        >
                          <IconCopy />
                        </ButtonWithRoundImage>
                      </span>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </template>
    </ViewCard>
  </div>
</template>
