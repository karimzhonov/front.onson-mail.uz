<script>
import router from "@/router";
import {useLayout} from '@/layout/composables/layout';
import store from "@/store";
const {changeThemeSettings ,onMenuToggle, layoutConfig} = useLayout();

export default {
  props: ['lang'],
  data() {
    this.$i18n.locale = this.lang
    return {
      outsideClickListener: null,
      topbarMenuActive: false,
      mode_chack: false,
    }
  },
  async mounted() {
    this.mode_chack = window.matchMedia("(prefers-color-scheme:dark)").matches
    this.bindOutsideClickListener();
    this.darkMode = false
  },
  beforeUnmount() {
    this.unbindOutsideClickListener();
  },
  methods: {
    onMenuToggle,
    onTopBarMenuButton() {
      this.topbarMenuActive = !this.topbarMenuActive;
    },
    onSettingsClick() {
      this.topbarMenuActive = false;
      router.push({'name': 'settings'});
    },
    bindOutsideClickListener() {
      if (!this.outsideClickListener) {
        this.outsideClickListener = (event) => {
          if (this.isOutsideClicked(event)) {
            this.topbarMenuActive = false;
          }
        };
        document.addEventListener('click', this.outsideClickListener);
      }
    },
    unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        document.removeEventListener('click', this.outsideClickListener);
        this.outsideClickListener = null;
      }
    },
    isOutsideClicked(event) {
      if (!this.topbarMenuActive) return;

      const sidebarEl = document.querySelector('.layout-topbar-menu');
      const topbarEl = document.querySelector('.layout-topbar-menu-button');

      return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
    },
    language_change(e) {
      const params = {...this.$route.params}
      params.lang = e.value
      this.$router.push({'name': this.$route.name, params, query: this.$route.query})
      this.$i18n.locale = e.value
      this.$i18n.fallbackLocale = e.value
    },

    onChangeTheme () {
    const mode = this.darkMode
    // store.commit('basic', {key: 'darkMode', value: !mode})
    const theme = mode ? 'lara-light-indigo' : 'lara-dark-indigo'
    const elementId = 'theme-css';
    const linkElement = document.getElementById(elementId);
    const cloneLinkElement = linkElement.cloneNode(true);
    const newThemeUrl = linkElement.getAttribute('href').replace(layoutConfig.theme.value, theme);
    cloneLinkElement.setAttribute('id', elementId + '-clone');
    cloneLinkElement.setAttribute('href', newThemeUrl);
    cloneLinkElement.addEventListener('load', () => {
        linkElement.remove();
        cloneLinkElement.setAttribute('id', elementId);
        changeThemeSettings(theme, mode);
    });
    linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);
  },
  async onNavbarLogoutButton() {
      store.commit('basic', {key: 'token', value: ''})
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      await this.$router.push({name: 'login'})
    },
    async onNavbarLoginButton() {
      await this.$router.push({name: 'login'})
    }
  },
  computed: {
    topbarMenuClasses() {
      return {
        'layout-topbar-menu-mobile-active': this.topbarMenuActive
      };
    },
    language_menu_items: () => store.getters.get_languages,
    selected_lang: () => store.getters.get_selected_lang,
    logo_panel() {
        return true ? this.navbar_icon_1 : this.navbar_icon_1_dark
    },
    logo_city() {
      return true ? this.navbar_icon_2 : this.navbar_icon_2_dark
    },  
    darkMode: () => store.state.darkMode,
    is_auth: () => store.state.token,
    navbar_items() {return []
  }}
}
</script>

<template>
  <div class="layout-topbar d-flex justify-content-between">
    <div to="/" class="layout-topbar-logo">
      <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
        <i class="pi pi-bars"></i>
      </button>
      <a style="color: var(--surface-900);" href="/" class="text-decoration-none">
        <img src="/img/icons/favicon.png" alt="logo" />
        <span>Onson Mail</span>
      </a>
    </div>

    <button class="p-link layout-topbar-menu-button layout-topbar-button ml-2" @click="onTopBarMenuButton()">
      <i class="pi pi-ellipsis-v"></i>
    </button>

    <div class="layout-topbar-menu m-0" :class="topbarMenuClasses">
      <Dropdown class="ml-3" :options="language_menu_items" optionLabel="lang"
                optionValue="code" :model-value="lang"
                @change="language_change" inputStyle="padding: 1rem"
      />
      <button v-if="!is_auth" @click="onNavbarLoginButton()" class="p-link layout-topbar-button m-auto">
        <i class="pi pi-sign-in"></i>
        <span>{{ $t("Войти") }}</span>
      </button>
      <button v-if="is_auth" @click="onNavbarLogoutButton()" class="p-link layout-topbar-button m-auto">
        <i class="pi pi-sign-out"></i>
        <span>{{ $t("Выйти") }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.navbar-logo-text {
  font-size: 0.7rem;
  margin: 0 !important;
  max-width: 70px;
  color: var(--surface-900);
}

.navbar-logo {
  height: 9rem;
}
</style>
