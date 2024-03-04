'use strict';

module.exports = {
    "plugins": [],
    "recurseDepth": 10,
    "source": {
        "include": ["./dist"],
        "includePattern": ".+\\.js(doc|x)?$",
        "excludePattern": "(^|\\/|\\\\)_"
    },
    "sourceType": "module",
    "tags": {
        "allowUnknownTags": true,
        "dictionaries": ["jsdoc", "closure"]
    },
    "templates": {
        "cleverLinks": false,
        "monospaceLinks": false
    },
    "opts": {
        "encoding": "utf8",
        "destination": "./docs/jsdoc/",
        "recurse": true
    }
};
