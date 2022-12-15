# Functions  

This will explain the details about each serverless function and how to use it.

## Table of Content  

- Users
	- [Cadaster](#cadaster)
	- [Login](#login)
	- [Update](#update)
	- [Update Password](#update_project)
	- [Info](#info)
	- [Search](#search)
- Projects
	- [Create](#create)
	- [Update Project](#update_project)
	- [Project Info](#project_info)
	- [Search Project](#search_project)
	- [Delete Project](#delete_project)

## `cadaster`  

This function must create a new user.

Input:

```json
{
	"username": "<USERNAME>",
	"name": "<NAME>",
	"email": "<EMAIL>",
	"password": "<PASSWORD>"
}
```

Output:

```json
{
	"message": "<MESSAGE>",
	"user_id": "<USER_ID>"
}
```

## `login`  

This function must receive the credentials and check if they are correct, returning a `JWT token` for authentication.

Input:

```json
{
	"username": "<USERNAME>", || "email": "<EMAIL>",
	"password": "<PASSWORD>"
}
```

Output:

```json
{
	"token": "<TOKEN>",
	"message": "<MESSAGE>"
}
```

## `update`  

This function must allow updating the `username`, `accounts` and `picture`.

Require: `Bearer token`

Input:

```json
{
	"username": "<NEW USERNAME>",   // Optional
	"accounts": ["<ACCOUNTS>"],     // Optional
	"picture": "<NEW PICTURE>"      // Optional
}
```

Output:

```json
{
	"message": "<MESSAGE>"
}
```

## `update_password`  

This function should make it possible to update the `password`.

Require: `Bearer token`

Input:

```json
{
	"oldPassword": "<OLD_PASSWORD>",
	"newPassword": "<NEW_PASSWORD>"
}
```

Output:

```json
{
	"message": "<MESSAGE>"
}
```

## `info`  

This function takes a user's `username` or `id` and returns their information.

Input:

```json
{
	"id": "<USER_ID>" || "username": "<USERNAME>"
}
```

Output:

```json
{
	"message": "<MESSAGE>",
	"user": {
		"id": "<USER_ID>",
		"username": "<USERNAME>",
		"projects": ["<PROJECTS_ID>"],
		"accounts": ["<ACCOUNTS>"],
		"picture": "<PICTURE>"
	}
}

```

## `search`  

This function performs a search among users.

Input:

```json
{
	"username": "<USERNAME>"
}
```

Output:

```json
{
	"message": "<MESSAGE>",
	"users": [{
		"id": "<ID>",
		"name": "<NAME>",
		"username": "<USERNAME>",
		"picture": "<PICTURE>"
	}]
}
```

## `create`  

This function creates projects.

Require: `Bearer token`

Input:

```json
{
	"title": "<TITLE>",
	"description": "<DESCRIPTION>",  // Optional
	"platform": "<PLATFORM>",
	"link": "<LINK>",
	"tags": ["<TAGS>"]               // Optional
}
```

Output:

```json
{
	"message": "<MESSAGE>",
	"project_id": "<PROJECT_ID>",
	"path": "<USERNAME>/<TITLE>"
}
```

## `update_project`  

This function should make it possible to change some project information, such as `title`, `description`, `platform`, `link` and `tags`.

Require: `Bearer token`

Input:

```json
{
	"id": "<PROJECT_ID>",
	"title": "<TITLE>",              // Optional
	"description": "<DESCRIPTION>",  // Optional
	"platform": "<PLATFORM>",        // Optional
	"link": "<LINK>",                // Optional
	"tags": ["<TAGS>"]               // Optional
}
```

Output:

```json
{
	"message": "<MESSAGE>"
}
```

## `project_info`  

This function takes the `username/title` (path) or `id` of a project and returns its information.

Input:

```json
{
	"path": "<USERNAME>/<TITLE>" || "id": "<PROJECT_ID>"
}
```

Output:

```json
{
	"message": "<MESSAGE>",
	"project": {
		"id": "<PROJECT_ID>",
		"owner_id": "<OWNER_ID>",
		"title": "<TITLE>",
		"description": "<DESCRIPTION>",
		"path": "<PATH>",
		"platform": "<PLATFORM>",
		"link": "<LINK>",
		"tags": ["<TAGS>"]
}
```

## `search_project`  

This function performs a search among projects by `title`, `platform` and `tags`.

Input:

```json
{
	"title": "<TITLE>",         // Optional
	"tags": ["<TAGS>"],         // Optional
	"platform": "<PLATFORM>"    // Optional
}
```

Output:

```json
{
	"message": "<MESSAGE>",
	"projects": [{
			"path": "<PATH>",
			"title": "<TITLE>",
			"description": "<DESCRIPTION>",
			"id": "<ID>"
		}]
}
```

## `delete_project`  

This function should make it possible to delete a project.

Require: `Bearer token`

Input:

```json
{
	"id": "<PROJECT_ID>",
	"password": "<USER_PASSWORD>"
}
```

Output:

```json
{
	"message": "<MESSAGE>"
}
```
