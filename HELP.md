---
# Build a LogiTrack System using Java & Angular

## Overview
An integrated logistics management platform designed to streamline cargo transport and delivery, connecting businesses, drivers, and customers.

## Users of the System
- **Businesses:**
    - **Manage Cargo:** Businesses have the ability to add, update, and track the details of cargo, including its size, type. This management is crucial for maintaining an accurate inventory and planning logistics.
    - **Create Shipments:** They can create new shipment orders, specifying details like cargo content, status. This process involves coordinating with drivers for efficient delivery.
- **Drivers:**
    - **Accept Cargo Assignments:** Drivers can view available cargo assignments posted by businesses and choose to accept them based on factors like location, cargo type, and their schedule.
    - **Manage Deliveries:** After accepting assignments, drivers are responsible for the transportation and timely delivery of cargo. They need to manage routes, schedules, and communicate any delays or issues.
- **Customers:**
    - **Receive Cargo Status Updates:** Customers can track the status of their cargo, receiving updates on shipment progress. This feature enhances transparency and customer satisfaction.

## Functional Requirements
- **User Registration & Profile Management:** This feature allows for the creation of user accounts, enabling login and profile editing. It includes mechanisms for validating user input and securely managing personal information.
- **Cargo Creation & Management:** Businesses can add, view information. This function includes authorization checks to ensure only permitted modifications.
- **Assignment of Cargo to Drivers:** The system allows for assigning specific cargoes to drivers. It ensures that drivers receive detailed information about their assignments and maintains accurate records.
- **User Role-Based Authentication:** The application distinguishes between different user roles, providing tailored interfaces and functionalities for businesses, drivers, and customers.
- **JWT Authorization:** This component manages user sessions and secures API calls using JSON Web Tokens, with comprehensive token creation, validation, and management.
- **RESTful API & Angular Service Layer:** Develops Angular services for seamless communication with backend RESTful APIs, ensuring efficient data exchange and system integration.
- Angular: Use Reactive form and declare form with name itemForm.
- Angular: Create Auth Service with name AuthService with these functions saveToken,SetRole,getRole,getLoginStatus,getToken,logout
- Angular Create Http Service with name HttpService and add these functions getOrderStatus, updateCargoStatus,assignDriver,getAssignOrders,getCargo,getDrivers,addCargo,Login,registerUser.

## Your task is to complete the following backend files:
- `server/src/main/java/com/wecp/logisticsmanagementandtrackingsystem/entity/Business.java`
- `server/src/main/java/com/wecp/logisticsmanagementandtrackingsystem/entity/Cargo.java`
- `server/src/main/java/com/wecp/logisticsmanagementandtrackingsystem/entity/Customer.java`
- `server/src/main/java/com/wecp/logisticsmanagementandtrackingsystem/entity/Driver.java`
- `server/src/main/java/com/wecp/logisticsmanagementandtrackingsystem/entity/User.java`
- `server/src/main/java/com/wecp/logisticsmanagementandtrackingsystem/config/SecurityConfig.java`
- `server/src/main/java/com/wecp/logisticsmanagementandtrackingsystem/Controller/BusinessController.java`
- `server/src/main/java/com/wecp/logisticsmanagementandtrackingsystem/Controller/CustomerController.java`
- `server/src/main/java/com/wecp/logisticsmanagementandtrackingsystem/Controller/DriverController.java`
- `server/src/main/java/com/wecp/logisticsmanagementandtrackingsystem/Controller/RegisterAndLoginController.java`
- `server/src/main/java/com/wecp/logisticsmanagementandtrackingsystem/jwt/JwtRequestFilter.java`
- `server/src/main/java/com/wecp/logisticsmanagementandtrackingsystem/jwt/JwtUtil.java`
- `server/src/main/java/com/wecp/logisticsmanagementandtrackingsystem/repository/BusinessRepository.java`
- `server/src/main/java/com/wecp/logisticsmanagementandtrackingsystem/repository/CargoRepository.java`
- `server/src/main/java/com/wecp/logisticsmanagementandtrackingsystem/repository/CustomerRepository.java`
- `server/src/main/java/com/wecp/logisticsmanagementandtrackingsystem/repository/DriverRepository.java`
- `server/src/main/java/com/wecp/logisticsmanagementandtrackingsystem/repository/UserRepository.java`
- `server/src/main/java/com/wecp/logisticsmanagementandtrackingsystem/service/BusinessService.java`
- `server/src/main/java/com/wecp/logisticsmanagementandtrackingsystem/service/CargoService.java`
- `server/src/main/java/com/wecp/logisticsmanagementandtrackingsystem/service/CustomerService.java`
- `server/src/main/java/com/wecp/logisticsmanagementandtrackingsystem/service/DriverService.java`
- `server/src/main/java/com/wecp/logisticsmanagementandtrackingsystem/service/UserService.java`

Entity Classes and their properties:
1. **User**
    - Long id
    - String username
    - String password
    - String role  // Role can be 'BUSINESS', 'DRIVER', 'CUSTOMER'
    - String email

2. **Business**
    - Long id
    - String name
    - String email
    - List<Cargo> cargos

