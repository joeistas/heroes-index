<template>
  <v-layout row wrap>
    <v-flex v-for="hero in heroes" :key="hero.id">
      <hero-item
        :hero="hero"
        :selected="isSelected(hero)"
        :realm="realm"
        :versionNumber="version.buildNumber"
        @click="onSelect(hero)"
        >
      </hero-item>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import Vue from 'vue'

  import HeroItem from './HeroItem.vue'

  export default Vue.extend({
    components: {
      "hero-item": HeroItem
    },
    props: [ 'heroes', 'realm', 'version', 'selected' ],
    methods: {
      onSelect: function(item: any) {
        this.router$.push({
          name: 'version',
          params: {
            realm: this.realm,
            version: this.version.buildNumber,
            item: 'heroes',
            itemId: item.id,
          },
        })
      },
      isSelected: function(hero: any) {
        if(!this.selected) {
          return false
        }

        return hero.id === this.selected.id
      },
    }
  })
</script>
