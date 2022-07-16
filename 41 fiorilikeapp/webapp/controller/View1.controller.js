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
            this._localModel = this.getOwnerComponent().getModel("local");
        },
        onNext: function(ikaven){
            //Step 1: go to parent - Anil - kokilaben
            //var oAppCon = this.getView().getParent();
            //Step 2: navigate to mukesh - next view
            //oAppCon.to("idMukesh");
            //this.getView().getParent().getParent().setLayout(sap.f.LayoutType.TwoColumnsMidExpanded);
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
        onAdd: function(){
            this.oRouter.navTo("add");
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
            if(searchVal.indexOf("-") !== -1){
                //step 1: get the object of odata model - default
                var oDataModel = this.getView().getModel();
                //step 2: prepare the path for calling
                var sPath = "/ProductSet('" + searchVal + "')";
                //step 3: perform a read to GET data
                var that = this;
                oDataModel.read(sPath, {
                    success: function(data){
                        debugger;
                        that._localModel.setProperty("/singleProductData", data);
                        that.oDefaultDialog = new sap.m.Dialog({
                            title: "Available Product",
                            content: new sap.ui.layout.form.SimpleForm({
                                content: [
                                    new sap.m.Label({text: "Name"}),
                                    new sap.m.Text({text: "{NAME}"}),
                                    new sap.m.Label({text: "Description"}),
                                    new sap.m.Text({text: "{DESCRIPTION}"}),
                                    new sap.m.Label({text: "Category"}),
                                    new sap.m.Text({text: "{CATEGORY}"}),
                                    new sap.m.Label({text: "Price"}),
                                    new sap.m.Text({text: "{PRICE} {CURRENCY_CODE}"})
                                ]
                            }),
                            endButton: new sap.m.Button({
                                text: "Close",
                                press: function () {
                                    that.oDefaultDialog.close();
                                }.bind(this)
                            })
                        });
                        that.oDefaultDialog.setModel(that._localModel);
                        that.oDefaultDialog.getContent()[0].bindElement("/singleProductData");
                        that.oDefaultDialog.open();
                    },
                    error: function(oErr){
                        debugger;
                        var sMsg = JSON.parse(oErr.responseText).error.innererror.errordetails[0].message;
                        MessageBox.error(sMsg);
                    }
                });
                //step 4: success: open a popup to show data

                //step 5: show error if it comes

            }else{
                var oFilter1 = new sap.ui.model.Filter("CATEGORY", sap.ui.model.FilterOperator.Contains, searchVal);
                var oFilter2 = new sap.ui.model.Filter("type", sap.ui.model.FilterOperator.Contains, searchVal);
                var oFilter = new sap.ui.model.Filter({
                    filters: [oFilter1, oFilter2],
                    and : false
                });
                //Step 3: Inject the filter inside of List Control Object (List Control)
                var oList = this.getView().byId("idList");
                oList.getBinding("items").filter([oFilter1]);
            }
            
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