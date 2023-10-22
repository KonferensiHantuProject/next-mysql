import Alert from "./Alert";
import Pagination from "./Pagintaion";
import UserTable from "./Usertable";
import Navbar from "./Navbar";
import AppContext from "@/context/appContext";
import { useContext, useState } from "react";
import { Paginate } from "@/helpers/paginate";
import { Search } from "@/helpers/search";
import handler from "@/pages/api/hello";

const Layout = () => {

    const value = useContext(AppContext);

    // Save Data
    const [saveUser, setSaveUser] = useState({
        username: "",
        email: ""
    })

    // Search
    const [searchQuery, setSearchQuery] = useState("");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3;

    // Set Current Page
    const onPageChange = (page) => {
        setCurrentPage(page);
    }

    // Find Data
    let searchdResult;
    let paginatedUsers;

    // Conditional
    if(searchQuery.length > 0){
        searchdResult = Search(value.users, searchQuery);
        paginatedUsers = Paginate(searchdResult, currentPage, pageSize);
    }else{
        // Pagination
        paginatedUsers = Paginate(value.users, currentPage, pageSize);
    }

    // Save Change
    const handleSaveChange = ({target: {name, value}}) => {
        setSaveUser({...saveUser, [name]: value})
    }

    // Submit Form
    const handleAddSubmit = async (e) => {
        e.preventDefault();

        // Set Method
        const reqOption = {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(saveUser)
        }

        const response = await fetch("http://localhost:3000/api/users/", reqOption);
        const result = await response.json();

        // Result
        if(result){
            document.getElementsByClassName("addCancel")[0].click();
            const prevUser = value.users;
            prevUser.push(result);

            value.setMyUser(prevUser);
        }
    }

    return (
        <>
            {/* <!-- Add Modal HTML --> */}
            <div id="addEmployeeModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={handleAddSubmit}>
                            <div className="modal-header">						
                                <h4 className="modal-title">Add Employee</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                            <div className="modal-body">					
                                <div className="form-group">
                                    <label>Name</label>
                                    <input value={saveUser.username} onChange={handleSaveChange} type="text" className="form-control" name="username" required />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input value={saveUser.email} onChange={handleSaveChange} type="email" className="form-control" name="email" required />
                                </div>				
                            </div>
                            <div className="modal-footer">
                                <input type="button" className="btn btn-default addCancel" name="submit" data-dismiss="modal" value="Cancel" />
                                <input type="submit" className="btn btn-success bg-green-500" value="Add" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* <!-- Edit Modal HTML --> */}
            <div id="editEmployeeModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form action = "#" method = "POST">
                            <div className="modal-header">						
                                <h4 className="modal-title">Edit Employee</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                            <div className="modal-body">
                                <input type="hidden" name="updateId" className = "updateId" />					
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control updateUsername" name = "username" required />
                                </div>
                                <div className="form-group">
                                    <label>password</label>
                                    <input type="text" className="form-control updatePassword" name = "password"  required />
                                </div>			
                            </div>
                            <div className="modal-footer">
                                <input type="button" name = "submit" className="btn btn-default" data-dismiss="modal" value="Cancel" />
                                <input type="submit" className="btn btn-info" value="Save" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="container-xl">
	            <div className="table-responsive d-flex flex-column">
                    <Alert></Alert>
                    <div className="table-wrapper">
                        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery}></Navbar>
                        <UserTable users={paginatedUsers}></UserTable>
                        <Pagination userCount={searchQuery.length > 0 ? searchdResult.length : value.users.length} currentPage={currentPage} pageSize={pageSize} onPageChange={onPageChange}></Pagination>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Layout;