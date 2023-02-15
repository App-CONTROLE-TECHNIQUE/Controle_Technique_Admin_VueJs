<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  authenticated :false,
  
  mounted(){
    try{
      if(Vue.prototype.$keycloak.authenticated){
        this.authenticated = true;
        //this.user.username = vue.prototype.userName;
        //this.user.role = Vue.prototype.$keycloak.tokenParsed.email;
      }
      else{
        console.log('Not logged');
      }
    } catch(e){

    }

  },
  data: () => ({
    //
  }),
};
</script>
