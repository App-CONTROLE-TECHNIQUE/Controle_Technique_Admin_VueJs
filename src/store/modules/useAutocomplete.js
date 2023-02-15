import { toRefs , reactive} from "@vue/composition-api"
import axios from "axios";
import constants from '../../plugins/constants'

const useAutocomplete = (options,key,key1,spinner,isVisiteOk,onSelect) => {

    let state = reactive(
        {
        userInput: "",
        filteredSuggestions:[],
        suggestions:options,
        resource_url: constants.resource_urls

    })


    let selected = function (data){

        let s = data.msg

        let _item = data.item
        console.log('click',data);
        console.log('clicks',_item);
        state.userInput = _item[key];// + "  " +_item[key1] ;
        state.filteredSuggestions = [];
        //state.selectedItem = {userInput:state.userInput,item:s}

        switch(s){

            case 'assurance':
                state.userInput = _item[key]  ;
                //this.$store.state.assurance.vehicules = data
                //this.$store.state.categorieproducts.vehicules = _item["chassis"]
                this.$emit('register',_item)
                break;

        }
        axios.get(constants.resource_urls + 'search/cartegrise/assurance/visite/' + data.item.numImmatriculation)
            .then(visite => {
                this.isVisiteOk = visite.data.data;
                this.onSelect = true;
                console.log('visite ok ?',visite.data.data);
                //onChange('yes')
            }).catch(function(error) {
            console.log('products_error',error);
        });
    }


    let deleteText = function (_item){
        console.log('eventw',_item);
        state.userInput = "";
        state.filteredSuggestions = [];
        state.selectedItem = {}
        switch(_item) {
            case 'assurances':
                //this.$store.state.categorieproducts.clientsId = 0
                break;

        }


    }


    let searchPartners = function (data){
        this.spinner = true;
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.timer = setTimeout(() => {
            axios.get(state.resource_url+'search/cartegrise/'+data.val+'/'+state.userInput)
            //axios.get(state.resource_url+'cartegrise/search/'+state.userInput)
                .then(customer => {
                    this.spinner = false;
                    state.suggestions = customer.data.data;
                    console.log('result',state.suggestions);
                    onChange('yes')
                })

                .catch(function(error) {
                    console.log('products_error',error);
                    // Handle Errors here.
                    // var errorCode = error.code;
                    // var errorMessage = error.message;
                    // console.log(error);

                    //commit("setError", error);
                    // ...
                });

        }, 2000);
    }

    let onChange = function(_event){  /*_event => {*/

            console.log('event', _event);
            console.log('event', key);

            let i = state.userInput;
            //state.selectedItem = {userInput: state.userInput, item: null};

            if (i.length === 0) {
                state.filteredSuggestions = [];
                return;
            }

            var r=[]

            if(key==="assurance"){
                var vehicule = []
                vehicule[0] = state.suggestions[0].numImmatriculation
                state.suggestions = vehicule

                console.log('state', state.suggestions);

                r = state.suggestions.filter(
                    suggestion => suggestion[key].toLowerCase().indexOf(i.toLowerCase()) > -1,
                );

            }else{
                r = state.suggestions.filter(
                    suggestion => suggestion[key].toLowerCase().indexOf(i.toLowerCase()) > -1,
                );
            }




            state.filteredSuggestions = r
            console.log("setError", r);
    }


    return {
        ...toRefs(state),
        selected,
        searchPartners,
        deleteText,
        state
    };

}

export default  useAutocomplete;