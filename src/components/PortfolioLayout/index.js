import React from 'react';
import styled from 'styled-components';
import Welcome from '../windows/programs/welcome';
import CinematicPortfolio from '../CinematicPortfolio';

const LayoutContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  background: #ffffff;
  scroll-behavior: smooth;
  position: relative;
  z-index: 1;
  
  /* Custom Scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #f0f0f0;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #000;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
`;

const PortfolioLayout = () => {
  return (
    <>
      <LayoutContainer>
        <ContentWrapper>
          <Welcome standalone={true}>
            <div id="projects-section">
                <CinematicPortfolio />
            </div>
          </Welcome>
        </ContentWrapper>
      </LayoutContainer>
    </>
  );
};

export default PortfolioLayout;
