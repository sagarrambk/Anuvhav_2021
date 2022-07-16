sap.ui.define([
    'anubhav/app/controller/BaseController',
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox"
], function(BaseController, MessageToast, Filter, FilterOperator, MessageBox) {
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
        onSave: function(){
            var that = this;
            MessageBox.confirm("Do you want to save",{
                onClose: function(status){
                    that.onClose(status);
                }
            });
        },
        onTabSelect: function(oEvent){
            this.getView().getParent().getParent().setLayout(sap.f.LayoutType.ThreeColumnsMidExpanded);
            this.oRouter.navTo("end",{
                supplierId: "TEST"
            });
        },
        onClose: function(status){
            if(status === "OK"){
                MessageToast.show("Your Order has been saved");
            }
        },
        herculis: function(oEvent){
            var myVar = oEvent.getParameter("arguments").kaven;
            console.log("aa gaya - it has come , Kevan ka value -- " + myVar);
            //address of the selected fruit on first screen
            debugger;
            var fruitRelativePath = "/" + myVar;
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
        oPopupCities: null,
        oPopupSuppliers: null,
        onFilter: function(oEvent) {
            //step 1: check if the popup object was already created
            if(!this.oPopupSuppliers){
                //step 2: if not created, create a new object pass the controller object to the fragement object
                this.oPopupSuppliers = new sap.ui.xmlfragment("supplierPopup", "anubhav.app.fragments.popup", this);
                //Step 3: using remote control (object) change the title of the popup
                //EXTRA: Get Text from i18n @ runtime
                var oResource = this.getOwnerComponent().getModel("i18n");
                var sTitle = oResource.getResourceBundle().getText("XTIT_SUPPLIER");
                this.oPopupSuppliers.setTitle(sTitle);
                this.oPopupSuppliers.setMultiSelect(true);
                //Step 4: Provide access to View Resources (model) to the fragment object 
                //giving access to the data which my view has
                this.getView().addDependent(this.oPopupSuppliers);
                //Step 5: @ Runtime we will do the Aggregation binding to populate items of SelectDialog control
                this.oPopupSuppliers.bindAggregation("items",{
                    path: 'local>/suppliers',
                    template: new sap.m.ObjectListItem({
                        intro: "{local>city}",
                        title: "{local>name}",
                        number: "{local>sinceWhen}",
                        numberUnit: "{local>contactPerson}",
                        icon: "sap-icon://supplier"
                    })
                });
            }else{
                this.oPopupSuppliers.getBinding("items").filter([]);
            }            
            this.oPopupSuppliers.open();
        },
        onRequest: function(oEvent){
            //snapshot of the field on which F4 was pressed as there are so many fields
            //inside the table, we need exact field on which later we set the value
            this.myField = oEvent.getSource();
            //MessageToast.show("here a popup will come soon");
            if(!this.oPopupCities){
                this.oPopupCities = new sap.ui.xmlfragment("cityPopup", "anubhav.app.fragments.popup", this);
                this.oPopupCities.setTitle("Cities");
                //giving access to the data which my view has
                this.getView().addDependent(this.oPopupCities);
                this.oPopupCities.bindAggregation("items",{
                    path: 'local>/cities',
                    template: new sap.m.StandardListItem({
                        description: "{local>famousFor}",
                        title: "{local>name}"
                    })
                });
            }else{
                this.oPopupCities.getBinding("items").filter([]);
            }           
            this.oPopupCities.open();

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
        isSupplierPopup:function(id){
            if(id.indexOf("supplierPopup") != -1){
                return true;
            }else{
                return false;
            }
        },
        onSearch: function(oEvent){
            var sId = oEvent.getSource().getId();
            var oFilter = new Filter("name", FilterOperator.Contains, oEvent.getParameter("value"));
            if(this.isSupplierPopup(sId)){
                this.oPopupSuppliers.getBinding("items").filter([oFilter]);
            }else{
                this.oPopupCities.getBinding("items").filter([oFilter]);
            }
        },
        onCancel: function(){
            this.getView().byId("idTable").getBinding("items").filter([]);
        },
        onConfirm: function(oEvent){
            var sId = oEvent.getSource().getId();
            if(this.isSupplierPopup(sId)){
                //User can select multiple item, get all of them
                var aItems = oEvent.getParameter("selectedItems");
                if(aItems.length === 0){
                    return;
                }
                var aFilter = [];
                //For each item we will build a filter object
                for (let i = 0; i < aItems.length; i++) {
                    const element = aItems[i];
                    aFilter.push(new Filter("name", FilterOperator.EQ, element.getTitle()));
                }
                //Build a main filter with OR
                var oFilter = new Filter({
                    filters: aFilter,
                    and: false
                });
                //Push this to the table binding
                this.getView().byId("idTable").getBinding("items").filter(oFilter);
            }else{
                var oSelectedItem = oEvent.getParameter("selectedItem");
                this.myField.setValue(oSelectedItem.getTitle());
            }
        },
        onAfterRendering: function(){
            $("#idMukesh--zkas").hide(function(){ $(this).fadeIn(5000) });
        }
    })   ;
});