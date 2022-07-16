sap.ui.define(
    ["ibm/fin/ar/controller/BaseController"],
    function(BaseController){
        return BaseController.extend("ibm.fin.ar.controller.Main", {
            onInit: function(){
                //Step 1: Create a Brand new model object
                var oSpiderman = new sap.ui.model.json.JSONModel();
                //Step 2: Set or load the data in the model
                oSpiderman.setData({
                    "empStr": {
                        "empId": 100,
                        "empName": "Ananya",
                        "salary": 9500,
                        "currency": "EUR"
                    }
                });
                //Step 3: Make the model aware to the application
                sap.ui.getCore().setModel(oSpiderman);
                //Step 4: Binding - 4 ways we can do property binding - SYNTAX
            }
        });
});