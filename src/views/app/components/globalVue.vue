<template>
    <div class="main-content" style="width: 1100px">
        <b-button v-if="previousButtonn" variant="info btn-icon ripple m-1" @click="previous">
            <span class="ul-btn__icon"><i class="i-Arrow-Back-3"></i></span>
        </b-button>
        <breadcumb :page="pagenamee" :folder="'Options'" />

        <b-row>
            <b-col md="11 mb-30">
                <b-card class="card mb-30"
                        header=""
                        header-bg-variant="transparent">
                    <b-tabs pills>
                        <b-tab title="List">
                            <template slot="title">
                                <i class="i-Newspaper text-15"></i>
                            </template>
                            <Datatablelist :home="homee" :deleteUrl="deleteUrll" :addVue="addVvue" :addjson="adddjson" :dialogDelete="dialogDeletee" :headers="headerss" :desserts="listt" :editButton="editButtonn"
                                           :addButton="addButtonn" :openButton="openButtonn"
                                           :deleteButton="deleteButtonn" @deleteItemConfirm="deleteItemConfirm" @resetItemConfirm="resetItemConfirm"
                                           :resetButton="resetButtonn"
                                           @editItem="editItem" @deleteItem="deleteItem" @openItem="openItem"
                                           @resetItem="resetItem"
                                           @openPdf="openPdf"
                                           @handlePageChange="handlePageChange"
                                           @handlePageSizeChange="handlePageSizeChange"
                                           @verifPlate="verifPlate"
                                           :model="modell" :title="titlee"
                                           :fillselectUrl="fillselectUrll"
                                           :saveUrl="saveUrll"
                                           :fillSecondSelectUrl="fillSecondSelectUrll"
                                           :fillThirdSelectUrl="fillThirdSelectUrll"
                                           :fillFourthSelectUrl = "fillFourthSelectUrll"
                            ></Datatablelist>
                        </b-tab>
                        <b-tab title="Kanban">
                            <template slot="title">
                                <i class="i-Split-Four-Square-Window text-15"></i>
                            </template>
                            <ListKanban :rows_kanban="list_kanbann" ></ListKanban>
                        </b-tab>

                        <b-tab title="Graph" >
                            <template slot="title">
                                <i class="i-Bar-Chart text-15"> </i>
                            </template>
                            <ListGraph :name_graph="name_graphh" :datae="list_camembertt" :listhisto="list_histt" :abcis="abciss"></ListGraph>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </b-col>
            <!-- form-inputs-rounded -->
        </b-row>
    </div>
</template>

<script>
    import Datatablelist from './datatablelist';
    import ListKanban from './list-kanban'
    import ListGraph from './list-graph'
    export default {
        name: "GlobalVue",
        data(){
            return {
                name_graphh: this.name_graph,
                pagenamee: this.pagename,
                homee: this.home,
                headerss: this.headers,
                dialogDeletee:this.dialogDelete,
                listt: this.list,
                deleteUrll: this.deleteUrl,
                previousButtonn: this.previousButton,
                editButtonn: this.editButton,
                adddjson : this.addjson,
                modell: this.model,
                addVvue : this.addVue,
                addButtonn: this.addButton,
                openButtonn: this.openButton,
                resetButtonn : this.resetButton,
                deleteButtonn: this.deleteButton,
                list_kanbann: this.list_kanban,
                percent_visitt: this.percent_visit,
                list_histt: this.list_hist,
                abciss: this.abcis,
                list_camembertt: this.list_camembert,
                titlee: this.title,
                fillselectUrll: this.fillselectUrl,
                saveUrll: this.saveUrl,
                fillSecondSelectUrll: this.fillSecondSelectUrl,
                fillThirdSelectUrll: this.fillThirdSelectUrl,
                fillFourthSelectUrll : this.fillFourthSelectUrl
            }
        },
        props:{
            pagename: String,
            name_graph: String,
            previousButton: Boolean,
            dialogDelete: Boolean,
            headers: Array,
            deleteUrl: String,
            list: String,
            editButton: Boolean,
            addVue: String,
            addButton: Boolean,
            home: String,
            openButton: Boolean,
            deleteButton: Boolean,
            resetButton: Boolean,
            list_kanban: Array,
            addjson: Object,
            percent_visit: Array,
            list_hist: Array,
            abcis: Array,
            list_camembert: Array,
            model: Object,
            title: String,
            fillselectUrl: String,
            saveUrl: String,
            fillSecondSelectUrl: String,
            fillThirdSelectUrl: String,
            fillFourthSelectUrl : String

        },
        components: {
            Datatablelist, ListKanban,ListGraph
        },
        methods:{
            handlePageChange(value) {
                this.$emit('handlePageChange')

            },
            handlePageSizeChange(event) {
                this.$emit('handlePageSizeChange')
            },

            previous(){
                this.$emit('previous')
            },
            deleteItemConfirm(item){
                this.$emit('deleteItemConfirm', item)
            },
            editItem(item){
                this.$emit('editItem', item)
            },
            deleteItem(item){
                this.$emit('deleteItem', item)
            },
            verifPlate(item){
                this.$emit('verifPlate')
            },
            openItem(item){
                this.$emit('openItem', item)
            },
            resetItem(item){
                this.$emit('resetItem', item)
            },
            resetItemConfirm(item){
                this.$emit('resetItemConfirm', item)
            },
            openPdf(item){
                this.$emit('openPdf', item)
            }
        },

        mounted(){
            console.log('g list global vue',this.list )
            console.log('g listt global vue',this.listt )

        }

    }

</script>

<style scoped>

</style>