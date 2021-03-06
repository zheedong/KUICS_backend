module.exports = (sequelize, DataTypes) => {
    const Intros = sequelize.define('intros', {
        // Primary Key
        introNo: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
        },
        content: {
            type: DataTypes.ARRAY(DataTypes.STRING),
        },
    });

    return Intros;
};
