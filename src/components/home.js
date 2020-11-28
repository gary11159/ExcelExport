import React, { Fragment } from 'react';
import ErrorSound from '../public/error.mp3';
import A_mode from './A_mode';
import B_mode from './B_mode';
import C_mode from './C_mode';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container';

function Home() {
    const [key, setKey] = React.useState('a_mode');

    return (
        <Fragment>
            <audio id="myAudio">
                <source src={ErrorSound} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <Container>
                <Tabs className="homeTab" onSelect={(k) => setKey(k)}>
                    <Tab eventKey="a_mode" title="A模式">
                        <A_mode curTab={key}/>
                    </Tab>
                    <Tab eventKey="b_mode" title="B模式">
                        <B_mode curTab={key}/>
                    </Tab>
                    <Tab eventKey="c_mode" title="C模式">
                        <C_mode curTab={key}/>
                    </Tab>
                </Tabs>
            </Container>
        </Fragment>
    );
}

export default Home