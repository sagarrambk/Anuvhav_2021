sap.ui.define([
    'anubhav/app/controller/BaseController',
    'sap/m/MessageBox',
    'sap/m/MessageToast'
], function(BaseController,MessageBox ,MessageToast) {
    'use strict';
    return BaseController.extend("anubhav.app.controller.View1",{
        onInit: function(){
            //this.oRouter = this.getOwnerComponent().getRouter();
            BaseController.prototype.onInit.apply(this);
        },
        onNext: function(){
            //Step 1: go to parent - Anil - kokilaben
            //var oAppCon = this.getView().getParent();
            //Step 2: navigate to mukesh - next view
            //oAppCon.to("idMukesh");
            this.oRouter.navTo("minion",{
                kaven: 10
            });
        },
        onSearch: function(oEvent){
            //Step 1: we need to know what user enter in search field
            var searchVal = oEvent.getParameter("query");
            MessageToast.show(searchVal);
            //Step 2: prepare a filter for that search
            var oFilter = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, searchVal);
            //Step 3: Inject the filter inside of List Control Object (List Control)
            var oList = this.getView().byId("idList");
            oList.getBinding("items").filter([oFilter]);
        },
        onAfterRendering: function(){
            $("#idAnil--myBtn").hide(function(){ $(this).fadeIn(5000) });
        },
        onOrder: function(){
            //alert("order is success");
            MessageBox.confirm("Do you like to confirm order?",{
                title: "Confirm Order?",
                onClose: function(value){
                    //console.log(value);
                    if(value === "OK"){
                        MessageToast.show("Your order is placed successfully, Order no id XXXXXXX");
                    }else{
                        MessageBox.error("Order was rejected");
                    }
                }
            });
        }
    })   ;
});