import { useState, useEffect, useRef } from 'react'
import { FaTrash, FaPlusSquare } from 'react-icons/fa'
import axios from 'axios'

const Index = () => {
  const [list, setList] = useState([])
  const [input, setInput] = useState('')
  const [blankItems, setBlankItems] = useState(0)

  const isMounted = useRef(false);

  useEffect(()=> {
    const storedList = JSON.parse(localStorage.getItem('items'))
    if(storedList) setList(storedList)
  },[])

  useEffect(() => {
    // don't store on initial render
    if (isMounted.current) {
      localStorage.setItem('items', JSON.stringify(list));
    } else {
      isMounted.current = true;
    }
  }, [list]);


  useEffect(()=> {
    const storedBlanksList = JSON.parse(localStorage.getItem('blanks'))
    if(storedBlanksList) setBlankItems(storedBlanksList)
  },[])

  useEffect(() => {
    // don't store on initial render
    if (isMounted.current) {
      localStorage.setItem('blanks', JSON.stringify(blankItems));
    } else {
      isMounted.current = true;
    }
  }, [blankItems]);

  const crossOffList = (evt) => {
    evt.target.classList.toggle('line-through')
  }

  const deleteFromList = (ind) => {
    setList(prev => prev.filter((el, index) => index !== ind ) )
  }

  const addToList = () => {
    if(!input) setBlankItems(prev => prev + 1)
    setList(prev => [...prev, input ? input : `You've added a blank item ${blankItems} times.`])
    setInput('')
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-screen">
      
        <nav className="h-1/12 w-full flex flex-row justify-center items-center mt-10">
          <h1 className="text-2xl font-bold text-slate-600">Project 4: Shopping List</h1>
        </nav>

        {/* carousel main */}
        <div className="flex flex-col items-center gap-12 mt-10 drop-shadow-xl w-9/12 h-full bg-[#123123] mb-12 p-10 rounded-2xl">
          <h2 className="text-white text-4xl mt-4 font-semibold">Shopping List</h2>
          <div className="flex flex-col gap-4 border-4 border-white w-full h-full rounded-xl p-10">

          <div className='w-full flex flex-row gap-6 mb-4'>
            <input 
              type="text" 
              className='rounded-lg grid px-6 py-3 font-semibold w-full bg-slate-200'
              placeholder='Add something to the list'
              value={input}
              onChange={(evt) => setInput(evt.target.value)}
            />
            <FaPlusSquare                      
              className="text-yellow-600 h-full text-5xl "
              onClick={addToList} 
            />
          </div>

            <ul className="flex flex-col gap-4 ">
              {list.map((el, ind) => {
                return(
                  <li
                    key={ind}
                    el={el}
                    className='flex flex-row justify-between items-center bg-white p-3 rounded-lg px-6 font-semibold'
                    onClick={crossOffList}
                  >
                    {el}
                    <FaTrash 
                      className="text-red-500"
                      onClick={() => deleteFromList(ind)} 
                    />
                  </li> 
                )
              })}

            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index