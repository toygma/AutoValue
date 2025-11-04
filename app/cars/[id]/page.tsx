import DetailAddPage from "./_components/detailAddPage";
import Reviews from "./_components/reviews";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 py-10">
      <DetailAddPage id={id}/>
      <Reviews />
    </div>
  );
}
