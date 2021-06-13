# Pedestal - "Dealer For the People"

This API project scrape reviews for this dealership "McKaig Chevrolet Buick" from DealerRater.com and uncover the top N worst offenders of these overly positive endorsements.

## Analysis

Each review section consist of:
- overall rating of dealership
- 6 specific ratings
- comment
- date
- number of employees customer met

  let suspects = usersWithAllFiveStars(users);
    suspects = recordsWithSameDate(suspects);
    suspects = recordsWithSameUser(suspects);
    suspects = recordsWithSameComment(suspects);

To find top N offenders I chose to start with collecting all offenders that inclusively have:
1) all ratings are 5 star
2) all users records with same date
3) same user occurence more than once in a given list
4) all users with same comment

if above cases (inclusively) fullfils the top N sum it will print it, otherwise it's going to reduce each criteria from the bottom.

Once it hits top N list it will return it as an array form api.

## How to run the code

clone this repo

> Locally
1. run ``` npm install ```
2. run ``` npm start ```
3. It will test all suites, build and run the api service. After built, it will keep listening to port 1000. You can access http://localhost:1000 and will see the results after clicking "Search" button.

> Docker
1. run either ``` docker-compose up --build ``` or ``` docker-compose up --build -d ```
2. It will test all suites, build and run the api service. After built, it will keep listening to port 1000. You can access http://localhost:1000 and will see the results after clicking "Search" button.



## Developer Notes
to clear terminal completely
>  clear && printf '\e[3J'
