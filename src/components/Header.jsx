import React from 'react'
import { useLocation } from 'react-router-dom'
import { Header, Navbar, Nav, Icon } from 'rsuite'

export default () => {
    
    const location = useLocation()

    return location?.pathname === '/'? <></> : <Header>
    <Navbar appearance="inverse">
      <Navbar.Header>
        {/* <Button type={'link'} className="navbar-brand logo">Tachartas</Button> */}
      </Navbar.Header>
      <Navbar.Body>
        <Nav>
          <Nav.Item icon={<Icon icon={'twinkle-star'} />}>Home</Nav.Item>
        </Nav>
        <Nav pullRight>
          <Nav.Item icon={<Icon icon="user" />}>gabreu</Nav.Item>
        </Nav>
      </Navbar.Body>
    </Navbar>
  </Header>
}