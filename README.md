# Back-End API Endpoints

## PUBLIC
still in progress

### GET /
just a check to see server is up and running

returns "5x5"

### GET /api/user/:id
returns all posts for specified author id

  - id           : post id
  - title        : post title
  - author_id    : author id
  - location     : location field
  - post         : post content
  - created_date : created date (_UNIX time_)
  - updated_date : updated date (_UNIX time_)
    (should be updated with newest updated/edit date)
  - media for post
      + id
      + url
      + caption
      + owner_id
      + author_id

### GET /api/posts
returns all posts no matter the author id

  - id           : post id
  - title        : post title
  - author_id    : author id
  - location     : location field
  - post         : post content
  - created_date : created date (_UNIX time_)
  - updated_date : updated date (_UNIX time_)
  (_should be updated with newest updated/edit date_)
  - media for post
      + id
      + url
      + caption
      + owner_id
      + author_id

### GET /api/posts/:id
returns post with specified id

  - id           : post id
  - title        : post title
  - author_id    : author id
  - location     : location field
  - post         : post content
  - created_date : created date (_UNIX time_)
  - updated_date : updated date (_UNIX time_)
      (_should be updated with newest updated/edit date_)
  - media for post
      + id
      + url
      + caption
      + owner_id
      + author_id

## PRIVATE

### POST /auth/users/login
**expects:**

  - username (_required_)
  - password (_required_)

**returns:**

  - username
  - JWT token

### POST /auth/users/register
**expects:**

  - username (_required_)
  - email (_required_)
  - password (_required_)

**returns:**

  - id
  - username

### POST /auth/journal
Dates returned in Unix time which is seconds since 00:00:00 Thursday, 1 January 1970
**expects:**

  - title (_required_)    : post title
  - location (_required_) : geographic location
  - post (_required_)     : content for post

**returns:**

  - id           : post id
  - title
  - author_id    : user id of one who posted
  - location
  - post
  - created_date : date post was created (_UNIX time_)

### DELETE /auth/journal/:id
**expects:**

  - nothing

**returns:**

  - 204 (_no body_)

### PUT /auth/journal/:id
**expects:**

  - title (_required_)
  - location (_required_)
  - post (_required_)

**returns:**

  - id
  - title
  - author_id
  - location
  - post
  - created_date
  - updated_date

### GET /auth/journal
returns all posts for loggedin user
(_WIP will be edited to also return media associated with posts_)

### GET /auth/journal/:id
returns post with specified id if author matches loggedin user

### GET /auth/journal/:id/media
returns all media for journal with specified id

### POST /auth/journal/:id/media
**expects:**

  - url (_required_)
  - caption

**returns:**

  - id
  - url
  - caption
  - owner_id

### DELETE /auth/journal/:id/media/:mid
deletes specified media and relationship to post
**expects:**

  - nothing

**returns:**

  - 204

### PUT /auth/journal/:id/media/:mid
updates media values of specified id
**expects:**

  - url (_required_)
  - caption

**returns:**

  - id
  - url
  - caption
  - owner_id

### GET /auth/media
returns all media
(_WIPwill eventually be edited so only media user posts will show_)

### GET /auth/media/:id
returns media with specified id
(_WIP: will be updated so it only returns media of loggedin user_)

### GET /auth/journal/:id/comments
returns all comments for post

  - id
  - post_id
  - author_id
  - comment

### POST /auth/journal/:id/comments
**expects:**

  - comment

**returns:**

  - id
  - post_id
  - author_id
  - comment

### DELETE /auth/journal/:id/comments/:cid
deleted specified comment
**returns:**

  - 204
