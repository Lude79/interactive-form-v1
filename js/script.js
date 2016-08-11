$("#other-title").css("display","none"); //hiding text fields
$("#colors-js-puns").css("display","none"); //hiding selectors
$("fieldset:nth-of-type(4) > div:nth-of-type(2)").css("display","none"); //hiding text fields
$("fieldset:nth-of-type(4) > div:nth-of-type(3)").css("display","none"); //hiding text fields

//prices of workshops
var costs = [200,100,100,100,100,100,100]; //price of events
var f = 0;


//Focus on first input element
document.getElementById("name").focus();    

$('#title').change(function() {
if ($(this).val() === 'other') {            
$("#other-title").css("display","block");
    }else {$("#other-title").css("display","none") }
});


//Block wrong colors from showing when selecting and hide color selection block if nothing is selected
$('#design').change(function() {
if ($(this).val() === 'js puns') { 
$('#color option').slice(3,6).css("display","none");
$('#color option').slice(0,3).css("display","inline");
$("#color option[value='cornflowerblue']").attr("selected","selected");
$("#color option[value='tomato']").removeAttr("selected"); 
$("#colors-js-puns").css("display","inline");
    } else if ($(this).val() === 'heart js') { 
$('#color option').slice(0,3).css("display","none");
$('#color option').slice(3,6).css("display","inline");
$("#color option[value='tomato']").attr("selected","selected"); 
$("#color option[value='cornflowerblue']").removeAttr("selected");
        $("#colors-js-puns").css("display","inline");
    } else {$('#color option').css("display","inline");
           $("#colors-js-puns").css("display","none");}
});


//Inactivate buttons if event at same time
$('input[name="js-frameworks"]').click(function() {
   $('input[name="express"]').attr("disabled", function(_,attr){ return !attr});
   $('input[name="express"]').parent('label').toggleClass('disable');
});
$('input[name="express"]').click(function() {
   $('input[name="js-frameworks"]').attr("disabled", function(_,attr){ return !attr})
   $('input[name="js-frameworks"]').parent('label').toggleClass('disable');
});
$('input[name="js-libs"]').click(function() {
   $('input[name="node"]').attr("disabled", function(_,attr){ return !attr})
   $('input[name="node"]').parent('label').toggleClass('disable');;
});
$('input[name="node"]').click(function() {
   $('input[name="js-libs"]').attr("disabled", function(_,attr){ return !attr})
   $('input[name="js-libs"]').parent('label').toggleClass('disable');;
});


//Show appropriate payment method
$('#payment').change(function() {
if ($(this).val() === 'paypal') { 
$('fieldset:nth-of-type(4) > div:nth-of-type(2)').css("display","block");
$('fieldset:nth-of-type(4) > div:nth-of-type(3)').css("display","none");
$('#credit-card').css("display","none");
    } else if ($(this).val() === 'bitcoin') { 
$('fieldset:nth-of-type(4) > div:nth-of-type(3)').css("display","block");
$('fieldset:nth-of-type(4) > div:nth-of-type(2)').css("display","none");
$('#credit-card').css("display","none");
    } else {
    $('fieldset:nth-of-type(4) > div:nth-of-type(3)').css("display","none");
$('fieldset:nth-of-type(4) > div:nth-of-type(2)').css("display","none");
$('#credit-card').css("display","block");
    }
});


//insert text element and add up cost of selction
var price = document.createElement("P");
var priceText = document.createTextNode("Total: $"+f);
price.id = "price";
price.appendChild(priceText);
$(price).insertAfter(".activities");
$(price).css("display","none");

$('input[type=checkbox]').change(myHandler);
function myHandler() {
f = 0;
for(var i  = 0; i < 7; i++){
if($("fieldset:nth-of-type(3) label input").eq(i).is(":checked")){f += costs[i]};
};
if (f === 0){$(price).css("display","none")}else{$(price).css("display","block")};
document.getElementById("price").innerHTML =  "Total: $"+f;  
};


//form validation
//create necessary p elment for T-shirt error
var shrt = document.createElement("P");
var shrtText = document.createTextNode("Please select a shirt");
shrt.id = "shrt";
shrt.appendChild(shrtText);
$(shrt).insertAfter(".shirt legend");
$("#shrt").css("display","none");

//create necessary p elment for activies error
var act = document.createElement("P");
var actText = document.createTextNode("Please select an activity");
act.id = "act";
act.appendChild(actText);
$(act).insertAfter(".activities legend");
$("#act").css("display","none");


//launch validation function on clicking submit
$("button[type='submit']").on("click",validation);

//The valuation function
function validation(){
 
//No empty name field allowed  
if($("#name").val()===""){
    event.preventDefault();
$("#name").prev().text("Name: (Please Enter a Name)").css("color","red");
}else{$("#name").prev().text("Name:").css("color","#000");}
;   

//Validate if real Email address
function validateEmail(email) 
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

if(validateEmail($("#mail").val()) == false){
   event.preventDefault();
$("#mail").prev().text("Email: (Please Enter a Valid Email Address)").css("color","red");
}else{$("#mail").prev().text("Email:").css("color","#000");};

console.log($("#design").val())
//A T-shirt design must be selected   
if($("#design").val() == "Select Theme"){
    event.preventDefault();
$("#shrt").css("display","block");            
}else{$("#shrt").css("display","none");
     };    
    
//At least one activity must be checked from the list under "Register for Actitivities."
if (f == 0){
    event.preventDefault();
$("#act").css("display","block");            
}else{$("#act").css("display","none");
     };

    
//Payment option must be selected.    
if($("#payment").val()== "select_method"){
    event.preventDefault();
$("#payment").prev().text("I'm going to pay with: (Please Enter a Payment Method)").css("color","red");
}else{$("#payment").prev().text("I'm going to pay with:").css("color","#000");
     };     
  
    
//Luhn Test for CC verification
var cardNum = $("#cc-num").val();  
var res = cardNum.split("").map(function(item) {
    return parseInt(item, 10);
});    
var lastDigit = res[res.length-1]    
res.pop()
res.reverse();
   
for(var i = 0; i < res.length;i+=2){
    res[i] = res[i] *2
    if (res[i]>9){res[i] = res[i] -9}
}; 
    
var total=0;
for(var i in res) { total += res[i]; }      
if((total+lastDigit)%10 == 0){
    $("#cc-num").prev().css("color","#000");
    
}else{event.preventDefault();
$("#cc-num").prev().css("color","red");}

    
//validating Zip code for 5 integers    
function is5Integer(str) {
    return /^\d{5}$/.test(str);
};
    
if(!is5Integer($("#zip").val())){
    event.preventDefault();
$("#zip").prev().css("color","red");    
}else{$("#zip").prev().css("color","#000");}
;      

    
//validating CVV for 3 integers      
function is3Integer(str) {
    return /^\d{3}$/.test(str);
};        
    
if(!is3Integer($("#cvv").val())){
    event.preventDefault();
$("#cvv").prev().css("color","red");
    return false
}else{$("#cvv").prev().css("color","#000");}
};      
    

