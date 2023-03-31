import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


// UI component for main post content
export default function PostContent({ post }) {
  const createdAt = typeof post?.createdAt === 'number' ? new Date(post.createdAt) : post.createdAt.toDate();

  return (
    <div className="card">
      <h1>{post?.title}</h1>
      <span className="text-sm">
        Opublikowane przez{' '}
        <Link className="text-info" href={`/${post.username}/`}>
          @{post.username}
        </Link>{' '}
        {createdAt.toISOString()}
      </span>
      <Carousel className='galeria' autoPlay={true} interval='5000' infiniteLoop={true} showStatus={false} dynamicHeight={true}>
        {post.gallery.map((element) => (
          <img src={element} alt='' />
        ))}
      </Carousel>
      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </div>
  );
}
