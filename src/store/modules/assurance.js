import axios from 'axios'
import constants from "../../plugins/constants"

const state = {
    assurance:[],
    assurances:{},
    numimma:"",
    souscripteur:"",
    selfs:""
};

const actions = {
    async registerAssurance({commit},data){

        axios.post(constants.resource_url + "assurances",data)

            .then(assurances => {

                console.log('variant',assurances)

                if(assurances.data.success) {

                    //objet client qui vient detre ajoute
                    commit("SETASSURANCE", assurances.data.data)

                }
            })
            .catch(function(error) {

                console.log('customer_create_error',error);
                // Handle Errors here.
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // console.log(error);
                //commit("setError", error);
                // ...

            });

    },
}

const getters = {
    GETASSURANCE: state => state.assurance,
}

const mutations = {
    SETASSURANCE : (state,val)=>state.assurance=val

}

export default {
    state,getters,actions,mutations
}