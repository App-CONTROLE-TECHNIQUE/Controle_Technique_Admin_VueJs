<template>
    <GlobalVue v-if="show" :dialogDelete="dialogDelete" :pagename="pagename" :previousButton="previousButton" :list="list" :headers="headers" :editButton="editButton"
               :addButton="addButton" :addVue="addvue"  :openButton="openButton" :deleteButton="deleteButton" :list_kanban="list_kanban" :name_graph="name_graph"
               :percent_visit="percent_visit" :list_hist="list_hist" :abcis="abcis" @previous="previous"
               :addjson="addjson" :deleteUrl="deleteUrl" :model="modell" :title="title" :fillselectUrl="fillselectUrll"
               :saveUrl="saveUrll"
               :fillSecondSelectUrl="fillSecondSelectUrll"
               @deleteItemConfirm="deleteItemConfirm" @editItem="editItem" @deleteItem="deleteItem"
               @openItem="openItem" @handlePageChange="handlePageChange" @handlePageSizeChange="handlePageSizeChange">
    </GlobalVue>

</template>

<script>
    import axios from 'axios';
    import GlobalVue from '../components/globalVue'
    import listHeader from './userHeaders';
    import addjson from './userFields'
    import constants from "../../../plugins/constants";
    import model from './userModel'
    export default {
        name: "userList",
        data() {
            return{
                pagename:'Utilisateur',
                show:true,
                title:'Utilisateur',
                fillselectUrll: constants.resource_url+'admin/organisation/child/select',
                saveUrll: constants.resource_url+'users',
                fillSecondSelectUrll: constants.resource_url+'users/select',
                deleteUrl: constants.resource_url+'users',
                name_graph: 'Utilisateur',
                modell: model,
                dialogDelete:false,
                previousButton:true,
                editButton:true,
                addButton: true,
                addvue: 'addUser',
                addjson:addjson,
                openButton: false,
                deleteButton:true,
                headers:listHeader,
                list: constants.resource_url+'users',
                list_kanban:[],
                percent_visit:[],
                list_hist:[],
                abcis:[],
                page:0,
                pageSize:10,
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
            onee(){

                this.$router.push({name: this.addvue, params:{ addjson:this.addjson, model: item,
                        title: this.titlee,
                        fillselectUrl: this.fillselectUrll,
                        saveUrl: this.saveUrll,
                        fillSecondSelectUrl: this.fillSecondSelectUrll,
                        fillThirdSelectUrl: this.fillThirdSelectUrll
                    } })
            },

            FetchVueKanban(){
            },

            FetchVueGraph(){
            },

            initialize () {

                const params = this.getRequestParams(
                    this.searchTitle,
                    this.page,
                    this.pageSize
                );
                this.list = constants.resource_url + 'users';
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
                        fillSecondSelectUrl: this.fillSecondSelectUrll } })

            },
            openItem (item) {
                console.log("open item")
                window.open(constants.resource_url_users, "_blank");
            },
            previous(){
                this.$router.go(-1);
            },
            deleteItemConfirm (item){
                axios.delete(this.list+'/'+item.utilisateurId)
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