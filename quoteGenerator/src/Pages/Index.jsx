import { useState, useEffect } from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'
import axios from 'axios'

const Index = () => {
  const [quotes, setQuotes] = useState([])
  const [randQuote, setRandQuote] = useState({text:'They who sleeps with itchy bum wakes up with smelly thumb.', author:'Confucius'})
  
  async function getQuotes() {
    try {
      const response = await axios.get(`https://type.fit/api/quotes`);
      setQuotes(response.data)
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    getQuotes()
  }, [])

  const getRandomQuote = () => {
    const randNum = Math.floor( Math.random() * quotes.length )
    const randQuote = quotes[randNum]
    const saniRandQuote = { 
      text: randQuote.text, 
      author: sanitizeAuthor(randQuote.author)
    }
    setRandQuote( saniRandQuote  )
  }

  const sanitizeAuthor = (str) => {
    // remove ', type.fit' from author
    const saniArr = str.split(', type.fit')[0]
    return saniArr !== 'type.fit' ? saniArr : 'Unknown'
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-screen">
      
        <nav className="h-1/12 w-full flex flex-row justify-center items-center mt-10">
          <h1 className="text-2xl font-bold text-slate-600">Project 3: Quote Generator</h1>
        </nav>

        {/* carousel main */}
        <div className="flex flex-col items-center gap-12 mt-10 drop-shadow-xl w-9/12 h-full bg-blue-700 mb-12 p-10 rounded-2xl">
          <h2 className="text-white text-4xl mt-4 font-semibold">Quote Generator</h2>
          <div className="flex flex-col justify-center items-center gap-4 border-4 border-white w-full h-full rounded-xl p-10">
            <div className="flex flex-col justify-center items-center gap-4 w-10/12 p-8 bg-white rounded-2xl drop-shadow-2xl border-4 border-gray-300">
              <p className='text-xl mx-8 font-semibold'>{randQuote.text}</p>
              <p className='px-2 font-semibold'>- {randQuote.author}</p>
              <button 
                className='bg-slate-300 w-fit p-3 rounded-md font-semibold drop-shadow-lg mt-10'
                onClick={getRandomQuote}
              >
                New Quote
              </button>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index