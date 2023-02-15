<template>
    <Formvue :cancelButton="cancelButton" :saveButton="saveButton" :msg="msg" :fillselectUrl="fillselectUrl" :saveUrl="saveUrl"
                :schema="schema" :model="model">

    </Formvue>
</template>

<script>
    import constants from "../../../../plugins/constants"
    import model from "./caisseModel"
    import schema from "./caisseFields"
    import Formvue from "../../components/formvue"
    export default {
        name: "CaisseEdit",
        props:{
            modelEdit: Object
        },
        data() {
            return{
                saveButton: true,
                cancelButton: true,
                msg: "Caisse",
                fillselectUrl: constants.resource_url+'organisation/select',
                saveUrl : constants.resource_url+'admin/caisses',
                schema: schema,
                model: this.modelEdit,
            }
        },
        components:{
            Formvue
        }

    }
</script>

<style scoped>

</style>