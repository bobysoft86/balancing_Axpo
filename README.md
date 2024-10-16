# Energy Market Balancing Axpo

## Overview

This project is part of a technical challenge to build a frontend component for visualizing energy market balancing data. The application calculates day-ahead imbalances based on forecasted inflows (energy producers) and outflows (energy consumers) and displays this data at both the balancing circle level and with a drill-down view at the member level.

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Running Unit Tests](#running-unit-tests)
- [Key Architectural Decisions](#key-architectural-decisions)
- [Improvements and Future Considerations](#improvements-and-future-considerations)

## Technologies Used

- **Angular**: Frontend framework.
- **TypeScript**: Programming language for the frontend logic.
- **Chart.js**: Library for creating graphical visualizations of the data.
- **Material Design (Angular Material)**: UI component library for the application.
- **Axios**: HTTP client for making API requests.
- **Karma/Jasmine**: Testing framework for unit tests.

## Installation

1. Unzip the document attached
2. install all dependencies with  "npm install" on the cmd
3. Run serve with "ng serve" on the cmd
4. open the brownser from the localhost launched on the cmd

## Running the Application

1. Run serve with "ng serve" on the cmd
2. open the brownser from the localhost launched on the cmd

## Running Unit Tests

1. Run tests with "ng test" on the cmd

## Key Architectural Decisions

1. Modular Structure

The application is divided into modules to keep the codebase maintainable and scalable. The core module manages the balancing circles, while modals handle member-level details.

2. Standalone Components

We adopted Angular’s standalone components feature to reduce the need for large NgModules and to keep the components more self-contained.

3. Chart.js for Data Visualization

Chart.js was chosen for the graphical representation of forecast data due to its flexibility and ease of integration with Angular. It allows us to render complex time-based data with relative ease.

4. Axios for HTTP Requests

Axios was selected for making API requests due to its simplicity and promise-based architecture. It helps handle asynchronous requests cleanly within the Angular components.

5. Material Design for UI

Angular Material was used to ensure a clean, consistent, and responsive user interface. Components such as tables, checkboxes, and dialogs were utilized for displaying and interacting with data.

6. Unit Testing with Karma and Jasmine

Unit tests were written to validate critical components and services, ensuring that key parts of the application behave as expected, including data fetching, rendering, and filtering.

7. Use of Promises in Asynchronous Data Fetching

We use Axios and async/await to fetch and process balancing circle data. This ensures asynchronous operations like API calls are handled effectively while keeping the code readable.


## Improvements and Future Considerations


1. Reload all members from model balancing  when no one is selected
2. Add better styles and optimization to be more responsive in all displays
