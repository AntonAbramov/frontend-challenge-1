import { useState } from "react";
import { Button, TextInput } from "@mantine/core";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Loader } from "~/components/Loader.tsx";
import { ACCESS_TOKEN } from "~/constants";
import userStore from "~/store/userStore";
import { login } from "~/services";

const userSchema = z.object({
  name: z.string().min(3),
});

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const response = await login(data);

    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
    userStore.setUser(response.user);
    setLoading(false);
  };

  return (
    <div>
      <form className="max-w-2xl mx-auto my-5" onSubmit={handleSubmit(onSubmit)}>
        {loading && <Loader />}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextInput {...field} label="Write your name" placeholder="Please enter your name" size="md" />
          )}
        />
        {errors.name?.message && <p className="text-red">{errors.name.message}</p>}
        <Button type="submit" fullWidth mt="xl" size="md">
          Login
        </Button>
      </form>
    </div>
  );
};
