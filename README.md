# Helseinnsikt

**Pasientdata er kildekoden fra sommerstudentprosjektet 2019. Prosjektet vedlikeholdes ikke, og er ikke ment for bruk med reelle personopplysninger.**

### About the project

This is a project done by 5 summer interns, who will find and create a solution for finding and collecting data from devices that patients use. They will do user tests as well as develop a webapp for visualising and storing data with the FHIR standard.

### Demo ### 
** Disclaimer: we do not reccomend logging in with your own Google account if you do not want to share information about your steps, physical activity minutes and weight.

Link: http://helseinnsikt.surge.sh/

#### How to run

**Before running the program, take a look at [setup](https://github.com/helsenorgelab/pasientdata#setup)**

Run using npm:

```
npm start
```

#### How to deploy

Standing in the /src/citizenapp folder, execute the following command:

```
npm run-script build
```

Then install surge:

```
npm i --global surge
```

Run surge:

```
surge
```

Then make a surge user through the terminal by following the instructions given there.

You are then asked to specify the path to the build folder of the project, and then give a name to the .surge.sh URL of the web page.

Once this is done the web page should be deployed!

# Setup

Start by setting up your editors for the [source/backend](https://github.com/helsenorgelab/pasientdata/tree/master/src/Spark) and the [web/frontend](https://github.com/helsenorgelab/pasientdata/tree/master/WEB/src), we recommend using [Visual Studio](https://visualstudio.microsoft.com/) for the backend and [Visual Studio Code](https://code.visualstudio.com/) for the frontend.
Both programs can be downloaded here:

- Visual Studio: https://visualstudio.microsoft.com/
- Visual Studio Code: https://code.visualstudio.com/

When you have completed you can clone [our repo](https://github.com/helsenorgelab/pasientdata.git) and follow the setup for [backend](https://github.com/helsenorgelab/pasientdata#backend-setup) and then [frontend](https://github.com/helsenorgelab/pasientdata#frontend-setup)

## Backend setup:

**_The backend is now running on a server, but we also have a local version. If you want to run it locally, follow the steps below._**

- Download and install the .NET core sdk 2.2 from their website: https://dotnet.microsoft.com/download
- Open a terminal in `src/fhirserver` folder, and start the FHIR server with command `dotnet run`
- Check that the Spark FHIR Server is running, by opening `https:\\localhost:5001` in your browser
- Now the backend is setup and you can move to the [next section](https://github.com/helsenorgelab/pasientdata#frontend-setup).

\*If you want to run the server locally, you need to change the useLocalServer variable to "true" in the file called [fhirUrl.js](https://github.com/helsenorgelab/pasientdata/blob/dev/WEB/src/fhirUrl.js).

<!-- *If you are running the server externally, you need to change the useLocalServer variable to "false" in the file called [fhirUrl.js](https://github.com/helsenorgelab/pasientdata/blob/dev/WEB/src/fhirUrl.js). -->

## Frontend setup:

To install the packages and run the application you need to install nodeJS, which can be downloaded from: https://nodejs.org/en/ (Install NodeJS before continuing).

- Before installing the packages, you need to get your key from e-helse so that you can get the styling components from them, which will be installed when you use npm install.
  - This key should be placed in a file called ".npmrc" and the file should be placed right under your "user" folder.
  ```
      C:\Users\"username"
  ```
  - If these components are not needed you need to go through the code and remove them as well as remove it from the node_modules folder on you local computer.
- When the key is placed in the right location, you can use the command below

How to install packages:

```
npm install
```

\*if missing packages, install the package manually with:

```
npm install --save "name_of_package"
```

**Now you can run the program as [shown above](https://github.com/helsenorgelab/pasientdata#how-to-run)**

## Google credentials setup:

To access google data you will need to log into: [concole.developers.google.com](https://console.developers.google.com/) <br/>
<br/>
How to set up credentials:

- Select a project -> new project
  - set project name (let location be default: No organization) -> create
- Select your [new project](https://console.developers.google.com/projectcreate?previousPage=%2Fapis%2Fdashboard%3Fproject%3Dehelse*247812&folder=&organizationId=0)
  - Click "APIs & Services" on the left
    - Click "+ ENABLE APIS AND SERVICES"
    - Search and select "Fitness API", then enable it
    - Go back by entering "[https://console.developers.google.com/apis/dashboard](https://console.developers.google.com/apis/dashboard)" in the url
  - Click on "Credentials" on the left
    - Click on "OAuth consent screen" from the tabs
      - Fill in application name
      - Click "add scope" and add the APIs needed (our case: activity.read, body.read and nutrition.read. You will need to add one at the time.)
      - Click save
    - Click the "Credentials" from the tabs
      - Click "Create credentials", then "Oauth client ID"
      - Choose "Web application"
      - Give it a name
      - Add "Authorized JavaScript origins" (http://localhost:3000, if you are still in development environment)
      - Add "Authorized redirect URIs" (also http://localhost:3000 if you have a single page app)
- Copy your clientID and paste it over the clientID in the "[googleFit.js](https://github.com/helsenorgelab/pasientdata/blob/master/WEB/src/api/googleFit.js)" file under the [api folder](https://github.com/helsenorgelab/pasientdata/tree/master/WEB/src/api).


