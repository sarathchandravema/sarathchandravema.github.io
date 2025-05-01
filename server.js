const express = require('express');
const path = require('path');
const app = express();
const port = 8000;

// Serve static files
app.use(express.static(__dirname));

// Handle all routes
app.get('*', (req, res) => {
    // Check if the requested file exists
    const requestedPath = path.join(__dirname, req.path);
    const fileExists = require('fs').existsSync(requestedPath);

    if (fileExists) {
        // If it's a directory, try to serve index.html
        if (require('fs').statSync(requestedPath).isDirectory()) {
            const indexPath = path.join(requestedPath, 'index.html');
            if (require('fs').existsSync(indexPath)) {
                res.sendFile(indexPath);
                return;
            }
        }
        // If it's a file, serve it
        res.sendFile(requestedPath);
    } else {
        // If file doesn't exist, serve 404 page
        res.status(404).sendFile(path.join(__dirname, '404.html'));
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 