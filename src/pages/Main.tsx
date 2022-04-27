import { MainContainer } from "../components";
import { UserInfo } from "../components/userInfo/UserInfo";
import { UserRepos } from "../components/userRepos/UserRepos";

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
