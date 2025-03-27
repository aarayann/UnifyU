
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { toast } from "sonner";

interface SignupFormProps {
  userType: "student" | "faculty";
}

const SignupForm = ({ userType }: SignupFormProps) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [enrollmentId, setEnrollmentId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignup = () => {
    setIsLoading(true);
    // Simulate Google signup
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`${userType === "student" ? "Student" : "Faculty"} account created with Google`);
      navigate(`/${userType}-dashboard`);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate signup
    setTimeout(() => {
      setIsLoading(false);
      if (firstName && lastName && enrollmentId && password) {
        toast.success(`${userType === "student" ? "Student" : "Faculty"} account created successfully`);
        navigate(`/${userType}-dashboard`);
      } else {
        toast.error("Please fill in all fields");
      }
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <Button 
        variant="outline" 
        type="button" 
        disabled={isLoading}
        onClick={handleGoogleSignup}
        className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50"
      >
        <Mail size={18} />
        <span>Sign up with Google</span>
      </Button>
      
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="enrollmentId">
            {userType === "student" ? "Enrollment ID" : "Faculty ID"}
          </Label>
          <Input
            id="enrollmentId"
            placeholder={userType === "student" ? "ST1234567" : "FC1234567"}
            value={enrollmentId}
            onChange={(e) => setEnrollmentId(e.target.value)}
            disabled={isLoading}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-[#244855] hover:bg-[#1a363f]" 
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;
