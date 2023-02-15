<template>
    <Organisationforms :schema="schemaEdit" :model="model" :options="formOptions" ></Organisationforms>
</template>

<script>
    import Organisationforms from './organisationforms';
    import organisationAddFields from './organisationAddFields';
    export default {
        props:{
          modelEdit:Object
        },
        data() {
            return{
                model:this.modelEdit,
                schemaEdit : organisationAddFields,
                formOptions: {
                    validateAfterLoad: true,
                    validateAfterChanged: true,
                    validateAsync: true
                },
                desserts: [],
                organisations: [],
                editedIndex: -1,

            }
        },
        components: {
            Organisationforms
        },
        mounted(){
            console.log('***modelEdit', this.modelEdit)
        },
        created(){
            console.log('***modelEdit', this.model)
        }
    }
</script>

<style scoped>

</style>