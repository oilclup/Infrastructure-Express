<template>
  <div class="d-flex bd-highlight">
  <div class="p-2 flex-grow-2 bd-highlight"><h4 class="d-flex align-items-start">{{ $t("t-sidebar.footer.lang") }} :</h4></div>
  <div class="p-2 bd-highlight">
    <div class="dropdown-multi-lang d-flex align-items-center">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuLangMulti" data-bs-toggle="dropdown"
        aria-expanded="false">
        {{ this.$i18n.locale }}
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuLangMulti">
        <li><a class="dropdown-item" @click="updateLocale('en')">en</a></li>
        <li><a class="dropdown-item" @click="updateLocale('th')">th</a></li>
      </ul>
    </div>
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
  