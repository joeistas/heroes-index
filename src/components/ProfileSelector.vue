<template>
  <v-tabs slider-color="purple darken-3" color="transparent" v-if="item$" :value="profileIndex$">
      <v-tab
      v-for="profile in profiles"
      @click="tabClicked(profile)"
      >
      {{ profile }}
    </v-tab>
  </v-tabs>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { pluck, filter, map } from 'rxjs/operators'

  export default Vue.extend({
    data: function() {
      return {
        profiles: ['basic', 'skins', 'vo', 'detailed']
      }
    },
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
      tabClicked: function(profile: string) {
        this.$router.push(this.toProfile(profile))
      }
    },
    subscriptions: function() {
      const store$ = this.$store

      return {
        item$: store$.pipe(pluck('selectedItem'), filter(item => item !== null)),
        itemType$: store$.pipe(pluck('params', 'itemType')),
        version$: store$.pipe(pluck('selectedVersion'), filter(version => version !== null)),
        profileIndex$: store$.pipe(
          pluck('params', 'profile'),
          map(profile => this.profiles.indexOf(profile)),
        ),
      }
    }
  })
</script>
