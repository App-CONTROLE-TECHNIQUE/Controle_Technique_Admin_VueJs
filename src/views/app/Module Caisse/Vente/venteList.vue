<template>
    <GlobalVue v-if="show" :dialogDelete="dialogDelete" :pagename="pagename" :previousButton="previousButton" :list="list" :headers="headers" :editButton="editButton"
               :addButton="addButton" :addVue="addvue"  :openButton="openButton" :deleteButton="deleteButton" :list_kanban="list_kanban" :name_graph="name_graph"
               :percent_visit="percent_visit" :list_hist="list_hist" :abcis="abcis" @previous="previous"  :title="title"
               :saveUrl="saveUrll"
               @deleteItemConfirm="deleteItemConfirm" @editItem="editItem" @deleteItem="deleteItem"
               @openItem="openItem" @handlePageChange="handlePageChange" @handlePageSizeChange="handlePageSizeChange">

    </GlobalVue>
</template>

<script>
    import axios from 'axios';
    import GlobalVue from '../../components/globalVue';
    import listHeader from './venteHeaders';
    import constants from "../../../../plugins/constants";
    export default {
        name: "venteList",
        data(){
            return{
                pagename:'Ventes',
                show:true,
                title:'Ventes',
                saveUrll: constants.resource_url+'admin/ventes',
                list: constants.resource_url+'admin/ventes',
                name_graph: 'Vente',

                dialogDelete:false,
                previousButton:true,
                editButton:false,
                addButton: false,
                addvue: 'add',
                openButton: true,
                deleteButton:false,
                headers:listHeader,
                list_kanban:[],
                percent_visit:[],
                list_hist:[],
                abcis:[],
                page:0,
                pageSize:10
            }
        },
        components: {
            GlobalVue
        },
        methods: {
            handlePageChange(value) {
                this.page = value;
                this.initialize();
            },

            handlePageSizeChange(event) {
                this.pageSize = event.target.value;
                this.page = 1;
                this.initialize();
            },

            getRequestParams(searchTitle, page, pageSize) {

                let params = {};

                if (searchTitle) {
                    params["title"] = searchTitle;
                }

                if (page) {
                    params["page"] = page - 1;
                }

                if (pageSize) {
                    params["size"] = pageSize;
                }

                return params;
            },

            FetchVueKanban(){
            },

            FetchVueGraph(){
            },

            initialize () {

                this.show = false
                this.$nextTick(() => {
                    this.show = true

                })

            },
            deleteItem (item) {
                this.dialogDelete = false
            },
            editItem (item) {
                this.$router.push({name: this.addvue, params:{ addjson:this.addjson,
                        title: this.titlee,
                        saveUrl: this.saveUrll,
                    } })

            },
            openItem (item) {
                this.$router.push({name: "detailventeList", params:{list: item}})
            },
            previous(){
                this.$router.go(-1);
            },
            deleteItemConfirm (item){
                axios.delete(this.list+'/'+item.taxeId)
                    .then(org => {
                        console.log('variant',org.data.data)
                        if(org.data.success) {
                            this.initialize();
                            this.makeVariantToast('success',"Suppression","Suppression réussi")
                        }
                    })
                    .catch((error)=> {
                        this.makeVariantToast('danger',"Suppression","Suppression échoué")
                        console.log('customer_create_error',error);
                    });
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

<style scoped>

</style>