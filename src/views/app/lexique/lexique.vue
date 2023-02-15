<template>
  
  <div class="main-content">
    <b-overlay :show="shown" rounded="sm" >
      <breadcumb :page="'Lexique'" :folder="'Options'" />
      <b-row>
        <b-col md="11 mb-30">
            <b-card class="card   mb-30"
                    header=""
                    header-bg-variant="transparent">
              <b-tabs pills >
                  <b-tab title=""  >
                  <template slot="title">
                    <i class="i-Bar-Chart text-15"> </i>
                  </template>
                  <vue-good-table
                          :columns="columns"
                          :line-numbers="true"
                          :search-options="{
                            enabled: true,
                            placeholder: 'Search this table'
                          }"
                          :pagination-options="{
                            enabled: true,
                            mode: 'records'
                          }"
                          styleClass="tableOne vgt-table"

                          :rows="rowss"
                  >
                    <template slot="table-row" slot-scope="props">
                            <span v-if="props.column.field == 'button'">
                              <a @click="editLexique(props)">

                                <i   class="i-Pen-2 text-25 text-success mr-2"></i>
                                {{ props.row.button }}
                              </a>
                              <a @click="getLexiques(props)">

                                <i   class="i-Magnifi-Glass1 text-25 text-success mr-2"></i>
                                {{ props.row.button }}
                              </a>
                              <a>
                                <i v-b-modal.modal-2 class="i-Close-Window text-25 text-danger"></i>
                                {{ props.row.button }}
                              </a>


                            </span>
                    </template>
                  </vue-good-table>
                </b-tab>
                  <b-tab title="Créer" :active="showEditView">
                    <template slot="title">
                        <i class="i-Align-Justify-All text-15"> </i>
                    </template>
                    <b-card title="Créer un lexique">

                        <v-form
                          ref="form"
                          v-model="valid"
                          lazy-validation
                        >
                          <b-row>
                            <b-form-group
                              class="col-md-2 mb-1"
                              label="Choisir"
                              label-for="input-1"
                            >
                              <div class="input-group mb-1">

                                <div class="custom-file">
                                  <input style="width:10px;" type="file" class="custom-file-input" id="input"
                                  @change="excelExport"
                                  ref="inputFile"
                                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
                                  <label class="custom-file-label" for="input">...</label>
                                </div>
                              </div>
                            </b-form-group>
                            <b-form-group
                              class="col-md-4 mb-3"
                              label-for="input-1"
                            >
                              <v-text-field
                              v-model="name"
                              :rules="nameRules"

                              label="Nom du lexique"
                              placeholder=""
                              required
                            ></v-text-field>

                            </b-form-group>
                            <b-form-group
                              class="col-md-4 mb-3"
                              label-for="input-1"
                            >
                            <v-text-field
                              v-model="version"
                              :rules="nameRules"

                              label="Version"
                              placeholder="1.0.0"
                              required
                            ></v-text-field>
                            </b-form-group>
                          <span v-show="loader" class="spinner-glow spinner-glow-danger mr-5 mb-4"></span>

                            <b-col>
                              <div class="main-content">
                                <b-card class="wrapper">

                                <div class="self-evaluation-rows">
                                  Nombre de ligne: &nbsp;
                                  <input v-model="number" type="number" min="1" max="10" name="rows" class="rows-textbox" number>
                                  <div class="btn btn-secondary ripple m-1" @click="addRow(number)" v-show="rows.length < 15" >Ajouter</div>
                                </div>
                                  <div class="box-body box-self-evaluation">
                                    <table id="example2" class="table table-hover table-striped sortable">
                                      <thead>
                                        <tr>
                                          <th>#</th>
                                          <th>Code</th>
                                          <th>Description</th>
                                          <th>is parent</th>
                                          <th>Parent</th>
                                          <th>Visual</th>
                                          <th>CategoryId</th>
                                          <th>Classification</th>
                                          <th>Remove</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr  v-for="(row, index) in rows" :key="index">
                                          <td>
                                            <span>{{index+1}}</span>
                                          </td>
                                          <td>
                                            <input type="text" class="form-control" placeholder="Code" v-model="row.code">
                                          </td>
                                          <td>
                                            <v-tooltip top>
                                              <template v-slot:activator="{ on, attrs }">
                                                <v-btn


                                                  v-bind="attrs"
                                                  v-on="on"
                                                >
                                                  <input style="width:50px;" type="text"  placeholder="Libelle" v-model="row.libelle">
                                                </v-btn>
                                              </template>
                                              <span>{{row.libelle}}</span>
                                            </v-tooltip>

                                          </td>
                                          <td>
                                            <input type="checkbox" class="radio radio radio-outline-primary" v-model="row.check" placeholder="Possède des enfants"  @change="addToParents(index,row)">
                                          </td>

                                          <td style="width: 100px;">
                                            <select name="Parent"  class="form-control" v-model="row.parent">
                                              <option :value="0" >-</option><br>
                                              <option v-for="parent in parents" :value="parent.code" :key="parent.code">{{parent.code}}</option><br>

                                            </select>
                                          </td>
                                          <td>
                                            <input type="checkbox" class="radio radio radio-outline-primary" v-model="row.visual"/>

                                          </td>
                                          <td>
                                            <input type="text" class="form-control" placeholder="Category" v-model="row.categoryId">
                                          </td>
                                          <td>
                                            <input type="text" class="form-control col-md-5" placeholder="Client" v-model="row.classificationId">
                                          </td>
                                          <td><i class="i-Close-Window text-25 text-danger" @click="removeRow(index, row)">
                                              </i>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    </div>
                                  <div class="confirmation-buttons-self-evaluation">
                                  </div>
                                </b-card>
                              </div>
                            </b-col>
                          </b-row>
                          <b-row class="float-right">
                            <b-col md="4">
                              <b-button class="btn btn-danger ripple mt-2" @click="clearYourMother" >Vider</b-button>
                            </b-col>
                            <b-col md="4" >
                              <v-btn
                                class="mt-2"
                                :disabled="!valid"

                                @click="enregistrer"
                              >
                                Enregistrer
                              </v-btn>

                            </b-col>
                          </b-row>
                          </v-form>

                    </b-card>
                  </b-tab>
              </b-tabs>
            </b-card>

          <b-modal id="modal-1" title="Détails" size="lg">
              <v-treeview activatable :items="items"></v-treeview>
          </b-modal>
          <b-modal id="modal-2" title="BootstrapVue">
            <p class="my-4">Voulez vous supprimer le lexique ?</p>
          </b-modal>
        </b-col>

        <!-- form-inputs-rounded -->

      </b-row>
    </b-overlay>
  </div>
