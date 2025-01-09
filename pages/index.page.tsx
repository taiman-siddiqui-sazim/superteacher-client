import { useRouter } from "next/router";

import NextHead from "@/shared/components/NextHead";
import { Card, CardHeader, CardTitle, CardContent, Button } from "@/shared/components/shadui";

export default function Home() {
  const router = useRouter();

  const redirectToRegister = () => {
    router.push("/register");
  };

  const redirectToLogin = () => {
    router.push("/login");
  };

  return (
    <>
      <NextHead />

      <div className="flex justify-center items-center h-screen">
        <Card className="w-3/5 p-4 flex flex-col items-center border-transparent">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">
              WELCOME TO SUPERTEACHER
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base sm:text-lg md:text-xl mb-4 text-white">Where learning and teaching come together!</p>
          </CardContent>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
              onClick={redirectToRegister}
            >
              Register
            </Button>
            <Button
              variant="outline"
              className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
              onClick={redirectToLogin}
            >
              Login
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}
