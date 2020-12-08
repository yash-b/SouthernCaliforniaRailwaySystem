## <div align="center">CPSC 531 Semester Project</div>
## <div align="center">Southern California Railway System</div>

### About 
The Southern California Railway System is a full stack application that manages passengers, trains, and the employees. Passengers can manage their account, purchase tickets, and view their purchased tickets. The employees can view passengers tickets, change train schedules, and view the employee schedules. This system uses a relational database, html, css, and javascript. The relational database consists of 9 tables each in relation by one to many or  one to one. There are connector relations that use the foreign keys which are primary keys in the main relations.

### Features
- Uses NodeJS for backend API calls and utilizes Express application layer.
- Designs, implements, and inserts into a RDBMS design. 
- Uses HTML, CSS, JavaScript, Bootstrap for front-end web development.
- All pages makes successful query calls to the DB and display the results  
- Easy to understand code with easy bug-fixes capacity.

### Execution
- Put `git clone <repo url>` in command line.
- Go into `/server/index.js` and update `#20 - #24` for db credentials.
- Turn on mysql service hosting.
- `cd` into `/server/` directory and put `npm install && npm start`.
- Host client folder using any live server and test it out. 

### Roadmap
- Implement safer user authentication system, potentially using passport js.
- Create and utilize cookies for efficient and optimal session handling.
- Use maps to show schedule for trains.
- Improve User Interface to be more friendly. 

### Contributors
- [Amber Kimberling](https://github.com/)
- [Yash Bhambhani](https://yash-b.github.io)
- [Raymond Magdaleno](https://github.com/)
