<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-data-table
            :headers="headers"
            :items="desserts"
            sort-by="libelle"
            class="elevation-1"
    >

        <template v-slot:top>
            <v-toolbar
                    flat
            >
                <v-toolbar-title>Gérer</v-toolbar-title>
                <v-divider
                        class="mx-4"
                        inset
                        vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog
                        v-model="dialog"
                        max-width="750px"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                                color="primary"
                                dark
                                class="mb-2"
                                v-bind="attrs"
                                v-on="on"
                        >
                            Ajouter
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="close"
                            >
                                {{ $t("Annuler") }}
                            </v-btn>
                            <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="save"
                            >
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
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
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                    small
                    @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn
                    color="primary"
                    @click="initialize"
            >
                Reset
            </v-btn>
        </template>
    </v-data-table>
</template>
<script>
    export default{

        props:{
            schema:"",
            model:"",
            formOptions:"",
            headers:""
        },
        data(){
            return {

            }
        },
        methods:{
            closeDelete(){},
            deleteItemConfirm(){},
            deleteItem(){},
            close(){},
            save(){},
            editItem(){},


        }

    }
</script>
