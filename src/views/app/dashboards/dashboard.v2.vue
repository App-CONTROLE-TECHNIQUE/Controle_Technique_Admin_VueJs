<template>
  <div class="main-content">
    <breadcumb page="Dashboard" folder="Dashboard" />
    <b-overlay :show="show">
      <b-row>
      <b-col lg="6" xl="6" md="12">
        <b-row>
          <b-col lg="4" md="6" sm="6">
            <b-card class="card-icon text-center mb-30">
              <i class="i-Magnifi-Glass1"></i>
              <p class="text-muted mt-2 mb-2">Visite du jour</p>
              <p class="text-primary text-24 line-height-1 m-0">{{businessData.visitNumber}}</p>
            </b-card>
          </b-col>
          <b-col lg="4" md="6" sm="6">
            <b-card class="card-icon text-center mb-30">
              <i class="i-Money-2"></i>
              <p class="text-muted mt-2 mb-2">Chiffres d'affaires</p>
              <p class="text-primary text-24 line-height-1 m-0">{{businessData.ca}}</p>
            </b-card>
          </b-col>
          <b-col lg="4" md="6" sm="6">
            <b-card class="card-icon text-center mb-30">
              <i class="i-Coins"></i>
              <p class="text-muted mt-2 mb-2">Taxes</p>
              <p class="text-primary text-24 line-height-1 m-0">{{businessData.tax}}</p>
            </b-card>
          </b-col>

        </b-row>
      </b-col>

      <b-col lg="6" xl="6" md="12" class="mb-30">
        <b-card class="h-100">
          <h4 class="card-title m-0">Courbe Chiffre d'affaire</h4>
          <div class="chart-wrapper" style="height: 300px ; width:100%">
            <v-chart :options="echart4" :autoresize="true"></v-chart>
          </div>
        </b-card>
      </b-col>

      <!-- latest-log -->
      <b-col sm="12" md="6" lg="6" xl="4" class="mb-30">
        <b-card title="Latest Log" >

          <div class="ul-widget-s6__items">
            <div class="ul-widget-s6__item mt-0 mb-4" v-for="item in businessData.daschBoardLogDTOS">
              <span class="ul-widget-s6__badge">
                <p :class="item.action == 'DEL' ? 'badge-dot-danger ul-widget6__dot' :
                (item.action == 'ADD' ? 'badge-dot-success ul-widget6__dot' :
                (item.action == 'MOD' ? 'badge-dot-warning ul-widget6__dot' : 'badge-dot-dark ul-widget6__dot'))"></p>
              </span>
              <span class="ul-widget-s6__text">{{item.author}} a {{ item.action == 'ADD' ? $t('ajouté') : (
                item.action == 'MOD' ? $t('modifié') :(item.action == 'DEL' ? $t('supprimé'): '-')
                  )}} {{ item.entity }} N°{{ item.entityId }}</span>
              <span class="ul-widget-s6__time text-muted">{{ timeAgo(item.date) }}</span>
            </div>
          </div>
          <b-button href="#" variant="dark">Détails</b-button>
        </b-card>
      </b-col>

      <!-- travel-different-countries -->
      <b-col sm="12" md="6" lg="6" xl="4" class="mb-30">
        <b-card title="Top centre technique" class>
          <!--div class="ul-widget-app__poll-list mb-4">
            <div class="d-flex">
              <span class="text-muted text-12">From Satellite Ngono</span>
              <span class="text-muted text-12 ml-auto">
                15%
                <i class="i-Turn-Up-2 text-14 text-success font-weight-700"></i>
              </span>
            </div>
            <b-progress height="5px" :value="15"></b-progress>
          </div-->
          <div class="ul-widget-app__poll-list mb-4" v-for="item in businessData.organisationTopDTOS">
            <div class="d-flex">
              <span class="text-muted text-12">{{item.organisation.nom}} {{item.value}}%</span>
              <span class="text-muted text-12 ml-auto">
                {{item.pourcentage}}%
                <i :class="item.pourcentage > 0 ? 'i-Turn-Up-2 text-14 text-success font-weight-700' : (item.pourcentage == 0 ? '' : 'i-Turn-Down-2 text-14 text-danger font-weight-700' )"></i>
              </span>
            </div>
            <b-progress height="5px" variant="success" :value="item.value"></b-progress>
          </div>
          <!--div class="ul-widget-app__poll-list mb-4">
            <div class="d-flex">
              <span class="text-muted text-12">From Canada</span>
              <span class="text-muted text-12 ml-auto">
                49%
                <i class="i-Turn-Down-2 text-14 text-danger font-weight-700"></i>
              </span>
            </div>
            <b-progress height="5px" variant="dark" :value="49"></b-progress>
          </div>
          <div class="ul-widget-app__poll-list mb-4">
            <div class="d-flex">
              <span class="text-muted text-12">From France</span>
              <span class="text-muted text-12 ml-auto">
                13%
                <i class="i-Turn-Down-2 text-14 text-danger font-weight-700"></i>
              </span>
            </div>
            <b-progress height="5px" variant="danger" :value="13"></b-progress>
          </div>
          <div class="ul-widget-app__poll-list mb-4">
            <div class="d-flex">
              <span class="text-muted text-12">From Japan</span>
              <span class="text-muted text-12 ml-auto">
                25%
                <i class="i-Turn-Down-2 text-14 text-danger font-weight-700"></i>
              </span>
            </div>
            <b-progress height="5px" variant="warning" :value="25"></b-progress>
          </div>
          <div class="ul-widget-app__poll-list mb-4">
            <div class="d-flex">
              <span class="text-muted text-12">From Brazil</span>
              <span class="text-muted text-12 ml-auto">
                25%
                <i class="i-Turn-Down-2 text-14 text-danger font-weight-700"></i>
              </span>
            </div>
            <b-progress height="5px" variant="success" :value="25"></b-progress>
          </div>
          <div class="ul-widget-app__poll-list">
            <div class="d-flex">
              <span class="text-muted text-12">From India</span>
              <span class="text-muted text-12 ml-auto">
                25%
                <i class="i-Turn-Down-2 text-14 text-danger font-weight-700"></i>
              </span>
            </div>
            <b-progress height="5px" variant="danger" :value="25"></b-progress>
          </div-->
        </b-card>
      </b-col>

      <!-- start::top-authors -->
      <b-col lg="6" xl="6" md="12" class="mb-30">
        <b-card class>
          <div class="card-title">Top Controleur</div>
          <div
            class="d-flex flex-column flex-md-row text-center text-md-left text-lg-left flex-lg-row align-items-center border-bottom-dotted-dim pb-3 mb-3"
          >
            <img class="avatar-md rounded mr-md-3 mb-2" src="@/assets/images/faces/2.jpg" alt />
            <div class="flex-grow-1">
              <h6 class="m-0">Atangana Norbert</h6>
              <p class="m-0 text-small text-muted">Satellite Ngono</p>
            </div>
            <div>
              <b-badge pill variant="success p-1">98%</b-badge>
            </div>
          </div>
          <div
            class="d-flex flex-column flex-md-row text-center text-md-left text-lg-left flex-lg-row align-items-center border-bottom-dotted-dim pb-3 mb-3"
          >
            <img class="avatar-md rounded mr-md-3 mb-2" src="@/assets/images/faces/3.jpg" alt />
            <div class="flex-grow-1">
              <h6 class="m-0">Fotso Dagobert</h6>
              <p class="m-0 text-small text-muted">YDRA</p>
            </div>
            <div>
              <b-badge pill variant="success p-1">96%</b-badge>
            </div>
          </div>
          <div
            class="d-flex flex-column flex-md-row text-center text-md-left text-lg-left flex-lg-row align-items-center border-bottom-dotted-dim mb-3"
          >
            <img class="avatar-md rounded mr-md-3 mb-2" src="@/assets/images/faces/4.jpg" alt />
            <div class="flex-grow-1">
              <h6 class="m-0">Poula Jessica</h6>
              <p class="m-0 text-small text-muted">Gilbert Joséphine</p>
            </div>
            <div>
              <b-badge pill variant="success p-1">90%</b-badge>
            </div>
          </div>
        </b-card>
      </b-col>






      <!-- best_sellers -->
      <b-col sm="12" md="6" lg="6" xl="4" class="mb-30">
        <b-card title="Raccourcis" class>
          <div class="ul-widget-app__browser-list">
            <div class="ul-widget-app__browser-list-1 mb-4">
              <i class="i-Chrome text-18 text-danger font-weight-600 mr-3"></i>
              <span class="">Visites</span>
              <b-badge pill variant="success p-1">Ouvrir</b-badge>
            </div>

            <div class="ul-widget-app__browser-list-1 mb-4">
              <i class="i-Firefox text-18 text-warning font-weight-600 mr-3"></i>
              <span class="">Caissiers</span>
              <b-badge pill variant="danger p-1">Ouvrir</b-badge>
            </div>

            <div class="ul-widget-app__browser-list-1 mb-4">
              <i class="i-Firefox text-18 text-warning font-weight-600 mr-3"></i>
              <span class="">Ventes</span>
              <b-badge pill variant="danger p-1">Ouvrir</b-badge>
            </div>

          </div>
        </b-card>
      </b-col>


    </b-row>
    </b-overlay>
  </div>
</template>
<script>

import { basicLine } from "@/data/echarts";
import { echart4, echart5 } from "@/data/dashboard2";
import moment from 'moment';
import axios from 'axios';
import constants from "../../../../src/plugins/constants";

export default {
  metaInfo: {
    title: "Dashboard"
  },
  data: () => ({
    selected:"x",
    visitOfTheDay: null,
    caOfTheDay:null,
    businessData:{},
    show : true,

    echart4,
    echart5,
    basicLine
  }),
  methods: {


      getBusinessDataOfDay(){
          axios.get(constants.resource_url+'admin/dashboard/business')
              .then(org => {
                  if(org.data.success) {
                      this.businessData = org.data.data,
                      this.show = false;
                  }
                  this.setCaGraph()
              })
              .catch((error)=> {
                  this.businessData = {};
                  this.show = false;
              })
      },

      setCaGraph(){
          echart4.series[0].data = this.businessData.caGraph
      },

      formatDate(value) {
          return moment(value).format("yyyy-MM-DD")
      },

      timeAgo(value){
          return moment(value).fromNow();
      }


  },
  mounted(){
      this.getBusinessDataOfDay()

  }
};
</script>
<style>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
