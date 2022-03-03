- The process I went through is:
    * Read requirements
    * Think about which technologies would be best to use
    * Decide if I know the technologies I decided on well enough to quickly come up with the solution
    * Decide if the technologies I chose can make running and setting up the application easy for the user
    * Sort the endpoints based on order I will be working on them
    * Research and implement solution
- Key decisions:
    * I was busy with work and personal matters so I chose not to implement the last endpoint
    * I chose not to create unit tests
    * I chose to use WSL knowing very well that I won't be able to use Docker to containerise the application for easy deployment and instead chose to write a small bash script for the deployment
    * I chose to use postgres even though I think it would be better to use SQlite which is OS agnostic to make it easier for you guys. The reason is that I have more experience on postgres so I chose to go with it to save time 
    * Instead of creating a script to ingest the forecast data I chose to implement that functionality in the API. The data volume wasn't that big. If the volume was much bigger I would choose to do some processing with dataframes (pandas/numpy). But that would mean I would have to develop a python script which would be separate from the API and had to be run either manually or via a cronjob or ETL. I coul combine that script with the NODE API using a Queue on an endpoint. Visiting the endpoint push something in the Queue and I would have a python listener infinitely running in the background that would trigger the python script to populate the DB.
- Things that slowed me down:
    * I had never used the specific ORM (Sequelize) for complex queries. Which meant I had to learn some things and do a lot of research
- Problems I encountered and solved:
    * In one occasion I failed to make the query work exactly as I wanted to (make the db return the avg temp directly) so I had to do some extra work after getting the data from the DB
    * Couldn't use Docker for easy deployment so I provided a very small bash script
- Tools and techniques I used:
    * I used NodeJS and specifically the express framework.
    * I used Postgres as my DB
    * Sequelize as my ORM
    * Async calls to the Weather API and to the DB as to not block concurrent use of the system
    * I would have used python (Pytest) for uni tests if time allowed me to do so