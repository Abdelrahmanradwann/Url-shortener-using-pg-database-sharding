**Simple URL Shortener with Database Sharding**

A RESTful API built with Node.js, Express, and Postgres. Leverages Docker for managing multiple Postgres instances on a single machine. Ideal for practicing database sharding concepts.

**Database:**

Employs a simple schema with a single table storing the first 5 characters of the hashed URL as the primary key and the corresponding full URL. To distribute data across multiple Postgres instances, a hash ring algorithm is used to determine the appropriate shard for each URL.
