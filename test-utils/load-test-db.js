'use strict';

const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const path = require('path');
const knexfile = require('../knexfile');

/**
 * @returns {string}
 */
module.exports = function () {
    if (!knexfile.test) {
        const testDatabase = path.normalize(`${fs.mkdtempSync(`${os.tmpdir()}/test-database-`)}/test-database.sqlite3`);
        fs.copyFileSync(knexfile.development.connection.filename, testDatabase);
        knexfile.test = _.cloneDeep(knexfile.development);
        knexfile.test.connection.filename = testDatabase;
        console.log('Init new test database:', testDatabase);
    }
};