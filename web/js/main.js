var item1 = new Product("001", "2022-11-22", "iPhone X", "Apple", "1300", "30", "Cabinet-10");
var item2 = new Product("002", "2022-11-23", "Note 23", "Samsung", "1500", "6", "Cabinet-8");

var list = getDataList();
list.push(item1);
list.push(item2);

//<!-- INIT DISPLAY -->
$("#TotalTitle").hide();
$("#ShipButton").hide();

// Update list
ShowList(list);

//<!-- SHOW TABLE -->
function ShowList(list) {
  debugger;

  if (CurrentMode == AppMode.EXPORT_MODE) {
    $("#FilterStatusDropDownList").hide();
  } else {
    $("#FilterStatusDropDownList").show();
  }

  // table header
  var table = "";

  // make table body
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    table += "<tr><td class='text-center'>" + (i + 1);
    table += "</td><td>" + item.Date;
    table += "</td><td>" + item.Name;
    table += "</td><td>" + item.Maker;
    table += "</td><td class='text-center'>" + item.Price + "&nbsp;";
    if (parseInt(item.Amount) > 0) {
      table += "</td><td class='text-center'>For Sale</td>";
    } else {
      table += "</td><td class='text-center'>Run Out</td>";
    }
    table += "</td><td class='text-center'>" + item.Amount + "&nbsp;";
    table += "</td><td class='text-center'>" + item.Location + "&nbsp;";
    if (CurrentMode == AppMode.EXPORT_MODE) {
      table +=
        "<td class='text-center'><button class='btn btn-danger' onclick=\"deleteProduct('" +
        item.Id +
        "')\">Cancel</button>&nbsp;</tr>";
    } else {
      table +=
        "<td class='text-center'><button class='btn btn-warning' data-bs-toggle='modal' data-bs-target='#AddEditPopup' onclick=\"editProduct('" +
        item.Id +
        "')\">Edit</button>&nbsp;<button class='btn btn-danger' onclick=\"deleteProduct('" +
        item.Id +
        "')\">Delete</button>&nbsp;<button class='btn btn-success' data-bs-toggle='modal' data-bs-target='#AddEditPopup' onclick=\"exportProduct('" +
        item.Id +
        "')\">Export</button>&nbsp;</td></tr>";
    }
  }

  // update table
  $("#TableList").html(table);
}

//<!-- SHOW DIALOG -->
function ShowPopup(item) {
  debugger;

  // resut title color
  $("#panel-header").removeClass("bg-primary");
  $("#panel-header").removeClass("bg-success");
  $("#panel-header").removeClass("bg-warning");

  // reset button color
  $("#SaveButton").removeClass("btn-primary");
  $("#SaveButton").removeClass("btn-success");
  $("#SaveButton").removeClass("btn-warning");

  // set popup title
  if (CurrentMode == AppMode.EDIT_MODE) {
    $("#PanelTitle").html("Edit products");
    $("#SaveButton").html("Update");
    $("#SaveButton").addClass("btn-warning");
    $("#panel-header").addClass("bg-warning");
  } else if (CurrentMode == AppMode.EXPORT_MODE) {
    $("#PanelTitle").html("Export products");
    $("#SaveButton").html("Export");
    $("#SaveButton").addClass("btn-success");
    $("#panel-header").addClass("bg-success");
  } else if (CurrentMode == AppMode.ADD_MODE) {
    $("#PanelTitle").html("Import more products");
    $("#SaveButton").html("Import");
    $("#SaveButton").addClass("btn-primary");
    $("#panel-header").addClass("bg-primary");
  }

  if (item != null) {
    // set edit Id
    $("#_id").val(item.Id);

    //  set data
    $("#date").val(item.Date);
    $("#name").val(item.Name);
    $("#maker").val(item.Maker);
    $("#price").val(item.Price);
    $("#amount").val(item.Amount);
    $("#location").val(item.Location);
  } else {
    // set edit Id
    $("#_id").val("");

    //  set data
    $("#date").val(GetTodayWithFormat());
    $("#name").val("");
    $("#maker").val("");
    $("#price").val("");
    $("#amount").val("");
    $("#location").val("");
  }
}

function GetTodayWithFormat() {
  const date = new Date();
  return (
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2)
  );
}

function isValidDate(dateString) {
  // Check if the date string is in a valid date format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) {
      return false;
  }

  // Check if the date itself is valid (e.g., not February 30)
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}


