import { useState, useContext } from "react";
import CheckedContext from "@/context/checkedContext";
import User from "./User";

const UserTable = ({users, handleDelete, setEditUser}) => {

	const [checkedAll, setCheckedAll] = useState(false)

	// Value
	const value = useContext(CheckedContext);

	// Handle Select All
	const handleSelectAllChange = (e) => {

		const {checked} = e.target;

		let checkedAllUser;

		// Checkboxes 
		const checkboxes = document.querySelectorAll("table tbody input[type='checkbox']");

		// If Checked
		if(checked){
			setCheckedAll(true);

			checkboxes.forEach(checkbox => {
				checkbox.checked = true; 
			})

			checkedAllUser = [];

			// Adding To Array
			users.map(user => {
				checkedAllUser.push(user.id)
			});

		}else{
			setCheckedAll(true);

			// Turn Of CheckBox
			checkboxes.forEach(checkbox => {
				checkbox.checked = false; 
			})

			// Empty Array
			checkedAllUser = [];
		}

		value.setCheckedUser(checkedAllUser);
	}

	// Generating User
	const userGenerator = () => {
		return (
			<>
				{
					users.map(user => {
						return (
							<User setCheckedAll={setCheckedAll} checkedAll={checkedAll} key={user.id} user={user} setEditUser={setEditUser} handleDelete={handleDelete}></User>
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
								<input type="checkbox" id="selectAll" onChange={(e) => handleSelectAllChange(e)} value={checkedAll} />
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