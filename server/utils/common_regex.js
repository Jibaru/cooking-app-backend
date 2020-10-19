/// This file contains common regex used to validate

// Validate a XXXX/YYYYY MIME type
const mimeTypeRegex = /\w+\/[-+.\w]+/;
const dateRegex = /^\d{2}([./-])\d{2}\1\d{4}$/;

module.exports = {
    mimeTypeRegex,
    dateRegex
};