<script setup lang="ts">
import { useModalsStore } from "@/stores/modals";
import { ref, VueElement, watch } from "vue";

const useModals = useModalsStore();

const { whichWalletTab } = useModals;

const duration = "300ms";

let prevIndex = 0;
let currentIndex = 0;
watch(whichWalletTab, (after, before) => {
  prevIndex = before;
  currentIndex = after;
});

const beforeEnter = (el: VueElement) => {
  //console.log("beforeEnter", el);
  el.style.animationDuration = duration;
  el.style.animationName =
    prevIndex < currentIndex ? "slide-in-right-vue" : "slide-in-left-vue";
  el.style.position = "absolute";
};
const enter = (el: VueElement) => {
  //console.log("enter", el);
};
const afterEnter = (el: VueElement) => {
  //console.log("afterEnter", el);
  el.style.position = "";
};
const beforeLeave = (el: VueElement) => {
  //console.log("beforeLeave", el);
  el.style.animationDuration = duration;
  el.style.animationName =
    prevIndex < currentIndex ? "slide-out-right-vue" : "slide-out-left-vue";
  el.style.position = "absolute";
};
const leave = (el: VueElement) => {
  //console.log("leave", el);
};
const afterLeave = (el: VueElement) => {
  //console.log("afterLeave", el);
  el.style.position = "";
};
</script>

<template>
  <Transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <slot></slot>
  </Transition>
</template>

<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 3s ease;
}

fade-leave-to {
  opacity: 0;
}

fade-leave-active {
  transition: opacity 3s ease;
}

@keyframes slide-in-right-vue {
  0% {
    margin-left: -100%;
    width: 0%;
    opacity: 0;
  }
  100% {
    margin-left: 0;
    width: 100%;
    opacity: 1;
  }
}

@keyframes slide-in-left-vue {
  0% {
    margin-left: 100%;
    width: 300%;
    opacity: 0;
  }
  100% {
    margin-left: 0;
    width: 100%;
    opacity: 1;
  }
}

@keyframes slide-out-right-vue {
  0% {
    margin-left: 0%;
    width: 100%;
    opacity: 1;
  }
  100% {
    margin-left: 100%;
    width: 0%;
    opacity: 0;
  }
}

@keyframes slide-out-left-vue {
  0% {
    margin-left: 0%;
    width: 100%;
    opacity: 1;
  }
  100% {
    margin-left: -100%;
    width: 0%;
    opacity: 0;
  }
}

@keyframes wobble {
  0% {
    transform: translateY(-60px);
    opacity: 0;
  }
  50% {
    transform: translateY(0px);
    opacity: 1;
  }
  60% {
    transform: translateX(8px);
  }
  70% {
    transform: translateX(-8px);
  }
  80% {
    transform: translateX(4px);
  }
  90% {
    transform: translateX(-4px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
