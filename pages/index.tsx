import axios from "axios";
import type { NextPage } from "next";
import { useFilters } from "../hooks/useFilters";
import styles from "../styles/home.module.scss";
import container from "../styles/content.module.scss";
import { IPost } from "../types";
import Image from "next/image";

interface IHome {
  posts: IPost[];
}

const Home: NextPage<IHome> = ({ posts }) => {
  const { result } = useFilters(posts, {
    sort: "ASC",
    filter: { name: "description", value: "" },
  });

  return (
    <div className={styles.post}>
      <h1>Task-4</h1>
      {result.length ? (
        <div className={container.content}>
          {result.map(({ id, title, description, image }) => (
            <div key={id} className={container.item}>
              <h2>
                {id}. {title}
              </h2>
              <p>{description}</p>
              <div className={container.image}>
                <Image src={image} alt="slide" width={200} height={100} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1>Посты не найдены</h1>
      )}
    </div>
  );
};

export async function getStaticProps() {
  const { data } = await axios.get<IPost[]>("http://localhost:3000/api/posts");

  return {
    props: { posts: data },
  };
}

export default Home;
