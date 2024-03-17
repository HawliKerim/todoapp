import db from '@/lib/db';

export async function POST(req: Request) {
  const { id,isChecked } = await req.json();
  let after;
  if(isChecked === false){
    after = true;
  }else(
    after=false
  )
  const response = await db.todo.update({
    where: {
      id,
    },
    data: {
      done: after,
    },
  });
  console.log(response)
  if (!response) return Response.json({ message: 'error', status: 500 });
  return Response.json({ message: 'ok', status: 200 });
}
