<template>

    <div class="container" >


        <div class="card" id="printMe1">

            <div class="card-body " style="border: 3px solid #b6365c">
                <div class="row">
                    <div class="col-md-6">
                        <span class="rose">ASSURE,NOM ET ADRESSE :  </span>{{rowes.souscripteur}} {{adresse}}<br>
                        <span class="italik">INSURED,NAME AND ADDRESS:</span><br>
                        <br>
                        <span class="rose">PROFESSION (1): </span><br>
                        <span  class="italik">OCCUPATION (1)</span>  {{valeur}}<br>
                        <br>
                        <span class="rose">POLICE No: </span><span><b>DU</b> {{rowes.date_debut}} <b>AU</b> {{rowes.date_fin}}</span><br>
                        <span  class="italik">POLICY No  FROM   &nbsp;&nbsp;&nbsp;&nbsp;TO</span><br><br>
                        <span class="rose">VEHICULE( MARQUE): </span>{{assurances.vehicule.marqueVehicule.libelle}} ({{assurances.produit.description}})<br>
                        <span  class="italik">VEHICULE(Make):</span><br>
                        <br>

                        <span class="rose">IMMATRICULATION OU No DE CHASSIS: </span>  {{assurances.numImmatriculation}}<br>
                        <span  class="italik">REGISTRATION OR CHASSIS No</span><br>
                        <br>

                        <span class="rose">GENRE: </span>{{assurances.genreVehicule}}<br>
                        <span  class="italik">TYPE</span><br>
                        <br>

                        <span class="rose">CATEGORIE D'USAGE No 1,2,3,5 a 10 (voir au verso ): </span>{{assurances.produit.libelle}}<br>
                        <span  class="italik">USE:</span><br>
                        <br>
                        <div class="container" style="border: 1px solid black" >
                            <div class="row">
                                <div class="col-md-4">Remorque(2)<br><span class="italik"> Trailer</span></div>
                                <div class="col-md-4 ">Semi Remorque(2)<br><span class="italik">Trailer</span></div>
                                <div class="col-md-4">Appareil Terrestre(2)<br><span class="italik">Land Transport Vehicle</span></div>
                            </div>

                            <div class="row">

                                <div class="col-md-6 "><span class="rose"> Type :</span> {{assurances.vehicule.typeVehicule}}</div>

                                <div class="col-md-6"><span class="rose">Marque (Make) :</span> {{assurances.vehicule.marqueVehicule.libelle}} ({{assurances.produit.description}})</div>
                            </div>

                            <p ><span class="rose">No Immatriculation:</span> {{assurances.numImmatriculation}}</p>

                        </div>
                    </div>

                </div>
        </div>

        <p></p>
            <div style="text-align: right">
                <b-button  variant="outline-success" @click="prints('print')" style="margin-right: 15px">{{$t('print')}}</b-button>
            </div>

        </div></div>

</template>

<script>
    import store from "../../store";
    export default {

        data() {
            return {
                assurances:"",
                rowes:{},

                openb:false
            }},
        mounted(){

            this.rowes = JSON.parse(localStorage.getItem("rowes"))

            this.assurances = JSON.parse(localStorage.getItem("assurances"))
            console.log('rowea',this.assurances)
            //let routeData = this.$router.resolve({ name: 'vignette2'});
            //window.open(routeData.href, '_blank');
            /*if (typeof this.rowes === "undefined"){
                console.log('nothing')
            }*/

        },
        methods:{
            prints(){
                //this.$emit('print');
                this.$htmlToPaper('printMe1');
            },
        }
    };
</script>

<style >
    .rose {
        font-weight: bold;
    }
    .rosse {
    //color: #b6365c;
        font-weight: bold;
    }
    .italik {
        font-style: italic;
        font-size: 10px;

    }
    .title {

        font-size: 10px;

    }
</style>
