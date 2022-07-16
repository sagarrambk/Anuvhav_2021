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
                        "currency": "EUR",
                        "sherlock": false
                    }
                });
                //Step 3: Make the model aware to the application
                sap.ui.getCore().setModel(oSpiderman);
                //Step 4: Binding - 4 ways we can do property binding - SYNTAX
                var oSalary = this.getView().byId("idSalary");
                //Syntax 3
                //oSalary.setValue("9000");
                oSalary.bindValue("/empStr/salary"); //.bindProperty("enabled", "/empStr/sherlock");
                var oCurr = this.getView().byId("idCurrency");
                oCurr.bindProperty("value", "/empStr/currency");
                //oCurr.bindProperty("enabled","/empStr/sherlock");
            },
            onMagic: function(){
                //Get object of every field and do it
                //Technique 1: get object of each field and do
                // var oEmpId = this.getView().byId("idEmpId");
                // oEmpId.setEnabled(true);
                // var oEmpName = this.getView().byId("idEmpName");
                // oEmpName.setEnabled(true);
                // var oSalary = this.getView().byId("idSalary");
                // oSalary.setEnabled(true);
                // var oCurrency = this.getView().byId("idCurrency");
                // oCurrency.setEnabled(true);

                //Technique 2: Using parent Child - Complex, dependnt on id, multiple lines
                // var oForm = this.getView().byId("idNew");
                // var aContent = oForm.getContent();
                // for (let i = 0; i < aContent.length; i++) {
                //     const element = aContent[i];
                //     if(element.getMetadata().getName() === "sap.m.Input"){
                //         element.setEnabled(true);
                //     };
                // }

                //Technique 3: Using binding
                //1: get the object of your model again - less code, no id dependency, no looping
                var oModel = sap.ui.getCore().getModel();
                console.log(oModel);
                //2: change the value in the model for sherlock property by its address
                oModel.setProperty("/empStr/sherlock", true);
            }
        });
});