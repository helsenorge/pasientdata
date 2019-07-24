# PasientData

## About the project
This is a project done by 5 summer interns, who will find and create a solution for finding and collecting data from devices that patients use. They will do user tests as well as develop a webapp for visualising and storing data with the FHIR standard. 

## How to run
Run using npm: 

```
npm start
```

## Google Fit Endpoints:
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