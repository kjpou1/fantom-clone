<template>
  <div class="mt-4">
    <h1
      class="text-3xl font-bold mb-5 transition-colors duration-500 dark:text-white"
    >
      <slot name="header"></slot>
    </h1>
    <header>
      <div
        class="p-10 transition-colors duration-500 bg-white dark:bg-dark_primary hover:bg-white rounded-2xl shadow-lg"
      >
        <slot name="body"></slot>
      </div>
    </header>
  </div>
</template>
