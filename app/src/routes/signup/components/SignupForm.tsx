import { cn } from "@shadcn-ui/lib/utils";
import { Button } from "@shadcn-ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shadcn-ui/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@shadcn-ui/components/ui/field";
import { Input } from "@shadcn-ui/components/ui/input";
import { ComponentProps } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@shadcn-ui/components/ui/select";
import { DatePickerInput } from "@shadcn-ui/components/ui/date-picker-input";
import { Link } from "@tanstack/react-router";

const GENDER_SELECT_ITEMS = [
  { label: "Select Gender", value: null },
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
  {
    label: "Prefer Not To Say",
    value: "PREFER_NOT_TO_SAY",
  },
];

export function SignupForm({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="johndoe@mail.com"
                  required
                />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" type="password" required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input id="confirm-password" type="password" required />
                  </Field>
                </Field>
              </Field>
              <Field className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                  <Input
                    id="firstName"
                    type="text"
                    required
                    placeholder="John"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                  <Input id="lastName" type="text" required placeholder="Doe" />
                </Field>
              </Field>
              <Field className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="birthDate">Birth Date</FieldLabel>
                  <DatePickerInput />
                </Field>
                <Field>
                  <FieldLabel htmlFor="gender">Gender</FieldLabel>
                  <Select items={GENDER_SELECT_ITEMS}>
                    <SelectTrigger className="w-full max-w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Gender</SelectLabel>
                        {GENDER_SELECT_ITEMS.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </Field>
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link to="/login">Log in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
