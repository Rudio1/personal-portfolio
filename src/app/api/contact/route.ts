// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    
    if (!body.name || !body.telephone) {
      return NextResponse.json(
        { error: 'Nome e telefone são obrigatórios' },
        { status: 400 }
      );
    }

    const response = await fetch(process.env.API_URL || '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY || ''
      },
      body: JSON.stringify({
        name: body.name.trim(),
        telephone: body.telephone.trim()
      })
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data, { status: 200 });
    } else {
      const errorText = await response.text();
      console.error('Erro da API externa:', response.status, errorText);
      
      return NextResponse.json(
        { error: 'Erro ao enviar contato para a API externa' },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('Erro no proxy:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
