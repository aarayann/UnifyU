import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Auth = () => {
  const [userType, setUserType] = useState<"student" | "faculty">("student");
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); // <- Add name field
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    const userId = data.user?.id;

    if (userId) {
      const { error: insertError } = await supabase.from("login_users").insert([
        {
          uid: userId,
          email,
          name, // <- save name
          user_type: userType,
        },
      ]);

      if (insertError) {
        console.error("Insert error:", insertError);
        alert("Signup successful but failed to save user details.");
      } else {
        alert("Signup successful! Please check your email to confirm.");
      }
    }

    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    const userId = data.user.id;

    const { data: userData, error: userError } = await supabase
      .from("login_users")
      .select("user_type")
      .eq("uid", userId)
      .single();

    if (userError) {
      alert("Login successful, but failed to fetch user type.");
      setLoading(false);
      return;
    }

    if (userData.user_type === "student") {
      navigate("/student-dashboard");
    } else {
      navigate("/faculty-dashboard");
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto py-16 px-4 min-h-[calc(100vh-64px-350px)]">
      <div className="max-w-md mx-auto">
        <Card className="shadow-lg border-[#90AEAD]/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-[#244855]">
              Welcome to UnifyU
            </CardTitle>
            <CardDescription>
              Login or create a new account to get started
            </CardDescription>
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
                <div className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button onClick={handleLogin} disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="signup">
                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button onClick={handleSignup} disabled={loading}>
                    {loading ? "Creating account..." : "Create Account"}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
