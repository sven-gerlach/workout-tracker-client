# Project: ProLoad

## Executive Summary
- Free-weights work-out tracker
- Allowing the user to record, save, and evaluate their weight training performance statically and serially
- CRUDing on 4 resources: user, workout, exercise, and set
- Custom-built back-end with 13 RESTful API routes
- NoSQL Database setup includes sub-documents and 1-to-many resource relationships

## Overview of Packages
- Bootstrap
- Chart.js 
- HTML5 
- JavaScript 
- jQuery 
- Lodash 
- Moment 
- SCSS 
- Spin 
- Webpack 

## Deployment
The app is deployed on AWS Amplify under the URL https://main.d1lh4tq2cl1ki4.amplifyapp.com/.

## Background
I want to build a workout app that reduces the interaction with the interface during the workout session to an absolute minimum. Eventually, the interaction will be limited to the mobile device/fitness band/watch asking the wearer to confirm the weight used. All the other key data points, such as repetitions, exercise, duration, heart rate are collected and stored automatically. The key USP will be the AI-driven recognition of the exercise type and the repetitions. I believe this can be achieved with 4 spatially aware sensors, each attached to the extremities of the wearer.

Whilst this is setting the scene and future development potential, this version of the app will not include the core functionality but rather resemble a bare-bones fitness tracker with mobile-first UX / UI, sign-up and sign-in functionality, and basic CRUD operations, including exercise tracking, storing, and update/review functionality.

Every fitness tracker I ever used failed to live up to the expectations because:
1. They have proved to be intrusive during the work-out - requiring cumbersome data entry or offer up a plethora of useless information that bears limited to no actionable value (e.g. staying within a certain heart rate band for cardio-vascular training)
1. Currently, available apps collect some data, but none actually offer much actionable
   advice on the back of that data

## Technologies Used
This repo is the front-end of the project. It was written using:
+ JavaScript
+ HTML
+ CSS/SCSS

The frameworks and libraries used, include:
+ jQuery
+ Bootstrap
+ Chart.js
+ Lodash
+ Spin
+ Moment

## Links to Related Repositories
The back-end API repo can be found on [GitHub](https://github.com/sven-gerlach/workout-tracker-api).

## Wireframes
![ERD](admin/wireframes.png)

## User Stories
+ As an athlete I want to sign-up fast and be able to use the app immediately on my existing training plans.
+ As an athlete I want to use the app predominantly on my phone with minimum distractions during my training.
+ As an athlete I want the app to store individual exercises, the sets, reps, weights, duration of the exercise, duration of breaks between reps and sets.
+ As an athlete I want to review recent training summaries and be able to comment on potential changes/amendments to my training regime for the next time I do this exercise.
+ As a personal instructor I want to review my client's training diary and comment on them and make changes to the
  upcoming training plan.

## Planning Documentation

### Planning
-[x] Review of the requirements / brief
-[x] Create User Stories
-[x] Create Wire Frames
-[x] Create ERD

### Client
-[x] Sign Up (curl then web app)
-[x] Sign In (curl then web app)
-[x] Change Password (curl then web app)
-[x] Sign Out (curl then web page)
-[x] All API calls have success or failure messages
-[x] Create resource (curl then web app)
-[x] Get all of their owned resources (curl then web app)
-[x] Delete single resource (curl then web app)
-[x] Update single resource (curl then web app)

### Final Touches
-[x] README
-[x] Troubleshoot/Debug
-[x] Refactor

## Stretch Goals / Next Development Phase
1. Build in timer functionality that allows the user to record time, including total time under load, total breaks between reps and, separately, time between sets, as well as average break lengths
1. Exercise Templates
1. Review historic workout in more detail than currently possible in the graph function (which only shows total volume per exercises)
1. Combine with third-party trackers with the end-goal being that the only data point the user has to enter on their phone / smart-watch is the weights used (reps, sets, and exercises are all tracked automatically)
