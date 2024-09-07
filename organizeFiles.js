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
        // Get the file name without the extension
        const fileNameWithoutExt = path.basename(file, path.extname(file));
        // Create a new folder with the file name
        const newFolderPath = path.join(directoryPath, fileNameWithoutExt);

        // Create the new folder
        fs.mkdir(newFolderPath, { recursive: true }, (err) => {
            if (err) {
                console.log('Error creating folder: ' + err);
            } else {
                // Get the full path of the file
                const oldPath = path.join(directoryPath, file);
                // Create the new path inside the new folder
                const newPath = path.join(newFolderPath, file);

                // Move the file to the new folder
                fs.rename(oldPath, newPath, (err) => {
                    if (err) {
                        console.log('Error moving file: ' + err);
                    } else {
                        console.log(`Moved: ${oldPath} -> ${newPath}`);
                    }
                });
            }
        });
    });
});