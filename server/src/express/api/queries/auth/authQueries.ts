export const selectUserQuery = (id: number) =>
    `SELECT * FROM user WHERE id = '${id}'`
export const selectAllUsersQuery = () => `SELECT * FROM user`
