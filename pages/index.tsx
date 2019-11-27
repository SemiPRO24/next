import React from 'react';
import HelloWorld from '../components/HelloWorld';
import { BaseLayoutWithAuthentication } from '../components/base-layout';

const Index = () => {
  return (
    <BaseLayoutWithAuthentication>
      <div className="page">
        <HelloWorld />
        <img src="https://kawai.shikimori.one/system/clubs/main/2431.png" />
      </div>
    </BaseLayoutWithAuthentication>
  );
};

export default Index;
