'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Users", deps: []
 * createTable "Lists", deps: [Users]
 * createTable "Items", deps: [Users]
 * addIndex ["email"] to table "Users"
 * addIndex ["userId"] to table "Lists"
 * addIndex ["userId","listId"] to table "Items"
 *
 **/

var info = {
    "revision": 1,
    "name": "20181105083425-initial",
    "created": "2018-11-05T11:22:33.579Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Users",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "email": {
                    "type": Sequelize.TEXT
                },
                "name": {
                    "type": Sequelize.TEXT
                },
                "salt": {
                    "type": Sequelize.TEXT
                },
                "password": {
                    "type": Sequelize.TEXT
                },
                "active": {
                    "type": Sequelize.BOOLEAN
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Lists",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "data": {
                    "type": Sequelize.TEXT
                },
                "updatedAt": {
                    "type": Sequelize.TIME
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "userId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Items",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "listId": {
                    "type": Sequelize.TEXT
                },
                "data": {
                    "type": Sequelize.TEXT
                },
                "updatedAt": {
                    "type": Sequelize.TIME
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "userId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "addIndex",
        params: [
            "Users",
            ["email"],
            {
                "indicesType": "UNIQUE"
            }
        ]
    },
    {
        fn: "addIndex",
        params: [
            "Lists",
            ["userId"],
            {}
        ]
    },
    {
        fn: "addIndex",
        params: [
            "Items",
            ["userId", "listId"],
            {
                "indicesType": "UNIQUE"
            }
        ]
    },
    {
        fn: "addIndex",
        params: [
            "Items",
            ["userId"],
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
