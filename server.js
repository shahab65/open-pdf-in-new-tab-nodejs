const express = require("express");
const path = require("path"); // Import the path module
const fs = require("fs"); // Import the fs module

const app = express(); // Create an Express application instance

const port = 3001; // Define the port on which the server will listen

// Define a simple route handler for the root path ('/')
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/pdf", (req, res) => {
  // Define the path to the PDF file
  const filePath = path.join(__dirname, "test.pdf");

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File not found, send an error response
      console.error("Error:", err);
      res.status(404).send("PDF file not found");
    } else {
      // File exists, set appropriate headers and download it
      // res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Type", "application/octet-stream");
      //   res.setHeader("Content-Disposition", 'attachment; filename="test.pdf"');
      res.sendFile(filePath);
    }
  });
});

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
