<template>
  <div :selected="selected" @click="onSelect()">
    <v-container>
      <v-layout>
        <v-flex>
          <img :src="imageUrl"></img>
        </v-flex>
        <v-flex>
          <span>{{ hero.name }}</span>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  import { buildAssetUrl } from '../data/base'

  export default Vue.extend({
    props: [ 'hero', 'versionNumber', 'realm', 'selected' ],
    computed: {
      imageUrl: function() {
        return buildAssetUrl(this.hero.icon, this.versionNumber)
      }
    },
    methods: {
      onSelect: function() {
        this.$router.push({
          name: 'version',
          params: {
            realm: this.realm,
            version: this.versionNumber,
            item: 'heroes',
            itemId: this.hero.id.toLowerCase(),
          },
        })
      }
    },
  })
</script>
