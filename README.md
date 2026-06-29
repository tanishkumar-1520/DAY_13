****Notes Managment System**** 

A modern and responsive Full Stack Notes Application built using **HTML, CSS, JavaScript, Node.js, Express.js, MongoDB Atlas, and Mongoose**. This application allows users to create, view, edit, delete, and filter notes by date. All notes are stored securely in MongoDB Atlas.



*****Project Overview*****

The Notes Managment System is a simple CRUD (Create, Read, Update, Delete) application that helps users manage their daily notes efficiently.

***Users can:***

- Create new notes
- View all saved notes
- Edit existing notes
- Delete notes
- Filter notes by date
- Store data permanently using MongoDB Atlas

The frontend is built using HTML, CSS, and JavaScript, while the backend uses Express.js and MongoDB Atlas for database storage.

---

*****Features :******

- ✅ Create Notes
- ✅ Update Notes
- ✅ Delete Notes
- ✅ View All Notes
- ✅ Filter Notes by Date
- ✅ Responsive User Interface
- ✅ MongoDB Atlas Database
- ✅ Express REST API
- ✅ Clean and Modern Design

---

#  Technologies Used

### Frontend

 HTML5
- CSS3
- JavaScript (ES6)

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose

---

#  Project Structure

```
Project
│
├── public
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server.js
├── package.json
└── README.md
```

---



#  Required Packages

If packages are not installed, run:

```bash
npm install express mongoose cors
```

---

#  MongoDB Atlas Setup

## Create MongoDB Atlas Account

Create a free account on MongoDB Atlas.

https://www.mongodb.com/atlas

---

## Create Cluster

Create a free M0 Cluster.

---

## Create Database User

Create a new database user.

Example:

Username

```
your_username
```

Password

```
your_password
```

---

## Network Access

Go to Network Access.

Allow access from anywhere.

```
0.0.0.0/0
```

---

## Copy Connection String

Go to

```
Cluster
→ Connect
→ Drivers
```

Copy the connection string.

Example

```text
mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/
```

---

#  Configure MongoDB Connection

Open **server.js**

Replace this line

```javascript
mongoose.connect(
"mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/NotesDB?retryWrites=true&w=majority"
)
```

Replace:

- `your_username` → Your MongoDB Atlas Username
- `your_password` → Your MongoDB Atlas Password
- `cluster0.xxxxx.mongodb.net` → Your Cluster URL

Example

```javascript
mongoose.connect(
"mongodb+srv://john:John12345@cluster0.abcd.mongodb.net/NotesDB?retryWrites=true&w=majority"
)
```

---

#  Run the Project

Start the server.

```bash
node server.js
```

or

```bash
npm start
```

If you have Nodemon installed:

```bash
npx nodemon server.js
```

---

#  Open in Browser

```
http://localhost:5000
```

---

#  API Endpoints

## Get All Notes

```
GET /api/notes
```

---

## Create Note

```
POST /api/notes
```

---

## Update Note

```
PUT /api/notes/:id
```

---

## Delete Note

```
DELETE /api/notes/:id
```

---

#  MongoDB Compass

You can also connect MongoDB Compass using the same connection string.

```
mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/
```

After connecting:

```
NotesDB

└── notes
```

All notes will be stored inside the **notes** collection.

---

#  Author

Developed by **Tanish Kumar**
