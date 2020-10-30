<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="dark"
      fixed="top"
    >
      <!-- <b-navbar-brand href="#">NavBar</b-navbar-brand> -->
      <b-navbar-toggle target="nav-collapse" />

      <b-collapse
        id="nav-collapse"
        is-nav
      >
        <b-navbar-nav>
          <b-nav-item href="https://isgondurasa.github.io">
            Blog
          </b-nav-item>
          <b-nav-item href="https://github.com/isgondurasa">
            Github
          </b-nav-item>
          <b-nav-item-dropdown
            text="Show"
            class=".drpdwn"
          >
            <b-dropdown-item>
              <router-link to="/path">
                Path Finding
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link to="/gems">
                Candy crush
              </router-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Toolbar',
  props: {
    routes: [
      { link: 'path-finding', name: 'Path Finding' },
      { link: 'gems', name: 'Gems' },
    ],
  },
};
</script>

<style scoped>
.drpdwn{
    padding: 8px;
    flex-direction: row;
    margin-top: 0;
    line-height: 1.5;
}
</style>
