import HelloWorld from '../components/HelloWorld';
import { BaseLayoutWithAuthentication } from '../components/base-layout';

const Index = () => {
  return (
    <BaseLayoutWithAuthentication>
      <div className="page">
        <HelloWorld />
      </div>
    </BaseLayoutWithAuthentication>
  );
};

export default Index;
