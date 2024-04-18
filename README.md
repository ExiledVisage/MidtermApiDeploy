<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## API system for paying and checking student tuitions. Registrating and logging involved

The university API system can be authenticated using JWT bearer token and monitored as Swagger. It includes mobile, banking, admin, authentication, and models.

### Features

- NestJS: A progressive Node.js framework for building efficient and scalable server-side applications.
- Authentication: Users can authenticate using JWT bearer token.
- Swagger Documentation: API endpoints can be monitored using Swagger.
- Mobile Integration: Integration with mobile applications for viewing tuitions.
- Banking Integration: Integration with banking systems for student tuition view and paying the tuitions.
- Admin Panel: Administrative panel for managing students.
- Models: Student, Admin, Payment, Tuition models.
- PostgreSQL: Database for storing information about students, tuition_total, and faculty balance.

### Operations

#### Mobile
- GET: /Mobil/query-tuition

#### Banking
- POST: /Banking/pay-tuition
- GET: /Banking/query-tuition

#### Admin
- POST: /Admin/add-tuition
- GET: /Admin/unpaid-tuition-status

#### Authentication
- POST: /Authentication/login



