import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  database: 'ticket',
  dialect: 'mysql',
  username: 'root',
  password: '',
  models: [__dirname + '/models'],
});

sequelize.sync({ force: false });

export default sequelize;