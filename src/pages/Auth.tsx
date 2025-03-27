
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";

const Auth = () => {
  const [userType, setUserType] = useState<"student" | "faculty">("student");
  
  return (
    <div className="container mx-auto py-16 px-4 min-h-[calc(100vh-64px-350px)]">
      <div className="max-w-md mx-auto">
        <Card className="shadow-lg border-[#90AEAD]/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-[#244855]">Welcome to UnifyU</CardTitle>
            <CardDescription>Login or create a new account to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex justify-center space-x-4 mb-6">
                <button
                  onClick={() => setUserType("student")}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    userType === "student"
                      ? "bg-[#244855] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Student
                </button>
                <button
                  onClick={() => setUserType("faculty")}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    userType === "faculty"
                      ? "bg-[#244855] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Faculty
                </button>
              </div>
            </div>
            
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Create Account</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm userType={userType} />
              </TabsContent>
              <TabsContent value="signup">
                <SignupForm userType={userType} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
