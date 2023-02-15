<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform"
          xmlns:v-html="http://www.w3.org/1999/XSL/Transform">
    <div>

        <v-card-title>
            Gérer
            <v-spacer></v-spacer>
            <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
            ></v-text-field>
        </v-card-title>

        <template>
            <v-data-table
                    :headers="headerss"
                    :items="list"
                    class="elevation-1"
                    disable-pagination
                    :hide-default-footer="hideFooter"
                    :search = "search"
                    :loading = "load"
                    loading-text="Loading... "
            >
                <template  v-slot:item.statut="{ item }">
                    <div v-html="item.statut"></div>
                </template>

                <template v-slot:item.createdDate="{ item }">
                    {{ formatDate(item.createdDate) }}

                </template>
                <template v-slot:item.dateHeureOuverture="{ item }">
                    {{ formatDate(item.dateHeureOuverture) }}
                </template>
                <template v-slot:item.premiereMiseEnCirculation="{ item }">
                    {{ formatDate(item.premiereMiseEnCirculation) }}
                </template>
                <template v-slot:top>
                    <v-toolbar
                            flat
                    >
                        <v-spacer></v-spacer>
                        <v-dialog
                                v-model="dialog"
                                max-width="750px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <b-button
                                        v-if="addButtonn"
                                        color="primary"
                                        v-bind="attrs"
                                        @click="onee"
                                        class="m-1"
                                        variant="primary"
                                >Add</b-button>
                            </template>
                        </v-dialog>

                        <v-dialog v-model="dialogDeletee" max-width="500px">
                            <v-card>
                                <v-card-title class="headline">Voulez vous vraiment supprimer?</v-card-title>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="closeDelete"> {{ $t("Annuler") }} </v-btn>
                                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                        <v-dialog v-model="dialogPlatee" max-width="500px">
                            <v-card>

                                <v-card-title>
                                    Best plate : <span style="color: #2f47c2" v-model="bestPlate"></span>
                                </v-card-title>

                                <v-card-subtitle>
                                    Distance with real plate: <span style="color: gray" v-model="accurance"></span>
                                </v-card-subtitle>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="closeDelete"> {{ $t("Annuler") }} </v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                        <v-dialog v-model="dialogResett" max-width="500px">
                            <v-card>
                                <v-card-title class="headline">Voulez vous vraiment réinitialiser?</v-card-title>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="closeDelete"> {{ $t("Annuler") }} </v-btn>
                                    <v-btn color="blue darken-1" text @click="resetItemConfirm">OK</v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                    </v-toolbar>
                </template>

                <template v-slot:item.actions="{ item }">

                    <v-icon
                            v-if="editButtonn"
                            small
                            class="mr-2"
                            @click="editItem(item)"
                    >
                        mdi-pencil
                    </v-icon>
                    <v-icon
                            v-if="openButtonn"
                            small
                            @click="openItem(item)"
                    >
                        mdi-eye
                    </v-icon>
                    <v-icon
                            v-if="resetButtonn && item.statutVisite >=1"
                            small
                            @click="resetItem(item)"
                    >
                        mdi-refresh
                    </v-icon>
                    <v-icon
                            v-if="item.statutVisite >=5"
                            small
                            @click="openPdf(item)"
                    >
                        mdi-file
                    </v-icon>
                    <v-icon
                            v-if="item.statutVisite >=7"
                            small
                            @click="verifPlate(item)"
                    >
                        mdi-handshake-outline
                    </v-icon>
                    <v-icon
                            v-if="deleteButtonn"
                            small
                            @click="deleteItem(item)"
                    >
                        mdi-delete
                    </v-icon>
                </template>
            </v-data-table>
            <div class="col-md-12" style="overflow:auto" >
                <div class="mb-3" >
                    Items per Page:
                    <select  v-model="page" @change="handlePageSizeChange($event)">
                        <option v-for="size in pageSizes" :key="size" :value="size">
                            {{ size }}
                        </option>
                    </select>
                </div>


                <b-pagination
                        v-model="page"
                        per-page=10
                        total-rows=500
                        size="sm"
                        align="center"
                        @change="initialize"
                ></b-pagination>
            </div>
        </template>
    </div>
</template>

