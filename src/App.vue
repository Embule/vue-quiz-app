<script setup lang="ts"></script>

<template>
  <h1>Quiz</h1>
  <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
  <nav>
    <RouterLink to="/quiz">Go to Quiz</RouterLink>
    <RouterLink to="/summary">Go to Summary</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
