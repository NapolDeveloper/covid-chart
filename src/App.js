import { Fragment } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// styles
import GlobalStyle from './styles/GlobalStyle';
import * as Fade from './styles/FadeIn';

// components
import Header from './components/Header/Header';
import Main from './components/Main/Main';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <GlobalStyle />
        <Container>
          <Header />
          <Switch>
            <Fade.FadeAnimation>
              <Route exact path='/' render={() => <Main />} />
            </Fade.FadeAnimation>
          </Switch>
        </Container>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
