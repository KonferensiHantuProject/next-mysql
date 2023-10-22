import User from "./User";

const UserTable = ({users, handleDelete, setEditUser}) => {

	// Generating User
	const userGenerator = () => {
		return (
			<>
				{
					users.map(user => {
						return (
							<User key={user.id} user={user} setEditUser={setEditUser} handleDelete={handleDelete}></User>
						)
					})
				}
			</>
		)
	}

    return (
        <>
            <table className="table table-striped table-hover">
				<thead>
					<tr>
						<th>
							<span className="custom-checkbox">
								<input type="checkbox" id="selectAll" />
								<label htmlFor="selectAll"></label>
							</span>
						</th>
						<th>Name</th>
						<th>Email</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{userGenerator()}
				</tbody>
			</table>
        </>
    );
}
 
export default UserTable;