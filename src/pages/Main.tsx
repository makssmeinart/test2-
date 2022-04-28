import {MainContainer} from "../components";
import {UserInfo} from "../components/userInfo/UserInfo";
import {UserRepos} from "../components/userRepos/UserRepos";
import React from "react";

export const Main = () => {

  return (
    <section>
      <MainContainer>
        <UserInfo />
        <UserRepos />
      </MainContainer>
    </section>
  );
};
