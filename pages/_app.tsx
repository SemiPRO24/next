import React from 'react';
import { NextPage, NextPageContext } from 'next';
import App, { Container } from 'next/app';
import Router from 'next/router';
import { initGA, logPageView } from '../utils/analytics';
import Head from 'next/head';
import '../styles/index.scss';

interface PageProps {
  Component: NextPage;
  ctx: NextPageContext;
}

export default class MyApp extends App<PageProps> {
  static async getInitialProps({ Component, ctx }: any) {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {},
    };
  }

  componentDidMount() {
    initGA();
    logPageView();

    if (Router.router) {
      Router.router.events.on('routeChangeComplete', logPageView);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}
