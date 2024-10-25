import styles from "/styles/Shared.module.css";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";

const ClerkFeatures = () => (
  <Link href="/user" className={styles.cardContent}>
    <img alt="Explore Clerk components" src="/icons/layout.svg" />
    <div>
      <h3>Explore features provided by Clerk</h3>
      <p>Interact with the user button, user profile, and more to preview what your users will see</p>
    </div>
    <div className={styles.arrow}>
      <img src="/icons/arrow-right.svg" />
    </div>
  </Link>
);

const SSRDemoLink = () => (
  <Link href="/ssr-demo" className={styles.cardContent}>
    <img alt="SSR demo" src="/icons/sparkles.svg" />
    <div>
      <h3>Visit the SSR demo page</h3>
      <p>
        See how Clerk hydrates the auth state during SSR and CSR, enabling server-side generation even for authenticated
        pages
      </p>
    </div>
    <div className={styles.arrow}>
      <img src="/icons/arrow-right.svg" />
    </div>
  </Link>
);

const SignupLink = () => (
  <Link href="/sign-up" className={styles.cardContent}>
    <img alt="Sign up" src="/icons/user-plus.svg" />
    <div>
      <h3>Sign up for an account</h3>
      <p>Sign up and sign in to explore all the features provided by Clerk out-of-the-box</p>
    </div>
    <div className={styles.arrow}>
      <img src="/icons/arrow-right.svg" />
    </div>
  </Link>
);

const apiSample = `
import { getAuth } from "@clerk/nextjs/server";

export default function handler(req, res) {
  const { sessionId, userId } = getAuth(req);

  if (!sessionId) {
    return res.status(401).json({ id: null });
  }
  return res.status(200).json({ id: userId });
};
`.trim();

const Main = () => (
  <main className={styles.main} style={{backgroundColor:"lightcoral"}}>

    <SignedIn>
      <APIRequest />
    </SignedIn>

  </main>
);

const APIRequest = () => {
  React.useEffect(() => {
    if (window.Prism) {
      window.Prism.highlightAll();
    }
  });
  const [response, setResponse] = React.useState("// Click above to run the request");
  const makeRequest = async () => {
    setResponse("// Loading...");

    try {
      const res = await fetch("/api/getAuthenticatedUserId");
      const body = await res.json();
      setResponse(JSON.stringify(body, null, "  "));
    } catch (e) {
      setResponse("// There was an error with the request. Please contact support@clerk.dev");
    }
  };
  return (
    <div className={styles.backend}>
      <div className={styles.card}>
        <button target="_blank" rel="noopener"  onClick={() => makeRequest()} style={{minWidth:'500px'}}>
          <h1>You have successfully signed in</h1>
        </button>
      </div>

    </div>
  );
};

// Footer component
const Footer = () => (
  <footer className={styles.footer}>
    Powered by{" "}
    <a
      href="https://clerk.dev?utm_source=github&utm_medium=starter_repos&utm_campaign=nextjs_starter"
      target="_blank"
      rel="noopener"
    >
      <img src="/clerk.svg" alt="Clerk" className={styles.logo} />
    </a>
    +
    <a href="https://nextjs.org/" target="_blank" rel="noopener">
      <img src="/nextjs.svg" alt="Next.js" className={styles.logo} />
    </a>
  </footer>
);

const Home = () => (
  <div className={styles.container}>
    <Main />
    <Footer />
  </div>
);

export default Home;
