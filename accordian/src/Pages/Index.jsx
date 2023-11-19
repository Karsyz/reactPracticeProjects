import { useState, useEffect } from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'
import axios from 'axios'

const Index = () => {
  const [faqs, setFaqs] = useState([])
  
  async function getFaqs() {
    try {
      const response = await axios.get(`http://localhost:3115/reactPractice/faqs`);
      setFaqs(response.data.data)
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    getFaqs()
  }, [])


  const QuestionAnswerSection = ({ el }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div
        className="flex flex-row justify-between gap-3 bg-white rounded-md p-6"
      >
        <div className='flex flex-col justify-center '>
          <h2 className='font-bold text-xl'>{el.question}</h2>
          {isOpen && <p>{el.answer}</p>}
        </div>       
        
        <button
          className='border-1 rounded-md p-3 bg-slate-300 self-center flex flex-row justify-center items-center'  
          onClick={() => setIsOpen(prev => !prev)}
        >
          {isOpen ? <FaMinus /> : <FaPlus />}
        </button>

      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-screen">
      
        <nav className="h-1/12 w-full flex flex-row justify-center items-center mt-10">
          <h1 className="text-2xl font-bold text-slate-600">Project 2: FAQ/Accordian</h1>
        </nav>

        {/* carousel main */}
        <div className="flex flex-col items-center gap-12 mt-10 drop-shadow-xl w-9/12 h-full bg-blue-700 mb-12 p-10 rounded-2xl">
          <h2 className="text-white text-4xl mt-4 font-semibold">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-4 border-4 border-white w-full h-full rounded-xl p-10">
            {faqs.map((el, ind) => {
              return(
                <QuestionAnswerSection 
                  key={ind}
                  el={el}
                />
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Index