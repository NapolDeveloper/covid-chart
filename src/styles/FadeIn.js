import styled, { keyframes } from 'styled-components';

export const FadeIn = keyframes`
from
{
  opacity: 0;
}
to{
  opacity: 1;
}
`;
export const FadeAnimation = styled.div`
  animation: ${FadeIn} 2s;
`;
