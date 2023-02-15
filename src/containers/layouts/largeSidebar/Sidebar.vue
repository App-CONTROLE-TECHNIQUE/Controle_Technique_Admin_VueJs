<template>
  <div
    class="side-content-wrap"
    @mouseenter="isMenuOver = true"
    @mouseleave="isMenuOver = false"
    @touchstart="isMenuOver = true"
  >
    <vue-perfect-scrollbar
      :settings="{ suppressScrollX: true, wheelPropagation: false }"
      :class="{ open: getSideBarToggleProperties.isSideNavOpen }"
      ref="myData"
      class="sidebar-left rtl-ps-none ps scroll"
    >
      <div>
        <ul class="navigation-left">
            <li
                    @mouseenter="toggleSubMenu"
                    :class="{ active: selectedParentMenu == 'dashboard' }"
                    class="nav-item"
                    data-item="dashboard"
                    :data-submenu="false"
            >
                <a class="nav-item-hold">
                    <router-link tag="a" class to="/app/dashboard">
                        <i class="nav-icon i-Dashboard"></i>
                        <span class="nav-text">{{ $t("Tableau de bord") }}</span>
                    </router-link>
                </a>
                <div class="triangle"></div>
            </li>
            <li
                @mouseenter="toggleSubMenu"
                :class="{ active: selectedParentMenu == 'caisse' }"
                class="nav-item"
                data-item="caisse"
                :data-submenu="true"
            >
                <a class="nav-item-hold">
                    <i class="nav-icon i-Money1"></i>
                    <span class="nav-text">{{ $t("Module Caisse") }}</span>
                </a>
                <div class="triangle"></div>
            </li>
            <li
                    @mouseenter="toggleSubMenu"
                    :class="{ active: selectedParentMenu == 'tech' }"
                    class="nav-item"
                    data-item="tech"
                    :data-submenu="true"
            >
                <a class="nav-item-hold">
                    <i class="nav-icon i-Engineering"></i>
                    <span class="nav-text">{{ $t("Module Technique") }}</span>
                </a>
                <div class="triangle"></div>
            </li>
            <li
                    @mouseenter="toggleSubMenu"
                    class="nav-item"
                    :class="{ active: selectedParentMenu == 'system' }"
                    data-item="system"
                    :data-submenu="true"
            >
                <a class="nav-item-hold" href="#">
                        <i class="nav-icon i-Gears"></i>
                        <span class="nav-text">{{ $t("Système") }}</span>
                </a>
                <div class="triangle"></div>
            </li>
        </ul>
      </div>
    </vue-perfect-scrollbar>
      <vue-perfect-scrollbar
              :class="{ open: getSideBarToggleProperties.isSecondarySideNavOpen }"
              :settings="{ suppressScrollX: true, wheelPropagation: false }"
              class="sidebar-left-secondary ps rtl-ps-none"
      >
          <div ref="sidebarChild">
              <!-- Submenu Dashboards -->
              <ul
                      class="childNav d-none"
                      data-parent="caisse"
                      :class="{ 'd-block': selectedParentMenu == 'caisse' }"
              >
                  <li class="nav-item">
                      <router-link tag="a" class to="/app/caisse-list">
                          <i class="nav-icon i-Cash-register-2"></i>
                          <span class="item-name">{{$t("Caisse")}}</span>
                      </router-link>
                  </li>

                  <li class="nav-item">
                      <router-link tag="a" class to="/app/caissier-list">
                          <i class="nav-icon i-Geek"></i>
                          <span class="item-name">{{$t("Caissier(ière)")}}</span>
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link tag="a" class to="/app/caisse/catproduct">
                          <i class="nav-icon i-Dropbox"></i>
                          <span class="item-name">{{$t("Catégorie de produit")}}</span>
                      </router-link>
                  </li>


                  <li class="nav-item">
                      <router-link tag="a" class to="/app/caisse/client">
                          <i class="nav-icon i-Shop-2"></i>
                          <span class="item-name">{{$t("Client")}}</span>
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link tag="a" class to="/app/caisse/contact">
                          <i class="nav-icon i-Business-Man"></i>
                          <span class="item-name">{{$t("Contact")}}</span>
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link tag="a" class to="/app/caisse/produit">
                          <i class="nav-icon i-Checkout-Bag"></i>
                          <span class="item-name">{{$t("Produit")}}</span>
                      </router-link>
                  </li>

                  <li class="nav-item">
                      <router-link tag="a" class to="/app/caisse/sessionCaisse-list">
                          <i class="nav-icon i-Billing"></i>
                          <span class="item-name">{{$t("Session")}}</span>
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link tag="a" class to="/app/caisse/taxe">
                          <i class="nav-icon i-Coins"></i>
                          <span class="item-name">{{$t("Taxe")}}</span>
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link tag="a" class to="/app/caisse/vente-list">
                          <i class="nav-icon i-Cash-Register"></i>
                          <span class="item-name">{{$t("Vente")}}</span>
                      </router-link>
                  </li>
              </ul>
              <ul
                      class="childNav d-none"
                      data-parent="tech"
                      :class="{ 'd-block': selectedParentMenu == 'tech' }"
              >
                  <li class="nav-item">
                      <router-link tag="a" class to="/app/visite/energie-list">
                          <i class="nav-icon i-Flash"></i>
                          <span class="item-name">{{$t("Energie")}}</span>
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link tag="a" class to="/app/visite/marque-list">
                          <i class="nav-icon i-Tag-4"></i>
                          <span class="item-name">{{$t("Marque")}}</span>
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link tag="a" class to="/app/visite/vehicule-list">
                          <i class="nav-icon i-Car-2"></i>
                          <span class="item-name">{{$t("Véhicule")}}</span>
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link tag="a" class to="/app/visite/proprietaire-list">
                          <i class="nav-icon i-Administrator"></i>
                          <span class="item-name">{{$t("Propriétaire de véhicule")}}</span>
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link tag="a" class to="/app/visite/carteGrise-list">
                          <i class="nav-icon i-Folders"></i>
                          <span class="item-name">{{$t("Carte Grise")}}</span>
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link tag="a" class to="/app/visite/controleur-list">
                          <i class="nav-icon i-Engineering"></i>
                          <span class="item-name">{{$t("Contrôleur")}}</span>
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link tag="a" class to="/app/visite/machine-list">
                          <i class="nav-icon i-Computer-2"></i>
                          <span class="item-name">{{$t("Machine")}}</span>
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link tag="a" class to="/app/visite/constructeur-list">
                          <i class="nav-icon i-Building"></i>
                          <span class="item-name">{{$t("Constructeur")}}</span>
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link tag="a" class to="/app/visite/lexique/lexique-list">
                          <i class="nav-icon i-Book"></i>
                          <span class="item-name">{{$t("Lexique")}}</span>
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link tag="a" class to="/app/visite/formule-list">
                          <i class="nav-icon i-Statistic"></i>
                          <span class="item-name">{{$t("Formule")}}</span>
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link tag="a" class to="/app/visite/seuil-list">
                          <i class="nav-icon i-Door"></i>
                          <span class="item-name">{{$t("Seuil")}}</span>
                      </router-link>
                  </li>

                  <li class="nav-item">
                      <router-link tag="a" class to="/app/visite/ligne-list">
                          <i class="nav-icon i-Road-2"></i>
                          <span class="item-name">{{$t("Ligne")}}</span>
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link tag="a" class to="/app/visite/constructeurModel-list">
                          <i class="nav-icon i-Tag-4"></i>
                          <span class="item-name">{{$t("Modèle de Constructeur")}}</span>
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link tag="a" class to="/app/visite/visite-list">
                          <i class="nav-icon i-Magnifi-Glass1"></i>
                          <span class="item-name">{{$t("Visite")}}</span>
                      </router-link>
                  </li>
                  <!--li class="nav-item">
                      <router-link tag="a" class to="/">
                          <i class="nav-icon i-CMYK"></i>
                          <span class="item-name">{{$t("Inspection")}}</span>
                      </router-link>
                  </li-->

              </ul>
              <ul
                      class="childNav d-none"
                      data-parent="system"
                      :class="{ 'd-block': selectedParentMenu == 'system' }"
              >
                  <li class="nav-item">
                      <router-link tag="a" class to="/app/organisation/organisation-list">
                          <i class="nav-icon i-Home-4"></i>
                          <span class="item-name">{{$t("Organisation")}}</span>
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link tag="a" class to="/app/score">
                          <i class="nav-icon i-Medal-2"></i>
                          <span class="item-name">{{$t("Score")}}</span>
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link tag="a" class to="/app/user/user-list">
                          <i class="nav-icon i-Add-User"></i>
                          <span class="item-name">{{$t("Utilisateur")}}</span>
                      </router-link>
                  </li>

              </ul>
          </div>
      </vue-perfect-scrollbar>

    <div
      @click="removeOverlay()"
      class="sidebar-overlay"
      :class="{ open: getSideBarToggleProperties.isSecondarySideNavOpen }"
    ></div>
  </div>
  <!--=============== Left side End ================-->
