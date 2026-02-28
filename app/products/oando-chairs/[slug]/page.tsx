import { redirect } from "next/navigation";

export default async function OandoChairsProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/products/seating/${slug}`);
}
