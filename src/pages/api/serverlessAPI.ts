// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // add 'localhost:3000' in allowedDomains while in development
  const allowedDomains = ['codeco.vercel.app'];
  const host = req.headers.host as string;

  if (allowedDomains.includes(host)) {
    res.setHeader('Access-Control-Allow-Origin', host);
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS, POST,');

    const { code, language, convertToLanguage } = req.body;

    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: `Translate this code from ${language} into ${convertToLanguage} \n${code}\n`,
        temperature: 0,
        max_tokens: 500,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ['###'],
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } else {
    res.status(403).json('You Are Not Authorize');
  }
}
