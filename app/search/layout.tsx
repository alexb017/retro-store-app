import Collections from '@/components/collections';
import MobileCollections from '@/components/mobile-collections';

export default function LayoutSearch({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex flex-col gap-8 p-5 pb-4 max-w-screen-2xl md:flex-row">
      <div className="w-full hidden flex-none md:block md:max-w-[125px]">
        <Collections />
      </div>
      <div className="w-full md:hidden flex">
        <MobileCollections />
      </div>
      <div className="min-h-screen w-full">{children}</div>
      {/* <div className="flex-none md:w-[125px]">
          <FilterItem />
        </div> */}
    </div>
  );
}
