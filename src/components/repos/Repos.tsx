import s from "styles/userRepos/userRepos.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentPage,
  selectRepositories,
  selectUserInfo,
} from "../../select/select";
import ReactPaginate from "react-paginate";
import { changePage, findRepos } from "../../reducers/user";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../app/store";

export const Repos = () => {
  const repositories = useSelector(selectRepositories);
  const userInfo = useSelector(selectUserInfo);
  const currentPage = useSelector(selectCurrentPage);
  const dispatch: AppDispatch = useDispatch();
  const [isInit, setIsInit] = useState(false);

  const currentUserLogin = (userInfo && userInfo.login) || "makssmeinart";

  // Pagination
  const totalPageCount = userInfo && userInfo.public_repos / 4;
  const totalItemsCount = userInfo && userInfo.public_repos;
  const totalItemsStart = currentPage * 4 - (4 - 1);
  const totalItemsEnd = Math.min(totalItemsStart + 4 - 1, totalItemsCount || 10);

  useEffect(() => {
    // This state removes 2 requests
    if (isInit) {
      dispatch(findRepos({ username: currentUserLogin }));
    } else {
      setIsInit(true);
    }
  }, [currentPage]);

  const changePageHandler = (value: { selected: number }) => {
    dispatch(changePage(value.selected + 1));
  };

  return (
    <div>
      <div className={s.container}>
        <h3 className={s.title}>
          Repositories: ({userInfo && userInfo.public_repos})
        </h3>
        {repositories &&
          repositories.repositories.map((repo) => (
            <div key={repo.name} className={s.repoItem}>
              <a href={repo.html_url} target={"_blank"} className={s.name}>
                {repo.name}
              </a>
              <p className={s.description}>{repo.description}</p>
            </div>
          ))}
      </div>
      <div className={s.paginationWrapper}>
        <div className={s.paginationTotalItems}>
          <span>
            {totalItemsStart} to {totalItemsEnd}
          </span>{" "}
          of <span>{userInfo && userInfo.public_repos} Items</span>
        </div>
        {/*  Some type of glitch with types on this */}
        <ReactPaginate
          //@ts-ignore
          pageCount={totalPageCount}
          //@ts-ignore
          onPageChange={changePageHandler}
          pageRangeDisplayed={3}
          nextLabel={">"}
          previousLabel={"<"}
          //@ts-ignore
          renderOnZeroPageCount={null}
          containerClassName={s.paginationContainer}
          //@ts-ignore
          activeClassName={s.paginationActive}
          marginPagesDisplayed={1}
        />
      </div>
    </div>
  );
};
