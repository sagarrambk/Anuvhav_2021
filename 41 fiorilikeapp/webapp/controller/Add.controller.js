sap.ui.define([
    "anubhav/app/controller/BaseController",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function(BaseController, MessageToast, MessageBox) {
    'use strict';
    return BaseController.extend("anubhav.app.controller.Add",{
        onInit: function(){
            this._localModel = this.getOwnerComponent().getModel("local");
            this.oDataModel = this.getOwnerComponent().getModel();
        },
        onLoadExp: function(oEvent){
        	var that = this;
        	this.oDataModel.callFunction("/GetMostExpensiveProduct", {
        		success: function(response){
        			that._localModel.setProperty("/newProduct", response);
        		}	
        	});
        },
        onDelete: function(oEvent){
        	var productId = this._localModel.getProperty("/newProduct/PRODUCT_ID");
        	var that = this;
        	MessageBox.confirm("Do you want to delete?",{
        		onClose: function(status){
        			if(status === "OK"){
        				that.oDataModel.remove("/ProductSet('"  + productId + "')",{
			        		success: function(){
			        			MessageToast.show("The delete was success, yey!!");
			        		},
			        		error: function(){
			        			
			        		}
			        	});
        			}
        		}
        	})
        	
        },
        onSave: function(){
            //step 1- get odata model object
            
            //step 2- prepare payload
            var payload = this._localModel.getProperty("/newProduct");
            if(!payload.PRICE || payload.PRICE === "" || payload.PRICE === 0){
            	this.getView().byId("idPrice").setValueState("Error");
            	this.getView().byId("idPrice").setValueStateText("Dude, this is the guy who is wrong");
            	MessageBox.error("Price sahi nahi hai");
            	return;
            }else{
            	this.getView().byId("idPrice").setValueState("None");
            	this.getView().byId("idPrice").setValueStateText("");
            }
            //step 3- fire POST call using create method
            if(this.mode === "U"){
            	this.oDataModel.update("/ProductSet('" + payload.PRODUCT_ID + "')", payload, {
	                success: function(data){
	                    MessageToast.show("The product has been updated in SAP !!!");
	                },
	                error: function(){
						
	                }
	            });
            }else{
            	this.oDataModel.create("/ProductSet", payload, {
	                success: function(data){
	                    MessageToast.show("The product has been created in SAP !!!");
	                },
	                error: function(){
	
	                }
	            });
            }
            //step 4- handle response
        },
        oDialog: null,
        mode: "C",
        onItemSelect: function(oEvent){
        	//step 1: get the selected item from event
        	var oSelectedItem = oEvent.getParameter("selectedItem");
        	//step 2: get its label
        	var productId = oSelectedItem.getLabel();
        	//step 3: load single product from sap backend
        	this._localModel.setProperty("/newProduct/PRODUCT_ID", productId);
        	//step 4: in callback set the screen value
        	var that = this;
        	this.oDataModel.read("/ProductSet('" + productId + "')", {
        		success: function(response){
        			that._localModel.setProperty("/newProduct", response);
        			that.mode = "U";
        		},
        		error: function(){
        			that.mode = "C";
        		}
        	});
        	//step 5: on save we should UPDATE instead create
        },
        onProductVH: function(){
        	
        	if(!this.oDialog){
        		this.oDialog = new sap.m.SelectDialog({
	        		title: "Select Your product",
	        		confirm: [this.onItemSelect, this]
	        	});
	        	this.oDialog.bindAggregation("items",{
	        		path: "/ProductSet",
	        		template: new sap.m.DisplayListItem({
	        			label: "{PRODUCT_ID}",
	        			value: "{NAME}"
	        		})
	        	});
	        	this.getView().addDependent(this.oDialog);
        	}
        	this.oDialog.open();
        	
        }
    });
});