import { MainContainer } from "../components";
import { UserInfo } from "../components/userInfo/UserInfo";
import { UserRepos } from "../components/userRepos/UserRepos";
import { useSelector } from "react-redux";
import { selectLoading } from "../select/select";
import { Loading } from "../components/loading/Loading";
import React from "react";

export const Main = () => {
  const loading = useSelector(selectLoading);

  if (loading === "loading") {
    return <Loading />;
  }

  return (
    <section>
      <MainContainer>
        <UserInfo />
        <UserRepos />
      </MainContainer>
    </section>
  );
};
