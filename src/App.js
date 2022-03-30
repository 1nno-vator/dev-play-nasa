import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Lottie from 'react-lottie';
import animationData from './loading-cat.json';

function App() {
  const [data, setData] = useState({});
  const [transalteText, setTranslateText] = useState('');
  const [isLoaded, setLoaded] = useState(false);
  const [loadComplete, setLoadComplete] = useState(false);

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

  useEffect(() => {
    console.log(isLoaded);
  }, [isLoaded])

  const getNasaData = () => {
    axios.get('https://api.nasa.gov/planetary/apod?api_key=Iz75e0naUV7pTGptfpd3QCZZa9DKFdaR8P3JNPgc&count=1')
    .then((response) => {
      return response.data
    })
    .then((res) => {
      const targetText = res[0].explanation;
      const newText = targetText.replaceAll('. ', '.<br/>')
      
      getTranslateText(newText);
      setData({ ...res[0], explanation: newText })
      setLoaded(true);
    })
  }

  const getTranslateText = (origin) => {
    axios.post('http://localhost:3030/node/translate', {
      query: origin
    })
    .then((res) => {
      const resText = res.data.message.result.translatedText;
      const newTranslateText = resText.replaceAll('. ', '.<br/>');
      console.log(newTranslateText)
      setTranslateText(newTranslateText);
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
        style={{ 
          width: '60%', height: '60%',
          display: 'flex',
          justifyContent: 'center',
          padding: '25px',
          backgroundImage: `url(${ isLoaded ? '' : 'https://memegenerator.net/img/instances/38101830/placeholder-an-image-will-be-added-shortly.jpg'})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain' 
        }}
      >
        {
          isLoaded 
          ? <img 
            src={isLoaded ? data.url : ''} 
            onLoad={() => { if(data.url) setLoadComplete(true) }}
            style={{ maxWidth: '100%', maxHeight: '100%' }}
            alt='APOD'
          />
          : null
        }
      </div>
      <div style={{ width: '60%', height: '40%' }}>
        <div style={{ width: '100%', maxHeight: '20%', textAlign: 'center' }}>
            <h3>&lt;{loadComplete ? data.title : 'TITLE...'} &gt;</h3>
        </div>    
        <div style={{ width: '100%', maxHeight: '70%', textAlign: 'center' }}>
          <h5 dangerouslySetInnerHTML={{__html: loadComplete ? (transalteText ? transalteText : data.explanation) : 'EXPLANATION...'}}></h5>
        </div>    
        <div id="google_translate_element" style={{ textAlign: 'center' }}></div>
        <div style={{ textAlign: 'center', margin: '15px' }}>
          <button onClick={() => { getNasaData() }}>RELOAD</button>
        </div>
      </div>
    </div>
  );
}

export default App;
