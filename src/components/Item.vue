<template>
  <v-flex xs12 md3>
    <v-list-tile :avator="hasImage" :to="to">
      <v-list-tile-avatar v-if="hasImage">
        <img :src="imageUrl" />
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>{{ item.name }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-flex>
</template>

<style>
  a.primary--text {
    color: #6A1B9A !important;
    font-weight: 500;
  }
</style>

<script lang="ts">
  import Vue from 'vue'

  import { buildAssetUrl } from '../data/base'

  export default Vue.extend({
    props: [ 'item', 'versionNumber', 'to' ],
    computed: {
      hasImage: function() {
        return !!this.item.icon
      },
      imageUrl: function() {
        return buildAssetUrl(this.item.icon, this.versionNumber)
      }
    },
  })
</script>
