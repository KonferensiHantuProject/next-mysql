import CheckedContext from "@/context/checkedContext";
import { useContext } from "react";

const User = ({user, handleDelete, setEditUser, checkedAll, setCheckedAll}) => {

    // Checked Context
    const value = useContext(CheckedContext);

    // Getting Specific User
    const fetchUser = async (userId) => {

        const response = await fetch("http://localhost:3000/api/users/"+userId);
        const result = await response.json();

        setEditUser(result);

    }

    // Handling Checked Checkbox
    const handleChangeChecked = ({target}, userId) => {

        const {checked} = target;

        // If Checked All
        if(checkedAll & !checked){
            setCheckedAll(false)
        }
        
        if(checked){
            value.setCheckedUser([...value.checkedUser, userId])
        }else{
            const newCheckedUser = value.checkedUser.filter(user => {
                return user != userId ;
            });
            console.log(newCheckedUser)
            value.setCheckedUser(newCheckedUser);
        }
    }

    return (
        <>
            <tr>
                <input type="hidden" id="userId" name="id" value = "" />
                <td>
                    <span className="custom-checkbox">
                        <input type="checkbox" id="data_checkbox" onChange={(e) => handleChangeChecked(e, user.id)} className="data_checkbox" name="data_checkbox" value="" />
                        <label htmlFor="data_checkbox"></label>
                    </span>
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                    <a href="#editEmployeeModal" onClick={() => fetchUser(user.id)} className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                    <a href="#deleteEmployeeModal" onClick={() => handleDelete(user.id)} className="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                </td>
            </tr>
        </>
    );
}
 
export default User;