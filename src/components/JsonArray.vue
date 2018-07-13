<template>
  <v-container grid-list-md class="json-array">
    <v-layout class="mt-0">
      <v-flex xs12>
        <v-btn flat class="json-array-key ma-0" @click="onClick()">
          {{ propertyKey }}
          <v-icon>{{ expand ? 'arrow_drop_up' : 'arrow_drop_down' }}</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <collapse-transition>
      <v-layout column v-if="expand" class="json-array-properties px-3 mb-3">
        <v-flex v-for="(value, index) in propertyValue" xs11 class="json-array-property">
          <json-property :property-value="value"></json-property>
        </v-flex>
      </v-layout>
    </collapse-transition>
  </v-container>
</template>

<style scoped>
  .json-array {
    margin-left: -16px;
  }

  .json-array-key {
    text-transform: none;
  }

  .json-array-properties {
    border-top: 1px solid #BDBDBD;
    border-bottom: 1px solid #BDBDBD;
  }

  .json-array-property {
    border-bottom: 1px solid #EEEEEE;
  }

  .json-array-property:last-child {
    border-bottom: none;
  }
</style>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: "json-array",
    components: {
      "json-property": () => import("./JsonProperty.vue")
    },
    props: {
      propertyKey: String,
      propertyValue: Array,
    },
    data: function() {
      return {
        expand: false,
      }
    },
    methods: {
      onClick: function() {
        this.expand = !this.expand
      },
    },
  })
</script>
