// from data.js
var tableData = data;

// get html elements
var tbody = d3.select("tbody")
var dateSearch = d3.select("#datetime")
var citySearch = d3.select("#city")
var filterButton = d3.select("#filter-btn")
var form = d3.select("form")

// populate the table
function showTable(tableData) {
  // clear the table
  tbody.html("")
  // iterate over the data
  tableData.forEach((item) => {
    // create a row
    var row = tbody.append("tr")
    // add data values to the row
    Object.entries(item).forEach(([key, value]) => {
      var cell = row.append("td")
      cell.text(value)
    });

  });
}

// filter the data and display the results
function runSearch() {
  d3.event.preventDefault()

  var dateInput = dateSearch.property("value")
  var dateFiltered = {}
  // if search string is empty don't filter
  if (dateInput === ""){
    dateFiltered = tableData
  // else filter by search string
  } else {
    dateFiltered = tableData.filter(record => record.datetime === dateInput)
  }

  var cityInput = citySearch.property("value")
  var cityFiltered = {}
  // if search string is empty don't filter
  if (cityInput === ""){
    cityFiltered = dateFiltered
  // else filter by search string
  } else {
    cityFiltered = dateFiltered.filter(record => record.city === cityInput)
  }

  showTable(cityFiltered)

}

// show all the data when loading the page
// for the first time
showTable(tableData)

// listen for button or form submission
filterButton.on("click", runSearch);
form.on("submit",runSearch);
