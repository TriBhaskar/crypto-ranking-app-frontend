import { resetPassword } from "@/api/authApi";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { useFormik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup";
import { PASSWORD, CONFIRM_PASSWORD } from "../authConstants";
import { Tooltip } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { Loader2 } from "lucide-react";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      if (formik.isValid) {
        if (!token) {
          toast.error("Invalid or missing reset token");
          return;
        }
        try {
          console.log(token);
          const forgotPasswordRequest = {
            token: token,
            newPassword: values.password,
          };

          // Call the forgotPassword API
          const response = await resetPassword(forgotPasswordRequest);
          if (response.status === "success") {
            toast.success(response.message);

            formik.resetForm();

            // Redirect to login page after short delay
            setTimeout(() => {
              navigate("/signin");
            }, 2000); // 2 second delay to show success message
          }
        } catch (error) {
          if (error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error("Failed to reset password");
            console.error("Failed to reset password");
          }
          formik.resetForm();
        }
      } else {
        console.error("Please fix form errors");
      }
    },
  });
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle>Forgot password</CardTitle>
        <CardDescription>
          Provide your email address so we can send you an email with a link to
          reset your password.
        </CardDescription>
      </CardHeader>
      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          <div className="grid gap-4">
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
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Remembered your password again?{" "}
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
