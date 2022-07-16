sap.ui.define([
    'anubhav/app/controller/BaseController',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    "anubhav/app/util/formatter"
], function(BaseController,MessageBox ,MessageToast, Formatter) {
    'use strict';
    return BaseController.extend("anubhav.app.controller.View1",{
        formatter: Formatter,
        onInit: function(){
            //this.oRouter = this.getOwnerComponent().getRouter();
            BaseController.prototype.onInit.apply(this);
        },
        onNext: function(ikaven){
            //Step 1: go to parent - Anil - kokilaben
            //var oAppCon = this.getView().getParent();
            //Step 2: navigate to mukesh - next view
            //oAppCon.to("idMukesh");
            this.oRouter.navTo("minion",{
                kaven: ikaven
            });
        },
        onItemPress: function(oEvent) {
            //Step 1: Get the item object on which item user clicked
            var oSelectedItem = oEvent.getParameter("listItem");
            //Step 2: get the value of the fruit name from that object - title
            var fruitName = oSelectedItem.getTitle();
            //Step 3: Call Router to navigate and SET the kaven 
            // this.oRouter.navTo("minion",{
            //     kaven: fruitName
            // });
            //Step 4: Get The Path of selected Item
            debugger;
            var sPath = oSelectedItem.getBindingContextPath();
            var sIndex = sPath.split("/")[sPath.split("/").length - 1];
            this.onNext(sIndex);
        },
        onShowSelItems: function(oEvent) {
            //Step 1: Get list Control object
            var oList = this.getView().byId("idList");
            //Step 2: get all selected list items
            var aItems = oList.getSelectedItems();
            //Step 3: loop over them and print one by one
            aItems.forEach(element => {
                console.log(element.getTitle());
            });
        },
        onDelete: function(oEvent) {
            //Step 1: which item was clicked to be deleted
            var oDeletedItem = oEvent.getParameter("listItem");
            var sPath = oDeletedItem.getBindingContextPath();
            var sIndex = sPath.split("/")[sPath.split("/").length - 1];
            //Step 2: read all the model data
            var oModel = this.getOwnerComponent().getModel("local");
            var aData = oModel.getProperty("/fruits");
            //Step 3: Delete the item @ index
            aData.splice(sIndex, 1);
            //Step 5: set the data back to the model
            oModel.setProperty("/fruits", aData);

        },
        onSearch: function(oEvent){
            //Step 1: we need to know what user enter in search field
            var searchVal = oEvent.getParameter("query");
            MessageToast.show(searchVal);
            //Step 2: prepare a filter for that search
            var oFilter1 = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, searchVal);
            var oFilter2 = new sap.ui.model.Filter("type", sap.ui.model.FilterOperator.Contains, searchVal);
            var oFilter = new sap.ui.model.Filter({
                filters: [oFilter1, oFilter2],
                and : false
            });
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