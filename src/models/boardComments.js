module.exports = (sequelize, DataTypes) => {
    const boardComments = sequelize.define('boardComments', {
        // Primary Key
        boardCommentsNo: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        // 내용
        body: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // 작성날짜
        writtenAt: {
            type: DataTypes.DATE,
        },
        // 추천수
        recommendedTime: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    });

    boardComments.associate = (models) => {
        // 작성자
        boardComments.belongsTo(models.users);
        // 댓글이 작성된 게시물
        boardComments.belongsTo(models.boards);
    };

    return boardComments;
};