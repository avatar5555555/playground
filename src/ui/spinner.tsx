import { th } from 'smooth-ui'

import styled from 'src/styled-components'

export const Spinner = styled.div`
  animation: pulsate 1s ease-out;
  animation-iteration-count: infinite;
  opacity: 0;

  border-width: 2px;
  border-style: solid;
  border-color: ${th('primary')};
  border-radius: 50%;
  height: 40px;
  width: 40px;
  position: relative;
  display: inline-block;
  margin: 20px;
  text-align: center;

  @keyframes pulsate {
    0% {
      transform: scale(0.1, 0.1);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: scale(1.2, 1.2);
      opacity: 0;
    }
  }
`
