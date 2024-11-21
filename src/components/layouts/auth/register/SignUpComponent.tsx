import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import {
  CONFIRM_PASSWORD,
  EMAIL,
  FIRST_NAME,
  LAST_NAME,
  PASSWORD,
  USERNAME,
} from "../authConstants";
import { Toaster } from "@/components/ui/sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { registerUser } from "@/api/authApi";

export default function SignUpComponent() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be less than 15 characters")
        .min(3, "Must be more than 3 characters")
        .required("First name is required"),
      lastName: Yup.string()
        .max(15, "Must be less than 15 characters")
        .min(3, "Must be more than 3 characters")
        .required("Last name is required"),
      userName: Yup.string()
        .matches(
          /^[a-zA-Z0-9]+$/,
          "Username can only contain letters and numbers"
        )
        .max(15, "Must be less than 15 characters")
        .min(3, "Must be more than 3 characters")
        .required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      if (formik.isValid) {
        try {
          const registerRequest = {
            username: values.userName,
            password: values.password,
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
          };

          const response = await registerUser(registerRequest);
          if (response.status === "success") {
            toast.success(
              "Account created successfully" + response.timestamp.toString()
            );

            // Optional: Redirect to login page
          }
        } catch (error) {
          if (error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error("Registration failed");
          }
        }
      } else {
        toast.error("Please fix form errors");
      }
    },
  });

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Signup</CardTitle>
        {/* <CardDescription>
          Enter valid details below to create an account
        </CardDescription> */}
      </CardHeader>
      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor={FIRST_NAME}>
                  First Name{" "}
                  {formik.touched.firstName && formik.errors.firstName ? (
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
                          {formik.errors.firstName}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : null}
                </Label>
                <Input
                  id={FIRST_NAME}
                  name={FIRST_NAME}
                  type="text"
                  placeholder="tommy"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor={LAST_NAME}>
                  Last Name{" "}
                  {formik.touched.lastName && formik.errors.lastName ? (
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
                          {formik.errors.lastName}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : null}
                </Label>
                <Input
                  id={LAST_NAME}
                  name={LAST_NAME}
                  type="text"
                  placeholder="shelby"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">
                Username{" "}
                {formik.touched.userName && formik.errors.userName ? (
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
                      <TooltipContent>{formik.errors.userName}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : null}
              </Label>
              <Input
                id={USERNAME}
                name={USERNAME}
                type="text"
                placeholder="tommyshelby11"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userName}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">
                Email{" "}
                {formik.touched.email && formik.errors.email ? (
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
                      <TooltipContent>{formik.errors.email}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : null}
              </Label>
              <Input
                id={EMAIL}
                name={EMAIL}
                type="email"
                placeholder="m@example.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                required
              />
            </div>
            <div className="grid gap-2">
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
                      <TooltipContent>{formik.errors.password}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : null}
              </Label>
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
            <div className="grid gap-2">
              <Label htmlFor={CONFIRM_PASSWORD}>
                Confirm Password{" "}
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
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
                        {formik.errors.confirmPassword}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : null}
              </Label>
              <Input
                id={CONFIRM_PASSWORD}
                name={CONFIRM_PASSWORD}
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={() => {
                if (formik.isValid) {
                  // toast.success("Account created successfully");
                } else {
                  toast.error("Form is invalid");
                }
              }}
            >
              Create account
            </Button>
            <Button variant="outline" className="w-full">
              Signup with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/signin" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </form>
      <Toaster />
    </Card>
  );
}
