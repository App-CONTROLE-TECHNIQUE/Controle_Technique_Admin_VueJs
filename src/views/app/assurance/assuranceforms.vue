<template>
        <b-overlay :show="show" rounded="sm" >
            <div class="panel-body" style="margin: auto; width:60%">

                    <span>Souscripteur</span>

                        <b-form-input

                                autocomplete="off"
                                type="text"
                                v-model="souscripteur"
                                placeholder=""
                                disabled

                        ></b-form-input>

                        <br/>
                        <div>
                            Vehicule concernee
                            <AutoComplete msg='assurance' @register="loadcartegrise" :spinner="spinner" :optionsKey="optionsKey"
                                          :optionsKey1="optionsKey1" :isVisiteOk="isVisiteOk" :onSelect="onSelect" ></AutoComplete>
                        </div>
                        <div style="margin: auto">
                            <vue-form-generator  :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
                        </div>

                        <b-button variant="danger m-1" @click="previous">
                            Annuler
                        </b-button>
                        <b-button variant="success m-1" @click="onSubmit">Enregistrer</b-button>
            </div>
        </b-overlay>
</template>



<script>
    import AutoComplete from "./Autocomplete"
    import axios from 'axios'
    import router from "../../../router";
    import store from "../../../store";
    import constants from "../../../plugins/constants"
    import assurance from './assuranceModel';
    import VueFormGenerator from 'vue-form-generator'
    import { mapGetters,mapActions } from "vuex";
    export default {
        data(){
            return{
                numimma:"",
                souscripteur:"",
                optionsKey:"numImmatriculation",
                optionsKey1:"proprietaireVehicule.partenaire.nom",
                name: "assuranceforms",
                spinner: false,
                show: false,
                onSelect: false,
                isVisiteOk: false,
                model: assurance,
                schema : {
                    "fields":[
                        {
                            "type": "input",
                            "inputType": "text",
                            "label": "police d'assurance",
                            "model": "police",
                            "placeholder": "police d'assurance",
                            "featured": true,
                            "required": true
                        },
                        {
                            "type": "input",
                            "inputType": "date",
                            "label": "date de début validité",
                            "model": "date_debut",
                            "placeholder": "date de début validité",
                            "featured": true,
                            "required": true
                        },
                        {
                            "type": "input",
                            "inputType": "date",
                            "label": "date de fin validité",
                            "model": "date_fin",
                            "placeholder": "date de fin validité",
                            "featured": true,
                            "required": true
                        },
                        {
                            "type": "input",
                            "inputType": "text",
                            "label": "Puissance Fiscale",
                            "model": "pf",
                            "placeholder": "Puissance Fiscale",
                            "featured": true,
                            "required": true
                        },
                        {
                            "type": "input",
                            "inputType": "text",
                            "label": "Montant Prime Assurance",
                            "model": "primeAssurance",
                            "placeholder": "Montant Prime Assurance",
                            "featured": true,
                            "required": true
                        }
                        ]
                },
                formOptions: {
                    validateAfterLoad: true,
                    validateAfterChanged: true,
                    validateAsync: true
                },
            }
        },
        components: {
            "vue-form-generator": VueFormGenerator.component,AutoComplete
        },


        computed: {
            ...mapGetters(["GETASSURANCE"]),
        },
        watch:{
            GETASSURANCE: function(value){
                this.cats = value
                console.log('files2',value);
            },
        },
        mounted(){

        },
        methods:{
            onSubmit(){
                this.show = true;
                this.model.souscripteur = store.state.souscripteur
                this.model.vehicule = store.state.numimma

                var userinfo = JSON.parse(localStorage.getItem('userinfo'))
                console.log("Form submitted!", userinfo);
                this.model.organisation = {id: userinfo.organisationId}
                console.log("Form submitted!", store.state.numimma);
                console.log('model to post',this.model)
                axios.post(constants.resource_url+'assurances', this.model)
                    .then(assurances => {

                        console.log('variant', assurances.data.data)

                        if (assurances.data.success) {

                            //this.$swal("Assurance enregistrée avec succès");

                            localStorage.setItem("rowes", JSON.stringify(assurances.data.data))

                            router.push({name: 'assurancelist'})

                            let routeDatas = router.resolve({
                                name: 'vignette2',
                                params: {rowes: "bonjour"}
                            });
                            window.open(routeDatas.href, '_blank');
                            // this.$router.push({ name: 'vignette1',params:assurances })
                            //objet client qui vient detre ajoute
                            //commit("SETASSURANCE", assurances.data.data)


                        } else {
                            this.makeToast(assurances.data.message, 'error')
                        }
                        this.show = false;
                    })
                    .catch(error =>{
                        this.$swal({
                            title: "Erreur",
                            text: assurances.data.msg,
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!"
                        })
                        this.sleep(3000)
                        this.$router.go(-1)
                })
            },
            sleep(ms) {
                return new Promise((resolve) => {
                    setTimeout(resolve, ms);
                });
            },
            previous(){
              this.$router.go(-1);
            },
            loadcartegrise(data){
                console.log('assurances',data);

                console.log('assurances',data.numImmatriculation);

                store.state.numimma = data.numImmatriculation

                localStorage.setItem("assurances",JSON.stringify(data))
                this.souscripteur = data.proprietaireVehicule.partenaire.nom +" "+data.proprietaireVehicule.partenaire.prenom
                store.state.souscripteur = data.proprietaireVehicule.partenaire.nom +" "+data.proprietaireVehicule.partenaire.prenom

            },

            ...mapActions(["registerAssurance"]),

            makeToast(variant = null,type="info") {
                console.log('Please fill the form correctly',variant)
                this.$toasted.show(variant,{type:type})
            },

            },

    }

</script>

<style scoped>

</style>