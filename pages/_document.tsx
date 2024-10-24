import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        <link rel="icon" href="/logo-vrd.png" />
        <title>Quiz | ViaRondon</title>
      </Head>
      <body className="antialiased overflow-hidden">
          <Main />
          <NextScript />
      </body>
    </Html>
  );
}
