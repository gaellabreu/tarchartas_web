import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Main from './components/main'
import 'rsuite/lib/styles/themes/default/index.less';
import { Container, Content } from 'rsuite'
import Login from './components/Login';
import Header from './components/Header';

export default () => {
  return <>
    <div className="show-fake-browser navbar-page" style={{ height: '100%' }}>
      <Container style={{ height: '100%' }}>
        <Router>
          <Header />
          <Content>

            <Route exact path={'/'}>
              <Login />
            </Route>

            <Route exact path={'/home'}>
              <Main />
            </Route>

          </Content>
        </Router>
      </Container>
    </div>
  </>
}