function isValidProduct(product) {
  debugger;
  if (!product.Name || !product.Maker) {
    return false
  }

  if (isNaN(parseFloat(product.Price)) || parseFloat(product.Price) < 0) {
      return false
  }

  if (isNaN(parseInt(product.Amount)) || parseInt(product.Amount) < 0) {
      return false
  }

  if (!isValidDate(product.Date)) {
    return false
  }

  return true
}

function findProductsByName(product) {
  const matchingProducts = [];

  for (const item of list) {
      if ((product.Name.toLowerCase() === item.Name.toLowerCase()) && (product.Maker.toLowerCase() === item.Maker.toLowerCase())) {
          matchingProducts.push(product);
      }
  }

  return matchingProducts;
}

//<!-- ACTIONS -->
// [Exercise 1] Import Action
$("#ImportButton").click(function (e) {
  e.preventDefault();
  debugger;

  CurrentMode = AppMode.ADD_MODE;
  ShowPopup();
});

// [Exercise 2] Save Action
$("#SaveButton").click(function (e) {
  e.preventDefault();
  var newItem = new Product(
    $("#_id").val(),
    $("#date").val(),
    $("#name").val(),
    $("#maker").val(),
    $("#price").val(),
    $("#amount").val(),
    $("#location").val()
  );
  if (!isValidProduct(newItem)){
    alert("Invalid input");
  }
  else{
    var found=false;
    for (let i = 0; i < list.length; i++){
      if (CurrentMode===AppMode.ADD_MODE && (list[i].Name.toLowerCase() === newItem.Name.toLowerCase()) && (list[i].Maker.toLowerCase() === newItem.Maker.toLowerCase())) {
          list[i].Amount=Number(newItem.Amount)+Number(list[i].Amount)+""
          found=true
        }
      if (CurrentMode===AppMode.EDIT_MODE && (list[i].Id === newItem.Id)){
          list[i]=newItem
          found=true
        }
    }
    if (!found){
      list.push(newItem)
    }
    ShowList(list);
  }
});

// [Exercise 3] Edit Action
function editProduct(id) {
  debugger;

  CurrentMode = AppMode.EDIT_MODE;
  position=0;
  for (; position < list.length; position++){
    if (list[position].Id===id){
      break;
    }
  };
  console.log(position)
  if (position<list.length) {
    ShowPopup(list[position]);
  } else {
    alert("Product not found.");
  }

}

// [Exercise 4] Delete Action
function deleteProduct(id) {
  if (confirm("Are you sure you want to delete this product?")) {
    // Find the index of the product with the provided ID in the list
    var index = list.findIndex(function(item) {
      return item.Id === id;
    });

    if (index !== -1) {
      list.splice(index, 1); // Remove the product from the list
      ShowList(list); // Update the displayed list
    } else {
      alert("Product not found.");
    }
  }
}

var exportList = []

// [Exercise 5] Export Action
function exportProduct(id) {

  CurrentMode = AppMode.EXPORT_MODE;

  // Find the product by id
  const product = list.find(item => item.Id === id);

  if (product) {
    ShowPopup(product);
    // Now let's handle the export process

    // Set the export button action
    $("#SaveButton").off("click").on("click", function (e) {
      e.preventDefault();

      // Get the export amount
      const exportAmount = $("#amount").val();

      // Check if the export amount is valid
      if (exportAmount === "" || isNaN(exportAmount) || exportAmount <= 0 || exportAmount > parseInt(product.Amount)) {
        alert("Invalid export amount. Please enter a valid quantity.");
        return;
      }

      // Update the product's amount
      product.Amount = (parseInt(product.Amount) - parseInt(exportAmount)).toString();
      
      // Create export product
  
      var index = exportList.findIndex(function(item) {
        return item.Id === product.Id;
      });
      if (index==-1){
        let exportProduct = Object.assign({}, product);
        exportProduct.Amount = exportAmount
        exportList.push(exportProduct)
      } else{
        exportList[index].Amount=(parseInt(exportList[index].Amount) + parseInt(exportAmount)).toString();
      }
      // Update the list and re-render
      ShowList(exportList);

      // Close the modals
      $("#AddEditPopup").modal("hide");
    });
  } else {
    alert("Product not found.");
  }
}

