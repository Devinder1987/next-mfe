import { useState } from 'react';
import Image from 'next/image';
import { Layout } from '@next-mfe/shared-ui';
import { useLoginStore } from '@next-mfe/states';

export function Index() {
  const { login, setLoginStatus, callLogin } = useLoginStore();
  const [loginError, setLoginError] = useState<string>('');
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    callLogin();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          setLoginStatus(true, data.username);
        } else {
          setLoginStatus(false, '');
          setLoginError(data.message || 'Login failed');
          console.error('Login failed:', data.message);
        }
      })
      .catch((error) => {
        setLoginStatus(false, '');
        setLoginError('An error occurred during login');
        console.error('Error:', error);
      });
  };

  return (
    <Layout>
      <div className="wrapper">
        <nav className="flex flex-col md:flex-row gap-4">
          <a
            href="http://localhost:3001/plp"
            className="text-blue-600 hover:underline"
          >
            PLP
          </a>
        </nav>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-12">
          <div className="flex flex-col items-center">
            <Image
              src="/assets/An3HeroModule.png"
              alt="Hero Module"
              width={1600}
              height={400}
              className="w-[1600px] h-auto rounded-lg shadow-lg mb-4"
              priority
            />
          </div>
          {!login.status && (
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
              <div className="flex justify-center mb-4">
                <Image
                  src="/assets/An3Logo.png"
                  alt="MyShop Logo"
                  width={120}
                  height={120}
                  priority
                  className="header-logo"
                />
              </div>
              <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">
                Login
              </h2>
              <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition"
                >
                  Login
                </button>
              </form>
              {loginError && (
                <p className="text-red-500 mt-4 text-center">{loginError}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Index;
