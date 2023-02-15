<template>
    <Organisationforms :schema="schemaEdit" :model="modelEdit" :options="formOptions" ></Organisationforms>
</template>

<script>
    import Organisationforms from './organisationforms';
    import organisation from './organisationModel';
    import constants from '../../../plugins/constants'
    import axios from 'axios';
    import organisationAddFields from './organisationAddFields';
    export default {
        name: "organisationAdd",
        data() {
            return{
                modelEdit: organisation,
                schemaEdit : organisationAddFields,
                formOptions: {
                    validateAfterLoad: true,
                    validateAfterChanged: true,
                    validateAsync: true
                },
                desserts: [],
                values:[],
                organisations: [],
                editedIndex: -1,
            }
        },
        mounted(){
            this.fillSelect()
        },
        methods:{
            fillSelect() {

                axios.get(constants.resource_urs+ '/api/v1/organisation/select')
                    .then(values=>{
                        this.values = values.data.data;
                        this.schemaEdit.fields.find(field => field.forsearch === 'x').values= this.values;
                    })
            },

        },
        components: {
             Organisationforms
        }
    }

</script>

<style scoped>

</style>