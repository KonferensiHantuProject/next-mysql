import { useContext } from "react";
import AppContext from "@/context/appContext";
import CheckedContext from "@/context/checkedContext";

const Navbar = ({searchQuery, setSearchQuery, setAlertMessage}) => {

	const value = useContext(AppContext);
	const CheckedContextData = useContext(CheckedContext);
	
	// List of Checked ID
	const checkedIds = CheckedContextData.checkedUser;

	// Multi Delete
	async function handleMultiDelete(e){

		e.preventDefault();

		const reqOption = {
			headers: {"Content-Type": "application/json"},
			method: "DELETE",
			body: JSON.stringify({ids: checkedIds})
		}

		const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users/deleteMulti`, reqOption);
		const result = await response.json();

		if("ids" in result){
			setAlertMessage("Multi User Deleted");

			const newUsers = value.users.filter(user => {
				return result.ids.indexOf(user.id) != -1;
			});

			value.setMyUser(newUsers);
		}
	}

    return (
        <>
            <div className="table-title">
				<div className="row">
					<div className="col-sm-6">
						<h2>NextJS-MySQL <b>CRUD</b></h2>
					</div>
					<div className="col-sm-6">
						<a href="#addEmployeeModal" className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Employee</span></a>
						<a href="#" className="delete_all_data btn btn-danger" onClick={async (e) => await handleMultiDelete(e)}><i className="material-icons">&#xE15C;</i> <span>Delete</span></a>						
						<input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type = "text" className = "form-control" style = {{ width : "200px",float : "right", height :"34px" }} name = "search_user" placeholder = "Search a username..." />
					</div>
				</div>
			</div>
        </>
    );
}
 
export default Navbar;