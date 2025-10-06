'use client';

import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { PlayCircle, Film } from 'lucide-react';

type Video = {
  id: string;
  title: string;
  url: string;
};

export default function VideoList() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'videos'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const videoList: Video[] = [];
        querySnapshot.forEach((doc) => {
          videoList.push({ id: doc.id, ...doc.data() } as Video);
        });
        setVideos(videoList);
        setLoading(false);
      },
      (error) => {
        console.error('Firebase read failed: ', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shared Videos</CardTitle>
        <CardDescription>
            Browse the collection of shared videos. Click any video to watch.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                    <Skeleton className="h-[125px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                </div>
            ))}
          </div>
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => (
              <a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <Card className="h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                  <CardContent className="p-4 flex flex-col justify-between h-full">
                    <div className="flex items-start gap-4">
                        <PlayCircle className="h-8 w-8 text-primary/70 shrink-0 mt-1 transition-colors group-hover:text-accent" />
                        <div>
                            <p className="font-semibold line-clamp-2">{video.title}</p>
                            <p className="text-sm text-muted-foreground line-clamp-1 break-all">{video.url}</p>
                        </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        ) : (
            <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg">
                <Film className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold">No Videos Yet</h3>
                <p className="text-muted-foreground">Be the first to share a video!</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
