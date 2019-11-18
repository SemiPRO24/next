import React from 'react';
import { NextPage, NextPageContext } from 'next';
import App from 'next/app';
import Router from 'next/router';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import initStore from '../store';
import { initGA, logPageView } from '../utils/analytics';
import '../styles/index.scss';

interface PageProps {
  Component: NextPage;
  ctx: NextPageContext;
  store: any;
}

class MyApp extends App<PageProps> {
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
    const { Component, pageProps, store } = this.props;
    return (
      <div>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </div>
    );
  }
}

export default withRedux(initStore)(MyApp);
