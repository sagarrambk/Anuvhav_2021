sap.ui.jsview("tom.view.Main",
{ 
    getControllerName: function(){
        return "tom.controller.Main";
    },
    createContent: function(oController){

        var oInp = new sap.m.Input("idSpidy",{
            submit: [oController.enableBtn, oController]
        });

        var oSpiderman = new sap.m.Button("idAnubhav",{
                text: "Click Me",
                // press: function(){
                //     ///writing processing logic
                //     //voilation of MVC
                // }
                press: oController.myFunction
        }); 
        
        return [oInp, oSpiderman];
        // var oInp = new sap.m.Input();
        // oInp.placeAt("ironman");
        // var x = 10;
    }

});