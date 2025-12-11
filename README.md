# Garage Management System - FullStack

## Overview
FullStack garage management system with ASP.NET Core backend and Angular 17 frontend. Fetches garages from a government API and stores them in a local SQL Server database.

## Project Structure
- **Backend (GARAGESAPI/):**
  - `GET /all-gov` - fetch from government API
  - `GET /all-local` - fetch from local DB
  - `POST /add` - add single garage
  - `POST /add-multiple` - add multiple garages without duplicates
  - All DB operations are async with error handling
  - **Database Connection:** Each developer must set their own SQL connection string in `appsettings.json` or  before running the backend.


- **Frontend (CLIENT/GARAGES-APP/):**
  - Table for local garages in DB
  - Multi-select component
  - "Add" button for selected garages
  - Loading spinner and SnackBar notifications
  - Smooth table animations
  - **Services Structure:**
    - `GaragesService` - handles all HTTP requests to backend
    - `GaragesStateService` - manages local state of garages (local, government, selected)
    - The separation ensures a clean architecture.

## Running

- **Backend:**

1. Open a terminal in GARAGESAPI/
2. Restore packages:
   dotnet restore
3. Run the backend:
   dotnet run
4. API URL: http://localhost:5134/api/garages

- **Frontend:**
 
1. Open a terminal in CLIENT/GARAGES-APP/
2. Install dependencies:
   npm install
3. Run the Angular development server:
   ng serve
4. Open in browser: http://localhost:4200

Notes
-----
- Make sure the backend is running before starting the frontend.
- All SQL operations are asynchronous.
- Ensure the connection string points to your local SQL Server.