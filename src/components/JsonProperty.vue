<template>
  <component class="json-property" :is="propertyComponent" :property-key="propertyKey" :property-value="propertyValue"></component>
</template>

<style scoped>
  .json-property {
    border-bottom: 1px solid #EEEEEE;
  }

  .json-property:last-child {
    border-bottom: none;
  }
</style>

<script lang="ts">
  import Vue from 'vue'

  import JsonValue from './JsonValue.vue'
  import JsonBoolean from './JsonBoolean.vue'
  import JsonObject from './JsonObject.vue'
  import JsonArray from './JsonArray.vue'
  import JsonImage from './JsonImage.vue'
  import JsonHtml from './JsonHtml.vue'

  const ASSET_REGEXP = /^mods\/.*\..{3}$/

  export default Vue.extend({
    name: "json-property",
    props: [ 'propertyKey', 'propertyValue' ],
    components: {
      'json-boolean': JsonBoolean,
      'json-value': JsonValue,
      'json-object': JsonObject,
      'json-array': JsonArray,
      'json-image': JsonImage,
      'json-html': JsonHtml,
    },
    computed: {
      propertyComponent: function() {
        switch(typeof this.propertyValue) {
          case 'object':
            return Array.isArray(this.propertyValue) ? 'json-array' : 'json-object'

          case 'boolean':
            return 'json-boolean'

          case 'string':
            if(this.propertyValue.includes("<span>")) {
              return 'json-html'
            }

            if(ASSET_REGEXP.test(this.propertyValue)) {
              return this.propertyValue.endsWith(".dds") ? 'json-image' : "json-value"
            }

            return 'json-value'

          default:
            return 'json-value'
        }
      },
    }
  })
</script>
