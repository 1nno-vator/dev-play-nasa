import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  max-height: 800px;
  justify-contents: center;
  align-items: center;
  flex-direction: column;
  padding: 30px;

  img {
    display: block;
    max-width: 800px;
  }
`

function App() {
  const [data, setData] = useState({});
  
  useEffect(() => {

    axios.get('https://api.nasa.gov/planetary/apod?api_key=Iz75e0naUV7pTGptfpd3QCZZa9DKFdaR8P3JNPgc&count=1')
    .then((response) => {
      return response.data;
    }).then((res) => {
      console.log(res[0]);
      setData(res[0]);
    })

  }, [])
  
  
  return (
    <Container>
      <img alt="image" src={data.hdurl}/>
      <h4>Title</h4>
      <h1>{data.title}</h1>
      <h3>Explanation</h3>
      <p style={{ fontSize: '12px' }}>{data.explanation}</p>
    </Container>
  );
}

export default App;
