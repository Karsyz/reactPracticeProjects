import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { GoDot, GoDotFill } from "react-icons/go"
import { useState, useEffect } from 'react'
import DynamicImage from '../Components/DynamicImage'


const images = [
  {src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXL6znEUclc_25-NyPi8pzSfMF0Em9d_b6cQ&usqp=CAU', alt:'tree' },
  {src:'https://www.airdancers.ca/cdn/shop/products/Cloudbusters52.jpg?v=1417989925', alt:'ballons' },
  {src:'https://files.worldwildlife.org/wwfcmsprod/images/Brown_Bear_/story_full_width/3box0qwlkk_brownbear_hero.jpg', alt:'bear' },
  {src:'https://i.natgeofe.com/k/cd784533-e5ef-439a-8167-2ba61b0a9a4b/wave_16x9.jpg?w=1200', alt:'sea' },
  {src:'https://beta.ctvnews.ca/national/sci-tech/2021/5/26/1_5443654/_jcr_content/root/responsivegrid/image.coreimg.jpeg/1622054687281/1-5443674.jpeg', alt:'birds' },
]

const imageSize = {
  height: 300,
  width: 500,
}

const Index = () => {

  const [position, setPosition] = useState(0)

  // useEffect(()=>{
  //   console.log(position)
  // },[position])

  return (
    <>
      <div>
        
        <nav className="h-1/12 w-full flex flex-row justify-center items-center mt-10">
          <h1 className="text-4xl font-bold text-slate-600">Project 1: Carousel</h1>
        </nav>

        {/* carousel main */}
        <div className="flex flex-row justify-center items-center gap-12 mt-10 drop-shadow-xl">
          
          <div className="w-1/12">
            {position > 0 && 
              <FaArrowLeft 
              className="text-5xl text-slate-600" 
              onClick={() => setPosition(position - imageSize.width)}
              />
            }
          </div>

          {/* image container */}
          <div 
            className={`overflow-hidden rounded-2xl`}
            style={{width:`${imageSize.width}px`, height:`${imageSize.height}px`}}
          >

            {/* image strip */}
            <div 
              className={`relative flex flex-row justify-start w-[100000px] transition duration-300 ease-in`}
              style={{transform: `translateX(${-position}px)`}}
              >
              {images.map((image, ind) => {
                return(
                  // changes the object fill based on image size vs container size
                  <DynamicImage 
                    key={ind}
                    src={image.src}
                    alt={image.alt}
                    imgSize={imageSize}
                  />
                )
              })}
            </div>

          </div>

          <div className="w-1/12">
            {position < (imageSize.width * (images.length - 1)) && 
              <FaArrowRight 
                className="text-5xl text-slate-600" 
                onClick={() => setPosition(position + imageSize.width)}
              />
            }
          </div>
        </div>
      </div>
      
      {/* image dots */}
      <div className="text-slate-700 text-3xl flex flex-row justify-center mt-4 gap-2">
        {images.map((img, ind) => {
          return (
            
            (ind * imageSize.width) === position ? 
            <GoDotFill 
              key={ind}
              onClick={() => setPosition(ind * imageSize.width)}
            /> 
            : 
            <GoDot 
              key={ind}
              onClick={() => setPosition(ind * imageSize.width)}
            />
            
          )
        })}
        {/* Add automatic scroll and off/off switch for it */}
      </div>




    </>
  )
}

export default Index