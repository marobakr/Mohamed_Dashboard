# Angular Dashboard Application

## Project Overview

This project is a dashboard application built using Angular 16+. It is designed to demonstrate a modular architecture with a focus on best practices in component design, routing, services, state management, and API integration.

The application consists of two main modules:

### Auth Module

- **Login Component:** A login form that authenticates users against a provided endpoint.
- **Redirection:** On successful login, redirects the user to the Users module.

### Users Module

- **List Users Component:** Displays a list of users with functionality to sort, filter, create, update, delete, and manage user activation status.
- **User Profile Component:** Displays detailed information about a specific user.
- **Create/Update User Component:** Provides a form to create new users or update existing users with validation and error handling.

## Features

- **Lazy Loading:** The application uses lazy loading for better performance and modularity.
- **Reactive Forms:** Forms are managed using Angular Reactive Forms for validation and error handling.
- **API Integration:** The application interacts with real endpoints for authentication and data management.

- **Angular Material UI:** The UI is designed using Angular Material components.
- **Routing:** Implemented for seamless navigation between different components.

## Technical Uses

- **Angular Version:** 16+
- **Project Setup:** Managed using Angular CLI.
- **Forms:** Handled using Angular Reactive Forms.
- **Routing:** Implemented for navigation between components.
- **UI Library:** Angular Material And Bootstrap for layout and design.
- **Code Quality:** Adheres to SOLID principles and Angular best practices.

## Setup and Installation

### Prerequisites

- **Node.js:** Ensure you have Node.js installed on your machine. You can download it [here](https://nodejs.org/).
- **Angular CLI:** Install Angular CLI globally using npm:

  ```bash
  npm install -g @angular/cli
  ```

### Project Structure

Dashboard Application/
├── src/
│ ├── app/
│ │ ├── auth/
│ │ │ ├── login/
│ │ │ ├── services/
│ │ │ │ ├── auth.service.ts
│ │ │ ├── auth-routing.module.ts
│ │ │ ├── auth.module.ts
│ │ ├── components/
│ │ │ ├── footer/
│ │ │ ├── header/
│ │ ├── core/
│ │ │ ├── constant/
│ │ │ ├── guard/
│ │ │ ├── interceptors/
│ │ │ │ ├── loading.interceptor.ts
│ │ │ ├── interface/
│ │ ├── users/
│ │ │ ├── components/
│ │ │ │ ├── list-users/
│ │ │ │ ├── user-dialog/
│ │ │ │ ├── user-profile/
│ │ │ ├── services/
│ │ │ │ ├── users.service.ts
│ │ │ ├── users-routing.module.ts
│ │ │ ├── users.module.ts
├── angular.json
├── package.json
├── README.md
