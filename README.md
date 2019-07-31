# PasientData

### About the project

This is a project done by 5 summer interns, who will find and create a solution for finding and collecting data from devices that patients use. They will do user tests as well as develop a webapp for visualising and storing data with the FHIR standard.

#### How to run

Before running the program, take a look at [setup](https://github.com/helsenorgelab/pasientdata#setup)

Start by installing packages:

```
npm install
```

(if missing packages, install from error messages)

Run using npm:

```
npm start
```

## Setup

Start by setting up your editors for the [source/backend](https://github.com/helsenorgelab/pasientdata/tree/master/src/Spark) and the [web/frontend](https://github.com/helsenorgelab/pasientdata/tree/master/WEB/src), we recommend using [Visual Studio](https://visualstudio.microsoft.com/) for the backend and [Visual Studio Code](https://code.visualstudio.com/) for the frontend.
Both programs can be downloaded here:

- Visual Studio: https://visualstudio.microsoft.com/
- Visual Studio Code: https://code.visualstudio.com/

When you have completed you can clone [our repo](https://github.com/helsenorgelab/pasientdata.git) and follow the setup for [backend](https://github.com/helsenorgelab/pasientdata#backend-setup) and then [frontend](https://github.com/helsenorgelab/pasientdata#frontend-setup)

### Backend setup:
* Download and install the .NET core sdk 2.2 from their website: https://dotnet.microsoft.com/download
* Then open the [spark.sln](https://github.com/helsenorgelab/pasientdata/blob/master/src/Spark/Spark.sln) file in Visual Studio, which is located in the Spark folder within the first src file in the repo. 
* This should trigger some error, in which you click on the error and try to restore the packages (you might need to restart Visual Studio if you installed the sdk while having Visual Studio open)
* When the packages are restored and the sdk is install, you can click on the arrow down button right next to the run button and change it to "Spark.NetCore" (see image below)
![picture alt](https://github.com/helsenorgelab/pasientdata/blob/master/Documentation%20images/runBefore.PNG "This is how it should look when you start")
![picture alt](https://github.com/helsenorgelab/pasientdata/blob/master/Documentation%20images/runAfter.PNG "This is how it should look after you have changed to Spark.NetCore")
* When you have chosen "Spark.NetCore" as your run module you can run and see a webpage with "localhost:5001" showing up.
* Now the backend is setup and you can move to the [next section](https://github.com/helsenorgelab/pasientdata#frontend-setup).

### Frontend setup:

### Google credentials setup:

To access google data you will need to log into: [concole.developers.google.com](https://console.developers.google.com/) <br/>
<br/>
How to set up credentials:

- Select a project -> new project
  - set project name (let location be default: No organization) -> create
- Select your [new project](https://console.developers.google.com/projectcreate?previousPage=%2Fapis%2Fdashboard%3Fproject%3Dehelse-247812&folder=&organizationId=0)
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

## Additional information

### Google Fit Endpoints:

To retrieve information from Google, you can use a get request with the API call: "https://www.googleapis.com/fitness/v1/users/me/dataSources/". This will output all the datasources you have available, you will need to define the scope to the type of dataSources you want. After you have specified the dataSource, you can ask for a specific dataSet which will be a set between a specific timeintervall in nanoseconds (e.g. from: 631148400000000000 = 01/01/1990 00:00 GMT+1, to 1735686000000000000 = 01/01/2025 00:00 GMT+1).

### Datasources:

Here are some of the datasources regarding Google fit:

#### Get steps:

- Endpoint: derived:com.google.step_count.delta:com.google.android.gms:estimated_steps

#### Get body weight:

- Endpoint: derived:com.google.weight:com.google.android.gms:merge_weight

#### Get height:

- Endpoint: derived:com.google.height:com.google.android.gms:merge_height

#### Get Heart beats:

- Endpoint: derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm

#### Get Blood pressure:

- Endpoint: derived:com.google.blood_pressure:com.google.android.gms:merged

#### Get Blood glucose:

- Endpoint: derived:com.google.blood_glucose:com.google.android.gms:merged

#### Get Activities:

- Endpoint: derived:com.google.activity.segment:com.google.android.gms:merge_activity_segments

##### Get Batched Activities:

- Endpoint: derived:com.google.activity.segment:com.google.android.gms:session_activity_segment

##### List of activity types:

https://developers.google.com/fit/rest/v1/reference/activity-types
