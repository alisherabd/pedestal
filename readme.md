# Pedestal - "Dealer For the People"

This API project scrape reviews for the dealership "McKaig Chevrolet Buick" from DealerRater.com and uncover the top N users of overly positive endorsements.

Try [DEMO](https://dealership-pedestal.herokuapp.com)

## Analysis

Each review section consist of:
- overall rating of dealership
- 6 specific ratings
- comment
- date
- number of employees customer met

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
3. It will test all suites, build and run the api service. After built, it will keep listening to port 3000. You can access http://localhost:3000 and will see the results after clicking "Search" button.

> Docker
1. run either ``` docker-compose up --build ``` or ``` docker-compose up --build -d ```
2. It will test all suites, build and run the api service. After built, it will keep listening to port 3000. You can access http://localhost:3000 and will see the results after clicking "Search" button.



## Developer Notes
> To clear terminal completely on Mac
```sh
clear && printf '\e[3J'
```


> Heroku container push and release scripts
```sh
docker-compose up --build

docker image rm registry.heroku.com/dealership-pedestal/web --force
docker tag pedestal_backend registry.heroku.com/dealership-pedestal/web
docker push registry.heroku.com/dealership-pedestal/web
heroku container:release web --app dealership-pedestal
heroku logs --tail --app dealership-pedestal
```
