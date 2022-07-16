sap.ui.define([
    'sap/ui/model/json/JSONModel',
    "sap/ui/model/xml/XMLModel",
    "sap/ui/model/resource/ResourceModel"
], function(JSONModel, XMLModel, ResourceModel) {
    'use strict';
    return {
        createMyJSONModel: function(filePath) {
            //Step 1: Create a Brand new model object
            var oModel = new JSONModel();
            //Step 2: Set or load the data in the model
            //oModel.setData();
            oModel.loadData(filePath);
            return oModel;
        },
        createXMLModel: function(filePath){
            var oModel = new XMLModel();
            oModel.loadData(filePath);
            return oModel;
        },
        createResourceModel: function(){
            var oModel = new ResourceModel({
                bundleUrl: 'i18n/i18n.properties'
            });
            return oModel;
        }
    };
});