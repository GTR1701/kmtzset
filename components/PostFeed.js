import Link from 'next/link';

export default function PostFeed({ posts, admin }) {
  return posts ? posts.map((post) => <PostItem post={post} key={post.slug} admin={admin} />) : null;
}

function PostItem({ post, admin = false }) {
  // Naive method to calc word count and read time
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <div className="card">
      <Link href={`/${post.username}`}>

        <strong>Autor @{post.username}</strong>

      </Link>

      <Link href={`/${post.username}/${post.slug}`}>
        <h2>
          {post.title}
        </h2>
      </Link>

      <footer>
        <span>
          {wordCount} słów. Ok. {minutesToRead} min czytania
        </span>
        <span className="push-left">💗 {post.heartCount || 0} Polubień</span>
      </footer>

      {/* If admin view, show extra controls for user */}
      {admin && (
        <>
          <Link href={`/admin/${post.slug}`}>
            <h3>
              <button className="btn-blue">Edit</button>
            </h3>
          </Link>

          {post.published ? <p className="text-success">Opublikowane</p> : <p className="text-danger">Nieopublikowane</p>}
        </>
      )}
    </div>
  );
}
