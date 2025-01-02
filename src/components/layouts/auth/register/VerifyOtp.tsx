import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "sonner";
import { OTP } from "../authConstants";
import { Label } from "@/components/ui/label";

const validationSchema = Yup.object({
  otp: Yup.string()
    .required("OTP is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(6, "Must be exactly 6 digits")
    .max(6, "Must be exactly 6 digits"),
});

export default function VerifyOtp() {
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Add your API call here
        console.log("OTP submitted:", values.otp);
        toast.success("OTP verified successfully!");
      } catch (error) {
        toast.error("Failed to verify OTP");
      }
    },
  });
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Verify OTP</CardTitle>
        <CardDescription>
          Enter the 6-digit code sent to your email/phone
        </CardDescription>
      </CardHeader>
      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor={OTP}>One-Time Password</Label>
              <Input
                id={OTP}
                name={OTP}
                type="text"
                placeholder="Enter 6-digit OTP"
              />
              {formik.touched.otp && formik.errors.otp && (
                <div className="text-red-500 text-sm">{formik.errors.otp}</div>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify OTP"
              )}
            </Button>
            <div className="text-center text-sm">
              <Link to="/resend-otp" className="text-blue-500 hover:underline">
                Didn't receive code? Resend
              </Link>
            </div>
          </div>
        </CardContent>
      </form>
      <Toaster />
    </Card>
  );
}
