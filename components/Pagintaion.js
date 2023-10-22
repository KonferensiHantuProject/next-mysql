const Pagination = ({userCount, currentPage, pageSize, onPageChange}) => {

	// Total page
	const totalPages = Math.ceil(userCount/pageSize);

	// Checking Total Page
	if(totalPages == 1) return null;

	// Pages
	const pages = Array.from({length: totalPages}, (_, i) => i + 1);

    return (
        <>
			<div className="d-flex justify-content-center align-items-center">
				<ul className="pagination">
					{
						pages.map(page => {
							return (
								<li key={page} className = {`page-item ${page == currentPage ? 'active' : ''}`}><a href="#" className = "page-link" onClick={() => onPageChange(page)}>{page}</a></li>
							)
						})
					}
				</ul>
			</div>
        </>
    );
}
 
export default Pagination;