sap.ui.define(
    ["ibm/fin/ar/controller/BaseController",
     "ibm/fin/ar/models/models"],
    function(BaseController, Models){
        return BaseController.extend("ibm.fin.ar.controller.Main", {
            onInit: function(){
                var oSpiderman = Models.createMyJSONModel("models/mockdata/sample.json");
                var oIronman = Models.createMyJSONModel("models/mockdata/sample2.json");
                //Step 3: Make the model aware to the application
                sap.ui.getCore().setModel(oSpiderman);
                sap.ui.getCore().setModel(oIronman, "iron");
                this._bindValue();
            },
            _bindValue: function(){
                //Step 4: Binding - 4 ways we can do property binding - SYNTAX
                var oSalary = this.getView().byId("idSalary");
                //Syntax 3
                //oSalary.setValue("9000");
                oSalary.bindValue("/empStr/salary"); //.bindProperty("enabled", "/empStr/sherlock");
                var oCurr = this.getView().byId("idCurrency");
                oCurr.bindProperty("value", "/empStr/currency");
                //oCurr.bindProperty("enabled","/empStr/sherlock");
            },
            mario: false,
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

                //Technique 2.1: using global variable
                // if(this.mario === true){
                //     this.mario = false;
                // }else{
                //     this.mario = true;
                // }
                //Technique 2.2: using state of input field
                // var oInp = this.getView().byId("idEmpId");
                // var state = oInp.getEnabled();
                // if(state === false){
                //     state = true
                // }else{
                //     state = false;
                // }
                //Technique 2.3: using button label
                // var state = false;
                // var label = this.getView().byId("idBtn").getText();
                // if(label === "Click Me"){
                //     state = true;
                //     this.getView().byId("idBtn").setText("Click me again");
                // }else{
                //     state = false;
                //     this.getView().byId("idBtn").setText("Click Me");
                // }
                //Technique 2.4: using direct model property
                var oModel = sap.ui.getCore().getModel();
                var state = oModel.getProperty("/empStr/sherlock");
                if(state === false){
                    state = true;
                }else{
                    state = false;
                }

                //Technique 3: Using binding
                //1: get the object of your model again - less code, no id dependency, no looping
                
                console.log(oModel);
                //2: change the value in the model for sherlock property by its address
                oModel.setProperty("/empStr/sherlock", state);
            }
        });
});