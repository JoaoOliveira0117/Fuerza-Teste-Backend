export default {
    "openapi": "3.0.0",
    "info": {
        "title": "Simple Auth API by João Oliveira",
        "description": "This simple api provides post CRUD with authenticated routes",
        "contact": {
            "email": "joao.oliveira0117@hormail.com",
            "name": "João Oliveira"
        },
        "version": "1.0.0"
    },
    "servers": [
        {
            "url": "http://localhost:3000/",
            "description": "Base URL"
        }
    ],
    "paths": {
        "/register":{
            "post": {
                "summary": "Registers a new User",
                "description": "This route will save the new user credentials on the database",
                "tags": ["User"],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/RegisterUser"
                            },
                            "examples": {
                                "user":  {
                                    "value": {
                                        "name": "John Doe",
                                        "email": "foo@bar.com",
                                        "password": "123456"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "400": {
                        "description": " { error: //Error// } ",
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "$ref": "#/components/schemas/RegisterUser",
                                }
                            }
                        }
                    }
                }
            }
        },
        "/login": {
            "post": {
                "summary": "Logins with the new user",
                "description": "This route will login to the application using given credentials and will return the authentication token",
                "tags": ["User"],
                "requestBody":{
                    "content":{
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/RegisterUser",
                            },
                            "examples": {
                                "user": {
                                    "value": {
                                        "email": "foo@bar.com",
                                        "password": "123456"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "404": {
                        "description": "User not found"
                    },
                    "400": {
                        "description": " { error: //Error// } ",
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "$ref": "#/components/schemas/LoginUser",
                                }
                            }
                        }
                    }
                }

            }
        },
        "/api/posts": {
            "post": {
                "summary": "Creates a new post",
                "description": "This route will create a new post on the database.",
                "tags": ["Posts"],
                "security": [{"bearerAuth": []}],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/Posts",
                            },
                            "examples": {
                                "post": {
                                    "value": {
                                        "title": "I'm a post",
                                        "body": "This is my body",
                                        "tags": ["These", "are", "my", "tags"]
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "500": {
                        "description": "Server error"
                    },
                    "404": {
                        "description": "No post found that matches the given id",
                    },
                    "401": {
                        "description": "Unauthorized"
                    },
                    "400": {
                        "description":  "Client Error",
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "$ref": "#/components/schemas/Posts",
                                }
                            }
                        }
                    }
                }
            },
            "get": {
                "summary": "Lists all posts",
                "description": "This route will list all the posts on the database.",
                "tags": ["Posts"],
                "security": [{"bearerAuth": []}],
                "responses": {
                    "500": {
                        "description": "Server error"
                    },
                    "404": {
                        "description": "No post found that matches the given id",
                    },
                    "401": {
                        "description": "Unauthorized"
                    },
                    "400": {
                        "description":  "Client Error",
                    },
                    "200": {
                        "description": "OK",
                    }
                }
            },
        },
        "/api/posts/{id}": {
            "get": {
                "summary": "Returns a post",
                "description": "This route will return the post that matches the given valid id",
                "tags": ["Posts"],
                "security": [{"bearerAuth": []}],
                "parameters": [{
                    "name": "id",
                    "in": "path",
                    "description": "Post id",
                    "required": true,
                }],
                "responses": {
                    "500": {
                        "description": "Server error"
                    },
                    "404": {
                        "description": "No post found that matches the given id",
                    },
                    "401": {
                        "description": "Unauthorized"
                    },
                    "400": {
                        "description":  "Client Error",
                    },
                    "200": {
                        "description": "OK",
                    }
                }
            },
            "put": {
                "summary": "Edits a post",
                "description": "This route will update the post that matches the given",
                "tags": ["Posts"],
                "security": [{"bearerAuth": []}],
                "parameters": [{
                    "name": "id",
                    "in": "path",
                    "description": "Post id",
                    "required": true,
                }],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/Posts",
                            },
                            "examples": {
                                "post": {
                                    "value": {
                                        "title": "I'm a **EDITED** post",
                                        "body": "This is my **EDITED** body",
                                        "tags": ["These", "are", "my",  "**EDITED**", "tags"]
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "500": {
                        "description": "Server error"
                    },
                    "404": {
                        "description": "No post found that matches the given id",
                    },
                    "401": {
                        "description": "Unauthorized"
                    },
                    "400": {
                        "description":  "Client Error",
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "$ref": "#/components/schemas/Posts",
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                "summary": "Edits a post",
                "description": "This route will update the post that matches the given",
                "tags": ["Posts"],
                "security": [{"bearerAuth": []}],
                "parameters": [{
                    "name": "id",
                    "in": "path",
                    "description": "Post id",
                    "required": true,
                }],
                "responses": {
                    "500": {
                        "description": "Server error"
                    },
                    "404": {
                        "description": "No post found that matches the given id",
                    },
                    "401": {
                        "description": "Unauthorized"
                    },
                    "400": {
                        "description":  "Client Error",
                    },
                    "200": {
                        "description": "OK",
                    }
                }
            },
        }
    },
    "components": {
        "schemas": {
            "RegisterUser": {
                "type": "object",
                "required": [
                    "name",
                    "email",
                    "password"
                ],
                "properties": {
                    "name": {
                        "type": "string",
                    },
                    "email": {
                        "type": "string"
                    },
                    "password":{
                        "type": "string"
                    }
                }
            },
            "LoginUser": {
                "type": "object",
                "required": [
                    "email",
                    "password"
                ],
                "properties": {
                    "email": {
                        "type": "string"
                    },
                    "password":{
                        "type": "string"
                    }
                }
            },
            "Posts": {
                "type": "object",
                "properties": {
                    "title": {
                        "type": "string",
                    },
                    "body": {
                        "type": "string",
                    },
                    "tags": {
                        "type": "array",
                        "example": ["a","b","c"]
                    }
                }
            }
        },
        "securitySchemes": {
            "bearerAuth": {
                "type": "http",
                "scheme": "bearer",
                "bearerFormar": "JWT"
            }
        }
    }
}