//Scaffolding template - 
//AMD like Syntax - Asynchronous Module Loading
sap.ui.define(
    ["tom/controller/BaseController"], 
    function(Controller){
        return Controller.extend("tom.controller.Login",
             {
                onInit: function(){
                    this.oView = this.getView();
                },
                //oView: this.getView(),
                anubhav: 'demo',
                onLogin: function(){
                    //Step 1: get the object of fields and get the values
                    //We can omit giving viewId--controlId
                    var oInpUser = this.oView.byId("idUser");
                    var oPassword = this.oView.byId("idPassword");
                    var sUser = oInpUser.getValue();
                    var sPassword = oPassword.getValue();
                    //Extra Validation
                    if(sUser === "" || sPassword === ""){
                        alert("Please enter atleast some value");
                        return;
                    }

                    //Step 2: validate and compare the values
                    if(sUser === sPassword){
                        //Step 3: if values are same, show dom change
                        document.write("Login Success");
                    }else{
                        //Step 4: else give error
                        alert("please provide valid credentials");
                    }
                    
                    
                },
                function2 : function(){
                    var oView = this.oView;
                },
                function3 : function(){
                    var oView = this.oView;
                }
          });
});