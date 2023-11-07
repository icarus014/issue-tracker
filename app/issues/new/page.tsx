"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import { Text } from "@radix-ui/themes";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    // passing configuration object {}
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");
  // console.log(register('title'))

  return (
    <div className="max-w-xl space-y-3 mb-5">
      {error && (
        <Callout.Root color="blue">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        // this returns  promise, which requires the use of "await" and "async"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("An unexpected error has occurred");
          }
        })}
      >
        <TextField.Root className="mb-3">
          <TextField.Input placeholder="Title" {...register("title")} />
          {/* using props for components  */}
        </TextField.Root>
        {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}
        <Button>Submit new Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
