var filePath = '../assets/data/product-details.json';
var categoriesDD = $("#categoriesDD");
var typesDD =  $("#typeDD");
var searchText = $("#searchTextbox")

function trimedText(val){

  return $.trim(val).toString().toLowerCase();
}

$(document).ready(function(){
     
  searchText.val('');
    $("#defaultItem").show();
    getCategories();
    getTypesFordropdown();
    getCategoriesFordropdown();
   

    $(document).on('click','#defaultItem a',function() {
            var asset = $(this).attr('asset');;
        
           if(asset){
            goToProductDetailPageWithData(asset);
         }
    });


    $(document).on('click','#addProductDyamic a',function() {
        var asset = $(this).attr('asset');;
       if(asset){
        goToProductDetailPageWithData(asset);
       }
    });
   
     $(document).on('click', '.cate', function () {  
            var text = $(this).text();
             getProductByCategory(text);  
     }); 

     $(document).on('click', '#LocateMe', function () {  
      getproductBySearchFilters();
      }); 

      $("#searchTextbox").on("keyup", function() {
        getproductBySearchFilters();
        }); 

      categoriesDD.on("change", function() {
        getproductBySearchFilters();
        }); 

      typesDD.on("change", function() {
        getproductBySearchFilters();
        }); 


        
    

  });

  

function getCategories() {
 
    var cateList = [];
    $.getJSON(filePath, function (data) {
        $("#category-list").empty();
        $.each(data.Sheet1, function (key, item) {
          
            if(item['CATEGORY'] != undefined){
            if(cateList.indexOf(item['CATEGORY']) !== -1){
                
            } else{
                cateList.push(item['CATEGORY']);
                $("#category-list").append(`
               <li><a class="cate" data=" ${item['CATEGORY']}" > ${item['CATEGORY']}</a></li>
            `);

            }
        
        }

            
        });
    });
   
}

function getTypesFordropdown() {
 
  var typeList = [];
  $.getJSON(filePath, function (data) {
      typesDD.empty();
      typesDD.append(`<option value="All Industries Types">All Industries Types</option>`);

      $.each(data.Sheet1, function (key, item) {
        
          if(item['Type'] != undefined){
          if(typeList.indexOf(item['Type']) !== -1){
              
          } else{
              typeList.push(item['Type']);
              typesDD.append(`
              <option value="${item['Type']}"> ${item['Type']}</option>
          `);

          }
      
      }

          
      });
  });
 
}

function getCategoriesFordropdown() {
 
  var cateList = [];
  $.getJSON(filePath, function (data) {
    categoriesDD.empty();
      categoriesDD.append(`<option value='All Categories'>All Categories</option>`);

      $.each(data.Sheet1, function (key, item) {
        
          if(item['CATEGORY'] != undefined){
          if(cateList.indexOf(item['CATEGORY']) !== -1){
              
          } else{
              cateList.push(item['CATEGORY']);
              categoriesDD.append(`
              <option value="${item['CATEGORY']}"> ${item['CATEGORY']}</option>
          `);

          }
      
      }

          
      });
  });
 
}

function getProductByCategory(categoryName) {
 
    $.getJSON(filePath, function (data) {
       
        $("#addProductDyamic").empty();
        $("#addProductDyamic").show();
        $("#defaultItem").hide();
       
        $.each(data.Sheet1, function (key, item) {
         
           
             var jsonItem = $.trim( item.CATEGORY );
             var cat = $.trim(categoryName );
            
          if( ( jsonItem != undefined )  && (jsonItem.toString().toLowerCase() == cat.toString().toLowerCase())){
            addProducts(item);
          }
          

        });
    });
   
}


function goToProductDetailPageWithData(asset) { 

    
    $.getJSON(filePath, function (data) {
       
        $.each(data.Sheet1, function (key, item) {
          
            if(item['ASSET #'] == asset){
                sessionStorage.removeItem('product');
                sessionStorage.clear();
                sessionStorage.setItem('product', JSON.stringify(item));
                window.location.href = "product-detail.html";
            }

        });
    });
   

 }


 function getproductBySearchFilters() { 

  $.getJSON(filePath, function (data) {
       
    $("#addProductDyamic").empty();
    $("#addProductDyamic").show();
    $("#defaultItem").hide();

    console.log("searchText",searchText);
    console.log("categoriesDD.val()",categoriesDD.val());
    $.each(data.Sheet1, function (key, item) {
     
      if(
         ((searchText.val == '') || trimedText(item['DISCRIPTION']).indexOf(trimedText(searchText.val())) != -1)
         &&
        ((typesDD.val() == 'All Industries Types') || trimedText(item['Type']).indexOf(trimedText(typesDD.val())) != -1)
        &&
        ((categoriesDD.val() == 'All Categories') || trimedText(item['CATEGORY']).indexOf(trimedText(categoriesDD.val())) != -1)
        ){
          if(item != undefined){
            addProducts(item);
          }
          
        }
           
      

    });
});
 

}


function addProducts(item) {
  $("#addProductDyamic").append(`
            <div class="col-xl-3 col-lg-4 col-md-6">
            <div class="product-item">
              <div class="product-img">
                <img src="./assets/img/not-found.png" alt="product-img-01" />
              </div>
              <div class="product-info">
                <h6>${item['Type']}</h6>
                <p>${item['CATEGORY']}</p>
                <a  asset="${item['ASSET #']}" class="btn btn-blue">View Detail <i class="fal fa-long-arrow-right"></i></a>
                 </div>
               </div>
             </div>
            `);
}

