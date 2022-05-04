// https://github.com/greyby/vue-spinner/blob/master/src/PulseLoader.vue

<template>
  <div class="v-spinner" v-show="loading">
    <div
      class="v-pulse v-pulse1"
      :class="[color_class]"
      v-bind:style="[spinnerStyle, spinnerDelay1]"
    ></div>
    <div
      class="v-pulse v-pulse2"
      :class="[color_class]"
      v-bind:style="[spinnerStyle, spinnerDelay2]"
    ></div>
    <div
      class="v-pulse v-pulse3"
      :class="[color_class]"
      v-bind:style="[spinnerStyle, spinnerDelay3]"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

// interface Props {
//   loading?: boolean;
//   color?: string;
//   size?: string;
//   margin?: string;
//   radius?: string;
// }

// const props = defineProps<{
//   loading?: {
//     type: boolean;
//     default: true;
//   };
//   color?: {
//     type: string;
//     default: "#5dc596";
//   };
//   size?: {
//     type: string;
//     default: "15px";
//   };
//   margin?: {
//     type: string;
//     default: "2px";
//   };
//   radius?: {
//     type: string;
//     default: "100%";
//   };
// }>();

const props = defineProps<{
  loading?: boolean;
  color?: string;
  color_class?: string;
  size?: string;
  margin?: string;
  radius?: string;
}>();

//const props = defineProps<Props>();
const loading = computed(() => props.loading ?? true);
let color = props.color ?? "#0049d2";
let color_class = "";
if (props.color_class && !props.color) {
  color = "";
  color_class = props.color_class ?? "";
}
const size = props.size ?? "15px";
const margin = props.margin ?? "2px";
const radius = props.radius ?? "100%";

const spinnerStyle = {
  backgroundColor: color,
  width: size,
  height: size,
  margin: margin,
  borderRadius: radius,
  display: "inline-block",
  animationName: "v-pulseStretchDelay",
  animationDuration: "0.75s",
  animationIterationCount: "infinite",
  animationTimingFunction: "cubic-bezier(.2,.68,.18,1.08)",
  animationFillMode: "both",
};

const spinnerDelay1 = {
  animationDelay: "0.12s",
};

const spinnerDelay2 = {
  animationDelay: "0.24s",
};

const spinnerDelay3 = {
  animationDelay: "0.36s",
};
</script>

<style>
/*.v-spinner
{
    margin: 100px auto;
    text-align: center;
}
*/

@-webkit-keyframes v-pulseStretchDelay {
  0%,
  80% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-opacity: 1;
    opacity: 1;
  }
  45% {
    -webkit-transform: scale(0.1);
    transform: scale(0.1);
    -webkit-opacity: 0.7;
    opacity: 0.7;
  }
}

@keyframes v-pulseStretchDelay {
  0%,
  80% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-opacity: 1;
    opacity: 1;
  }
  45% {
    -webkit-transform: scale(0.1);
    transform: scale(0.1);
    -webkit-opacity: 0.7;
    opacity: 0.7;
  }
}
</style>
