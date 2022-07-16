sap.ui.define(
    ["tom/controller/BaseController"],
    function(Controller){
        return Controller.extend("tom.controller.Main",{
            onInit: function(){
                //constructor of the controller class
                //alert("UI5 now created controller object");
            },
            myFunction: function(){
                //Step 1:Somehow the object of that input field 
                //HTML Element Object
                //var oControl = document.getElementById("idSpidy");
                //Runtime instance(object) of running app
                //Technique 1
                // var oNishan = sap.ui.getCore();
                // var oKuldeep = oNishan.byId("idSpidy");
                //chaining concept used to obtain UI5 control object
                var oKuldeep = sap.ui.getCore().byId("idSpidy");
                //Step 2:From this object -Read Data
                //oKuldeep.setEnabled(false);
                var sVal = oKuldeep.getValue();
                //Step 3:Show the data in popup
                alert(sVal);
            },
            enableBtn: function(){
                //when event handler is called
                //system will not assign the (current class)controller object
                //to our 'this' pointer, we have to do it explictly

                //Step 1: get the button object
                var oBtn = sap.ui.getCore().byId("idAnubhav");
                //Step 2: subscribe press event dynamically
                //this is a built-in object which points
                //to current class - here its Controller
                oBtn.attachPress(this.myFunction);

            }
        });
});