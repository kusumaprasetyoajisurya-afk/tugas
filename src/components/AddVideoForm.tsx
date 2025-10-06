'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2, PlusCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  url: z.string().url({ message: 'Please enter a valid URL.' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddVideoForm() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      url: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: 'You must be logged in to add a video.',
      });
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'videos'), {
        ...values,
        userId: user.uid,
        createdAt: new Date(),
      });
      toast({ title: 'Success', description: 'Video added successfully!' });
      form.reset();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Database Error',
        description: 'Failed to add video. ' + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add a New Video</CardTitle>
        <CardDescription>
          Enter the title and URL of the video you want to share.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., My Awesome Cat Video" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://youtube.com/watch?v=..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <PlusCircle className="mr-2 h-4 w-4" />
              )}
              Add Video
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
