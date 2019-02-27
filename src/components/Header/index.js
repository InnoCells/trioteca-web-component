import React from 'react';
import { Jumbotron, Container } from 'reactstrap';

const Header = ({title, subTitle}) => <Jumbotron fluid>
        <Container fluid>
          <h2>{title}</h2>
          {subTitle ? <p>{subTitle}</p> : null}
        </Container>
      </Jumbotron>;

export default Header;