import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Lottie from 'react-lottie';
import animationData from './loading-cat.json';

function App() {
  const [data, setData] = useState({});
  const [isLoaded, setLoaded] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  
  useEffect(() => {
    getNasaData()
  }, [])

  const getNasaData = () => {
    axios.get('https://api.nasa.gov/planetary/apod?api_key=Iz75e0naUV7pTGptfpd3QCZZa9DKFdaR8P3JNPgc&count=1')
    .then((response) => {
      return response.data
    })
    .then((res) => {
      
      console.log(res);
      const targetText = res[0].explanation;
      const newText = targetText.replaceAll('. ', '.<br/>')
      console.log(newText);
      
      setData({ ...res[0], explanation: newText })
    })
    .then(() => {
      setTimeout(() => {
        setLoaded(true)
      }, 2000)
    })
  }

  const LottieStyle = {
    display: isLoaded ? 'none' : 'block'
  }

  const NasaApodDisplayStyle = {
    visibility: !isLoaded ? 'hidden' : 'visible',
    textAlign: 'center',
    margin: '0 auto'
  }
  
  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'  }}>
      <div 
        style={{ width: '60%', height: '60%',
        backgroundImage: `url(${ isLoaded ? data.url : 'https://memegenerator.net/img/instances/38101830/placeholder-an-image-will-be-added-shortly.jpg'})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain' 
        }}>
      </div>
      <div style={{ width: '60%', height: '40%' }}>
        <div style={{ width: '100%', height: '20%', textAlign: 'center' }}>
            <h1>{isLoaded ? data.title : 'TITLE...'}</h1>
        </div>    
        <div style={{ width: '100%', height: '70%', textAlign: 'center' }}>
          <h6 dangerouslySetInnerHTML={{__html: isLoaded ? data.explanation : 'EXPLANATION...'}}></h6>
        </div>    
      </div>
    </div>
  );
}

export default App;
