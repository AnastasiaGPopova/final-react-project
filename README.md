# final-react-project-Record Me-Anastasia Popova

I. Introduction

- "Record Me" project is a web app where people can share their passion for vinyl records.
- MERN stack project - MongoDB, Express.js, React.js, and Nodejs

II. Getting Started

Installation instructions:
1. Go to "client" folder and run "npm start"
2. Go to "server" folder and run "npm run start"

III. Folder Structure

client folder structure:
- "public" folder - contains all public images
- "scr" folder - contains:
        - api folder -for all api requests
        - components folder - all components
        - context folder 
        - hook folder - contains custom form hook
        - utils folder

IV. Components
- Navigation component - contains the header and the navigation bar of the web app
- Catalog component - contains all listed entries and a search bar
- Create component - contains a creation form
- Details component - contains the details of the entries. Depending if user is logged , owner or guest - different functionalitites are shown
- Login component - contains login form
- Register component - contains register form
- Homepage component - contains the home page of the app
- Footer component - contains the footer information
- Error component - contains the 404 not found page
- Profile component - contains the current logged in user information /created entries or liked entries/
- SingleRecord component - contains the info card for each entry 
- Table component - contains the Spotify entries


V. Routing
- Routing is done with the help of "react-router-dom".
- Private routes are done using react-auth-kit - "RequireAuth".


VI. State Management
- RecordContext was created, which holds the main states across the project


VII. APIs and Backend Integration
- Mongoose, Express, and Node.js
- CRUD Operations
All requests are sent to http:localhost/3030/:resource. Supported requests are GET, POST, PUT, PATCH, DELETE
- MongoDB Models: User, Comment, Record

VIII. Styling
- The application is divided into components with separate CSS files.