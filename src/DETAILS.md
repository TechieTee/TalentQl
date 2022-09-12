# How does this work?

## The app gets paginated data by fetching page(N), so as to get data for page N, N+1, and a URL that fetch the next page or the previous page, according to the provided JSON data.

## The fetchpage asynchronous function fetches the data passing page as a parameter and returns the results object containing the page N, N+1, and a URL that fetch the next page or the previous page in the JSON response.

## The setdata sets the overall state of the response data taking two arguments, data as an array of the table data, and page as page number for the pagination.

## After the setData gets the data, it calls a reducer function to create a table row for every data and then updates the table rows with the data, setting the table row id as the data-entryid

# In the setdata function, 

## The tBodyElement gets the element that has '[data-sink=""]' attribute
## And if the element exists, append the li element

## The pageLabelElement gets the element that has '[data-pageview=""]' attribute
## And if the element exists, append the text `Showing Page and the returned page number ${page}` 

## The previous and next button is called into the js file using javascript selector and stored in variables prevBtn and nextbtn respectively

## The HTML attribute previous button is set to disable on the first page

## The next and previous button click function shows the next and previous data respectively updating the currentpage number by 1

## Then the data variable calls the fetchPage function which is the function that makes the request to the api, and then the setData function is updated with data variable and page variable. And we keep updating the setData state with data and page variables.
