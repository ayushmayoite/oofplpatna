import { ConfiguratorProvider } from "@/components/configurator/ConfiguratorContext";
import { ConfiguratorLayout } from "@/components/configurator/ConfiguratorLayout";
import Link from "next/link";

export default function WorkstationConfiguratorPage() {
  return (
    <div className="bg-white pt-28 md:pt-32">
      <section className="container-wide pb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-neutral-400">
          <Link href="/" className="hover:text-neutral-700 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/products/workstations"
            className="hover:text-neutral-700 transition-colors"
          >
            Workstations
          </Link>
          <span>/</span>
          <span className="text-neutral-700">Advanced Configurator</span>
        </div>
      </section>

      <ConfiguratorProvider>
        <ConfiguratorLayout />
      </ConfiguratorProvider>
    </div>
  );
}
