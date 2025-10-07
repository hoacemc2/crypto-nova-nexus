import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StaffManagement } from '@/components/owner/StaffManagement';

export default function StaffPage() {
  const { user } = useAuthStore();
  const branchId = user?.branchId || '1';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Staff Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage staff members for your branch
        </p>
      </div>

      <StaffManagement branchId={branchId} />
    </div>
  );
}
