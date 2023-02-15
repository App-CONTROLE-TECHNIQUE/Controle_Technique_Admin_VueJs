<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <div style="margin: auto">
            <h2>A la caisse : {{noms}}</h2>
            <h4 style="color: #4d2673">Organisation : {{organisation != null ? organisation.nom : "Aucune"}}</h4>
        </div>

        <b-button variant="info btn-icon ripple m-1" @click="previous">
            <span class="ul-btn__icon"><i class="i-Arrow-Back-3"></i></span>
        </b-button>
        <v-data-table
                :headers="headers"
                :items="listt"
                sort-by="libelle"
                class="elevation-1"
                disable-pagination
                :hide-default-footer="true"
                :search = "search"
        >
            <template v-slot:item.createdDate="{ item }">
                {{ formatDate(item.createdDate) }}
            </template>

        </v-data-table>
    </div>
</template>

<script>
    import axios from 'axios';
    import moment from "moment";
    import listHeader from './detailVenteHeaders';
    import constants from "../../../../plugins/constants";
    export default {
        name: "venteList",
        props:{
            list : Object
        },
        data(){
            return{
                search:'',
                pagename:'Ventes',
                show:true,
                noms: this.list.sessionCaisse.caissier.partenaire.nom,
                headers:listHeader,
                listt: this.list.detailventes,
                organisation : this.list.organisation

            }
        },
        methods: {

            handlePageSizeChange(event) {
                this.pageSize = event.target.value;
                this.page = 1;
                this.initialize();
            },
            previous(){
              this.$router.push("venteList")
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
            formatDate(value) {
                return moment(value).format("yyyy-MM-DD")
            },
            deleteItem (item) {
                this.dialogDelete = false
            },
            previous(){
                this.$router.go(-1);
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