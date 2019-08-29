# Back-End

#PUBLIC
still in progress

##GET /
just a check to see server is up and running

returns "5x5"

##GET /api/user/:id
returns all posts for specified author id
	- id           : post id
	- title        : post title
	- author_id    : author id
	- location     : location field
	- post         : post content
	- created_date : created date
	- updated_date : updated date (should be updated with newest updated/edit date)
    - media for post
        + id
        + url
        + caption
        + owner_id
        + author_id

##GET /api/posts
returns all posts no matter the author id
    - id           : post id
    - title        : post title
    - author_id    : author id
    - location     : location field
    - post         : post content
    - created_date : created date
    - updated_date : updated date (should be updated with newest updated/edit date)
    - media for post
        + id
        + url
        + caption
        + owner_id
        + author_id

##GET /api/posts/:id
returns post with specified id
    - id           : post id
    - title        : post title
    - author_id    : author id
    - location     : location field
    - post         : post content
    - created_date : created date
    - updated_date : updated date (should be updated with newest updated/edit date)
    - media for post
        + id
        + url
        + caption
        + owner_id
        + author_id

#PRIVATE

#POST #/auth/users/login
expects:
    - username (required)
    - password (required)

returns:
    - username
    - JWT token

##POST /auth/users/register
expects:
    - username (required)
    - email (required)
    - password (required)

returns:
    - id
    - username

##POST /auth/journal
Dates returned in Unix time which is seconds since 00:00:00 Thursday, 1 January 1970
expects:
    - title (required)    : post title
    - location (required) : geographic location
    - post (required)     : content for post

returns:
    - id           : post id
    - title
    - author_id    : user id of one who posted
    - location
    - post
    - created_date : date post was created

##DELETE /auth/journal/:id
expects:
    - nothing

returns:
    - 204 (no body)

##PUT /auth/journal/:id
expects:
    - title (required)
    - location (required)
    - post (required)

returns:
    - id
    - title
    - author_id
    - location
    - post
    - created_date
    - updated_date

##GET /auth/journal
returns all posts for loggedin user (will be edited to also return media associated with posts)

##GET /auth/journal/:id
returns post with specified id if author matches loggedin user

##GET /auth/journal/:id/media
returns all media for journal with specified id

##POST /auth/journal/:id/media
expects:
    - url (required)
    - caption

returns:
    - id
    - url
    - caption
    - owner_id

##DELETE /auth/journal/:id/media/:mid
deletes specified media and relationship to post
expects:
    - nothing

returns:
    - 204

##PUT /auth/journal/:id/media/:mid
updates media values of specified id
expects:
    - url (required)
    - caption

returns:
    - id
    - url
    - caption
    - owner_id

##GET /auth/media
returns all media (will eventually be edited so only media user posts will show)

##GET /auth/media/:id
returns media with specified id (will be updated so it only returns media of loggedin user)

##GET /auth/journal/:id/comments
returns all comments for post
    - id
    - post_id
    - author_id
    - comment

##POST /auth/journal/:id/comments
expects:
    - comment

returns:
    - id
    - post_id
    - author_id
    - -comment

##DELETE /auth/journal/:id/comments/:cid
deleted specified comment
returns:
    - 204

