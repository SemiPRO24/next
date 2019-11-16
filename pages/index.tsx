import HelloWorld from '../components/HelloWorld';
import { BaseLayout } from '../components/base-layout';

const Index = () => {
  return (
    <BaseLayout>
      <div className="page">
        <HelloWorld />
      </div>
    </BaseLayout>
  );
};

export default Index;
