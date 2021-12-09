const shortId = require("shortid");
module.exports = (sequelize, Sequelize) => {
    
    const Url = sequelize.define("url", {
      uuid: {
        type:Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
		    primaryKey: true
      },  
      full: {
        type: Sequelize.STRING,
        required: true,
        isUrl: true,  
      },
      short: {
        type: Sequelize.STRING,
        required: true,
        defaultValue:shortId.generate
      },
      clicks: {
        type: Sequelize.INTEGER,
        required: true,
        defaultValue:0
      }
    });
  
    return Url;
  };