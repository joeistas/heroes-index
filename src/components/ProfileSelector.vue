<template>
  <v-tabs slider-color="purple darken-3" v-if="item$">
    <v-tab :to="toProfile('basic')">Basic</v-tab>
    <v-tab :to="toProfile('skins')">Skins</v-tab>
    <v-tab :to="toProfile('vo')">VO</v-tab>
    <v-tab :to="toProfile('detailed')">Detailed</v-tab>
  </v-tabs>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { pluck, filter } from 'rxjs/operators'

  import { buildAssetUrl } from '../data/base'

  export default Vue.extend({
    props: [ 'item', 'version', 'toolbarOpen' ],
    methods: {
      toProfile: function(profile: string) {
        return {
          name: 'version',
          params: {
            realm: this.version$.realm,
            version: this.version$.buildNumber,
            item: this.itemType$,
            itemId: this.item$.id.toLowerCase(),
            profile
          }
        }
      },
    },
    subscriptions: function() {
      const store$ = this.$store
      return {
        item$: store$.pipe(pluck('selectedItem'), filter(item => item !== null)),
        itemType$: store$.pipe(pluck('params', 'itemType')),
        version$: store$.pipe(pluck('selectedVersion'), filter(version => version !== null)),
      }
    }
  })
</script>
