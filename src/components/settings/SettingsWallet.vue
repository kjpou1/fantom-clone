<script setup lang="ts">
import DarkModeInput from "../inputs/DarkModeInput.vue";
import AutoDarkModeInput from "../inputs/AutoDarkModeInput.vue";
import { useSettingsStore } from "@/stores/settings";
import { storeToRefs } from "pinia";

const useSettings = useSettingsStore();

const { currency, language, precision } = storeToRefs(useSettings);

const { setCurrency, setDecimalPositions, setLanguage } = useSettings;

const darkModeInput = {
  type: "input",
  schema: [],
  component: DarkModeInput,
  props: ["currentDarkMode"],
  features: [],
};
const autoDarkModeInput = {
  type: "input",
  schema: [],
  component: AutoDarkModeInput,
  props: ["currentAutoDarkMode"],
  features: [],
};
</script>
<template>
  <div class="flex place-content-center">
    <div class="w-[600px]">
      <FormKit type="group">
        <FormKit
          type="select"
          name="currentCurrency"
          v-model="currency"
          label="Currency"
          placeholder="Select a currency"
          :options="useSettings.currencyOptions"
          validation="required|is:USD,EUR"
          :validation-messages="{
            is: ({ node: { value } }) =>
              `Sorry, we do not support ${value} anymore.`,
          }"
          wrapper-class="max-w-none"
          input-class="text-black dark:text-white"
          help-class="text-black dark:text-white"
          @change="(e) => setCurrency((e.target as any).value)"
        />
        <FormKit
          type="number"
          name="currentPrecision"
          v-model="precision"
          label="Decimals Points"
          placeholder="Select a precision"
          validation="required|number|between:1,6"
          help="Enter a number between 1 and 6."
          step="1"
          min="1"
          max="6"
          @change="(e) => setDecimalPositions((e.target as any).value)"
          wrapper-class="max-w-none"
          input-class="text-black dark:text-white"
          help-class="text-black dark:text-white"
        />
        <FormKit
          type="select"
          name="currentLanguage"
          v-model="language"
          label="Language"
          placeholder="Select a language"
          :options="useSettings.languageOptions"
          validation="required|is:English"
          :validation-messages="{
            is: ({ node: { value } }) =>
              `Sorry, we do not support ${value} anymore.`,
          }"
          @change="(e) => setLanguage((e.target as any).value)"
          wrapper-class="max-w-none"
          input-class="text-black dark:text-white"
          help-class="text-black dark:text-white"
        />
        <div class="flex items-center space-x-10">
          <div class="flex gap-4">
            <FormKit :type="darkModeInput" />
            <FormKit :type="autoDarkModeInput" />
          </div>
        </div>
      </FormKit>
    </div>
  </div>
</template>
