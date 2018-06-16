<template>
  <div class="version">
    {{ version.name }} -- {{ version.buildNumber }}
  </div>
</template>

<script lang="ts">
  import Vue from "vue"

  export default Vue.extend({
    props: {
      version: Object
    }
  })
</script>
