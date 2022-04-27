import s from "styles/loading/loading.module.css";

export const Loading = () => {
  return (
    <section className={s.container}>
      <div className={s.lds_roller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
};
