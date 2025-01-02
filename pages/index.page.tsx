import { useRouter } from "next/router";

import NextHead from "@/shared/components/NextHead";

export default function Home() {
  const router = useRouter();

  const handleRegister = () => {
    router.push("/register");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <>
      <NextHead />

      <div className="flex justify-center items-center h-screen bg-dark-blue-800">
        <div className="p-4 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4 text-white">WELCOME TO SUPERTEACHER</h1>
          <p className="text-lg mb-4 text-white">Where learning and teaching come together!</p>
          <div className="flex space-x-4">
            <button
              className="border border-green-500 text-green-500 bg-transparent px-4 py-2 rounded hover:bg-green-600 hover:text-white"
              onClick={handleRegister}
            >
              Register
            </button>
            <button
              className="border border-green-500 text-green-500 bg-transparent px-4 py-2 rounded hover:bg-green-600 hover:text-white"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
