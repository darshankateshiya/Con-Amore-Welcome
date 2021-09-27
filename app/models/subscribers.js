module.exports = function(sequelize, Sequelize) {
 
    var Subscribers = sequelize.define('subscribers', {
 
        subscribers_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.BIGINT
        },

        subscribers_name:{
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        subscribers_email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },


        subscribers_status: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            defaultValue: '1',
        },
        
 
        status: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            defaultValue: 'Active'
        },
        // Timestamps
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    },{
        freezeTableName: true,
    });
 
    return Subscribers;
 
}