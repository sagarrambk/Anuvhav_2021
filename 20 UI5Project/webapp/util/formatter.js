sap.ui.define([
    "sap/ui/core/format/NumberFormat"
], function(NumberFormat) {
    'use strict';
    return {
        changeNameToUC: function(inp){
                if(inp){
                    return inp.toUpperCase();
                }
            },
        formatCurrency: function(amount, curr){
            //step 1: object of number format class given by UI5
            var oCurrencyFormat = NumberFormat.getCurrencyInstance({
                currencyCode: false
            });
            //step 2: format the currency amount
            return oCurrencyFormat.format(amount, curr);
        },
        getStatus: function(eStat){
            switch (eStat) {
                case 'E':
                    return "Employed";
                    break;
                case 'T':
                    return "Terminated";
                    break;
                default:
                    break;
            }
        },
        getStatusColor: function(eStat){
            switch (eStat) {
                case 'E':
                    return "Success";
                    break;
                case 'T':
                    return "Error";
                    break;
                default:
                    break;
            }
        }
    };
});