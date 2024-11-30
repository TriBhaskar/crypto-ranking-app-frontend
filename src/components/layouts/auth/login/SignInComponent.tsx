import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup";
import { IDENTIFIER, PASSWORD } from "../authConstants";
import { Toaster } from "@/components/ui/sonner";
import { loginUser } from "@/api/authApi";

export default function SignInComponent() {
  const formik = useFormik({
    initialValues: {
      identifier: "",
      password: "",
    },
    validationSchema: Yup.object({
      identifier: Yup.string()
        .min(3, "Must be more than 3 characters")
        .required("Email or Username is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      if (formik.isValid) {
        try {
          const loginRequest = {
            identifier: values.identifier,
            password: values.password,
          };

          const response = await loginUser(loginRequest);
          if (response.status === "success") {
            toast.success("Login Succesfull " + response.username.toString());

            // Optional: Redirect to login page
          }
        } catch (error) {
          if (error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error("Signin failed");
          }
        }
      } else {
        toast.error("Please fix form errors");
      }
    },
  });
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign in</CardTitle>
        <CardDescription>
          Enter your email or username below to Sign in to your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor={IDENTIFIER}>
                Email or Username{" "}
                {formik.touched.identifier && formik.errors.identifier ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        {" "}
                        <svg
                          className="w-6 h-5 text-red-600 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0V8Zm-1 7a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </TooltipTrigger>
                      <TooltipContent>
                        {formik.errors.identifier}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : null}
              </Label>
              <Input
                id={IDENTIFIER}
                name={IDENTIFIER}
                type="text"
                placeholder="m@example.com or username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.identifier}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor={PASSWORD}>
                  Password{" "}
                  {formik.touched.password && formik.errors.password ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          {" "}
                          <svg
                            className="w-6 h-5 text-red-600 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0V8Zm-1 7a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </TooltipTrigger>
                        <TooltipContent>
                          {formik.errors.password}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : null}
                </Label>
                <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id={PASSWORD}
                name={PASSWORD}
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={() => {
                if (formik.isValid) {
                  // console.log("form is valid", formik.values);
                } else {
                  toast.error("Form is invalid");
                }
              }}
            >
              Sign in
            </Button>
            <Button variant="outline" className="w-full">
              Sign in with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </form>
      <Toaster />
    </Card>
  );
}
