import Alert from "./Alert";
import Pagination from "./Pagintaion";
import UserTable from "./Usertable";
import Navbar from "./Navbar";
import AppContext from "@/context/appContext";
import { useContext, useState } from "react";
import { Paginate } from "@/helpers/paginate";
import { Search } from "@/helpers/search";

const Layout = () => {

    const value = useContext(AppContext);

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

    
    return (
        <>
            {/* <!-- Add Modal HTML --> */}
            <div id="addEmployeeModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form action = "#" method = "POST" >
                            <div className="modal-header">						
                                <h4 className="modal-title">Add Employee</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                            <div className="modal-body">					
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" name="username" required />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" name="email" required />
                                </div>				
                            </div>
                            <div className="modal-footer">
                                <input type="button" className="btn btn-default" name="submit" data-dismiss="modal" value="Cancel" />
                                <input type="submit" className="btn btn-success" value="Add" />
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