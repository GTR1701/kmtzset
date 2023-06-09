import PostFeed from '@components/PostFeed';
import Metatags from '@components/Metatags';
import Loader from '@components/Loader';
import { postToJSON } from '@lib/firebase';
import { Timestamp, query, where, orderBy, limit, collectionGroup, getDocs, startAfter, getFirestore } from 'firebase/firestore';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';

const LIMIT = 10;

export async function getStaticProps(context) {
  const ref = collectionGroup(getFirestore(), 'posts');
  const postsQuery = query(
    ref,
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(LIMIT),
  )

  const posts = (await getDocs(postsQuery)).docs.map(postToJSON);

  return {
    props: { posts }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);


  // Get next page in pagination query
  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor = typeof last.createdAt === 'number' ? Timestamp.fromMillis(last.createdAt) : last.createdAt;

    const ref = collectionGroup(getFirestore(), 'posts');
    const postsQuery = query(
      ref,
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      startAfter(cursor),
      limit(LIMIT),
    )

    const newPosts = (await getDocs(postsQuery)).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <main>
      <Metatags title="Home Page" description="Get the latest posts on our site" />

      <div className="card card-info">
        <h2>Blog Klubu Młodego Technika w ZSET</h2>
      </div>

      <Carousel autoPlay={true} interval='5000' infiniteLoop={true} showStatus={false} showThumbs={false} showArrows={false} showIndicators={false}>
        <img className='carousel-image' src='dOtw2.jpg' alt=''></img>
        <img className='carousel-image' src='dOtw3.jpg' alt=''></img>
        <img className='carousel-image' src='dOtw4.jpg' alt=''></img>
      </Carousel>

      <PostFeed posts={posts} />

      {!loading && !postsEnd && <button onClick={getMorePosts}>Załaduj więcej postów</button>}

      <Loader show={loading} />

      {postsEnd && 'Dotarłeś do końca!'}
    </main>
  );
}