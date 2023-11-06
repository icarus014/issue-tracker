'use client'
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from 'axios'
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

interface IssueForm{
    title: string;
    description: string;
}


const NewIssuePage = () => {
    const router = useRouter()
    const {register, control, handleSubmit} = useForm<IssueForm>();
    // console.log(register('title'))

  return (
    <form 
        className="max-w-xl space-y-3" 
        // this returns  promise, which requires the use of "await" and "async"
        onSubmit={handleSubmit( async(data) => {
            await axios.post('/api/issues', data);
            router.push('/issues')
            })}>
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register('title')} /> 
        {/* using props for components  */}
      </TextField.Root>
      <Controller 
        name="description"
        control={control}
        render={({field})=><SimpleMDE placeholder="Description" {...field}/>}
        />
      <Button>Submit new Issue</Button>
    </form>
  );
};

export default NewIssuePage;
