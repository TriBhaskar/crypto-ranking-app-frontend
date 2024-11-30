import { forgotPassword } from "@/api/authApi";
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
import { Toaster } from "@/components/ui/sonner";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      if (formik.isValid) {
        try {
          const forgotPasswordRequest = {
            email: values.email,
            resetPwdUrl: "http://localhost:5173/reset-password",
          };

          // Call the forgotPassword API
          const response = await forgotPassword(forgotPasswordRequest);
          if (response.status === "success") {
            toast.success(
              "Email Reset link sent to " + forgotPasswordRequest.email
            );

            // Optional: Redirect to login page
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
            toast.error("Failed to send password reset email");
            console.error("Failed to send password reset email");
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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              ) : null}
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
