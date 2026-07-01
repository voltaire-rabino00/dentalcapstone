
export const Avatar = ({ name }: { name: string }) => {

  const initials = name
    ?.split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const colors = ["bg-blue-500", "bg-teal-500", "bg-orange-500", "bg-purple-500"];
  const bgColor = colors[name?.length % colors.length] || "bg-slate-400";

  return (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0 ${bgColor}`}>
      {initials}
    </div>
  );
};