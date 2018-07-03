<template>
  <v-menu id="#version-select" offset-y left>
    <v-btn slot="activator" class="version-activator" flat dark>
      <span v-if="selected">{{ selected.name }} ({{ selectedVersionDate }})</span>
      <v-icon>arrow_drop_down</v-icon>
    </v-btn>
    <v-list dense two-line>
      <version-item
        v-for="version in versions"
        :key="version.buildNumber"
        :version="version"
        :active="selected.buildNumber === version.buildNumber"
        >
      </version-item>
    </v-list>
  </v-menu>
</template>

<style scoped>
  .version-activator {
    text-transform: none;
  }
</style>

<script lang="ts">
  import Vue from 'vue'
  import { format } from 'date-fns'

  import { VERSION_DATE_FORMAT } from '../data/versions'
  import VersionItem from './VersionItem.vue'
  import { getStoreObservable } from '../data/store'
  import { fetchAllVersions } from '../data/versions'

  export default Vue.extend({
    components: {
      'version-item': VersionItem,
    },
    props: {
      selected: Object,
      versions: Array,
    },
    computed: {
      selectedVersionDate: function() {
        return format(this.selected.releaseDate, VERSION_DATE_FORMAT)
      },
    },
    methods: {
      onSelect: function(version) {
        this.$router.push({ name: 'version', params: { realm: version.realm, version: version.buildNumber }})
      }
    },
  })
</script>
