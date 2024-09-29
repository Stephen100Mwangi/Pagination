import { useState } from 'react';
import { useEffect } from 'react'
import toast, {Toaster} from 'react-hot-toast'
import Pagination from './components/Pagination';

const App = () => {

  const [loading,setLoading] = useState(false);
  const [posts,setPosts] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  useEffect(()=>{
    async function fetchPosts(){
      try {
        setLoading(true)
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!response.ok) {
          toast.error("Failed to fetch posts")
        }

        setLoading(false)
        const availablePosts = await response.json();
        setPosts(availablePosts);
      
    } catch (error) {
      setLoading(false)
      console.log(error.message);
      toast.error("Error fetching posts") 
      return;     
    }finally{
      setLoading(false)
    }

    }

    fetchPosts();
   
  },[])


  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost,indexOfLastPost);

  const paginate = (pageNumber)=> setCurrentPage(pageNumber);  

  return (
    <div className='flex flex-col gap-y-10 items-center justify-center'>
      <Toaster position='top-left'></Toaster>
      <h1 className='font-bold text-2xl text-center mx-auto m-1'>Pagination</h1>
      {
        loading && <div className='bg-blue-600 w-fit mx-auto m-12 text-white text-center p-3'>Fetching posts....</div>
      }
      <div className='flex flex-wrap gap-5 p-1 justify-evenly items-center'>
        {
          currentPosts.map((eachPost)=> <div className='shadow-xl rounded-xl bg-black bg-opacity-5 w-80 h-56 p-3'  key={eachPost.id}>
            <small>{eachPost.id}</small>
            <h3 className='font-medium text-base'>{eachPost.title}</h3>
            <p className='text-sm font-light'>{eachPost.body}</p>
          </div>)
        }
      </div>

      <Pagination totalPosts={posts.length} postsPerPage={postsPerPage} paginate={paginate}></Pagination>
      
    </div>
  )
}

export default App
