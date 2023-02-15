<template>
  <div>
    <!-- <keep-alive> -->
    <component :is="getThemeMode.layout"></component>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import constants from "../../plugins/constants.js";
import Vue from 'vue';
import axios from 'axios';
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getThemeMode"])
  },
  methods: {

  },
    beforeMount(){
        axios.get(constants.resource_url + 'admin/organisations/'+ Vue.prototype.$keycloak.tokenParsed.organisationId )
            .then(org => {
                console.log('organisa',org.data.data);
                localStorage.setItem('organisationName', org.data.data.nom);
            })
            .catch(function(error) {
                console.log('organisations_error',error);
            });
    },
    mounted(){
        try{

            if(Vue.prototype.$keycloak.authenticated){

                this.loggedInUser = true
                this.$store.state.authData.username = Vue.prototype.$keycloak.tokenParsed.preferred_username
                this.$store.state.authData.role = Vue.prototype.$keycloak.tokenParsed.realm_access.roles
                localStorage.setItem('userinfo', JSON.stringify(Vue.prototype.$keycloak.tokenParsed));
                localStorage.setItem('firstname', Vue.prototype.$keycloak.tokenParsed.given_name);
                localStorage.setItem('lastname', Vue.prototype.$keycloak.tokenParsed.family_name);
                localStorage.setItem('id', Vue.prototype.$keycloak.tokenParsed.organisationId);
                //localStorage.setItem("autoCompleteSpinner", false);

                localStorage.setItem('roles', Vue.prototype.$keycloak.tokenParsed.role[0]);

                console.log('roles',Vue.prototype.$keycloak)
                console.log('roles',Vue.prototype.$keycloak.tokenParsed)



            }else{
                console.log('not logged')
            }
        }catch(e){
            console.log('error')
        }
    },

};
</script>
