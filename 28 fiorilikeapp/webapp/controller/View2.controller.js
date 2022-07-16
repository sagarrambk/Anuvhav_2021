sap.ui.define([
    'anubhav/app/controller/BaseController',
    "sap/m/MessageToast"
], function(BaseController, MessageToast) {
    'use strict';
    return BaseController.extend("anubhav.app.controller.View2",{
        onInit: function(){
            //this.oRouter = this.getOwnerComponent().getRouter();
            BaseController.prototype.onInit.apply(this);
            //Route Matched Handler Concept - it will trigger our method
            //herculis every time the minion route is triggered
            //We can use it for preprocessing and binding purpose
            this.oRouter.getRoute("minion").attachMatched(this.herculis, this);
        },
        herculis: function(oEvent){
            var myVar = oEvent.getParameter("arguments").kaven;
            console.log("aa gaya - it has come , Kevan ka value -- " + myVar);
            //address of the selected fruit on first screen
            debugger;
            var fruitRelativePath = "local>/fruits/" + myVar;
            //bind our view2 completely with this address, element binding
            this.getView().bindElement(fruitRelativePath);
        },
        onBack: function(){
            // //Step 1: go to parent - Anil - kokilaben
            // var oAppCon = this.getView().getParent();
            // //Step 2: navigate to mukesh - next view
            // oAppCon.to("idAnil");
            this.oRouter.navTo("home");
        },
        onBeforeRendering: function(){
            //some condition, some data which is in model
            //if x> 50 then --hide == dynamic code
            //this.getView().byId("zkas").setVisible(false);
        },
        myField: null,
        onRequest: function(oEvent){
            //snapshot of the field on which F4 was pressed as there are so many fields
            //inside the table, we need exact field on which later we set the value
            this.myField = oEvent.getSource();
            //MessageToast.show("here a popup will come soon");
            var oFragment = new sap.ui.xmlfragment("anubhav.app.fragments.popup", this);
            oFragment.setTitle("Cities");
            //giving access to the data which my view has
            this.getView().addDependent(oFragment);
            oFragment.bindAggregation("items",{
                path: 'local>/cities',
                template: new sap.m.StandardListItem({
                    description: "{local>famousFor}",
                    title: "{local>name}"
                })
            });
            oFragment.open();

            // iTable.bindItems("/cities",{
            //     template: new sap.m.ColumnListItem({
            //         cells: [
            //             new sap.m.Text({text: ""}),
            //             new sap.m.Text({text: ""}),
            //             new sap.m.Text({text: ""})
            //         ]
            //     })
            // });
        },
        onConfirm: function(oEvent){
            var oSelectedItem = oEvent.getParameter("selectedItem");
            this.myField.setValue(oSelectedItem.getTitle());
        },
        onAfterRendering: function(){
            $("#idMukesh--zkas").hide(function(){ $(this).fadeIn(5000) });
        }
    })   ;
});