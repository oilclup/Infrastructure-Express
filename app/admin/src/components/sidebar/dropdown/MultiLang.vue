<template>
<div>
  <div class="dropdown">
      <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuLangMulti" data-bs-toggle="dropdown"
        aria-expanded="false">
        {{ this.$i18n.locale }}
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuLangMulti">
        <li><a class="dropdown-item" @click="updateLocale('en')">en</a></li>
        <li><a class="dropdown-item" @click="updateLocale('th')">th</a></li>
      </ul>
    </div>
</div>
</template>
  
<script>
import { genericMethods } from '@store/helpers'

export default {
  methods: {
    ...genericMethods,
    updateLocale(locale) {
      this.switchLocale(locale);
      this.$i18n.locale = locale
    }
  },
};

</script>
  