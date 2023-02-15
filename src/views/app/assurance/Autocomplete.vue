<template>
    <div>
        <span v-if="spinner" class="spinner-glow spinner-glow-primary mr-5 mb-4"></span>
                <b-form-input
                        autocomplete="off"
                        type="text"
                        @input="searchPartners({val:msg})"
                        @change="change"
                        v-model="userInput"
                        placeholder=""
                        ref="client"
                        size="sm"
                        @focus="deleteText({val:msg})"

                >
                </b-form-input>
            <div v-if="onSelect">
                <span v-if="isVisiteOk" class="badge badge-success"> Visite OK</span>
                <span v-if="!isVisiteOk" class="badge badge-danger"> Visite KO</span>
            </div>

            <b-list-group v-if="filteredSuggestions.length">

                <b-list-group-item v-for="(s,i) in filteredSuggestions" :key="i"
                                   @click="selected({item:s,msg:msg})">{{s[optionsKey]}} -- <b>{{s[optionsKey1]}}</b>


                </b-list-group-item>

            </b-list-group>


    <!--@click="removeCatProducts(data)"-->
    </div>
</template>

<script>
    import useAutocomplete from '../../../store/modules/useAutocomplete'

    export default {
        name:"AutoComplete",
        props:{
            msg:String,
            options:Array,
            optionsKey:String,
            optionsKey1:String,
            spinner: Boolean,
            isVisiteOk: Boolean,
            onSelect: Boolean
        },

        setup({options,optionsKey,optionsKey1,spinner,isVisiteOk, onSelect}){
            return {
                ...useAutocomplete(options,optionsKey,optionsKey1,spinner,isVisiteOk, onSelect)
            }
        },
        data(){
            return {}
        },
        methods:{
            change(value){
                this.$emit("save-change",value);

            },
            loadData: function(_clear){
                if(_clear){
                this.$emit("save-option",{});
                this.userInput = ""

            }else{

                this.$emit("save-options",{userInput:this.userInput,msg:this.msg});

            }


        },
            initcontacts:function(){
                this.userInput=''
            },
    }
    }

</script>

<style scoped>
    </style>