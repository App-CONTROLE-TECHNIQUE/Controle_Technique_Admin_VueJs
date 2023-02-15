<template>

        <select id="favcity"  name="select" @change="changeLocal()" v-model="lang">
            <option  value="fr">Fr</option>
            <option  value="en">En</option>
        </select>


</template>

<script>

    export default {
        name: 'languagedrop',
        props:{
            //lang:String
        },
        data() {
            return {
                lang:(!(localStorage.getItem('lang')===null))?localStorage.getItem('lang'):'fr'
            }
        },
        methods: {
            changeLocal: function(data){

                console.log('lan',this.$i18n.locale)
                console.log('lan',data)
                console.log('lan',this.lang)
                this.$emit("changeLocal",this.lang);
            }
        },

        mounted(){
            console.log('lan',this.lang)
        }

    }
</script>


<style scoped>

    select {

        width: 90px;
        background-color: transparent;
        position: relative;
        display: block;
        padding: 11px 24px;
        border:0px;
    }
    option{
        position: absolute;
        background-color: #f2f2f2;
        width: 100%;
        border-radius: 0 0 3px 3px;
        padding: 11px 14px;
        cursor: pointer;
    }
    option:hover{
        background-color: rgb(83, 161, 214);
        color: #fff;
        font-weight: bold;
    }


    </style>