"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize = new sequelize_typescript_1.Sequelize({
    database: 'ticket',
    dialect: 'mysql',
    username: 'root',
    password: '',
    models: [__dirname + '/models'],
});
sequelize.sync({ force: false });
exports.default = sequelize;
//# sourceMappingURL=db.js.map