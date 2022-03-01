import React from "react";
import styled from "styled-components";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

const Contact = () => {
  return (
    <Container>
      <a href="https://github.com/Gezo1993">
        <GitHubWrapper className="iconEffect">
          <CustomGitHubIcon />
        </GitHubWrapper>
      </a>
      <a href="https://www.linkedin.com/in/owen-imasiku-118162126/">
        <LinkedInWrapper className="iconEffect">
          <CustomLinkedInIcon />
        </LinkedInWrapper>
      </a>
      <a href="https://web.facebook.com/owen.imasiku.10">
        <FacebookWrapper className="iconEffect">
          <CustomFacebookIcon />
        </FacebookWrapper>
      </a>
      <a href="https://twitter.com/o6w9e3n6">
        <TwitterWrapper className="iconEffect">
          <CustomTwitterIcon />
        </TwitterWrapper>
      </a>
    </Container>
  );
};

export default Contact;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 160px;
  height: auto;

  a .iconEffect {
    background: linear-gradient(65deg, #2193b0, #6dd5ed) no-repeat;
  }
  a .iconEffect:hover {
    background: linear-gradient(65deg, #6dd5ed, #2193b0) no-repeat;
  }
`;

const GitHubWrapper = styled.div`
  border-radius: 5px;
  padding: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  transform: scale(0.8);
`;
const LinkedInWrapper = styled(GitHubWrapper)``;
const FacebookWrapper = styled(GitHubWrapper)``;
const TwitterWrapper = styled(GitHubWrapper)``;

const CustomGitHubIcon = styled(GitHubIcon)``;
const CustomLinkedInIcon = styled(LinkedInIcon)``;
const CustomFacebookIcon = styled(FacebookIcon)``;
const CustomTwitterIcon = styled(TwitterIcon)``;
