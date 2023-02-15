<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <breadcumb :page="'Scoring'" :folder="'Gestion du score'" />
        <b-modal
                v-model="modal.menudialog"
                id="addfraud"
                centered
                title="Nouvelle fraude"
                hide-footer
        >
            <b-overlay :show="show">
                <b-form v-on:submit.prevent="onSubmit">
                    <b-form-group id="input-group-1" label-for="inputCode">
                        <b-form-input
                                id="inputCode"
                                type="text"
                                required
                                placeholder="Code"
                                :state="isValidCode"
                                aria-describedby="input-live-feedback"
                                lazy-formatter
                                v-model="fraude.code"
                                trim
                        ></b-form-input>

                        <b-form-invalid-feedback id="input-live-feedback">
                            Le code doit commencer par 'FR' et se terminer par 03 chiffres ex: FR001
                        </b-form-invalid-feedback>
                        <b-form-valid-feedback id="input-live-feedback">
                            Formattage code correct
                        </b-form-valid-feedback>
                    </b-form-group>
                    <b-form-group id="input-group-1" label-for="inputDescription">
                        <b-form-input
                                id="inputDescription"
                                type="text"
                                required
                                placeholder="Description"
                                v-model="fraude.description"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <b-button  variant="danger"  @click="$bvModal.hide('addfraud')">Annuler</b-button>
                        <b-button  type="submit" :disabled="!isValidCode" variant="success">Enregistrer</b-button>
                    </b-form-group>
                </b-form>
            </b-overlay>
        </b-modal>
        <div>
            <b-modal id="bv-modal-example" hide-footer>
                <template #modal-title>
                    Using <code>$bvModal</code> Methods
                </template>
                <div class="d-block text-center">
                    <h3>Hello From This Modal!</h3>
                </div>
                <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close Me</b-button>
            </b-modal>
        </div>
        <b-modal
                ref="addrule"
                id="addrule"
                centered
                title="Nouvelle règle"
                hide-footer
        >
            <b-overlay :show="show">
                <b-form v-on:submit.prevent="addRule">
                    <b-form-group id="input-group-1" label-for="selectCode">
                        <multiselect placeholder="Fraude"
                                     track-by="id" v-model="addedRule.fraudeType" id="selectCode"
                                     label="name" required :options="list"></multiselect>
                    </b-form-group>
                    <b-form-group id="app-group-1" label-for="input-6">
                        <b-form-input
                                id="input-6"
                                type="number"
                                step="0.01"
                                required
                                placeholder="Appreciation"
                                v-model="addedRule.appreciation"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group id="app-group-1" label-for="input-7">
                        <b-form-input
                                id="input-7"
                                type="number"
                                step="0.01"
                                required
                                placeholder="Dépréciation"
                                v-model="addedRule.depreciation"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group id="app-group-1" label-for="select">
                        <multiselect track-by="id"
                                     placeholder="Intervenant"
                                     v-model="addedRule.intervenantFraude"
                                     id="select" label="name" required
                                     :options="intervenants"></multiselect>

                    </b-form-group>
                    <b-form-group>
                        <b-button  variant="danger"  @click="$bvModal.hide('addrule')">Annuler</b-button>
                        <b-button  type="submit" variant="success">Enregistrer</b-button>
                    </b-form-group>
                </b-form>
            </b-overlay>
        </b-modal>
        <v-menu
                bottom
                offset-y
                transition="scale-transition"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                        color="purple"
                        dark
                        v-bind="attrs"
                        v-on="on"
                >
                    menu
                </v-btn>
            </template>

            <v-list>

                    <div class="ul-contact-list">
                        <b-list-group flush>
                            <b-list-group-item
                                    button
                                    class="d-flex justify-content-between align-items-center"
                                    @click="openMenuDialog"
                            > <i class="nav-icon i-Add"></i> Ajouter une fraude</b-list-group-item>




                            <b-list-group-item
                                    button
                                    class="d-flex justify-content-between align-items-center"
                                    @click="$bvModal.show('addrule')"
                            > <i class="nav-icon i-Keyboard3"></i> Définir une règle</b-list-group-item>


                            <b-list-group-item
                                    button
                                    class="d-flex justify-content-between align-items-center"
                                    @click="$bvModal.show('info')"
                            > <i class="nav-icon i-Information"></i> Information</b-list-group-item>
                        </b-list-group>
                    </div>
            </v-list>
        </v-menu>
        <div>
            <v-dialog  v-model="modal.dialogDelete" max-width="500px">
                <v-card>
                    <v-card-title class="headline">Voulez vous vraiment supprimer?</v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDeldialog"> {{ $t("Annuler") }} </v-btn>
                        <v-btn color="blue darken-1" text @click="deleteFraud">OK</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog  v-model="modal.dialogDeleteRule" max-width="600px">
                <v-card>
                    <v-card-title class="headline">Voulez vous vraiment supprimer cette règle?</v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDeldialog"> {{ $t("Annuler") }} </v-btn>
                        <v-btn color="blue darken-1" text @click="deleteRule">OK</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <b-modal
                    v-model="modal.information"
                    id="info"
                    centered
                    hide-footer
                    title="Information utile"
            >
                <div>
                    <b-card sub-title="Scoring Ditros">
                        <b-card-text>
                            Et voici en quelques mots très précis à quoi sert le <em>scoring</em> nous vous remercions d'avoir pris le
                            temps de regarder ici.
                        </b-card-text>

                        <b-card-text>A plus.</b-card-text>


                    </b-card>
                </div>

            </b-modal>
        </div>
        <b-row>
            <b-col md="6">
                <b-badge variant="primary">Liste des fraudes</b-badge>
                <v-data-table
                        :headers="headers"
                        :items="list"
                        class="elevation-1"
                        disable-pagination
                        :loading = "load1"
                        loading-text="Loading... "

                >

                    <template v-slot:item.actions="{ item }">

                        <v-icon
                                small
                                @click="openItem(item)"
                        >
                            mdi-eye
                        </v-icon>

                        <v-icon
                                small
                                @click="openDeldialog(item)"
                        >
                            mdi-delete
                        </v-icon>
                    </template>
                </v-data-table>
            </b-col>
            <b-col md="6">
                <b-badge v-if="intervenantList" variant="success">Règles</b-badge>

                <b-card v-if="intervenantList"
                        :header="titleDetail"
                        header-tag="header"
                        header-co
                >
                    <template #header>
                        <h6 style="color: rebeccapurple; font-weight: bold;">{{titleDetail}}</h6>
                    </template>
                    <b-card-text>
                        <b-overlay :show="show">
                            <b-form v-on:submit.prevent="save(item)">
                                <table v-if="intervenantList">
                                <tr v-if="intervenantList" >
                                    <th v-if="intervenantList">Appréciation</th>
                                    <th v-if="intervenantList">Dépreciation</th>
                                    <th v-if="intervenantList">Intervenant</th>
                                    <th v-if="intervenantList">Options</th>
                                </tr>
                                <tr v-for="(ite,index) in intervenantInFraud">

                                        <td><b-form-input :class="{readOnly:isReadonly(index)}" step="0.01" type="number" v-model="ite.appreciation" required :readonly="isReadonly(index)" ></b-form-input></td>
                                        <td><b-form-input :class="{readOnly:isReadonly(index)}" step="0.01" type="number" v-model="ite.depreciation" required :readonly="isReadonly(index)"></b-form-input></td>
                                        <td>
                                            <multiselect v-if="!isReadonly(index)" track-by="id" v-model="selectedIntervenant" id="id" label="name" required :options="intervenants"></multiselect>

                                            <b-form-input v-if="isReadonly(index)" :class="{readOnly:isReadonly(index)}" type="text" :value="ite.intervenantFraude" :readonly="isReadonly(index)"></b-form-input></td>
                                        <td>
                                            <v-icon

                                                    small
                                                    @click="autoriseEdit(index)"
                                            >
                                                mdi-pencil
                                            </v-icon>
                                            <v-icon
                                                    v-if="!isReadonly(index)"
                                                    small
                                                    @click="save(ite)"
                                            >
                                                mdi-content-save
                                            </v-icon>
                                            <v-icon
                                                    small
                                                    @click="openDeldialogRule(ite)"
                                            >
                                                mdi-delete
                                            </v-icon>

                                        </td>

                                </tr>

                            </table>
                            </b-form>
                        </b-overlay>
                    </b-card-text>

                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import axios from 'axios';
    import Multiselect from 'vue-multiselect'
    import constants from '../../../plugins/constants'
    export default {
        name: "scoring",
        data(){
            return{
                hidefoot:true,
                modal:{
                    "dialogDelete": false,
                    "menudialog": false,
                    "dialogDeleteRule": false,
                    "information": false
                },
                show:false,
                headers:[
                    {
                        "text": "id",
                        "value": "id"
                    },
                    {
                        "text": "Code",
                        "value": "name"
                    },
                    {
                        "text": "Description",
                        "value": "description"
                    },
                    {
                        "text": "Options",
                        "value": "actions",
                        "sortable": false
                    },
                ],
                headersDetails:[
                    {
                        "text": "id",
                        "value": "id"
                    },
                    {
                        "text": "Appreciation",
                        "value": "appreciation"
                    },
                    {
                        "text": "Depreciation",
                        "value": "depreciation"
                    },
                    {
                        "text": "Intervenant",
                        "value": "intervenantFraude"
                    },
                    {
                        "text": "Options",
                        "value": "actions",
                        "sortable": false
                    },
                ],
                list:[],

                intervenantList:false,
                titleDetail:'',
                addedRule:{},
                selectedItem: -1,
                itemForRefreshRule:{},
                intervenantInFraud:[],
                load1:true,
                load2:true,
                editedItem: -1,
                toSend:{},
                toDelete:{
                    "fraude":{},
                    "rule":{}
                },
                intervenants:[],
                selectedIntervenant:'',
                items: [
                    { title: 'Nouvelle fraude' },
                    { title: 'Nouvelle règle' },
                    { title: 'Informations' }
                ],
                fraude: {}

            }
        },
        mounted(){
            this.getFraudList();
            this.getIntervenantList();
        },
        components: {
            Multiselect
        },
        computed:{
            isValidCode(){
                if(this.fraude.code == null)
                    return false;

                return this.fraude.code.substr(0,2) == 'FR' && this.fraude.code.length == 5
                    && this.isNumber(this.fraude.code.substr(2,3));
            }

        },
        methods:{
            isNumber(value){
                return ((value != null) &&
                    !isNaN(Number(value.toString())));
            },
            openItem(item){
                this.itemRowBackground(item);
                Object.assign(this.itemForRefreshRule, item)
                this.titleDetail = item.name
                axios.get(constants.resource_urls+'admin/score/regles/'+item.id)
                    .then( response =>{
                        this.intervenantInFraud = response.data.data
                        if(this.intervenantInFraud.length == 0)
                            this.intervenantList = false;
                        else
                            this.intervenantList = true;
                        this.load2=false
                    })
                    .catch(function(error) {
                        console.log('fraudes_error',error);
                    });
            },
            openMenuDialog(){
              this.modal.menudialog = true;
            },
            getFraudList(){
                axios.get(constants.resource_urls+'admin/score/fraudes')
                    .then( response =>{

                        this.list = response.data.data
                        this.load1=false
                    })
                    .catch(function(error) {
                        console.log('fraudes_error',error);
                    });
            },
            getIntervenantList(){
                axios.get(constants.resource_urls+'admin/score/intervenants')
                    .then( response =>{
                        this.intervenants = response.data.data
                    })
                    .catch(function(error) {
                        console.log('fraudes_error',error);
                    });
            },
            autoriseEdit(index){
                this.editedItem = index
            },
            isReadonly(index){
                if(index === this.editedItem){
                    return false;
                }
                else
                    return true;

            },

            deleteItem(item){
                console.log('Item to delete ', item)
            },
            closeDetail(){
                this.editedItem = -1;
                this.intervenantList =false;

            },
            closeDeldialog(){
                this.modal.dialogDelete=false;
                this.modal.dialogDeleteRule=false;
            },
            openDeldialog(item){
                Object.assign(this.toDelete.fraude, item);
                this.modal.dialogDelete=true;
            },
            openDeldialogRule(ite){
                Object.assign(this.toDelete.rule, ite);
                this.modal.dialogDeleteRule=true;
            },
            makeVariantToast(variant = null, title, msg) {
                this.$bvToast.toast(msg, {
                    title: title,
                    variant: variant,
                    solid: true
                });
            },
            save(item){
                this.show =true
                item.intervenantFraude = this.selectedIntervenant
                console.log("item baby ",item)
                Object.assign(this.toSend, item)
                item.intervenantFraude = this.selectedIntervenant.name
                axios.post(constants.resource_urls+'admin/score/regles', this.toSend)
                    .then(response => {
                        this.toSend = response.data.data
                        this.editedItem = -1;
                        this.makeVariantToast('success',"Modification","Modification réussie")
                        this.show =false;
                    })
                    .catch((error)=>{
                        this.makeVariantToast('danger',"Modification","Modification échouée")
                        this.editedItem = -1;
                        console.log('post details fraud error',error);
                        this.show =false;
                    })
                console.log('Item to save ', item)
            },
            onSubmit(){
                this.show=true;
                axios.post(constants.resource_urls+'admin/score/fraudes', this.fraude)
                    .then(response => {
                        this.fraude = response.data.data
                        this.makeVariantToast('success',"Ajout fraude","réussie")
                        this.getFraudList()
                        this.show=false;
                        this.modal.menudialog = false;

                    })
                    .catch( error=>{
                        this.makeVariantToast('danger',"Modification échouée",error.response.data.message)
                        console.log('post details fraud error',error.response.data.message);
                        this.show=false;
                        this.modal.menudialog = false;
                    })
            },
            deleteFraud(){
                axios.delete(constants.resource_urls+'admin/score/fraudes/'+this.toDelete.fraude.id)
                    .then(reponse => {
                        this.makeVariantToast('success',"Supression","réussie");
                        this.modal.dialogDelete=false;
                        this.getFraudList()
                    })
                    .catch((error)=>{
                        this.makeVariantToast('danger',"Supression","échouée")
                        console.log('post details fraud error',error);
                    })
            },
            deleteRule(){
                axios.delete(constants.resource_urls+'admin/score/regles/'+this.toDelete.rule.id)
                    .then(reponse => {
                        this.makeVariantToast('success',"Supression","réussie")
                        this.openItem(this.itemForRefreshRule)
                        this.modal.dialogDeleteRule=false;
                    })
                    .catch((error)=>{
                        this.makeVariantToast('danger',"Supression","échouée")
                        console.log('post details fraud error',error);
                        this.modal.dialogDeleteRule=false;
                    })
            },
            itemRowBackground(item) {
                console.log('selected item ',item)
                const rowClass = 'style-1'
                return rowClass;
            },
            addRule(){
                this.show=true;
                console.log('Rule to add ',this.addedRule);
                axios.post(constants.resource_urls+'admin/score/regles', this.addedRule)
                    .then(response => {
                        this.addedRule = response.data.data
                        this.makeVariantToast('success',"Modification","Modification réussie")
                        this.$refs['addrule'].hide()
                        this.addedRule={};
                        this.show =false;
                    })
                    .catch((error)=>{
                        this.makeVariantToast('danger',"Modification","Modification échouée")
                        console.log('post details fraud error',error);
                        this.addedRule={};
                        this.show =false;
                    })
            }

        }
    }
</script>
<style >
    .editable {
        background-color: #e8eaed;
    }
    .readOnly {
        background-color: #a8a8a8;
        color: #2a262e;
    }
    .style-1 {
        color: rebeccapurple;
        background-color: gray;
    }
    .style-2 {
        background-color: rgb(114,114,67)
    }
</style>
<style src="../../../../src/assets/vue-multipleSelect.css">


</style>