3. **Cargo**
    - Long id
    - String content
    - String size
    - String status  // Status can be 'PENDING', 'IN_TRANSIT', 'DELIVERED'
    - Business business
    - Driver driver

4. **Driver**
    - Long id
    - String name
    - String email
    - List<Cargo> assignedCargos

5. **Customer**
    - Long id
    - String name
    - String email

-> generate constructors, getters, and setters for the Property class as per standard Java conventions.
-> Manage the relationships between entities using appropriate annotations.
-> For example: getId(), setId(Long id) etc.


## Technology Stack
- **Backend:** Spring Boot, JPA, MySQL
- **Frontend:** Angular
- **Security:** Spring Security, JWT

## Key Points to Note
- **Security:** Implement strong security protocols, especially for user data and API access. Use encryption for sensitive data and HTTPS for secure communication.
- **Scalability:** Design the system to handle increasing amounts of data and users. Optimize database queries and use efficient data structures.
- **User Interface Consistency:** Ensure a consistent look and feel across different modules. Maintain responsiveness for various devices.
- **Best Practices:** Adhere to coding best practices such as DRY (Don't Repeat Yourself), modular design, and comprehensive documentation. Ensure code readability and maintainability.

## Backend Functionalities to be Built
- **User Management:** Develop endpoints for user registration, login, and profile management. Implement validation checks, secure password storage, and error handling.
- **Cargo Management:** Create CRUD operations for cargo, ensuring data integrity and proper authentication. Implement business logic for cargo status updates and notifications.
- **Cargo-Driver Assignment:** Develop functionalities for assigning cargo to drivers, managing the logistics of assignments, and tracking cargo status.
- **Role-Based Authentication:** Set up role-based access control. Define different access levels and permissions for businesses, drivers, and customers.
- **JWT Token Management:** Implement token generation, validation, and expiration mechanisms. Ensure secure token storage and transmission.

## API Endpoints
- **For Businesses (Admin Side):**
- **For Drivers and Customers (User Side):**

Set the below Permissions for API in Security Config:
 /api/register and /api/login should be permitted to all
 /api/business/cargo should be permitted to users with BUSINESS role
 /api/business/assign-cargo should be permitted to users with BUSINESS role
 /api/driver/cargo should be permitted to users with DRIVER role
 /api/driver/update-cargo-status should be permitted to users with DRIVER role
 /api/customer/cargo-status should be permitted to users with CUSTOMER role
 all other requests should be authenticated

Login Api should give unauthorized(401) if user fails to perform sucessfull login
Other Api should give forbidden (403) error if the user is not authorized to access the endpoint.

 Note that in JWT set the permission with respect to authroiry so in Security Config you can use method "hasAuthority" for checking permission.       

## Frontend Functionalities to be Built
- **User Interface for Registration and Profile Management:** Design intuitive forms and dashboards for user registration and profile management, with input validation and user feedback.
- **Cargo Management Dashboard:** Develop interfaces for businesses to manage cargo, with features for adding, viewing, updating, and deleting cargo entries.
- **Cargo Assignment Interface:** Create a user-friendly interface for businesses to assign cargo to drivers, and for drivers to view their assignments.
- **Role-Specific UI Elements:** Tailor the UI based on the user's role, displaying relevant information and options for businesses, drivers, and customers.
- **Session Management with JWT:** Implement client-side handling of JWT for session management, including token storage, retrieval, and automatic renewal.

## Backend Test Cases
- **User Registration:** Ensure the user registration process correctly stores user data in the database and handles duplicate email addresses.
- **Cargo Addition:** Verify that cargo is added to the database with the correct attributes and linked to the right business account.
- **Driver Assignment:** Test that a cargo item is correctly assigned to a driver and that this change is reflected in the database.
- **Login Authentication:** Ensure that the login process authenticates user credentials correctly and rejects invalid login attempts.
- **JWT Token:** Validate that a JWT token is correctly generated upon login and that it expires as per the specified duration.

## Frontend Test Cases
- **Registration Form Validation:** Check if the registration form correctly validates input data and displays appropriate error messages for invalid inputs.
- **Cargo Management Interface:** Test the cargo addition interface to ensure that it correctly sends data to the backend and updates the UI upon successful addition.
- **Driver Assignment UI:** Verify that the interface correctly displays available drivers for cargo assignment and updates upon a successful assignment.
- **Role-Based UI Display:** Ensure that the UI elements displayed to the user are appropriate for their role (business, driver, customer).
- **Session Management:** Test if the application correctly manages user sessions using JWT tokens, including handling token expiration and renewal.

## Your task is to complete the following frontend files:
- `client/src/app/addcargo/addcargo.component.ts`
- `client/src/app/addcargo/addcargo.component.html`
- `client/src/app/assgin-cargo/assgin-cargo.component.ts`
- `client/src/app/assgin-cargo/assgin-cargo.component.html`
- `client/src/app/viewcargostatus/viewcargostatus.component.ts`
- `client/src/app/viewcargostatus/viewcargostatus.component.html`
- `client/src/app/login/login.component.ts`
- `client/src/app/login/login.component.html`
- `client/src/services/http.service.ts`
- `client/src/services/auth.service.ts`
- `client/src/app/app.component.html`
- `client/src/app/registration/registration.component.ts`
- `client/src/app/registration/registration.component.html`