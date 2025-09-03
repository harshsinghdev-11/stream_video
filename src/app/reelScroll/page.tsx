import { Video } from '@imagekit/next';
export default function Page() {
  return (
    <Video
      urlEndpoint="https://ik.imagekit.io/fgzqp3ckrq"
      src="/video.mp4"
      controls
      width={500}
      height={500}
    />
  )
}