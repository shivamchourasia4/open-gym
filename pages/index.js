import useSWR from "swr";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { SimpleGrid } from "@chakra-ui/react";
import { ExerciseCard } from "@/components/ExerciseCard";
import { Error } from "@/components/Error";
import { Loading } from "@/components/Loading";

import { getAll } from "@/services";

export function getServerSideProps({ query }) {
  return {
    props: { query },
  };
}

export default function Home({ query }) {
  const { data: exercises, error } = useSWR(
    `${getAll}/?body-part=${query["body-part"] || ""}`
  );

  if (error)
    return (
      <Error title="Error" description="An unexpected error has occurred" />
    );

  if (!exercises) return <Loading text="Loading..." />;

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <SimpleGrid minChildWidth={100} spacing={30}>
          {exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              id={exercise.id}
              image={exercise.gifUrl}
              title={exercise.name}
            />
          ))}
        </SimpleGrid>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
