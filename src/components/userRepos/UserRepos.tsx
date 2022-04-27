import { useSelector } from "react-redux";
import { selectRepositories, selectSearchValue } from "../../select/select";
import { ReposNotFound } from "../reposNotFound/ReposNotFound";
import { Repos } from "../repos/Repos";

export const UserRepos = () => {
  const repositories = useSelector(selectRepositories);
  const searchValue = useSelector(selectSearchValue);

  const repositoriesNotFound =
    repositories &&
    repositories.repositories.length === 0 &&
    searchValue.length > 0;
  const repositoriesFound =
    repositories && repositories.repositories.length > 0;

  return repositories ? (
    <div style={{ width: "100%" }}>
      {repositoriesNotFound && <ReposNotFound />}
      {repositoriesFound && <Repos />}
    </div>
  ) : (
    <div></div>
  );
};
