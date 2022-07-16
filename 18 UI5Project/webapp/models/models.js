sap.ui.define([
    'sap/ui/model/json/JSONModel'
], function(JSONModel) {
    'use strict';
    return {
        createMyJSONModel: function(filePath) {
            //Step 1: Create a Brand new model object
            var oModel = new JSONModel();
            //Step 2: Set or load the data in the model
            //oModel.setData();
            oModel.loadData(filePath);
            return oModel;
        }
    };
});