# Hiring Exercise
Your task is to develop client-server applications that act as a building floor plan layout manager. You may use any language(s), libraries, or frameworks you want. You should create a git repository that you can then share with us (preferably via GitHub, although we are flexible). We encourage you to commit to your repository as you develop.

Each floor plan is a rectangular space composed of one or more rectangular rooms. Additionally,
- Any point within the space belongs to exactly one room.
- Each room is entirely contained within the floor plan.
- Each room may contain one or more doors to neighboring rooms.
- Each room must contain at least one door.
- Each room should be able to reach every other room by going through some sequence of doors.
- All doors are 36" wide.

The manager should consist of a login page, a list page, a creator page, and a viewer page.

## Login page
A user should be able to log in after giving their username and password. You should also be able to create an account by giving a username and password. You do not have to treat usernames as email addresses, but if it makes it easier you are allowed to do so. If you do, you do not have to verify email addresses for this exercise. You may use existing libraries.

## List page
When the user logs in, show them a list of floor plans that they have generated. There should be a way to create a new floor plan on the list page. There should also be a way to go to the corresponding viewer page of any of the existing floor plans.

## Creator page
This page consists of a form with the following inputs:

- A title
- The width (X dimension) of the floor plan in feet
- The length (Y dimension) of the floor plan in feet
- The minimum length of a room in feet (applies to both X and Y)
- The maximum length of a room in feet (applies to both X and Y)
- The maximum number of doors in a room (must be at least one)

When a user submits the form, the server generates a valid floor plan meeting these constraints and takes the user back to the list page. There they should be able to see the new floor plan under the given title.

If it is impossible to generate a floor plan meeting these constraints or an invalid input is given, an error should be presented to the user.

## Viewer page
This page should show the user the floor plan's title along with a graphical representation. The user should see:

- The boundary of the entire floor plan
- The boundary of each room
- The location of each door

## Deliverables
When you've finished with the assignment, the following should be delievered to us:

- Full source code of the application hosted in a git repository (GitHub, preferrably).
- A detailed README with clear documentation of the usage of the application and how to build/run it locally and deploy it remotely.
- The application is deployed to a cloud platform of your choice and accessible from a URL. (There are many free tiers of popular cloud platforms that can be used, such as Heroku, but the platform is your choice.)