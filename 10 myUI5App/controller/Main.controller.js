sap.ui.define(
    ["sap/ui/core/mvc/Controller"],
    function(Controller){
        return Controller.extend("tom.controller.Main",{
            myFunction: function(){
                alert("welcome");
            }
        });
});