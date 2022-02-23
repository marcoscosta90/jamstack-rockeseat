import { GetServerSideProps } from "next";
import { Features } from "../components/Features";
import { Hero } from "../components/Hero";
import { Pricing } from "../components/Pricing";
import { PageDocument, usePageQuery } from "../generated/graphql";
import { client, ssrCache } from "../lib/urql";

export default function Home() {
  const [{ data: posts }] = usePageQuery({ variables: { slug: "about" } });

  return (
    <>
      <Hero title={posts.page.title} subtitle={posts.page.subtitle}></Hero>
      <Features />
      <Pricing />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  await client.query(PageDocument, { slug: "about" }).toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
};
