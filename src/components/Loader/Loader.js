import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

const ContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Message = styled.span`
  font-size: 16px;
  color: '#2d2d2d';
  font-weight: bolder;
`;

const Loader = ({ type, color, message }) => {
  return (
    <div>
      <ContainerBox>
        <ReactLoading type={type} color={color} height={'30%'} width={'30%'} />
        <Message>{message}</Message>
      </ContainerBox>
    </div>
  );
};

export default Loader;
