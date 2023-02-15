<template>
    <Formvue :cancelButton="cancelButton" :saveButton="saveButton" :msg="msg" :fillselectUrl="fillselectUrl" :saveUrl="saveUrl"
             :schema="schema" :model="model">

    </Formvue>
</template>

<script>
    import constants from "../../../../plugins/constants"
    import model from "./caisseModel"
    import Formvue from "../../components/formvue"
    export default {
        name: "caisseAdd",
        props:{
            addjson: Object
        },
        data() {
            return{
                saveButton: true,
                cancelButton: true,
                msg: "Caisse",
                fillselectUrl: constants.resource_url+'admin/organisation/child/select',
                saveUrl : constants.resource_url+'admin/caisses',
                schema: this.addjson,
                model: model,
            }
        },
        components:{
            Formvue
        }
    }
</script>

<style scoped>

</style>