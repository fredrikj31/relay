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
import React, { useState } from "react";
import { Link } from "react-router";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@shadcn-ui/components/ui/input-group";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isShowingPassword, setIsShowingPassword] = useState<boolean>(false);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login and get back to your messages.
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
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
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
                <Button type="submit">Login</Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link to="/signup">Sign up</Link>
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
