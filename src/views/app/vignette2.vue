<template>

    <div class="container" >

        <div class="card" id="printMe2">

            <div class="card-body " style="border: 3px solid #b6365c">

                <div class="row">
                    <div class="col-md-11">
                <div class="row">
                    <div class="col-md-5" style="color:#b6365c "><h1>CARTE ROSE</h1></div>
                    <div><img v-bind:src="constant" alt="QRCode"/></div>
                    <div class="col-md-6 rose"><h4>CARTE INTERNATIONALE D'ASSURANCE<br>DE RESPONSABILITE CIVILE AUTOMOBILE CEMAC</h4></div>
                </div>

                <div class="row">
                    <div class="col-md-10">
                        __________Valable du ___ {{rowes.date_debut }} _____ au _________{{rowes.date_fin }}____________
                    </div>
                </div>

                <br>
                <div class="row" >
                <div class="col-md-5 " >
                    <span class="rose">1. Nom et Adresse de l'Assure:</span>{{rowes.souscripteur}}<br><br>
                    <span class="rose">5. Immatriculation: </span> {{assurances.numImmatriculation}}<br><br>
                    <span class="rose">7. Nom et Adresse de la Societe d'Assurance: </span>
                    {{rowes.organisation.parentOrganisation.nom}} {{rowes.organisation.parentOrganisation.adresse}}<br><br>
                    <span class="rose">" Entreprise regle par le code CIMA " </span><br><br>
                    <span class="rose">10. Usage ou categorie du vehicule : </span>{{assurances.produit.libelle}}<br><br>
                    <br><br>
                    Carte Cree par
                </div>
                    <div class="col-md-1" style="border: 1px solid rgba(182,54,92,0.27)"></div>
                <div class="col-md-5">
                    <span class="rose">2. Police Originale No: </span>{{rowes.police}}<br><br>
                    <span class="rose">6. No de Chassis du Moteur: </span>{{assurances.vehicule.chassis}} <br><br>
                    <span class="rose">8. Nom et adresse du Bureau Emetteur: </span>{{rowes.organisation.nom}} {{rowes.organisation.adresse}}<br><br>

                    <span class="rose">9. Signature et Cachet de l'Emetteur: </span><br><br>
                    <span class="rose">11. Liste des Pays dans lesquels<br> cette courte est valable: </span><br><br>

                    Cameroun,Centrafrique,Congo,Gabon,Guinee Equatoriale,Tchad
                </div>
                </div>
                    </div>
                    <div class="col-md-1 " style="border: 1px solid rgba(182,54,92,0.27)"></div>
                </div>
             </div>
        </div>

        <p></p>

        <div style="text-align: right">
            <b-button  variant="outline-success" @click="prints('print')" style="margin-right: 15px">{{$t('print')}}</b-button>
        </div>

    </div>

</template>
<script>
    import moment from 'moment'
    import constants from "../../plugins/constants"
    import store from "../../store";
    export default {

        data() {
            return {
                assurances:{},
                rowes:{},
                constant: null,
                openb:false
            }},
        created(){
            this.constant = constants.resource_url + 'assurances/qrcode/' + JSON.parse(localStorage.getItem("rowes")).id
        },

        mounted(){

             this.rowes = JSON.parse(localStorage.getItem("rowes"))
             this.assurances = JSON.parse(localStorage.getItem("assurances"))

             console.log('lien qrcode',this.constant)
            console.log('assurance',JSON.parse(localStorage.getItem("assurances")))
             let routeData = this.$router.resolve({ name: 'vignette1'});
             window.open(routeData.href, '_blank');

            /*if (typeof this.rowes === "undefined"){
                console.log('nothing')
            }*/

        },
        methods:{
            prints(){
                //this.$emit('print');
                this.$htmlToPaper('printMe2');
            }
        },
    };
</script>

<style >
    .rose {
        font-weight: bold;
    }
</style>