This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Aviators Network

- [Description](#description)
- [Home Page](#home-page)
- [Authentication](#authentication)
- [Air Sports Navigation Page](#air-sports-navigation-page)
- [Air Sport Main Page](#air-sport-main-page)
    - [About](#about)
    - [View Posts](#view-posts)
    - [Add New Post](#add-new-post)
- [Places To Fly](#places-to-fly)
  - [Last Added Spots](#last-added-spots)
  - [Add Flying Spot](#add-flying-spot)
  - [Find Flying Spots](#find-flying-spot)
- [Market](#market)
- [Last Notes](#last-notes)

## Description
Aviators Network is a social network dedicated to pilots 
of different air disciplines. It holds some static data
for anonymous users and more features once a 
user is authenticated. If a user tries to hit directly an
url that he is not allowed to access, he will be
redirected to the unauthorized page. 
There is also an ADMIN role which
allows all CRUD operations. You can use the username: 'admin' 
and password: '12345678' to explore the provided functionality. 
The project uses Kinvey as database and 6 collections:
(users, posts, comments, votes, flying-spots and market).
I believe that this is just the start of this project and
probably it will evolve in Angular during the next month.

## Home Page
The Home Page displays repeatedly an array 
of 5 messages. The message is changed 
every 3 seconds using setInterval()

## Authentication
Anonymous users can navigate to the Login and
Register forms using the buttons provided on
the right side of the main menu. There is a 
client side validation on every input field and 
appropriate success/error messages are displayed.
Once logged in, an authenticated user may logout
by clicking on the user icon at the right side of
the main menu and selecting Logout from
the dropdown menu.

## Air Sports Navigation Page
Selecting Air Sports from the main menu takes you to
the Air Sports navigation page where you can choose a
specific sport page.

## Air Sport Main Page
Once here, an anonymous user can only read a short article 
about the chosen sport. The article is copied directly
from Wikipedia and holds a link to the related
Wikipedia Page for more details.

Authenticated users first see the posts for this sport
and they have a sidebar menu with 3 options:

#### About
This page displays the same article that is displayed to
the anonymous users.

#### View Posts
Here authenticated users may read posts, like and dislike posts,
leave comments. In case the user is author of the post
or ADMIN, he can also edit or delete the post.
The same applies for comments except that comments don't allow
editing - just deleting.

#### Add New Post
Authenticated users may add their own posts.
The only validated input field is the content field, 
the rest are optional.

## Places To Fly
!Only for authenticated users!
Landing to this section of the page shows you
the last added flying spots.
Here again you can find a sidebar with 3 options:

#### Last Added Spots
This is the default page that is shown after
selecting 'Places To Fly' from the main menu.
Authenticated users may also see details about 
each flying spot by clicking the provided Details Button.

#### Add Flying Spot
!Only for authenticated users!
Here you can add a Flying spot and let the world 
know about it. The form is quite rich and
most of the form fields are validated.

#### Find Flying Spot
I didn't have time to finish the logic about this page,
it's 23:30 and I'm quickly writing the documentation.
Sorry:)

#### Flying Spot Details
!Only for authenticated users!
Here you can find a detailed information about a 
specific Flying Spot as well as weather info about
the current conditions loaded from AccuWeather.

## Market
!Only for authenticated users!
This section is dedicated to selling and buying second hand
flying equipment. Users can see and perform searches
for different products based on categories which correspond to 
the different air-sports.
They can also publish their own items for sale.

## Last Notes
You will probably notice that when a user logs in and clicks on
the user icon on the right side of the main menu, in the dropdown
menu you see a link to 'Profile' which should take you to the 
user's profile page. At this stage this is still not implemented 
and maybe it's a candidate for a separate Single Page App 
that will be build with Angular during the upcoming course.

Also, in case you log in with ADMIN role, in the same dropdown menu 
you will see Admin Panel which is also not implemented yet.
This doesn't mean that there is no ADMIN functionality,
just the Admin Panel is missing!

I hope you enjoy my project. Cheers!