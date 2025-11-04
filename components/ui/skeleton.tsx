const Skeleton = () => {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm animate-pulse"
    >
      <div className="w-full h-56 bg-slate-200" />
      <div className="p-5 space-y-3">
        <div className="h-6 bg-slate-200 rounded" />
        <div className="h-4 bg-slate-200 rounded w-3/4" />
        <div className="h-8 bg-slate-200 rounded w-1/2" />
      </div>
    </div>
  );
};

export default Skeleton;
