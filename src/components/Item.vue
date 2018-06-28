<template>
  <v-flex xs3>
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

<style scoped>
  .item {
    background-color: #FFFFFF;
  }

  .item:hover {
    background-color: #F3E5F5;
  }

  .selected .item,
  .selected .item:hover {
    background-color: #6A1B9A;
  }

  .item-layout {
    min-height: 65px;
  }

  .item-image {
    display: block;
    width: 50px;
    height: 50px;
  }

  .item-text {
    text-align: center;
    font-weight: 500;
    color: #757575;
  }

  .item:hover .item-text {
    color: #212121;
  }

  .selected .item:hover .item-text,
  .selected .item-text {
    color: #FFFFFF;
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
