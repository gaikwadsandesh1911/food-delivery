import './pagination.css'
// eslint-disable-next-line react/prop-types
const Pagination = ({currentPage, totalPages, onPageChange}) => {
  console.log('currentPage', currentPage, "totalpages", totalPages, "onpagechange",onPageChange)
  const pageNumbers = [];
  
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {
       pageNumbers.map((number)=>(
        <button key={number} onClick={()=>onPageChange(number)}
          className={currentPage === number ? 'active' : ''}
        >
          {number}
        </button>
       ))
      }
    </div>
  )
}

export default Pagination