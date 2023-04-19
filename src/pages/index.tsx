import useSWR from "swr";
import Head from "next/head";
import { wrappedFetch } from "@/utils/fetcher";

export default function Home() {
  const { data: repos = [] } = useSWR<{ name: string; html_url: string }[]>(
    "https://api.github.com/user/repos?visibility=public&affiliation=owner",
    (url) =>
      wrappedFetch(url, {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GH_TOKEN}`,
        },
      })
  );

  return (
    <main className="p-16 bg-slate-100">
      <Head>
        <title>Projects</title>
      </Head>
      {repos.map(({ name, html_url }) => (
        <a
          key={name}
          href={html_url}
          className="block text-slate-500 font-bold tracking-tighter text-5xl mb-4 hover:text-slate-600 transition"
        >
          {name}
        </a>
      ))}
      <a
        href="https://github.com/kaufmanhenry"
        className="text-sky-500 font-bold tracking-tighter text-2xl block mt-16"
      >
        github
      </a>
    </main>
  );
}
