// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { IPost } from '../../types'
import posts from './_posts/posts.json'



export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IPost[]>
) {
  if (req.method === 'GET') return res.status(200).json(posts);
}
