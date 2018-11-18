<template>
  <v-menu id="#version-select" offset-y left max-height="80vh">
    <v-btn slot="activator" class="version-activator" flat dark>
      <span v-if="selected">{{ selected.name }} ({{ selectedVersionDate }})</span>
      <v-icon>arrow_drop_down</v-icon>
    </v-btn>
    <version-list
      :versions="versions"
      :selected="selected"
      :item-type="itemType"
      :item-id="itemId"
      :profile="profile"
      >
    </version-list>
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
  import VersionList from './VersionList.vue'
  import VersionItem from './VersionItem.vue'

  export default Vue.extend({
    components: {
      'version-item': VersionItem,
      'version-list': VersionList,
    },
    props: {
      selected: Object,
      versions: Array,
      itemType: String,
      itemId: String,
      profile: String,
    },
    computed: {
      selectedVersionDate: function() {
        return format(this.selected.releaseDate, VERSION_DATE_FORMAT)
      },
    },
  })
</script>
