const { DataTypes, UUID } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },

    hp:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        min:1,
        max:500,
    }
    },

    attack:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        min:1,
        max:500,
      
    }
    },

    defense:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        min:1,
        max:500,
    }
    },

    special_attack:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        min:1,
        max:500,
    }
    },

    imageBack:{
      type: DataTypes.STRING,
      allowNull: false
    },

    special_defense:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        min:1,
        max:500,
    }
    },

    speed:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        min:1,
        max:500,
    }
    },

    height:{
      type: DataTypes.FLOAT,
      allowNull: false,
      validate:{
        min:1,
        max:500,
    }
    },

    weight:{
      type: DataTypes.FLOAT,
      allowNull: false,
      validate:{
        min:1,
        max:500,
    }
    },

    image:{
      type: DataTypes.STRING,
      allowNull: false
    },
    
    createDB:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  },
  { timestamps: false }
  );
};
