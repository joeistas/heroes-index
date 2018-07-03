<template>
  <fade-transition>
    <div v-if="show" class="content-overlay">
      <v-layout align-center justify-center class="overlay-layout white">
        <v-flex>
          <vue-simple-spinner v-if="spinner" size="large" line-fg-color="#6A1B9A"></vue-simple-spinner>
        </v-flex>
      </v-layout>
    </div>
  </fade-transition>
</template>

<style scoped>
  .content-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;
  }

  .overlay-layout {
    width: 100%;
    height: 100%;
    opacity: 0.7;
  }
</style>

<script lang="ts">
  import Vue from 'vue'
  import Spinner from 'vue-simple-spinner'

  export default Vue.extend({
    props: {
      show: Boolean,
      spinner: Boolean
    },
    components: {
      'vue-simple-spinner': Spinner,
    }
  })
</script>
