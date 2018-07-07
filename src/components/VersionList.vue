<template>
  <v-list dense two-line>
    <version-item
      v-for="version in versions"
      :key="version.buildNumber"
      :version="version"
      :active="selected && version ? selected.buildNumber === version.buildNumber : false"
      >
    </version-item>
  </v-list>
</template>

<style scoped>
  .version-activator {
    text-transform: none;
  }
</style>

<script lang="ts">
  import Vue from 'vue'

  import VersionItem from './VersionItem.vue'

  export default Vue.extend({
    name: 'version-list',
    components: {
      'version-item': VersionItem,
    },
    props: {
      selected: Object,
      versions: Array,
    },
  })
</script>
