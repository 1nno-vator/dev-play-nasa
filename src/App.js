import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Lottie from 'react-lottie';
import animationData from './loading-cat.json';

const Container = styled.div`
  display: flex;
  height: 90%;
  justify-contents: center;
  align-items: center;
  flex-direction: column;
  padding: 30px;
`

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
    .then((response) => response.data)
    .then((res) => setData(res[0]))
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
    <Container>
      {
        !isLoaded
          ? <Lottie 
            options={defaultOptions}
            height={600}
            width={600}
            style={LottieStyle}
          />
          : 
          <NasaApod
            style={NasaApodDisplayStyle}
            title={data.title}
            url={data.url}
            explanation={data.explanation}
          />
      }
        <button style={{ marginTop: '15px' } }onClick={() => { setLoaded(false); getNasaData() }}>RELOAD</button>
    </Container>
  );
}

function NasaApod(props) {
  
  return (
    <div style={props.style}>
      <img alt="image" src={props.url} style={{ display: 'block', maxWidth: '600px', background: 'grey', margin: '0 auto' }}/>
      <h1>{props.title}</h1>
      <h3>Explanation</h3>
      <p style={{ width: '60%', fontSize: '12px', margin: '0 auto' }}>{props.explanation}</p>
    </div>
  )
}

export default App;
