import Collections from '@/components/collections';
import Footer from '@/components/footer';
import MobileCollections from '@/components/mobile-collections';

export default function LayoutSearch({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-auto flex flex-col gap-8 p-5 pb-4 max-w-screen-2xl">
        <div className="w-full hidden md:block">
          <Collections />
        </div>
        <div className="w-full md:hidden block">
          <MobileCollections />
        </div>
        <div className="min-h-screen w-full">{children}</div>
        {/* <div className="flex-none md:w-[125px]">
          <FilterItem />
        </div> */}
      </div>
      <Footer />
    </>
  );
}
