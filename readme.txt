This application is configured to run on a Windows machine and to run on port 3001.
This was done becase the JSON-server was running locally on 3000. It was programmed to written to fetch data from localhost json server.

To enable the application to run on linux or Mac, the following changes has to be made in package.json file -
In scripts, the start is changed to "set PORT=3001 && react-scripts start" to run on Windows.
Change the same to "set PORT=3001 react-scripts start" to enable for linux or Mac.