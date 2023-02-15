<template>
    <GlobalVue v-if="show" :home="home" :dialogDelete="dialogDelete" :pagename="pagename" :previousButton="previousButton" :list="list" :headers="headers" :editButton="editButton"
               :addButton="addButton" :addVue="addvue"  :openButton="openButton" :deleteButton="deleteButton" :list_kanban="list_kanban" :name_graph="name_graph"
               :percent_visit="percent_visit" :list_hist="list_hist" :abcis="abcis" @previous="previous"
               :addjson="addjson" :deleteUrl="deleteUrl" :fillselectUrl="fillselectUrll" :model="modell"
               :saveUrl="saveUrll"
               @deleteItemConfirm="deleteItemConfirm" @editItem="editItem" @deleteItem="deleteItem"
               @openItem="openItem" @handlePageChange="handlePageChange" @handlePageSizeChange="handlePageSizeChange">
    </GlobalVue>
</template>

<script>
    import axios from 'axios';
    import GlobalVue from '../../components/globalVue'
    import listHeader from './catproductListHeader';
    import addjson from './catProductAddFields'
    import constants from "../../../../plugins/constants";
    import modelll from './catProduitModel.json'
    export default {
        data() {

            return{
                pagename:'Catégorie de produit',
                show:true,
                saveUrll: constants.resource_url+'admin/categorieproduits',
                fillselectUrll: constants.resource_url+'admin/organisation/child/select',
                deleteUrl: constants.resource_url+'categorieproduits',
                name_graph: 'Catégorie de produit',
                dialogDelete:false,
                modell: modelll,
                home:'Liste de catégorie produit',
                previousButton:true,
                editButton:true,
                addButton: true,
                addvue: 'add',
                addjson:addjson,
                openButton: false,
                deleteButton:true,
                headers:listHeader,
                list: "",
                list_kanban:[],
                percent_visit:[],
                list_hist:[],
                abcis:[],
                model:this.company,
                page:0,
                pageSize:10,

            }
        },
        props:{
            company :Object
        },
        components: {
            GlobalVue
        },
        watch: {
            dialog (val) {
                val || this.close()
            },
            dialogDelete (val) {
                val || this.closeDelete()
            },
        },

        created () {
            this.FetchVueKanban();
            this.FetchVueGraph();
            this.initialize();
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
            onee(){
                this.$router.push({name: 'addorganisation'})
            },

            FetchVueKanban(){

                axios.get(constants.resource_url+'admin/organisations/kanban')
                    .then(list => {
                        if(list.data.success){
                            this.list_kanban = list.data.data;
                        }
                    })
                    .catch(function(error) {
                        console.log('products_error',error);
                    });
            },
            FetchVueGraph(){
                axios.get(constants.resource_url+'admin/organisations/graphview')
                    .then(list => {

                        if(list.data.success){
                            this.list_hist = list.data.histogramme
                            this.list_camembert = list.data.data
                        }

                    })
                    .catch(function(error) {
                        console.log('products_error',error);
                    });
            },

            initialize () {

                const params = this.getRequestParams(
                    this.searchTitle,
                    this.page,
                    this.pageSize
                );
                this.list = constants.resource_url + 'admin/catproducts';
                this.show = false
                this.$nextTick(() => {
                    this.show = true

                })

            },

            deleteItem (item) {
                this.dialogDelete = false
            },
            editItem (item) {

                this.$router.push({name: this.addvue, params:{ addjson:this.addjson, model: item,
                        title: this.titlee,
                        fillselectUrl: this.fillselectUrll,
                        saveUrl: this.saveUrll,
                    } })

            },
            openItem (item) {
                console.log("open item")
                window.open(constants.resource_url_users, "_blank");
            },
            previous(){
                this.$router.go(-1);
            },
            deleteItemConfirm (item)
            {
                axios.delete(this.deleteUrl+'/'+item.categorieProduitId)
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