<script>
    import axios from 'axios';
    import moment from "moment";
    export default {
        name: "datatablelist",
        props:{
            addjson: Object,
            headers: Array,
            desserts: String,
            deleteUrl: String,
            editButton: Boolean,
            addButton: Boolean,
            openButton: Boolean,
            deleteButton: Boolean,
            resetButton: Boolean,
            dialogDelete: Boolean,
            dialogReset : Boolean,

            addVue: String,
            model: Object,
            home:String,
            editVue: String,
            title: String,
            fillselectUrl: String,
            saveUrl: String,
            fillSecondSelectUrl: String,
            fillThirdSelectUrl : String,
            fillFourthSelectUrl: String
        },
        data(){
                return {
                    pageSizes: [3, 6, 9],
                    headerss: this.headers,
                    url: this.desserts,
                    homee:this.home,
                    modell: this.model,
                    search: '',
                    hideFooter: true,
                    dialogPlatee: false,
                    load:true,
                    bestPlate:"",
                    accurance:"",
                    deleteUrll: this.deleteUrl,
                    adddjson: this.addjson,
                    list:[],
                    dialog: false,
                    resetButtonn: this.resetButton,
                    addButtonn: this.addButton,
                    dialogDeletee: this.dialogDelete,
                    dialogResett:false,
                    dialogPlatee:this.dialogPlate,
                    editButtonn: this.editButton,
                    openButtonn: this.openButton,
                    deleteButtonn: this.deleteButton,
                    page: 0,
                    pageSize: 10,
                    adddVue: this.addVue,
                    titlee: this.title,
                    fillselectUrll: this.fillselectUrl,
                    saveUrll: this.saveUrl,
                    fillSecondSelectUrll: this.fillSecondSelectUrl,
                    fillThirdSelectUrll :this.fillThirdSelectUrl,
                    fillFourthSelectUrll : this.fillFourthSelectUrl,
                    itemToDelete:{},
                    itemToDeletec:{}

                }
        },
        created(){
            console.log('before create datable list '+ this.url);

            this.initialize(1);
        },

        methods:{
            handlePageChange(value) {
                this.$emit('handlePageChange')

            },
            handlePageSizeChange(event) {
                this.$emit('handlePageSizeChange')

            },
            closeDelete () {
                this.dialogDeletee = false;
                this.dialogResett = false;
                this.dialogPlatee = false;
            },
            deleteItemConfirm(){
                this.itemToDeletec = Object.assign({}, this.itemToDelete)
                console.log('itemm', this.itemToDeletec)
                this.$emit('deleteItemConfirm', this.itemToDeletec)
            },
            resetItemConfirm(){
                this.itemToDeletec = Object.assign({}, this.itemToDelete)
                this.$emit('resetItemConfirm', this.itemToDeletec)
            },
            editItem(item){
                console.log('Field ', this.adddjson)
                //this.$emit('editItem', item)
                this.$router.push({name: this.adddVue, params:{ addjson:this.adddjson, model: item,
                        title: this.titlee,
                        fillselectUrl: this.fillselectUrll,
                        saveUrl: this.saveUrll,
                        fillSecondSelectUrl: this.fillSecondSelectUrll,
                        fillThirdSelectUrl :this.fillThirdSelectUrll,
                        fillFourthSelectUrl: this.fillFourthSelectUrll
                    } })
            },
            deleteItem(item){
                this.dialogDeletee=true
                Object.assign(this.itemToDelete,item)
                this.$emit('deleteItem', item)

            },
            openPdf(item){
                this.$emit('openPdf', item)
            },
            verifPlate(item){
                this.bestPlate = item.bestPlate;
                this.accurance = item.accurance;
                this.dialogPlatee=true
                //this.$emit('verifPlate', item)
            },
            resetItem(item){
                this.dialogResett=true
                Object.assign(this.itemToDelete,item)
                this.$emit('resetItem', item)

            },
            makeVariantToast(variant = null, title, msg) {
                this.$bvToast.toast(msg, {
                    title: title,
                    variant: variant,
                    solid: true
                });
            },
            openItem(item){
                this.$emit('openItem', item)
            },

            formatDate(value) {
                return moment(value).format("yyyy-MM-DD HH:mm:ss")
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
            initialize(value){
                this.list = [];
                this.load=true;
                this.page=value ;
                axios.get(this.url, {
                    params: {
                        'search':this.search,
                        'page': value-1,
                        'size': 10,
                    },
                })
                    .then(list => {
                        console.log('recieved list', this.list);
                        this.load=false;
                        this.list = list.data.data.content;

                    })
                    .catch((e)=>{
                        console.log('error', e)
                        this.load=false;
                    })
                    .finally(()=>{
                        this.load=false;
                    })


            },
            customFilter(items, search, filter) {
                this.initialize(1);
                search = search.toString().toLowerCase()
                return items.filter(row => filter(row["type"], search));

            },
            onee(){
                console.log('addvue ', this.adddVue)
                console.log('model on add ', this.model)
                this.$router.push({name: this.adddVue, params:{ addjson:this.adddjson, model: this.modell,
                        title: this.titlee,
                        fillselectUrl: this.fillselectUrll,
                        saveUrl: this.saveUrll,
                        fillSecondSelectUrl: this.fillSecondSelectUrll,
                        fillThirdSelectUrl :this.fillThirdSelectUrll,
                        fillFourthSelectUrl: this.fillFourthSelectUrll
                } })

                Object.assign(this.adddjson, {})
            }

        },

    }


</script>

<style scoped>

</style>