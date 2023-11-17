import { useEffect, useState } from "react";

const loadImage = (setImDim, imageUrl) => {
  const img = new Image();
  img.src = imageUrl;

  img.onload = () => {
    setImDim({
      height: img.height,
      width: img.width
    });
  };
  img.onerror = (err) => {
    console.log("img error");
    console.error(err);
  };
};

const DynamicImage = (props) => {
  const [imDim, setImDim] = useState({});
  const [objFit, setObjFit] = useState('cover')
  const imageUrl = props.src;

  useEffect(() => {
    loadImage(setImDim, imageUrl);
    setObjFit( imDim.height > props.imgSize.height && imDim.width > props.imgSize.width ? 'cover' : 'fill')
    // console.log(imDim);
  }, [props.imgSize]);

  return (
    <img 
      src={props.src} 
      alt={props.alt} 
      className={`select-none`}
      style={{objectFit: `cover`, width:`${props.imgSize.width}px`, height:`${props.imgSize.height}px`}}
    />
  );
};

export default DynamicImage