</template>

<script>
import Topnav from "./TopNav";
import { isMobile } from "mobile-device-detect";

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Topnav
  },

  data() {
    return {
      isDisplay: true,
      isMenuOver: false,
      isAdmin: false,
      userinfo:{},
      isStyle: true,
      selectedParentMenu: "",
      isMobile
    };
  },
  mounted() {
    this.userinfo = JSON.parse(localStorage.getItem('userinfo'))
    //this.isitAdmin();
    //console.log('is admin ?', this.isAdmin)
    this.toggleSelectedParentMenu();
    window.addEventListener("resize", this.handleWindowResize);
    document.addEventListener("click", this.returnSelectedParentMenu);
    this.handleWindowResize();
  },

  beforeDestroy() {
    document.removeEventListener("click", this.returnSelectedParentMenu);
    window.removeEventListener("resize", this.handleWindowResize);
  },
  computed: {
    ...mapGetters(["getSideBarToggleProperties"])
  },

  methods: {
    ...mapActions([
      "changeSecondarySidebarProperties",
      "changeSecondarySidebarPropertiesViaMenuItem",
      "changeSecondarySidebarPropertiesViaOverlay",
      "changeSidebarProperties"
    ]),
    isitAdmin(){
        if(this.userinfo.role.find(this.findRole))
            this.isAdmin = true;
    },
    findRole(role){
        return role === 'admin';
    },
    handleWindowResize() {
      //  console.log('not working is Mobile');
      if (window.innerWidth <= 1200) {
        if (this.getSideBarToggleProperties.isSideNavOpen) {
          this.changeSidebarProperties();
        }
        if (this.getSideBarToggleProperties.isSecondarySideNavOpen) {
          this.changeSecondarySidebarProperties();
        }
      } else {
        if (!this.getSideBarToggleProperties.isSideNavOpen) {
          this.changeSidebarProperties();
        }
      }
    },
    toggleSelectedParentMenu() {
      const currentParentUrl = this.$route.path
        .split("/")
        .filter(x => x !== "")[1];

      if (currentParentUrl !== undefined || currentParentUrl !== null) {
        this.selectedParentMenu = currentParentUrl.toLowerCase();
        this.selectedParentMenu = currentParentUrl.toLowerCase();
      } else {
        this.selectedParentMenu = "dashboards";
      }
    },
    toggleSubMenu(e) {
      let hasSubmenu = e.target.dataset.submenu;
      let parent = e.target.dataset.item;
      if (hasSubmenu) {
        this.selectedParentMenu = parent;

        this.changeSecondarySidebarPropertiesViaMenuItem(true);
      } else {
        this.selectedParentMenu = parent;
        this.changeSecondarySidebarPropertiesViaMenuItem(false);
      }
    },

    removeOverlay() {
      this.changeSecondarySidebarPropertiesViaOverlay();
      if (window.innerWidth <= 1200) {
        this.changeSidebarProperties();
      }
      this.toggleSelectedParentMenu();
    },
    returnSelectedParentMenu() {
      if (!this.isMenuOver) {
        this.toggleSelectedParentMenu();
      }
    },

    toggleSidebarDropdwon(event) {
      let dropdownMenus = this.$el.querySelectorAll(".dropdown-sidemenu.open");

      event.currentTarget.classList.toggle("open");

      dropdownMenus.forEach(dropdown => {
        dropdown.classList.remove("open");
      });
    }
  }
};
</script>

<style lang="" scoped>
</style>
