import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          />

          <meta name="application-name" content="lmiguelm" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="lmiguelm" />
          <meta name="description" content="Portfólio de Luis Miguel" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content="#2B5797" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#000000" />

          <link rel="manifest" href="/manifest.json" />

          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon.png" />
          <link rel="manifest" href="/static/manifest.json" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://lmiguelm.vercel.app" />
          <meta name="twitter:title" content="Luis Miguel" />
          <meta name="twitter:description" content="Portfólio de Luis Miguel" />
          <meta name="twitter:image" content="/static/favicon.png" />
          <meta name="twitter:creator" content="@lmiguelm" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Luis Miguel" />
          <meta property="og:description" content="Portfólio de Luis Miguel" />
          <meta property="og:site_name" content="Luis Miguel" />
          <meta property="og:url" content="https://lmiguelm.vercel.app" />
          <meta property="og:image" content="/static/favicon.png" />

          <link rel="apple-touch-startup-image" href="/static/favicon.png" sizes="2048x2732" />
          <link rel="apple-touch-startup-image" href="/static/favicon.png" sizes="1668x2224" />
          <link rel="apple-touch-startup-image" href="/static/favicon.png" sizes="1536x2048" />
          <link rel="apple-touch-startup-image" href="/static/favicon.png" sizes="1125x2436" />
          <link rel="apple-touch-startup-image" href="/static/favicon.png" sizes="1242x2208" />
          <link rel="apple-touch-startup-image" href="/static/favicon.png" sizes="750x1334" />
          <link rel="apple-touch-startup-image" href="/static/favicon.png" sizes="640x1136" />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap"
            rel="stylesheet"
          />

          <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
