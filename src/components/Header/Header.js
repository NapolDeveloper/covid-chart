import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const primaryColor = '#2d2d2d';
const secondColor = '#da7f8f';

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100px;
  background: #e1e5ea;
  padding: 10px 20px;
  margin-bottom: 50px;
`;

const Logo = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: ${primaryColor};
  text-transform: uppercase;
`;

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const Menu = styled.span`
  position: relative;
  font-size: 18px;
  font-weight: bold;
  color: ${primaryColor};
  margin: 0 10px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    color: ${secondColor};
    &:before {
      width: 100%;
    }
  }
  &:before {
    content: '';
    position: absolute;
    background-color: ${secondColor};
    height: 2px;
    width: 0;
    bottom: -5px;
    transition: 0.3s;
    left: 0;
  }

  /* 모바일 */
  @media all and (max-width: 767px) {
    color: blue;
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <Logo>COVID - 19</Logo>
      <MenuWrapper>
        <Link to={'/'}>
          <Menu>Home</Menu>
        </Link>
        <Link to={'/test'}>
          <Menu>Test</Menu>
        </Link>
        <Menu>test</Menu>
        <Menu>test</Menu>
      </MenuWrapper>
    </HeaderWrapper>
  );
};

export default Header;
