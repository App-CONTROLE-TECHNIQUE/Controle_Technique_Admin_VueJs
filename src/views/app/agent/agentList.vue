<template >
<GlobalVue :dialogDelete="dialogDelete" :pagename="pagename" :previousButton="previousButton" :list="listagent" :headers="headers" :editButton="editButton"
           :addButton="addButton" :openButton="openButton" :deleteButton="deleteButton" :list_kanban="list_kanban" :name_graph="name_graph"
           :percent_visit="percent_visit" :list_hist="list_hist" :abcis="abcis" @previous="previous"
           @deleteItemConfirm="deleteItemConfirm" @editItem="editItem" @deleteItem="deleteItem"
            @openItem="openItem" @handlePageChange="handlePageChange" @handlePageSizeChange="handlePageSizeChange"
           >
</GlobalVue>
</template>
<script>
    import axios from 'axios';
    import GlobalVue from '../components/globalVue'
    import listHeader from './agentListHeader';
    import constants from "../../../plugins/constants";
    export default {
        name: "agentList",
        data() {

            return{
                pagename:'',
                name_graph: 'Agent',
                dialogDelete:false,
                previousButton:true,
                editButton:false,
                addButton: false,
                openButton: true,
                deleteButton:false,
                headers:listHeader,
                listagent: "",
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
                this.listagent = constants.resource_url + 'users/'+this.model.id;
                /*axios.get(constants.resource_url + 'users/'+this.model.id)
                    .then(users => {
                        this.listagent = users.data.data;
                        console.log('list agent', this.listagent)
                    })
                    .catch(function(error) {
                        console.log('organisations_error',error);
                    });
                */

            },

            deleteItem (item) {

                this.model = Object.assign({}, item)
                this.dialogDelete = true
            },
            editItem (item) {

                this.$router.push({name: 'editorganisation', params:{ modelEdit:item } })

            },
            openItem (item) {
                console.log("open item")
                window.open(constants.resource_url_users, "_blank");
            },
            previous(){
                this.$router.go(-1);
            },
            deleteItemConfirm ()
            {
                axios.delete(constants.resource_url +'admin/organisations/'+this.model.id)

                    .then(org => {

                        console.log('variant',org.data.data)
                        if(org.data.success) {
                            this.desserts.splice(this.editedIndex, 1)
                        }
                        this.initialize();
                    })
                    .catch(function(error) {
                        console.log('customer_create_error',error);
                    });

                this.closeDelete()
            },



        },

    }
</script>