<template>
    <Formvue :cancelButton="cancelButton" :saveButton="saveButton" :msg="msg" :fillselectUrl="fillselectUrll" :saveUrl="saveUrll"
             :schema="schema" :model="modell" :fillSecondSelectUrl="fillSecondSelectUrll" :fillThirdSelectUrl="fillThirdSelectUrll"
             :fillFourthSelectUrl="fillFourthSelectUrll"

             @onSuccess="submitSuccess()" @onFail="submitFailed()">

    </Formvue>
</template>

<script>

    import Formvue from "../components/formvue"
    export default {
        name: "postVue",
        props:{
            addjson: Object,
            model: Object,
            title: String,
            saveUrl: String,
            fillselectUrl: String,
            fillSecondSelectUrl: String,
            fillThirdSelectUrl: String,
            fillFourthSelectUrl: String
        },
        data() {
            return{
                fillSecondSelectUrll: this.fillSecondSelectUrl,
                fillThirdSelectUrll : this.fillThirdSelectUrl,
                fillFourthSelectUrll : this.fillFourthSelectUrl,
                saveButton: true,
                cancelButton: true,
                msg: this.title,
                fillselectUrll: this.fillselectUrl,
                saveUrll : this.saveUrl ,
                schema: this.addjson,
                modell: this.model,
            }
        },
        components:{
            Formvue
        },
        methods:{
            submitSuccess(){
                this.makeVariantToast('success',"Opération réussie","Succès")
                this.model ={};
                //this.$router.push("/");
            },
            submitFailed(){
                this.makeVariantToast('danger',"Opération échouée","Echec")
                this.model ={};
               // this.$router.push("/");
            },
            makeVariantToast(variant = null, title, msg) {
                this.$bvToast.toast(msg, {
                    title: title,
                    variant: variant,
                    solid: true
                });
            }
        }
    }
</script>

<style scoped>

</style>