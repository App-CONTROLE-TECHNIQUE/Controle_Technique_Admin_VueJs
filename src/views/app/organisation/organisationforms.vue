<template>
    <b-overlay :show="showed" rounded="lg" >
        <div class="panel-body" style="margin: auto; width:60%">
            <div style="margin: auto">
                <vue-form-generator  :schema="schema" :model="model" :options="formOptions" ></vue-form-generator>
                <b-button variant="danger m-1" @click="previous">
                    Annuler
                </b-button>
                <b-button variant="success m-1" @click="onSubmit">Enregistrer</b-button>
            </div>
        </div>
    </b-overlay>
</template>

<script>
    import axios from 'axios'
    import router from "../../../router";
    import organisation from './organisationModel';
    import add from './organisationAddFields';
    import constants from '../../../plugins/constants'
    import VueFormGenerator from 'vue-form-generator'
    export default {
        name: "Organisationforms",
        data() {
            return{
                showed:false
            }
        },
        props:{
            msg:String,
            schema:Object,
            model:Object,
            formOptions:Object,
            show: Boolean,
            spinner: Boolean,
            onSelect: Boolean,
            dialog2:Boolean
        },

        components:{
            "vue-form-generator": VueFormGenerator.component
        },
        methods:{
            onSubmit(){
                this.showed =true;
                console.log('Model to record', this.model)
                axios.post(constants.resource_urs+ '/api/v1/admin/organisations', this.model)
                    .then(org=>{
                        console.log('added organisation', org.data.data);
                        this.showed=false;
                        Object.assign(this.model, organisation)
                        Object.assign(this.schema, add)
                        this.$router.go(-1);
                    })
            },
            previous(){
                this.$router.go(-1);
                Object.assign(this.model, organisation)
            }
        }
    }
</script>

<style scoped>

</style>