</template>
<script>
import XLSX, { version } from "xlsx";
import axios from 'axios';
import constants from "../../../plugins/constants";
import loadersVue from '../extraKits/loaders.vue';
import toastsVue from '../extraKits/toasts.vue';
import { isConsole } from 'mobile-device-detect';

export default {
  
  data() {
    return {
      // for
        valid: true,
      shown: false,
      name: '',
      nameRules: [
        v => !!v || 'Required',
        v => (v && v.length <= 50) || 'Name must be less than 50 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,
      //validation
      rows: [
      ],
      showEditView : false,
      lexiqueReceived:[],
      loader: false,
      picked: null,
      number:1,
      name:"",
      version:"",
      date:"",
      parents: [],
      excelData: [], 
      responseData:[],
      columns: [
        {
          label: "Libelle",
          field: "libelle"
          
        },
        {
          label: "Version",
          field: "version",
          
        },
        {
          label: "Date de création",
          field: "createdDate",
          type: "date",
          dateInputFormat: "yyyy-mm-dd",
          dateOutputFormat: "MMM Do yy"
        },
        
        {
          label: "Date de modification",
          field: "modifiedDate",
          type: "date",
          dateInputFormat: "yyyy-mm-dd",
          dateOutputFormat: "MMM Do yy"
        },
        {
          label: "Button",
          field: "button",
          html: true,
          tdClass: "text-right",
          thClass: "text-right"
        }
      ],
      rowss: [],
      items: [],
      
    }
    },
    watch: {
      show(){

      }
    }, 
    mounted() {
        this.getVersionLexique();
    },
    methods:{
      //for
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      //validation

      addRow: function(count){
       var numRows = this.rows.length;
      
       if (numRows >= 10) return;
       
       for(var i=1; i <= count; i++){
       	 this.rows.push({});
         if(++numRows == 10) break;
        }
      },
      removeRow: function(index, rows){
        
        for(var i=0; i < this.parents.length; i++){
          if( this.rows[index].code == this.parents[i].code){
            this.parents.splice(i,1);
          }
        }
        console.log("code à delete "+ this.rows[index].code)
        this.rows.splice(index,1);
      },
      addToParents: function(index, rows){
        console.log(index);
       
        console.log("****"+this.rows[index].code);
        if(row.check){
           console.log("TRUE"+row.check);
          this.parents.push(this.rows[index]);
        }else{
            this.parents.splice(index,1);
        }
      },
      excelExport(event) {
        this.loader =true;
        var input = event.target;
        var reader = new FileReader();
        reader.onload = () => {
          var fileData = reader.result;
          var wb = XLSX.read(fileData, {type : 'binary'});
          wb.SheetNames.forEach((sheetName) => {
            var rowObj =XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);	
            console.log("jSon = "+JSON.stringify(rowObj));        
            this.excelData = JSON.parse(JSON.stringify(rowObj));
          })
         console.log("excel data "+this.excelData.length);
          this.rows = this.excelData;
          console.log("rows length..."+this.rows.length);
          //const containsKey = (rows, key ) => Object.keys(obj).includes(key);
          
          for(var b=0; b<this.rows.length; b++){
            var hc = this.rows[b].haschild == null ? "false": this.rows[b].haschild;
            if(hc.toLowerCase() == "true" || this.rows[b].haschild == true){
              this.rows[b].check = true;
              this.parents.push(this.rows[b]);
              console.log("parents..."+this.rows[b].parent);
            }
            var vs = this.rows[b].visual == null ? "false" : this.rows[b].visual;
            if(vs.toLowerCase() == "true" || this.rows[b].visual == true){
              this.rows[b].visual = true;
            }
            else
              this.rows[b].visual = false;
          }

        };
        
        reader.readAsBinaryString(input.files[0]);
        const sleep = (milliseconds) => {
          return new Promise(resolve => setTimeout(resolve, milliseconds))
        }
        sleep(2000).then(() => {
          console.log("ici on sleep")
          this.loader=false;
        })
        
        
      },
      clearYourMother: function(){
         this.name="";
         this.version="",
         this.rows = [];
         this.parents = [];
         this.excelData = [];
         this.$refs.inputFile.value=null;
      },
      enregistrer: function(){
        this.$refs.form.validate();
        this.shown = true;
        const instance = axios.post(constants.resource_url+'admin/lexique',
                                        {
                                          id: this.rows[0].version == null ? null : this.rows[0].version,
                                          nom: this.name,
                                          version: this.version,
                                          rows :this.rows 
                                        }
                                    )
        .then(response => {
            this.shown = false;
                            this.loader =true;
                            this.responseData = response.data;
                            this.clearYourMother();
                            this.loader =false;
                             this.$swal("Lexique enregistré avec succès");
                          })
        .catch(error => {
            this.shown = false;
                            this.$swal({
                                        type: "Erreur",
                                        title: "Oops...",
                                        text: "Une erreur est survenu!",
                                        footer: "<a href>Vérifier la cohérence des données</a>"
                                      });
        });
      },
      getVersionLexique: function(){
        const instance = axios.get(constants.resource_url+'admin/versionlists'
                                  )
        .then(response => {
                            this.loader = true;
                            this.rowss = response.data.data;
                            console.log("length "+response.data.data.length)
                            this.clearYourMother();
                            this.loader =false;
                          })
        .catch(error => {
                            this.$swal({
                                        type: "Erreur",
                                        title: "Oops...",
                                        text: "Une erreur est survenu!",
                                        footer: "<a href>Vérifier la cohérence des données</a>"
                                      });
        });
      },
      getLexiques: function(props){
        
        const instance = axios.get(constants.resource_url+'admin/lexiques/'+ props.row.id
                                  )
        .then(response => {
                            this.items = response.data.data;
                            
                            
                            this.$bvModal.show('modal-1');
                          })
        .catch(error =>   {
                            this.$swal({
                                        type: "Erreur",
                                        title: "Oops...",
                                        text: "Une erreur est survenu!",
                                        footer: "<a href>Vérifier la cohérence des données</a>"
                                      });
        });
      },
      editLexique: function(props){

        this.name = props.row.libelle
        this.version  = props.row.version;

        const instance = axios.get(constants.resource_url+'admin/lexiques/'+ props.row.id
                                  )
        .then(response => {
                            this.rows = response.data.data;

                            for(var b = 0; b < this.rows.length; b++){                              
                            /*  
                              this.row[b].code = this.lexiqueReceived[b].code;
                              this.row[b].libelle = this.lexiqueReceived[b].libelle;
                              this.row[b].parent = this.lexiqueReceived[b].parent==null? null : this.lexiqueReceived[b].parent.code;
                              this.row[b].haschild = this.lexiqueReceived[b].haschild;
                              this.row[b].visual = this.lexiqueReceived[b].visuel ;	
                              this.row[b].clientId = this.lexiqueReceived[b].client.clientId;
                              this.row[b].categoryId = this.lexiqueReceived[b].categorieVehicule.id;
                            */
                           console.log("this.rows[b].haschild "+this.rows[b].haschild);
                              var hc = this.rows[b].haschild == null ? "false" : this.rows[b].haschild;
                              if( this.rows[b].haschild == true || this.rows[b].haschild == "true" || this.rows[b].haschild == "TRUE"){
                                this.rows[b].check = true;
                                this.parents.push(this.rows[b]);
                                console.log("parents..."+this.rows[b].parent);
                              }
                              var vs = this.rows[b].visual == null ? "false" : this.rows[b].visual;
                              if( this.rows[b].visual == true || this.rows[b].visual == "true" || this.rows[b].visual == "TRUE"){
                                this.rows[b].visual = true;
                              }
                              else
                                this.rows[b].visual = false;
                            }
                            this.showEditView = true;
                            
                          })
        ;

      }
        
  }
}


</script>
