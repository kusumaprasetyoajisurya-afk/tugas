'use client';

import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function Header() {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({ title: 'Success', description: 'Logged out successfully.' });
      router.push('/auth');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Logout Error',
        description: error.message,
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between p-4">
        <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video text-primary"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
            <h1 className="text-2xl font-bold font-headline text-primary">VideoVerse</h1>
        </div>
        {user && (
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        )}
      </div>
    </header>
  );
}
