'use strict';

var something = 'test';

module.exports.test = {
    swagger: "2.0",
    info: {
        title: "BDU Content-API",
        description: "BDU Content-API.",
        version: "1.0.0"
    },
    basePath: "/v1",
    produces: ["application/json", "multipart/form-data", "application/x-www-form-urlencoded"],
    consumes: ["application/json"],
    paths: {
        "/recipes/{id}": {
            get: {
                tags: ["recipes"],
                summary: "Gets a recipe by its ID.",
                description: "Returns a recipe found by given ID.",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "x-client-token",
                        in: "header",
                        description: "The client token.",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "id",
                        in: "path",
                        description: "The id of the recipe.",
                        required: true,
                        type: "string"
                    }
                ],
                responses: {
                    "200": {
                        description: "The recipe's data if found",
                        schema: {$ref: "#/definitions/Recipe"}
                    },
                    "400": {
                        description: "Request validation error.",
                        schema: {$ref: "#/definitions/Error"}
                    },
                    "404": {
                        description: "recipe not found error.",
                        schema: {$ref: "#/definitions/Error"}
                    },
                    "500": {
                        description: "Unexpected error.",
                        schema: {$ref: "#/definitions/Error"}
                    }
                }
            },
            put: {
                tags: ["recipes"],
                summary: "Update an existing recipe.",
                description: "Updates an existing recipe with a complete new content.",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        name: "x-client-token",
                        in: "header",
                        description: "The client token.",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "authorization",
                        in: "header",
                        description: "The user token.",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "id",
                        in: "path",
                        description: "The id of the recipe.",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "recipe",
                        in: "body",
                        description: "The recipe as json-object valid against the recipe-schema.",
                        required: true,
                        schema: {$ref: "#/definitions/Recipe"}
                    }
                ],
                responses: {
                    "204": {description: "Recipe successfully updated."},
                    "400": {
                        description: "Request validation error. Submitted recipe is propably not valid.",
                        schema: {$ref: "#/definitions/Error"}
                    },
                    "500": {
                        description: "Unexpected error.",
                        schema: {$ref: "#/definitions/Error"}
                    }
                }
            },
            delete: {
                tags: ["recipes"],
                summary: "Deletes a recipe by its ID.",
                description: "Deletes a recipe by its ID.",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "x-client-token",
                        in: "header",
                        description: "The client token.",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "authorization",
                        in: "header",
                        description: "The user token.",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "id",
                        in: "path",
                        description: "The id of the recipe.",
                        required: true,
                        type: "string"
                    }
                ],
                responses: {
                    "200": {
                        description: "Recipe deleted.",
                        schema: {$ref: "#/definitions/EntityDeleted"}
                    },
                    "400": {
                        description: "Request validation error.",
                        schema: {$ref: "#/definitions/Error"}
                    },
                    "404": {
                        description: "recipe not found error.",
                        schema: {$ref: "#/definitions/Error"}
                    },
                    "500": {
                        description: "Unexpected error.",
                        schema: {$ref: "#/definitions/Error"}
                    }
                }
            }
        },
        "/recipes": {
            post: {
                tags: ["recipes"],
                summary: "Create a new entity.",
                description: "Creates a new recipe.",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        name: "x-client-token",
                        in: "header",
                        description: "The client token.",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "authorization",
                        in: "header",
                        description: "The user token.",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "recipe",
                        in: "body",
                        description: "The recipe as json-object valid aginst the recipe-schema.",
                        required: true,
                        schema: {$ref: "#/definitions/Recipe"}
                    }
                ],
                responses: {
                    "201": {
                        description: "returns the id of the newly created recipe",
                        schema: {$ref: "#/definitions/EntityCreated"}
                    },
                    "400": {
                        description: "Request validation error. Submitted recipe is propably not valid.",
                        schema: {$ref: "#/definitions/Error"}
                    },
                    "500": {
                        description: "Unexpected error.",
                        schema: {$ref: "#/definitions/Error"}
                    }
                }
            },
            get: {
                tags: ["recipes"],
                summary: "list all available recipes",
                description: "Returns all recipes ids.",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "x-client-token",
                        in: "header",
                        description: "The client token.",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "q",
                        in: "query",
                        description: "the query",
                        required: false,
                        type: "string"
                    },
                    {
                        name: "nestedPath",
                        in: "query",
                        description: "the JSON path to the nested object",
                        required: false,
                        type: "string"
                    },
                    {
                        name: "nestedQuery",
                        in: "query",
                        description: "the query for the nested object",
                        required: false,
                        type: "string"
                    },
                    {
                        name: "aggs",
                        in: "query",
                        description: "the aggregations (string<,string><:type>)",
                        required: false,
                        type: "array",
                        items: {type: "string"},
                        collectionFormat: "multi"
                    },
                    {
                        name: "fields",
                        in: "query",
                        description: "the fields to be returned",
                        required: false,
                        type: "array",
                        items: {type: "string"},
                        collectionFormat: "multi"
                    },
                    {
                        name: "offset",
                        in: "query",
                        description: "the offset to start the listing at",
                        required: false,
                        type: "string"
                    },
                    {
                        name: "limit",
                        in: "query",
                        description: "the amount of results to display",
                        required: false,
                        type: "string"
                    },
                    {
                        name: "sort",
                        in: "query",
                        description: "fieldname:asc/desc",
                        required: false,
                        type: "string"
                    }
                ],
                responses: {
                    "200": {description: "A list of recipes."},
                    "500": {
                        description: "Unexpected error.",
                        schema: {$ref: "#/definitions/Error"}
                    }
                }
            }
        },
        "/recipes/related": {
            get: {
                tags: ["recipes"],
                summary: "list all related recipes for given ids or textual input",
                description: "Returns all internally related recipes based on a sequence of ids, any kind of text or an options object. Note that in order to get sensible results, either one ore more recipe ids or some free text (likeText) or an original elasticsearch more_like_this query-object has to be given.",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "x-client-token",
                        in: "header",
                        description: "The client token.",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "ids",
                        in: "query",
                        description: "a comma-separated listing of recipe ids (or only one)",
                        required: false,
                        type: "string"
                    },
                    {
                        name: "likeText",
                        in: "query",
                        description: "some piece of text used for searching related recipes",
                        required: false,
                        type: "string"
                    },
                    {
                        name: "lowTermDocFreq",
                        in: "query",
                        description: "set doc/term frequencies to <=1 (use for small test indices to get results!)",
                        required: false,
                        type: "boolean"
                    },
                    {
                        name: "originalOptions",
                        in: "query",
                        description: "an original elastic search options object, see https://www.elastic.co/guide/en/elasticsearch/reference/1.4/query-dsl-mlt-query.html .The above values will be ignored when this is set.",
                        required: false,
                        type: "string"
                    },
                    {
                        name: "offset",
                        in: "query",
                        description: "the offset to start the listing at (default is 0)",
                        required: false,
                        type: "string"
                    },
                    {
                        name: "limit",
                        in: "query",
                        description: "the amount of results to display (default is 10)",
                        required: false,
                        type: "string"
                    }
                ],
                responses: {
                    "200": {description: "A list of recipes."},
                    "400": {
                        description: "one of \\'ids\\', \\'likeText\\' or \\'originalOptions\\' needs to be given",
                        schema: {$ref: "#/definitions/Error"}
                    },
                    "500": {
                        description: "Unexpected error.",
                        schema: {$ref: "#/definitions/Error"}
                    }
                }
            }
        },
        "/collections/{id}": {
            get: {
                tags: ["collections"],
                summary: "Gets a collection by its ID.",
                description: "Returns a collection found by given ID.",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "x-client-token",
                        in: "header",
                        description: "The client token.",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "id",
                        in: "path",
                        description: "The id of the collection.",
                        required: true,
                        type: "string"
                    }
                ],
                responses: {
                    "200": {
                        description: "The collection's data if found",
                        schema: {$ref: "#/definitions/Collection"}
                    },
                    "400": {
                        description: "Request validation error.",
                        schema: {$ref: "#/definitions/Error"}
                    },
                    "404": {
                        description: "Collection not found error.",
                        schema: {$ref: "#/definitions/Error"}
                    },
                    "500": {
                        description: "Unexpected error.",
                        schema: {$ref: "#/definitions/Error"}
                    }
                }
            },
            put: {
                tags: ["collections"],
                summary: "Update an existing collection.",
                description: "Updates an existing collection with a complete new content.",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        name: "x-client-token",
                        in: "header",
                        description: "The client token.",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "authorization",
                        in: "header",
                        description: "The user token.",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "id",
                        in: "path",
                        description: "The id of the collection.",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "collection",
                        in: "body",
                        description: "The collection as json-object valid against the collection-schema.",
                        required: true,
                        schema: {$ref: "#/definitions/Collection"}
                    }
                ],
                responses: {
                    "204": {description: "Collection successfully updated."},
                    "400": {
                        description: "Request validation error. Submitted collection is propably not valid.",
                        schema: {$ref: "#/definitions/Error"}
                    },
                    "500": {
                        description: "Unexpected error.",
                        schema: {$ref: "#/definitions/Error"}
                    }
                }
            },
            delete: {
                tags: ["collections"],
                summary: "Deletes a collection by its ID.",
                description: "Deletes a collection by its ID.",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "x-client-token",
                        in: "header",
                        description: "The client token.",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "authorization",
                        in: "header",
                        description: "The user token.",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "id",
                        in: "path",
                        description: "The id of the collection.",
                        required: true,
                        type: "string"
                    }
                ],
                responses: {
                    "200": {
                        description: "Collection deleted.",
                        schema: {$ref: "#/definitions/EntityDeleted"}
                    },
                    "400": {
                        description: "Request validation error.",
                        schema: {$ref: "#/definitions/Error"}
                    },
                    "404": {
                        description: "Collection not found error.",
                        schema: {$ref: "#/definitions/Error"}
                    },
                    "500": {
                        description: "Unexpected error.",
                        schema: {$ref: "#/definitions/Error"}
                    }
                }
            }
        },
        "/collections": {
            post: {
                tags: ["collections"],
                summary: "Create a new entity.",
                description: "Creates a new collection.",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        name: "x-client-token",
                        in: "header",
                        description: "The client token.",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "authorization",
                        in: "header",
                        description: "The user token.",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "collection",
                        in: "body",
                        description: "The collection as json-object valid aginst the collection-schema.",
                        required: true,
                        schema: {$ref: "#/definitions/Collection"}
                    }
                ],
                responses: {
                    "201": {
                        description: "returns the id of the newly created collection",
                        schema: {$ref: "#/definitions/EntityCreated"}
                    },
                    "400": {
                        description: "Request validation error. Submitted collection is propably not valid.",
                        schema: {$ref: "#/definitions/Error"}
                    },
                    "500": {
                        description: "Unexpected error.",
                        schema: {$ref: "#/definitions/Error"}
                    }
                }
            },
            get: {
                tags: ["collections"],
                summary: "list all available collections",
                description: "Returns all collections ids.",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "x-client-token",
                        in: "header",
                        description: "The client token.",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "q",
                        in: "query",
                        description: "the query",
                        required: false,
                        type: "string"
                    },
                    {
                        name: "aggs",
                        in: "query",
                        description: "the aggregations (string<,string><:type>)",
                        required: false,
                        type: "array",
                        items: {type: "string"},
                        collectionFormat: "multi"
                    },
                    {
                        name: "fields",
                        in: "query",
                        description: "the fields to be returned",
                        required: false,
                        type: "array",
                        items: {type: "string"},
                        collectionFormat: "multi"
                    },
                    {
                        name: "offset",
                        in: "query",
                        description: "the offset to start the listing at",
                        required: false,
                        type: "string"
                    },
                    {
                        name: "limit",
                        in: "query",
                        description: "the amount of results to display",
                        required: false,
                        type: "string"
                    },
                    {
                        name: "sort",
                        in: "query",
                        description: "comma separated list fieldname:asc/desc",
                        required: false,
                        type: "string"
                    }
                ],
                responses: {
                    "200": {description: "A list of collections."},
                    "500": {
                        description: "Unexpected error.",
                        schema: {$ref: "#/definitions/Error"}
                    }
                }
            }
        },
        "/images/details/{id}": {
            get: {
                tags: ["images"],
                summary: "Get image details by ID",
                description: "Returns image details",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "x-client-token",
                        in: "header",
                        description: "The client token.",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "id",
                        in: "path",
                        description: "The id of the image.",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "brand",
                        type: "string",
                        in: "query",
                        description: "The brand of the image.",
                        required: true
                    }
                ],
                responses: {
                    "200": {
                        description: "Image details in the body.",
                        schema: {$ref: "#/definitions/ImageDetail"}
                    },
                    "400": {
                        description: "Request validation error.",
                        schema: {$ref: "#/definitions/Error"}
                    },
                    "404": {
                        description: "Image not found error.",
                        schema: {$ref: "#/definitions/Error"}
                    },
                    "500": {
                        description: "Unexpected error.",
                        schema: {$ref: "#/definitions/Error"}
                    }
                }
            }
        },
        "/images/details": {
            get: {
                tags: ["images"],
                summary: "Search for image details",
                description: "Search for image details",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "x-client-token",
                        in: "header",
                        description: "The client token.",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "q",
                        in: "query",
                        description: "the query",
                        required: false,
                        type: "string"
                    },
                    {
                        name: "aggs",
                        in: "query",
                        description: "the aggregations (string<,string><:type>)",
                        required: false,
                        type: "array",
                        items: {type: "string"},
                        collectionFormat: "multi"
                    },
                    {
                        name: "fields",
                        in: "query",
                        description: "the fields to be returned",
                        required: false,
                        type: "array",
                        items: {type: "string"},
                        collectionFormat: "multi"
                    },
                    {
                        name: "offset",
                        in: "query",
                        description: "the offset to start the listing at",
                        required: false,
                        type: "string"
                    },
                    {
                        name: "limit",
                        in: "query",
                        description: "the amount of results to display",
                        required: false,
                        type: "string"
                    },
                    {
                        name: "sort",
                        in: "query",
                        description: "comma separated list fieldname:asc/desc",
                        required: false,
                        type: "string"
                    }
                ],
                responses: {
                    "200": {
                        description: "Image details in the body.",
                        schema: {$ref: "#/definitions/ImageDetail"}
                    },
                    "400": {
                        description: "Request validation error.",
                        schema: {$ref: "#/definitions/Error"}
                    },
                    "404": {
                        description: "Image not found error.",
                        schema: {$ref: "#/definitions/Error"}
                    },
                    "500": {
                        description: "Unexpected error.",
                        schema: {$ref: "#/definitions/Error"}
                    }
                }
            }
        },
        "/images/{id}": {
            delete: {
                tags: ["images"],
                summary: "Deletes an image to given brand",
                description: "Deletes an image file to the given brand",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "x-client-token",
                        in: "header",
                        description: "The client token.",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "authorization",
                        in: "header",
                        description: "The user token.",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "id",
                        in: "path",
                        description: "The id of the image.",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "brand",
                        type: "string",
                        in: "query",
                        description: "The brand of the image.",
                        required: true
                    }
                ],
                responses: {
                    "200": {
                        description: "Image deleted.",
                        schema: {$ref: "#/definitions/EntityDeleted"}
                    },
                    "400": {
                        description: "Request validation error.",
                        schema: {$ref: "#/definitions/Error"}
                    },
                    "404": {
                        description: "Image not found error.",
                        schema: {$ref: "#/definitions/Error"}
                    },
                    "500": {
                        description: "Unexpected error.",
                        schema: {$ref: "#/definitions/Error"}
                    }
                }
            },
            put: {
                tags: ["images"],
                summary: "Put (update only) an image to given brand.",
                description: "Puts an image file to the given brand.",
                consumes: ["multipart/form-data"],
                produces: ["application/json"],
                parameters: [
                    {
                        name: "x-client-token",
                        in: "header",
                        description: "The client token.",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "authorization",
                        in: "header",
                        description: "The user token.",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "id",
                        in: "path",
                        description: "The id of the image.",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "brand",
                        type: "string",
                        in: "formData",
                        description: "The brand of the image.",
                        required: true
                    },
                    {
                        name: "image",
                        in: "formData",
                        description: "The image file.",
                        required: true,
                        type: "file"
                    }
                ],
                responses: {
                    "200": {
                        description: "Successful update of image.",
                        schema: {$ref: "#/definitions/ImageDetailEntityUpdated"}
                    },
                    "400": {
                        description: "Request validation error.",
                        schema: {$ref: "#/definitions/Error"}
                    },
                    "404": {
                        description: "Image not found error.",
                        schema: {$ref: "#/definitions/Error"}
                    },
                    "413": {
                        description: "Image file entity exceeds the maximum size.",
                        schema: {$ref: "#/definitions/Error"}
                    },
                    "415": {
                        description: "Provided image format is not supported.",
                        schema: {$ref: "#/definitions/Error"}
                    },
                    "500": {
                        description: "Unexpected error.",
                        schema: {$ref: "#/definitions/Error"}
                    }
                }
            }
        },
        "/images": {
            post: {
                tags: ["images"],
                summary: "Post an image to given brand.",
                description: "Posts an image file to the given brand.",
                consumes: ["multipart/form-data"],
                produces: ["application/json"],
                parameters: [
                    {
                        name: "x-client-token",
                        in: "header",
                        description: "The client token.",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "authorization",
                        in: "header",
                        description: "The user token.",
                        required: true,
                        type: "string"
                    },
                    {
                        name: "brand",
                        type: "string",
                        in: "formData",
                        description: "The brand of the image.",
                        required: true
                    },
                    {
                        name: "image",
                        in: "formData",
                        description: "The image file.",
                        required: true,
                        type: "file"
                    }
                ],
                responses: {
                    "201": {
                        description: "Successful creation of image.",
                        schema: {$ref: "#/definitions/ImageDetailEntityCreated"}
                    },
                    "400": {
                        description: "Request validation error.",
                        schema: {$ref: "#/definitions/Error"}
                    },
                    "404": {
                        description: "Image not found error.",
                        schema: {$ref: "#/definitions/Error"}
                    },
                    "413": {
                        description: "Image file entity exceeds the maximum size.",
                        schema: {$ref: "#/definitions/Error"}
                    },
                    "415": {
                        description: "Provided image format is not supported.",
                        schema: {$ref: "#/definitions/Error"}
                    },
                    "500": {
                        description: "Unexpected error.",
                        schema: {$ref: "#/definitions/Error"}
                    }
                }
            }
        }
    },
    definitions: {
        Recipe: null,
        Collection: null,
        ImageDetail: null,
        ImageDetailEntityUpdated: null,
        ImageDetailEntityCreated: null,
        EntityCreated: {
            title: "EntityCreated",
            type: "object",
            required: ["id"],
            properties: {
                id: {type: "string"}
            }
        },
        EntityDeleted: {
            title: "EntityDeleted",
            type: "object",
            required: ["result"],
            properties: {
                result: {
                    type: "string",
                    enum: ["DELETED", "DELETED_PERMANENTLY", "ALREADY_DELETED", "NOT_FOUND"]
                }
            }
        },
        Error: {
            title: "Error",
            type: "object",
            required: ["status", "code", "description"],
            properties: {
                status: {
                    type: "integer",
                    format: "int32",
                    minimum: 100,
                    maximum: 600
                },
                code: {
                    type: "integer",
                    format: "int32",
                    minimum: 0
                },
                description: {type: "string"}
            }
        }
    }
};
