
function isUndefined(val){

  return (val )?val:'';
}
$(document).ready(function () {

  var productDetails = JSON.parse(sessionStorage.getItem('product'));

  $("#product-item-details").empty();
  $("#rental-details").empty();
  // $("#descripton").text(productDetails.DISCRIPTION);
  $("#product-item-details").append(`
                  <span> Cat Class: ${ isUndefined(productDetails.CATEGORY)}</span>
                  <h2 >${ isUndefined(productDetails.DISCRIPTION)}</h2>
                  <ul class="tag-list" id="tag-list">
                    <li> ${ isUndefined(productDetails.INDUSTRY)} </li>
                    <li> ${ isUndefined(productDetails.Type)}</li>
                  </ul>

                  <h5>ITEM DETAILS</h5>
                  <ul id="item-details">
                    <li><span>ASSET # </span> <b> ${ isUndefined(productDetails['ASSET #'])} </b></li>
                    <li><span>SERIAL # </span> <b> ${ isUndefined(productDetails['SN'])} </b></li>
                    <li><span>MODEL # </span> <b> ${ isUndefined(productDetails['MODEL NUMBER'])} </b></li>
                    <li><span>YEAR </span> <b> ${ isUndefined(productDetails['YEAR'])} </b></li>
            </ul>   `);

              $("#rental-details").append(`
              <ul id="item-details">
              <li><span>Hourly Rent </span> <b> ${ isUndefined(productDetails['Rent Hr'])} </b></li>
              <li><span>Daily Rent </span> <b> ${ isUndefined(productDetails['Rent D'])} </b></li>
              <li><span>Weekly Rent </span> <b> ${ isUndefined(productDetails['Rent W'])} </b></li>
              <li><span>Monthly Rent </span> <b> ${ isUndefined(productDetails['Rent M'])} </b></li>
            </ul> 
  `);

});


