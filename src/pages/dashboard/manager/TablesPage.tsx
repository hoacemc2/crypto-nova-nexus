import { useAuthStore } from '@/store/authStore';
import { TableManagementFull } from '@/components/manager/TableManagementFull';

export default function TablesPage() {
  const { user } = useAuthStore();
  const branchId = user?.branchId || '1';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Table Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage table layouts and availability
        </p>
      </div>

      <TableManagementFull branchId={branchId} />
    </div>
  );
}
