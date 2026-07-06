export const StatusBadge = ({ status }: { status: 'Present' | 'Late' | 'Absent' }) => {
  const styles = {
    Present: "bg-emerald-100 text-emerald-700",
    Late: "bg-amber-100 text-amber-700",
    Absent: "bg-red-100 text-red-700"
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      ● {status}
    </span>
  );
};