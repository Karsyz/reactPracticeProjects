import { useState, useEffect, useRef } from 'react'
import { FaTrash, FaPlusSquare } from 'react-icons/fa'
import axios from 'axios'

const Index = () => {
  const [list, setList] = useState([])
  const [query, setQuery] = useState('')

  const API_URL = 'https://api.github.com'

  //pagination stuff
  const [totalCount, setTotalCount] = useState(0)
  const [pageNum, setPageNum] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [pageCount, setPageCount] = useState(0)
  
  useEffect(()=>{
    setPageCount(Math.floor(totalCount/perPage))
  },[totalCount])
  
const searchUsers = async (page) => {
  const response = await axios.get(`${API_URL}/search/users?q=${query}&page=${page}&per_page=${perPage}`)
  console.log(response.data)
  setList(response.data.items)
  setTotalCount(response.data.total_count)
  setPageNum(page)
}

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full">
      
        <nav className="h-1/12 w-full flex flex-row justify-center items-center mt-10">
          <h1 className="text-2xl font-bold text-slate-600">Project 5: GitHub User Search</h1>
        </nav>

        {/* carousel main */}
        <div className="flex flex-col items-center gap-12 mt-10 drop-shadow-xl w-9/12 h-full bg-[#d1c44f] mb-12 p-10 rounded-2xl">
          <h2 className="text-white text-4xl mt-4 font-semibold">GitHub User Search</h2>
          <div className="flex flex-col gap-4 border-4 border-white w-full h-full rounded-xl p-10">

          <div className='w-full flex flex-row gap-6 mb-4 drop-shadow-lg'>
            <input 
              type="text" 
              className='rounded-lg grid px-6 py-3 font-semibold w-full bg-slate-200'
              placeholder='Add something to the list'
              value={query}
              onChange={(evt) => setQuery(evt.target.value)}
            />
            <button 
              className="bg-yellow-600 h-full text-xl px-3 my-auto py-3 rounded-md font-semibold"
              onClick={()=> searchUsers(1)}
            >
              Search
            </button>
          </div>

            <ul className="flex flex-col gap-4 ">
              {list.map((el, ind) => {
                return(

                  <a 
                    href={el.html_url}
                    target="_blanK"
                    rel="noopener noreferrer"
                  >
                    <li
                      key={ind}
                      el={el}
                      className='flex flex-row gap-6 bg-white rounded-lg font-semibold h-[150px]'
                    >
                      <img 
                        src={el.avatar_url} 
                        alt={`${el.login}'s avatar`}
                        className='h-full rounded-tl-md rounded-bl-md aspect-square'
                      />

                      <h2 className='text-2xl font-bold self-center'>
                        {el.login.slice(0,1).toUpperCase() + el.login.slice(1)}
                      </h2>

                    </li> 
                  </a>
                )
              })}

            </ul>


            {/* Pages */}
            {/* create a list of links to click on
                creates a new search that will get the next page from the api
                '2' button will get page two of 11-20
                create page navigation controls start prev next end
            */}

            <div className="flex flex-row gap-2 justify-between items-center font-semibold">
              <ul className="flex flex-row gap-2 justify-between items-center font-semibold">
                <li
                  className='bg-white rounded-lg p-2'
                  onClick={()=> searchUsers(1)}
                >
                  Start
                </li>
                <li
                  className='bg-white rounded-lg p-2'
                  onClick={()=> pageNum > 1 && searchUsers(pageNum - 1)}
                >
                  Prev
                </li>
                <li
                  className='bg-white rounded-lg p-2'
                  onClick={()=> pageNum !== pageCount && searchUsers(pageNum + 1)}
                >
                  Next
                </li>
                <li
                  className='bg-white rounded-lg p-2'
                  onClick={()=> searchUsers(pageCount)}
                >
                  End
                </li>
              </ul>

              <span>Page {pageNum} of {Math.floor(totalCount/perPage)} pages</span>
              
            </div>    



          </div>
        </div>
      </div>
    </>
  )
}

export default Index