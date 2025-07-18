import Link from 'next/link';
import { Layout } from '@next-mfe/shared-ui';
export function Index() {
  return (
    <Layout>
      <Link href="/plp">PLP</Link>
    </Layout>
  );
}

export default Index;
