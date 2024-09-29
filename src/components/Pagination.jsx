/* eslint-disable react/prop-types */
const Pagination = ({totalPosts,postsPerPage,paginate}) => {
    const pageNumbers = [];
    const target = totalPosts/postsPerPage;
    for (let i = 1; i <= Math.ceil(target); i++) {
        pageNumbers.push(i);
    }
  return (
    <div className="flex w-full justify-center items-center m-2">
        {
            pageNumbers.map((number)=> <button onClick={()=>paginate(number)}  className="border rounded-md p-3 flex text-blue-500 justify-center items-center" key={number}>{number}</button>)
        }
      
    </div>
  )
}

export default Pagination
