"use client";
import { useState } from "react";

import Image from "next/image";
import Login from "./_components/login";
import SignUp from "./_components/sign-up";

const Authentication = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleComponent = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <div className="w-full lg:grid lg:min-h-full lg:grid-cols-2 min-h-full">
      <div className="flex items-center justify-center py-12">
        {showSignUp ? (
          <SignUp toggleShowSignUp={toggleComponent} />
        ) : (
          <Login toggleShowSignUp={toggleComponent} />
        )}
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/homepage.png"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default Authentication;
