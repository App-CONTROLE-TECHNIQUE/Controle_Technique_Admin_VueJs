<template>
    <b-overlay :show="shown" rounded="sm" >
        <div class="panel-body" style="margin: auto; width:60%">
            <div class="panel panel-default">
                <div class="panel-body">
                    <form @submit.prevent="onSubmit">
                <div style="margin: auto">
                    <vue-form-generator  :schema="schemma" :model="modell" :options="formOptionss" ></vue-form-generator>
                    <b-button variant="danger m-1" v-if="cancelButtonn" @click="previous">
                        Annuler
                    </b-button>
                    <!--b-button variant="danger m-1" @click="test">
                        test
                    </b-button-->
                    <b-button variant="success m-1" v-if="saveButtonn" type="submit">
                        Enregistrer
                    </b-button>
                </div>
            </form>
                </div>
            </div>
        </div>
    </b-overlay>
</template>

<script>
    import VueFormGenerator from 'vue-form-generator'
    import Multiselect from "vue-multiselect";
    import axios from 'axios'
    export default {
        name: "formvue",
        props:{
            cancelButton: Boolean,
            saveButton: Boolean,
            msg:String,
            fillselectUrl:String,
            fillSecondSelectUrl:String,
            fillThirdSelectUrl: String,
            fillFourthSelectUrl: String,
            saveUrl: String,
            schema:Object,
            model:Object,
            formOptions:Object,
            show: false,
            spinner: Boolean,
            onSelect: Boolean,
            dialog2:Boolean,
            defaultItem: Object,
        },
        data(){
            return{
                shown: false,
                cancelButtonn: this.cancelButton,
                fillSecondSelectUrll: this.fillSecondSelectUrl,
                fillThirdSelectUrll : this.fillThirdSelectUrl,
                fillFourthSelectUrll : this.fillFourthSelectUrl,
                saveButtonn: this.saveButton,
                saveUrll:this.saveUrl,
                modell:this.model,
                schemma: this.schema,
                fillselectUrll:this.fillselectUrl,
                defaultItemm: this.defaultItem,
                success: true,
                formOptionss:{
                    validateAfterLoad: false,
                    validateAfterChanged: true,
                    validateAsync: true
                }
            }
        },
        components: {
            "vue-form-generator": VueFormGenerator.component,
            'multiselect': Multiselect
        },
        computed:{

        },

        created(){
            this.init();
        },
        methods:{
            init(){
                axios.get(this.fillselectUrll)
                    .then(org => {
                        this.schemma.fields.find(this.fillselect).values = org.data.data;
                    })
                    .catch(function(error) {
                        console.log('firstselect_error',error);
                    });
                axios.get(this.fillSecondSelectUrll)
                    .then(select => {
                        this.schemma.fields.find(this.fillsecondselect).values = select.data.data;
                    })
                    .catch(function(error) {
                        console.log('secondselect_error',error);
                    });
                console.log('fill third select', this.fillThirdSelectUrll)
                axios.get(this.fillThirdSelectUrll)
                    .then(selected => {
                        this.schemma.fields.find(this.fillthirdselect).values = selected.data.data;
                    })
                    .catch(function(error) {
                        console.log('thirdselect_error',error);
                    });
                axios.get(this.fillFourthSelectUrll)
                    .then(selected => {
                        this.schemma.fields.find(this.fillfourthselect).values = selected.data.data;
                    })
                    .catch(function(error) {
                        console.log('fourthselect_error',error);
                    });

            },
            fillselect(fields){
                return fields.fillselect === 'x';
            },
            fillsecondselect(fields){
                return fields.fillselect === 'xx';
            },

            fillthirdselect(fields){
                return fields.fillselect === 'xxx';
            },

            fillfourthselect(fields){
                return fields.fillselect === 'xxxx';
            },
            onSubmit(){
                this.shown = true;
                console.log('model on submit', this.model)
                axios.post(this.saveUrll, this.modell)
                    .then(assurances => {
                        console.log('variant', assurances.data.data)
                        if(assurances.data.success){
                            this.$emit('onSuccess')
                        }
                        else{
                            this.$emit('onFail')
                        }
                        this.$nextTick(() => {
                            this.modell= Object.assign({}, this.defaultItemm)

                        })
                        this.shown = false;
                        //this.previous();

                    })
                    .catch((error)=> {
                        console.log('customer_create_error',error);
                    });

            },
            test(){
                console.log('model on test', this.model)
            },
            previous(){
                this.$nextTick(() => {
                    this.modell = Object.assign({}, this.defaultItemm)
                })
                this.$router.go(-1);
            },
            makeVariantToast(variant = null, title, msg) {
                this.$bvToast.toast(msg, {
                    title: title,
                    variant: variant,
                    solid: true
                });
            },
        },
    }
</script>
<style src="../../../../src/assets/vue-multipleSelect.css"></style>
