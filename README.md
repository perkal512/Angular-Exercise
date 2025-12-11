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
1. **Backend**
cd GARAGESAPI
dotnet restore
dotnet run

URL: `http://localhost:5134/api/garages`

2. **Frontend**
cd CLIENT/GARAGES-APP
npm install
ng serve

Open `http://localhost:4200` in a browser
