'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import AuthForm from '@/components/AuthForm';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AuthPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const authImage = PlaceHolderImages.find(p => p.id === 'auth-background');

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || user) {
     return (
        <div className="flex h-screen w-screen items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video text-primary animate-pulse"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
                <p className="text-muted-foreground">Redirecting...</p>
            </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden p-4">
       <div className="absolute inset-0 z-0">
        {authImage && (
          <Image
            src={authImage.imageUrl}
            alt={authImage.description}
            fill
            className="object-cover opacity-20"
            data-ai-hint={authImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm"></div>
      </div>
      <div className="relative z-10 w-full max-w-md">
        <Card className="shadow-2xl">
          <CardContent className="p-6 md:p-8">
            <div className="mb-6 flex flex-col items-center text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video text-primary mb-2"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
              <h1 className="text-3xl font-bold font-headline text-primary">VideoVerse</h1>
              <p className="text-muted-foreground">Login or create an account to continue</p>
            </div>
            <AuthForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
