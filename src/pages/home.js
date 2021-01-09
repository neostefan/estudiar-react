import React from 'react';
import Styled from 'styled-components';
import Jumbo from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import img from '../assets/bg-jumbo.jpg';
import icon from '../assets/icon1.png';
import icon1 from '../assets/icon3.png';
import icon2 from '../assets/icon2.png';

const Styles = Styled(Container)`
    padding: 0;
    height: 100%;

    .jumbotron {
        padding: 0;
    }

    .jumbotron-fluid {
        position: relative;
        color: white;
        height: 300px;
        background-image: url(${img});
        background-size: cover;
        background-position: top left, bottom right;
        padding: 5px;
    }

    .jumbotron .tint {
        position: absolute;
        top: 0;
        left: 0;
        background-color: purple;
        z-index: 3;
        height: 100%;
        width: 100%;
        opacity: 0.2;
    }

    .cards {
        display: flex;
        justify-content: space-around;
    }

    .cards .card {
        flex-basis: 25%;
        height: 300px;
        box-shadow: 3px 3px 2px #696969;
    }

    .cards .card .card-img {
        border: 1px solid transparent;
        border-radius: 10%;
        width: 25%;
        height: 25%;
        display: block;
        margin: 10px auto;
    }

    .cards .card h5 {
        margin: 0;
        text-align: center;
        font-weight: 700;
    }

    .cards .card .card-body {
        text-align: center;
        padding: 10px;
    }

    @media(max-width: 650px) {
        .cards {
            flex-direction: column;
            align-items: center;
        }

        .cards .card {
            margin: 0 0 10px 0;
            width: 60%
        }
    }

    @media(max-width: 800px) {
        .cards .card {
            flex-basis: 33.33%;
        }
    }
`;

const Home = () => {
    return (
        <Styles fluid>
            <Jumbo className="d-flex justify-content-center align-items-center flex-column" fluid>
                <div className="tint"></div>
                <h1>Estudiar</h1>
                <h5>Your Online Library For Good Grades</h5>
            </Jumbo>
            <div className="cards mb-4 p-2">
                <Card>
                    <Card.Img src={icon}/>
                    <h5>Convenient</h5>
                    <Card.Body>
                        Simple and Convenient you have all
                        required materials in a single place,
                        just log into your account and access them
                        at your own pace.
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Img src={icon1}/>
                    <h5>Efficient</h5>
                    <Card.Body>
                        It's highly efficient in terms of time,
                        rather than every semester looking for materials
                        for the year, 
                        you save the time searching for materials. 
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Img src={icon2}/>
                    <h5>24/7 Support</h5>
                    <Card.Body>
                        Estudiar is made by students for students,
                        any problems regarding materials, solutions
                        to questions and issues with the site, when reported,
                        wll be addressed.
                    </Card.Body>
                </Card>
            </div>
        </Styles>
    );
}

export default Home;