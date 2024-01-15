<template>
  <div>
    <Navbar />
    <div class="container-fluid">
      <div class="row">
        <Sidebar />

        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div class="content">
            <slot />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<!-- <template>
  <div>
    <Navbar />

  <div class="container-fluid">
  <div class="row">
    <Sidebar />
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div class="content">
        <slot />
      </div>
    </main>
  </div>
</div>
</div>

</template> -->

<script>
import Navbar from '@components/Navbar'
import Sidebar from '@components/Sidebar'

export default {
  components: { Navbar, Sidebar },
  data() {
    return {

    }
  },
  computed: {
  },
  created: () => {
    document.body.classList.remove('authentication-bg')
    document.body.classList.remove('authentication-bg-pattern')
    document.body.removeAttribute('data-layout')
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
        navigator.userAgent
      )
    ) {
      if (window.screen.width >= 728 && window.screen.width <= 1028) {
        document.body.classList.add('left-side-menu-condensed')
      }
    }
  },
  methods: {
    toggleMenu() {
      document.body.classList.toggle('left-side-menu-condensed')
      this.isMenuCondensed = !this.isMenuCondensed
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
          navigator.userAgent
        )
      ) {
        this.isMobileMenuOpened = !this.isMobileMenuOpened
        document.body.classList.toggle('sidebar-enable')
        if (window.screen.width <= 425) {
          document.body.classList.remove('left-side-menu-condensed')
        }
      }
    },
    toggleRightSidebar() {
      document.body.classList.toggle('right-bar-enabled')
    },
    hideRightSidebar() {
      document.body.classList.remove('right-bar-enabled')
    },
  },
}
</script>
