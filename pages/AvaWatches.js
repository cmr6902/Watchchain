

import React, { useState, useEffect } from 'react';
import { useStateContext } from '@/context/StateContext';
import Navbar from '@/components/Dashboard/Navbar';
import styled from 'styled-components';


const AvailableWatches = () => {
  return(
    <Watches>
      <Navbar />
      <Title>Still being designed figuring out how to list watches and the style of that(have to get backend working first before I figure that out)</Title>
    </Watches>
  );
};

const Watches = styled.section`
  text-align: center;
  padding: 100px 20px;
  width: 100%;
  height: 100%;
  background: red;
`;
const Title = styled.section`
  color: black;
  top-padding: 100px;
`;


export default AvailableWatches;
