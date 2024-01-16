import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const body = await request.json();
  const { question } = body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are a knowledgeable software Developer that provides quality and comprehensive answers.',
          },
          {
            role: 'user',
            content: `Tell me ${question}`,
          },
        ],
      }),
    });

    const responseData = await response.json();
    console.log(responseData);
    const reply = responseData.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
