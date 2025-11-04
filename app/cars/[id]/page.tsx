import DetailAddPage from "./_components/DetailAddPage";
import Reviews from "./_components/Reviews";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 py-10">
      <DetailAddPage id={id}/>
      <Reviews id={id}/>
    </div>
  );
}
