<template>
    <GlobalVue v-if="show" :dialogDelete="dialogDelete" :pagename="pagename" :previousButton="previousButton" :list="list" :headers="headers" :editButton="editButton"
               :addButton="addButton" :addVue="addvue"  :openButton="openButton" :deleteButton="deleteButton" :list_kanban="list_kanban" :name_graph="name_graph"
               :percent_visit="percent_visit" :list_hist="list_hist" :abcis="abcis" @previous="previous"
               :addjson="addjson" :deleteUrl="deleteUrl" :model="modell" :title="title" :fillselectUrl="fillselectUrll"
               :saveUrl="saveUrll" :resetButton="resetButtonn"
               :dialogPlate="dialogPlate"
               :fillSecondSelectUrl="fillSecondSelectUrll" :fillThirdSelectUrl="fillThirdSelectUrll"
               @openPdf="openPdf"
               @resetItem="resetItem"
               @resetItemConfirm="resetItemConfirm"
               @deleteItemConfirm="deleteItemConfirm" @editItem="editItem" @deleteItem="deleteItem"
               @openItem="openItem" @handlePageChange="handlePageChange" @handlePageSizeChange="handlePageSizeChange">

    </GlobalVue>

</template>

<script>
    import axios from 'axios';
    import GlobalVue from '../../components/globalVue'
    import listHeader from './visiteHeaders';
    import addjson from './visiteFields'
    import openjson from './visiteFieldsOpen'
    import constants from "../../../../plugins/constants";
    import model from './visiteModel.json'
    export default {
        name: "userList",
        data() {
            return{
                pagename:'Visite',
                show:true,
                title:'Visite',
                saveUrll: constants.resource_url+'admin/visites',
                fillselectUrll: constants.resource_url+'admin/organisation/child/select',
                fillSecondSelectUrll: constants.resource_url+'admin/caissiers/select',
                fillThirdSelectUrll: constants.resource_url+'admin/cartegrises/select',
                deleteUrl: constants.resource_url+'admin/visites',
                name_graph: 'Visite',
                modell: model,
                dialogDelete:false,
                dialogPlate:false,
                previousButton:true,
                editButton:false,
                addButton: true,
                addvue: 'add',
                addjson:addjson,
                openButton: true,
                resetButtonn: true,
                deleteButton:true,
                headers:listHeader,
                list: constants.resource_url+'admin/visites',
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
                    params["search"] = searchTitle;
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
                console.log('third select url in caissierList',this.fillThirdSelectUrll)
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


                this.show = false
                this.$nextTick(() => {
                    this.show = true

                })

            },
            deleteItem (item) {
                this.dialogDelete = false
            },
            editItem (item) {

                axios.get(this.list+'/'+item.id).then(org => {
                    this.$router.push({name: this.addvue, params:{ addjson:this.addjson, model: org.data.data,
                            title: this.titlee,
                            fillselectUrl: this.fillselectUrll,
                            saveUrl: this.saveUrll,
                            fillSecondSelectUrl: this.fillSecondSelectUrll,
                    } })
                })
                .catch((error)=> {
                    this.makeVariantToast('danger',"Error","An error occured")
                    console.log('customer_create_error',error);
                });

            },
            openItem (item) {
                axios.get(this.list+'/'+item.id).then(org => {
                    this.$router.push({name: this.addvue, params:{ addjson:openjson, model: org.data.data,
                        title: this.titlee,
                        fillselectUrl: this.fillselectUrll,
                        saveUrl: this.saveUrll,
                        fillSecondSelectUrl: this.fillSecondSelectUrll,

                    } })

                })
                .catch((error)=> {
                    this.makeVariantToast('danger',"Error","An error occured")
                    console.log('customer_create_error',error);
                });
            },

            resetItem(item){
                this.$emit('resetItem', item)
            },
            openPdf(item){
                window.open(constants.resource_urs+'/public/pv/'+item.idVisite+'.pdf', "_blank");
            },
            previous(){
                this.$router.go(-1);
            },
            resetItemConfirm(item){
                axios.post(this.list+'/reset/'+item.idVisite)
                    .then(org => {
                        console.log('variant',org.data.data)
                        if(org.data.success) {
                            this.initialize();
                            this.makeVariantToast('success',"Reset","réussi")
                        }
                    })
                    .catch((error)=> {
                        this.makeVariantToast('danger',"Reset","Echoué")
                        console.log('customer_create_error',error);
                    });
            },
            deleteItemConfirm (item){
                axios.delete(this.list+'/'+item.idVisite)
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