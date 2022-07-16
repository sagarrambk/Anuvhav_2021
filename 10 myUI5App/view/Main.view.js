sap.ui.jsview("tom.view.Main",
{ 
    getControllerName: function(){
        return "tom.controller.Main";
    },
    createContent: function(oController){
        var oSpiderman = new sap.m.Button("idAnubhav",{
                text: "Click Me",
                press: oController.myFunction
            }); 
        
        return oSpiderman;
        // var oInp = new sap.m.Input();
        // oInp.placeAt("ironman");
        // var x = 10;
    }

});