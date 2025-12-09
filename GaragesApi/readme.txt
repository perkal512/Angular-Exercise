Garages Management API 

Project Overview:
.NET 8 WebAPI to manage garages, fetch data from government API, and store in SQL Server.

Setup & Run:
1. Clone repository:
   git clone https://github.com/perkal512/Angular-Exercise.git
2. Open in Visual Studio 2022+.
3. Set SQL Server connection in appsettings.json:

   "DefaultConnection": "Server=<YOUR_SERVER_NAME>;Database=GaragesDb;Trusted_Connection=True;TrustServerCertificate=True"

   Replace <YOUR_SERVER_NAME> with your local SQL Server instance 

4. Install NuGet packages:
   - Microsoft.EntityFrameworkCore
   - Microsoft.EntityFrameworkCore.SqlServer
   - Microsoft.EntityFrameworkCore.Tools

5. Create DB and tables:
   - Run:
     > Add-Migration InitialCreate
     > Update-Database

6. Run the project (F5). API available at https://localhost:<port>/api/garages

Endpoints:
- GET /api/garages/garages-from-gov : fetch from government API
- GET /api/garages/get-all : fetch from local DB
- POST /api/garages/add : add a new garage
- POST /api/garages/add-multiple : add multiple garages