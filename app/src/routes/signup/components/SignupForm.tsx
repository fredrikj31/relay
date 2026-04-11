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
import { ComponentProps, useState } from "react";
import { Link } from "react-router";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@shadcn-ui/components/ui/input-group";
import { AtSign, EyeIcon, EyeOffIcon } from "lucide-react";

export function SignupForm({ className, ...props }: ComponentProps<"div">) {
  const [isShowingPassword, setIsShowingPassword] = useState<boolean>(false);

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
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="username"
                    type="username"
                    placeholder="JohnDoe"
                    required
                  />
                  <InputGroupAddon>
                    <AtSign />
                  </InputGroupAddon>
                </InputGroup>
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
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="password"
                    type={isShowingPassword ? "text" : "password"}
                    required
                  />
                  <InputGroupAddon align="inline-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        setIsShowingPassword((prevState) => !prevState)
                      }
                      className="text-muted-foreground focus-visible:ring-ring/50 cursor-pointer hover:bg-transparent"
                    >
                      {isShowingPassword ? <EyeOffIcon /> : <EyeIcon />}
                      <span className="sr-only">
                        {isShowingPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
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
