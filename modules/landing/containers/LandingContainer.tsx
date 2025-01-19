import React, { useState } from "react";

import { useRouter } from "next/router";

import RoleModal from "@/modules/landing/components/RoleModal";
import NextHead from "@/shared/components/NextHead";
import { Card, CardHeader, CardTitle, CardContent, Button } from "@/shared/components/shadui";

const LandingContainer = () => {
  const router = useRouter();
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  const handleRegisterClick = () => {
    setIsRoleModalOpen(true);
  };

  const redirectToLogin = () => {
    router.push("/login");
  };

  return (
    <>
      <NextHead />

      <div className="flex justify-center items-center h-screen">
        <Card className="sm:w-3/4 lg:w-3/5 h-[80vh] p-4 flex flex-col justify-center items-center border-transparent">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white text-center">
              WELCOME TO SUPERTEACHER
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm md:text-xl mb-2 text-white text-center">
              Where learning and teaching come together!
            </p>
          </CardContent>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
              onClick={handleRegisterClick}
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

      <RoleModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
      />
    </>
  );
};

export default LandingContainer;
