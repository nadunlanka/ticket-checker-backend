import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  host: "ls-7735bb298beaa3e18908d34fc333915dc1ee6527.caeujlcqgxxe.ap-southeast-1.rds.amazonaws.com",
  database: 'ticket',
  dialect: 'mysql',
  username: 'root',
  password: 'Asd!!#123',
  models: [__dirname + '/models'],
});

sequelize.sync({ force: false });

export default sequelize;