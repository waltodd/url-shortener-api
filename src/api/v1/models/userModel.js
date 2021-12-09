module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      uuid: {
        type:Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
		    primaryKey: true
      },  
      name: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        isEmail: true, 
      },
      password: {
        type: Sequelize.STRING
      },
    });
  
    return User;
  };