// [Exercise 6] Export Process
$("#ExportButton").click(function () {
  debugger;
  if (CurrentMode == AppMode.LIST_MODE) {
    // Update list
    $("#AppTitle").text(AppTitleName.EXPORT_TITLE);
    $("#ExportButton").text(ExportButtonName.NAME_IN_EXPORT);
    CurrentMode = AppMode.EXPORT_MODE;
    $("#ImportButton").hide();
    $("#ShipButton").show();
    $("#TotalTitle").show();
    
    // Change the SaveButton action to Export
    $("#SaveButton").html("Export");
    $("#SaveButton").removeClass("btn-warning").addClass("btn-success");

    // Show the export modal with empty fields
    ShowList(exportList);
  } else {
    // Update list
    $("#AppTitle").text(AppTitleName.STORE_TITLE);
    $("#ExportButton").text(ExportButtonName.NAME_IN_STORE);
    CurrentMode = AppMode.LIST_MODE;
    $("#ImportButton").show();
    $("#TotalTitle").hide();
    $("#ShipButton").hide();
    ShowList(list);
  }
});

// [Exercise 7] Shipment Action
$("#ShipButton").click(function () {
  $("#AppTitle").text(AppTitleName.STORE_TITLE);
  $("#ExportButton").text(ExportButtonName.NAME_IN_STORE);
  CurrentMode = AppMode.LIST_MODE;
  $("#TotalTitle").hide();
  $("#ShipButton").hide();
  $("#ImportButton").show();
  alert("You must implement this function [Exercise 7]");
});

// [Exercise 8] Search Action
$("#SearchButton").click(function () {
  var keyword = $("#keySearch").val();
  if (keyword.trim() === "") {
    alert("Please enter a keyword for search.");
    return;
  }

  var filteredList = list.filter(function(item) {
    return (
      item.Name.toLowerCase().includes(keyword.toLowerCase()) ||
      item.Maker.toLowerCase().includes(keyword.toLowerCase())
    );
  });
  ShowList(filteredList);
});

// [Exercise 9] Sort Price Action
$("#PriceSortButton").click(function () {
  sortProductsByPrice();
  ShowList(list); // Update the displayed list with sorted results
});

function sortProductsByPrice() {
  if (CurrentPriceOrder === "NONE") CurrentPriceOrder=SortOrder.ASC
  if (CurrentPriceOrder === SortOrder.ASC) {
    list.sort(function (a, b) {
      return parseFloat(a.Price) - parseFloat(b.Price);
    });
    CurrentPriceOrder = SortOrder.DESC;
    $("#PriceSortIcon").removeClass("fa fa-angle-up");
    $("#PriceSortIcon").addClass("fa fa-angle-down");
  } else {
    list.sort(function (a, b) {
      return parseFloat(b.Price) - parseFloat(a.Price);
    });
    CurrentPriceOrder = SortOrder.ASC;
    $("#PriceSortIcon").removeClass("fa fa-angle-down");
    $("#PriceSortIcon").addClass("fa fa-angle-up");
  }
}


// [Exercise 10] Sort Date Action
$("#DateSortButton").click(function () {
  sortProductsByDate();
  ShowList(list); // Update the displayed list with sorted results
});

function sortProductsByDate() {
  if (CurrentDateOrder === "NONE") CurrentDateOrder=SortOrder.ASC
  if (CurrentDateOrder === SortOrder.ASC) {
    list.sort(function (a, b) {
      return new Date(a.Date) - new Date(b.Date);
    });
    CurrentDateOrder = SortOrder.DESC;
    $("#DateSortIcon").removeClass("fa fa-angle-up");
    $("#DateSortIcon").addClass("fa fa-angle-down");
  } else {
    list.sort(function (a, b) {
      return new Date(b.Date) - new Date(a.Date);
    });
    CurrentDateOrder = SortOrder.ASC;
    $("#DateSortIcon").removeClass("fa fa-angle-down");
    $("#DateSortIcon").addClass("fa fa-angle-up");
  }
}

// [Exercise 11] Filter text Action
$("#FilterInputText").on("input", function () {
  var filterText = $(this).val().trim();
  console.log(filterText)
  ShowList(filterProductsByText(filterText)); // Update the displayed list with filtered results
});

function filterProductsByText(text) {
  if (text === "") {
    return list;
  }

  return list.filter(function (item) {
    return (
      item.Name.toLowerCase().includes(text.toLowerCase()) ||
      item.Maker.toLowerCase().includes(text.toLowerCase())
    );
  });
}

// [Exercise 12] Filter list Action
$("#FilterStatusDropDownList").change(function () {
  var selectedValue = $(this).val();
  ShowList(filterProductsByStatus(selectedValue));
});

function filterProductsByStatus(status) {
  if (status === "-1") {
    return list;
  }

  return list.filter(function (item) {
    if (status === "1") {
      return parseInt(item.Amount) > 0;
    } else if (status === "0") {
      return parseInt(item.Amount) === 0;
    }
  });

  list = filteredList;
}
