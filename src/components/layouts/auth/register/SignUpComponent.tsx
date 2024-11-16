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
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import {
  CONFIRM_PASSWORD,
  EMAIL,
  FIRST_NAME,
  LAST_NAME,
  PASSWORD,
  USERNAME,
} from "../authConstants";

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
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Signup</CardTitle>
        <CardDescription>
          Enter valid details below to create an account
        </CardDescription>
      </CardHeader>
      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor={FIRST_NAME}>First Name</Label>
                <Input
                  id={FIRST_NAME}
                  name={FIRST_NAME}
                  type="text"
                  placeholder="tommy"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor={LAST_NAME}>Last Name</Label>
                <Input
                  id={LAST_NAME}
                  name={LAST_NAME}
                  type="text"
                  placeholder="shelby"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id={USERNAME}
                name={USERNAME}
                type="text"
                placeholder="tommyshelby11"
                onChange={formik.handleChange}
                value={formik.values.userName}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id={EMAIL}
                name={EMAIL}
                type="email"
                placeholder="m@example.com"
                onChange={formik.handleChange}
                value={formik.values.email}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor={PASSWORD}>Password</Label>
              <Input
                id={PASSWORD}
                name={PASSWORD}
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor={CONFIRM_PASSWORD}>Confirm Password</Label>
              <Input
                id={CONFIRM_PASSWORD}
                name={CONFIRM_PASSWORD}
                type="password"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Create account
            </Button>
            <Button variant="outline" className="w-full">
              Signup with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
