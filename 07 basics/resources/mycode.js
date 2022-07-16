function myFirstFunction(){
    //below is a commented code and i am a comment line
    //alert("welcome to js");
    /*multiple line 
    of code can be commeneted
    like this*/

    // i am calling an SAP system
    setTimeout(function(){
        alert('i am line 12 now, called after 10');
    }, 10000);
    myNewFunction();
    alert("i am line 15");
}
function callAnubhav(){
    window.open("https://www.anubhavtrainings.com");
}
function myNewFunction(){
    alert("i am function 2");
}

function spiderman(){
    //document.write("<h4>Wow!!!</h4>");
    var x = 10;
    var y = 20;
    var z = x + y;
    console.log(z);
}
function onLogin(){
    //step 1: get the object of inp field
    //var oInp1 = document.getElementById("idUser");
    var oPass = document.getElementById("idPass");
    //step 2: get the value
    //chaining in js
    var val1 = document.getElementById("idUser").value;
    var val2 = oPass.value;
    //step 3: validate using if
    if(val1 === "Anubhav" && val2 === "Anubhav"){
        //step 4: change ui accordingly
        document.write("Login Success!!");
    }else{
        //step 4: change ui accordingly
        document.getElementById("msg").innerText
        = "Credentials are invalid, please try again";
    }
}
function onMagic(){
    var arr = document.getElementsByClassName("box-title");
    // for(var i=0;i<arr.length;i++){
    //     arr[i].style.background = "black";
    //     arr[i].style.color = "aqua";
    // }

    for(item in arr){
        arr[item].style.background = "black";
    }

    //DO NOT USE BELWO FOR NOW
    // arr.forEach(function(item){
    //     alert(item.innerText);
    // });
    // alert("last line");
}
function dynamicCode(){
    //step 1: create a new html element
    var oNewObject = document.createElement("h3");
    //step 2: create node text
    //debugger;
    try {
        var oTextNode = document.createTextNode(document.getElementById("idPass").value);    
    } catch (error) {
        alert("An internal error occurred, please contact support.");
    }
    //step 4: add text node to the element
    oNewObject.appendChild(oTextNode);
    var color = document.getElementById("idUser").value;
    switch (color) {
        case "green":
            oNewObject.style.color = "red";
            break;
        case "red":
            oNewObject.style.color = "green";
            break;
        default:
            oNewObject.style.color = "pink";
            break;
    }

    //step 5: get the object of div
    var oDOMDiv = document.getElementById("canvas");
    //step 6: append our newly created element to canvas
    oDOMDiv.appendChild(oNewObject);
}