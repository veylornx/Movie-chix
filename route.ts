import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation';
const buckets = new Map<string,{count:number;start:number}>();
export async function POST(req:Request){
  const ip=req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'unknown'; const now=Date.now(); const windowMs=60_000; const current=buckets.get(ip);
  if(!current||now-current.start>windowMs)buckets.set(ip,{count:1,start:now}); else {current.count++; if(current.count>5)return NextResponse.json({error:'Too many requests. Please try again later.'},{status:429});}
  try{const body=await req.json(); const parsed=contactSchema.safeParse(body); if(!parsed.success)return NextResponse.json({error:'Please check the form fields and try again.'},{status:400}); if(parsed.data.website)return NextResponse.json({ok:true});
    const key=process.env.RESEND_API_KEY; const to=process.env.CONTACT_TO_EMAIL; const from=process.env.CONTACT_FROM_EMAIL;
    if(key && to && from){
      const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({from,to,reply_to:parsed.data.email,subject:`Portfolio: ${parsed.data.subject}`,text:`Name: ${parsed.data.name}\nEmail: ${parsed.data.email}\n\n${parsed.data.message}`})});
      if(!response.ok)return NextResponse.json({error:'Message delivery failed. Please try again later.'},{status:502});
    } else {
      console.warn('Contact accepted but no mail provider configured. Set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.');
    }
    return NextResponse.json({ok:true});
  }catch{return NextResponse.json({error:'Unable to process your message.'},{status:500});}
}
