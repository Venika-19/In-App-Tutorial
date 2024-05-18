import React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {useSpring, animated} from 'react-spring';
import Joyride from 'react-joyride';
import axios from 'axios';
import "./Dashboard.css"

import Sidebar from "../Sidebar"

function Dashboard(props){

  const fadeInFast = useSpring({opacity: 1, from: {opacity: 0}, config: { duration: 1000 }})

  const slideInFast = useSpring({opacity: 1, from: {opacity: 0, marginLeft: 450}, marginLeft: 0, config: { duration: 250 }})
  const slideInMedium = useSpring({opacity: 1, from: {opacity: 0, marginLeft: 450}, marginLeft: 0, delay: 300, config: { duration: 250 }})
  const slideInSlow = useSpring({opacity: 1, from: {opacity: 0, marginLeft: 450}, marginLeft: 0, delay: 500, config: { duration: 250 }})

  const { data: trending_posts } = useQuery(FETCH_TOP_POSTS);

  var trending_posts_list = trending_posts ? trending_posts.getTopPosts : "";
 
  const { data: trending_people } = useQuery(FETCH_TOP_RATED);

  var trending_people_list = trending_people ? trending_people.getTopRated : "";

  // // State for controlling the tutorial visibility
  // const [runTutorial, setRunTutorial] = useState(false);
  const [runTutorial, setRunTutorial] = useState(() => {
    // Check if the user has seen the tutorial before (e.g., using localStorage)
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    return !hasSeenTutorial; // Only run if they haven't seen it
  });


  //  // State for click rates
  //  const [clickRates, setClickRates] = useState({
  //   next: 0,
  //   skip: 0,
  //   back:0
  //    // Click rate for the Joyride
  // });

  // useEffect(() => {
  //   // Load click rates from localStorage on component mount
  //   const storedClickRates = JSON.parse(localStorage.getItem('clickRates'));
  //   if (storedClickRates) {
  //     setClickRates(storedClickRates);
  //   }
  // }, []);
   
  // // Function to update click rate and localStorage
  // const updateClickRate = (feature) => {
  //   const updatedClickRates = { ...clickRates, [feature]: clickRates[feature] + 1 };
  //   setClickRates(updatedClickRates);
  //   localStorage.setItem('clickRates', JSON.stringify(updatedClickRates));
  //   // axios.post('/api/updateClickRates', updatedClickRates)
  //   // .then(response => {
  //   //   console.log('Click rates updated successfully in the backend:', response.data);
  //   // })
  //   // .catch(error => {
  //   //   console.error('Error updating click rates in the backend:', error);
  //   // });
  //   console.log(clickRates)
  //   localStorage.removeItem('clickRates');
  // };

  // // Joyride callback for updating click rate when a step is completed
  const handleJoyrideCallback = (data) => {
    console.log("hey", data.action);
    if (data.action === 'skip'){
      updateClickRate('skip');
      console.log("check", data.action);

    }
    else if(data.action === 'next')
    {
      updateClickRate('next');
    }
    else if(data.action === 'prev')
    {
      updateClickRate('back');
    }

    if (data.type === 'tour:end') {
          setRunTutorial(false);
     }

    
  };

  // const handleExploreNowClick = () => {
  //   // Update click rate for the tutorial step
  //   updateClickRate('exploreNow');
    
  //   // Trigger the action corresponding to clicking the "EXPLORE NOW" button
  //   // You can add your logic here, such as redirecting the user or performing any other action
  //   console.log('EXPLORE NOW button clicked!');
  // };
  

  const tutorialSteps = [
    {
      target: '.subsection-header',
      content: 'Welcome to Peersity! Experience seamless social connectivity within IIIT-H with our dedicated web application, consolidating all campus-related interactions in one space. Say goodbye to scattered platforms and embrace a unified hub where what happens in IIIT stays within the IIIT community.',
    },
    {
      target: '.popular-posts',
      content: 'Here you can look at the popular posts made by different students',
    },
    {
      target: '.leaderboard',
      content: 'Here you can see the leading contributers in graditure points!',
    },
    {
      target: '.query_feature',
      content: 'Here you can see ask your queries. Click on it to create your first query!',
      spotlightComponent: (
        <button className="my-5 rounded btn"> EXPLORE NOW </button>
      ),
    },
    {
      target: '.s-sidebar__nav-link_blog',
      content: 'Here you can see ask your queries. Click on it to create your first query!',
    },

    // Add more steps as needed
  ];



  function showIssue(postId){
    props.history.push('/issue/'+postId);
  }
  function hideTutorialOverlay() {
    document.getElementById("tutorial-overlay").style.display = "none";
    console.log("yes");
  }
  function showUser(username){
    props.history.push('/profile/'+username);
  }

	function recommendFriend(){
        props.history.push('/recommend')
    }

      function stackOverflow(){
        props.history.push('/querify')
    }

    function Marauders(){
        props.history.push('/marauder')
    }

	return (
          <>
            <Sidebar/>
            <main class="s-layout__content">
          		<div className="container-fluid">
                <div className="row">
                  <div className="col-xl-9">
              			<div className="wall">
                			<div className="feature-display mx-2">
                				<div className="subsection-header"> WHAT DO YOU WANT TO DO TODAY?</div>
                            <animated.div style={fadeInFast}>
                            <div className="feature" onClick={recommendFriend}>
                              <div className="row">
                                <div className="col-md-4">
                                  <div className="feature-icon mt-4 ml-4">
                                    <img src='/img/find_friend.png' alt=""></img>
                                  </div>
                                </div>
                                <div className="col-md-8">
                                  <div className="feature-body ml-3 mt-5 text-left">
                                    <div className="feature-content">
                                      FIND NEW FRIENDS
                                    </div>
                                    <div className="feature-content-title">
                                      Explore IIIT-H
                                    </div>
                                    <div className="feature-content-description mt-4">
                                     Find other people tired of not having friends. 
                                      <br/>
                                      <button className="my-5 rounded btn"> EXPLORE NOW </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            </animated.div>
                            <animated.div style={fadeInFast} className = "query_feature">
                            <div className="feature" onClick={stackOverflow}>
                              <div className="row">
                                <div className="col-md-4">
                                  <div className="feature-icon mt-4 ml-4">
                                    <img src='/img/study.png' alt=""></img>
                                  </div>
                                </div>
                                <div className="col-md-8">
                                  <div className="feature-body ml-3 mt-5 text-left">
                                    <div className="feature-content-query">
                                     QUERIFY 
                                    </div>
                                    <div className="feature-content-title">
                                      Ask a Question
                                    </div>
                                    <div className="feature-content-description mt-4">
					Have your doubts cleared by {<del>snakes</del>} bonds.
                                      <br/>
                                      <button className="my-5 rounded btn"> EXPLORE NOW </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            </animated.div>
                            <animated.div style={fadeInFast}>
                            <div className="feature" onClick={Marauders}>
                              <div className="row">
                                <div className="col-md-4">
                                  <div className="feature-icon mt-4 ml-4">
                                    <img src='/img/locate_friend.png' alt=""></img>
                                  </div>
                                </div>
                                <div className="col-md-8">
                                  <div className="feature-body ml-3 mt-5 text-left">
                                    <div className="feature-content">
                                LOCATE YOUR FRIENDS
                                    </div>
                                    <div className="feature-content-title">
                                Marauder's Map
                                    </div>
                                    <div className="feature-content-description mt-4">
					Stalk your friends here.
                                      <br/>
                                      <button className="my-5 rounded btn"> EXPLORE NOW </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            </animated.div>
                			</div>
                    </div>
                  </div>
                  <div className="col-xl-3 right-sidebar">
                    <div className="popular-posts my-5">
                      <div className="popular-header">
                        POPULAR POSTS
                        <a href="/querify"><span class="see-more float-right">MORE</span></a>
                      </div>
                      <animated.div style={slideInFast}>
                      <div className="popular-post mt-4 hover-pointer" onClick={() => showIssue(trending_posts_list[0].id)}>
                        <div className="popular-post-content">
                          <strong>{trending_posts_list && trending_posts_list[0].title.length <= 46 ? trending_posts_list[0].title : ""}</strong>
                          <strong>{trending_posts_list && trending_posts_list[0].title.length > 46 ? trending_posts_list[0].title.substring(0, 46)+" ....." : ""}</strong><br/>
                          {trending_posts_list ? trending_posts_list[0].email : ""}
                        </div>
                      </div>
                      </animated.div>
                      <animated.div style={slideInMedium}>
                      <div className="popular-post mt-4 hover-pointer" onClick={() => showIssue(trending_posts_list[1].id)}>
                        <div className="popular-post-content">
                          <strong>{trending_posts_list && trending_posts_list[1].title.length <= 46 ? trending_posts_list[1].title : ""}</strong>
                          <strong>{trending_posts_list && trending_posts_list[1].title.length > 46 ? trending_posts_list[1].title.substring(0, 46)+" ....." : ""}</strong><br/>
                          {trending_posts_list ? trending_posts_list[1].email : ""}
                        </div>
                      </div>
                      </animated.div>
                      <animated.div style={slideInSlow}>
                      <div className="popular-post mt-4 hover-pointer" onClick={() => showIssue(trending_posts_list[2].id)}>
                        <div className="popular-post-content">
                          <strong>{trending_posts_list && trending_posts_list[2].title.length <= 46 ? trending_posts_list[2].title : ""}</strong>
                          <strong>{trending_posts_list && trending_posts_list[2].title.length > 46 ? trending_posts_list[2].title.substring(0, 46)+" ....." : ""}</strong><br/>
                          {trending_posts_list ? trending_posts_list[2].email : ""}
                        </div>
                      </div>
                      </animated.div>
                    </div>
                    <div className="leaderboard my-5">
                      <div className="popular-header">
                        LEADERBOARD
                        <a href="/recommend"><span class="see-more float-right">MORE</span></a>
                      </div>
                      <animated.div style={slideInFast}>
                      <div className="top-recommend mt-4 hover-pointer" onClick={() => showUser(trending_people_list[0].username)}>
                        <div className="popular-post-content">
                          <strong>{trending_people_list ? trending_people_list[0].username : ""}</strong><br/>
                          {trending_people_list ? trending_people_list[0].email : ""} <br/>
                          Rated: {trending_people_list ? trending_people_list[0].rating : ""}
                        </div>
                      </div>
                      </animated.div>
                      <animated.div style={slideInMedium}>
                      <div className="top-recommend mt-4 hover-pointer" onClick={() => showUser(trending_people_list[1].username)}>
                        <div className="popular-post-content">
                          <strong>{trending_people_list ? trending_people_list[1].username : ""}</strong><br/>
                          {trending_people_list ? trending_people_list[1].email : ""} <br/>
                          Rated: {trending_people_list ? trending_people_list[1].rating : ""}
                        </div>
                      </div>
                      </animated.div>
                      <animated.div style={slideInSlow}>
                      <div className="top-recommend mt-4 hover-pointer" onClick={() => showUser(trending_people_list[2].username)}>
                        <div className="popular-post-content">
                          <strong>{trending_people_list ? trending_people_list[2].username : ""}</strong><br/>
                          {trending_people_list ? trending_people_list[2].email : ""} <br/>
                          Rated: {trending_people_list ? trending_people_list[2].rating : ""}
                        </div>
                      </div>
                      </animated.div>
                    </div>
                  </div>
                </div>
          		</div>
              <div id="tutorial-overlay">
                <div style={{ margin: 'auto', position: 'relative', top: '50%', transform: 'translateY(-50%)' }}>
                {/* <h2 style={{ textAlign: 'center'}}> Start Tutorial</h2> */}
                <button id="start-tutorial"  onClick={ () => { hideTutorialOverlay(); setRunTutorial(true); }}>Start Now</button>
                </div>
              </div>

              {/* In-App Tutorial */}
              <Joyride
                run={runTutorial}
                steps={tutorialSteps}
                continuous={true}
                showSkipButton={true}
                disableOverlayClose={true}
                disableScrolling={true}
                spotlightPadding={8}
                callback={handleJoyrideCallback}
                disableOverlay={false}
              />

            </main>
          </>
      )
  	
}

const FETCH_TOP_POSTS = gql`
    query{
        getTopPosts{
          id title email
        }
    }
`

const FETCH_TOP_RATED = gql`
    query{
        getTopRated{
          username rating email
        }
    }
`

export default Dashboard;