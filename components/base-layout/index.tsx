import React from 'react';
import Head from 'next/head';
import { compose } from 'recompose';

import withAuthentication from '../../hocs/withAuthentication';
import withAuthorization from '../../hocs/withAuthorization';
import { Navigation } from '../navigation';

type TBaseLayout = {
  className?: string;
  cannonical?: string;
  title?: string;
  children?: any;
};

const BaseLayout = (props: TBaseLayout) => {
  const { className, children, cannonical, title } = props;

  return (
    <React.Fragment>
      <Head>
        <title>{title || 'SV Next FA'}</title>
        <meta
          name="description"
          content="My name is Sviatoslav Nazar and I am an software engineer. I have a Master's degree in Applied mathematics and Informatics and several years of experience working as front-end developer."
        />
        <meta
          name="keywords"
          content="sviatoslav nazar, sviatoslav inoxoft, semipro, inoxoft"
        />
        <meta
          property="og:title"
          content="Sviatoslav Nazar - programmer, developer, gamer"
        />
        <meta property="og:locale" content="en_EU" />
        <meta property="og:url" content={`${process.env.BASE_URL}`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="My name is Sviatoslav Nazar and I am an software engineer."
        />
        <link rel="manifest" href="/static/manifest.json" />
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:400,700"
          rel="stylesheet"
        />
        {cannonical && (
          <link
            rel="cannonical"
            href={`${process.env.BASE_URL}${cannonical}`}
          />
        )}
        <link rel="icon" type="image/ico" href="/static/favicon.ico" />
      </Head>
      <div className="layout-container">
        <Navigation />
        <main className={`cover ${className}`}>
          <div className="wrapper">{children}</div>
        </main>
      </div>
    </React.Fragment>
  );
};

const BaseLayoutWithAuthentication = compose(
  withAuthentication,
  withAuthorization(false)
)(BaseLayout);
const BaseLayoutWithAuthorization = compose(
  withAuthentication,
  withAuthorization(true)
)(BaseLayout);

export {
  BaseLayout,
  BaseLayoutWithAuthentication,
  BaseLayoutWithAuthorization,
};
