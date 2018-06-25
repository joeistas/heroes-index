<template>
  <div v-if="item$">
    <h3>{{ item$.name }} -- {{ item$.id }}</h3>
    <v-tabs>
      <v-tab :to="toProfile('basic')">Basic</v-tab>
      <v-tab :to="toProfile('skins')">Skins</v-tab>
      <v-tab :to="toProfile('vo')">VO</v-tab>
      <v-tab :to="toProfile('detailed')">Detailed</v-tab>
    </v-tabs>
    <div>
      <json-property v-for="(value, key) in json$" :key="key" :propertyKey="key" :propertyValue="value"></json-property>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { pluck, map } from 'rxjs/operators'

  import JsonProperty from './JsonProperty.vue'

  const PROFILES = [ 'basic', 'skins', 'vo', 'detailed' ]

  export default Vue.extend({
    components: {
      "json-property": JsonProperty
    }
    methods: {
      toProfile: function(profile: string) {
        return {
          name: 'version',
          params: {
            realm: this.version$.realm,
            version: this.version$.buildNumber,
            item: this.params$.itemType,
            itemId: this.item$.id.toLowerCase(),
            profile
          }
        }
      },
    },
    subscriptions: function() {
      const store$ = this.$store
      return {
        item$: store$.pipe(pluck('selectedItem')),
        json$: store$.pipe(pluck('itemJSON')),
        params$: store$.pipe(pluck('params')),
        version$: store$.pipe(pluck('selectedVersion')),
      }
    }
  })
</script>
