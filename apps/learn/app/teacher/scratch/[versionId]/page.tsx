import { requireRole } from "../../../../lib/auth";
import ScratchReviewFrame from "../../../../components/scratch-review-frame";

export default async function ScratchReviewPage({ params }: { params: Promise<{ versionId: string }> }) {
  await requireRole(["teacher", "admin"]);
  const { versionId } = await params;
  return <ScratchReviewFrame versionId={versionId} />;
}
