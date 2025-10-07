import { useAuthStore } from '@/store/authStore';
import { TableStatusView } from '@/components/manager/TableStatusView';

export default function TablesPage() {
  const { user } = useAuthStore();
  const branchId = user?.branchId || '1';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Table Status</h1>
        <p className="text-muted-foreground mt-2">
          Monitor table availability and reservations
        </p>
      </div>

      <TableStatusView branchId={branchId} />
    </div>
  );
}
