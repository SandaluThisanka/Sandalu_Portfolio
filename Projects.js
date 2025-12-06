import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/csharp.jpg";
import projImg2 from "../assets/img/html css.jpg";
import projImg3 from "../assets/img/java.jpg";
import projImg4 from "../assets/img/php.jpg";
import projImg5 from "../assets/img/python.jpg";
import projImg6 from "../assets/img/villa.jpg";
import projImg7 from "../assets/img/react.png";a
import projImg8 from "../assets/img/adopt.jpg";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {

  const all = [
    {
      title: "Point Of Sale System",
      description: "C# Project",
      imgUrl: projImg1,
      githubUrl: "https://github.com/Sahandulmith/GUI-Application",
      youtubeUrl: "https://youtu.be/-GqhJ5CbBoA?si=3IgEO0nvoAr4c4mZ",
    },
    {
      title: "E-Commerce Web Site",
      description: "Project Based on HTML",
      imgUrl: projImg2,
      githubUrl: "https://github.com/Sahandulmith/HTML-Project",
      youtubeUrl: "https://youtu.be/3j4SF0fYYTM?si=5C4edcPWFz0KGkqd",
    },
    {
      title: "Point Of Sale System",
      description: "Java Project",
      imgUrl: projImg3,
      githubUrl: "https://github.com/Sahandulmith/JAVA-EAD1",
      youtubeUrl: "https://youtu.be/4hB7ECNBcLY?si=Kx6ozHwxFqo3vuFG",
    },
    {
      title: "Vating System",
      description: "Project Based on PHP",
      imgUrl: projImg4,
      githubUrl: "https://github.com/Sahandulmith/Voting-System",
      youtubeUrl: "https://youtu.be/03Rv1aYcAHY?si=RZFmUTWyM9LnYi4J",
    },
    {
      title: "System for Marking Attendance",
      description: "Face Recognize(Python Project)",
      imgUrl: projImg5,
      githubUrl: "https://github.com/Sahandulmith/PYTHON",
      youtubeUrl: "https://youtu.be/z6dy76Ie7E8?si=m85p2_mNq0gclcY1",
    },
    {
      title: "Smart Villa",
      description: "Group Project",
      imgUrl: projImg6,
      youtubeUrl: "https://youtu.be/qE5lGSX1hIU?si=2U3jDgXdKTnJDKT0",
    },
    {
      title: "Portfolio Website",
      description: "Project Based on React",
      imgUrl: projImg7,
      githubUrl: "https://github.com/Sahandulmith/Portfolio-Website",
      youtubeUrl: "https://youtu.be/I9bLac3rFQ0",
    },
    {
      title: "Adopt A Wallet",
      description: "2 members Group Project",
      imgUrl: projImg8,
      githubUrl: "https://github.com/Sahandulmith/FLUTTER-PROJECT-Financial-Manager-App",
      youtubeUrl: "https://youtu.be/cxJH09zuc_w?si=dFKym4a0ZrV0N0EK",
    }
  ];

  const group =[
    {
      title: "Smart Villa",
      description: "4 Members Group Project",
      imgUrl: projImg6,
      youtubeUrl: "https://youtu.be/qE5lGSX1hIU?si=2U3jDgXdKTnJDKT0",
    },
    {
      title: "Adopt A Wallet",
      description: "2 members Group Project",
      imgUrl: projImg8,
      githubUrl: "https://github.com/Sahandulmith/FLUTTER-PROJECT-Financial-Manager-App",
      youtubeUrl: "https://youtu.be/cxJH09zuc_w?si=dFKym4a0ZrV0N0EK",
    },
  ];

  const individual =[
    {
      title: "Point Of Sale System",
      description: "C# Project",
      imgUrl: projImg1,
      githubUrl: "https://github.com/Sahandulmith/GUI-Application",
      youtubeUrl: "https://youtu.be/-GqhJ5CbBoA?si=3IgEO0nvoAr4c4mZ",
    },
    {
      title: "E-Commerce Web Site",
      description: "Project Based on HTML",
      imgUrl: projImg2,
      githubUrl: "https://github.com/Sahandulmith/HTML-Project",
      youtubeUrl: "https://youtu.be/3j4SF0fYYTM?si=5C4edcPWFz0KGkqd",
    },
    {
      title: "Point Of Sale System",
      description: "Java Project",
      imgUrl: projImg3,
      githubUrl: "https://github.com/Sahandulmith/JAVA-EAD1",
      youtubeUrl: "https://youtu.be/4hB7ECNBcLY?si=Kx6ozHwxFqo3vuFG",
    },
    {
      title: "Vating System",
      description: "Project Based on PHP",
      imgUrl: projImg4,
      githubUrl: "https://github.com/Sahandulmith/Voting-System",
      youtubeUrl: "https://youtu.be/03Rv1aYcAHY?si=RZFmUTWyM9LnYi4J",
    },
    {
      title: "System for Marking Attendance",
      description: "Face Recognize(Python Project)",
      imgUrl: projImg5,
      githubUrl: "https://github.com/Sahandulmith/PYTHON",
      youtubeUrl: "https://youtu.be/z6dy76Ie7E8?si=m85p2_mNq0gclcY1",
    },
    {
      title: "Portfolio Website",
      description: "Project Based on React",
      imgUrl: projImg7,
      githubUrl: "https://github.com/Sahandulmith/Portfolio-Website",
      youtubeUrl: "https://youtu.be/I9bLac3rFQ0",
    },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Projects</h2>
                <p>I have hands-on experience with a diverse range of technologies, enabling me to build innovative solutions and adapt to various project requirements.</p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">All</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Group</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Individual</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <p>These are my individual and group endeavors.</p>
                      <Row>
                        {
                          all.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                      <Tab.Pane eventKey="second">
                      <p>These are the results of my team's work.</p>
                      <Row>
                        {
                          group.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                      <Tab.Pane eventKey="third">
                      <p>Here are some of my personal project.</p>
                      <Row>
                        {
                          individual.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  )
}
