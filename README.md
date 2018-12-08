# tax-calculator

# Tech stack
Express JS, Objection JS, Knex JS, Chai, Postgres

### list of user routes:

|     Routes     | HTTP   | Description                          |
|:--------------:|--------|--------------------------------------|
| /tax           | GET    | get all tax type                     |
| /bill          | GET    | get all bill                         |
| /bill/:id      | GET    | get one bill                         |      
| /product       | POST   | create tax object                    |

 # Usage
 'npm install' to install all dependencies.

 'knex migrate:latest' to migrate all schema

 'knex seed:run' to seed all dummy data

 Access the website via http://localhost:3000
