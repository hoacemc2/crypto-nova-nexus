import { BranchCustomization } from '@/components/owner/BranchCustomization';
import { BranchLandingCustomizer } from '@/components/owner/BranchLandingCustomizer';

const CustomizationPage = () => {
  // Get active branch from localStorage
  const selectedBrand = localStorage.getItem('selected_brand');
  const allBranches = JSON.parse(localStorage.getItem('mock_branches') || '[]');
  const brandBranches = allBranches.filter((b: any) => b.brandName === selectedBrand);
  const activeBranch = brandBranches[0] || null;

  if (!activeBranch) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No branch found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Branch Customization</h2>
        <p className="text-muted-foreground mt-2">
          Customize your branch appearance and landing page
        </p>
      </div>

      <BranchCustomization branch={activeBranch} />
      <BranchLandingCustomizer branch={activeBranch} />
    </div>
  );
};

export default CustomizationPage;
