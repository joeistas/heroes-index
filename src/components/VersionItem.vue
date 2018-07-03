<template>
  <v-list-tile @click="onSelect()" :class="{ active }">
    <v-list-tile-content>
      <v-list-tile-title class="text-xs-right version-title" :class="titleClasses">{{ version.name }}</v-list-tile-title>
      <v-list-tile-sub-title class="text-xs-right">{{ versionDate }} - {{ version.versionNumber }}</v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<style scoped>
  .active .version-title {
    font-weight: 500;
  }
</style>

<script lang="ts">
  import Vue from "vue"
  import { format } from 'date-fns'

  import { VERSION_DATE_FORMAT } from '../data/versions'

  export default Vue.extend({
    props: {
      version: Object,
      active: Boolean,
    },
    computed: {
      versionDate: function() {
        return format(this.version.releaseDate, VERSION_DATE_FORMAT)
      },
      titleClasses: function() {
        return {
          "purple--text": this.active,
          "text--darken-3": this.active,
        }
      },
    },
    methods: {
      onSelect: function() {
        this.$router.push({ name: 'version', params: { realm: this.version.realm, version: this.version.buildNumber }})
      }
    },
  })
</script>
