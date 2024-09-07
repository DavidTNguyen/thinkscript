const fs = require('fs');
const path = require('path');

// Get the folder name from the command line arguments
const folderName = process.argv[2];

if (!folderName) {
    console.log('Please provide a folder name as an argument.');
    process.exit(1);
}

const directoryPath = path.join(__dirname, folderName);

// Read the directory
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    // Loop through all the files in the directory
    files.forEach((file) => {
        // Check if the file has a .ts extension
        if (path.extname(file) === '.ts') {
            // Get the full path of the file
            const oldPath = path.join(directoryPath, file);
            // Create the new path with the .tosts extension
            const newPath = path.join(directoryPath, path.basename(file, '.ts') + '.tosts');

            // Rename the file
            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    console.log('Error renaming file: ' + err);
                } else {
                    console.log(`Renamed: ${oldPath} -> ${newPath}`);
                }
            });
        }
    });
});